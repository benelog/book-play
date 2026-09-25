"""Build the moving 3D characters of The Little Prince film in Blender and export them for three.js.

    blender -b --factory-startup --python tools/lp-models3d.py [-- --blend /tmp/lp-models.blend]

Writes books/little-prince/film/models3d.js (window.LP_FILM_MODELS). film3d.js turns every part into a
THREE.BufferGeometry and hangs it on the pivot group ("g") that the character's update() animates,
so the rig stays a set of rigid parts (no skinning). The page must work from file://, hence a plain
script with the arrays inlined (base64), and no textures: colour is one flat colour per part, or
per-vertex colours ("k") for fur that changes colour (the fox).

The characters follow the reference sheets in books/little-prince/images/characters/<name>.jpg
(front, left, right, back). Eyes, mouths and the prince's scarf ends stay procedural in film3d.js,
so blinking, talking and the scarf in the wind keep working.

Everything below is written in three.js space: x to the character's left (screen right when it
faces the camera), y up, z the way the character faces, feet at y = 0. Meshes are converted to
Blender space (x, -z, y) when they are made, and back when they are exported.
"""
import base64
import math
import os
import random
import struct
import sys

import bmesh
import bpy
from mathutils import Euler, Matrix, Vector, noise

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'books', 'little-prince', 'film', 'models3d.js')
ARGS = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []

TO_BLENDER = Matrix(((1, 0, 0), (0, 0, -1), (0, 1, 0)))
TO_THREE = TO_BLENDER.transposed()


def V(*a):
    return Vector(a[0] if len(a) == 1 else a)


# ---------------------------------------------------------------------------------------------------- geometry
class Geo:
    """A plain list of vertices and polygons in three.js space."""

    def __init__(self, v=None, f=None):
        self.v = [V(p) for p in (v or [])]
        self.f = [tuple(x) for x in (f or [])]

    def add(self, g):
        o = len(self.v)
        self.v += [p.copy() for p in g.v]
        self.f += [tuple(i + o for i in face) for face in g.f]
        return self

    def map(self, fn):
        self.v = [V(fn(p.copy())) for p in self.v]
        return self

    def move(self, d):
        d = V(d)
        return self.map(lambda p: p + d)

    def rotate(self, rot, about=(0, 0, 0)):
        m = Euler(rot, 'XYZ').to_matrix()
        c = V(about)
        return self.map(lambda p: m @ (p - c) + c)

    def scale(self, s, about=(0, 0, 0)):
        s = V(s) if not isinstance(s, (int, float)) else V(s, s, s)
        c = V(about)
        return self.map(lambda p: V((p - c).x * s.x, (p - c).y * s.y, (p - c).z * s.z) + c)


def join(*gs):
    g = Geo()
    for x in gs:
        g.add(x)
    return g


def grid_faces(rows, cols, closed=False, offset=0):
    """Quads of a (rows+1) x cols vertex grid; closed wraps the columns."""
    f = []
    n = cols
    for i in range(rows):
        for j in range(cols if closed else cols - 1):
            a = offset + i * n + j
            b = offset + i * n + (j + 1) % n
            f.append((a, b, b + n, a + n))
    return f


def sphere(c=(0, 0, 0), r=(1, 1, 1), seg=16, rings=10, rot=(0, 0, 0)):
    """Ellipsoid with its poles on y."""
    r = V(r) if not isinstance(r, (int, float)) else V(r, r, r)
    v = [V(0, 1, 0)]
    for i in range(1, rings):
        th = math.pi * i / rings
        for j in range(seg):
            ph = 2 * math.pi * j / seg
            v.append(V(math.sin(th) * math.sin(ph), math.cos(th), math.sin(th) * math.cos(ph)))
    v.append(V(0, -1, 0))
    f = [(0, 1 + j, 1 + (j + 1) % seg) for j in range(seg)]
    f = [(0, 1 + (j + 1) % seg, 1 + j) for j in range(seg)]
    for i in range(rings - 2):
        for j in range(seg):
            a = 1 + i * seg + j
            b = 1 + i * seg + (j + 1) % seg
            f.append((a, b, b + seg, a + seg))
    last = len(v) - 1
    base = 1 + (rings - 2) * seg
    f += [(last, base + j, base + (j + 1) % seg) for j in range(seg)]
    g = Geo(v, f)
    g.map(lambda p: V(p.x * r.x, p.y * r.y, p.z * r.z))
    g.rotate(rot)
    return g.move(c)


def lathe(profile, seg=20, c=(0, 0, 0), sx=1.0, sz=1.0, a0=None, a1=None, rfn=None):
    """Surface of revolution round the y axis through c. profile: [(r, y)] from bottom to top; an r of 0
    at either end closes it with a pole. The angle starts at +z (front) and turns toward +x.
    a0/a1 (radians) give an open arc instead of a full turn; rfn(r, y, angle) may bend the radius."""
    full = a0 is None
    cols = seg if full else seg + 1
    rows = []
    for (r, y) in profile:
        row = []
        for j in range(cols):
            a = (2 * math.pi * j / seg) if full else a0 + (a1 - a0) * j / seg
            rr = rfn(r, y, a) if rfn else r
            row.append(V(math.sin(a) * rr * sx, y, math.cos(a) * rr * sz) + V(c))
        rows.append(row)
    v, f = [], []
    start = 0
    bottom_pole = full and profile[0][0] == 0
    top_pole = full and profile[-1][0] == 0
    body = rows[1:] if bottom_pole else rows
    body = body[:-1] if top_pole else body
    if bottom_pole:
        v.append(V(0, profile[0][1], 0) + V(c))
        start = 1
    for row in body:
        v += row
    nrows = len(body)
    for i in range(nrows - 1):
        for j in range(cols if full else cols - 1):
            a = start + i * cols + j
            b = start + i * cols + (j + 1) % cols
            f.append((a, a + cols, b + cols, b))
    if bottom_pole:
        f += [(0, 1 + (j + 1) % cols, 1 + j) for j in range(cols)]
    if top_pole:
        v.append(V(0, profile[-1][1], 0) + V(c))
        top = len(v) - 1
        base = start + (nrows - 1) * cols
        f += [(top, base + j, base + (j + 1) % cols) for j in range(cols)]
    return Geo(v, f)


def catmull(points, n):
    pts = [V(p) for p in points]
    pts = [pts[0] * 2 - pts[1]] + pts + [pts[-1] * 2 - pts[-2]]
    segs = len(pts) - 3
    out = []
    for i in range(n + 1):
        t = i / n * segs
        k = min(segs - 1, int(t))
        u = t - k
        p0, p1, p2, p3 = pts[k:k + 4]
        out.append(0.5 * ((2 * p1) + (-p0 + p2) * u + (2 * p0 - 5 * p1 + 4 * p2 - p3) * u * u + (-p0 + 3 * p1 - 3 * p2 + p3) * u ** 3))
    return out


def lerp_list(vals, t):
    f = t * (len(vals) - 1)
    k = min(len(vals) - 2, int(f))
    return vals[k] + (vals[k + 1] - vals[k]) * (f - k)


def tube(points, radii, sides=8, steps=12, flat=1.0, up=(0, 1, 0), twist=0.0, caps=True):
    """Tapered tube along a Catmull-Rom curve. flat squeezes the cross-section along 'up' x tangent,
    so flat < 1 gives ribbons and leaves; a radius of ~0 at an end closes it to a point."""
    c = catmull(points, steps)
    tangents = [(c[min(i + 1, steps)] - c[max(i - 1, 0)]).normalized() for i in range(steps + 1)]
    # parallel transport, starting from the hint
    n = V(up).cross(tangents[0])
    if n.length < 1e-6:
        n = V(1, 0, 0).cross(tangents[0])
    n.normalize()
    frames = []
    for i, t in enumerate(tangents):
        if i:
            axis = tangents[i - 1].cross(t)
            if axis.length > 1e-8:
                ang = math.asin(max(-1, min(1, axis.length)))
                n = Matrix.Rotation(ang, 3, axis.normalized()) @ n
        b = t.cross(n).normalized()
        frames.append((n.copy(), b))
    v, f = [], []
    for i in range(steps + 1):
        s = i / steps
        r = lerp_list(radii, s)
        nn, bb = frames[i]
        tw = twist * s
        for k in range(sides):
            a = 2 * math.pi * k / sides + tw
            v.append(c[i] + nn * (math.cos(a) * r) + bb * (math.sin(a) * r * flat))
    for i in range(steps):
        for k in range(sides):
            a = i * sides + k
            b = i * sides + (k + 1) % sides
            f.append((a, b, b + sides, a + sides))
    if caps:
        v.append(c[0].copy())
        s0 = len(v) - 1
        f += [(s0, (k + 1) % sides, k) for k in range(sides)]
        v.append(c[-1].copy())
        s1 = len(v) - 1
        base = steps * sides
        f += [(s1, base + k, base + (k + 1) % sides) for k in range(sides)]
    return Geo(v, f)


def star(c, normal, r_out=0.016, r_in=0.007, depth=0.004, up=(0, 1, 0)):
    """A five-pointed star button lying on a surface with the given outward normal."""
    nrm = V(normal).normalized()
    x = V(up).cross(nrm).normalized()
    y = nrm.cross(x).normalized()
    v = []
    for layer in (0, 1):
        for i in range(10):
            a = math.pi / 2 + i * math.pi / 5
            r = r_out if i % 2 == 0 else r_in
            v.append(V(c) + x * (math.cos(a) * r) + y * (math.sin(a) * r) + nrm * (depth * layer))
    v.append(V(c))
    v.append(V(c) + nrm * depth * 1.6)
    f = [(20, (i + 1) % 10, i) for i in range(10)]
    f += [(21, 10 + i, 10 + (i + 1) % 10) for i in range(10)]
    f += [(i, (i + 1) % 10, 10 + (i + 1) % 10, 10 + i) for i in range(10)]
    return Geo(v, f)


def box(c, size, rot=(0, 0, 0)):
    sx, sy, sz = (s / 2 for s in size)
    v = [V(x, y, z) for x in (-sx, sx) for y in (-sy, sy) for z in (-sz, sz)]
    f = [(0, 1, 3, 2), (4, 6, 7, 5), (0, 4, 5, 1), (2, 3, 7, 6), (0, 2, 6, 4), (1, 5, 7, 3)]
    return Geo(v, f).rotate(rot).move(c)


# ---------------------------------------------------------------------------------------------------- blender
COLL = None


def make(name, geo, mods=()):
    """A Blender object from a Geo, with a modifier stack: ('subsurf', n), ('remesh', voxel),
    ('smooth', factor, repeat), ('decimate', ratio), ('noise', strength, size), ('solidify', t)."""
    me = bpy.data.meshes.new(name)
    me.from_pydata([TO_BLENDER @ p for p in geo.v], [], geo.f)
    me.validate()
    me.update()
    ob = bpy.data.objects.new(name, me)
    COLL.objects.link(ob)
    for m in mods:
        kind = m[0]
        if kind == 'subsurf':
            x = ob.modifiers.new('subsurf', 'SUBSURF')
            x.levels = x.render_levels = m[1]
        elif kind == 'remesh':
            x = ob.modifiers.new('remesh', 'REMESH')
            x.mode = 'VOXEL'
            x.voxel_size = m[1]
        elif kind == 'smooth':
            x = ob.modifiers.new('smooth', 'SMOOTH')
            x.factor = m[1]
            x.iterations = m[2]
        elif kind == 'decimate':
            x = ob.modifiers.new('decimate', 'DECIMATE')
            x.ratio = m[1]
        elif kind == 'noise':
            tex = bpy.data.textures.new(name + '-noise', 'CLOUDS')
            tex.noise_scale = m[2]
            x = ob.modifiers.new('noise', 'DISPLACE')
            x.texture = tex
            x.strength = m[1]
            x.mid_level = 0.5
        elif kind == 'solidify':
            x = ob.modifiers.new('solidify', 'SOLIDIFY')
            x.thickness = m[1]
            x.offset = m[2] if len(m) > 2 else 0
        elif kind == 'target':
            # decimate to about m[1] triangles
            dg = bpy.context.evaluated_depsgraph_get()
            tmp = bpy.data.meshes.new_from_object(ob.evaluated_get(dg))
            tris = sum(len(p.vertices) - 2 for p in tmp.polygons)
            bpy.data.meshes.remove(tmp)
            if tris > m[1]:
                x = ob.modifiers.new('target', 'DECIMATE')
                x.ratio = m[1] / tris
        elif kind == 'weld':
            x = ob.modifiers.new('weld', 'WELD')
            x.merge_threshold = m[1]
    return ob


def mesh_data(ob):
    """Triangles of the evaluated object in three.js space: positions, smooth normals, indices."""
    dg = bpy.context.evaluated_depsgraph_get()
    me = bpy.data.meshes.new_from_object(ob.evaluated_get(dg))
    bm = bmesh.new()
    bm.from_mesh(me)
    bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=1e-6)
    bmesh.ops.triangulate(bm, faces=bm.faces)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    bm.normal_update()
    bm.verts.index_update()
    pos = [TO_THREE @ v.co for v in bm.verts]
    nrm = [(TO_THREE @ v.normal).normalized() if v.normal.length > 0 else V(0, 1, 0) for v in bm.verts]
    tris = [tuple(v.index for v in f.verts) for f in bm.faces]
    bm.free()
    bpy.data.meshes.remove(me)
    return pos, nrm, tris


def b64(fmt, values):
    return base64.b64encode(struct.pack('<%d%s' % (len(values), fmt), *values)).decode('ascii')


def hex_rgb(h):
    h = h.lstrip('#')
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def mix(a, b, t):
    t = max(0.0, min(1.0, t))
    a, b = hex_rgb(a) if isinstance(a, str) else a, hex_rgb(b) if isinstance(b, str) else b
    return tuple(round(a[i] + (b[i] - a[i]) * t) for i in range(3))


class Model:
    def __init__(self, name, pivots):
        self.name = name
        self.pivots = {k: V(p) for k, p in pivots.items()}
        self.parts = []
        self.tris = 0

    def part(self, name, group, geo, color, line=0.004, mods=(), vc=None, template=False):
        """group: the pivot group the part hangs on; its rest position is subtracted (the part is
        modelled in character space). template parts are modelled round the origin instead
        (the rose's petals and leaves, which film3d.js copies and places itself)."""
        ob = make('%s.%s' % (self.name, name), geo, mods)
        pos, nrm, tris = mesh_data(ob)
        piv = V(0, 0, 0) if template else self.pivots[group]
        local = [p - piv for p in pos]
        lo = V(min(p.x for p in local), min(p.y for p in local), min(p.z for p in local))
        hi = V(max(p.x for p in local), max(p.y for p in local), max(p.z for p in local))
        o = (lo + hi) / 2
        s = V(max((hi.x - lo.x) / 2, 1e-6), max((hi.y - lo.y) / 2, 1e-6), max((hi.z - lo.z) / 2, 1e-6))
        q = []
        for p in local:
            d = p - o
            q += [round(d.x / s.x * 32767), round(d.y / s.y * 32767), round(d.z / s.z * 32767)]
        n = []
        for x in nrm:
            n += [round(x.x * 127), round(x.y * 127), round(x.z * 127)]
        idx = [i for t in tris for i in t]
        rec = {'n': name, 'g': group, 'c': color, 'l': line,
               'o': [round(o.x, 5), round(o.y, 5), round(o.z, 5)], 's': [round(s.x, 6), round(s.y, 6), round(s.z, 6)],
               'p': b64('h', q), 'q': b64('b', n), 'i': b64('H', idx)}
        if vc:
            cols = []
            for p, x in zip(pos, nrm):
                cols += list(vc(p, x))
            rec['k'] = b64('B', cols)
        assert len(pos) < 65536, name
        self.parts.append(rec)
        self.tris += len(tris)
        if os.environ.get('LP_VERBOSE'):
            print('   %-22s %-8s %5d tris' % (name, group, len(tris)))
        return ob

    def export(self):
        return {'pivots': {k: [round(p.x, 4), round(p.y, 4), round(p.z, 4)] for k, p in self.pivots.items()},
                'parts': self.parts, 'tris': self.tris}


# ---------------------------------------------------------------------------------------------------- the little prince
# Sheet: long mustard-yellow coat below the knees with three gold star buttons, cream baggy trousers
# gathered over navy ankle boots, long red scarf (its fringed ends are ribbons in film3d.js),
# tousled spiky golden hair, round face. About 1 unit tall.
def prince():
    P = {'hips': (0, 0.34, 0), 'torso': (0, 0.34, 0), 'head': (0, 0.715, 0)}
    for sd, k in ((-1, '-'), (1, '+')):
        P['leg' + k] = (0.066 * sd, 0.355, 0)
        P['skirtF' + k] = (0.066 * sd, 0.355, 0)
        P['skirtB' + k] = (0.066 * sd, 0.355, 0)
        P['arm' + k] = (0.112 * sd, 0.625, 0)
    m = Model('prince', P)
    COAT, COAT_D, CREAM, BOOT, SOLE, SKIN, SCARF = '#e2b13e', '#c9962c', '#f0e3c3', '#3c4d74', '#28334f', '#f7dac0', '#b9442e'
    HAIR, HAIR_L, HAIR_D = '#ecbd43', '#f4cd57', '#dca937'

    for sd, k in ((-1, '-'), (1, '+')):
        x = 0.066 * sd
        # baggy trousers, gathered over the boot tops
        m.part('trousers' + k, 'leg' + k, lathe([(0, 0.395), (0.052, 0.39), (0.06, 0.35), (0.064, 0.28), (0.07, 0.2), (0.069, 0.165),
                                                 (0.06, 0.145), (0.042, 0.13), (0.034, 0.122), (0, 0.118)], 18, c=(x, 0, 0), sz=0.96,
                                                rfn=lambda r, y, a: r * (1 + 0.05 * math.sin(5 * a) * max(0, min(1, (0.25 - y) * 8)))),
               CREAM, 0.0035, mods=[('subsurf', 1), ('target', 420)])
        # ankle boot: shaft and rounded toe fused, a darker sole under it
        boot = join(lathe([(0, 0.035), (0.035, 0.035), (0.038, 0.07), (0.037, 0.11), (0.04, 0.132), (0, 0.132)], 16, c=(x, 0, 0)),
                    sphere((x, 0.036, 0.03), (0.041, 0.035, 0.071), 16, 10))
        boot.map(lambda p: V(p.x, max(p.y, 0.016), p.z))
        m.part('boot' + k, 'leg' + k, boot, BOOT, 0.0035, mods=[('remesh', 0.004), ('smooth', 0.8, 4), ('target', 340)])
        m.part('sole' + k, 'leg' + k, lathe([(0, 0.0), (0.041, 0.0), (0.043, 0.012), (0.041, 0.02), (0, 0.02)], 16, c=(x, 0, 0.026), sz=1.8),
               SOLE, 0.003)
        m.part('bootcuff' + k, 'leg' + k, tube([(x + 0.04 * math.sin(a), 0.128, 0.04 * math.cos(a)) for a in [i / 12 * 2 * math.pi for i in range(13)]],
                                               [0.008], 5, 16), BOOT, 0.002)
        laces = Geo()
        for i, y in enumerate((0.058, 0.078, 0.098)):
            laces.add(tube([(x - 0.018, y, 0.037), (x, y + 0.004, 0.041), (x + 0.018, y, 0.037)], [0.0028], 4, 4))
        m.part('laces' + k, 'leg' + k, laces, '#26304a', 0)

    # coat skirt: four panels round the legs; the front ones open in an upside-down V over the trousers
    def skirt(side, front):
        top, hem = 0.41, 0.19
        rows = 7
        v, f = [], []
        cols = 10
        for i in range(rows + 1):
            t = i / rows
            y = top + (hem - top) * t
            r = 0.114 + 0.064 * t ** 1.2
            gap = 0.01 + 0.052 * max(0, (t - 0.12) / 0.88) ** 1.3
            if front:
                a_in = math.asin(min(0.9, gap / r))
                a0, a1 = a_in, math.radians(97)
            else:
                a0, a1 = math.radians(83), math.radians(178.5)
            for j in range(cols + 1):
                a = a0 + (a1 - a0) * j / cols
                rr = r * (1 + 0.035 * t * math.sin(a * 7 + side))
                v.append(V(side * math.sin(a) * rr, y, math.cos(a) * rr * 0.84))
        for i in range(rows):
            for j in range(cols):
                a = i * (cols + 1) + j
                b = a + cols + 1
                f.append((a, a + 1, b + 1, b) if side > 0 else (a, b, b + 1, a + 1))
        return Geo(v, f)
    for sd, k in ((-1, '-'), (1, '+')):
        m.part('skirtF' + k, 'skirtF' + k, skirt(sd, True), COAT, 0.0035, mods=[('solidify', 0.008, 1)])
        m.part('skirtB' + k, 'skirtB' + k, skirt(sd, False), COAT, 0.0035, mods=[('solidify', 0.008, 1)])

    # upper coat
    coat = join(lathe([(0, 0.315), (0.108, 0.315), (0.121, 0.345), (0.12, 0.4), (0.114, 0.47), (0.11, 0.53), (0.113, 0.583),
                                   (0.11, 0.615), (0.098, 0.645), (0.079, 0.669), (0.058, 0.689), (0.043, 0.704), (0, 0.708)], 24, sz=0.8,
                                  rfn=lambda r, y, a: r * (1 + 0.1 * max(0, math.cos(a)) * max(0, min(1, (y - 0.42) * 6)) * (0.7 if y > 0.6 else 1))),
                sphere((-0.088, 0.612, -0.004), (0.05, 0.036, 0.06), 12, 8), sphere((0.088, 0.612, -0.004), (0.05, 0.036, 0.06), 12, 8))
    m.part('coat', 'torso', coat, COAT, 0.004, mods=[('remesh', 0.005), ('smooth', 0.6, 3), ('target', 1000)])
    # the cream shirt showing down the front, the coat's buttoned edge and three gold stars
    shirt = lathe([(0.1, 0.35), (0.105, 0.45), (0.112, 0.53), (0.118, 0.6), (0.112, 0.655)], 3, sz=0.8 * 1.1 + 0.02,
                  a0=math.radians(5), a1=math.radians(14), rfn=lambda r, y, a: r + 0.004)
    shirt.map(lambda p: V(p.x, p.y, p.z * 1.0))
    m.part('shirt', 'torso', shirt, '#eadcb8', 0, mods=[('solidify', 0.003, 1)])
    for y in (0.645, 0.588, 0.531):
        z = 0.8 * 0.113 * (1.1 if y < 0.62 else 1.05) + 0.006
        m.part('star%d' % round(y * 1000), 'torso', star((-0.006, y, z), (0, 0.1, 1), 0.0165, 0.0072, 0.004), '#f3cf55', 0.0012)
    # sleeves: puffy, gathered into a cuff; small hands
    for sd, k in ((-1, '-'), (1, '+')):
        x = 0.118 * sd
        m.part('sleeve' + k, 'arm' + k, lathe([(0, 0.022), (0.026, 0.018), (0.04, 0.004), (0.046, -0.03), (0.048, -0.11), (0.045, -0.16),
                                                (0.034, -0.19), (0, -0.196)], 14, c=(x, 0.625, 0)), COAT, 0.004, mods=[('subsurf', 1), ('target', 420)])
        m.part('cuff' + k, 'arm' + k, tube([(x + 0.033 * math.sin(a), 0.625 - 0.188, 0.033 * math.cos(a)) for a in [i / 12 * 2 * math.pi for i in range(13)]],
                                           [0.009], 5, 16), COAT_D, 0.002)
        hand = join(sphere((x, 0.625 - 0.222, 0.004), (0.021, 0.029, 0.017), 12, 8),
                    sphere((x - sd * 0.016, 0.625 - 0.212, 0.012), (0.008, 0.015, 0.008), 8, 6, rot=(0.3, 0, -sd * 0.4)))
        m.part('hand' + k, 'arm' + k, hand, SKIN, 0.003)

    # scarf wound twice round the neck; the loose ends are ribbons made in film3d.js
    wrap = Geo()
    for i, (y, tilt, rx, rz, th) in enumerate(((0.698, 0.12, 0.066, 0.058, 0.024), (0.724, -0.1, 0.06, 0.054, 0.021))):
        pts = []
        for j in range(17):
            a = j / 16 * 2 * math.pi
            pts.append((math.sin(a) * rx, y + math.cos(a) * tilt * 0.06 + 0.004 * math.sin(3 * a + i), math.cos(a) * rz))
        wrap.add(tube(pts, [th], 6, 20, flat=0.8, up=(0, 0, 1)))
    wrap.add(sphere((0.035, 0.694, 0.056), (0.03, 0.026, 0.02), 10, 8))
    m.part('scarf', 'torso', wrap, SCARF, 0.0035, mods=[('noise', 0.004, 0.03)])

    # head: round face with full cheeks and a small chin
    C = V(0, 0.83, 0)
    face = join(sphere(C, (0.097, 0.1, 0.093), 24, 16), sphere(C + V(0, -0.038, 0.02), (0.075, 0.055, 0.07), 16, 10),
                sphere(C + V(0, -0.075, -0.005), (0.03, 0.05, 0.03), 8, 6))
    m.part('face', 'head', face, SKIN, 0.004, mods=[('remesh', 0.005), ('smooth', 0.7, 3), ('target', 950)])
    for sd in (-1, 1):
        m.part('ear%+d' % sd, 'head', sphere(C + V(sd * 0.094, -0.012, -0.008), (0.014, 0.024, 0.018), 10, 8, rot=(0, sd * 0.3, sd * 0.15)), SKIN, 0.0025)
    m.part('nose', 'head', sphere(C + V(0, -0.017, 0.09), (0.0075, 0.008, 0.007), 8, 6), SKIN, 0.001)

    # hair: a fluffy mop of overlapping clumps over the skull, fused into one volume, with pointed tufts
    # sticking out round its edge and a fringe falling over the forehead; the face stays clear
    rnd = random.Random(11)

    def theta_max(phi):
        front = (math.cos(phi) + 1) / 2          # phi = 0: facing forward
        return 2.15 - 1.28 * front ** 1.6

    def in_hair(d, margin):
        th = math.acos(max(-1, min(1, d.y)))
        return th < theta_max(math.atan2(d.x, d.z)) - margin

    def hairline(p):
        # lowest point the hair may reach at this side of the head: high over the forehead and temples,
        # over the tops of the ears, down to the nape behind them
        a = abs(math.degrees(math.atan2(p.x - C.x, p.z - C.z)))
        pts = [(0, 0.885), (55, 0.882), (85, 0.868), (112, 0.83), (145, 0.79), (180, 0.78)]
        for (a0, y0), (a1, y1) in zip(pts, pts[1:]):
            if a <= a1:
                return y0 + (y1 - y0) * (a - a0) / (a1 - a0)
        return pts[-1][1]

    HC = C + V(0, 0.02, -0.012)
    hair = Geo()
    n = 200
    for i in range(n):
        yv = 1 - 2 * (i + 0.5) / n
        rr = math.sqrt(1 - yv * yv)
        ph = i * 2.39996
        d = V(rr * math.sin(ph), yv, rr * math.cos(ph))
        r = rnd.uniform(0.036, 0.047)
        c = HC + V(d.x * 0.088, d.y * 0.09, d.z * 0.086)
        if c.y - r * 0.9 < hairline(c) - 0.004:
            continue
        hair.add(sphere(c, (r, r * 0.9, r), 8, 6))
    tufts = 0
    while tufts < 52:
        d = V(rnd.uniform(-1, 1), rnd.uniform(-0.6, 1), rnd.uniform(-1, 0.7))
        if d.length < 0.2:
            continue
        d.normalize()
        root = HC + V(d.x * 0.1, d.y * 0.1, d.z * 0.095)
        if root.y < hairline(root) + 0.02 or (d.z > 0.35 and d.y < 0.8):
            continue
        tufts += 1
        out = (d * 1.2 + V(0, 0.15, 0) + V(rnd.uniform(-1, 1), rnd.uniform(-0.5, 1), rnd.uniform(-1, 1)) * 0.4).normalized()
        if d.z > -0.3:
            out.y = max(out.y, -0.15)
        side = out.cross(V(0, 1, 0))
        side = side.normalized() if side.length > 1e-3 else V(1, 0, 0)
        bend = side * rnd.uniform(-1, 1) * 0.5 + V(0, rnd.uniform(0, 0.4), 0)
        L = rnd.uniform(0.04, 0.065) * (1.15 if abs(d.y) < 0.5 else 1)
        hair.add(tube([root - out * 0.012, root + out * L * 0.5 + bend * L * 0.25, root + out * L + bend * L * 0.7],
                      [0.021, 0.013, 0.0012], 7, 5, flat=0.7, up=d))
    # fuller at the sides, above and behind the ears
    for sd in (-1, 1):
        for j, (y, z, dy) in enumerate(((0.875, -0.015, -0.2), (0.862, -0.05, -0.35), (0.85, -0.085, -0.45), (0.9, 0.0, 0.1))):
            root = V(sd * 0.088, y, z)
            out = V(sd * 1.0, dy, -0.25 - 0.1 * j).normalized()
            tip = root + out * (0.055 + 0.008 * (j % 2))
            hair.add(tube([root - out * 0.01, (root + tip) / 2 + V(0, 0.006, 0), tip, tip + V(0, 0.012, -0.004)], [0.024, 0.017, 0.006, 0.0012], 7, 6,
                          flat=0.7, up=(0, 1, 0)))
    for i, xo in enumerate((-0.072, -0.043, -0.014, 0.015, 0.044, 0.072)):
        sd = 1 if i % 2 else -1
        root = C + V(xo * 0.9, 0.085, 0.045 - abs(xo) * 0.2)
        tip = C + V(xo * 1.15 + sd * 0.016, 0.036 + abs(xo) * 0.12 + 0.006 * (i % 3), 0.1 - abs(xo) * 0.33)
        mid = (root + tip) / 2 + V(0, 0.008, 0.02)
        hair.add(tube([root, mid, tip, tip + V(sd * 0.01, 0.01, -0.002)], [0.026, 0.022, 0.008, 0.0012], 7, 6, flat=0.6, up=(0, 0, 1)))
    m.part('hair', 'head', hair, HAIR, 0.003, mods=[('remesh', 0.0035), ('smooth', 0.5, 2), ('target', 2200)])
    return m


# ---------------------------------------------------------------------------------------------------- the lamplighter
# Sheet: old man with a short white beard and moustache, wild white hair, red knitted stocking cap
# with a cream pompom, navy work suit (belt with brass buckle, rolled cuffs, baggy trousers bloused
# over the boots), long orange-red fringed scarf, brown lace-up boots, a long pole. About 1.35 tall.
def lamplighter():
    P = {'hips': (0, 0.58, 0), 'torso': (0, 0.58, 0), 'head': (0, 1.06, 0)}
    for sd, k in ((-1, '-'), (1, '+')):
        P['leg' + k] = (0.085 * sd, 0.58, 0)
        P['arm' + k] = (0.172 * sd, 0.95, 0)
        P['fore' + k] = (0.172 * sd, 0.76, 0)
    P['pole'] = (-0.172, 0.54, 0.0)
    m = Model('lamplighter', P)
    NAVY, NAVY_D, BOOT, BOOT_L, SOLE, SKIN, WHITE, SCARF, CAP = '#3f4c7c', '#323d66', '#8c5a35', '#9e6c43', '#5a3920', '#f1caa6', '#f2eee4', '#d35a2d', '#c9502f'

    for sd, k in ((-1, '-'), (1, '+')):
        x = 0.085 * sd
        m.part('trousers' + k, 'leg' + k, lathe([(0, 0.64), (0.085, 0.635), (0.1, 0.56), (0.1, 0.46), (0.094, 0.36), (0.097, 0.29), (0.093, 0.24),
                                                 (0.07, 0.215), (0.056, 0.205), (0, 0.2)], 18, c=(x, 0, 0), sz=0.95,
                                                rfn=lambda r, y, a: r * (1 + 0.05 * math.sin(4 * a + 1) * max(0, min(1, (0.45 - y) * 4)))),
               NAVY, 0.004, mods=[('subsurf', 1), ('target', 450)])
        boot = join(lathe([(0, 0.05), (0.052, 0.05), (0.056, 0.1), (0.055, 0.17), (0.06, 0.215), (0, 0.215)], 16, c=(x, 0, 0)),
                    sphere((x, 0.052, 0.045), (0.058, 0.05, 0.1), 16, 10))
        boot.map(lambda p: V(p.x, max(p.y, 0.022), p.z))
        m.part('boot' + k, 'leg' + k, boot, BOOT, 0.004, mods=[('remesh', 0.005), ('smooth', 0.8, 4), ('target', 360)])
        m.part('sole' + k, 'leg' + k, lathe([(0, 0.0), (0.058, 0.0), (0.06, 0.016), (0.058, 0.026), (0, 0.026)], 16, c=(x, 0, 0.04), sz=1.95), SOLE, 0.003)
        m.part('bootcuff' + k, 'leg' + k, tube([(x + 0.058 * math.sin(a), 0.212, 0.058 * math.cos(a)) for a in [i / 12 * 2 * math.pi for i in range(13)]],
                                               [0.014], 5, 16), BOOT_L, 0.0025, mods=[('noise', 0.003, 0.02)])
        laces = Geo()
        for y in (0.085, 0.11, 0.135, 0.16, 0.185):
            laces.add(tube([(x - 0.024, y - 0.008, 0.049), (x, y, 0.058), (x + 0.024, y + 0.008, 0.049)], [0.003], 4, 4))
        m.part('laces' + k, 'leg' + k, laces, '#4a2c18', 0)

    # jacket of the work suit: a little round in the belly
    jacket = join(lathe([(0, 0.56), (0.15, 0.56), (0.168, 0.62), (0.172, 0.7), (0.17, 0.78), (0.166, 0.86), (0.167, 0.93),
                                     (0.155, 0.975), (0.11, 1.015), (0.06, 1.04), (0.045, 1.05), (0, 1.052)], 24, sz=0.68,
                                    rfn=lambda r, y, a: r * (1 + 0.1 * max(0, math.cos(a)) * math.exp(-((y - 0.7) / 0.1) ** 2))),
                  sphere((-0.125, 0.94, -0.005), (0.06, 0.045, 0.075), 12, 8), sphere((0.125, 0.94, -0.005), (0.06, 0.045, 0.075), 12, 8))
    m.part('jacket', 'torso', jacket, NAVY, 0.0045, mods=[('remesh', 0.006), ('smooth', 0.6, 3), ('target', 1000)])

    def zfront(y, extra=0.0):
        r = 0.17 * 0.68 * (1 + 0.1 * math.exp(-((y - 0.7) / 0.1) ** 2)) * (1 if y < 0.9 else 0.97)
        return r + extra
    m.part('belt', 'torso', lathe([(0.168, 0.735), (0.178, 0.738), (0.178, 0.767), (0.168, 0.77)] + [(0.168, 0.735)], 28, sz=0.68,
                                  rfn=lambda r, y, a: r * (1 + 0.1 * max(0, math.cos(a)) * math.exp(-((y - 0.7) / 0.1) ** 2) + 0.012)),
           '#5c3b22', 0.0025)
    zb = zfront(0.752, 0.016)
    m.part('buckle', 'torso', box((0, 0.752, zb), (0.052, 0.04, 0.008)), '#caa24c', 0.0015)
    m.part('buckle-in', 'torso', box((0, 0.752, zb + 0.004), (0.03, 0.02, 0.004)), '#5c3b22', 0)
    btn = Geo()
    for y in (0.83, 0.89, 0.95):
        btn.add(sphere((0.0, y, zfront(y, 0.003)), (0.009, 0.009, 0.005), 8, 6))
    m.part('buttons', 'torso', btn, '#26305a', 0.001)
    m.part('placket', 'torso', tube([(0.012, 0.775, zfront(0.775)), (0.012, 0.88, zfront(0.88)), (0.012, 0.99, zfront(0.99) - 0.01)], [0.0025], 4, 6),
           NAVY_D, 0)
    # shirt collar points under the scarf
    for sd in (-1, 1):
        m.part('collar%+d' % sd, 'torso', tube([(sd * 0.03, 1.035, 0.07), (sd * 0.055, 1.0, 0.095), (sd * 0.06, 0.975, 0.1)], [0.022, 0.02, 0.0005], 6, 5, flat=0.25,
                                                up=(0, 0, 1)), NAVY, 0.0025)

    # scarf: two thick turns round the neck, one fringed end down the front, the other down the back
    wrap = Geo()
    for i, (y, tilt, rx, rz, th) in enumerate(((1.03, 0.25, 0.082, 0.078, 0.034), (1.06, -0.15, 0.074, 0.07, 0.03))):
        pts = [(math.sin(a) * rx, y + math.cos(a) * tilt * 0.08, math.cos(a) * rz) for a in [j / 16 * 2 * math.pi for j in range(17)]]
        wrap.add(tube(pts, [th], 6, 20, flat=0.75, up=(0, 0, 1)))
    m.part('scarf', 'torso', wrap, SCARF, 0.004, mods=[('noise', 0.005, 0.03)])

    def scarf_end(points, width, fringe_dir):
        g = tube(points, [width * 0.8, width, width, width], 8, 14, flat=0.28, up=(0, 0, 1) if fringe_dir > 0 else (0, 0, -1))
        end = V(points[-1])
        prev = V(points[-2])
        down = (end - prev).normalized()
        across = down.cross(V(0, 0, 1)).normalized()
        fr = Geo()
        for i in range(7):
            u = (i - 3) / 3
            s = end + across * (u * width * 0.85)
            e = s + down * (0.05 + 0.012 * (i % 2)) + across * (u * 0.006)
            fr.add(tube([s - down * 0.005, (s + e) / 2, e], [0.0045, 0.004, 0.0035], 4, 3))
            fr.add(sphere(e, 0.0065, 4, 3))
        return g, fr
    front, fringe1 = scarf_end([(0.06, 1.02, 0.115), (0.1, 0.94, 0.14), (0.115, 0.8, 0.148), (0.12, 0.64, 0.14), (0.12, 0.55, 0.135)], 0.048, 1)
    back, fringe2 = scarf_end([(-0.04, 1.03, -0.1), (-0.07, 0.93, -0.125), (-0.085, 0.78, -0.13), (-0.09, 0.64, -0.125), (-0.09, 0.57, -0.12)], 0.046, -1)
    m.part('scarf-ends', 'torso', join(front, back), SCARF, 0.0035, mods=[('noise', 0.004, 0.04)])
    m.part('scarf-fringe', 'torso', join(fringe1, fringe2), '#c64f25', 0.0015)

    # arms bend at the elbow (upper arm, forearm): the pole is held in the right hand
    for sd, k in ((-1, '-'), (1, '+')):
        x = 0.172 * sd
        m.part('upper' + k, 'arm' + k, lathe([(0, 0.985), (0.035, 0.98), (0.054, 0.958), (0.06, 0.92), (0.057, 0.83), (0.052, 0.77), (0, 0.74)], 14, c=(x, 0, 0)),
               NAVY, 0.004, mods=[('subsurf', 1), ('target', 380)])
        m.part('lower' + k, 'fore' + k, lathe([(0, 0.79), (0.045, 0.785), (0.052, 0.76), (0.05, 0.66), (0.054, 0.62), (0, 0.6)], 14, c=(x, 0, 0)),
               NAVY, 0.004, mods=[('subsurf', 1), ('target', 320)])
        m.part('cuff' + k, 'fore' + k, lathe([(0.046, 0.585), (0.06, 0.59), (0.063, 0.615), (0.06, 0.64), (0.046, 0.645)] + [(0.046, 0.585)], 16, c=(x, 0, 0)),
               NAVY_D, 0.003)
        hand = join(sphere((x, 0.55, 0.005), (0.034, 0.045, 0.03), 12, 8),
                    sphere((x - sd * 0.028, 0.565, 0.018), (0.012, 0.024, 0.012), 8, 6, rot=(0.3, 0, -sd * 0.4)))
        m.part('hand' + k, 'fore' + k, hand, SKIN, 0.003)
    m.part('pole', 'pole', tube([(-0.172, 0.0, 0.0), (-0.172, 1.46, 0.0)], [0.013, 0.011], 8, 2), '#9a7448', 0.004)
    m.part('pole-tip', 'pole', sphere((-0.172, 1.47, 0.0), (0.016, 0.02, 0.016), 8, 6), '#5a4632', 0.002)

    # head
    C = V(0, 1.2, 0)
    m.part('face', 'head', join(sphere(C, (0.098, 0.106, 0.096), 22, 14), sphere(C + V(0, -0.05, 0.02), (0.075, 0.055, 0.07), 14, 10)), SKIN, 0.004,
           mods=[('remesh', 0.006), ('smooth', 0.6, 3), ('target', 950)])
    m.part('nose', 'head', sphere(C + V(0, -0.012, 0.097), (0.018, 0.021, 0.019), 10, 8), '#edb99a', 0.002)
    for sd in (-1, 1):
        m.part('ear%+d' % sd, 'head', sphere(C + V(sd * 0.097, -0.005, -0.005), (0.016, 0.03, 0.02), 10, 8, rot=(0, sd * 0.3, sd * 0.12)), SKIN, 0.0025)
    rnd = random.Random(5)
    # beard: short and full along the jaw, with a moustache under the nose
    beard = join(sphere(C + V(0, -0.088, 0.058), (0.062, 0.052, 0.05), 14, 10),
                 sphere(C + V(-0.06, -0.06, 0.045), (0.042, 0.055, 0.045), 12, 8),
                 sphere(C + V(0.06, -0.06, 0.045), (0.042, 0.055, 0.045), 12, 8),
                 sphere(C + V(-0.085, -0.025, 0.02), (0.026, 0.05, 0.04), 10, 8),
                 sphere(C + V(0.085, -0.025, 0.02), (0.026, 0.05, 0.04), 10, 8))
    m.part('beard', 'head', beard, WHITE, 0.003, mods=[('remesh', 0.006), ('smooth', 0.6, 2), ('noise', 0.006, 0.012), ('target', 600)])
    stache = Geo()
    for sd in (-1, 1):
        stache.add(tube([C + V(0, -0.035, 0.105), C + V(sd * 0.03, -0.04, 0.104), C + V(sd * 0.055, -0.05, 0.09), C + V(sd * 0.064, -0.064, 0.075)],
                        [0.012, 0.015, 0.011, 0.002], 7, 8))
        stache.add(tube([C + V(sd * 0.018, 0.043, 0.094), C + V(sd * 0.042, 0.047, 0.091), C + V(sd * 0.066, 0.036, 0.079)], [0.008, 0.01, 0.003], 6, 5))
    m.part('moustache', 'head', stache, WHITE, 0.002)
    # wild white hair below the cap: a fluffy fringe round the sides and back, wisps sticking out
    hair = Geo()
    for i in range(40):
        phi = math.radians(70 + 220 * (i + 0.5) / 40) + rnd.uniform(-0.05, 0.05)
        y = rnd.uniform(-0.035, 0.06)
        d = V(math.sin(phi), 0, math.cos(phi))
        r = rnd.uniform(0.026, 0.036)
        hair.add(sphere(C + V(d.x * 0.092, y, d.z * 0.09), (r, r * 1.1, r), 8, 6))
    for i in range(30):
        phi = math.radians(rnd.uniform(65, 295))
        d = V(math.sin(phi), 0, math.cos(phi))
        root = C + V(d.x * 0.1, rnd.uniform(-0.02, 0.065), d.z * 0.1)
        out = (d + V(rnd.uniform(-0.4, 0.4), rnd.uniform(0.1, 0.9), rnd.uniform(-0.5, 0.2))).normalized()
        L = rnd.uniform(0.028, 0.045) * (1.2 if abs(math.cos(phi)) < 0.5 else 1)
        tip = root + out * L
        hair.add(tube([root - out * 0.01, root + out * L * 0.5, tip, tip + V(rnd.uniform(-0.01, 0.01), 0.01, 0)], [0.018, 0.013, 0.006, 0.001], 6, 5,
                      flat=1.0, up=d))
    m.part('hair', 'head', hair, WHITE, 0.0022, mods=[('remesh', 0.0032), ('smooth', 0.5, 2), ('target', 1000)])

    # knitted stocking cap: ribbed brim, crown drooping to the back left, pompom
    brim = lathe([(0.0, 0.0), (0.112, 0.0), (0.12, 0.02), (0.116, 0.042), (0.104, 0.048), (0.0, 0.048)], 36, c=C + V(0, 0.048, -0.004), sz=0.97,
                 rfn=lambda r, y, a: r * (1 + (0.035 * math.cos(a * 18) if 0 < r < 0.12 else 0)))
    brim.rotate((-0.12, 0, 0.05), about=C + V(0, 0.07, 0))
    m.part('cap-brim', 'head', brim, '#c24a2b', 0.003)
    crown = tube([C + V(0, 0.07, -0.005), C + V(0.005, 0.13, -0.02), C + V(0.045, 0.165, -0.075), C + V(0.1, 0.13, -0.135),
                  C + V(0.13, 0.06, -0.155), C + V(0.135, 0.02, -0.16)], [0.108, 0.1, 0.08, 0.05, 0.025, 0.012], 16, 14)
    m.part('cap', 'head', crown, CAP, 0.0035, mods=[('noise', 0.003, 0.015)])
    m.part('pompom', 'head', sphere(C + V(0.14, -0.005, -0.165), 0.04, 14, 10), '#f4ecd8', 0.003, mods=[('subsurf', 1), ('noise', 0.012, 0.012), ('target', 300)])
    return m


# ---------------------------------------------------------------------------------------------------- the fox
# Sheet: slender red fox, white bib from the cheeks down the chest, white belly line and tail tip,
# black-brown stockings and ear backs, pale inner ears, long narrow muzzle. About 0.7 to the ear tips.
def fox():
    P = {'body': (0, 0.36, 0), 'trunk': (0, 0.36, 0.13), 'neck': (0, 0.41, 0.2), 'head': (0, 0.535, 0.29),
         'tail': (0, 0.405, -0.24)}
    for sd, k in ((-1, '-'), (1, '+')):
        P['front' + k] = (0.048 * sd, 0.37, 0.13)
        P['hind' + k] = (0.056 * sd, 0.37, -0.15)
        P['shin' + k] = (0.056 * sd, 0.235, -0.115)
        P['foot' + k] = (0.056 * sd, 0.105, -0.19)
        P['ear' + k] = (0.036 * sd, 0.578, 0.265)
    m = Model('fox', P)
    RED, WHITE, DARK, INNER = (224, 124, 48), (247, 240, 225), (56, 40, 30), (240, 222, 196)
    clamp = lambda x: max(0.0, min(1.0, x))

    # body: deep chest, slim waist, round rump
    def fur_trunk(p, n):
        chest = clamp((n.z - 0.1) * 3) * clamp((p.z - 0.19) * 25)
        belly = clamp((-n.y - 0.6) * 4) * clamp((p.z + 0.02) * 12)
        return mix(RED, WHITE, max(chest, belly))
    body = join(sphere((0, 0.365, 0.16), (0.074, 0.11, 0.1), 14, 10), sphere((0, 0.385, 0.02), (0.063, 0.08, 0.15), 14, 10),
                sphere((0, 0.395, -0.155), (0.07, 0.085, 0.1), 14, 10))
    for sd in (-1, 1):
        body.add(sphere((sd * 0.034, 0.37, 0.135), (0.04, 0.08, 0.062), 10, 8))
    m.part('trunk', 'trunk', body, '#ffffff', 0.0035, mods=[('remesh', 0.006), ('smooth', 0.7, 4), ('noise', 0.004, 0.02), ('target', 1500)], vc=fur_trunk)

    # neck and white bib, thick and leaning forward to the head
    def fur_neck(p, n):
        return mix(RED, WHITE, clamp((n.z - 0.0) * 3) * clamp((0.54 - p.y) * 30))
    neck = join(tube([(0, 0.36, 0.17), (0, 0.43, 0.23), (0, 0.5, 0.27)], [0.074, 0.066, 0.056], 12, 8),
                sphere((0, 0.4, 0.235), (0.062, 0.085, 0.055), 12, 8))
    for sd in (-1, 0, 1):
        neck.add(tube([(sd * 0.03, 0.35, 0.245), (sd * 0.028, 0.32, 0.24), (sd * 0.02, 0.295 + abs(sd) * 0.015, 0.225)], [0.02, 0.016, 0.001], 6, 4, flat=0.5,
                      up=(0, 0, 1)))
    m.part('neck', 'neck', neck, '#ffffff', 0.0035, mods=[('remesh', 0.006), ('smooth', 0.5, 3), ('target', 700)], vc=fur_neck)

    # head: narrow skull, cheeks with white ruffs flaring out, long pointed muzzle with a white jaw, black nose
    H = V(0, 0.535, 0.29)

    def fur_head(p, n):
        # white under a line from below the eyes down to the corner of the mouth; the ruffs are white
        line = H.y - 0.006 - (p.z - H.z) * 0.2
        white = clamp((line - p.y) * 60)
        ruff = clamp((abs(p.x) - 0.06) * 60) * clamp((H.y + 0.01 - p.y) * 40)
        return mix(RED, WHITE, max(white, ruff))
    head = join(sphere(H + V(0, 0.008, -0.01), (0.056, 0.052, 0.06), 16, 12),
                sphere(H + V(0, -0.018, 0.012), (0.062, 0.04, 0.05), 14, 10),
                tube([H + V(0, -0.006, 0.03), H + V(0, -0.016, 0.08), H + V(0, -0.028, 0.13), H + V(0, -0.032, 0.145)], [0.038, 0.027, 0.013, 0.006], 12, 10,
                     flat=0.78),
                sphere(H + V(0, -0.038, 0.06), (0.03, 0.016, 0.055), 10, 8))
    for sd in (-1, 1):
        for j, (dy, dz, L) in enumerate(((-0.01, 0.0, 0.05), (-0.03, -0.012, 0.045), (-0.045, -0.02, 0.035))):
            root = H + V(sd * 0.045, dy, dz)
            tip = root + V(sd * L, -0.012 - 0.008 * j, -0.022)
            head.add(tube([root, (root + tip) / 2 + V(0, 0.004, 0), tip], [0.022, 0.014, 0.001], 8, 5, flat=0.6, up=(0, 0, 1)))
    m.part('head', 'head', head, '#ffffff', 0.003, mods=[('remesh', 0.004), ('smooth', 0.5, 2), ('target', 1300)], vc=fur_head)
    m.part('nose', 'head', sphere(H + V(0, -0.028, 0.15), (0.012, 0.009, 0.01), 10, 8), '#2a211c', 0.0012)
    m.part('mouth', 'head', tube([H + V(-0.03, -0.043, 0.075), H + V(-0.012, -0.046, 0.12), H + V(0, -0.044, 0.14), H + V(0.012, -0.046, 0.12),
                                  H + V(0.03, -0.043, 0.075)], [0.0016], 4, 14), '#4a3326', 0)

    # ears: big, pointed; dark backs and tips, pale fur inside
    def fur_ear(p, n, base):
        h = (p.y - base.y) / 0.12
        inner = clamp((n.z - 0.25) * 3) * clamp((0.85 - h) * 6)
        c = mix(RED, DARK, clamp((h - 0.3) * 3) if n.z < 0.3 else clamp((h - 0.7) * 5))
        return mix(c, INNER, inner)
    for sd, k in ((-1, '-'), (1, '+')):
        b = V(0.036 * sd, 0.572, 0.265)
        ear = tube([b, b + V(sd * 0.01, 0.055, -0.006), b + V(sd * 0.014, 0.11, -0.003), b + V(sd * 0.012, 0.128, 0.0)], [0.04, 0.03, 0.009, 0.0005],
                   10, 8, flat=0.4, up=(0, 0, 1))
        ear.rotate((0, -sd * 0.15, -sd * 0.18), about=b)
        m.part('ear' + k, 'ear' + k, ear, '#ffffff', 0.002, vc=lambda p, n, b=b: fur_ear(p, n, b))

    # legs: slender, black-brown stockings
    def fur_leg(top_dark):
        return lambda p, n: mix(RED, DARK, clamp((top_dark - p.y) * 18))
    for sd, k in ((-1, '-'), (1, '+')):
        x = 0.048 * sd
        leg = join(tube([(x, 0.4, 0.13), (x, 0.3, 0.135), (x, 0.17, 0.132), (x * 1.02, 0.03, 0.14)], [0.034, 0.026, 0.019, 0.018], 10, 10),
                   sphere((x, 0.018, 0.155), (0.021, 0.017, 0.032), 10, 8))
        m.part('front' + k, 'front' + k, leg, '#ffffff', 0.0028, vc=fur_leg(0.2))
        x = 0.056 * sd
        thigh = join(sphere((x, 0.35, -0.15), (0.044, 0.085, 0.078), 12, 8), tube([(x, 0.36, -0.14), (x, 0.28, -0.13), (x, 0.235, -0.115)], [0.042, 0.033, 0.026], 10, 6))
        m.part('thigh' + k, 'hind' + k, thigh, '#ffffff', 0.0015, mods=[('remesh', 0.006), ('smooth', 0.5, 2), ('target', 450)], vc=fur_leg(0.0))
        m.part('shin' + k, 'shin' + k, tube([(x, 0.245, -0.115), (x, 0.17, -0.155), (x, 0.105, -0.19)], [0.024, 0.02, 0.017], 10, 6), '#ffffff', 0.0028,
               vc=fur_leg(0.19))
        m.part('foot' + k, 'foot' + k, join(tube([(x, 0.11, -0.19), (x, 0.05, -0.175), (x, 0.02, -0.165)], [0.017, 0.016, 0.017], 10, 6),
                                            sphere((x, 0.017, -0.15), (0.021, 0.017, 0.032), 10, 8)), '#ffffff', 0.0028, vc=fur_leg(0.3))

    # the bushy tail hangs down behind, its tip white
    T0 = V(0, 0.405, -0.24)
    pts = [T0, T0 + V(0, -0.04, -0.07), T0 + V(0, -0.14, -0.14), T0 + V(0, -0.26, -0.16), T0 + V(0, -0.35, -0.13), T0 + V(0, -0.385, -0.105)]
    tail = tube(pts, [0.026, 0.046, 0.06, 0.056, 0.038, 0.0015], 12, 24)
    tip = pts[-1]

    def fur_tail(p, n):
        return mix(RED, WHITE, clamp((0.14 - (p - tip).length) * 22))
    m.part('tail', 'tail', tail, '#ffffff', 0.003, mods=[('subsurf', 1), ('noise', 0.008, 0.012), ('target', 1000)], vc=fur_tail)
    return m


# ---------------------------------------------------------------------------------------------------- the rose
# Sheet: a full red rose with ruffled petals, green sepals, an olive stem with four thorns and
# serrated leaves on short stalks. film3d.js grows her (shoot, bud, flower) from these templates.
def rose():
    m = Model('rose', {'root': (0, 0, 0)})
    # stem: 1 unit tall, scaled to the stage in film3d.js
    m.part('stem', 'root', tube([(0, 0, 0), (0.006, 0.35, 0), (-0.004, 0.7, 0.003), (0, 1.0, 0)], [0.012, 0.011, 0.0095, 0.009], 8, 16), '#7f8f48', 0.004)

    # a leaf on a short stalk, growing along +y from the origin, its face toward +z
    def leaf(length=0.17, width=0.095):
        rows, cols = 12, 6
        v, f = [], []
        stalk = 0.045
        for i in range(rows + 1):
            t = i / rows
            w = width / 2 * math.sin(math.pi * min(1, t * 1.05)) ** 0.85 * (1 - 0.1 * t)
            if 0 < i < rows:
                w *= 1.0 + (0.12 if i % 2 else -0.06)      # serrated edge
            for j in range(cols + 1):
                u = (j / cols) * 2 - 1
                x = u * w
                y = stalk + t * length
                z = -abs(u) ** 2 * 0.012 + math.sin(t * math.pi) * 0.012 - t * t * 0.02
                v.append(V(x, y, z))
        for i in range(rows):
            for j in range(cols):
                a = i * (cols + 1) + j
                b = a + cols + 1
                f.append((a, a + 1, b + 1, b))
        g = Geo(v, f)
        return g
    m.part('leaf', 'root', leaf(), '#76874a', 0.0015, mods=[('solidify', 0.003, 0)], template=True)
    vein = tube([(0, 0.0, 0), (0, 0.045, 0.004), (0, 0.12, 0.009), (0, 0.185, -0.004)], [0.004, 0.0035, 0.002, 0.0008], 5, 10)
    for i in range(1, 5):
        t = i / 5
        y = 0.045 + t * 0.17
        for sd in (-1, 1):
            vein.add(tube([(0, y, 0.006), (sd * 0.025 * (1.2 - t), y + 0.02, 0.004)], [0.0015, 0.0006], 4, 3))
    m.part('leafvein', 'root', vein, '#aeb36d', 0, template=True)
    m.part('thorn', 'root', tube([(0, 0, 0), (0.012, 0.004, 0), (0.026, 0.012, 0)], [0.007, 0.004, 0.0003], 6, 5), '#8b4a2c', 0.0015, template=True)

    # petals: base at the origin, growing along +y (+z = away from the flower's heart). They are cupped
    # across, curve back in toward the heart as they rise (so the open flower is round, not a cone) and
    # roll outward at a ruffled lip. film3d.js tilts each ring outward as the flower opens.
    def petal(width, height, cup, lip, ruffle):
        rows, cols = 5, 9
        v, f = [], []
        for i in range(rows + 1):
            t = i / rows
            w = width * (0.35 + 0.65 * math.sin(math.pi * 0.5 * min(1, t * 1.3))) * (1 - 0.2 * t ** 3)
            for j in range(cols + 1):
                u = j / cols * 2 - 1
                x = u * w
                y = t * height * (1 - 0.1 * u * u) + ruffle * 0.5 * t ** 4 * math.cos(u * 5 + width * 40)
                z = (-cup * t * t + lip * max(0, t - 0.68) ** 2 * 10 + u * u * 0.024 * (0.5 + t)
                     + ruffle * t ** 3 * math.sin(u * 4.5 + width * 50))
                v.append(V(x, y, z))
        for i in range(rows):
            for j in range(cols):
                a = i * (cols + 1) + j
                b = a + cols + 1
                f.append((a, a + 1, b + 1, b))
        return Geo(v, f)
    for ring in range(4):
        m.part('petal%d' % ring, 'root', petal(0.03 + ring * 0.009, 0.085 + ring * 0.014, 0.012 + ring * 0.016, 0.012 + ring * 0.006,
                                                0.005 + ring * 0.0015),
               '#ffffff', 0.0011, mods=[('solidify', 0.0024, 0)], template=True)
    m.part('sepal', 'root', tube([(0, -0.038, 0), (0, -0.035, 0.047), (0, -0.058, 0.08), (0, -0.075, 0.09)], [0.016, 0.02, 0.008, 0.0003], 6, 8, flat=0.25),
           '#76874a', 0.0015, template=True)
    return m


# ---------------------------------------------------------------------------------------------------- main
def main():
    global COLL
    # In a live Blender (e.g. run from the Text editor) only our own collection is replaced.
    old = bpy.data.collections.get('lp-models')
    if old:
        for ob in list(old.objects):
            bpy.data.objects.remove(ob, do_unlink=True)
        bpy.data.collections.remove(old)
    COLL = bpy.data.collections.new('lp-models')
    bpy.context.scene.collection.children.link(COLL)
    models = {}
    for build in (prince, lamplighter, fox, rose):
        mdl = build()
        models[mdl.name] = mdl.export()
        print('[lp-models3d] %-12s %3d parts %6d triangles' % (mdl.name, len(mdl.parts), mdl.tris))
    import json
    body = json.dumps(models, separators=(',', ':'))
    with open(OUT, 'w') as fh:
        fh.write('/* The Little Prince film: 3D character meshes, built in Blender by tools/lp-models3d.py. Do not edit by hand:\n'
                 '   change the script and run  blender -b --factory-startup --python tools/lp-models3d.py\n'
                 '   Each part: g = pivot group, c = colour, l = ink line, p/q/i = base64 Int16 positions (o + p/32767*s),\n'
                 '   Int8 normals, Uint16 triangle indices, k = optional Uint8 RGB vertex colours. */\n')
        fh.write('window.LP_FILM_MODELS = ' + body + ';\n')
    print('[lp-models3d] wrote %s (%d KB)' % (OUT, os.path.getsize(OUT) // 1024))
    if '--blend' in ARGS:
        bpy.ops.wm.save_as_mainfile(filepath=ARGS[ARGS.index('--blend') + 1])


main()

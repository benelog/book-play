"""Build the 3D models of the Little Prince game (books/little-prince/game) and embed them in models.js.

    blender -b --python tools/game-models.py [-- --keep-glb DIR]

The characters reuse the skeleton and animations of Kenney's Mini Characters (CC0,
game/kenney/mini-character.glb); their bodies are new meshes drawn after the reference sheets in
images/characters/ and bound rigidly to its bones (head, torso, arm-left/right, leg-left/right).
The props are a street lamp modelled here, rocks and grass from Kenney's Nature Kit and craters from
his Space Kit (both CC0).
Each model is exported as .glb and written base64 into models.js, because the game must also run
from file://, where neither fetch() nor loading a .glb file works.
Blender units: Z up, the characters face -Y (glTF +Z).
"""
import base64
import math
import os
import sys
import tempfile

import bmesh
import bpy
from mathutils import Euler, Matrix, Quaternion, Vector

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
GAME = os.path.join(ROOT, 'books', 'little-prince', 'game')
KENNEY = os.path.join(GAME, 'kenney')
ACTIONS = ['idle', 'walk', 'sprint', 'interact-right', 'emote-yes', 'emote-no', 'sit']
PROPS = ['rock_smallA', 'rock_smallC', 'rock_smallFlatA', 'rock_smallFlatB', 'stone_smallB', 'stone_smallFlatA',
         'grass', 'grass_large', 'grass_leafs', 'crater', 'craterLarge']

argv = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
KEEP = argv[argv.index('--keep-glb') + 1] if '--keep-glb' in argv else None


# ---------- geometry helpers ----------

def xf(loc=(0, 0, 0), rot=(0, 0, 0), scale=(1, 1, 1)):
    q = rot if isinstance(rot, Quaternion) else Euler(rot).to_quaternion()
    s = Vector(scale) if hasattr(scale, '__len__') else Vector((scale, scale, scale))
    return Matrix.LocRotScale(Vector(loc), q, s)


def toward(d):
    """Rotation that turns +Z toward direction d."""
    return Vector((0, 0, 1)).rotation_difference(Vector(d).normalized())


def sphere(M, seg=18, rings=12):
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=seg, v_segments=rings, radius=1)
    bmesh.ops.transform(bm, matrix=M, verts=bm.verts)
    return bm


def shell(M, n, keep, seg=24, rings=16):
    """Unit sphere keeping the part where dot(v, n) > keep (before M), e.g. hair over the top and back."""
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=seg, v_segments=rings, radius=1)
    n = Vector(n).normalized()
    geom = bm.verts[:] + bm.edges[:] + bm.faces[:]
    bmesh.ops.bisect_plane(bm, geom=geom, plane_co=n * keep, plane_no=n, clear_inner=True)
    bmesh.ops.transform(bm, matrix=M, verts=bm.verts)
    return bm


def cone(M, r1, r2, d, seg=18):
    """Truncated cone along local Z: radius r1 at -d/2, r2 at +d/2."""
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, cap_tris=False, segments=seg, radius1=r1, radius2=r2, depth=d)
    bmesh.ops.transform(bm, matrix=M, verts=bm.verts)
    return bm


def box(M):
    bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=1)
    bmesh.ops.transform(bm, matrix=M, verts=bm.verts)
    return bm


def torus(M, R, r, seg=24, ring=8):
    bm = bmesh.new()
    rows = []
    for i in range(seg):
        a = 2 * math.pi * i / seg
        row = []
        for j in range(ring):
            b = 2 * math.pi * j / ring
            row.append(bm.verts.new(((R + r * math.cos(b)) * math.cos(a), (R + r * math.cos(b)) * math.sin(a), r * math.sin(b))))
        rows.append(row)
    for i in range(seg):
        for j in range(ring):
            bm.faces.new((rows[i][j], rows[(i + 1) % seg][j], rows[(i + 1) % seg][(j + 1) % ring], rows[i][(j + 1) % ring]))
    bmesh.ops.transform(bm, matrix=M, verts=bm.verts)
    return bm


def star(M, r_out=1.0, r_in=0.45, depth=0.3):
    """Five-pointed star prism in the XZ plane, thickness along Y."""
    bm = bmesh.new()
    front, back = [], []
    for i in range(10):
        a = math.pi / 2 + i * math.pi / 5
        r = r_out if i % 2 == 0 else r_in
        x, z = r * math.cos(a), r * math.sin(a)
        front.append(bm.verts.new((x, -depth / 2, z)))
        back.append(bm.verts.new((x, depth / 2, z)))
    bm.faces.new(front[::-1])
    bm.faces.new(back)
    for i in range(10):
        j = (i + 1) % 10
        bm.faces.new((front[i], front[j], back[j], back[i]))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    bmesh.ops.transform(bm, matrix=M, verts=bm.verts)
    return bm


class Figure:
    """Collects parts (one material and one bone each) and joins them into one skinned mesh."""

    def __init__(self, name):
        self.name = name
        self.parts = []
        self.mats = {}

    def mat(self, name, hex_color):
        m = bpy.data.materials.get(name) or bpy.data.materials.new(name)
        c = tuple(int(hex_color[i:i + 2], 16) / 255 for i in (1, 3, 5))
        lin = tuple(((v + 0.055) / 1.055) ** 2.4 if v > 0.04045 else v / 12.92 for v in c)
        bsdf = next(n for n in m.node_tree.nodes if n.type == 'BSDF_PRINCIPLED')
        bsdf.inputs['Base Color'].default_value = (*lin, 1)
        bsdf.inputs['Roughness'].default_value = 1.0
        bsdf.inputs['Metallic'].default_value = 0.0
        m.diffuse_color = (*lin, 1)
        self.mats[name] = m
        return m

    def add(self, bm, mat, bone, smooth=True):
        me = bpy.data.meshes.new(f'{self.name}-part')
        bm.to_mesh(me)
        bm.free()
        for p in me.polygons:
            p.use_smooth = smooth
        ob = bpy.data.objects.new(me.name, me)
        bpy.context.scene.collection.objects.link(ob)
        me.materials.append(self.mats[mat])
        if bone:
            ob.vertex_groups.new(name=bone).add(list(range(len(me.vertices))), 1.0, 'REPLACE')
        self.parts.append(ob)
        return ob

    def join(self):
        with bpy.context.temp_override(active_object=self.parts[0], selected_editable_objects=self.parts):
            bpy.ops.object.join()
        ob = self.parts[0]
        ob.name = ob.data.name = self.name
        me = ob.data                                  # one slot per material, not one per part
        uniq = []
        for m in me.materials:
            if m not in uniq:
                uniq.append(m)
        idx = [uniq.index(m) for m in me.materials]
        face_mat = [idx[p.material_index] for p in me.polygons]
        me.materials.clear()                          # (resets the face indices, so they are set again after)
        for m in uniq:
            me.materials.append(m)
        for p, i in zip(me.polygons, face_mat):
            p.material_index = i
        return ob


# ---------- scene helpers ----------

def reset():
    bpy.ops.wm.read_factory_settings(use_empty=True)


def import_glb(path):
    before = set(bpy.data.objects)
    bpy.ops.import_scene.gltf(filepath=path)
    return [o for o in bpy.data.objects if o not in before]


def rig():
    """Import the Kenney skeleton with its animations; drop its own meshes."""
    objs = import_glb(os.path.join(KENNEY, 'mini-character.glb'))
    arm = next(o for o in objs if o.type == 'ARMATURE')
    for o in objs:
        if o is not arm:
            bpy.data.objects.remove(o)
    for a in list(bpy.data.actions):
        if a.name not in ACTIONS:
            bpy.data.actions.remove(a)
    for m in list(bpy.data.meshes):
        if m.users == 0:
            bpy.data.meshes.remove(m)
    for im in list(bpy.data.images):
        bpy.data.images.remove(im)
    arm.data.pose_position = 'REST'
    return arm


def posed(arm, bone, action, frame=0):
    """Matrix taking a rest-pose point of `bone` to where it is in `action` at `frame`."""
    ad = arm.animation_data or arm.animation_data_create()
    act = bpy.data.actions[action]
    ad.action = act
    if hasattr(ad, 'action_slot') and act.slots:
        ad.action_slot = act.slots[0]
    arm.data.pose_position = 'POSE'
    bpy.context.scene.frame_set(frame)
    bpy.context.view_layer.update()
    pb = arm.pose.bones[bone]
    m = pb.matrix @ pb.bone.matrix_local.inverted()
    ad.action = None
    arm.data.pose_position = 'REST'
    bpy.context.view_layer.update()
    return m


def bind(body, arm, name):
    arm.name = name + '-rig'
    body.parent = arm
    mod = body.modifiers.new('Armature', 'ARMATURE')
    mod.object = arm
    arm.data.pose_position = 'POSE'


def export(path, objs):
    bpy.ops.object.select_all(action='DESELECT')
    for o in objs:
        o.select_set(True)
    bpy.ops.export_scene.gltf(filepath=path, export_format='GLB', use_selection=True, export_yup=True,
                              export_apply=False, export_animations=True, export_animation_mode='ACTIONS',
                              export_skins=True, export_morph=False, export_extras=False)


# ---------- the characters ----------

SHOULDER = {'arm-left': Vector((0.1, 0.017, 0.288)), 'arm-right': Vector((-0.1, 0.017, 0.288))}
HIP = {'leg-left': 0.064, 'leg-right': -0.064}


def arm_dir(side, down=35):
    """Direction of a hanging arm in the rest pose. The Kenney animations hold the arms out to the
    side (their rest pose is a T, idle lowers them by 45°), so the new arms are modelled bent down by `down` degrees."""
    s = 1 if side == 'arm-left' else -1
    a = math.radians(down)
    return Vector((s * math.cos(a), 0.0, -math.sin(a)))


def head_features(f, c, r, eye='eye', skin='skin', blush='blush'):
    """Eyes, blush, ears and a small mouth on a head sphere centred at c, radius r, facing -Y."""
    for s in (1, -1):
        e = c + Vector((s * 0.36 * r, -0.93 * r, -0.02 * r))
        f.add(sphere(xf(e, toward((s * 0.3, -1, 0)), (0.13 * r, 0.13 * r, 0.06 * r)), 12, 8), eye, 'head')
        hl = e + Vector((s * 0.02 * r, -0.05 * r, 0.05 * r))
        f.add(sphere(xf(hl, toward((0, -1, 0)), (0.04 * r, 0.04 * r, 0.02 * r)), 8, 6), 'white', 'head')
        b = c + Vector((s * 0.55 * r, -0.8 * r, -0.3 * r))
        f.add(sphere(xf(b, toward((s * 0.55, -0.8, -0.2)), (0.16 * r, 0.1 * r, 0.03 * r)), 12, 6), blush, 'head')
        f.add(sphere(xf(c + Vector((s * 0.98 * r, 0.05 * r, -0.05 * r)), (0, 0, 0), (0.12 * r, 0.1 * r, 0.18 * r)), 10, 8), skin, 'head')
    f.add(torus(xf(c + Vector((0, -0.96 * r, -0.36 * r)), toward((0, -1, -0.3)), (1, 0.55, 1)), 0.1 * r, 0.018 * r, 12, 5), 'mouth', 'head')


def build_prince():
    reset()
    arm = rig()
    f = Figure('prince')
    for name, col in [('skin', '#F6D3B5'), ('blush', '#F2A08C'), ('eye', '#2B2B38'), ('white', '#FFFFFF'),
                      ('mouth', '#B5655A'), ('hair', '#F2C94C'), ('coat', '#E8B23A'), ('tunic', '#F1E6CC'),
                      ('star', '#F7D24A'), ('scarf', '#C8462F'), ('boots', '#3B4A72')]:
        f.mat(name, col)

    # head: a round child's head with spiky golden hair
    c, r = Vector((0, 0.0, 0.47)), 0.125
    f.add(sphere(xf(c, (0, 0, 0), (r, r * 0.97, r * 1.02)), 24, 16), 'skin', 'head')
    head_features(f, c, r)
    hc = c + Vector((0, 0.012, 0.012))
    f.add(shell(xf(hc, (0, 0, 0), (r * 1.1, r * 1.1, r * 1.08)), (0, 0.45, 0.89), -0.25), 'hair', 'head')
    n_up = Vector((0, 0.45, 0.89)).normalized()
    for i in range(46):                               # tufts over the shell, swept up and back, a mop of locks
        a = i * 2.39996
        z = 1 - (i + 0.5) / 46 * 1.6
        rr = math.sqrt(max(0.0, 1 - z * z))
        d = Vector((rr * math.cos(a), rr * math.sin(a), z))
        if d.dot(n_up) < -0.12:
            continue
        base = hc + d * r * 1.02
        back = Vector((0, 1, 0.35)) - d * d.dot(Vector((0, 1, 0.35)))
        tip = (d * 0.75 + back.normalized() * 0.55 + Vector((0, 0, 0.25))).normalized()
        f.add(cone(xf(base + tip * 0.02, toward(tip), (1, 0.7, 1)), 0.05, 0.006, 0.08, 10), 'hair', 'head')
    for s_ in (-1.0, -0.5, 0.0, 0.5, 1.0):            # a short fringe over the forehead
        d = Vector((s_ * 0.5, -0.8, 0.38)).normalized()
        base = hc + d * r * 1.02
        tip = (d * 0.4 + Vector((s_ * 0.3, -0.35, -0.8))).normalized()
        f.add(cone(xf(base + tip * 0.012, toward(tip), (1, 0.6, 1)), 0.036, 0.005, 0.05, 10), 'hair', 'head')

    # body: a long open coat over the cream tunic with three star buttons
    f.add(cone(xf((0, 0.02, 0.215)), 0.155, 0.088, 0.25, 24), 'coat', 'torso')
    f.add(sphere(xf((0, 0.02, 0.335), (0, 0, 0), (0.095, 0.085, 0.045)), 18, 10), 'coat', 'torso')
    tilt = math.atan2(0.155 - 0.088, 0.25)
    f.add(box(xf((0, -0.104, 0.215), (-tilt, 0, 0), (0.07, 0.02, 0.245))), 'tunic', 'torso', smooth=False)
    for i, z in enumerate((0.3, 0.255, 0.21)):
        y = -0.115 + (z - 0.215) * math.tan(tilt)    # on the front of the tilted tunic panel
        f.add(star(xf((0, y, z), (-tilt, 0, 0), 0.016), 1.0, 0.45, 0.5), 'star', 'torso', smooth=False)
    for s in (1, -1):                                 # coat edges along the opening
        f.add(box(xf((s * 0.043, -0.104, 0.215), (-tilt, 0, s * 0.35), (0.018, 0.022, 0.245))), 'coat', 'torso')

    # scarf: wound round the neck, one end hanging in front, one streaming behind
    f.add(torus(xf((0, 0.01, 0.35), (0, 0, 0), (1, 1, 1.25)), 0.072, 0.03, 24, 10), 'scarf', 'torso')
    f.add(box(xf((0.055, -0.085, 0.27), (0.12, 0.2, 0.08), (0.045, 0.016, 0.16))), 'scarf', 'torso')
    f.add(box(xf((-0.04, 0.12, 0.31), (1.05, 0, -0.25), (0.05, 0.014, 0.19))), 'scarf', 'torso')

    # arms: coat sleeves with a wider cuff, small hands
    for side, sh in SHOULDER.items():
        d = arm_dir(side)
        f.add(cone(xf(sh + d * 0.065, toward(d)), 0.033, 0.042, 0.13, 14), 'coat', side)
        f.add(sphere(xf(sh, (0, 0, 0), 0.036), 12, 8), 'coat', side)
        f.add(sphere(xf(sh + d * 0.15, toward(d), (0.028, 0.024, 0.032)), 12, 8), 'skin', side)

    # legs: puffy cream trousers and navy boots
    for side, x in HIP.items():
        f.add(cone(xf((x, 0.029, 0.13)), 0.045, 0.04, 0.09, 12), 'tunic', side)
        f.add(sphere(xf((x, 0.029, 0.085), (0, 0, 0), (0.052, 0.05, 0.035)), 14, 8), 'tunic', side)
        f.add(cone(xf((x, 0.029, 0.04)), 0.04, 0.036, 0.075, 12), 'boots', side)
        f.add(sphere(xf((x, 0.0, 0.018), (0, 0, 0), (0.042, 0.062, 0.024)), 14, 8), 'boots', side)

    body = f.join()
    bind(body, arm, 'prince')
    return [arm, body]


def build_lamplighter():
    reset()
    arm = rig()
    f = Figure('lamplighter')
    for name, col in [('skin', '#F2C8A6'), ('blush', '#EFA08A'), ('eye', '#2B2B38'), ('white', '#FFFFFF'),
                      ('mouth', '#A8584C'), ('whisker', '#F2EEE6'), ('cap', '#D9502F'), ('suit', '#3E4A6E'),
                      ('scarf', '#E0642E'), ('belt', '#5A3B22'), ('brass', '#C9A646'), ('boots', '#7A4E2D'),
                      ('pole', '#9B6A3C')]:
        f.mat(name, col)

    # head: white hair, a full white beard and a red knitted cap with a pompom
    c, r = Vector((0, 0.0, 0.465)), 0.11
    f.add(sphere(xf(c, (0, 0, 0), (r, r * 0.97, r * 1.03)), 24, 16), 'skin', 'head')
    head_features(f, c, r)
    f.add(sphere(xf(c + Vector((0, -0.05, -0.085)), (0.35, 0, 0), (0.085, 0.055, 0.07)), 18, 12), 'whisker', 'head')   # beard
    for s_ in (1, -1):                                # moustache, white hair over the ears
        f.add(sphere(xf(c + Vector((s_ * 0.028, -0.1, -0.035)), (0, s_ * 0.4, 0), (0.03, 0.014, 0.014)), 12, 8), 'whisker', 'head')
        f.add(sphere(xf(c + Vector((s_ * 0.1, 0.04, -0.01)), (0, 0, 0), (0.035, 0.05, 0.045)), 12, 8), 'whisker', 'head')
    f.add(sphere(xf(c + Vector((0, -0.112, -0.005)), (0, 0, 0), (0.02, 0.02, 0.018)), 10, 8), 'skin', 'head')   # nose
    f.add(shell(xf(c + Vector((0, 0.005, 0.01)), (0, 0, 0), (r * 1.08, r * 1.08, r * 1.1)), (0, 0.2, 1), 0.3), 'cap', 'head')
    f.add(torus(xf(c + Vector((0, 0.005, 0.045)), (-0.2, 0, 0), (1, 1, 1.4)), r * 1.0, 0.016, 28, 8), 'cap', 'head')
    tip_dir = Vector((0.55, 0.3, 0.5)).normalized()
    f.add(cone(xf(c + Vector((0.03, 0.02, 0.09)) + tip_dir * 0.05, toward(tip_dir)), 0.055, 0.012, 0.12, 16), 'cap', 'head')
    f.add(sphere(xf(c + Vector((0.03, 0.02, 0.09)) + tip_dir * 0.115, (0, 0, 0), 0.028), 12, 8), 'whisker', 'head')

    # body: navy work suit with a belt, an orange scarf
    f.add(cone(xf((0, 0.025, 0.25)), 0.14, 0.12, 0.17, 20), 'suit', 'torso')
    f.add(sphere(xf((0, 0.025, 0.335), (0, 0, 0), (0.12, 0.1, 0.05)), 18, 10), 'suit', 'torso')
    f.add(sphere(xf((0, 0.025, 0.175), (0, 0, 0), (0.14, 0.12, 0.04)), 18, 10), 'suit', 'torso')
    f.add(torus(xf((0, 0.025, 0.19), (0, 0, 0), (1.0, 0.86, 1)), 0.138, 0.012, 28, 6), 'belt', 'torso')
    f.add(box(xf((0, -0.097, 0.19), (0, 0, 0), (0.035, 0.012, 0.028))), 'brass', 'torso', smooth=False)
    f.add(torus(xf((0, 0.02, 0.355), (0, 0, 0), (1, 1, 1.25)), 0.075, 0.03, 24, 10), 'scarf', 'torso')
    f.add(box(xf((0.06, -0.095, 0.27), (0.1, 0.15, 0.05), (0.05, 0.016, 0.17))), 'scarf', 'torso')

    for side, sh in SHOULDER.items():
        d = arm_dir(side, 30)
        f.add(cone(xf(sh + d * 0.07, toward(d)), 0.04, 0.036, 0.14, 14), 'suit', side)
        f.add(sphere(xf(sh, (0, 0, 0), 0.042), 12, 8), 'suit', side)
        hand = sh + d * 0.16
        f.add(sphere(xf(hand, toward(d), (0.032, 0.028, 0.036)), 12, 8), 'skin', side)
        if side == 'arm-right':                       # the long pole, upright in the idle pose
            back = posed(arm, side, 'idle').inverted().to_3x3()
            up = (back @ Vector((0, 0, 1))).normalized()
            f.add(cone(xf(hand + up * 0.13, toward(up)), 0.008, 0.008, 0.62, 8), 'pole', side)
            f.add(sphere(xf(hand + up * 0.44, (0, 0, 0), 0.013), 8, 6), 'brass', side)

    for side, x in HIP.items():
        f.add(cone(xf((x * 1.2, 0.029, 0.12)), 0.055, 0.05, 0.11, 12), 'suit', side)
        f.add(cone(xf((x * 1.2, 0.029, 0.045)), 0.046, 0.044, 0.08, 12), 'boots', side)
        f.add(torus(xf((x * 1.2, 0.029, 0.083)), 0.046, 0.01, 14, 5), 'boots', side)
        f.add(sphere(xf((x * 1.2, 0.0, 0.02), (0, 0, 0), (0.047, 0.07, 0.026)), 14, 8), 'boots', side)

    body = f.join()
    bind(body, arm, 'lamplighter')
    return [arm, body]


# ---------- props ----------

def build_props():
    reset()
    out = []
    # the street lamp: a slender iron post with a glass lantern, one metre tall at scale 1
    f = Figure('lamp')
    f.mat('iron', '#3D4A48')
    f.mat('glass', '#FFE7A0')
    f.add(cone(xf((0, 0, 0.05)), 0.09, 0.06, 0.1, 16), 'iron', None)
    f.add(cone(xf((0, 0, 0.12)), 0.05, 0.035, 0.06, 16), 'iron', None)
    f.add(cone(xf((0, 0, 0.5)), 0.03, 0.022, 0.72, 12), 'iron', None)
    f.add(torus(xf((0, 0, 0.3)), 0.034, 0.008, 16, 5), 'iron', None)
    f.add(box(xf((0, 0, 0.8), (0, 0, 0), (0.22, 0.02, 0.02))), 'iron', None, smooth=False)   # ladder bar
    f.add(cone(xf((0, 0, 0.87), (0, 0, math.pi / 4)), 0.045, 0.06, 0.03, 4), 'iron', None, smooth=False)
    f.add(cone(xf((0, 0, 0.96), (0, 0, math.pi / 4)), 0.055, 0.085, 0.15, 4), 'glass', None, smooth=False)
    for k in range(4):
        a = math.pi / 4 + k * math.pi / 2
        p = Vector((math.cos(a) * 0.07, math.sin(a) * 0.07, 0.96))
        f.add(box(xf(p, (0, 0, a), (0.012, 0.012, 0.16))), 'iron', None, smooth=False)
    f.add(cone(xf((0, 0, 1.07), (0, 0, math.pi / 4)), 0.1, 0.012, 0.08, 4), 'iron', None, smooth=False)
    f.add(sphere(xf((0, 0, 1.12), (0, 0, 0), 0.018), 10, 8), 'iron', None)
    out.append(f.join())

    for name in PROPS:
        objs = [o for o in import_glb(os.path.join(KENNEY, name + '.glb')) if o.type == 'MESH']
        for o in objs:
            o.matrix_world = o.matrix_world.copy()
            o.parent = None
        if len(objs) > 1:
            with bpy.context.temp_override(active_object=objs[0], selected_editable_objects=objs):
                bpy.ops.object.join()
        ob = objs[0]
        ob.name = name
        with bpy.context.temp_override(object=ob, selected_editable_objects=[ob]):
            bpy.ops.object.transform_apply(location=False, rotation=True, scale=True)
        ob.location = (0, 0, 0)
        out.append(ob)
    for o in list(bpy.data.objects):
        if o not in out:
            bpy.data.objects.remove(o)
    return out


def main():
    tmp = KEEP or tempfile.mkdtemp()
    os.makedirs(tmp, exist_ok=True)
    blobs = {}
    for name, build in [('prince', build_prince), ('lamplighter', build_lamplighter), ('props', build_props)]:
        path = os.path.join(tmp, name + '.glb')
        export(path, build())
        with open(path, 'rb') as fh:
            blobs[name] = base64.b64encode(fh.read()).decode('ascii')
        print(f'{name}: {os.path.getsize(path) // 1024} KB')
    js = ['/* Generated by tools/game-models.py (Blender). Do not edit: the .glb models of the game, base64,',
          '   so they load from file:// too. Characters: bodies after images/characters/ on the skeleton and',
          '   animations of Kenney Mini Characters (CC0); props: the lamp, rocks and grass (Kenney Nature Kit), craters (Kenney Space Kit). */',
          'window.LP_GAME_MODELS = {']
    for name, b64 in blobs.items():
        js.append(f"  '{name}': '{b64}',")
    js.append('};')
    with open(os.path.join(GAME, 'models.js'), 'w') as fh:
        fh.write('\n'.join(js) + '\n')
    print('wrote', os.path.join(GAME, 'models.js'))


main()

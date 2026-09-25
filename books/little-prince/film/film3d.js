/* The Little Prince film — 3D scenes in which the characters move (three.js).
   three.js r159 is the last release with a build that loads as a plain <script>, which file:// needs (no ES modules).
   The characters' bodies are modelled in Blender (tools/lp-models3d.py → models3d.js, plain arrays loaded as a
   script) as rigid parts hung on pivot groups, drawn with toon shading and ink outlines and no image textures:
   on file:// the illustrations count as cross-origin, and WebGL refuses them as textures.
   Each character follows its reference sheet (images/characters/<name>.jpg) and the book's eye style
   (white of the eye, lid line, coloured iris, one highlight); eyes and mouths stay procedural so they blink and talk.
   Scenes live in scenes3d.js. */
window.LP_FILM_3D_KIT = function (THREE) {
  const INK = new THREE.Color('#3b2a1e');
  // Three light bands in the shader: no image, canvas, or data textures.
  const mats = {};
  function toon(color, extra) {
    const key = color + JSON.stringify(extra || {});
    if (!mats[key]) {
      const mat = new THREE.MeshToonMaterial(Object.assign({ color: new THREE.Color(color) }, extra || {}));
      mat.onBeforeCompile = shader => {
        shader.fragmentShader = shader.fragmentShader.replace('#include <gradientmap_pars_fragment>',
          'vec3 getGradientIrradiance(vec3 n, vec3 l) { float d = dot(n,l); return vec3(d < -0.25 ? 0.47 : (d < 0.45 ? 0.78 : 1.0)); }');
      };
      mat.customProgramCacheKey = () => 'lp-ink-toon-v1';
      mats[key] = mat;
    }
    return mats[key];
  }
  const flat = (color, extra) => new THREE.MeshBasicMaterial(Object.assign({ color: new THREE.Color(color) }, extra || {}));
  // ink outline: the back faces of the same shape, pushed out along the normals
  const outlines = {};
  function outlineMat(t) {
    const key = t.toFixed(4);
    if (!outlines[key]) outlines[key] = new THREE.ShaderMaterial({
      uniforms: { t: { value: t }, c: { value: INK } }, side: THREE.BackSide,
      vertexShader: 'uniform float t; void main(){ vec3 p = position + normal * t; gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0); }',
      fragmentShader: 'uniform vec3 c; void main(){ gl_FragColor = vec4(c, 1.0); }'
    });
    return outlines[key];
  }
  // add a toon mesh with an outline; o: { at: [x,y,z], rot: [x,y,z], scale: n | [x,y,z], line: thickness (0 = none), mat }
  function part(parent, geo, color, o = {}) {
    const m = new THREE.Mesh(geo, o.mat || toon(color));
    if (o.at) m.position.set(...o.at);
    if (o.rot) m.rotation.set(...o.rot);
    if (o.scale != null) Array.isArray(o.scale) ? m.scale.set(...o.scale) : m.scale.setScalar(o.scale);
    const line = o.line == null ? 0.0045 : o.line;
    if (line > 0) {
      const s = (m.scale.x + m.scale.y + m.scale.z) / 3;
      m.add(new THREE.Mesh(geo, outlineMat(line / s)));
    }
    parent.add(m);
    return m;
  }
  const G = {
    sphere: (r = 1, w = 24, h = 16) => new THREE.SphereGeometry(r, w, h),
    capsule: (r, len) => new THREE.CapsuleGeometry(r, len, 6, 12),
    cone: (r, h, seg = 12) => new THREE.ConeGeometry(r, h, seg),
    cyl: (r1, r2, h, seg = 16) => new THREE.CylinderGeometry(r1, r2, h, seg),
    lathe: (pts, seg = 24) => new THREE.LatheGeometry(pts.map(([x, y]) => new THREE.Vector2(x, y)), seg),
    torus: (r, t, arc = Math.PI * 2) => new THREE.TorusGeometry(r, t, 8, 24, arc),
    box: (x, y, z) => new THREE.BoxGeometry(x, y, z)
  };
  const X_AXIS = new THREE.Vector3(1, 0, 0);
  const rnd = (() => { let s = 7; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();

  // ------------------------------------------------------------------ face
  // The book's eye: small upright oval, white showing, thin lid line, coloured iris, one highlight.
  function eye(head, x, y, z, size, iris, irisSize = 0.58) {
    const g = new THREE.Group();
    g.position.set(x, y, z);
    g.lookAt(new THREE.Vector3(x * 2.2, y * 1.2 + 0.02, z * 2.2 + 0.4));
    const disc = (r, color, dz, sx = 1, sy = 1, dx = 0, dy = 0) => {
      const m = new THREE.Mesh(new THREE.CircleGeometry(r, 20), flat(color));
      m.position.set(dx, dy, dz); m.scale.set(sx, sy, 1); g.add(m); return m;
    };
    disc(size, '#fffaf0', 0, 0.78, 1);
    disc(size * irisSize, iris, size * 0.03, 0.9, 1, 0, -size * 0.12);
    disc(size * irisSize * 0.59, '#1d1a24', size * 0.05, 0.9, 1, 0, -size * 0.12);
    disc(size * 0.17, '#ffffff', size * 0.07, 1, 1, size * 0.2, size * 0.14);
    const lid = new THREE.Mesh(new THREE.TorusGeometry(size * 0.86, size * 0.065, 4, 18, Math.PI * 0.95), flat('#3b2a1e'));
    lid.rotation.z = Math.PI * 0.025; lid.position.z = size * 0.08; lid.scale.set(0.9, 1.08, 1);
    g.add(lid);
    head.add(g);
    return g;
  }
  function mouth(head, y, z, w) {
    const m = new THREE.Mesh(new THREE.TorusGeometry(w, w * 0.095, 4, 12, Math.PI * 0.8), flat('#7a3b2e'));
    m.position.set(0, y, z); m.rotation.z = Math.PI + Math.PI * 0.1;
    head.add(m);
    const open = new THREE.Mesh(new THREE.CircleGeometry(w * 0.7, 14), flat('#6a2a24'));
    open.position.set(0, y - w * 0.25, z - 0.002); open.scale.set(0.65, 0.01, 1);
    head.add(open);
    return { arc: m, open };
  }
  function blush(head, x, y, z, r) {
    const m = new THREE.Mesh(new THREE.CircleGeometry(r, 16), flat('#f09a8a', { transparent: true, opacity: 0.16 }));
    m.position.set(x, y, z); m.lookAt(new THREE.Vector3(x * 3, y, z * 3));
    head.add(m);
  }

  // ------------------------------------------------------------------ shared motion
  // actors keep targets (where to be, what to do) and ease toward them every frame
  function actorBase(root) {
    return {
      root, talk: 0, talking: false, walk: 0, sit: 0, sitGoal: 0, blinkAt: 2 + rnd() * 3, blink: 0, phase: 0,
      look: new THREE.Vector2(), lookGoal: new THREE.Vector2(), pose: {}, poseGoal: {}, busy: null,
      ease(key, goal, dt, tau = 0.35) { const v = this.pose[key] || 0; this.pose[key] = v + (goal - v) * (1 - Math.exp(-dt / tau)); return this.pose[key]; }
    };
  }
  function blinkAndTalk(a, dt, t, eyes, mouthParts) {
    a.blinkAt -= dt;
    if (a.blinkAt < 0) { a.blink = 0.16; a.blinkAt = 2.5 + rnd() * 3.5; }
    a.blink = Math.max(0, a.blink - dt);
    const lid = a.eyesClosed ? 0.08 : a.blink > 0 ? 0.12 : 1;
    eyes.forEach(e => { e.scale.y += (lid - e.scale.y) * Math.min(1, dt * 30); });
    a.talk += ((a.talking ? 1 : 0) - a.talk) * Math.min(1, dt * 8);
    if (mouthParts) {
      const o = a.talk * (0.5 + 0.5 * Math.abs(Math.sin(t * 13) * Math.sin(t * 7.3)));
      mouthParts.open.scale.y = 0.01 + o * 0.5;
      mouthParts.arc.scale.y = 1 - o * 0.4;
    }
  }

  // ------------------------------------------------------------------ meshes modelled in Blender
  // models3d.js (built by tools/lp-models3d.py) holds every rigid part of a character: which pivot group it hangs
  // on (g), its colour (c) or vertex colours (k), its ink line (l), and base64 arrays of Int16 positions, Int8
  // normals and Uint16 triangles. The parts are modelled in character space; the pivots give each group's rest place.
  const MODELS = window.LP_FILM_MODELS;
  if (!MODELS) throw new Error('models3d.js is missing');
  const geos = {};
  function bytes(b64) {
    const s = atob(b64), u = new Uint8Array(s.length);
    for (let i = 0; i < s.length; i++) u[i] = s.charCodeAt(i);
    return u.buffer;
  }
  const toLinear = (c) => c < 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  function modelGeo(who, rec) {
    const key = who + '/' + rec.n;
    if (geos[key]) return geos[key];
    const q = new Int16Array(bytes(rec.p)), nq = new Int8Array(bytes(rec.q));
    const pos = new Float32Array(q.length), nrm = new Float32Array(q.length);
    for (let i = 0; i < q.length; i += 3) {
      for (let k = 0; k < 3; k++) pos[i + k] = rec.o[k] + q[i + k] / 32767 * rec.s[k];
      const x = nq[i], y = nq[i + 1], z = nq[i + 2], l = Math.hypot(x, y, z) || 1;
      nrm[i] = x / l; nrm[i + 1] = y / l; nrm[i + 2] = z / l;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('normal', new THREE.BufferAttribute(nrm, 3));
    geo.setIndex(new THREE.BufferAttribute(new Uint16Array(bytes(rec.i)), 1));
    if (rec.k) {
      const c = new Uint8Array(bytes(rec.k)), col = new Float32Array(c.length);
      for (let i = 0; i < c.length; i++) col[i] = toLinear(c[i] / 255);
      geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    }
    return (geos[key] = geo);
  }
  const vertexColored = () => toon('#ffffff', { vertexColors: true });
  // pivot groups: rest positions from the model file, each placed relative to its parent
  function rig(who) {
    const piv = MODELS[who].pivots, groups = {};
    const at = (name) => new THREE.Vector3().fromArray(piv[name] || [0, 0, 0]);
    return {
      groups, at,
      group(name, parent, parentName) {
        const g = new THREE.Group();
        g.position.copy(at(name)).sub(parentName ? at(parentName) : new THREE.Vector3());
        parent.add(g); groups[name] = g; return g;
      },
      // hang every modelled part on its group
      dress() {
        const parts = {};
        MODELS[who].parts.forEach(rec => {
          const g = groups[rec.g];
          if (g) parts[rec.n] = part(g, modelGeo(who, rec), rec.c, { line: rec.l, mat: rec.k ? vertexColored() : undefined });
        });
        return parts;
      },
      template(name) { return MODELS[who].parts.find(r => r.n === name); }
    };
  }
  function templatePart(parent, who, name, color) {
    const rec = MODELS[who].parts.find(r => r.n === name);
    return part(parent, modelGeo(who, rec), color || rec.c, { line: rec.l });
  }
  // the front of an ellipsoid head, for placing the procedural eyes, mouth and cheeks on the modelled face
  const faceZ = (c, r, x, y, lift = 0.002) => c[2] + r[2] * Math.sqrt(Math.max(0, 1 - (x / r[0]) ** 2 - ((y - c[1]) / r[1]) ** 2)) + lift;

  // ------------------------------------------------------------------ the little prince
  // About 1 unit tall, feet at the origin, facing +z (character sheet images/characters/prince.jpg): tousled spiky
  // golden hair, round face, long mustard-yellow coat below the knees with three gold star buttons, cream baggy
  // trousers, navy boots, long red scarf whose fringed ends move in the wind. The coat skirt is four panels that
  // follow the legs, so walking and sitting do not tear it.
  function prince() {
    const root = new THREE.Group();
    const a = actorBase(root);
    const R = rig('prince'), P = R.at;
    const body = new THREE.Group(); root.add(body);
    const hips = R.group('hips', body);
    const legs = ['-', '+'].map(k => R.group('leg' + k, hips, 'hips'));
    const skirtF = ['-', '+'].map(k => R.group('skirtF' + k, hips, 'hips'));
    const skirtB = ['-', '+'].map(k => R.group('skirtB' + k, hips, 'hips'));
    const torso = R.group('torso', hips, 'hips');
    const arms = ['-', '+'].map(k => R.group('arm' + k, torso, 'torso'));
    const neck = R.group('head', torso, 'torso');
    const head = new THREE.Group(); neck.add(head); R.groups.head = head;
    R.dress();
    // face: head centre and radii as modelled (tools/lp-models3d.py, prince(): C and the face sphere)
    const hc = [0, 0.83 - P('head').y, 0], hr = [0.097, 0.1, 0.093];
    const eyes = [-1, 1].map(sd => {
      const e = eye(head, 0.036 * sd, 0.122, faceZ(hc, hr, 0.036, 0.122, 0.001), 0.014, '#2f3b57', 0.7);
      e.rotation.y += sd * 0.45;     // follow the round face, so the eye still shows in profile
      return e;
    });
    const m = mouth(head, 0.068, faceZ([0, 0.077, 0.02], [0.075, 0.055, 0.07], 0, 0.068, 0.0015), 0.011);
    [-1, 1].forEach(sd => blush(head, 0.056 * sd, 0.09, faceZ(hc, hr, 0.056, 0.09, 0.001), 0.019));
    // the two ends of the scarf: ribbons with a fringe, whose points are moved every frame
    const RIB_W = 4, RIB_N = 12, FRINGE = 5, FR_N = 2;
    function ribbonGeo() {
      const verts = (RIB_N + 1) * (RIB_W + 1) + FRINGE * (FR_N + 1) * 2, idx = [];
      for (let i = 0; i < RIB_N; i++) for (let j = 0; j < RIB_W; j++) {
        const p = i * (RIB_W + 1) + j, q = p + RIB_W + 1;
        idx.push(p, q, p + 1, p + 1, q, q + 1);
      }
      const base = (RIB_N + 1) * (RIB_W + 1);
      for (let f = 0; f < FRINGE; f++) for (let i = 0; i < FR_N; i++) {
        const p = base + f * (FR_N + 1) * 2 + i * 2, q = p + 2;
        idx.push(p, q, p + 1, p + 1, q, q + 1);
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(verts * 3), 3));
      geo.setIndex(idx);
      return geo;
    }
    const tails = [0, 1].map(k => {
      const mesh = new THREE.Mesh(ribbonGeo(), toon('#b9442e', { side: THREE.DoubleSide }));
      mesh.frustumCulled = false;
      torso.add(mesh);
      return { mesh, len: k ? 0.3 : 0.34, side: k ? 1 : -1, ph: k * 1.7 };
    });
    const tmp = new THREE.Vector3(), q = new THREE.Quaternion(), T = P('torso');
    // the coat's chest, as an ellipsoid the ribbons slide over (torso space)
    const chest = { c: new THREE.Vector3(0, 0.49 - T.y, 0.0), r: new THREE.Vector3(0.14, 0.26, 0.118) };
    function outsideChest(p) {
      const d = new THREE.Vector3((p.x - chest.c.x) / chest.r.x, (p.y - chest.c.y) / chest.r.y, (p.z - chest.c.z) / chest.r.z);
      const l = d.length();
      if (l < 1.06) { d.multiplyScalar(1.06 / l); p.set(chest.c.x + d.x * chest.r.x, chest.c.y + d.y * chest.r.y, chest.c.z + d.z * chest.r.z); }
      return p;
    }
    a.head = head; a.eyes = eyes; a.arms = arms; a.legs = legs; a.torso = torso; a.hips = hips; a.body = body;
    a.headPoint = () => head.localToWorld(new THREE.Vector3(0, 0.115, 0));
    a.height = 1;
    const HIPS_Y = P('hips').y;
    a.update = (dt, t, wind) => {
      // walk cycle
      a.phase += dt * 9 * a.walk;
      const sw = Math.sin(a.phase) * 0.55 * Math.min(1, a.walk);
      a.sit += (a.sitGoal - a.sit) * (1 - Math.exp(-dt / 0.4));
      legs[0].rotation.x = sw - a.sit * 1.45; legs[1].rotation.x = -sw - a.sit * 1.45;
      // the coat skirt: front panels go with a leg that swings forward, back panels with one that swings back;
      // sitting, the back of the coat spreads behind on the ground
      legs.forEach((leg, i) => {
        const walkR = leg.rotation.x + a.sit * 1.45;
        skirtF[i].rotation.x = Math.min(walkR, 0) * 0.92 + Math.max(walkR, 0) * 0.3 - a.sit * 1.2;
        skirtB[i].rotation.x = Math.max(walkR, 0) * 0.95 + Math.min(walkR, 0) * 0.3 + a.sit * 0.75;
        // seated, the cloth bunches up instead of reaching into the ground
        skirtF[i].scale.y = 1 - a.sit * 0.2; skirtB[i].scale.y = 1 - a.sit * 0.35;
      });
      hips.position.y = HIPS_Y - a.sit * 0.2 + Math.abs(Math.cos(a.phase)) * 0.02 * a.walk;
      torso.rotation.x = a.ease('lean', a.poseGoal.lean || 0, dt) + a.sit * 0.08;
      const armL = a.ease('armL', a.poseGoal.armL != null ? a.poseGoal.armL : -sw * 0.9, dt, 0.25);
      const armR = a.ease('armR', a.poseGoal.armR != null ? a.poseGoal.armR : sw * 0.9, dt, 0.25);
      arms[0].rotation.x = armL + (a.talk > 0.3 ? Math.sin(t * 3.1) * 0.12 * a.talk : 0);
      arms[1].rotation.x = armR;
      arms[0].rotation.z = -0.14 - a.ease('armLOut', a.poseGoal.armLOut || 0, dt) - a.sit * 0.1;
      arms[1].rotation.z = 0.14 + a.ease('armROut', a.poseGoal.armROut || 0, dt) + a.sit * 0.1;
      // breathing, looking, talking
      body.position.y = Math.sin(t * 2.1) * 0.006;
      a.look.lerp(a.lookGoal, 1 - Math.exp(-dt / 0.3));
      head.rotation.y = a.look.x + (a.talk > 0.2 ? Math.sin(t * 2.3) * 0.08 * a.talk : 0);
      head.rotation.x = a.look.y + (a.talk > 0.2 ? Math.sin(t * 4.1) * 0.05 * a.talk : 0) + a.ease('nod', a.poseGoal.nod || 0, dt);
      head.rotation.z = a.ease('tilt', a.poseGoal.tilt || 0, dt);
      blinkAndTalk(a, dt, t, eyes, m);
      // scarf ends hang over the chest and stream away from the wind, fluttering; the fringe trails the end
      root.updateMatrixWorld(true);
      q.copy(torso.getWorldQuaternion(new THREE.Quaternion())).invert();
      const w = (wind || new THREE.Vector3(0, 0, 0)).clone().applyQuaternion(q);
      const strength = Math.min(1, w.length());
      if (strength > 0) w.normalize();
      tails.forEach(tl => {
        const pos = tl.mesh.geometry.attributes.position;
        const base = new THREE.Vector3(tl.side * 0.05, 0.7 - T.y, 0.06);
        const dir = new THREE.Vector3(w.x * strength * 0.8 + tl.side * 0.1 * (1 - strength), -1 + strength * 0.45, w.z * strength * 0.8 + 0.1 * (1 - strength)).normalize();
        const side0 = new THREE.Vector3().crossVectors(dir, new THREE.Vector3(0, 0, 1));
        if (side0.lengthSq() < 0.01) side0.set(1, 0, 0);
        side0.normalize();
        // the cloth twists along its length, so it shows its face from every side
        const sides = [];
        for (let i = 0; i <= RIB_N; i++) sides.push(side0.clone().applyAxisAngle(dir, tl.side * (i / RIB_N) * (0.3 + strength * 0.9) + Math.sin(t * 3 + tl.ph + i * 0.4) * 0.15 * strength));
        const sideV = sides[RIB_N];
        const along = [];
        for (let i = 0; i <= RIB_N; i++) {
          const s = i / RIB_N;
          const flutter = Math.sin(t * 7 * (0.4 + strength) - s * 6 + tl.ph) * 0.05 * s * (0.2 + strength);
          const lift = Math.sin(t * 5 - s * 4 + tl.ph) * 0.03 * s * strength;
          tmp.copy(base).addScaledVector(dir, s * tl.len).add(new THREE.Vector3(0, lift, flutter));
          along.push(outsideChest(tmp.clone()));
        }
        for (let i = 0; i <= RIB_N; i++) {
          const half = 0.03 * (1 - (i / RIB_N) * 0.1), sv = sides[i];
          for (let j = 0; j <= RIB_W; j++) {
            const u = (j / RIB_W) * 2 - 1, p = along[i];
            pos.setXYZ(i * (RIB_W + 1) + j, p.x + sv.x * half * u, p.y + sv.y * half * u, p.z + sv.z * half * u);
          }
        }
        // fringe: five narrow strands continuing the last segment
        const end = along[RIB_N], d2 = end.clone().sub(along[RIB_N - 1]).normalize(), fb = (RIB_N + 1) * (RIB_W + 1);
        for (let f = 0; f < FRINGE; f++) {
          const u = (f / (FRINGE - 1)) * 2 - 1;
          for (let i = 0; i <= FR_N; i++) {
            const l = i / FR_N * (0.035 + (f % 2) * 0.008);
            const cx = end.x + sideV.x * 0.024 * u + d2.x * l, cy = end.y + sideV.y * 0.024 * u + d2.y * l, cz = end.z + sideV.z * 0.024 * u + d2.z * l;
            const hw = 0.0035 * (1 - i / FR_N * 0.3);
            pos.setXYZ(fb + f * (FR_N + 1) * 2 + i * 2, cx - sideV.x * hw, cy - sideV.y * hw, cz - sideV.z * hw);
            pos.setXYZ(fb + f * (FR_N + 1) * 2 + i * 2 + 1, cx + sideV.x * hw, cy + sideV.y * hw, cz + sideV.z * hw);
          }
        }
        pos.needsUpdate = true;
        tl.mesh.geometry.computeVertexNormals();
      });
    };
    return a;
  }

  // ------------------------------------------------------------------ the fox
  // Slender red fox (images/characters/fox.jpg): white bib from the cheeks down the chest, white belly line and tail
  // tip, black-brown stockings and ear backs, pale inner ears. Sits (the rump folds down round the shoulders, hind legs
  // tucked forward) or walks; the tail wags when he is happy.
  function fox() {
    const root = new THREE.Group();
    const a = actorBase(root);
    const R = rig('fox'), P = R.at;
    const body = R.group('body', root);
    const trunk = R.group('trunk', body, 'body');
    const neck = R.group('neck', body, 'body');
    const head = R.group('head', neck, 'neck');
    const ears = ['-', '+'].map(k => R.group('ear' + k, head, 'head'));
    const front = ['-', '+'].map(k => R.group('front' + k, body, 'body'));
    const hind = ['-', '+'].map(k => R.group('hind' + k, trunk, 'trunk'));
    const shins = ['-', '+'].map((k, i) => R.group('shin' + k, hind[i], 'hind' + k));
    const feet = ['-', '+'].map((k, i) => R.group('foot' + k, shins[i], 'shin' + k));
    // the tail hangs on the body and follows the rump by hand, so it can lie round the feet when he sits
    const tail = R.group('tail', body, 'body'); tail.rotation.order = 'YXZ';
    const TAIL = P('tail').sub(P('trunk')), TRUNK = P('trunk').sub(P('body'));
    R.dress();
    const hc = [0, 0.008, -0.01], hr = [0.056, 0.052, 0.06];
    const eyes = [-1, 1].map(sd => {
      const e = eye(head, 0.029 * sd, 0.016, faceZ(hc, hr, 0.029, 0.016, 0.0), 0.011, '#9a6124', 0.62);
      e.rotation.y += sd * 0.3;
      return e;
    });
    const legs = [front[0], front[1], hind[0], hind[1]];
    const BODY = P('body'), NECK = P('neck').sub(BODY);
    a.head = head; a.eyes = eyes; a.body = body; a.legs = legs;
    a.headPoint = () => head.localToWorld(new THREE.Vector3(0, 0, 0.03));
    a.height = 0.7; a.wag = 0.3;
    a.update = (dt, t) => {
      a.phase += dt * 8 * a.walk;
      const sw = Math.sin(a.phase) * 0.45 * Math.min(1, a.walk);
      a.sit += (a.sitGoal - a.sit) * (1 - Math.exp(-dt / 0.4));
      const sit = a.sit;
      body.position.y = BODY.y + Math.abs(Math.cos(a.phase)) * 0.012 * a.walk;
      // sitting: the back half turns down round the shoulders onto the haunches; the neck straightens
      trunk.rotation.x = -sit * 1.0;
      neck.position.set(0, NECK.y + sit * 0.075, NECK.z - sit * 0.02);
      neck.rotation.x = -sit * 0.12 + a.ease('nod', a.poseGoal.nod || 0, dt);
      front.forEach((leg, i) => { leg.rotation.x = (i ? -sw : sw) * (1 - sit); });
      // hind legs fold: thigh forward, shin back to the hock on the ground, the foot flat and forward
      hind.forEach((leg, i) => {
        leg.rotation.x = (i ? sw : -sw) * (1 - sit) + sit * 0.05;
        shins[i].rotation.x = sit * 1.73;
        feet[i].rotation.x = -sit * 1.8;
      });
      a.look.lerp(a.lookGoal, 1 - Math.exp(-dt / 0.3));
      head.rotation.y = a.look.x;
      head.rotation.z = Math.sin(t * 0.7) * 0.025 + a.ease('tilt', a.poseGoal.tilt || 0, dt);
      head.rotation.x = a.look.y + sit * 0.12 + (a.talk > 0.2 ? Math.sin(t * 9) * 0.04 * a.talk : 0);
      const down = a.ease('earsDown', a.poseGoal.earsDown || 0, dt);
      ears.forEach((e, i) => { e.rotation.x = Math.max(0, Math.sin(t * 1.3 + i * 2) - 0.92) * 2 - down * 0.6; e.rotation.z = (i ? -1 : 1) * down * 0.35; });
      const wag = a.ease('wag', a.wag, dt, 0.5);
      tail.position.copy(TAIL).applyAxisAngle(X_AXIS, trunk.rotation.x).add(TRUNK);
      tail.rotation.x = sit * 1.45 - 0.1 * (1 - sit);
      tail.rotation.y = -sit * 1.9 + Math.sin(t * (3 + wag * 4)) * (0.03 + wag * 0.22);
      blinkAndTalk(a, dt, t, eyes, null);
    };
    return a;
  }

  // ------------------------------------------------------------------ the lamplighter
  // Old man (images/characters/lamplighter.jpg): short white beard and moustache, wild white hair, red knitted
  // stocking cap with a cream pompom, navy work suit with a belt, long orange-red fringed scarf, brown lace-up boots.
  // The long pole stands on the ground in his right hand; he lifts it to the lamp. His arms bend at the elbow.
  function lamplighter() {
    const root = new THREE.Group();
    const a = actorBase(root);
    const R = rig('lamplighter'), P = R.at;
    const body = new THREE.Group(); root.add(body);
    const hips = R.group('hips', body);
    const legs = ['-', '+'].map(k => R.group('leg' + k, hips, 'hips'));
    const torso = R.group('torso', hips, 'hips');
    const arms = ['-', '+'].map(k => R.group('arm' + k, torso, 'torso'));
    const fores = ['-', '+'].map((k, i) => R.group('fore' + k, arms[i], 'arm' + k));
    // the pole turns in the hand (pole) and slides so that it stands on the ground (slide)
    const pole = new THREE.Group(); pole.position.copy(P('pole')).sub(P('fore-')); fores[0].add(pole);
    const slide = new THREE.Group(); pole.add(slide); R.groups.pole = slide;
    const neck = R.group('head', torso, 'torso');
    const head = new THREE.Group(); neck.add(head); R.groups.head = head;
    R.dress();
    const hc = [0, 1.2 - P('head').y, 0], hr = [0.098, 0.106, 0.096];
    const eyes = [-1, 1].map(sd => eye(head, 0.037 * sd, 0.158, faceZ(hc, hr, 0.037, 0.158, 0.001), 0.0125, '#4e5f74'));
    [-1, 1].forEach(sd => blush(head, 0.06 * sd, 0.12, faceZ(hc, hr, 0.06, 0.12, 0.004), 0.02));
    // handkerchief in the other hand (red), shown while he wipes his forehead
    const hanky = part(fores[1], G.box(0.1, 0.085, 0.01), '#b8432c', { at: [0, P('pole').y - P('fore+').y - 0.02, 0.045], line: 0.003 });
    hanky.visible = false;
    const wick = new THREE.Object3D(); wick.position.set(0, 1.47 - P('pole').y, 0); slide.add(wick);
    a.head = head; a.eyes = eyes; a.arms = arms; a.legs = legs; a.wick = wick; a.hanky = hanky; a.body = body; a.hips = hips; a.torso = torso;
    a.headPoint = () => head.localToWorld(new THREE.Vector3(0, 0.14, 0));
    a.height = 1.35;
    // resting grip: upper arm a little forward, forearm raised, the pole upright with its foot on the ground
    const REST_UP = -0.3, REST_FORE = -1.35;
    const UPPER = P('arm-').y - P('fore-').y, FORE = P('fore-').y - P('pole').y;
    const gripY = P('arm-').y - UPPER * Math.cos(REST_UP) - FORE * Math.cos(REST_UP + REST_FORE);
    slide.position.y += -(gripY - P('pole').y);
    a.update = (dt, t) => {
      a.phase += dt * 8 * a.walk;
      const sw = Math.sin(a.phase) * 0.5 * Math.min(1, a.walk);
      legs[0].rotation.x = sw; legs[1].rotation.x = -sw;
      body.position.y = Math.sin(t * 1.7) * 0.006;
      // the pole arm: rest grip, or raised to the lamp (poseGoal.reach < -1)
      const reach = a.poseGoal.reach != null && a.poseGoal.reach < -1 ? 1 : 0;
      const up = a.ease('reachUp', reach ? -2.3 : REST_UP - sw * 0.2, dt, 0.3);
      const fore = a.ease('reachFore', reach ? -0.35 : REST_FORE, dt, 0.3);
      arms[0].rotation.set(up, 0, -0.12);
      fores[0].rotation.x = fore;
      pole.rotation.set(-(up + fore) + a.ease('poleTilt', reach ? 0.55 : 0, dt, 0.3), 0, 0.12);
      // the other arm swings, or wipes the forehead with the handkerchief
      const wipe = a.ease('wipe', a.poseGoal.wipe ? 1 : 0, dt, 0.25);
      arms[1].rotation.set(sw * 0.8 * (1 - wipe) + 0.05 - wipe * (2.35 + Math.sin(t * 9) * 0.1), 0, 0.14 + wipe * 0.1);
      arms[1].rotation.y = -wipe * 0.5;
      fores[1].rotation.x = -0.25 - wipe * 1.55;
      a.hanky.visible = wipe > 0.5;
      a.look.lerp(a.lookGoal, 1 - Math.exp(-dt / 0.3));
      head.rotation.y = a.look.x + (a.talk > 0.2 ? Math.sin(t * 2.7) * 0.07 * a.talk : 0);
      head.rotation.x = a.look.y + (a.talk > 0.2 ? Math.sin(t * 5.3) * 0.05 * a.talk : 0);
      blinkAndTalk(a, dt, t, eyes, null);
    };
    return a;
  }

  // ------------------------------------------------------------------ the rose
  // (images/characters/rose.jpg) grows from a shoot to a bud to the open flower (stage 0 → 2): a full red rose with
  // ruffled petals, an olive stem with four thorns and three serrated leaves on short stalks; sways and "breathes"
  // when she speaks. The stem, leaf, thorn, petal and sepal shapes come from Blender; they are placed here.
  function rose() {
    const root = new THREE.Group();
    const a = actorBase(root);
    a.stage = 2; a.stageNow = 2;
    const stem = templatePart(root, 'rose', 'stem');
    const leaves = [[-1, 0.28, 0.3], [1, 0.4, -0.5], [-1, 0.52, 2.6]].map(([sd, y, turn]) => {
      const l = new THREE.Group(); l.position.set(0, y, 0); root.add(l);
      const tilt = new THREE.Group(); tilt.rotation.set(0, turn, 0); l.add(tilt);
      const lean = new THREE.Group(); lean.rotation.z = -sd * 0.95; tilt.add(lean);
      templatePart(lean, 'rose', 'leaf'); templatePart(lean, 'rose', 'leafvein');
      return l;
    });
    const thorns = [[0.35, 0], [0.5, 2.2], [0.62, 3.9], [0.72, 1.1]].map(([y, turn]) => {
      const th = new THREE.Group(); th.rotation.y = turn; root.add(th);
      const m = templatePart(th, 'rose', 'thorn'); m.position.x = 0.008;
      return th;
    });
    const bloom = new THREE.Group(); root.add(bloom);
    const petals = [];
    part(bloom, G.sphere(0.036, 14, 10), '#a2302b', { at: [0, 0.019, 0], scale: [1, 1.35, 1], line: 0.002 });
    const colors = ['#a92f2b', '#b83a31', '#c6473a', '#cf5442'];
    for (let ring = 0; ring < 4; ring++) {
      const count = 5 + ring;
      for (let i = 0; i < count; i++) {
        const p = new THREE.Group(); p.rotation.y = i / count * Math.PI * 2 + ring * 0.73; bloom.add(p);
        const leaf = templatePart(p, 'rose', 'petal' + ring, colors[ring]);
        petals.push({ g: p, leaf, ring, offset: Math.sin(i * 2.4 + ring) * 0.06 });
      }
    }
    const spiralGeo = new THREE.BufferGeometry(), spiralVertices = [], spiralIndices = [], lip = [];
    for (let i = 0; i <= 64; i++) {
      const t = i / 64, angle = t * Math.PI * 4.5, r = 0.003 + t * 0.035;
      const x = Math.sin(angle) * r, z = Math.cos(angle) * r;
      const y = 0.109 - t * 0.025 + Math.sin(angle * 3) * 0.0015;
      spiralVertices.push(x, 0.019, z, x, y, z);
      lip.push([x, y, z]);
      if (i < 64) { const a = i * 2; spiralIndices.push(a, a + 2, a + 1, a + 1, a + 2, a + 3); }
    }
    spiralGeo.setAttribute('position', new THREE.Float32BufferAttribute(spiralVertices, 3)); spiralGeo.setIndex(spiralIndices); spiralGeo.computeVertexNormals();
    const heart = new THREE.Group(); bloom.add(heart);
    part(heart, spiralGeo, '#b8392f', { mat: toon('#b8392f', { side: THREE.DoubleSide }), line: 0 });
    const rimCurve = new THREE.CatmullRomCurve3(lip.map(p => new THREE.Vector3(...p)));
    part(heart, new THREE.TubeGeometry(rimCurve, 64, 0.0011, 4, false), '#6e2a22', { line: 0 });
    const sepals = new THREE.Group(); bloom.add(sepals);
    for (let i = 0; i < 5; i++) {
      const g = new THREE.Group(); g.rotation.y = i / 5 * Math.PI * 2 + 0.3; sepals.add(g);
      templatePart(g, 'rose', 'sepal');
    }
    a.bloom = bloom; a.eyes = [];
    a.headPoint = () => bloom.localToWorld(new THREE.Vector3(0, 0, 0));
    a.height = 0.9;
    a.cough = 0;
    a.update = (dt, t, wind) => {
      a.stageNow += (a.stage - a.stageNow) * (1 - Math.exp(-dt / 1.2));
      const s = THREE.MathUtils.clamp(a.stageNow, 0, 2);
      stem.visible = bloom.visible = a.stageNow >= 0;
      const h = 0.25 + Math.min(1, s) * 0.55;
      stem.scale.set(1, h, 1);
      leaves.forEach((l, i) => { l.visible = s > 0.2 + i * 0.25; l.position.y = h * (0.3 + i * 0.17); l.scale.setScalar(Math.min(1, 0.5 + s * 0.5)); });
      thorns.forEach((th, i) => { th.visible = s > 0.8; th.position.y = h * (0.4 + i * 0.13); th.scale.setScalar(1 + (a.poseGoal.thorns ? 0.6 + Math.sin(t * 8) * 0.2 : 0)); });
      bloom.position.y = h + 0.03;
      const open = Math.max(0, s - 1);           // 0 = bud, 1 = open
      bloom.scale.setScalar(0.35 + Math.min(1, s) * 0.45 + open * 0.3);
      petals.forEach(p => {
        p.leaf.rotation.x = -0.30 + open * (0.3 + p.ring * 0.27) + p.offset * open;
        p.leaf.position.set(0, 0.04 - p.ring * 0.019, 0.006 + p.ring * (0.005 + open * 0.009));
      });
      sepals.visible = s > 0.3;
      heart.scale.setScalar(0.35 + open * 0.65);
      a.talk += ((a.talking ? 1 : 0) - a.talk) * Math.min(1, dt * 6);
      a.cough = Math.max(0, a.cough - dt);
      const sway = Math.sin(t * 1.3) * 0.04 + (wind ? wind.x * 0.02 : 0) + a.talk * Math.sin(t * 5) * 0.06 + (a.cough > 0 ? Math.sin(a.cough * 40) * 0.12 : 0);
      root.rotation.z = sway;
      bloom.rotation.x = 0.28 + a.talk * Math.sin(t * 3.4) * 0.12 - (a.poseGoal.proud ? 0.15 : 0);
      bloom.scale.multiplyScalar(1 + a.talk * Math.sin(t * 9) * 0.03);
    };
    return a;
  }

  // ------------------------------------------------------------------ a bird of the migrating flock
  function bird(color = '#f2ede2') {
    const root = new THREE.Group();
    part(root, G.sphere(0.06, 10, 8), color, { scale: [0.8, 0.7, 1.6], line: 0.003 });
    part(root, G.cone(0.02, 0.05, 5), '#e8a23a', { at: [0, 0, 0.11], rot: [Math.PI / 2, 0, 0], line: 0 });
    const wings = [-1, 1].map(sd => {
      const w = new THREE.Group(); w.position.x = 0.04 * sd; root.add(w);
      part(w, G.box(0.2, 0.01, 0.07), color, { at: [0.1 * sd, 0, 0], line: 0.004 });
      return w;
    });
    return { root, flap(t) { const f = Math.sin(t) * 0.7; wings[0].rotation.z = f; wings[1].rotation.z = -f; } };
  }

  return { toon, flat, part, G, eye, prince, fox, lamplighter, rose, bird, outlineMat, rnd, INK };
};

/* Playback: film.js hands every step to LP_FILM_3D.show(). In the chapters that have a 3D scene it runs the scene's
   cues, makes the speaker talk, moves the camera (a close-up of whoever speaks, a wide shot for narration) and draws;
   everywhere else it stays hidden and film.js shows the illustrated boards. */
window.LP_FILM_3D = (function () {
  const SCENE_OF = { 8: 'asteroid', 9: 'asteroid', 14: 'lampPlanet', 21: 'wheatField' };
  let THREE, K, SC, renderer, camera, holder, loading = null, ready = false, failed = false;
  const built = {};
  let current = null, appliedCh = null, appliedIdx = -1, playing = false, spec = null, snapCam = false, raf = 0, last = 0, t = 0;
  let camPos, camLook, goalPos, goalLook, lost = false, warned = false;

  function supported() {
    if (failed) return false;
    try { const c = document.createElement('canvas'); return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl'))); } catch (e) { return false; }
  }
  // load three.js and the character meshes (models3d.js) on first use: plain scripts, so it also works from file://
  function ensure(base) {
    if (ready) return Promise.resolve(true);
    if (loading) return loading;
    const load = (src, have) => new Promise((ok, fail) => {
      if (have()) return ok();
      const s = document.createElement('script');
      s.src = (base || '') + src; s.onload = ok; s.onerror = fail;
      document.head.appendChild(s);
    });
    loading = load('vendor/three.min.js', () => window.THREE)
      .then(() => load('models3d.js', () => window.LP_FILM_MODELS))
      .then(() => { init(); ready = true; return true; })
      .catch((e) => { console.warn('[film3d]', e); failed = true; return false; });
    return loading;
  }
  function init() {
    THREE = window.THREE;
    K = window.LP_FILM_3D_KIT(THREE);
    SC = window.LP_FILM_3D_SCENES(THREE, K);
    holder = document.getElementById('stage3d');
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    holder.appendChild(renderer.domElement);
    // a lost context (GPU reset, too many tabs) pauses drawing until the browser restores it
    renderer.domElement.addEventListener('webglcontextlost', (e) => { e.preventDefault(); lost = true; });
    renderer.domElement.addEventListener('webglcontextrestored', () => { lost = false; });
    camera = new THREE.PerspectiveCamera(38, 1, 0.05, 200);
    camPos = new THREE.Vector3(0, 3, 8); camLook = new THREE.Vector3();
    goalPos = camPos.clone(); goalLook = camLook.clone();
    resize();
    window.addEventListener('resize', resize);
  }
  function resize() {
    if (!renderer) return;
    const w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    // keep the characters in frame on tall phone screens
    camera.fov = w / h < 0.8 ? 58 : 38;
    camera.updateProjectionMatrix();
  }
  const handles = (ch) => !!SCENE_OF[ch];
  function sceneFor(ch) {
    const name = SCENE_OF[ch];
    if (!built[name]) built[name] = SC[name]();
    return built[name];
  }
  function runCues(sc, step, instant) {
    if (!step || !step.text) return;
    for (const [ch, re, fn] of sc.cues) if (ch === step.ch && re.test(step.text)) fn(instant);
  }
  function show(steps, idx, isPlaying) {
    const step = steps[idx];
    if (!ready || !handles(step.ch)) { hide(); return false; }
    const sc = sceneFor(step.ch);
    let start = idx;
    while (start > 0 && steps[start - 1].ch === step.ch) start--;
    if (current !== sc || appliedCh !== step.ch || idx <= appliedIdx) {
      // entering the chapter or jumping back: start over and replay the earlier cues at once
      current = sc;
      sc.reset(step.ch);
      for (let i = start; i < idx; i++) runCues(sc, steps[i], true);
      for (let i = 0; i < 90; i++) sc.update(1 / 30, t + i / 30);   // let everyone walk to where they should be
      sc.snap && sc.snap();
      snapCam = true;
    } else {
      for (let i = appliedIdx + 1; i < idx; i++) runCues(sc, steps[i], true);
    }
    runCues(sc, step, false);
    appliedIdx = idx; appliedCh = step.ch;
    playing = isPlaying;
    const who = step.kind === 'line' && sc.actors[step.who] ? step.who : null;
    speaker = who;
    Object.entries(sc.actors).forEach(([id, a]) => { a.talking = playing && id === who; });
    const k = step.para && String(step.para).includes('.') ? +String(step.para).split('.')[1] : 0;
    spec = who ? { who, side: sc.closeSide[who] || 1 } : { wide: Math.floor(k / 2) };
    holder.hidden = false;
    document.body.classList.add('in3d');
    if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame); }
    return true;
  }
  let speaker = null;
  function setPlaying(on) {
    playing = on;
    if (current) Object.entries(current.actors).forEach(([id, a]) => { a.talking = on && id === speaker; });
  }
  function hide() {
    if (holder) holder.hidden = true;
    document.body.classList.remove('in3d');
    if (raf) { cancelAnimationFrame(raf); raf = 0; }
    appliedCh = null;
  }
  function shotGoal() {
    if (!current || !spec) return null;
    if (spec.who && !(current.forceWide && current.forceWide())) return SC.closeUp(current.actors[spec.who], spec.side, null, !current.ground.sphere);
    return current.wide(spec.wide || 0);
  }
  function frame(now) {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(0.1, (now - last) / 1000); last = now; t += dt;
    if (!current) return;
    current.update(dt, t);
    const g = shotGoal();
    if (g) {
      goalPos.copy(g.pos); goalLook.copy(g.look);
      // a slow drift so the camera is never quite still
      goalPos.x += Math.sin(t * 0.21) * 0.08; goalPos.y += Math.sin(t * 0.17) * 0.05;
      if (snapCam) { camPos.copy(goalPos); camLook.copy(goalLook); snapCam = false; }
      const k = 1 - Math.exp(-dt / 0.9);
      camPos.lerp(goalPos, k); camLook.lerp(goalLook, k);
    }
    camera.position.copy(camPos);
    camera.lookAt(camLook);
    if (lost) return;
    try { renderer.render(current.scene, camera); }
    catch (e) { if (!warned) { warned = true; console.warn('[film3d] render failed', e); } }
  }
  return { supported, ensure, handles, show, hide, setPlaying, get ready() { return ready; }, get failed() { return failed; } };
})();

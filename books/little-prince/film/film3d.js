/* The Little Prince film — 3D scenes in which the characters move (three.js).
   three.js r159 is the last release with a build that loads as a plain <script>, which file:// needs (no ES modules).
   The characters are made of simple shapes with toon shading and ink outlines, and use no image textures:
   on file:// the illustrations count as cross-origin, and WebGL refuses them as textures.
   Each character follows the look of the chapter plates (images/README.md) and the book's eye style
   (white of the eye, lid line, coloured iris, one highlight). Scenes live in scenes3d.js. */
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
  // Smooth, bent tapered volumes for locks, fur, cloth and tails. Built once.
  function sweep(points, radii, depth = 1, steps = 16, sides = 10) {
    const curve = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p)));
    const frames = curve.computeFrenetFrames(steps, false), vertices = [], indices = [];
    for (let i = 0; i <= steps; i++) {
      const t = i / steps, center = curve.getPointAt(t), f = t * (radii.length - 1);
      const j = Math.min(radii.length - 2, Math.floor(f));
      const radius = THREE.MathUtils.lerp(radii[j], radii[j + 1], f - j);
      for (let k = 0; k <= sides; k++) {
        const angle = k / sides * Math.PI * 2;
        const v = center.clone().addScaledVector(frames.normals[i], Math.cos(angle) * radius)
          .addScaledVector(frames.binormals[i], Math.sin(angle) * radius * depth);
        vertices.push(v.x, v.y, v.z);
        if (i < steps && k < sides) {
          const a = i * (sides + 1) + k, b = a + sides + 1;
          indices.push(a, a + 1, b, b, a + 1, b + 1);
        }
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geo.setIndex(indices); geo.computeVertexNormals();
    // Join the duplicated seam normals so curved locks and tails shade continuously.
    const normals = geo.attributes.normal;
    for (let i = 0; i <= steps; i++) {
      const a = i * (sides + 1), b = a + sides;
      const n = new THREE.Vector3().fromBufferAttribute(normals, a).add(new THREE.Vector3().fromBufferAttribute(normals, b)).normalize();
      normals.setXYZ(a, n.x, n.y, n.z); normals.setXYZ(b, n.x, n.y, n.z);
    }
    return geo;
  }
  function stroke(parent, points, color = '#765332', radius = 0.0015) {
    const curve = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p)));
    return part(parent, new THREE.TubeGeometry(curve, 12, radius, 5, false), color, { line: 0, mat: flat(color) });
  }
  function star() {
    const shape = new THREE.Shape();
    for (let i = 0; i < 10; i++) {
      const angle = Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 0.007 : 0.016;
      const x = Math.cos(angle) * r, y = Math.sin(angle) * r;
      i ? shape.lineTo(x, y) : shape.moveTo(x, y);
    }
    shape.closePath();
    return new THREE.ExtrudeGeometry(shape, { depth: 0.003, bevelEnabled: false });
  }

  const rnd = (() => { let s = 7; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();

  // ------------------------------------------------------------------ face
  // The book's eye: small upright oval, white showing, thin lid line, coloured iris, one highlight.
  function eye(head, x, y, z, size, iris) {
    const g = new THREE.Group();
    g.position.set(x, y, z);
    g.lookAt(new THREE.Vector3(x * 2.2, y * 1.2 + 0.02, z * 2.2 + 0.4));
    const disc = (r, color, dz, sx = 1, sy = 1, dx = 0, dy = 0) => {
      const m = new THREE.Mesh(new THREE.CircleGeometry(r, 20), flat(color));
      m.position.set(dx, dy, dz); m.scale.set(sx, sy, 1); g.add(m); return m;
    };
    disc(size, '#fffaf0', 0, 0.78, 1);
    disc(size * 0.58, iris, size * 0.03, 0.9, 1, 0, -size * 0.12);
    disc(size * 0.34, '#1d1a24', size * 0.05, 0.9, 1, 0, -size * 0.12);
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

  // ------------------------------------------------------------------ the little prince
  // about 1 unit tall, feet at the origin, facing +z; soft tousled blond hair, yellow coat, cream trousers,
  // navy boots, long red scarf (both ends move in the wind)
  function prince() {
    const root = new THREE.Group();
    const a = actorBase(root);
    const body = new THREE.Group(); root.add(body);
    const hips = new THREE.Group(); hips.position.y = 0.34; body.add(hips);
    const legs = [-1, 1].map(sd => {
      const leg = new THREE.Group(); leg.position.set(0.065 * sd, 0.02, 0); hips.add(leg);
      part(leg, G.lathe([[0, 0.015], [0.06, 0.015], [0.078, -0.07], [0.076, -0.14], [0.05, -0.22], [0, -0.225]].reverse(), 16), '#eee0bc', { scale: [1, 1, 0.9] });
      part(leg, G.cyl(0.045, 0.042, 0.09, 12), '#293e52', { at: [0, -0.26, 0], line: 0.003 });
      part(leg, G.sphere(0.05, 16, 10), '#293e52', { at: [0, -0.314, 0.025], scale: [1, 0.72, 1.55], line: 0.003 });
      part(leg, G.torus(0.045, 0.005), '#354e61', { at: [0, -0.216, 0], rot: [Math.PI / 2, 0, 0], line: 0.001 });
      stroke(leg, [[-0.026, -0.14, 0.062], [-0.02, -0.18, 0.049], [-0.005, -0.2, 0.04]], '#b8a783', 0.001);
      return leg;
    });
    const torso = new THREE.Group(); hips.add(torso);
    part(torso, G.lathe([[0.001, -0.06], [0.145, -0.06], [0.148, -0.04], [0.128, 0.07], [0.113, 0.19], [0.114, 0.25], [0.07, 0.30], [0.001, 0.30]]), '#cfa23c', { scale: [1, 1, 0.78] });
    [[0.015, 0.109], [0.10, 0.099], [0.185, 0.091]].forEach(([y, z]) => part(torso, star(), '#f8df90', { at: [0, y, z], line: 0.0014 }));
    stroke(torso, [[0.018, -0.048, 0.116], [0.017, 0.08, 0.1], [0.016, 0.22, 0.09]], '#9e762f', 0.001);
    // scarf knot round the neck
    part(torso, G.torus(0.075, 0.034), '#b8432c', { at: [0, 0.29, 0], rot: [Math.PI / 2, 0, 0] });
    const arms = [-1, 1].map(sd => {
      const arm = new THREE.Group(); arm.position.set(0.12 * sd, 0.26, 0); torso.add(arm);
      part(arm, G.capsule(0.043, 0.15), '#cfa23c', { at: [0, -0.1, 0] });
      part(arm, G.sphere(0.033, 16, 10), '#f6d6b8', { at: [0, -0.21, 0], line: 0.0035 });
      arm.rotation.z = 0.12 * sd;
      return arm;
    });
    const neck = new THREE.Group(); neck.position.y = 0.31; torso.add(neck);
    const head = new THREE.Group(); neck.add(head);
    part(head, G.sphere(0.165, 28, 20), '#f7d9bc', { at: [0, 0.15, 0], scale: [1, 0.97, 0.95] });
    part(head, G.sphere(0.035, 10, 8), '#f7d9bc', { at: [0.158, 0.14, 0], line: 0.003 });
    part(head, G.sphere(0.035, 10, 8), '#f7d9bc', { at: [-0.158, 0.14, 0], line: 0.003 });
    const eyes = [-1, 1].map(sd => eye(head, 0.056 * sd, 0.15, 0.151, 0.017, '#596e57'));
    const m = mouth(head, 0.075, 0.149, 0.015);
    blush(head, 0.095, 0.1, 0.13, 0.026); blush(head, -0.095, 0.1, 0.13, 0.026);
    part(head, G.sphere(0.018, 12, 8), '#f7d9bc', { at: [0, 0.113, 0.156], scale: [0.75, 0.85, 1.15], line: 0.0015 });
    // An open hair cap follows the skull, leaving the face unobscured.
    const capGeo = new THREE.SphereGeometry(1, 28, 14, 0, Math.PI * 2, 0, Math.PI * 0.99);
    const hp = capGeo.attributes.position;
    for (let i = 0; i < hp.count; i++) {
      const x = hp.getX(i), y = hp.getY(i), z = hp.getZ(i);
      const phi = Math.atan2(z, x), front = (Math.sin(phi) + 1) / 2;
      const theta = Math.acos(THREE.MathUtils.clamp(y, -1, 1)) / (Math.PI * 0.99) * (2.1 - front * 0.88);
      hp.setXYZ(i, Math.cos(phi) * Math.sin(theta) * 0.177, 0.18 + Math.cos(theta) * 0.165, -0.017 + Math.sin(phi) * Math.sin(theta) * 0.169);
    }
    capGeo.computeVertexNormals();
    part(head, capGeo, '#e6b84d', { line: 0.003 });
    const lock = (points, width, color = '#edc15a') => part(head, sweep(points, [width * 0.65, width, width * 0.7, width * 0.3, 0.0008], 0.7, 12, 8), color, { line: 0.002 });
    // Broad roots overlap; only the curved tips break the silhouette.
    for (let i = 0; i < 11; i++) {
      const angle = i / 11 * Math.PI * 2, x = Math.cos(angle), z = Math.sin(angle);
      if (z > 0.6) continue;
      lock([[x * 0.125, 0.255, z * 0.125 - 0.02], [x * 0.172, 0.244, z * 0.164 - 0.02],
        [x * 0.19, 0.205, z * 0.179 - 0.02], [x * 0.213, 0.211, z * 0.182 - 0.02]], 0.036);
      lock([[x * 0.12, 0.2, z * 0.13 - 0.02], [x * 0.165, 0.173, z * 0.154 - 0.02],
        [x * 0.183, 0.137, z * 0.164 - 0.02], [x * 0.193, 0.146, z * 0.174 - 0.02]], 0.028, '#e4b54b');
    }
    [[-0.13, 0.30, -0.02, -0.042], [-0.08, 0.32, 0.015, 0.021], [-0.028, 0.333, -0.025, -0.025],
      [0.026, 0.328, 0.018, 0.04], [0.086, 0.305, -0.012, 0.025], [0.132, 0.29, -0.04, 0.045]].forEach(([x, y, z, bend]) => {
      lock([[x - bend * 0.5, y - 0.04, z], [x, y + 0.002, z + 0.018], [x + bend, y + 0.012, z + 0.009],
        [x + bend * 1.1, y + 0.037, z - 0.003]], 0.037);
    });
    [[-0.121, 0.286, 0.032, 0.073], [-0.067, 0.307, 0.043, 0.071], [-0.013, 0.30, 0.037, 0.091],
      [0.056, 0.29, 0.032, 0.074], [0.116, 0.267, 0.025, 0.064]].forEach(([x, y, width, length], i) => {
      const z = 0.14 - Math.abs(x) * 0.27, bend = i === 0 ? -0.025 : 0.024;
      lock([[x - 0.025, y, z - 0.032], [x + 0.006, y - 0.015, z + 0.009],
        [x + bend, y - length * 0.7, z + 0.025], [x + bend * 0.5, y - length, z + 0.021]], width);
    });
    // the two ends of the scarf: ribbons whose points are moved every frame
    const tails = [0, 1].map(k => {
      const geo = new THREE.PlaneGeometry(0.075, 1, 1, 12);
      const mesh = new THREE.Mesh(geo, toon('#b8432c', { side: THREE.DoubleSide }));
      mesh.frustumCulled = false;
      torso.add(mesh);
      return { mesh, len: k ? 0.5 : 0.62, side: k ? 0.035 : -0.035, ph: k * 1.7 };
    });
    const tmp = new THREE.Vector3(), q = new THREE.Quaternion();
    a.head = head; a.eyes = eyes; a.arms = arms; a.legs = legs; a.torso = torso; a.hips = hips; a.body = body;
    a.headPoint = () => head.localToWorld(new THREE.Vector3(0, 0.15, 0));
    a.height = 1;
    a.update = (dt, t, wind) => {
      // walk cycle
      a.phase += dt * 9 * a.walk;
      const sw = Math.sin(a.phase) * 0.55 * Math.min(1, a.walk);
      a.sit += (a.sitGoal - a.sit) * (1 - Math.exp(-dt / 0.4));
      legs[0].rotation.x = sw - a.sit * 1.45; legs[1].rotation.x = -sw - a.sit * 1.45;
      hips.position.y = 0.34 - a.sit * 0.2 + Math.abs(Math.cos(a.phase)) * 0.02 * a.walk;
      torso.rotation.x = a.ease('lean', a.poseGoal.lean || 0, dt) + a.sit * 0.08;
      const armL = a.ease('armL', a.poseGoal.armL != null ? a.poseGoal.armL : -sw * 0.9, dt, 0.25);
      const armR = a.ease('armR', a.poseGoal.armR != null ? a.poseGoal.armR : sw * 0.9, dt, 0.25);
      arms[0].rotation.x = armL + (a.talk > 0.3 ? Math.sin(t * 3.1) * 0.12 * a.talk : 0);
      arms[1].rotation.x = armR;
      arms[0].rotation.z = -0.12 - a.ease('armLOut', a.poseGoal.armLOut || 0, dt);
      arms[1].rotation.z = 0.12 + a.ease('armROut', a.poseGoal.armROut || 0, dt);
      // breathing, looking, talking
      body.position.y = Math.sin(t * 2.1) * 0.006;
      a.look.lerp(a.lookGoal, 1 - Math.exp(-dt / 0.3));
      head.rotation.y = a.look.x + (a.talk > 0.2 ? Math.sin(t * 2.3) * 0.08 * a.talk : 0);
      head.rotation.x = a.look.y + (a.talk > 0.2 ? Math.sin(t * 4.1) * 0.05 * a.talk : 0) + a.ease('nod', a.poseGoal.nod || 0, dt);
      head.rotation.z = a.ease('tilt', a.poseGoal.tilt || 0, dt);
      blinkAndTalk(a, dt, t, eyes, m);
      // scarf ends stream away from the wind and flutter
      root.updateMatrixWorld(true);
      q.copy(torso.getWorldQuaternion(new THREE.Quaternion())).invert();
      const w = (wind || new THREE.Vector3(1, 0, 0)).clone().applyQuaternion(q);
      const strength = Math.min(1, w.length());
      w.normalize();
      tails.forEach(tl => {
        const pos = tl.mesh.geometry.attributes.position;
        const base = new THREE.Vector3(tl.side, 0.29, -0.07);
        const dir = new THREE.Vector3(w.x * strength, -0.9 + strength * 0.75, w.z * strength - 0.25).normalize();
        const sideV = new THREE.Vector3().crossVectors(dir, new THREE.Vector3(0, 0, 1)).normalize();
        if (sideV.lengthSq() < 0.01) sideV.set(1, 0, 0);
        const n = 12;
        for (let k = 0; k <= n; k++) {
          const s = k / n;
          const flutter = Math.sin(t * 7 * (0.4 + strength) - s * 6 + tl.ph) * 0.07 * s * (0.3 + strength);
          const lift = Math.sin(t * 5 - s * 4 + tl.ph) * 0.04 * s * strength;
          tmp.copy(base).addScaledVector(dir, s * tl.len).add(new THREE.Vector3(0, lift, flutter));
          const half = 0.0375 * (1 - s * 0.25);
          pos.setXYZ(k * 2, tmp.x - sideV.x * half, tmp.y - sideV.y * half, tmp.z - sideV.z * half);
          pos.setXYZ(k * 2 + 1, tmp.x + sideV.x * half, tmp.y + sideV.y * half, tmp.z + sideV.z * half);
        }
        pos.needsUpdate = true;
        tl.mesh.geometry.computeVertexNormals();
      });
    };
    return a;
  }

  // ------------------------------------------------------------------ the fox
  // orange with a white chest, muzzle and tail tip, dark legs and ear tips; sits or walks; the tail wags when happy
  function fox() {
    const root = new THREE.Group();
    const a = actorBase(root);
    const red = '#c76c2f', cream = '#f3e7cd', dark = '#43352c';
    const body = new THREE.Group(); body.position.y = 0.32; root.add(body);
    const trunk = part(body, G.sphere(1, 24, 16), red, { scale: [0.117, 0.133, 0.24], at: [0, 0, -0.035] });
    const neck = new THREE.Group(); body.add(neck);
    part(neck, G.sphere(1, 20, 14), red, { at: [0, 0.025, -0.015], scale: [0.088, 0.15, 0.084], rot: [-0.22, 0, 0] });
    part(neck, G.sphere(1, 18, 12), cream, { at: [0, 0.005, 0.052], scale: [0.075, 0.13, 0.042], line: 0 });
    // A few overlapping curved points give the bib a fur edge, without a spiky collar.
    [-1, 0, 1].forEach(sd => part(neck, sweep([[sd * 0.04, -0.025, 0.074], [sd * 0.038, -0.08, 0.075], [sd * 0.023, -0.14 + Math.abs(sd) * 0.025, 0.046]], [0.025, 0.025, 0.0005], 0.5, 8, 8), cream, { line: 0.0015 }));
    const legs = [-1, 1, -1, 1].map((sd, i) => {
      const leg = new THREE.Group(); body.add(leg);
      if (i < 2) {
        part(leg, G.lathe([[0, 0.018], [0.037, 0.012], [0.031, -0.08], [0.021, -0.2], [0.023, -0.275], [0, -0.29]].reverse(), 12), red);
        part(leg, G.cyl(0.026, 0.025, 0.09, 12), dark, { at: [0, -0.235, 0.002], line: 0.002 });
        part(leg, G.sphere(0.032, 12, 8), dark, { at: [0, -0.288, 0.018], scale: [0.83, 0.65, 1.55], line: 0.002 });
      } else {
        part(leg, G.sphere(1, 18, 12), red, { at: [0, -0.07, -0.008], scale: [0.079, 0.116, 0.095] });
        const shin = part(leg, G.capsule(0.027, 0.13), red, { at: [0, -0.2, -0.02], line: 0.003 });
        const paw = part(leg, G.sphere(0.034, 12, 8), dark, { at: [0, -0.28, 0.018], scale: [0.9, 0.65, 1.7], line: 0.002 });
        leg.userData.shin = shin; leg.userData.paw = paw;
      }
      return leg;
    });
    const head = new THREE.Group(); head.position.set(0, 0.13, 0.02); neck.add(head);
    part(head, G.sphere(1, 24, 16), red, { scale: [0.098, 0.096, 0.112] });
    // Long tapered muzzle, cream lower jaw and a small dark nose.
    part(head, sweep([[0, -0.035, 0.038], [0, -0.041, 0.105], [0, -0.038, 0.174], [0, -0.032, 0.211]], [0.067, 0.048, 0.026, 0.009], 0.65), cream, { line: 0.002 });
    part(head, sweep([[0, 0.012, 0.05], [0, -0.008, 0.109], [0, -0.019, 0.17], [0, -0.02, 0.208]], [0.055, 0.038, 0.019, 0.004], 0.62), red, { line: 0.002 });
    part(head, G.sphere(0.014, 12, 8), dark, { at: [0, -0.022, 0.21], scale: [1, 0.75, 0.85], line: 0.001 });
    [-1, 1].forEach(sd => {
      part(head, G.sphere(1, 14, 10), cream, { at: [sd * 0.063, -0.041, 0.04], scale: [0.029, 0.022, 0.063], line: 0 });
      part(head, sweep([[sd * 0.064, -0.006, 0], [sd * 0.093, -0.024, -0.012], [sd * 0.119, -0.016, -0.03]], [0.035, 0.03, 0.001], 0.7, 8, 8), red, { line: 0.002 });
      stroke(head, [[sd * 0.012, -0.043, 0.198], [sd * 0.029, -0.056, 0.155], [sd * 0.058, -0.049, 0.091]], '#684332', 0.0012);
    });
    const ears = [-1, 1].map(sd => {
      const ear = new THREE.Group(); ear.position.set(0.063 * sd, 0.065, -0.025); head.add(ear);
      const earGeo = sweep([[0, 0, 0], [sd * 0.005, 0.054, -0.008], [sd * 0.007, 0.11, -0.005], [0, 0.165, 0.003]], [0.049, 0.04, 0.021, 0.0005], 0.42, 12, 10);
      part(ear, earGeo, dark, { line: 0.002 });
      part(ear, sweep([[0, 0.002, 0.012], [0, 0.046, 0.016], [0, 0.107, 0.012], [0, 0.144, 0.009]], [0.039, 0.031, 0.013, 0.001], 0.25, 10, 10), red, { line: 0 });
      part(ear, sweep([[0, 0.014, 0.022], [0, 0.05, 0.025], [0, 0.092, 0.022], [0, 0.123, 0.013]], [0.024, 0.022, 0.01, 0.001], 0.18, 10, 8), '#e6ccaa', { line: 0 });
      ear.rotation.z = -sd * 0.16;
      return ear;
    });
    const eyes = [-1, 1].map(sd => {
      const e = eye(head, 0.065 * sd, 0.028, 0.081, 0.0135, '#906326');
      e.rotation.y = sd * 0.5;
      return e;
    });
    // One continuous bushy tail; only its pivot moves, so no bead-like joints.
    const tail = new THREE.Group(); body.add(tail);
    const tailPoints = [[0, 0, 0], [0.06, -0.095, -0.11], [0.16, -0.15, -0.25], [0.27, -0.15, -0.30], [0.36, -0.12, -0.26], [0.43, -0.085, -0.17]];
    const tailGeo = sweep(tailPoints, [0.031, 0.065, 0.096, 0.101, 0.064, 0.0002], 0.85, 28, 12);
    // Material bands share vertices/normals at the white tip boundary.
    tailGeo.clearGroups(); const bandSize = 12 * 6;
    tailGeo.addGroup(0, bandSize * 17, 0); tailGeo.addGroup(bandSize * 17, bandSize * 11, 1);
    const tailMesh = new THREE.Mesh(tailGeo, [toon(red), toon(cream)]); tail.add(tailMesh);
    const tailInk = tailGeo.clone(); tailInk.clearGroups();
    tail.add(new THREE.Mesh(tailInk, outlineMat(0.003)));
    a.head = head; a.eyes = eyes; a.body = body; a.legs = legs;
    a.headPoint = () => head.localToWorld(new THREE.Vector3(0, 0, 0.05));
    a.height = 0.7; a.wag = 0.3;
    a.update = (dt, t) => {
      a.phase += dt * 8 * a.walk;
      const sw = Math.sin(a.phase) * 0.48 * Math.min(1, a.walk);
      a.sit += (a.sitGoal - a.sit) * (1 - Math.exp(-dt / 0.4));
      const sit = a.sit;
      // The chest stays over straight forelegs as the pelvis folds to the ground.
      body.position.y = 0.32 + Math.abs(Math.cos(a.phase)) * 0.012 * a.walk;
      trunk.position.set(0, -sit * 0.065, -0.035 - sit * 0.035);
      trunk.rotation.x = -sit * 0.78;
      neck.position.set(0, 0.085 + sit * 0.016, 0.185 - sit * 0.09);
      neck.rotation.x = a.ease('nod', a.poseGoal.nod || 0, dt);
      legs.forEach((leg, i) => {
        const sd = i % 2 ? 1 : -1;
        if (i < 2) {
          leg.position.set(sd * 0.065, -0.005, 0.16 - sit * 0.025);
          leg.rotation.x = (i ? -sw : sw) * (1 - sit);
        } else {
          leg.position.set(sd * (0.081 + sit * 0.015), -sit * 0.10, -0.19 + sit * 0.025);
          leg.rotation.x = (i === 2 ? -sw : sw) * (1 - sit);
          leg.userData.shin.position.set(0, -0.2 + sit * 0.065, -0.02 + sit * 0.075);
          leg.userData.shin.rotation.x = -sit * 1.12;
          leg.userData.paw.position.set(0, -0.28 + sit * 0.10, 0.018 + sit * 0.06);
        }
      });
      a.look.lerp(a.lookGoal, 1 - Math.exp(-dt / 0.3));
      head.rotation.y = a.look.x;
      head.rotation.z = Math.sin(t * 0.7) * 0.025 + a.ease('tilt', a.poseGoal.tilt || 0, dt);
      head.rotation.x = a.look.y + (a.talk > 0.2 ? Math.sin(t * 9) * 0.04 * a.talk : 0);
      const down = a.ease('earsDown', a.poseGoal.earsDown || 0, dt);
      ears.forEach((e, i) => { e.rotation.x = Math.max(0, Math.sin(t * 1.3 + i * 2) - 0.92) * 2 - down * 0.6; });
      const wag = a.ease('wag', a.wag, dt, 0.5);
      tail.position.set(0, -0.02 - sit * 0.05, -0.235);
      tail.rotation.y = -sit * 0.65 + Math.sin(t * (3 + wag * 4)) * (0.03 + wag * 0.22);
      tail.rotation.x = -0.12 * (1 - sit);
      blinkAndTalk(a, dt, t, eyes, null);
    };
    return a;
  }

  // ------------------------------------------------------------------ the lamplighter
  // old man, white beard and hair, red stocking cap with a pompom, navy coat and trousers, brown boots,
  // long orange-red scarf, a long lighting pole
  function lamplighter() {
    const root = new THREE.Group();
    const a = actorBase(root);
    const body = new THREE.Group(); root.add(body);
    const hips = new THREE.Group(); hips.position.y = 0.55; body.add(hips);
    const legs = [-1, 1].map(sd => {
      const leg = new THREE.Group(); leg.position.set(0.08 * sd, 0, 0); hips.add(leg);
      part(leg, G.capsule(0.075, 0.3), '#2b3868', { at: [0, -0.2, 0] });
      part(leg, G.cyl(0.063, 0.052, 0.13, 12), '#66503a', { at: [0, -0.41, 0], line: 0.003 });
      part(leg, G.sphere(0.063, 16, 10), '#66503a', { at: [0, -0.493, 0.033], scale: [1, 0.65, 1.6], line: 0.003 });
      part(leg, G.torus(0.062, 0.008), '#806448', { at: [0, -0.348, 0], rot: [Math.PI / 2, 0, 0], line: 0.0015 });
      return leg;
    });
    const torso = new THREE.Group(); hips.add(torso);
    part(torso, G.lathe([[0.001, -0.05], [0.2, -0.05], [0.21, 0.1], [0.19, 0.3], [0.13, 0.42], [0.001, 0.43]]), '#2b3868');
    part(torso, G.torus(0.19, 0.025), '#6b4428', { at: [0, 0.04, 0], rot: [Math.PI / 2, 0, 0], line: 0.003 });
    part(torso, G.box(0.045, 0.033, 0.008), '#b29456', { at: [0, 0.04, 0.224], line: 0.0015 });
    part(torso, G.box(0.029, 0.019, 0.009), '#594531', { at: [0, 0.04, 0.23], line: 0 });
    [0.14, 0.23, 0.31].forEach(y => part(torso, G.sphere(0.008, 8, 6), '#b29456', { at: [-0.027, y, 0.208 - Math.max(0, y - 0.16) * 0.24], line: 0.001 }));
    part(torso, G.torus(0.09, 0.045), '#d9542c', { at: [0, 0.41, 0], rot: [Math.PI / 2, 0, 0] });
    const scarf = part(torso, sweep([[0.07, 0.4, 0.1], [0.1, 0.31, 0.18], [0.12, 0.14, 0.2], [0.16, -0.035, 0.23]], [0.044, 0.045, 0.039, 0.033], 0.16, 16, 8), '#c55b32', { line: 0.002 });
    part(torso, sweep([[-0.06, 0.4, -0.04], [-0.12, 0.28, -0.16], [-0.17, 0.13, -0.22], [-0.23, 0.07, -0.25]], [0.039, 0.043, 0.037, 0.029], 0.18, 16, 8), '#c55b32', { line: 0.002 });
    const arms = [-1, 1].map(sd => {
      const arm = new THREE.Group(); arm.position.set(0.19 * sd, 0.38, 0); torso.add(arm);
      part(arm, G.capsule(0.05, 0.26), '#2b3868', { at: [0, -0.16, 0] });
      part(arm, G.sphere(0.048), '#efc9a8', { at: [0, -0.33, 0], line: 0.0035 });
      return arm;
    });
    // the pole in the right hand
    const pole = new THREE.Group(); pole.position.set(0, -0.33, 0); arms[1].add(pole);
    part(pole, G.cyl(0.012, 0.012, 1.3, 8), '#5a4632', { at: [0, 0.35, 0.02], line: 0.004 });
    const wick = part(pole, G.sphere(0.02, 8, 6), '#ffb347', { at: [0, 1.0, 0.02], line: 0, mat: flat('#ffb347') });
    // handkerchief in the left hand (red check), shown while he wipes his forehead
    const hanky = part(arms[0], G.box(0.12, 0.1, 0.01), '#b8432c', { at: [0, -0.38, 0.03], line: 0.004 });
    hanky.visible = false;
    const neck = new THREE.Group(); neck.position.y = 0.43; torso.add(neck);
    const head = new THREE.Group(); neck.add(head);
    part(head, G.sphere(0.15, 24, 18), '#efc9a8', { at: [0, 0.13, 0] });
    part(head, G.sphere(0.035, 10, 8), '#e8b596', { at: [0, 0.1, 0.15], line: 0.003 });
    const eyes = [-1, 1].map(sd => eye(head, 0.055 * sd, 0.15, 0.14, 0.016, '#657779'));
    [-1, 1].forEach(sd => part(head, G.capsule(0.012, 0.05), '#f4f1ea', { at: [0.058 * sd, 0.195, 0.13], rot: [0, 0, Math.PI / 2 + 0.2 * sd], line: 0.004 }));
    // Soft cheek whiskers merge into a tapered, slightly asymmetric beard.
    part(head, sweep([[0, 0.068, 0.075], [0, 0.006, 0.112], [0.005, -0.07, 0.11], [0.027, -0.11, 0.08]], [0.089, 0.096, 0.057, 0.001], 0.66), '#eee9d9', { line: 0.003 });
    [-1, 1].forEach(sd => {
      part(head, sweep([[sd * 0.12, 0.17, -0.025], [sd * 0.134, 0.1, -0.02], [sd * 0.104, 0.025, 0.059], [sd * 0.067, -0.015, 0.115]], [0.045, 0.043, 0.037, 0.008], 0.75), '#eee9d9', { line: 0.002 });
      part(head, G.sphere(0.028, 12, 8), '#efc9a8', { at: [sd * 0.145, 0.11, 0.005], scale: [0.7, 1.2, 0.65], line: 0.002 });
      part(head, sweep([[sd * 0.008, 0.075, 0.158], [sd * 0.039, 0.065, 0.157], [sd * 0.078, 0.044, 0.143], [sd * 0.089, 0.057, 0.119]], [0.016, 0.023, 0.017, 0.001], 0.7, 12, 8), '#f6f0df', { line: 0.002 });
      stroke(head, [[sd * 0.062, 0.117, 0.135], [sd * 0.078, 0.113, 0.126], [sd * 0.087, 0.118, 0.115]], '#b58c70', 0.001);
    });
    // A drooping knitted stocking cap, with a red folded brim and red pompom.
    const cap = new THREE.Group(); cap.position.set(0, 0.235, -0.015); head.add(cap);
    part(cap, sweep([[0, -0.025, 0], [0, 0.055, -0.015], [0.036, 0.107, -0.065], [0.097, 0.086, -0.115], [0.13, 0.021, -0.125]], [0.139, 0.133, 0.104, 0.06, 0.017], 1, 20, 16), '#b94e31', { line: 0.003 });
    part(cap, G.torus(0.138, 0.023), '#bd5734', { rot: [Math.PI / 2, 0, 0], scale: [1, 0.91, 1.3], line: 0.002 });
    part(cap, G.sphere(0.041, 14, 10), '#ca653b', { at: [0.135, 0.0, -0.123], line: 0.003 });
    for (let i = 0; i < 6; i++) {
      const th = i * Math.PI / 3;
      part(cap, G.sphere(0.017, 8, 6), '#ca653b', { at: [0.135 + Math.cos(th) * 0.032, Math.sin(th) * 0.033, -0.118], line: 0.001 });
    }
    a.head = head; a.eyes = eyes; a.arms = arms; a.legs = legs; a.wick = wick; a.hanky = hanky; a.body = body; a.hips = hips; a.torso = torso;
    a.headPoint = () => head.localToWorld(new THREE.Vector3(0, 0.12, 0));
    a.height = 1.35;
    a.update = (dt, t) => {
      a.phase += dt * 8 * a.walk;
      const sw = Math.sin(a.phase) * 0.5 * Math.min(1, a.walk);
      legs[0].rotation.x = sw; legs[1].rotation.x = -sw;
      body.position.y = Math.sin(t * 1.7) * 0.006;
      arms[1].rotation.x = a.ease('reach', a.poseGoal.reach != null ? a.poseGoal.reach : -0.25, dt, 0.3);
      arms[1].rotation.z = 0.15;
      arms[0].rotation.x = a.ease('wipe', a.poseGoal.wipe ? -2.5 : 0.1, dt, 0.25) + (a.poseGoal.wipe ? Math.sin(t * 9) * 0.15 : 0);
      arms[0].rotation.z = -0.15 - (a.poseGoal.wipe ? 0.35 : 0);
      a.hanky.visible = !!a.poseGoal.wipe;
      a.look.lerp(a.lookGoal, 1 - Math.exp(-dt / 0.3));
      head.rotation.y = a.look.x + (a.talk > 0.2 ? Math.sin(t * 2.7) * 0.07 * a.talk : 0);
      head.rotation.x = a.look.y + (a.talk > 0.2 ? Math.sin(t * 5.3) * 0.05 * a.talk : 0);
      blinkAndTalk(a, dt, t, eyes, null);
    };
    return a;
  }

  function rosePetal(width, height, curl) {
    // Elliptical discs with a cupped surface and a rolled lip: no pointed corners.
    const vertices = [], indices = [], rings = 5, sides = 16, row = sides + 1, layer = (rings + 1) * row;
    for (let side = 0; side < 2; side++) for (let j = 0; j <= rings; j++) for (let i = 0; i <= sides; i++) {
      const r = j / rings, angle = i / sides * Math.PI * 2;
      const x = Math.cos(angle) * r * width, t = 0.5 + Math.sin(angle) * r * 0.5;
      vertices.push(x, t * height,
        curl * t * t + (x / width) ** 2 * 0.018 - t ** 7 * 0.018 + (side ? -0.0012 : 0.0012));
    }
    for (let j = 0; j < rings; j++) for (let i = 0; i < sides; i++) {
      const a = j * row + i, b = a + row;
      indices.push(a, b, a + 1, b, b + 1, a + 1);
      indices.push(a + layer, a + 1 + layer, b + layer, b + layer, a + 1 + layer, b + 1 + layer);
    }
    for (let i = 0; i < sides; i++) {
      const a = rings * row + i, b = a + 1;
      indices.push(a, a + layer, b, b, a + layer, b + layer);
    }
    const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geo.setIndex(indices); geo.computeVertexNormals(); return geo;
  }

  // ------------------------------------------------------------------ the rose
  // grows from a shoot to a bud to the open flower (stage 0 → 2); four thorns; sways and "breathes" when she speaks
  function rose() {
    const root = new THREE.Group();
    const a = actorBase(root);
    a.stage = 2; a.stageNow = 2;
    const stem = part(root, G.cyl(0.012, 0.016, 1, 8), '#4d8a3c', { at: [0, 0.5, 0], line: 0.005 });
    const leaves = [[-1, 0.3], [1, 0.45]].map(([sd, y]) => {
      const l = new THREE.Group(); l.position.set(0, y, 0); l.rotation.z = -sd * 0.95; root.add(l);
      const shape = new THREE.Shape(); shape.moveTo(0, 0);
      for (let i = 1; i <= 12; i++) { const t = i / 12; shape.lineTo(Math.sin(t * Math.PI) * (i % 2 ? 0.041 : 0.033), t * 0.18); }
      for (let i = 11; i >= 0; i--) { const t = i / 12; shape.lineTo(-Math.sin(t * Math.PI) * (i % 2 ? 0.041 : 0.033), t * 0.18); }
      part(l, new THREE.ExtrudeGeometry(shape, { depth: 0.003, bevelEnabled: false }), '#608448', { line: 0.0015 });
      stroke(l, [[0, 0, 0.005], [0, 0.09, 0.005], [0, 0.176, 0.005]], '#b1ac61', 0.0012);
      for (let i = 1; i <= 3; i++) [-1, 1].forEach(side => stroke(l, [[0, i * 0.036, 0.005], [side * 0.021, i * 0.036 + 0.024, 0.005]], '#839957', 0.0007));
      return l;
    });
    const thorns = [[0.35, 1], [0.5, -1], [0.62, 1], [0.72, -1]].map(([y, sd]) =>
      part(root, sweep([[sd * 0.008, -0.016, 0], [sd * 0.021, 0, 0], [sd * 0.049, 0.008, 0]], [0.009, 0.007, 0.0002], 0.8, 6, 6), '#675536', { line: 0.0015 }));
    const bloom = new THREE.Group(); root.add(bloom);
    const petals = [];
    part(bloom, G.sphere(0.036, 14, 10), '#a63430', { at: [0, 0.019, 0], scale: [1, 1.35, 1], line: 0.002 });
    const colors = ['#ae3430', '#c04737', '#ce5940', '#d66a4a'];
    for (let ring = 0; ring < 4; ring++) {
      const count = 5 + ring;
      const geo = rosePetal(0.027 + ring * 0.011, 0.074 + ring * 0.012, 0.022 + ring * 0.011);
      for (let i = 0; i < count; i++) {
        const p = new THREE.Group(); p.rotation.y = i / count * Math.PI * 2 + ring * 0.73; bloom.add(p);
        const leaf = part(p, geo, colors[ring], { line: 0.0011 });
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
    part(heart, spiralGeo, '#c3543c', { mat: toon('#c3543c', { side: THREE.DoubleSide }), line: 0 });
    const rimCurve = new THREE.CatmullRomCurve3(lip.map(p => new THREE.Vector3(...p)));
    part(heart, new THREE.TubeGeometry(rimCurve, 64, 0.0011, 4, false), '#793a29', { line: 0 });
    const sepals = new THREE.Group(); bloom.add(sepals);
    for (let i = 0; i < 5; i++) {
      const g = new THREE.Group(); g.rotation.y = i / 5 * Math.PI * 2; sepals.add(g);
      part(g, sweep([[0, -0.038, 0], [0, -0.035, 0.047], [0, -0.061, 0.093]], [0.019, 0.024, 0.0002], 0.25, 8, 8), '#608448', { line: 0.0015 });
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
      stem.scale.set(1, h, 1); stem.position.y = h / 2;
      leaves.forEach((l, i) => { l.visible = s > 0.2 + i * 0.3; l.position.y = h * (0.35 + i * 0.2); });
      thorns.forEach((th, i) => { th.visible = s > 0.8; th.position.y = h * (0.4 + i * 0.13); th.scale.setScalar(1 + (a.poseGoal.thorns ? 0.6 + Math.sin(t * 8) * 0.2 : 0)); });
      bloom.position.y = h + 0.03;
      const open = Math.max(0, s - 1);           // 0 = bud, 1 = open
      bloom.scale.setScalar(0.35 + Math.min(1, s) * 0.45 + open * 0.3);
      petals.forEach(p => {
        p.leaf.rotation.x = -0.30 + open * (0.31 + p.ring * 0.14) + p.offset * open;
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
  // load three.js on first use (a plain script, so it also works from file://)
  function ensure(base) {
    if (ready) return Promise.resolve(true);
    if (loading) return loading;
    loading = new Promise((resolve) => {
      const go = () => { try { init(); ready = true; resolve(true); } catch (e) { console.warn('[film3d]', e); failed = true; resolve(false); } };
      if (window.THREE) return go();
      const s = document.createElement('script');
      s.src = (base || '') + 'vendor/three.min.js';
      s.onload = go;
      s.onerror = () => { failed = true; resolve(false); };
      document.head.appendChild(s);
    });
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

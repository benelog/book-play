/* The Little Prince film — 3D scenes in which the characters move (three.js).
   three.js r159 is the last release with a build that loads as a plain <script>, which file:// needs (no ES modules).
   The characters are made of simple shapes with toon shading and ink outlines, and use no image textures:
   on file:// the illustrations count as cross-origin, and WebGL refuses them as textures.
   Each character follows the look of the chapter plates (images/README.md) and the book's eye style
   (white of the eye, lid line, coloured iris, one highlight). Scenes live in scenes3d.js. */
window.LP_FILM_3D_KIT = function (THREE) {
  const INK = new THREE.Color('#3b2a1e');
  // three flat bands of light, like the flat colour areas of the watercolours
  const ramp = new THREE.DataTexture(new Uint8Array([120, 120, 120, 255, 200, 200, 200, 255, 255, 255, 255, 255]), 3, 1, THREE.RGBAFormat);
  ramp.minFilter = ramp.magFilter = THREE.NearestFilter; ramp.needsUpdate = true;
  const mats = {};
  function toon(color, extra) {
    const key = color + JSON.stringify(extra || {});
    if (!mats[key]) mats[key] = new THREE.MeshToonMaterial(Object.assign({ color: new THREE.Color(color), gradientMap: ramp }, extra || {}));
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
    const line = o.line == null ? 0.012 : o.line;
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
    disc(size * 0.68, iris, size * 0.03, 0.9, 1, 0, -size * 0.12);
    disc(size * 0.34, '#1d1a24', size * 0.05, 0.9, 1, 0, -size * 0.12);
    disc(size * 0.17, '#ffffff', size * 0.07, 1, 1, size * 0.2, size * 0.14);
    const lid = new THREE.Mesh(new THREE.TorusGeometry(size * 0.86, size * 0.13, 4, 18, Math.PI * 0.95), flat('#3b2a1e'));
    lid.rotation.z = Math.PI * 0.025; lid.position.z = size * 0.08; lid.scale.set(0.9, 1.08, 1);
    g.add(lid);
    head.add(g);
    return g;
  }
  function mouth(head, y, z, w) {
    const m = new THREE.Mesh(new THREE.TorusGeometry(w, w * 0.18, 4, 12, Math.PI * 0.8), flat('#7a3b2e'));
    m.position.set(0, y, z); m.rotation.z = Math.PI + Math.PI * 0.1;
    head.add(m);
    const open = new THREE.Mesh(new THREE.CircleGeometry(w * 0.7, 14), flat('#6a2a24'));
    open.position.set(0, y - w * 0.25, z - 0.002); open.scale.set(1, 0.01, 1);
    head.add(open);
    return { arc: m, open };
  }
  function blush(head, x, y, z, r) {
    const m = new THREE.Mesh(new THREE.CircleGeometry(r, 16), flat('#f09a8a', { transparent: true, opacity: 0.55 }));
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
      mouthParts.open.scale.y = 0.01 + o;
      mouthParts.arc.scale.y = 1 - o * 0.4;
    }
  }

  // ------------------------------------------------------------------ the little prince
  // about 1 unit tall, feet at the origin, facing +z; blond spiky hair, yellow coat, cream trousers,
  // navy boots, long red scarf (both ends move in the wind)
  function prince() {
    const root = new THREE.Group();
    const a = actorBase(root);
    const body = new THREE.Group(); root.add(body);
    const hips = new THREE.Group(); hips.position.y = 0.34; body.add(hips);
    const legs = [-1, 1].map(sd => {
      const leg = new THREE.Group(); leg.position.set(0.065 * sd, 0.02, 0); hips.add(leg);
      part(leg, G.capsule(0.075, 0.12), '#efe4c6', { at: [0, -0.11, 0] });
      part(leg, G.capsule(0.06, 0.07), '#2d3c78', { at: [0, -0.27, 0.025], rot: [Math.PI / 2 * 0.25, 0, 0] });
      return leg;
    });
    const torso = new THREE.Group(); hips.add(torso);
    part(torso, G.lathe([[0.001, -0.06], [0.2, -0.06], [0.185, 0.02], [0.14, 0.16], [0.12, 0.26], [0.07, 0.31], [0.001, 0.31]]), '#e8b33c');
    [0.02, 0.1, 0.18].forEach(y => part(torso, G.sphere(0.018, 8, 6), '#f7dc7a', { at: [0, y, 0.15 - y * 0.12], line: 0.006 }));
    // scarf knot round the neck
    part(torso, G.torus(0.075, 0.034), '#c8372c', { at: [0, 0.29, 0], rot: [Math.PI / 2, 0, 0] });
    const arms = [-1, 1].map(sd => {
      const arm = new THREE.Group(); arm.position.set(0.12 * sd, 0.26, 0); torso.add(arm);
      part(arm, G.capsule(0.043, 0.15), '#e8b33c', { at: [0, -0.1, 0] });
      part(arm, G.sphere(0.042), '#f6d6b8', { at: [0, -0.21, 0], line: 0.008 });
      arm.rotation.z = 0.12 * sd;
      return arm;
    });
    const neck = new THREE.Group(); neck.position.y = 0.31; torso.add(neck);
    const head = new THREE.Group(); neck.add(head);
    part(head, G.sphere(0.165, 28, 20), '#f7d9bc', { at: [0, 0.15, 0], scale: [1, 0.97, 0.95] });
    part(head, G.sphere(0.035, 10, 8), '#f7d9bc', { at: [0.158, 0.14, 0], line: 0.006 });
    part(head, G.sphere(0.035, 10, 8), '#f7d9bc', { at: [-0.158, 0.14, 0], line: 0.006 });
    const eyes = [-1, 1].map(sd => eye(head, 0.056 * sd, 0.15, 0.15, 0.028, '#6f94b6'));
    const m = mouth(head, 0.075, 0.156, 0.022);
    blush(head, 0.095, 0.1, 0.13, 0.026); blush(head, -0.095, 0.1, 0.13, 0.026);
    // hair: a cap over the top and back, then soft pointed tufts spread evenly round it (the face stays clear),
    // the fringe pointing down over the forehead
    part(head, G.sphere(0.176, 24, 16), '#f3c43f', { at: [0, 0.19, -0.025], scale: [1.04, 0.86, 1] });
    const N = 34;
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 1.25, r = Math.sqrt(Math.max(0, 1 - y * y)), th = i * 2.39996;
      const dir = new THREE.Vector3(Math.cos(th) * r, y, Math.sin(th) * r);
      if (dir.z > 0.35 && dir.y < 0.62) continue;
      const tuft = part(head, G.cone(0.055, 0.1 + (i % 3) * 0.025, 6), '#f3c43f', { line: 0.008 });
      tuft.position.copy(dir.clone().multiplyScalar(0.165)).add(new THREE.Vector3(0, 0.18, -0.02));
      tuft.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().add(new THREE.Vector3(0, -0.45, 0)).normalize());
    }
    for (let i = -2; i <= 2; i++) {
      const tuft = part(head, G.cone(0.045, 0.1, 6), '#f3c43f', { line: 0.008 });
      tuft.position.set(i * 0.058, 0.265, 0.1 - Math.abs(i) * 0.012);
      tuft.rotation.set(Math.PI * 0.78, 0, i * 0.22);
    }
    // the two ends of the scarf: ribbons whose points are moved every frame
    const tails = [0, 1].map(k => {
      const geo = new THREE.PlaneGeometry(0.075, 1, 1, 12);
      const mesh = new THREE.Mesh(geo, toon('#c8372c', { side: THREE.DoubleSide }));
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
    const body = new THREE.Group(); body.position.y = 0.34; root.add(body);
    const trunk = part(body, G.sphere(0.2, 24, 16), '#e07a36', { scale: [0.85, 0.8, 1.45] });
    part(body, G.sphere(0.12, 16, 12), '#fbf3e6', { at: [0, 0.03, 0.235], scale: [0.95, 1.15, 0.6], line: 0 });
    const legs = [[-0.1, 0.15], [0.1, 0.15], [-0.11, -0.2], [0.11, -0.2]].map(([x, z], i) => {
      const leg = new THREE.Group(); leg.position.set(x, -0.05, z); body.add(leg);
      part(leg, G.capsule(0.04, 0.22), i < 2 ? '#e07a36' : '#d06a2c', { at: [0, -0.13, 0] });
      part(leg, G.sphere(0.045, 10, 8), '#3a2a24', { at: [0, -0.28, 0.02], scale: [1, 0.6, 1.3], line: 0.006 });
      return leg;
    });
    const neck = new THREE.Group(); neck.position.set(0, 0.12, 0.25); body.add(neck);
    const head = new THREE.Group(); head.position.set(0, 0.14, 0.04); neck.add(head);
    part(head, G.sphere(0.13, 22, 16), '#e07a36', { scale: [1.05, 0.95, 1] });
    part(head, G.sphere(0.1, 16, 12), '#fbf3e6', { at: [0, -0.05, 0.05], scale: [1.05, 0.7, 0.9], line: 0 });
    part(head, G.cone(0.07, 0.17, 12), '#e9854a', { at: [0, -0.03, 0.17], rot: [Math.PI / 2, 0, 0], scale: [1, 1, 0.8] });
    part(head, G.sphere(0.017, 10, 8), '#221a18', { at: [0, -0.025, 0.255], line: 0.003 });
    const ears = [-1, 1].map(sd => {
      const ear = new THREE.Group(); ear.position.set(0.075 * sd, 0.1, -0.01); head.add(ear);
      part(ear, G.cone(0.055, 0.16, 4), '#e07a36', { at: [0, 0.07, 0], scale: [1, 1, 0.45] });
      part(ear, G.cone(0.025, 0.06, 4), '#3a2a24', { at: [0, 0.13, 0.001], scale: [1, 1, 0.5], line: 0 });
      ear.rotation.z = -0.25 * sd;
      return ear;
    });
    const eyes = [-1, 1].map(sd => eye(head, 0.06 * sd, 0.035, 0.105, 0.026, '#b87a22'));
    // tail: a chain of fluffy segments, white at the tip
    const tail = new THREE.Group(); tail.position.set(0, 0.05, -0.28); body.add(tail);
    let seg = tail; const segs = [];
    [0.07, 0.095, 0.1, 0.085, 0.06].forEach((r, i) => {
      const s = new THREE.Group(); s.position.set(0, 0, i ? -0.11 : 0); seg.add(s);
      part(s, G.sphere(r, 14, 10), i === 4 ? '#fbf3e6' : '#e07a36', { scale: [1, 1, 1.4] });
      segs.push(s); seg = s;
    });
    a.head = head; a.eyes = eyes; a.body = body; a.legs = legs;
    a.headPoint = () => head.localToWorld(new THREE.Vector3(0, 0, 0.05));
    a.height = 0.7;
    a.wag = 0.3;
    a.update = (dt, t) => {
      a.phase += dt * 8 * a.walk;
      const sw = Math.sin(a.phase) * 0.6 * Math.min(1, a.walk);
      a.sit += (a.sitGoal - a.sit) * (1 - Math.exp(-dt / 0.4));
      legs[0].rotation.x = sw; legs[1].rotation.x = -sw;
      legs[2].rotation.x = -sw - a.sit * 1.3; legs[3].rotation.x = sw - a.sit * 1.3;
      body.rotation.x = -a.sit * 0.5;
      body.position.y = 0.34 - a.sit * 0.1 + Math.abs(Math.cos(a.phase)) * 0.015 * a.walk;
      neck.rotation.x = a.sit * 0.45 + a.ease('nod', a.poseGoal.nod || 0, dt);
      a.look.lerp(a.lookGoal, 1 - Math.exp(-dt / 0.3));
      head.rotation.y = a.look.x;
      head.rotation.z = Math.sin(t * 0.7) * 0.06 + a.ease('tilt', a.poseGoal.tilt || 0, dt);
      head.rotation.x = a.look.y + (a.talk > 0.2 ? Math.sin(t * 9) * 0.06 * a.talk : 0);
      ears.forEach((e, i) => { e.rotation.x = Math.max(0, Math.sin(t * 1.3 + i * 2) - 0.92) * 3 - a.ease('earsDown', a.poseGoal.earsDown || 0, dt) * 0.6; });
      const wag = a.ease('wag', a.wag, dt, 0.5);
      segs.forEach((s, i) => { s.rotation.y = Math.sin(t * (3 + wag * 6) - i * 0.6) * (0.08 + wag * 0.3); s.rotation.x = i === 0 ? 0.5 - a.sit * 0.4 : -0.08; });
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
      part(leg, G.capsule(0.07, 0.08), '#6b4428', { at: [0, -0.45, 0.03], rot: [Math.PI / 2 * 0.3, 0, 0] });
      return leg;
    });
    const torso = new THREE.Group(); hips.add(torso);
    part(torso, G.lathe([[0.001, -0.05], [0.2, -0.05], [0.21, 0.1], [0.19, 0.3], [0.13, 0.42], [0.001, 0.43]]), '#2b3868');
    part(torso, G.torus(0.19, 0.025), '#6b4428', { at: [0, 0.04, 0], rot: [Math.PI / 2, 0, 0], line: 0.006 });
    part(torso, G.torus(0.09, 0.045), '#d9542c', { at: [0, 0.41, 0], rot: [Math.PI / 2, 0, 0] });
    const scarf = part(torso, G.box(0.08, 0.5, 0.02), '#d9542c', { at: [0.07, 0.2, 0.19], rot: [0.1, 0, 0.12], line: 0.006 });
    const arms = [-1, 1].map(sd => {
      const arm = new THREE.Group(); arm.position.set(0.19 * sd, 0.38, 0); torso.add(arm);
      part(arm, G.capsule(0.05, 0.26), '#2b3868', { at: [0, -0.16, 0] });
      part(arm, G.sphere(0.048), '#efc9a8', { at: [0, -0.33, 0], line: 0.008 });
      return arm;
    });
    // the pole in the right hand
    const pole = new THREE.Group(); pole.position.set(0, -0.33, 0); arms[1].add(pole);
    part(pole, G.cyl(0.012, 0.012, 1.3, 8), '#5a4632', { at: [0, 0.35, 0.02], line: 0.004 });
    const wick = part(pole, G.sphere(0.02, 8, 6), '#ffb347', { at: [0, 1.0, 0.02], line: 0, mat: flat('#ffb347') });
    // handkerchief in the left hand (red check), shown while he wipes his forehead
    const hanky = part(arms[0], G.box(0.12, 0.1, 0.01), '#c8372c', { at: [0, -0.38, 0.03], line: 0.004 });
    hanky.visible = false;
    const neck = new THREE.Group(); neck.position.y = 0.43; torso.add(neck);
    const head = new THREE.Group(); neck.add(head);
    part(head, G.sphere(0.15, 24, 18), '#efc9a8', { at: [0, 0.13, 0] });
    part(head, G.sphere(0.035, 10, 8), '#e8b596', { at: [0, 0.1, 0.15], line: 0.006 });
    const eyes = [-1, 1].map(sd => eye(head, 0.055 * sd, 0.15, 0.135, 0.026, '#5a7a9a'));
    [-1, 1].forEach(sd => part(head, G.capsule(0.012, 0.05), '#f4f1ea', { at: [0.058 * sd, 0.195, 0.13], rot: [0, 0, Math.PI / 2 + 0.2 * sd], line: 0.004 }));
    // white beard and moustache, white hair at the sides
    part(head, G.sphere(0.12, 18, 14), '#f4f1ea', { at: [0, 0.0, 0.08], scale: [1.05, 1.25, 0.75] });
    part(head, G.cone(0.07, 0.12, 12), '#f4f1ea', { at: [0, -0.15, 0.1], rot: [Math.PI + 0.3, 0, 0], line: 0.008 });
    part(head, G.sphere(0.06, 12, 8), '#f4f1ea', { at: [-0.045, 0.075, 0.13], scale: [1.2, 0.5, 0.7], line: 0.006 });
    part(head, G.sphere(0.06, 12, 8), '#f4f1ea', { at: [0.045, 0.075, 0.13], scale: [1.2, 0.5, 0.7], line: 0.006 });
    [-1, 1].forEach(sd => part(head, G.sphere(0.07, 12, 8), '#f4f1ea', { at: [0.13 * sd, 0.14, -0.03], scale: [0.6, 0.9, 1] }));
    // red stocking cap bending back, white pompom
    const cap = new THREE.Group(); cap.position.set(0, 0.22, -0.01); head.add(cap);
    part(cap, G.cyl(0.155, 0.158, 0.07, 20), '#f4f1ea', { at: [0, 0, 0] });
    part(cap, G.cone(0.15, 0.36, 20), '#c8372c', { at: [0, 0.16, -0.05], rot: [-0.55, 0, 0] });
    part(cap, G.sphere(0.055, 12, 8), '#f4f1ea', { at: [0, 0.3, -0.24] });
    a.head = head; a.eyes = eyes; a.arms = arms; a.legs = legs; a.wick = wick; a.hanky = hanky;
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

  // ------------------------------------------------------------------ the rose
  // grows from a shoot to a bud to the open flower (stage 0 → 2); four thorns; sways and "breathes" when she speaks
  function rose() {
    const root = new THREE.Group();
    const a = actorBase(root);
    a.stage = 2; a.stageNow = 2;
    const stem = part(root, G.cyl(0.012, 0.016, 1, 8), '#4d8a3c', { at: [0, 0.5, 0], line: 0.005 });
    const leaves = [[-1, 0.3], [1, 0.45]].map(([sd, y]) => {
      const l = part(root, G.sphere(0.07, 12, 8), '#5a9a44', { at: [0.06 * sd, y, 0], scale: [1, 0.25, 0.5], rot: [0, 0, 0.5 * sd], line: 0.005 });
      return l;
    });
    const thorns = [[0.35, 1], [0.5, -1], [0.62, 1], [0.72, -1]].map(([y, sd]) => part(root, G.cone(0.012, 0.04, 5), '#3d6a2e', { at: [0.016 * sd, y, 0], rot: [0, 0, -1.2 * sd], line: 0.003 }));
    const bloom = new THREE.Group(); root.add(bloom);
    const petals = [];
    part(bloom, G.sphere(0.07, 16, 12), '#b8242b', { scale: [1, 1.1, 1] });
    for (let ring = 0; ring < 2; ring++) {
      for (let i = 0; i < 5; i++) {
        const p = new THREE.Group(); p.rotation.y = (i / 5) * Math.PI * 2 + ring * 0.6; bloom.add(p);
        const leaf = part(p, G.sphere(0.07, 14, 10), ring ? '#d23a36' : '#c42e30', { at: [0, 0.01, 0.045 + ring * 0.02], scale: [0.9, 1.15, 0.35], line: 0.006 });
        petals.push({ g: p, leaf, ring });
      }
    }
    const sepals = part(bloom, G.cone(0.06, 0.06, 5), '#4d8a3c', { at: [0, -0.07, 0], rot: [Math.PI, 0, 0], line: 0.004 });
    a.bloom = bloom; a.eyes = [];
    a.headPoint = () => bloom.localToWorld(new THREE.Vector3(0, 0, 0));
    a.height = 0.9;
    a.cough = 0;
    a.update = (dt, t, wind) => {
      a.stageNow += (a.stage - a.stageNow) * (1 - Math.exp(-dt / 1.2));
      const s = a.stageNow;
      const h = 0.25 + Math.min(1, s) * 0.55;
      stem.scale.set(1, h, 1); stem.position.y = h / 2;
      leaves.forEach((l, i) => { l.visible = s > 0.2 + i * 0.3; l.position.y = h * (0.35 + i * 0.2); });
      thorns.forEach((th, i) => { th.visible = s > 0.8; th.position.y = h * (0.4 + i * 0.13); th.scale.setScalar(1 + (a.poseGoal.thorns ? 0.6 + Math.sin(t * 8) * 0.2 : 0)); });
      bloom.position.y = h + 0.03;
      const open = Math.max(0, s - 1);           // 0 = bud, 1 = open
      bloom.scale.setScalar(0.35 + Math.min(1, s) * 0.45 + open * 0.3);
      petals.forEach(p => { p.g.rotation.x = 0; p.leaf.rotation.x = -(0.15 + open * (p.ring ? 0.9 : 0.55)); p.leaf.position.z = 0.03 + open * 0.02 + p.ring * 0.02; });
      sepals.visible = s > 0.3;
      a.talk += ((a.talking ? 1 : 0) - a.talk) * Math.min(1, dt * 6);
      a.cough = Math.max(0, a.cough - dt);
      const sway = Math.sin(t * 1.3) * 0.04 + (wind ? wind.x * 0.02 : 0) + a.talk * Math.sin(t * 5) * 0.06 + (a.cough > 0 ? Math.sin(a.cough * 40) * 0.12 : 0);
      root.rotation.z = sway;
      bloom.rotation.x = a.talk * Math.sin(t * 3.4) * 0.12 - (a.poseGoal.proud ? 0.15 : 0);
      bloom.scale.multiplyScalar(1 + a.talk * Math.sin(t * 9) * 0.03);
    };
    return a;
  }

  // ------------------------------------------------------------------ a bird of the migrating flock
  function bird(color = '#f2ede2') {
    const root = new THREE.Group();
    part(root, G.sphere(0.06, 10, 8), color, { scale: [0.8, 0.7, 1.6], line: 0.006 });
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

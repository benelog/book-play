/* The Little Prince film — the chapters played in 3D, with moving characters (see film3d.js).
   A scene builds its place and its actors once. Its cues are phrases of the book text: when the film reaches a line
   containing the phrase, the cue runs (the rose opens, the lamp is lit, the fox comes a little closer …).
   Cues only change goals; actors walk and turn toward their goals by themselves, so jumping into the middle of a
   chapter replays the earlier cues at once and snaps everything into place.
   Placement: on a small planet by latitude/longitude (radians) on its surface; on flat ground by x/z. */
window.LP_FILM_3D_SCENES = function (THREE, K) {
  const V = (x = 0, y = 0, z = 0) => new THREE.Vector3(x, y, z);
  const { part, G, toon, flat } = K;

  // ------------------------------------------------------------------ shared pieces
  function skyDome(top, bottom) {
    const mat = new THREE.ShaderMaterial({
      side: THREE.BackSide, depthWrite: false,
      uniforms: { top: { value: new THREE.Color(top) }, bottom: { value: new THREE.Color(bottom) } },
      vertexShader: 'varying vec3 vp; void main(){ vp = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
      fragmentShader: 'uniform vec3 top; uniform vec3 bottom; varying vec3 vp; void main(){ float h = smoothstep(-0.12, 0.5, vp.y); gl_FragColor = vec4(mix(bottom, top, h), 1.0); }'
    });
    const m = new THREE.Mesh(new THREE.SphereGeometry(80, 32, 16), mat);
    m.renderOrder = -10;
    return m;
  }
  function stars(n, r) {
    const pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const u = K.rnd() * 2 - 1, th = K.rnd() * Math.PI * 2, s = Math.sqrt(1 - u * u);
      pos.set([Math.cos(th) * s * r, u * r, Math.sin(th) * s * r], i * 3);
    }
    const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return new THREE.Points(geo, new THREE.PointsMaterial({ color: '#fff4d6', size: 0.35, sizeAttenuation: true, transparent: true, opacity: 0.9, depthWrite: false }));
  }
  function glow(color, size) {
    const c = document.createElement('canvas'); c.width = c.height = 64;
    const g = c.getContext('2d'), gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.35, 'rgba(255,255,255,.55)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(c), color, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    s.scale.setScalar(size);
    return s;
  }
  function lights(scene) {
    const hemi = new THREE.HemisphereLight('#fff4e0', '#6a6488', 1.5);
    const sun = new THREE.DirectionalLight('#fff0d6', 2.0);
    sun.position.set(4, 6, 5);
    scene.add(hemi, sun);
    return { hemi, sun };
  }
  const lerpColor = (c, a, b, f) => c.copy(new THREE.Color(a)).lerp(new THREE.Color(b), f);

  // Walking actors: goals and facing, on a planet surface or on flat ground
  function walker(actor, ground) {
    const w = { actor, ground, dir: V(0, 1, 0), goalDir: V(0, 1, 0), pos: V(), goal: V(), face: null, fwd: V(0, 0, 1), speed: 0.9, fixed: null };
    w.place = (a, b) => ground.sphere ? w.dir.copy(ground.dirOf(a, b)) : w.pos.set(a, 0, b);
    w.go = (a, b) => ground.sphere ? w.goalDir.copy(ground.dirOf(a, b)) : w.goal.set(a, 0, b);
    w.snap = () => { if (ground.sphere) w.dir.copy(w.goalDir); else w.pos.copy(w.goal); };
    w.at = (a, b) => { w.place(a, b); w.go(a, b); };
    w.update = (dt) => {
      const root = actor.root;
      if (w.fixed) { w.fixed(root, dt); return; }
      let moving = false;
      const up = V(0, 1, 0);
      let p;
      if (ground.sphere) {
        const ang = w.dir.angleTo(w.goalDir);
        if (ang > 1e-3) {
          const stepA = Math.min(ang, (w.speed * dt) / ground.R);
          const axis = V().crossVectors(w.dir, w.goalDir).normalize();
          const prev = w.dir.clone();
          w.dir.applyAxisAngle(axis, stepA).normalize();
          w.fwd.copy(w.dir.clone().sub(prev)).normalize();
          moving = ang > 0.01;
        }
        up.copy(w.dir);
        p = ground.center.clone().addScaledVector(w.dir, ground.R);
      } else {
        const d = w.goal.clone().sub(w.pos); d.y = 0;
        const len = d.length();
        if (len > 1e-3) { const s = Math.min(len, w.speed * dt); w.pos.addScaledVector(d.normalize(), s); w.fwd.copy(d); moving = len > 0.02; }
        p = w.pos.clone();
      }
      if (!moving && w.face) {
        const target = typeof w.face === 'function' ? w.face() : w.face;
        const f = target.clone().sub(p); f.addScaledVector(up, -f.dot(up));
        if (f.lengthSq() > 1e-6) w.fwd.lerp(f.normalize(), 1 - Math.exp(-dt / 0.25));
      }
      const fwd = w.fwd.clone().addScaledVector(up, -w.fwd.dot(up));
      if (fwd.lengthSq() < 1e-6) fwd.set(0, 0, 1).addScaledVector(up, -up.z);
      fwd.normalize();
      const right = V().crossVectors(up, fwd).normalize();
      root.position.copy(p);
      root.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(right, up, V().crossVectors(right, up)));
      actor.walk += ((moving ? 1 : 0) - actor.walk) * Math.min(1, dt * 6);
    };
    return w;
  }
  function sphereGround(R, center = V()) {
    return { sphere: true, R, center, dirOf: (lat, lon) => V(Math.sin(lon) * Math.cos(lat), Math.cos(lon) * Math.cos(lat), Math.sin(lat)).normalize() };
  }
  // a thing standing on a planet at lat/lon, turned by `turn` round its own up axis
  function plant(obj, ground, lat, lon, turn = 0, lift = 0) {
    const up = ground.dirOf(lat, lon);
    obj.position.copy(ground.center).addScaledVector(up, ground.R + lift);
    obj.quaternion.setFromUnitVectors(V(0, 1, 0), up);
    obj.rotateY(turn);
    return obj;
  }

  // Camera shots. The film asks a scene where to look for each line:
  //   who speaks → a three-quarter close-up of that character, alternating sides between the two who talk
  //   narration  → one of the scene's wide shots, changing with each paragraph
  function closeUp(actor, side, dist, flatGround) {
    const head = actor.headPoint();
    const q = actor.root.getWorldQuaternion(new THREE.Quaternion());
    const up = V(0, 1, 0).applyQuaternion(q), fwd = V(0, 0, 1).applyQuaternion(q), right = V(1, 0, 0).applyQuaternion(q);
    const d = dist || actor.height * 1.5 + 0.45;
    const pos = head.clone().addScaledVector(fwd, d * 0.85).addScaledVector(right, d * 0.5 * side).addScaledVector(up, d * 0.1);
    if (flatGround && pos.y < 0.35) pos.y = 0.35;
    return { pos, look: head.clone().addScaledVector(up, -actor.height * 0.12) };
  }

  // ================================================================== B-612: the prince and his rose (chapters 8, 9)
  function asteroid() {
    const scene = new THREE.Scene();
    const sky = skyDome('#0d1440', '#3a3470'); scene.add(sky);
    const starField = stars(700, 60); scene.add(starField);
    const L = lights(scene);
    const sunDisc = glow('#ffd08a', 9); sunDisc.position.set(30, 6, -30); scene.add(sunDisc);
    const R = 2.2;
    const ground = sphereGround(R);
    const planet = new THREE.Group(); scene.add(planet);
    part(planet, G.sphere(R, 48, 32), '#c9a077', { line: 0.03 });
    // craters, grass, stones
    for (let i = 0; i < 9; i++) {
      const c = part(planet, G.torus(0.16 + K.rnd() * 0.12, 0.035), '#a8845f', { line: 0 });
      plant(c, ground, (K.rnd() - 0.5) * 2.4, K.rnd() * Math.PI * 2, 0, -0.01); c.rotateX(Math.PI / 2);
    }
    for (let i = 0; i < 40; i++) {
      const g = part(planet, G.cone(0.03, 0.12, 4), '#6f9a4a', { line: 0.004 });
      plant(g, ground, (K.rnd() - 0.5) * 2.8, K.rnd() * Math.PI * 2, 0, 0.04);
    }
    // the simple one-ring flowers that come and go
    const daisies = [];
    for (let i = 0; i < 7; i++) {
      const d = new THREE.Group(); planet.add(d);
      part(d, G.cyl(0.006, 0.006, 0.12, 5), '#5f8f40', { at: [0, 0.06, 0], line: 0 });
      part(d, G.cyl(0.05, 0.05, 0.012, 10), '#fbf6ea', { at: [0, 0.12, 0], line: 0.004 });
      part(d, G.sphere(0.018, 8, 6), '#f2c440', { at: [0, 0.13, 0], line: 0 });
      plant(d, ground, 0.35 + (K.rnd() - 0.5) * 0.9, -0.9 + K.rnd() * 1.8);
      daisies.push(d);
    }
    // three volcanoes knee-high: two active (smoking), one extinct
    const volcanoes = [[-0.3, 0.72, true], [-0.05, 1.02, true], [0.22, -0.82, false]].map(([lat, lon, active]) => {
      const v = new THREE.Group(); planet.add(v);
      part(v, G.cyl(0.08, 0.32, 0.36, 16), '#8b6a52', { at: [0, 0.16, 0] });
      part(v, G.cyl(0.07, 0.07, 0.02, 12), active ? '#e0662c' : '#4a3a30', { at: [0, 0.345, 0], line: 0 });
      plant(v, ground, lat, lon);
      const puffs = [];
      if (active) for (let i = 0; i < 7; i++) {
        const p = new THREE.Mesh(G.sphere(0.07, 10, 8), flat('#f2ece4', { transparent: true, opacity: 0.6, depthWrite: false }));
        v.add(p); puffs.push({ m: p, t: i / 7 });
      }
      return { g: v, lat, lon, active, puffs, calm: 0 };
    });
    // baobab shoots to pull up
    const shoots = [[0.5, 0.36], [0.42, 0.58], [0.62, 0.18]].map(([lat, lon]) => {
      const s = new THREE.Group(); planet.add(s);
      part(s, G.cyl(0.012, 0.02, 0.14, 6), '#7a9a4a', { at: [0, 0.07, 0], line: 0.004 });
      part(s, G.sphere(0.05, 10, 8), '#6f9a4a', { at: [0, 0.15, 0], scale: [1, 0.6, 1], line: 0.004 });
      plant(s, ground, lat, lon);
      return { g: s, gone: false, k: 1 };
    });
    // the rose on the top of the planet (in a holder: her own sway turns rose.root)
    const rose = K.rose();
    const roseSpot = [0, 0];
    const roseHolder = new THREE.Group(); planet.add(roseHolder);
    plant(roseHolder, ground, roseSpot[0], roseSpot[1]);
    roseHolder.add(rose.root); rose.root.scale.setScalar(0.62); rose.height = 0.56;
    // glass globe: on the rose, held up by the prince, or set down beside her
    const globe = new THREE.Group(); planet.add(globe);
    const glass = new THREE.Mesh(G.lathe([[0.001, 0.62], [0.12, 0.6], [0.2, 0.5], [0.23, 0.3], [0.23, 0.0], [0.22, 0.0]], 28),
      new THREE.MeshBasicMaterial({ color: '#dff2ff', transparent: true, opacity: 0.2, depthWrite: false, side: THREE.DoubleSide }));
    globe.add(glass);
    part(globe, G.torus(0.23, 0.012), '#f4f8ff', { rot: [Math.PI / 2, 0, 0], line: 0.004 });
    part(globe, G.sphere(0.035, 10, 8), '#f4f8ff', { at: [0, 0.64, 0], line: 0.005 });
    const globeSpots = { on: { lat: roseSpot[0], lon: roseSpot[1], lift: 0 }, off: { lat: 0.3, lon: 0.42, lift: 0 } };
    // folding screen
    const screen = new THREE.Group(); planet.add(screen);
    [-1, 0, 1].forEach(i => { const p = part(screen, G.box(0.26, 0.5, 0.02), '#e2d2ad', { at: [i * 0.25, 0.25, Math.abs(i) * 0.06], rot: [0, -i * 0.5, 0], line: 0.006 }); });
    plant(screen, ground, 0.02, 0.24, -1.2);
    // props the prince carries
    const can = new THREE.Group();
    part(can, G.cyl(0.07, 0.08, 0.14, 12), '#8aa0a8', { line: 0.006 });
    part(can, G.cyl(0.012, 0.02, 0.18, 6), '#8aa0a8', { at: [0, 0.03, 0.12], rot: [-1.0, 0, 0], line: 0.004 });
    part(can, G.torus(0.05, 0.01, Math.PI), '#6a808a', { at: [0, 0.07, -0.02], rot: [0, Math.PI / 2, 0], line: 0 });
    const drops = [];
    for (let i = 0; i < 12; i++) { const d = new THREE.Mesh(G.sphere(0.012, 6, 4), flat('#a8d8ff')); scene.add(d); d.visible = false; drops.push({ m: d, t: i / 12 }); }
    const broom = new THREE.Group();
    part(broom, G.cyl(0.01, 0.01, 0.55, 6), '#8a6a42', { at: [0, 0.1, 0], line: 0.004 });
    part(broom, G.cone(0.07, 0.14, 8), '#d8b86a', { at: [0, -0.2, 0], rot: [Math.PI, 0, 0], line: 0.005 });
    const prince = K.prince();
    planet.add(prince.root);
    const pw = walker(prince, ground);
    const rw = { actor: rose };
    // the flock and the strings
    const flock = [];
    for (let i = 0; i < 14; i++) { const b = K.bird(i % 3 ? '#f4efe4' : '#d8d0c0'); scene.add(b.root); flock.push({ b, ph: K.rnd() * 6, off: V((K.rnd() - 0.5) * 1.2, 0.9 + K.rnd() * 0.6, (K.rnd() - 0.5) * 0.8) }); }
    const strings = new THREE.LineSegments(new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(new Float32Array(14 * 6), 3)),
      new THREE.LineBasicMaterial({ color: '#f4efe4', transparent: true, opacity: 0.8 }));
    strings.frustumCulled = false; scene.add(strings);

    const S = {};   // state set by cues
    const sc = {
      scene, chapters: [8, 9], ground, actors: { prince, rose },
      wind: V(1, 0, 0.3),
      reset(ch) {
        Object.assign(S, { ch, evening: 0, dawn: ch === 9 ? 1 : 0, globe: ch === 9 ? 'on' : 'off', screen: ch === 9, carry: null, act: null, actT: 0,
          flyby: -1, depart: -1, calm: ch === 9 ? 0 : 0 });
        rose.stage = ch === 9 ? 2 : -1; rose.stageNow = rose.stage;
        rose.poseGoal = {}; prince.poseGoal = {}; prince.sitGoal = 0; prince.sit = 0; prince.eyesClosed = false;
        shoots.forEach(s => { s.gone = ch === 9 ? false : false; s.k = 1; s.g.visible = true; });
        volcanoes.forEach(v => { v.calm = 0; });
        pw.fixed = null;
        pw.face = () => rose.headPoint();
        if (ch === 8) pw.at(-0.14, -0.16); else pw.at(-0.2, 0.3);
        pw.snap();
      },
      cues: [
        // chapter VIII
        [8, /very simple flowers/, () => { S.daisies = true; }],
        [8, /had sprouted one day/, () => { rose.stage = 0.2; }],
        [8, /enormous bud/, () => { rose.stage = 1; }],
        [8, /she had shown herself/, () => { rose.stage = 2; S.dawn = 1; }],
        [8, /watering can full of cool water/, () => { walkTo(-0.11, -0.08); act('water', 5); }],
        [8, /talking about her four thorns/, () => { rose.poseGoal.thorns = true; }],
        [8, /There are no tigers/, () => { rose.poseGoal.thorns = false; rose.poseGoal.proud = true; }],
        [8, /That screen\?/, () => { S.screen = true; walkTo(-0.12, 0.16); }],
        [8, /under a glass globe/, () => { S.evening = 1; S.globe = 'on'; }],
        [8, /coughed two or three times|cough harder/, (instant) => { if (!instant) rose.cough = 1.4; }],
        [8, /become very unhappy/, () => { rose.poseGoal.proud = false; walkTo(-0.2, -0.26); prince.sitGoal = 1; prince.poseGoal.nod = 0.25; pw.face = () => rose.headPoint(); }],
        [8, /Back then I didn't understand/, () => { prince.poseGoal.nod = 0.05; }],
        // chapter IX
        [9, /flock of wild birds/, (instant) => { if (!instant) S.flyby = 0; }],
        [9, /swept out his active volcanoes/, () => { sweep(0); }],
        [9, /swept out the extinct volcano/, () => { sweep(2); }],
        [9, /pulled up the last baobab shoots/, () => { walkTo(0.48, 0.2); act('pull', 6); pw.face = () => shoots[1].g.getWorldPosition(V()); }],
        [9, /watered the flower for the last time/, () => { walkTo(-0.11, -0.08); act('water', 4); pw.face = () => rose.headPoint(); }],
        [9, /safely under her glass globe/, () => { S.globe = 'held'; S.act = 'hold'; prince.poseGoal = { armL: -2.8, armR: -2.8 }; }],
        [9, /completely thrown/, () => { S.globe = 'held'; }],
        [9, /Leave that globe alone/, () => { S.globe = 'off'; S.act = null; prince.poseGoal = {}; }],
        [9, /four thorns/, () => { rose.poseGoal.thorns = true; }],
        [9, /Don't hang around/, () => { rose.poseGoal.thorns = false; rose.poseGoal.proud = true; }],
        [9, /such a proud flower/, (instant) => { S.depart = instant ? 99 : 0; }]
      ],
      wide(k) {
        if (S.depart >= 0) { const f = prince.headPoint(); return { pos: f.clone().add(V(2.4, -0.4, 4.4)), look: f }; }
        const p = prince.root.getWorldPosition(V()), r = rose.root.getWorldPosition(V());
        const look = p.clone().lerp(r, 0.5).add(V(0, 0.35, 0));
        const shots = [
          { pos: look.clone().add(V(0.9, 0.5, 2.9)), look },
          { pos: look.clone().add(V(-2.1, 0.35, 2.1)), look },
          { pos: V(0.4, R + 1.3, 6.4), look: V(0, R * 0.72, 0) }
        ];
        return shots[k % shots.length];
      },
      closeSide: { prince: 1, rose: 1 },
      forceWide: () => S.depart >= 0,
      update(dt, t) {
        // sky: night → dawn → evening
        const dawn = S.dawn, eve = S.evening;
        lerpColor(sky.material.uniforms.top.value, '#0d1440', eve ? '#262c66' : '#7089c6', dawn * (1 - eve * 0.6));
        lerpColor(sky.material.uniforms.bottom.value, '#3a3470', eve ? '#a8687e' : '#f3c89c', dawn * 0.85);
        starField.material.opacity = 0.9 - dawn * 0.6 + eve * 0.4;
        sunDisc.material.opacity = dawn * (1 - eve * 0.6);
        L.sun.intensity = 1.2 + dawn * 1.2 - eve * 0.5;
        daisies.forEach((d, i) => { d.scale.setScalar(S.ch === 8 && S.daisies ? 0.6 + 0.4 * Math.sin(t * 0.3 + i) ** 2 : 0.001); });
        // smoke
        volcanoes.forEach(v => v.puffs.forEach(p => {
          p.t = (p.t + dt * (v.calm ? 0.12 : 0.22)) % 1;
          p.m.position.set(Math.sin(p.t * 9 + v.lat) * 0.05, 0.38 + p.t * (v.calm ? 0.5 : 0.9), 0);
          p.m.scale.setScalar(0.4 + p.t * (v.calm ? 0.8 : 1.6));
          p.m.material.opacity = (1 - p.t) * 0.55;
        }));
        shoots.forEach(s => { s.k += ((s.gone ? 0 : 1) - s.k) * Math.min(1, dt * 3); s.g.scale.setScalar(Math.max(0.001, s.k)); });
        // actions
        S.actT = Math.max(0, S.actT - dt);
        const acting = S.act && S.actT > 0 && prince.walk < 0.3;
        if (S.act && S.actT <= 0 && S.act !== 'hold') { if (S.act === 'water') prince.poseGoal = {}; if (S.act === 'sweep') { prince.poseGoal = {}; } if (S.act === 'pull') { prince.sitGoal = 0; prince.poseGoal = {}; } S.act = null; S.carry = null; }
        if (S.act === 'water' && acting) { prince.poseGoal = { armR: -1.3, lean: 0.25 }; }
        if (S.act === 'hold') prince.poseGoal = { armL: -2.6, armR: -2.6, armLOut: -0.2, armROut: -0.2 };
        if (S.act === 'sweep' && acting) { prince.poseGoal = { armR: -0.9 + Math.sin(t * 7) * 0.4, armL: -0.7 + Math.sin(t * 7) * 0.4, lean: 0.3 }; if (S.sweepV != null) volcanoes[S.sweepV].calm = 1; }
        if (S.act === 'pull' && acting) { prince.sitGoal = 0.6; prince.poseGoal = { armR: -1.1 + Math.sin(t * 5) * 0.3, armL: -1.1, lean: 0.4 }; const left = shoots.filter(s => !s.gone); if (left.length && S.actT < 5 - (3 - left.length) * 1.6) left[0].gone = true; }
        // carried props
        attach(can, S.act === 'water' ? prince.arms[1] : null, V(0, -0.24, 0.06), [-(prince.pose.armR || 0) - 0.6, 0, 0]);
        attach(broom, S.act === 'sweep' ? prince.arms[1] : null, V(0, -0.22, 0.03), [-(prince.pose.armR || 0) + 0.3, 0, 0]);
        drops.forEach(d => {
          d.m.visible = S.act === 'water' && acting;
          if (!d.m.visible) return;
          d.t = (d.t + dt * 1.6) % 1;
          const spout = can.localToWorld(V(0, 0.06, 0.2));
          d.m.position.copy(spout).addScaledVector(spout.clone().normalize(), -d.t * 0.35).add(V(0, 0, d.t * 0.08));
        });
        // globe
        const g = S.globe;
        let target;
        if (g === 'held') { prince.root.updateMatrixWorld(); target = prince.root.localToWorld(V(0, 0.98, 0.2)); }
        else { const sp = globeSpots[g] || globeSpots.off; target = ground.center.clone().addScaledVector(ground.dirOf(sp.lat, sp.lon), R); }
        globe.scale.setScalar(g === 'on' ? 0.75 : 0.7);
        globe.position.lerp(target, 1 - Math.exp(-dt / 0.4));
        globe.quaternion.slerp(new THREE.Quaternion().setFromUnitVectors(V(0, 1, 0), globe.position.clone().normalize()), 1 - Math.exp(-dt / 0.4));
        screen.visible = S.screen;
        // birds: a fly-by at the start of chapter IX, and the departure at its end
        if (S.flyby >= 0) S.flyby += dt;
        if (S.depart >= 0) S.depart += dt;
        const hand = prince.arms[1].localToWorld(V(0, -0.22, 0));
        const sp = strings.geometry.attributes.position;
        flock.forEach((f, i) => {
          let p = null;
          if (S.depart >= 0) {
            const gather = Math.min(1, S.depart / 2.5);
            const lift = Math.max(0, S.depart - 2.5);
            p = prince.root.localToWorld(f.off.clone().multiplyScalar(1 + gather * 0.3));
            if (gather < 1) p.lerp(V(-14 + i * 0.4, 6, -6), 1 - gather);
            sp.setXYZ(i * 2, hand.x, hand.y, hand.z); sp.setXYZ(i * 2 + 1, p.x, p.y, p.z);
            strings.visible = gather > 0.95;
            if (lift > 0 && !pw.fixed) {
              const start = prince.root.position.clone(), up = start.clone().normalize();
              pw.fixed = (root, dt2) => { S.rise = (S.rise || 0) + dt2; root.position.copy(start).addScaledVector(up, S.rise * 0.9).add(V(S.rise * 0.5, 0, 0)); prince.sitGoal = 0; prince.poseGoal = { armR: -2.9 }; };
            }
          } else if (S.flyby >= 0 && S.flyby < 12) {
            const x = -14 + S.flyby * 3 + (i % 5) * 0.6, y = 3.6 + Math.floor(i / 5) * 0.5 - (i % 5) * 0.15;
            p = V(x, y, -2 - (i % 3) * 0.6);
            strings.visible = false;
          } else { f.b.root.visible = false; strings.visible = false; return; }
          f.b.root.visible = true;
          f.b.root.position.copy(p);
          f.b.root.lookAt(p.clone().add(V(1, 0.2, 0)));
          f.b.flap(t * 12 + f.ph);
        });
        sp.needsUpdate = true;
        if (S.depart > 99) { strings.visible = true; }
        pw.update(dt);
        rose.update(dt, t, V(0.4, 0, 0));
        prince.update(dt, t, V(0.9, 0.1, 0.4));
      }
    };
    function walkTo(lat, lon) { pw.go(lat, lon); }
    function act(name, secs) { S.act = name; S.actT = secs; }
    function sweep(i) {
      const v = volcanoes[i];
      walkTo(v.lat + 0.22, v.lon + 0.12);
      pw.face = () => v.g.getWorldPosition(V());
      S.sweepV = i; act('sweep', 6);
    }
    function attach(obj, parent, at, rot) {
      if (!parent) { if (obj.parent) obj.parent.remove(obj); return; }
      if (obj.parent !== parent) parent.add(obj);
      obj.position.copy(at); obj.rotation.set(...rot);
    }
    sc.snap = () => { pw.snap(); rose.stageNow = rose.stage; globe.position.copy(ground.center.clone().addScaledVector(ground.dirOf((globeSpots[S.globe] || globeSpots.off).lat, (globeSpots[S.globe] || globeSpots.off).lon), R)); };
    return sc;
  }

  // ================================================================== the lamplighter's planet (chapter XIV)
  function lampPlanet() {
    const scene = new THREE.Scene();
    const sky = skyDome('#0c1236', '#2c2c62'); scene.add(sky);
    const starField = stars(700, 60); scene.add(starField);
    const L = lights(scene);
    const sunDisc = glow('#ffe2a0', 7); sunDisc.position.set(-24, 10, -30); scene.add(sunDisc);
    const R = 1.15;
    const ground = sphereGround(R);
    const planet = new THREE.Group(); scene.add(planet);
    part(planet, G.sphere(R, 40, 28), '#b9b2c8', { line: 0.025 });
    for (let i = 0; i < 7; i++) { const c = part(planet, G.torus(0.1 + K.rnd() * 0.08, 0.025), '#9a93aa', { line: 0 }); plant(c, ground, (K.rnd() - 0.5) * 2.6, K.rnd() * 6.28, 0, -0.01); c.rotateX(Math.PI / 2); }
    // street lamp at the top
    const lamp = new THREE.Group(); planet.add(lamp);
    part(lamp, G.cyl(0.03, 0.045, 1.2, 10), '#2e2a30', { at: [0, 0.6, 0], line: 0.008 });
    part(lamp, G.cyl(0.08, 0.1, 0.06, 10), '#2e2a30', { at: [0, 0.03, 0], line: 0.006 });
    const cage = part(lamp, G.cyl(0.11, 0.08, 0.22, 6), '#2e2a30', { at: [0, 1.32, 0], line: 0.006 });
    part(lamp, G.cone(0.16, 0.12, 6), '#2e2a30', { at: [0, 1.49, 0], line: 0.006 });
    const flameMat = new THREE.MeshBasicMaterial({ color: '#ffd27a' });
    const flame = new THREE.Mesh(G.sphere(0.07, 12, 10), flameMat); flame.position.set(0, 1.32, 0); lamp.add(flame);
    const halo = glow('#ffc862', 1.6); halo.position.set(0, 1.32, 0); lamp.add(halo);
    const bulb = new THREE.PointLight('#ffc27a', 0, 4, 1.5); bulb.position.set(0, 1.32, 0.1); lamp.add(bulb);
    plant(lamp, ground, 0, 0);
    const keeper = K.lamplighter(); planet.add(keeper.root);
    const kw = walker(keeper, ground); kw.speed = 0.5;
    const prince = K.prince(); planet.add(prince.root);
    const pw = walker(prince, ground);
    const S = {};
    const lampTop = () => lamp.localToWorld(V(0, 1.32, 0));
    const sc = {
      scene, chapters: [14], ground, actors: { prince, lamplighter: keeper },
      wind: V(0.5, 0, 0.2),
      reset() {
        Object.assign(S, { lit: 1, night: 1, flicker: 0, flickT: 0, reach: 0, arrived: false, leaving: -1, fast: 0, circling: -1 });
        keeper.poseGoal = {}; prince.poseGoal = {};
        kw.at(0.05, -0.38); kw.snap(); kw.face = lampTop;
        // before he lands the prince floats in space near the planet
        pw.at(0.1, 0.5); pw.snap(); pw.face = () => keeper.headPoint();
        pw.fixed = (root) => { root.position.set(2.2, 2.6, 1.2); root.quaternion.setFromEuler(new THREE.Euler(0, -0.9, 0.2)); };
      },
      cues: [
        [14, /When he reached the planet/, (instant) => { pw.fixed = null; S.arrived = true; setLamp(0, instant); }],
        [14, /Good morning\. Why did you just put out/, () => { pw.fixed = null; }],
        [14, /And he lit it again|And he lit his lamp again/, (instant) => setLamp(1, instant)],
        [14, /And he put out his lamp/, (instant) => setLamp(0, instant)],
        [14, /wiped his forehead/, () => { keeper.poseGoal.wipe = true; }],
        [14, /I have a terrible job/, () => { }],
        [14, /The orders have not changed/, () => { keeper.poseGoal.wipe = false; }],
        [14, /once every minute/, (instant) => { if (!instant) S.flicker = 6; }],
        [14, /We have already been talking/, () => { S.flicker = 0; }],
        [14, /walk around it in three strides/, (instant) => { if (!instant) S.circling = 0; }],
        [14, /What I love most in life is sleeping/, () => { S.circling = -1; pw.go(0.1, 0.5); }],
        [14, /as he traveled on/, (instant) => { S.leaving = instant ? 30 : 0; }],
        [14, /one thousand four hundred and forty sunsets/, () => { S.fast = 1; }]
      ],
      wide(k) {
        const shots = [
          { pos: V(0.6, 2.2, 4.6), look: V(0, 1.2, 0) },
          { pos: V(-2.8, 1.8, 2.6), look: V(0, 1.3, 0) },
          { pos: V(2.6, 1.1, 3.0), look: V(0, 1.5, 0) }
        ];
        if (S.leaving >= 0) return { pos: V(0.5, 2.6, 6.5), look: V(0.8, 2.0, 0) };
        if (!S.arrived) return { pos: V(3.2, 2.4, 5.2), look: V(1.2, 1.8, 0.4) };
        return shots[k % shots.length];
      },
      closeSide: { prince: 1, lamplighter: -1 },
      forceWide: () => S.circling >= 0 || S.leaving >= 0,
      update(dt, t) {
        // lamp on and off; the sky follows (lit = evening/night)
        if (S.flicker > 0) { S.flicker -= dt; S.flickT += dt; if (S.flickT > 1.1) { S.flickT = 0; setLamp(S.lit ? 0 : 1); } }
        if (S.fast) { S.flickT += dt; if (S.flickT > 0.6) { S.flickT = 0; setLamp(S.lit ? 0 : 1); } }
        S.night += (S.lit - S.night) * (1 - Math.exp(-dt / 0.5));
        lerpColor(sky.material.uniforms.top.value, '#7fa8dc', '#0c1236', S.night);
        lerpColor(sky.material.uniforms.bottom.value, '#f3d6a6', '#2c2c62', S.night);
        starField.material.opacity = S.night * 0.95;
        sunDisc.material.opacity = 1 - S.night;
        L.sun.intensity = 2.2 - S.night * 1.5;
        L.hemi.intensity = 1.6 - S.night * 0.7;
        flame.visible = S.lit > 0.5; halo.visible = flame.visible;
        bulb.intensity += ((S.lit ? 3 : 0) - bulb.intensity) * Math.min(1, dt * 10);
        halo.scale.setScalar(1.5 + Math.sin(t * 9) * 0.06);
        // the keeper reaches the pole up to the lamp for a moment each time
        S.reach = Math.max(0, S.reach - dt);
        keeper.poseGoal.reach = S.reach > 0 ? -2.5 : -0.25;
        // walking round the planet in three strides
        if (S.circling >= 0) {
          S.circling += dt;
          const lon = 0.5 + (S.circling / 5) * Math.PI * 2;
          pw.go(0.35, lon); pw.speed = 1.6;
        } else pw.speed = 0.9;
        if (S.leaving >= 0) {
          S.leaving += dt;
          const start = V(0.4, 1.9, 0.6);
          pw.fixed = (root) => { root.position.copy(start).add(V(S.leaving * 0.35, S.leaving * 0.45, -S.leaving * 0.2)); root.quaternion.setFromEuler(new THREE.Euler(0.1, 0.6, -0.15)); };
        }
        // the sky turns slowly round the little planet
        starField.rotation.y = t * 0.03;
        kw.update(dt); pw.update(dt);
        keeper.update(dt, t); prince.update(dt, t, V(0.6, 0.2, 0.3));
      }
    };
    function setLamp(on, instant) { S.lit = on ? 1 : 0; if (!instant) S.reach = 1.1; if (instant) S.night = S.lit; }
    sc.snap = () => { kw.snap(); pw.snap(); S.night = S.lit; };
    return sc;
  }

  // ================================================================== the wheat field and the fox (chapter XXI)
  function wheatField() {
    const scene = new THREE.Scene();
    const sky = skyDome('#7d9fd6', '#f6c283'); scene.add(sky);
    const L = lights(scene);
    L.sun.position.set(-6, 3, -8); L.sun.color.set('#ffd9a0');
    const sunDisc = glow('#ffd28a', 10); sunDisc.position.set(-30, 5, -45); scene.add(sunDisc);
    scene.fog = new THREE.Fog('#f0c890', 14, 40);
    const ground = { sphere: false };
    part(scene, new THREE.CircleGeometry(40, 48), '#d8b25a', { rot: [-Math.PI / 2, 0, 0], line: 0 });
    part(scene, new THREE.PlaneGeometry(0.9, 30), '#e8cf94', { at: [0.2, 0.005, -4], rot: [-Math.PI / 2, 0, 0.12], line: 0 });
    // hills far away
    [[-12, -22, 9, '#b9a06a'], [6, -26, 12, '#a8966a'], [18, -20, 8, '#b5a070']].forEach(([x, z, r, c]) => part(scene, G.sphere(r, 24, 12), c, { at: [x, -r * 0.75, z], scale: [1.6, 1, 1], line: 0 }));
    // wheat: instanced stalks swaying in the wind (the sway is done in the vertex shader)
    const stalk = new THREE.ConeGeometry(0.025, 0.7, 4); stalk.translate(0, 0.35, 0);
    const ear = new THREE.SphereGeometry(0.035, 6, 4); ear.scale(1, 2.4, 1); ear.translate(0, 0.72, 0);
    const windU = { value: 0 }, gustU = { value: 0.2 };
    const swayMat = (color) => {
      const mat = new THREE.MeshToonMaterial({ color: new THREE.Color(color), gradientMap: toon('#fff').gradientMap });
      mat.onBeforeCompile = (sh) => {
        sh.uniforms.uTime = windU; sh.uniforms.uGust = gustU;
        sh.vertexShader = 'uniform float uTime; uniform float uGust;\n' + sh.vertexShader.replace('#include <begin_vertex>',
          '#include <begin_vertex>\n vec4 ip = instanceMatrix * vec4(0.0,0.0,0.0,1.0);\n float sway = sin(uTime*1.7 + ip.x*0.6 + ip.z*0.4) * (0.08 + uGust*0.25) + uGust*0.15;\n transformed.x += sway * position.y * position.y;');
      };
      return mat;
    };
    const N = 2600;
    const stalks = new THREE.InstancedMesh(stalk, swayMat('#dcb45c'), N);
    const ears = new THREE.InstancedMesh(ear, swayMat('#efcd72'), N);
    const m = new THREE.Matrix4(), q = new THREE.Quaternion();
    let n = 0;
    for (let i = 0; i < N * 3 && n < N; i++) {
      const x = (K.rnd() - 0.5) * 26, z = -K.rnd() * 20 + 5;
      if (Math.abs(x - 0.2 + z * 0.12) < 0.8) continue;                 // the path
      if (Math.hypot(x + 0.4, z - 0.2) < 2.4) continue;                 // the clearing where they sit
      if (Math.hypot(x + 3.2, z + 2.2) < 1.5) continue;                 // under the apple tree
      if (Math.hypot(x - 5, z + 3) < 1.2) continue;                     // the roses
      q.setFromEuler(new THREE.Euler((K.rnd() - 0.5) * 0.2, K.rnd() * 6, (K.rnd() - 0.5) * 0.2));
      m.compose(V(x, 0, z), q, V(1, 0.7 + K.rnd() * 0.6, 1));
      stalks.setMatrixAt(n, m); ears.setMatrixAt(n, m); n++;
    }
    stalks.count = ears.count = n;
    scene.add(stalks, ears);
    // the apple tree
    const tree = new THREE.Group(); tree.position.set(-3.2, 0, -2.2); scene.add(tree);
    part(tree, G.cyl(0.12, 0.2, 1.6, 10), '#7a5a3e', { at: [0, 0.8, 0], rot: [0, 0, 0.12] });
    part(tree, G.cyl(0.06, 0.1, 0.9, 8), '#7a5a3e', { at: [0.35, 1.5, 0], rot: [0, 0, -0.8] });
    [[0, 2.1, 0, 1], [0.8, 1.9, 0.2, 0.8], [-0.7, 1.8, -0.2, 0.75], [0.2, 2.5, -0.3, 0.7], [-0.2, 1.7, 0.6, 0.6]].forEach(([x, y, z, r]) => part(tree, G.sphere(r, 16, 12), '#7fa45a', { at: [x, y, z] }));
    for (let i = 0; i < 14; i++) { const th = K.rnd() * 6.28, y = 1.6 + K.rnd() * 1.0; part(tree, G.sphere(0.07, 10, 8), '#d2402e', { at: [Math.cos(th) * 0.95, y, Math.sin(th) * 0.9], line: 0.006 }); }
    // the rose bushes the prince goes back to see
    const roses = new THREE.Group(); roses.position.set(5, 0, -3); scene.add(roses);
    for (let i = 0; i < 7; i++) {
      const b = part(roses, G.sphere(0.45, 14, 10), '#4f7a3a', { at: [(i - 3) * 0.45, 0.35, (i % 2) * 0.3], scale: [1, 0.8, 1] });
      for (let j = 0; j < 4; j++) part(roses, G.sphere(0.07, 10, 8), j % 2 ? '#e0506a' : '#c8302f', { at: [(i - 3) * 0.45 + (K.rnd() - 0.5) * 0.6, 0.55 + K.rnd() * 0.25, (i % 2) * 0.3 + 0.3], line: 0.006 });
    }
    const prince = K.prince(); scene.add(prince.root);
    const fox = K.fox(); scene.add(fox.root);
    const pw = walker(prince, ground), fw = walker(fox, ground);
    fw.speed = 0.8;
    const S = {};
    const sc = {
      scene, chapters: [21], ground, actors: { prince, fox },
      wind: V(1, 0, 0.2),
      reset() {
        Object.assign(S, { day: 0, gust: 0 });
        prince.poseGoal = {}; fox.poseGoal = {};
        prince.sitGoal = 1; prince.sit = 1; prince.poseGoal.nod = 0.35;
        pw.at(0.4, 0.6); pw.snap(); pw.face = V(3, 0, 3);
        fw.at(-3.3, -2.6); fw.snap(); fw.face = () => prince.root.position;
        fox.sitGoal = 1; fox.sit = 1; fox.wag = 0.15; fox.root.visible = false;
      },
      cues: [
        [21, /It was then that the fox appeared/, () => { fox.root.visible = true; fw.go(-2.3, -1.3); }],
        [21, /He turned around but saw nothing/, () => { prince.sitGoal = 0; prince.poseGoal.nod = 0; pw.face = V(-1, 0, 3); }],
        [21, /under the apple tree/, () => { pw.face = () => fox.root.position; }],
        [21, /Come and play with me/, () => { pw.go(-0.3, 0.1); fw.go(-2.7, -1.8); }],
        [21, /It means to make bonds/, () => { fox.poseGoal.tilt = 0.25; }],
        [21, /I am beginning to understand/, () => { fox.poseGoal.tilt = 0; }],
        [21, /you have hair the color of gold/, () => { fox.wag = 0.6; }],
        [21, /Please\.\.\. tame me/, () => { fox.wag = 0.8; }],
        [21, /sit down a little way from me/, () => { pw.go(0.6, 0.6); prince.sitGoal = 1; pw.face = () => fox.root.position; fw.go(-1.6, -1.0); }],
        [21, /The next day the little prince came back/, () => { S.day = 1; pw.go(0.1, 0.35); prince.sitGoal = 1; fw.go(-1.1, -0.6); }],
        [21, /So the little prince tamed the fox/, () => { S.day = 2; prince.sitGoal = 1; pw.go(-0.4, 0.2); fw.go(-0.95, -0.15); fox.wag = 1; }],
        [21, /I am going to cry/, () => { fox.wag = 0.1; fox.poseGoal.earsDown = 1; fox.poseGoal.nod = 0.3; }],
        [21, /because of the color of the wheat/, () => { fox.poseGoal.earsDown = 0; fox.poseGoal.nod = 0; fox.wag = 0.5; S.gust = 3; }],
        [21, /went off to see the roses again/, () => { prince.sitGoal = 0; pw.go(4.4, -1.9); pw.face = () => V(5, 0.5, -3); }],
        [21, /And he went back to the fox/, () => { pw.go(-0.4, 0.15); pw.face = () => fox.root.position; }],
        [21, /Here is my secret/, () => { fox.poseGoal.nod = 0.15; fox.wag = 0.4; }],
        [21, /wind in the wheat/, (instant) => { if (!instant) S.gust = 5; }]
      ],
      wide(k) {
        const p = prince.root.position, f = fox.root.visible ? fox.root.position : V(-3, 0, -2);
        const mid = p.clone().lerp(f, 0.5);
        if (p.x > 3) return { pos: V(3.2, 1.3, 1.0), look: V(4.6, 0.5, -2.4) };
        const shots = [
          { pos: mid.clone().add(V(1.8, 1.4, 4.2)), look: mid.clone().add(V(0, 0.45, 0)) },
          { pos: mid.clone().add(V(-3.4, 0.9, 3.0)), look: mid.clone().add(V(0, 0.4, 0)) },
          { pos: mid.clone().add(V(0.5, 3.6, 6.5)), look: mid.clone().add(V(-0.8, 0.3, -1)) }
        ];
        return shots[k % shots.length];
      },
      closeSide: { prince: -1, fox: 1 },
      forceWide: () => prince.root.position.x > 3,   // at the rose bushes
      update(dt, t) {
        windU.value = t;
        S.gust = Math.max(0, S.gust - dt);
        gustU.value += ((S.gust > 0 ? 1 : 0.15) - gustU.value) * Math.min(1, dt * 2);
        // each day the light moves on
        const d = S.day;
        lerpColor(sky.material.uniforms.top.value, '#7d9fd6', d === 1 ? '#8fb0e0' : '#6a7ec0', d ? 1 : 0);
        lerpColor(sky.material.uniforms.bottom.value, '#f6c283', d === 1 ? '#f9dca8' : '#f2a878', d ? 1 : 0);
        pw.update(dt); fw.update(dt);
        prince.update(dt, t, V(1, 0, 0.2).multiplyScalar(0.6 + gustU.value));
        fox.update(dt, t);
        if (fox.walk > 0.3) fox.sitGoal = 0; else if (fox.walk < 0.05) fox.sitGoal = 1;
      }
    };
    sc.snap = () => { pw.snap(); fw.snap(); };
    return sc;
  }

  return { asteroid, lampPlanet, wheatField, closeUp };
};

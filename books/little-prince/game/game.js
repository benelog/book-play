/* The Little Prince in 3D, a play prototype: chapter XIV on the lamplighter's planet.
   The prince walks round a tiny planet whose day lasts one minute; the lamplighter lights and puts out his
   lamp at every dusk and dawn. Talking to him opens the chapter's scenes from scenes.js (typed or chosen
   answers, judged by js/matcher.js); between the two scenes the player tries for himself what the second
   one is about: keeping up with the sun by walking.
   Runs from file:// too: three.js is a plain script (vendor/three-game.min.js) and the models are base64 in
   models.js (built by tools/game-models.py), so nothing is fetched. */
(function () {
  'use strict';
  const T = window.THREE;
  const S = window.LP_STORAGE, M = window.LP_MATCHER;
  const BOOK = 'little-prince', CHAPTER = 14;
  const chapter = (window.LP_SCENES || []).find(c => c.num === CHAPTER);
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  const R = 2;                  // planet radius; the prince is about 0.65 tall
  const DAY = 60;               // seconds: here a whole day lasts one minute
  const QUEST = 40;             // seconds of sunshine without a break (longer than half a day, so standing still fails)
  const WALK = 0.9, RUN = 2.0, TURN = 2.4;
  const INK = 0x2b2a33;

  S.use(BOOK);
  const settings = S.getSettings();
  const saveSettings = () => S.setSettings(settings);

  // ---------------------------------------------------------------- renderer, camera, sky
  const canvas = $('view');
  const renderer = new T.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  const scene = new T.Scene();
  const camera = new T.PerspectiveCamera(50, 1, 0.05, 200);
  function resize() {
    const w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = w < h ? 62 : 50;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);
  resize();

  const sunDir = new T.Vector3();
  let sunAngle = 0;
  function setSun(a) { sunAngle = a; sunDir.set(0, Math.sin(a), Math.cos(a)); }

  const sky = new T.Mesh(new T.SphereGeometry(90, 48, 24), new T.ShaderMaterial({
    side: T.BackSide, depthWrite: false,
    uniforms: { sun: { value: sunDir }, daylight: { value: 0 } },
    vertexShader: 'varying vec3 vDir; void main() { vDir = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader: `uniform vec3 sun; uniform float daylight; varying vec3 vDir;
      void main() {
        vec3 d = normalize(vDir); float s = dot(d, sun);
        float lift = daylight * smoothstep(-0.6, 0.2, s);
        vec3 night = vec3(0.05, 0.08, 0.22), dusk = vec3(0.28, 0.33, 0.64), glow = vec3(0.98, 0.58, 0.40), day = vec3(1.0, 0.86, 0.62);
        vec3 c = mix(night, dusk, smoothstep(-0.55, 0.25, s));
        c = mix(c, glow, smoothstep(0.05, 0.8, s));
        c = mix(c, day, smoothstep(0.8, 1.0, s));
        c = mix(c, vec3(0.62, 0.76, 0.96), lift * (1.0 - smoothstep(0.3, 0.9, s)) * 0.85);   // blue day sky where the prince stands in the sun
        gl_FragColor = vec4(c, 1.0);
      }`
  }));
  sky.renderOrder = -2;
  scene.add(sky);

  function radialTexture(stops) {
    const c = document.createElement('canvas');
    c.width = c.height = 128;
    const g = c.getContext('2d');
    const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    stops.forEach(([o, col]) => grd.addColorStop(o, col));
    g.fillStyle = grd;
    g.fillRect(0, 0, 128, 128);
    const t = new T.CanvasTexture(c);
    t.colorSpace = T.SRGBColorSpace;
    return t;
  }
  const glowTex = radialTexture([[0, 'rgba(255,240,200,1)'], [0.25, 'rgba(255,215,140,0.8)'], [1, 'rgba(255,190,110,0)']]);
  const sunSprite = new T.Sprite(new T.SpriteMaterial({ map: glowTex, depthWrite: false, fog: false }));
  sunSprite.scale.setScalar(16);
  sunSprite.renderOrder = -1;
  scene.add(sunSprite);

  const stars = (function () {
    const n = 900, pos = new Float32Array(n * 3), size = new Float32Array(n);
    let seed = 7;
    const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    for (let i = 0; i < n; i++) {
      const z = rnd() * 2 - 1, a = rnd() * Math.PI * 2, r = Math.sqrt(1 - z * z);
      pos.set([r * Math.cos(a) * 80, z * 80, r * Math.sin(a) * 80], i * 3);
      size[i] = 1.5 + rnd() * rnd() * 5;
    }
    const g = new T.BufferGeometry();
    g.setAttribute('position', new T.BufferAttribute(pos, 3));
    g.setAttribute('size', new T.BufferAttribute(size, 1));
    const m = new T.ShaderMaterial({
      transparent: true, depthWrite: false,
      uniforms: { sun: { value: sunDir }, dpr: { value: renderer.getPixelRatio() } },
      vertexShader: `uniform vec3 sun; uniform float dpr; attribute float size; varying float vA;
        void main() { vA = smoothstep(0.35, -0.25, dot(normalize(position), sun)); gl_PointSize = size * dpr; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: `varying float vA;
        void main() { float a = smoothstep(0.5, 0.05, length(gl_PointCoord - 0.5)) * vA; gl_FragColor = vec4(1.0, 0.95, 0.82, a); }`
    });
    const p = new T.Points(g, m);
    p.renderOrder = -1;
    return p;
  })();
  scene.add(stars);

  const sunLight = new T.DirectionalLight(0xfff0d8, 2.4);
  scene.add(sunLight, sunLight.target);
  const hemi = new T.HemisphereLight(0x9fb0ff, 0x2a2440, 0.9);
  scene.add(hemi);

  // ---------------------------------------------------------------- toon look: three tones and an ink outline
  const gradient = (function () {
    const t = new T.DataTexture(new Uint8Array([95, 175, 255]), 3, 1, T.RedFormat);
    t.minFilter = t.magFilter = T.NearestFilter;
    t.needsUpdate = true;
    return t;
  })();
  const toon = (color, extra) => new T.MeshToonMaterial(Object.assign({ color, gradientMap: gradient }, extra || {}));

  const inkCache = {};
  function inkMaterial(w) {
    if (inkCache[w]) return inkCache[w];
    const m = new T.MeshBasicMaterial({ color: INK, side: T.BackSide });
    m.onBeforeCompile = (sh) => { sh.vertexShader = sh.vertexShader.replace('#include <begin_vertex>', `vec3 transformed = position + normal * ${w.toFixed(4)};`); };
    m.customProgramCacheKey = () => 'ink' + w;
    return (inkCache[w] = m);
  }
  function outline(mesh, w) {
    const mat = inkMaterial(w);
    let o;
    if (mesh.isSkinnedMesh) { o = new T.SkinnedMesh(mesh.geometry, mat); o.bind(mesh.skeleton, mesh.bindMatrix); }
    else o = new T.Mesh(mesh.geometry, mat);
    o.frustumCulled = false;
    mesh.add(o);
  }
  // Kenney's props come in bright colours; the book's planet is grey-blue with a little green.
  const TINT = { rock: '#9a9db3', rockDark: '#7d8098', stone: '#a9abbd', dirt: '#8c8fa6', grass: '#86a567', metal: '#9a9db3', metalDark: '#7d8098' };
  function toonify(root, w) {
    const meshes = [];
    root.traverse(o => { if (o.isMesh) meshes.push(o); });
    meshes.forEach(o => {
      const conv = (m) => {
        const base = (m.name || '').replace(/\.\d+$/, '');
        const t = toon(TINT[base] ? new T.Color(TINT[base]) : m.color.clone());
        t.name = base;
        return t;
      };
      o.material = Array.isArray(o.material) ? o.material.map(conv) : conv(o.material);
      o.frustumCulled = false;
      if (w) outline(o, w);
    });
  }

  // ---------------------------------------------------------------- planet surface helpers
  const UP = new T.Vector3(0, 1, 0);
  const tangent = (up, dir) => dir.clone().addScaledVector(up, -dir.dot(up)).normalize();
  function orient(obj, up, fwd, lift) {
    const f = tangent(up, fwd);
    const x = new T.Vector3().crossVectors(up, f).normalize();
    obj.quaternion.setFromRotationMatrix(new T.Matrix4().makeBasis(x, up, f));
    obj.position.copy(up).multiplyScalar(R + (lift || 0));
  }
  const anyTangent = (up) => tangent(up, Math.abs(up.y) < 0.9 ? UP : new T.Vector3(1, 0, 0));
  const onSurface = (up, h) => up.clone().multiplyScalar(R + (h || 0));
  const dayness = (up) => up.dot(sunDir);
  function keepAway(up, from, min) {
    if (up.angleTo(from) * R >= min) return up;
    const axis = new T.Vector3().crossVectors(from, up);
    if (axis.lengthSq() < 1e-9) axis.copy(anyTangent(from));
    return from.clone().applyAxisAngle(axis.normalize(), min / R);
  }

  const shadowTex = radialTexture([[0, 'rgba(20,18,40,0.55)'], [0.6, 'rgba(20,18,40,0.25)'], [1, 'rgba(20,18,40,0)']]);
  function blob(size) {
    const m = new T.Mesh(new T.CircleGeometry(size, 24), new T.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false }));
    m.geometry.rotateX(-Math.PI / 2);
    m.renderOrder = 1;
    scene.add(m);
    return m;
  }

  // ---------------------------------------------------------------- world objects (filled in by build())
  const planet = new T.Mesh(new T.SphereGeometry(R, 72, 48), toon('#a3a8c0'));
  scene.add(planet);
  const planetInk = new T.Mesh(new T.SphereGeometry(R + 0.025, 72, 48), new T.MeshBasicMaterial({ color: INK, side: T.BackSide }));
  scene.add(planetInk);

  const lampUp = new T.Vector3(0, 1, 0);
  const keeperUp = lampUp.clone().applyAxisAngle(new T.Vector3(0, 0, 1), -0.24).normalize();
  const prince = { up: new T.Vector3(), fwd: new T.Vector3(), speed: 0, model: null, shadow: blob(0.2) };
  const keeper = { up: keeperUp, fwd: new T.Vector3(), model: null, shadow: blob(0.24), facing: new T.Vector3() };
  let lamp = null, lampGlass = null, lampLight = null, lampHalo = null, lampOn = false;

  function b64(s) {
    const bin = atob(s), u = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
    return u.buffer;
  }
  const loadModel = (name) => new Promise((ok, fail) => new T.GLTFLoader().parse(b64(window.LP_GAME_MODELS[name]), '', ok, fail));

  function character(gltf, scale) {
    const root = gltf.scene;
    toonify(root, 0.005);
    root.scale.setScalar(scale);
    const holder = new T.Group();
    holder.add(root);
    scene.add(holder);
    const mixer = new T.AnimationMixer(root);
    const actions = {};
    gltf.animations.forEach(c => { actions[c.name] = mixer.clipAction(c); });
    const ch = {
      holder, mixer, actions, current: null,
      play(name, opts) {
        opts = opts || {};
        const a = actions[name];
        if (!a || (ch.current === a && !opts.once)) return a;
        a.reset();
        a.setLoop(opts.once ? T.LoopOnce : T.LoopRepeat, Infinity);
        a.clampWhenFinished = !!opts.once;
        a.timeScale = opts.speed || 1;
        a.enabled = true;
        a.setEffectiveWeight(1);
        if (ch.current && ch.current !== a) a.crossFadeFrom(ch.current, opts.fade == null ? 0.25 : opts.fade, false);
        a.play();
        ch.current = a;
        return a;
      },
      after: null
    };
    mixer.addEventListener('finished', () => { const next = ch.after || 'idle'; ch.after = null; ch.play(next, { fade: 0.3 }); });
    ch.play('idle', { fade: 0 });
    return ch;
  }

  function scatter(props) {
    let seed = 14;
    const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const clear = [lampUp, keeperUp];
    const kinds = [['craterLarge', 3, 0.85], ['crater', 6, 0.65], ['rock_smallC', 5, 0.55], ['stone_smallB', 5, 0.45], ['rock_smallFlatA', 4, 0.6],
      ['stone_smallFlatA', 4, 0.6], ['grass', 12, 0.6], ['grass_large', 6, 0.6], ['grass_leafs', 10, 0.8]];
    kinds.forEach(([name, count, scale]) => {
      const src = props.getObjectByName(name);
      if (!src) return;
      for (let i = 0; i < count; i++) {
        let up;
        do {
          const z = rnd() * 2 - 1, a = rnd() * Math.PI * 2, r = Math.sqrt(1 - z * z);
          up = new T.Vector3(r * Math.cos(a), z, r * Math.sin(a));
        } while (clear.some(c => c.angleTo(up) * R < 0.55));
        const o = src.clone();
        const s = scale * (0.75 + rnd() * 0.5);
        o.scale.set(s, name.startsWith('crater') ? s * 0.5 : s, s);     // shallow craters: the prince walks over them
        const holder = new T.Group();
        holder.add(o);
        o.rotation.y = rnd() * Math.PI * 2;
        orient(holder, up, anyTangent(up), name.startsWith('crater') ? -0.02 : -0.01);
        scene.add(holder);
      }
    });
  }

  async function build() {
    const [p, k, props] = await Promise.all(['prince', 'lamplighter', 'props'].map(loadModel));
    prince.model = character(p, 1.0);
    keeper.model = character(k, 1.18);

    const propRoot = props.scene;
    toonify(propRoot, 0.006);
    lamp = propRoot.getObjectByName('lamp');
    lamp.removeFromParent();
    lamp.position.set(0, 0, 0);
    lamp.scale.setScalar(1.15);
    const lampHolder = new T.Group();
    lampHolder.add(lamp);
    orient(lampHolder, lampUp, new T.Vector3(0, 0, 1), -0.02);
    scene.add(lampHolder);
    lamp.traverse(o => { if (o.isMesh && !Array.isArray(o.material) && o.material.name === 'glass') lampGlass = o.material;
      if (o.isMesh && Array.isArray(o.material)) o.material.forEach(m => { if (m.name === 'glass') lampGlass = m; }); });
    const lanternAt = onSurface(lampUp, 1.1);
    lampLight = new T.PointLight(0xffc873, 0, 0, 1.6);
    lampLight.position.copy(lanternAt);
    scene.add(lampLight);
    lampHalo = new T.Sprite(new T.SpriteMaterial({ map: glowTex, depthWrite: false, transparent: true, opacity: 0, blending: T.AdditiveBlending }));
    lampHalo.position.copy(lanternAt);
    lampHalo.scale.setScalar(0.8);
    scene.add(lampHalo);
    const shadow = blob(0.16);
    orient(shadow, lampUp, new T.Vector3(0, 0, 1), 0.004);
    scatter(propRoot);
    distantPlanets();
  }

  function distantPlanets() {
    [[new T.Vector3(-30, 14, -26), 3.2, '#d8a36a'], [new T.Vector3(34, -8, -20), 2.2, '#8fb0c9'], [new T.Vector3(-18, -22, 30), 4.0, '#c98f8f'],
      [new T.Vector3(22, 26, 28), 1.4, '#e3d18a']].forEach(([pos, r, col], i) => {
      const m = new T.Mesh(new T.SphereGeometry(r, 32, 20), toon(col));
      m.position.copy(pos);
      m.add(new T.Mesh(new T.SphereGeometry(r * 1.03, 32, 20), new T.MeshBasicMaterial({ color: INK, side: T.BackSide })));
      if (i === 1) {
        const ring = new T.Mesh(new T.RingGeometry(r * 1.4, r * 1.9, 48), toon('#d9c7a0', { side: T.DoubleSide }));
        ring.rotation.set(1.2, 0.3, 0);
        m.add(ring);
      }
      scene.add(m);
    });
  }

  // ---------------------------------------------------------------- bubbles, voice
  const bubbles = {};
  function say(who, text, secs) {
    let b = bubbles[who];
    if (!b) { b = bubbles[who] = document.createElement('div'); b.className = 'bubble ' + who; $('bubbles').appendChild(b); }
    b.textContent = text;
    b.classList.remove('hide');
    clearTimeout(b.timer);
    b.timer = setTimeout(() => b.classList.add('hide'), (secs || Math.max(2.2, text.length * 0.07)) * 1000);
    if (who === 'keeper') speak(text);
  }
  function hideBubbles() { Object.values(bubbles).forEach(b => b.classList.add('hide')); }
  const headPoint = new T.Vector3();
  function placeBubble(who, ch, height) {
    const b = bubbles[who];
    if (!b || b.classList.contains('hide')) return;
    ch.holder.localToWorld(headPoint.set(0, height, 0));
    headPoint.project(camera);
    const vis = headPoint.z < 1 && Math.abs(headPoint.x) < 1.2 && Math.abs(headPoint.y) < 1.2;
    b.style.display = vis ? '' : 'none';
    b.style.left = ((headPoint.x + 1) / 2 * window.innerWidth) + 'px';
    b.style.top = ((1 - headPoint.y) / 2 * window.innerHeight) + 'px';
  }
  let voice = null;
  function pickVoice() {
    const vs = window.speechSynthesis ? speechSynthesis.getVoices() : [];
    voice = vs.find(v => /en[-_]GB/i.test(v.lang) && /male|daniel|george|arthur/i.test(v.name)) || vs.find(v => /^en/i.test(v.lang)) || null;
  }
  if (window.speechSynthesis) { pickVoice(); speechSynthesis.addEventListener && speechSynthesis.addEventListener('voiceschanged', pickVoice); }
  function speak(text) {
    if (!$('voice-on').checked || !window.speechSynthesis) return;
    const clean = String(text).replace(/[…]/g, ',').replace(/^\(.*\)$/, '');
    if (!clean.trim()) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(clean);
    if (voice) u.voice = voice;
    u.lang = voice ? voice.lang : 'en-GB';
    u.rate = 0.9;
    u.pitch = 0.75;
    speechSynthesis.speak(u);
  }

  // ---------------------------------------------------------------- the lamp and its keeper
  function setLamp(on) {
    lampOn = on;
    if (lampGlass) { lampGlass.emissive = new T.Color(on ? 0xffc050 : 0x000000); lampGlass.emissiveIntensity = on ? 1.4 : 0; }
  }
  let keeperBusy = 0;          // seconds left in the lighting gesture
  function keeperTick(dt) {
    const wantOn = dayness(lampUp) < 0.02;
    if (wantOn !== lampOn && keeperBusy <= 0 && lampGlass) {
      keeperBusy = 1.2;
      keeper.model.play('interact-right', { once: true, speed: 0.7 });
      setTimeout(() => setLamp(wantOn), 450);
      if (state !== 'talk') say('keeper', wantOn ? 'Good evening.' : 'Good morning.', 2);
    }
    keeperBusy -= dt;
    // face the lamp while working, the prince when he comes near
    const near = prince.up.angleTo(keeper.up) * R < 1.6;
    const target = (keeperBusy > 0 || !near) ? lampUp : prince.up;
    const want = tangent(keeper.up, target.clone().sub(keeper.up));
    keeper.facing.lerp(want, 1 - Math.exp(-dt * 5)).normalize();
    orient(keeper.model.holder, keeper.up, keeper.facing, 0);
    // the lamp's light fades in and out
    const k = 1 - Math.exp(-dt * 6);
    lampLight.intensity += ((lampOn ? 2.2 : 0) - lampLight.intensity) * k;
    lampHalo.material.opacity += ((lampOn ? 0.6 : 0) - lampHalo.material.opacity) * k;
  }

  // ---------------------------------------------------------------- input
  const keys = {};
  const stick = { x: 0, y: 0, id: null };
  const typing = (e) => e.target && /INPUT|TEXTAREA/.test(e.target.tagName);
  window.addEventListener('keydown', (e) => {
    if (typing(e)) return;
    keys[e.code] = true;
    if ((e.code === 'KeyE' || e.code === 'Enter') && !$('talk').hidden) { e.preventDefault(); talk(); }
    if (/Arrow/.test(e.code)) e.preventDefault();
  });
  window.addEventListener('keyup', (e) => { keys[e.code] = false; });
  window.addEventListener('blur', () => { Object.keys(keys).forEach(k => { keys[k] = false; }); });
  const stickEl = $('stick'), knob = stickEl.querySelector('.knob');
  function stickMove(e) {
    const r = stickEl.getBoundingClientRect();
    let x = (e.clientX - r.left - r.width / 2) / (r.width / 2), y = (e.clientY - r.top - r.height / 2) / (r.height / 2);
    const l = Math.hypot(x, y);
    if (l > 1) { x /= l; y /= l; }
    stick.x = x; stick.y = y;
    knob.style.transform = `translate(${x * 34}px, ${y * 34}px)`;
  }
  stickEl.addEventListener('pointerdown', (e) => { stick.id = e.pointerId; stickEl.setPointerCapture(e.pointerId); stickMove(e); });
  stickEl.addEventListener('pointermove', (e) => { if (e.pointerId === stick.id) stickMove(e); });
  const stickUp = (e) => { if (e.pointerId !== stick.id) return; stick.id = null; stick.x = stick.y = 0; knob.style.transform = ''; };
  stickEl.addEventListener('pointerup', stickUp);
  stickEl.addEventListener('pointercancel', stickUp);
  if (window.matchMedia && matchMedia('(pointer: coarse)').matches) document.body.classList.add('touch');
  window.addEventListener('touchstart', () => document.body.classList.add('touch'), { once: true, passive: true });

  function readInput() {
    let fwd = 0, turn = 0;
    if (keys.ArrowUp || keys.KeyW) fwd += 1;
    if (keys.ArrowDown || keys.KeyS) fwd -= 1;
    if (keys.ArrowLeft || keys.KeyA) turn += 1;
    if (keys.ArrowRight || keys.KeyD) turn -= 1;
    if (stick.id !== null) {
      fwd += -stick.y;
      turn += -stick.x * 0.9;
    }
    const run = keys.ShiftLeft || keys.ShiftRight || (stick.id !== null && Math.hypot(stick.x, stick.y) > 0.95);
    return { fwd: Math.max(-1, Math.min(1, fwd)), turn: Math.max(-1, Math.min(1, turn)), run };
  }

  function princeTick(dt) {
    const inp = (state === 'talk' || state === 'intro') ? { fwd: 0, turn: 0, run: false } : readInput();
    if (inp.turn) prince.fwd.applyAxisAngle(prince.up, inp.turn * TURN * dt);
    const speed = inp.fwd * (inp.run && inp.fwd > 0 ? RUN : WALK);
    prince.speed = speed;
    if (speed) {
      const p = onSurface(prince.up).addScaledVector(prince.fwd, speed * dt);
      let up = p.normalize();
      up = keepAway(up, lampUp, 0.3);
      up = keepAway(up, keeper.up, 0.42);
      prince.fwd.copy(tangent(up, prince.fwd));
      prince.up.copy(up);
    }
    const m = prince.model;
    if (m.current && m.current.loop === T.LoopOnce && m.current.isRunning()) { /* let a gesture finish */ }
    else if (!speed) m.play('idle');
    else if (Math.abs(speed) > WALK + 0.1) m.play('sprint');
    else { m.play('walk'); m.current.timeScale = Math.sign(speed) * 1.1; }
    orient(m.holder, prince.up, prince.fwd, 0);
  }

  // ---------------------------------------------------------------- camera
  const cam = { pos: new T.Vector3(), look: new T.Vector3(), up: new T.Vector3(0, 1, 0) };
  function cameraTick(dt, snap) {
    const base = onSurface(prince.up);
    let want, look;
    if (state === 'talk') {                 // frame both speakers from the side
      const a = base, b = onSurface(keeper.up);
      const mid = a.clone().add(b).multiplyScalar(0.5);
      const up = mid.clone().normalize();
      const side = new T.Vector3().crossVectors(up, b.clone().sub(a)).normalize();
      if (side.dot(cam.pos.clone().sub(mid)) < 0) side.negate();
      want = mid.clone().addScaledVector(up, 1.0).addScaledVector(side, 2.9);
      look = mid.clone().addScaledVector(up, -0.05);   // the speakers sit in the upper half, above the message window
    } else {
      want = base.clone().addScaledVector(prince.up, 1.5).addScaledVector(prince.fwd, -2.7);
      look = base.clone().addScaledVector(prince.up, 0.45).addScaledVector(prince.fwd, 0.9);
    }
    const k = snap ? 1 : 1 - Math.exp(-dt * 3.2);
    cam.pos.lerp(want, k);
    cam.look.lerp(look, k);
    cam.up.lerp(state === 'talk' ? look.clone().normalize() : prince.up, k).normalize();
    // never below the ground
    if (cam.pos.length() < R + 0.25) cam.pos.setLength(R + 0.25);
    camera.position.copy(cam.pos);
    camera.up.copy(cam.up);
    camera.lookAt(cam.look);
  }

  // ---------------------------------------------------------------- story state
  // intro → explore → talk(scene 0) → quest → back → talk(scene 1) → done → free
  let state = 'intro', sceneIdx = 0, questTime = 0, questBest = 0, nightWarned = false;
  const goal = $('goal'), meter = $('sun-meter');
  const GOALS = {
    explore: ['Walk to the lamplighter and talk to him.', '점등인에게 걸어가 말을 걸어 보세요.'],
    quest: ['His day lasts one minute, and the planet is so small you can walk round it. Try it: stay in the sunshine for 40 seconds. Walk toward the setting sun!',
      '이 별의 하루는 1분이고, 별이 아주 작아서 걸어서 한 바퀴 돌 수 있습니다. 직접 해 보세요: 40초 동안 햇빛 속에 머물러 보세요. 지는 해를 향해 걸어가세요!'],
    night: ['Night caught up with you. Walk toward the setting sun and try again.', '밤이 따라왔어요. 지는 해 쪽으로 걸어가서 다시 해 보세요.'],
    back: ['You kept up with the sun! Go back and tell the lamplighter how he could rest.', '해를 따라잡았어요! 점등인에게 돌아가 쉬는 방법을 알려 주세요.'],
    free: ['Chapter complete. Walk round the planet as long as you like.', '장을 마쳤습니다. 마음껏 별을 걸어 다녀 보세요.']
  };
  function setGoal(key) {
    const [en, ko] = GOALS[key];
    goal.hidden = false;
    goal.querySelector('.en').textContent = en;
    goal.querySelector('.ko').textContent = ko;
    goal.classList.toggle('warn', key === 'night');
    meter.hidden = !(key === 'quest' || key === 'night');
  }

  function questTick(dt) {
    if (state !== 'quest') return;
    if (dayness(prince.up) > 0.02) {
      questTime += dt;
      if (nightWarned && questTime > 1) { nightWarned = false; setGoal('quest'); }
    } else {
      if (questTime > 3 && !nightWarned) { nightWarned = true; setGoal('night'); }
      questTime = 0;
    }
    questBest = Math.max(questBest, questTime);
    meter.querySelector('.fill').style.width = Math.min(100, questTime / QUEST * 100) + '%';
    meter.querySelector('span').textContent = `☀ ${Math.floor(questTime)} / ${QUEST} s`;
    if (questTime >= QUEST) {
      state = 'back';
      setGoal('back');
      prince.model.play('emote-yes', { once: true });
      say('prince', 'I walked with the sun!', 2.5);
    }
  }

  const nearKeeper = () => prince.up.angleTo(keeper.up) * R < 1.0;
  function talkTick() {
    const can = nearKeeper() && (state === 'explore' || state === 'back' || state === 'quest' || state === 'free');
    $('talk').hidden = !can;
  }

  // ---------------------------------------------------------------- dialogue (scenes.js)
  const dlg = $('dialog');
  let misses = 0;
  function talk() {
    if (state === 'quest') { say('keeper', 'Orders are orders. Good day… good night…', 2.5); return; }
    if (state === 'free') { say('keeper', 'What I love most in life is sleeping.', 2.5); return; }
    sceneIdx = state === 'back' ? 1 : 0;
    state = 'talk';
    $('talk').hidden = true;
    openScene(chapter.scenes[sceneIdx]);
  }
  function setMode(mode) {
    settings.answerMode = mode;
    saveSettings();
    dlg.dataset.mode = mode;
    dlg.querySelectorAll('.mode button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.mode === mode)));
    if (mode === 'type' && !dlg.classList.contains('answered')) setTimeout(() => dlg.querySelector('.typing input').focus(), 0);
  }
  function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function openScene(sc) {
    misses = 0;
    dlg.hidden = false;
    dlg.classList.remove('answered');
    dlg.querySelector('.situation').textContent = sc.situation;
    dlg.querySelector('.situation-ko').textContent = sc.situationKo || '';
    dlg.querySelector('.who').textContent = sc.speaker + ':';
    dlg.querySelector('.say').textContent = sc.line;
    dlg.querySelector('.prompt').textContent = sc.prompt;
    dlg.querySelector('.prompt-ko').textContent = sc.promptKo || '';
    feedback('', '');
    const box = dlg.querySelector('.choices');
    box.innerHTML = '';
    shuffle([sc.model].concat(sc.distractors || [])).forEach(text => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = text;
      b.addEventListener('click', () => {
        if (text === sc.model) { b.classList.add('right'); answered(sc, text); }
        else { b.classList.add('wrong'); b.disabled = true; feedback('miss', 'Not quite. Read the situation again.', '다시 상황을 읽어 보세요.'); }
      });
      box.appendChild(b);
    });
    const input = dlg.querySelector('.typing input');
    input.value = '';
    dlg.querySelector('.leave').hidden = false;
    dlg.querySelector('.next').hidden = true;
    setMode(settings.answerMode === 'choose' ? 'choose' : 'type');
    say('keeper', sc.line, 3);
  }
  function feedback(kind, en, ko) {
    const f = dlg.querySelector('.feedback');
    f.className = 'feedback ' + kind;
    f.innerHTML = en ? esc(en) + (ko ? `<span class="ko">${esc(ko)}</span>` : '') : '';
  }
  dlg.querySelector('.typing').addEventListener('submit', (e) => {
    e.preventDefault();
    const sc = chapter.scenes[sceneIdx];
    const input = dlg.querySelector('.typing input');
    const text = input.value.trim();
    if (!text) return;
    if (M.match(text, sc.answers)) { answered(sc, text); return; }
    misses++;
    if (misses >= 3) feedback('miss', `Try saying: "${sc.model}"`, '예시 답을 따라 입력해 보세요.');
    else feedback('miss', 'Hint: ' + (sc.hints[misses - 1] || sc.hints[0]), (sc.hintsKo || [])[misses - 1] || '');
    input.select();
  });
  $('talk').addEventListener('click', talk);
  dlg.querySelectorAll('.mode button').forEach(b => b.addEventListener('click', () => setMode(b.dataset.mode)));
  dlg.querySelector('.leave').addEventListener('click', closeDialog);

  function answered(sc, text) {
    dlg.classList.add('answered');
    dlg.querySelector('.leave').hidden = true;
    say('prince', text, 3.2);
    prince.model.play('emote-yes', { once: true });
    feedback('ok', '✓ ' + text);
    setTimeout(() => {
      dlg.querySelector('.who').textContent = sc.reply.speaker + ':';
      dlg.querySelector('.say').textContent = sc.reply.line;
      say('keeper', sc.reply.line, 4);
      keeper.model.play('emote-no', { once: true, speed: 0.8 });
      const next = dlg.querySelector('.next');
      next.hidden = false;
      next.focus();
    }, 1400);
  }
  dlg.querySelector('.next').addEventListener('click', () => {
    dlg.hidden = true;
    if (sceneIdx === 0) {
      state = 'quest';
      questTime = 0;
      setGoal('quest');
    } else {
      state = 'done';
      finish();
    }
  });
  function closeDialog() {
    dlg.hidden = true;
    state = sceneIdx === 0 ? 'explore' : 'back';
    hideBubbles();
  }

  function finish() {
    goal.hidden = true;
    const p = S.getProgress(BOOK);
    p.completed[CHAPTER] = true;
    S.setProgress(p);
    S.addHistory({ type: 'done', book: BOOK, chapter: CHAPTER, title: chapter.title, mode: 'game' });
    setTimeout(() => { $('done').hidden = false; $('stay').focus(); }, 1200);
  }
  $('stay').addEventListener('click', () => { $('done').hidden = true; state = 'free'; setGoal('free'); });

  // ---------------------------------------------------------------- page chrome
  const bookHref = location.protocol === 'file:' ? `../../../index.html#/books/${BOOK}/chapters/${CHAPTER}` : `../chapters/${CHAPTER}`;
  $('back').href = bookHref;
  $('to-book').href = bookHref;
  const koBox = $('ko-on');
  koBox.checked = !!settings.koHelp;
  const applyKo = () => document.body.classList.toggle('ko-on', koBox.checked);
  koBox.addEventListener('change', () => { settings.koHelp = koBox.checked; saveSettings(); applyKo(); });
  applyKo();
  const voiceBox = $('voice-on');
  voiceBox.checked = settings.gameVoice !== false;
  voiceBox.addEventListener('change', () => { settings.gameVoice = voiceBox.checked; saveSettings(); if (!voiceBox.checked && window.speechSynthesis) speechSynthesis.cancel(); });
  document.querySelector('#splash .summary').textContent = chapter.summary;
  document.querySelector('#splash .summary-ko').textContent = chapter.summaryKo || '';

  // ---------------------------------------------------------------- start
  setSun(Math.PI * 0.78);                         // late afternoon at the lamp: dusk comes a few seconds in
  prince.up.copy(lampUp).applyAxisAngle(new T.Vector3(0, 0, 1), 1.0).normalize();
  prince.fwd.copy(tangent(prince.up, onSurface(lampUp).sub(onSurface(prince.up))));
  keeper.facing.copy(tangent(keeper.up, lampUp.clone().sub(keeper.up)));

  const clock = new T.Timer();
  let started = false;
  function frame() {
    clock.update();
    const dt = Math.min(clock.getDelta(), 0.1);
    if (started) setSun(sunAngle + dt * Math.PI * 2 / DAY);
    sunLight.position.copy(sunDir).multiplyScalar(20);
    sunSprite.position.copy(sunDir).multiplyScalar(80);
    const light = Math.max(0, Math.min(1, dayness(prince.up) * 3 + 0.5));
    hemi.intensity = 0.55 + light * 0.5;
    sky.material.uniforms.daylight.value += (Math.max(0, Math.min(1, dayness(prince.up) * 4)) - sky.material.uniforms.daylight.value) * Math.min(1, dt * 3);
    if (prince.model) {
      princeTick(dt);
      keeperTick(dt);
      questTick(dt);
      talkTick();
      prince.model.mixer.update(dt);
      keeper.model.mixer.update(dt);
      orient(prince.shadow, prince.up, prince.fwd, 0.006);
      orient(keeper.shadow, keeper.up, keeper.facing, 0.006);
      cameraTick(dt, !started && !cam.ready);
      cam.ready = true;
      placeBubble('prince', prince.model, 0.78);
      placeBubble('keeper', keeper.model, 0.95);
    }
    renderer.render(scene, camera);
  }

  build().then(() => {
    setLamp(dayness(lampUp) < 0.02);
    renderer.setAnimationLoop(frame);
    const btn = $('start');
    btn.disabled = false;
    btn.textContent = '▶ Start';
    btn.focus();
    btn.addEventListener('click', () => {
      $('splash').hidden = true;
      started = true;
      state = 'explore';
      setGoal('explore');
      canvas.focus && canvas.focus();
    });
  }).catch((e) => {
    console.error(e);
    $('start').textContent = 'Could not load the 3D models';
  });

  // for tests and debugging (headless Chrome)
  window.LP_GAME = { get state() { return state; }, prince, keeper, sunDir, dayness, talk, setSun, get questTime() { return questTime; },
    set questTime(v) { questTime = v; }, keys, get lampOn() { return lampOn; } };
})();

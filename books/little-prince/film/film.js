/* The Little Prince film — a narrated picture film in CSS 3D.
   The whole book text (text/book.js) is turned into a list of steps by script.js + cast.js: chapter cards, pictures
   and every sentence of narration and dialogue. Each illustration is a painted board floating in a star field; the
   camera flies from board to board, and while a character speaks it moves toward that character's head (shots.js).
   Lines are spoken with the Web Speech API, one voice per character; without speech the film runs on timings.
   Plain CSS 3D (no WebGL) so the page also works when opened from file://.
   motion.js adds depth layers, blinking, speaking mouths and the spoken word lit in the subtitle (see its header). */
(function () {
  const P = window.LP_PARSER, S = window.LP_FILM_SCRIPT, CAST = window.LP_FILM_CAST, SHOTS = window.LP_FILM_SHOTS || {};
  const SCENES = window.LP_SCENES || [];
  const M = window.LP_FILM_MOTION || null;   // motion.js: layers, faces, subtitle words
  const KEY = 'lp.v1.little-prince.film';
  const $ = (id) => document.getElementById(id);
  const stage = $('stage'), world = $('world');
  const reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX',
    'XXI', 'XXII', 'XXIII', 'XXIV', 'XXV', 'XXVI', 'XXVII'];
  const pad = (n) => String(n).padStart(2, '0');
  const src = (id) => id === 'cover' ? '../images/cover.jpg' : /^chapter-/.test(id) ? `../images/${id}.jpg` : `../images/pictures/${id}.jpg`;
  const store = {
    get() { try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { return null; } },
    set(v) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) { /* private mode */ } }
  };

  // ---------------------------------------------------------------- timeline
  const parsed = P.parse(window.LP_BOOK.text);
  const TL = S.timeline(parsed, CAST.speakers, P.picture, SCENES);
  if (TL.errors.length) console.warn('[film] cast.js does not match the text:', TL.errors);
  const steps = TL.steps, chapterStart = TL.chapterStart;

  // every picture gets a station along a slow spiral through space, in the order it first appears
  const stations = {};
  steps.forEach(s => {
    if (stations[s.img]) return;
    const i = Object.keys(stations).length;
    // depth varies only a little: a board much nearer than the one in view would pass behind the eye
    stations[s.img] = { x: i * 2100, y: Math.sin(i * 0.8) * 420, z: Math.sin(i * 0.7) * 240 };
  });
  const shot = (img) => SHOTS[img] || { tone: 'space', focus: [0.5, 0.5] };

  // ---------------------------------------------------------------- 3D world: stars, planets, panels
  const rand = (a, b) => a + Math.random() * (b - a);
  const BOX = { x: 7000, y: 4400 };
  const sky = [];
  function addSky(el, x, y, z, box) { world.appendChild(el); sky.push({ el, x, y, z, box, kx: null, ky: null }); }
  for (let i = 0; i < (reduced ? 140 : 260); i++) {
    const el = document.createElement('div');
    el.className = 'star' + (Math.random() < 0.08 ? ' big' : '');
    el.style.setProperty('--tw', rand(2.5, 6).toFixed(1) + 's');
    el.style.animationDelay = rand(0, 5).toFixed(1) + 's';
    addSky(el, rand(-BOX.x / 2, BOX.x / 2), rand(-BOX.y / 2, BOX.y / 2), rand(-6400, -900), BOX);
  }
  const PLANETS = [['#c98a5a', '#6b3a22', 180], ['#8aa6d8', '#2c3f7a', 120], ['#e2c27a', '#8a6a2a', 260], ['#b48ad0', '#4a2a6a', 90], ['#9ad0b0', '#2a5a4a', 150]];
  PLANETS.forEach(([a, b, r]) => {
    const el = document.createElement('div');
    el.className = 'planet';
    el.style.cssText = `width:${r * 2}px;height:${r * 2}px;margin:${-r}px 0 0 ${-r}px;background:radial-gradient(circle at 35% 30%, ${a}, ${b} 70%)`;
    addSky(el, rand(-4500, 4500), rand(-2600, 2600), rand(-9500, -5000), { x: 12000, y: 7000 });
  });
  function placeSky(L) {
    for (const s of sky) {
      const kx = Math.floor((s.x - L.x + s.box.x / 2) / s.box.x), ky = Math.floor((s.y - L.y + s.box.y / 2) / s.box.y);
      if (kx === s.kx && ky === s.ky) continue;
      s.kx = kx; s.ky = ky;
      s.el.style.transform = `translate3d(${s.x - kx * s.box.x}px, ${s.y - ky * s.box.y}px, ${L.z + s.z}px)`;
    }
  }

  // Boards are made folded and invisible (so the next one can load early), unfold like the page of a pop-up book
  // when their turn comes, and hide again once the camera has left them.
  const panels = {};   // img -> element
  const flat = (st) => `translate3d(${st.x}px, ${st.y}px, ${st.z}px)`;
  function ensurePanel(img) {
    if (panels[img]) return panels[img];
    const st = stations[img];
    const el = document.createElement('div');
    el.className = 'panel';
    // thickness comes from layers stacked parallel behind the picture: faces at right angles to it make Chrome
    // split the picture layer, and parts of it then go missing
    el.innerHTML = `<div class="back"></div><div class="slab s3"></div><div class="slab s2"></div><div class="slab s1"></div><img alt="" src="${src(img)}">`;
    el.style.transform = flat(st) + (reduced ? '' : ' rotateX(-70deg) translateY(300px)');
    el.style.opacity = '0';
    el.style.visibility = 'hidden';
    if (M) M.build(el, img, src(img));
    world.appendChild(el);
    panels[img] = el;
    addMotes(el, img);
    return el;
  }
  function unfold(img) {
    const el = ensurePanel(img);
    if (el.dataset.open === '1') { el.style.visibility = 'visible'; el.style.opacity = '1'; return; }
    el.dataset.open = '1';
    el.style.visibility = 'visible';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.style.transition = 'transform 2.2s cubic-bezier(.2,.8,.2,1), opacity 1.2s';
      el.style.transform = flat(stations[img]);
      el.style.opacity = '1';
    }));
  }
  function hidePanel(img) {
    const el = panels[img];
    if (!el) return;
    el.style.opacity = '0';
    setTimeout(() => { if (el.style.opacity === '0') el.style.visibility = 'hidden'; }, 1300);
  }
  function addMotes(el, img) {
    if (reduced) return;
    const tone = shot(img).tone;
    const kind = /^(chapter-20|20-1|chapter-08|08-1)$/.test(img) ? 'petal' : /desert/.test(tone) ? 'sand' : 'spark';
    const n = kind === 'spark' ? 16 : 26;
    for (let i = 0; i < n; i++) {
      const m = document.createElement('div');
      m.className = 'mote ' + kind;
      const x = rand(0, 1200), y = rand(0, 900), z = rand(60, 520);
      m.style.cssText = `left:600px;top:450px;--x:${x - 600}px;--y:${y - 450}px;--z:${z}px;--dx:${rand(-260, kind === 'sand' ? 420 : 160).toFixed(0)}px;` +
        `--dy:${(kind === 'petal' ? rand(120, 380) : rand(-160, 60)).toFixed(0)}px;--d:${rand(9, 20).toFixed(1)}s;--delay:${rand(-20, 0).toFixed(1)}s`;
      el.appendChild(m);
    }
  }
  // keep the current board and its neighbours in the page; remove the others
  function prunePanels(keep) {
    Object.keys(panels).forEach(img => {
      if (keep.includes(img)) return;
      const el = panels[img];
      delete panels[img];
      if (M) M.drop(img);
      el.style.opacity = '0';
      setTimeout(() => el.remove(), 1400);
    });
  }
  let cardEl = null;
  function showCard(step) {
    if (cardEl) { const old = cardEl; old.classList.add('gone'); setTimeout(() => old.remove(), 1500); cardEl = null; }
    if (!step) return;
    const st = stations[step.img];
    const el = document.createElement('div');
    el.className = 'card3d';
    const ko = $('ko-on').checked;
    if (step.kind === 'title') el.innerHTML = `<div class="name">${step.title}</div><div class="num" style="margin-top:18px">${step.by}</div><div class="ko" style="font-size:26px">${step.note}</div>`;
    else if (step.kind === 'end') el.innerHTML = `<div class="name">The End</div>`;
    else el.innerHTML = `<div class="num">CHAPTER ${ROMAN[step.ch]}</div><div class="name">${step.title}</div>${ko && step.ko ? `<div class="ko">${step.ko}</div>` : ''}`;
    el.style.transform = `translate3d(${st.x}px, ${st.y - 120}px, ${st.z + 420}px)`;
    el.style.opacity = '0';
    world.appendChild(el);
    requestAnimationFrame(() => requestAnimationFrame(() => { el.style.opacity = '1'; }));
    cardEl = el;
  }

  // ---------------------------------------------------------------- camera
  // The camera looks at point L (in world space) at scale s, turned by yaw/pitch around L:
  //   #world transform = translateZ(1000 - 1000/s) rotateX(pitch) rotateY(yaw) translate3d(-L)
  const cam = { x: 0, y: 0, z: 0, s: 0.2, yaw: 0, pitch: 0 };
  const goal = { x: 0, y: 0, z: 0, s: 0.2, yaw: 0, pitch: 0 };
  let travelUntil = 0, travelFrom = null;
  function fitScale() {
    const W = stage.clientWidth, H = stage.clientHeight;
    return Math.min(W * 0.9 / 1240, H * 0.7 / 940);
  }
  // the scale at which the board fills the screen (cropping it), capped so tall phone screens do not zoom too far in
  function coverScale() {
    const W = stage.clientWidth, H = stage.clientHeight;
    return Math.min(Math.max(W / 1200, H / 900), fitScale() * 1.9);
  }
  function aim(img, point, s, off) {
    off = off || [0, 0];
    const st = stations[img], W = stage.clientWidth, H = stage.clientHeight;
    const hw = W / 2 / s, hh = H * 0.45 / s;
    const clamp = (v, lim) => lim <= 0 ? 0 : Math.max(-lim, Math.min(lim, v));
    goal.x = st.x + clamp((point[0] - 0.5) * 1200 + off[0], 600 - hw);
    goal.y = st.y + clamp((point[1] - 0.5) * 900 + off[1], 450 - hh);
    goal.z = st.z;
    goal.s = s;
  }
  let last = performance.now(), t0 = last, lastCover = 1, still = false;
  function frame(now) {
    // still(): the camera sits exactly on its goal, without sway (screenshots, tools/film-motion-check.py)
    if (still) { Object.assign(cam, goal, { yaw: 0, pitch: 0 }); travelUntil = 0; }
    const dt = Math.min(0.1, (now - last) / 1000); last = now;
    const t = (now - t0) / 1000;
    const traveling = now < travelUntil;
    const k = 1 - Math.exp(-dt / (traveling ? 0.55 : 0.9));
    for (const key of ['x', 'y', 'z']) cam[key] += (goal[key] - cam[key]) * k;
    // on a long flight pull back first, so the boards and the stars pass by
    let sGoal = goal.s;
    if (traveling && !reduced) {
      const f = 1 - (travelUntil - now) / 2600;
      sGoal = goal.s * (f < 0.55 ? 0.28 : 0.28 + (f - 0.55) / 0.45 * 0.72);
    }
    cam.s += (sGoal - cam.s) * (1 - Math.exp(-dt / 0.7));
    const sway = reduced || still ? 0 : 1;
    const yawGoal = sway * (Math.sin(t * 0.07) * 3.2 + (traveling ? Math.sign(goal.x - cam.x) * 7 : 0));
    const pitchGoal = sway * Math.sin(t * 0.09 + 1) * 1.6;
    cam.yaw += (yawGoal - cam.yaw) * (1 - Math.exp(-dt / 1.2));
    cam.pitch += (pitchGoal - cam.pitch) * (1 - Math.exp(-dt / 1.2));
    const dx = sway * Math.sin(t * 0.13) * 14 / cam.s * 0.2, dy = sway * Math.cos(t * 0.11) * 10 / cam.s * 0.2;
    world.style.transform = `translateZ(${(1000 - 1000 / cam.s).toFixed(1)}px) rotateX(${cam.pitch.toFixed(3)}deg) rotateY(${cam.yaw.toFixed(3)}deg) ` +
      `translate3d(${(-cam.x - dx).toFixed(1)}px, ${(-cam.y - dy).toFixed(1)}px, ${(-cam.z).toFixed(1)}px)`;
    placeSky(cam);
    if (M && shownImg) M.frame(now, { x: cam.x + dx, y: cam.y + dy }, stations[shownImg], shownImg, cam.s >= lastCover * 0.97);
    requestAnimationFrame(frame);
  }

  // ---------------------------------------------------------------- voices
  const synth = window.speechSynthesis;
  const canSpeak = !!synth && 'SpeechSynthesisUtterance' in window;
  let voices = [];
  const FEMALE = /female|zira|aria|jenny|samantha|karen|moira|tessa|victoria|susan|hazel|libby|sonia|natasha|serena|kate|fiona|allison|ava|nicky|joanna|emma|olivia|salli|kimberly|ivy|google us english|catherine|linda|heather|michelle|sara|clara|shelley|flo|grandma|martha|nora/i;
  const MALE = /\bmale|david|mark|guy|daniel|alex|fred|tom|aaron|arthur|rishi|oliver|george|james|ryan|eric|brian|christopher|roger|steffan|lee|reed|ralph|junior|thomas|gordon|evan|nathan/i;
  // which voice of its kind each character takes, so voices differ where the browser has several
  const SLOT = { narrator: 0, pilot: 0, prince: 0, rose: 1, fox: 1, king: 2, vainman: 1, drinker: 3, businessman: 2, lamplighter: 1, geographer: 3,
    snake: 2, desertflower: 2, echo: 0, roses: 1, switchman: 3, merchant: 1, grownups: 2 };
  let casting = {};
  function loadVoices() {
    if (!canSpeak) return;
    const all = synth.getVoices() || [];
    voices = all.filter(v => /^en[-_]/i.test(v.lang) || /^en$/i.test(v.lang));
    if (!voices.length) voices = all;
    const female = voices.filter(v => FEMALE.test(v.name));
    const male = voices.filter(v => !FEMALE.test(v.name) && MALE.test(v.name));
    casting = {};
    Object.keys(CAST.characters).forEach(id => {
      const c = CAST.characters[id];
      const list = (c.voice === 'female' ? female : male).length ? (c.voice === 'female' ? female : male) : voices;
      casting[id] = list.length ? list[(SLOT[id] || 0) % list.length] : null;
    });
    renderCast();
    $('voice-note').textContent = RECORDED.size ? recordedNote() : voices.length
      ? `${voices.length} English voice${voices.length > 1 ? 's' : ''} found (${female.length} female, ${male.length} male). Characters differ by voice and pitch.`
      : 'No speech voices in this browser: the film runs with subtitles only.';
  }

  // ---------------------------------------------------------------- playback
  let cur = 0, playing = false, token = 0, timer = null, watchdog = null;
  const speed = () => +$('speed').value;
  // Recorded voices (audio/<key>.mp3, listed in audio.js by tools/film-voices.py) are played when present; any other
  // line falls back to the browser's speech. <audio> is not fetch(), so this also works from file://.
  const AUDIO = window.LP_FILM_AUDIO || {};
  const RECORDED = new Set(typeof AUDIO === 'string' ? AUDIO.split(/\s+/).filter(Boolean) : Object.keys(AUDIO));
  const keyOf = (step) => {
    const who = step.who || 'narrator', c = CAST.characters[who] || CAST.characters.narrator;
    return S.audioKey(who, step.say, c.tts);
  };
  const clipOf = (step) => {
    if (!step || !step.say || !RECORDED.size) return null;
    const key = keyOf(step);
    return RECORDED.has(key) ? `audio/${key}.mp3` : null;
  };
  let clip = null, nextClip = null;
  function preloadAfter(i) {
    for (let k = i + 1; k < Math.min(steps.length, i + 4); k++) {
      const url = clipOf(steps[k]);
      if (url) { if (!nextClip || nextClip.dataset.url !== url) { nextClip = new Audio(url); nextClip.preload = 'auto'; nextClip.dataset.url = url; } return; }
    }
  }
  const voiceOn = () => $('voice-on').checked && (RECORDED.size > 0 || (canSpeak && voices.length > 0));
  const words = (t) => (t || '').split(/\s+/).filter(Boolean).length;
  function duration(step) {
    if (step.kind === 'picture') return 2600;
    if (step.kind === 'title') return 5200;
    if (step.kind === 'card') return 3400;
    if (step.kind === 'end') return 6000;
    return (words(step.say) / 2.6 * 1000 + 700) / speed();
  }
  function gapAfter(i) {
    const a = steps[i], b = steps[i + 1];
    if (!b) return 0;
    if (a.kind !== 'line') return 500;
    if (b.para !== a.para) return 650 / speed();
    return (b.who !== a.who ? 320 : 120) / speed();
  }
  function stopAudio() {
    token++;
    clearTimeout(timer); clearTimeout(watchdog);
    if (M) M.stop();
    if (clip) { clip.pause(); clip.onended = clip.onerror = null; clip = null; }
    if (canSpeak) synth.cancel();
  }
  // Speak one step. Chrome cuts off utterances longer than about fifteen seconds, so a long line goes sentence by sentence.
  function speak(step, done) {
    const url = clipOf(step);
    if (url) { playClip(step, url, done); return; }
    speakSynth(step, done);
  }
  function playClip(step, url, done) {
    const my = token;
    const c = CAST.characters[step.who || 'narrator'] || CAST.characters.narrator;
    const a = nextClip && nextClip.dataset.url === url ? nextClip : new Audio(url);
    if (a === nextClip) nextClip = null;
    clip = a;
    let finished = false;
    const finish = () => { if (finished || my !== token) return; finished = true; clearTimeout(watchdog); clip = null; done(); };
    // a clip that cannot be played (missing file, no audio support) is read by the browser's speech instead
    const fallback = () => { if (finished || my !== token) return; finished = true; clearTimeout(watchdog); clip = null;
      if (canSpeak && voices.length) speakSynth(step, done); else done(); };
    watchdog = setTimeout(finish, duration(step) * 3 + 8000);
    a.playbackRate = speed();
    a.volume = c.volume || 1;
    a.onended = finish;
    a.onerror = fallback;
    // the mouths and the subtitle follow the voice's own clock (unaffected by the playback speed)
    if (M) M.start(step, url.slice(6, -4), () => (clip === a ? a.currentTime * 1000 : null));
    try { a.currentTime = 0; } catch (e) { /* not loaded yet */ }
    const p = a.play();
    if (p && p.catch) p.catch(fallback);
    preloadAfter(cur);
  }
  function speakSynth(step, done) {
    const my = token;
    const c = CAST.characters[step.who || 'narrator'] || CAST.characters.narrator;
    const v = casting[step.who || 'narrator'];
    const pieces = [];
    for (const m of step.say.match(/[^.!?…]+[.!?…]*["')]*\s*/g) || [step.say]) {
      if (pieces.length && (pieces[pieces.length - 1].length < 60 || m.trim().length < 20)) pieces[pieces.length - 1] += m; else pieces.push(m);
    }
    let finished = false;
    const finish = () => { if (finished || my !== token) return; finished = true; clearTimeout(watchdog); if (M) M.stop(); done(); };
    if (M) M.start(step, null, null);
    const wordsIn = (t) => (t.match(M ? M.WORD : /\S+/g) || []).length;
    // some engines never fire onend: move on after a generous estimate
    watchdog = setTimeout(finish, duration(step) * 2.2 + 4000);
    const say = (k) => {
      if (my !== token) return;
      if (k >= pieces.length) { finish(); return; }
      const u = new SpeechSynthesisUtterance(pieces[k].trim());
      if (v) { u.voice = v; u.lang = v.lang; } else u.lang = 'en-US';
      u.pitch = c.pitch || 1;
      u.rate = Math.min(2, (c.rate || 1) * speed() * 0.95);
      u.volume = c.volume || 1;
      u.onend = () => say(k + 1);
      // word boundaries light the word in the subtitle and move the speaker's mouth
      const before = pieces.slice(0, k).reduce((n, p) => n + wordsIn(p), 0);
      u.onboundary = (e) => { if (M && my === token && (!e.name || e.name === 'word')) M.boundary(before + wordsIn(pieces[k].trim().slice(0, e.charIndex))); };
      u.onerror = (e) => { if (e.error === 'interrupted' || e.error === 'canceled') return; say(k + 1); };
      synth.speak(u);
    };
    setTimeout(() => say(0), 40);
  }
  function perform() {
    const step = steps[cur];
    const my = ++token;
    const next = () => {
      if (my !== token) return;
      if (cur >= steps.length - 1) { setPlaying(false); return; }
      timer = setTimeout(() => { if (my === token) show(cur + 1, true); }, gapAfter(cur));
    };
    const spoken = step.kind === 'line' || step.kind === 'card' || step.kind === 'title';
    if (spoken && voiceOn() && step.say) {
      const minWait = step.kind === 'line' ? 0 : duration(step);
      const start = performance.now();
      speak(step, () => { const left = minWait - (performance.now() - start); if (left > 0) timer = setTimeout(next, left); else next(); });
    } else timer = setTimeout(next, duration(step));
  }
  function setPlaying(on) {
    playing = on;
    $('play').textContent = on ? '❚❚' : '▶';
    if (!on) stopAudio();
    else perform();
    idleKick();
  }

  let shownImg = null, paraZoom = {};
  function show(i, autoplay) {
    stopAudio();
    cur = Math.max(0, Math.min(steps.length - 1, i));
    const step = steps[cur];
    const sh = shot(step.img);
    document.body.dataset.tone = sh.tone || 'space';
    // board and camera: the board we leave stays visible during the flight, then hides
    const order = Object.keys(stations);
    const at = order.indexOf(step.img);
    if (M) M.cut(step.img);
    const prevImg = shownImg;
    prunePanels([order[at - 1], step.img, order[at + 1], prevImg].filter(Boolean));
    unfold(step.img);
    if (prevImg !== step.img) {
      if (prevImg) {
        travelUntil = performance.now() + 2600;
        setTimeout(() => { if (shownImg !== prevImg) hidePanel(prevImg); }, 2700);
      }
      shownImg = step.img;
    }
    if (order[at + 1]) setTimeout(() => { if (shownImg === step.img) ensurePanel(order[at + 1]); }, 3000);
    // shots: a wide view of the board in space, the board filling the screen, or a close-up on whoever speaks
    const fit = fitScale(), cover = coverScale();
    let point = sh.focus || [0.5, 0.5], scale = fit;
    if (step.kind === 'line') {
      const who = step.who !== 'narrator' && step.who !== 'echo' && sh[step.who];
      if (who) { point = who; scale = cover * (step.who === 'rose' || step.who === 'snake' || step.who === 'desertflower' ? 1.7 : 1.4); }
      else {
        // narration changes shot with each paragraph: wide, full, closer on the centre of interest
        if (!(step.para in paraZoom)) paraZoom[step.para] = [fit * 1.02, cover, cover * 1.2][Object.keys(paraZoom).length % 3];
        scale = paraZoom[step.para];
      }
    } else if (step.kind === 'picture') scale = fit * 1.05;
    else scale = fit * 0.92;
    lastCover = cover;
    aim(step.img, point, scale, M ? M.drift(step) : null);
    if (step.kind === 'card' || step.kind === 'title' || step.kind === 'end') showCard(step);
    else if (cardEl) showCard(null);
    renderSubtitle(step);
    finishShow(step, autoplay);
  }
  function finishShow(step, autoplay) {
    renderWhere(step);
    $('progress-fill').style.width = (cur / (steps.length - 1) * 100).toFixed(2) + '%';
    store.set({ i: cur, n: steps.length });
    if (autoplay && playing) perform();
  }

  function renderSubtitle(step) {
    const box = $('subtitle');
    if (step.kind !== 'line') { box.classList.add('hide'); return; }
    box.classList.remove('hide');
    const c = CAST.characters[step.who] || CAST.characters.narrator;
    box.style.setProperty('--c', c.color);
    box.querySelector('.who').textContent = step.who === 'narrator' ? 'Narrator' : c.name;
    box.querySelector('.who').style.visibility = step.who === 'narrator' ? 'hidden' : 'visible';
    const line = box.querySelector('.line');
    if (M) M.subtitle(line, step); else line.textContent = step.text;
    line.className = 'line ' + (step.who === 'narrator' ? 'narration' : 'speech');
    box.querySelector('.ko').textContent = $('ko-on').checked && step.who !== 'narrator' ? c.ko : '';
  }
  function renderWhere(step) {
    const sc = SCENES.find(x => x.num === step.ch);
    $('where').textContent = step.ch ? `Chapter ${ROMAN[step.ch]}${sc ? ' · ' + sc.title : ''}` : 'Dedication';
    document.querySelectorAll('#chapter-list button').forEach(b => b.classList.toggle('current', +b.dataset.ch === step.ch));
  }

  // ---------------------------------------------------------------- UI
  function chapterOf(i) { return steps[i].ch; }
  function jumpChapter(d) {
    if (d > 0 && chapterOf(cur) >= 27) { show(steps.length - 1, true); return; }
    const ch = Math.max(1, Math.min(27, (chapterOf(cur) || 0) + d));
    if (d < 0 && chapterStart[chapterOf(cur)] < cur - 1 && chapterOf(cur) > 0) show(chapterStart[chapterOf(cur)], true);
    else show(d < 0 && chapterOf(cur) <= 1 ? 0 : chapterStart[ch], true);
  }
  $('play').onclick = () => setPlaying(!playing);
  $('next').onclick = () => show(cur + 1, true);
  $('prev').onclick = () => show(cur - 1, true);
  $('next-ch').onclick = () => jumpChapter(1);
  $('prev-ch').onclick = () => jumpChapter(-1);
  $('full').onclick = () => { if (document.fullscreenElement) document.exitFullscreen(); else if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen().catch(() => {}); };
  $('voice-on').onchange = () => { if (playing) { stopAudio(); perform(); } };
  $('ko-on').onchange = () => { renderSubtitle(steps[cur]); buildMenu(); };
  $('progress').onclick = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    let i = Math.round((e.clientX - r.left) / r.width * (steps.length - 1));
    while (i > 0 && steps[i - 1].para === steps[i].para) i--;   // start at the beginning of the paragraph
    show(i, true);
  };
  $('back').href = location.protocol === 'file:' ? '../../../index.html#/books/little-prince' : '../';
  document.querySelectorAll('.sheet .close').forEach(b => { b.onclick = () => { b.closest('.sheet').hidden = true; }; });
  $('menu-btn').onclick = () => { $('cast').hidden = true; $('menu').hidden = !$('menu').hidden; };
  $('cast-btn').onclick = () => { $('menu').hidden = true; $('cast').hidden = !$('cast').hidden; };

  function buildMenu() {
    const ko = $('ko-on').checked;
    $('chapter-list').innerHTML = `<li><button data-ch="0" data-i="0"><span class="n">—</span>Title and dedication</button></li>` +
      SCENES.map(sc => `<li><button data-ch="${sc.num}" data-i="${chapterStart[sc.num]}"><span class="n">${ROMAN[sc.num]}</span>${sc.title}${ko ? `<span class="k">${sc.ko}</span>` : ''}</button></li>`).join('');
    document.querySelectorAll('#chapter-list button').forEach(b => { b.onclick = () => { $('menu').hidden = true; show(+b.dataset.i, true); if (!playing) setPlaying(true); }; });
    renderWhere(steps[cur]);
  }
  // Cast sheet: a face cut from the chapter plate where each character first appears clearly
  const PORTRAIT = { narrator: 'chapter-02:pilot', pilot: 'chapter-02:pilot', prince: 'chapter-08:prince', rose: 'chapter-08:rose', king: 'chapter-10:king',
    vainman: 'chapter-11:vainman', drinker: 'chapter-12:drinker', businessman: 'chapter-13:businessman', lamplighter: 'chapter-14:lamplighter',
    geographer: 'chapter-15:geographer', snake: 'chapter-17:snake', desertflower: 'chapter-18:desertflower', echo: 'chapter-19:focus',
    roses: 'chapter-20:roses', fox: 'chapter-21:fox', switchman: 'chapter-22:switchman', merchant: 'chapter-23:merchant', grownups: 'chapter-01:grownups' };
  const ORDER = ['narrator', 'prince', 'pilot', 'grownups', 'rose', 'king', 'vainman', 'drinker', 'businessman', 'lamplighter', 'geographer', 'snake',
    'desertflower', 'echo', 'roses', 'fox', 'switchman', 'merchant'];
  function renderCast() {
    const K = 5;   // zoom of the portrait crop
    $('cast-list').innerHTML = ORDER.map(id => {
      const c = CAST.characters[id];
      const [img, key] = (PORTRAIT[id] || 'cover:focus').split(':');
      const pt = (SHOTS[img] && (SHOTS[img][key] || SHOTS[img].focus)) || [0.5, 0.5];
      const px = ((pt[0] * K - 0.5) / (K - 1) * 100).toFixed(1), py = ((pt[1] * K * 0.75 - 0.5) / (K * 0.75 - 1) * 100).toFixed(1);
      const v = casting[id];
      const rec = RECORDED.size && c.tts ? c.tts.voice + (c.tts.shift ? ` +${c.tts.shift}` : '') : '';
      const face = `<span class="face" style="background-image:url(${src(img)});background-size:${K * 100}% auto;background-position:${px}% ${py}%"></span>`;
      return `<li style="--c:${c.color}">${face}` +
        `<span><span class="nm">${c.name}</span><br><span class="vc">${$('ko-on').checked ? c.ko + ' · ' : ''}${rec ? 'voice: ' + rec : v ? v.name.replace(/^(Microsoft|Google) /, '') : 'no voice'}${!rec && c.pitch !== 1 ? ` · pitch ${c.pitch}` : ''}</span></span></li>`;
    }).join('');
  }

  document.addEventListener('keydown', (e) => {
    if (e.target && /INPUT|SELECT|TEXTAREA/.test(e.target.tagName) && e.target.type !== 'checkbox' && e.target.type !== 'range') return;
    if (!$('splash').hidden) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); start(savedIndex() || 0); } return; }
    if (e.key === ' ' || e.key === 'k') { e.preventDefault(); setPlaying(!playing); }
    else if (e.key === 'ArrowRight') show(cur + 1, true);
    else if (e.key === 'ArrowLeft') show(cur - 1, true);
    else if (e.key === ']' || e.key === 'PageDown') jumpChapter(1);
    else if (e.key === '[' || e.key === 'PageUp') jumpChapter(-1);
    else if (e.key === 'f') $('full').click();
    else if (e.key === 'm') { $('voice-on').checked = !$('voice-on').checked; $('voice-on').onchange(); }
    else if (e.key === 'Escape') { $('menu').hidden = true; $('cast').hidden = true; }
    idleKick();
  });
  // hide the bars while the film plays and the pointer rests
  let idleTimer = null;
  function idleKick() {
    document.body.classList.remove('idle');
    clearTimeout(idleTimer);
    if (playing) idleTimer = setTimeout(() => { if (playing && $('menu').hidden && $('cast').hidden) document.body.classList.add('idle'); }, 3500);
  }
  ['mousemove', 'touchstart', 'pointerdown'].forEach(ev => document.addEventListener(ev, idleKick, { passive: true }));
  window.addEventListener('resize', () => { paraZoom = {}; show(cur, false); });

  const saved = store.get();
  const savedIndex = () => (saved && saved.n === steps.length && saved.i > 0 ? saved.i : 0);
  if (savedIndex()) {
    const s = steps[savedIndex()];
    const sc = SCENES.find(x => x.num === s.ch);
    $('resume').hidden = false;
    $('resume').textContent = `Continue · Chapter ${ROMAN[s.ch] || ''}${sc ? ' · ' + sc.title : ''}`;
  }
  function start(i) {
    $('splash').hidden = true;
    show(i, false);
    setPlaying(true);
  }
  $('start').onclick = () => start(0);
  $('speed').addEventListener('input', () => { if (clip) clip.playbackRate = speed(); });
  function recordedNote() {
    const spoken = steps.filter(s => s.say).length, have = steps.filter(s => clipOf(s)).length;
    return have >= spoken ? 'Recorded voices: each character has their own voice.'
      : `Recorded voices for ${Math.round(have / spoken * 100)}% of the lines; the rest is read by the browser's voice.`;
  }

  $('resume').onclick = () => { let i = savedIndex(); while (i > 0 && steps[i - 1].para === steps[i].para) i--; start(i); };

  buildMenu();
  renderCast();
  if (canSpeak) {
    loadVoices();
    if (synth.addEventListener) synth.addEventListener('voiceschanged', loadVoices); else synth.onvoiceschanged = loadVoices;
  } else $('voice-note').textContent = RECORDED.size ? recordedNote() : 'This browser cannot speak: the film runs with subtitles only.';
  show(savedIndex(), false);
  // start far out in space and glide in behind the splash
  cam.s = fitScale() * 0.2; cam.x = goal.x - 1800; cam.y = goal.y + 400;
  requestAnimationFrame(frame);
  window.LP_FILM = { steps, show, stations, get cur() { return cur; }, get playing() { return playing; }, casting: () => casting, motion: M,
    still(on) { still = !!on; }, aim(img, point, s) { aim(img, point, s); }, fitScale, coverScale };
})();

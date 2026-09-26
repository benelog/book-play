/* The Little Prince film — motion on the pictures (motion.md): depth layers that slide against each other as the camera
   drifts (parallax), blinking eyes, mouths that open with the recorded voice, and the word being spoken lit up in the
   subtitle. Everything comes from files made in advance, because nothing can be measured from file:// at run time:
   layers.js (tools/film-layers.py) and timing.js (tools/film-timing.py).
   film.js calls the hooks below. ?motion=0 turns the motion off (the plain pictures, as before); with
   prefers-reduced-motion only the subtitle word highlight stays. */
window.LP_FILM_MOTION = (function () {
  const LAYERS = window.LP_FILM_LAYERS || {}, TIMING = window.LP_FILM_TIMING || {};
  const off = /[?&]motion=0\b/.test(location.search);
  const reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const moving = !off && !reduced;
  // the film's words: runs of letters/digits with inner apostrophes (tools/film-timing.py WORD)
  const WORD = /[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu;
  const rand = (a, b) => a + Math.random() * (b - a);

  // ---------------------------------------------------------------- panels
  const boards = {};   // img -> { el, far: [{el, k}], faces: {who: {eyes, half, open, blink}} }
  const pct = (v) => (v * 100).toFixed(3) + '%';
  function build(panel, img, url) {
    const L = LAYERS[img];
    if (!moving || !L) return;
    const pic = document.createElement('div');
    pic.className = 'pic';
    // the plain picture stays at the bottom: it shows until the layers load, and if a layer file fails
    pic.innerHTML = `<img alt="" class="base" src="${url}">`;
    const b = { el: pic, far: [], faces: {}, blurred: false };
    const dir = url.replace(/[^/]*$/, '').replace(/pictures\/$/, '') + 'layers/' + img + '/';
    (L.layers || []).forEach(l => {
      const el = document.createElement('img');
      el.alt = '';
      el.className = 'layer' + (l.far ? ' far' : '');
      el.style.cssText = `left:${pct(l.x)};top:${pct(l.y)};width:${pct(l.w)};height:${pct(l.h)}`;
      el.onerror = () => { pic.querySelectorAll('.layer').forEach(x => x.remove()); b.far = []; };
      el.src = dir + l.src;
      pic.appendChild(el);
      if (l.k !== 1) b.far.push({ el, k: l.k, m: [-l.x * 1200, -l.y * 900] });
    });
    Object.keys(L.faces || {}).forEach(who => {
      const f = L.faces[who], parts = {};
      ['eyes', 'half', 'open'].forEach((part, i) => {
        const el = document.createElement('div');
        el.className = 'face ' + part;
        el.style.cssText = `left:${pct(f.x)};top:${pct(f.y)};width:${pct(f.w)};height:${pct(f.h)};` +
          `background-image:url("${dir + f.src}");background-position:${i * 50}% 0`;
        pic.appendChild(el);
        parts[part] = el;
      });
      parts.blink = { next: performance.now() + rand(1500, 5000), until: 0, again: false };
      parts.who = f.who || who;   // a second grown-up is 'grownups2' in layers.js but speaks as 'grownups'
      parts.mouth = 0; parts.mouthAt = 0;
      b.faces[who] = parts;
    });
    const old = panel.querySelector('img:not(.base)');
    panel.insertBefore(pic, old);
    if (old) old.remove();
    boards[img] = b;
  }
  function drop(img) { delete boards[img]; }

  // ---------------------------------------------------------------- the line being spoken
  let line = null;   // { step, key, t: () => ms | null, words: [[s, e]], spans: [el], synth: { word, at } }
  let fixed = null;  // seek(): a fixed time in the line for screenshots
  let pose = null;   // pose(): fixed eyes / mouth for screenshots
  let cutAt = 0, shown = null;
  function cut(img) { if (img !== shown) { shown = img; cutAt = performance.now(); } }
  function start(step, key, clock) {
    const T = key && TIMING[key];
    line = { step, words: T && T.words && T.words.length ? T.words : null, mouth: T ? T.mouth : '', t: clock || null, spans: line && line.step === step ? line.spans : [],
      synth: null };
  }
  function stop() { if (line) { line.t = null; line.synth = null; } }
  // the browser's speech: a word boundary (index of the word in the line) opens the mouth for a moment
  function boundary(i) { if (line) line.synth = { word: i, at: performance.now() }; }

  // ---------------------------------------------------------------- subtitle words
  function subtitle(el, step) {
    const text = step.text || '';
    let html = '', last = 0, n = 0;
    const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
    for (const m of text.matchAll(WORD)) {
      html += esc(text.slice(last, m.index)) + `<span class="w" data-i="${n++}">${esc(m[0])}</span>`;
      last = m.index + m[0].length;
    }
    el.innerHTML = html + esc(text.slice(last));
    const spans = [...el.querySelectorAll('.w')];
    if (line && line.step === step) line.spans = spans;
    else line = { step, words: null, mouth: '', t: null, spans, synth: null };
    lit = -1;
  }
  let lit = -1;
  function light(i) {
    if (!line || i === lit) return;
    if (lit >= 0 && line.spans[lit]) line.spans[lit].classList.remove('now');
    lit = i;
    if (i >= 0 && line.spans[i]) line.spans[i].classList.add('now');
  }

  // ---------------------------------------------------------------- every frame
  const shapeOf = (d) => d >= 7 ? 2 : d >= 4 ? 1 : 0;
  function frame(now, cam, st, img, closeUp) {
    // where we are in the line
    let ms = null;
    if (line) ms = fixed !== null ? fixed : line.t ? line.t() : null;
    let word = -1, inWord = false;
    if (line && line.words && ms !== null) {
      for (let i = 0; i < line.words.length; i++) {
        if (ms >= line.words[i][0] - 30) { word = i; inWord = ms <= line.words[i][1] + 40; } else break;
      }
    } else if (line && line.synth) { word = line.synth.word; inWord = now - line.synth.at < 160; }
    light(word);
    const b = moving && boards[img];
    if (!b) return;
    // parallax: layers further away than the picture plane move part of the way with the camera (less up and down,
    // where the far layer's ground would show above the edge of the near ground)
    const dx = cam.x - st.x, dy = cam.y - st.y;
    for (const l of b.far) {
      const lim = Math.min(l.m[0], l.m[1]) * 0.9;
      const tx = Math.max(-lim, Math.min(lim, dx * (1 - l.k))), ty = Math.max(-lim, Math.min(lim, dy * (1 - l.k) * 0.35));
      l.el.style.transform = `translate(${tx.toFixed(2)}px, ${ty.toFixed(2)}px)`;
      // the far layer goes soft in close-ups (a fixed value, so it is not redrawn every frame)
      if (closeUp !== b.blurred) l.el.classList.toggle('soft', closeUp);
    }
    b.blurred = closeUp;
    // faces
    const speaker = line && line.step && line.step.kind === 'line' ? line.step.who : null;
    for (const who in b.faces) {
      const f = b.faces[who];
      // blink every 3-6 s, now and then twice; never in the first half second after a cut
      let closed = false;
      if (pose && pose.eyes) closed = pose.eyes === 'closed';
      else {
        if (now >= f.blink.next && now - cutAt > 500) {
          f.blink.until = now + 130;
          f.blink.next = f.blink.again ? now + 320 : now + rand(3000, 6000);
          f.blink.again = !f.blink.again && Math.random() < 0.1;
        }
        closed = now < f.blink.until;
      }
      f.eyes.classList.toggle('on', closed);
      // mouth: the speaker's voice, held at least 80 ms per shape, shut between words
      let shape = 0;
      if (pose && pose.mouth !== undefined) shape = pose.mouth;
      else if (f.who === speaker && ms !== null && line.mouth) {
        const d = +line.mouth[Math.floor(ms / 50)] || 0;
        shape = line.words && !inWord ? 0 : shapeOf(d);
      } else if (f.who === speaker && line.synth && inWord) shape = line.synth.word % 3 === 1 ? 2 : 1;
      if (shape !== f.mouth && now - f.mouthAt >= 80) {
        f.mouth = shape; f.mouthAt = now;
        f.half.classList.toggle('on', shape === 1);
        f.open.classList.toggle('on', shape === 2);
      }
    }
  }

  // camera drift while a line is spoken, so the layers move: each line aims a little to one side, and narration keeps
  // flowing one way through its paragraph
  let driftPara = null, driftDir = 1, driftN = 0;
  function drift(step) {
    if (!moving || step.kind !== 'line') return [0, 0];
    if (step.para !== driftPara) { driftPara = step.para; driftDir = -driftDir; driftN = 0; } else driftN++;
    const x = step.who === 'narrator' ? driftDir * Math.min(120, -40 + driftN * 40) : driftDir * (driftN % 2 ? 40 : -40);
    return [x, driftN % 2 ? 8 : -8];
  }

  return {
    enabled: moving, build, drop, cut, start, stop, boundary, subtitle, frame, drift, WORD,
    // for screenshots and checks: fix the time in the line (ms, or null to let it run) and the face shapes
    seek(ms) { fixed = ms; },
    pose(p) { pose = p || null; },
    has: (img) => !!LAYERS[img]
  };
})();

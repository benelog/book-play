/* Audiobook player: plays a list of spoken steps one after another — the recorded MP3 when a step has one, else the
   browser's speech — and keeps going with the phone's screen off until the book ends.
   One <audio> element carries everything: the recordings, and a quiet loop while the browser voice speaks and in the
   pauses between lines. So the page is always playing media: the phone keeps it running in the background, and the
   lock screen and headphone buttons control it through the Media Session API. The loop is a 20 Hz hum at -40 dBFS:
   below hearing and what earphones can play, but loud enough that the browser counts the page as playing sound.
   Browser speech with the screen off depends on the phone (Android Chrome usually keeps going, iOS Safari stops);
   recorded books do not depend on it. */
window.LP_LISTEN = (function () {
  const synth = window.speechSynthesis;
  const canSpeak = !!synth && 'SpeechSynthesisUtterance' in window;
  const ms = 'mediaSession' in navigator ? navigator.mediaSession : null;
  const audio = new Audio();
  audio.preload = 'auto';
  const pre = new Audio();          // warms the cache for the next recording
  pre.preload = 'auto';
  pre.muted = true;

  let hum = null;
  function humUrl() {
    if (hum) return hum;
    const rate = 8000, n = rate * 10, buf = new ArrayBuffer(44 + n * 2), v = new DataView(buf);
    const str = (o, s) => { for (let i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i)); };
    str(0, 'RIFF'); v.setUint32(4, 36 + n * 2, true); str(8, 'WAVE'); str(12, 'fmt ');
    v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true); v.setUint32(24, rate, true);
    v.setUint32(28, rate * 2, true); v.setUint16(32, 2, true); v.setUint16(34, 16, true); str(36, 'data'); v.setUint32(40, n * 2, true);
    for (let i = 0; i < n; i++) v.setInt16(44 + i * 2, Math.round(328 * Math.sin(2 * Math.PI * 20 * i / rate)), true);   // 200 whole cycles: loops without a click
    hum = URL.createObjectURL(new Blob([buf], { type: 'audio/wav' }));
    return hum;
  }

  /* o: { steps,                 [{ say, ch, … }]
          src(i) -> url | null,  the recording of step i
          voice(i) -> { pitch }, browser speech settings for step i (rate comes from setRate)
          gap(i) -> ms,          pause after step i (at speed 1)
          meta(i) -> { title, artist, album, artwork },   lock-screen information (asked again when it changes)
          onStep(i, auto), onState(playing), onEnd(), onProblem(message) } */
  let o = null, i = 0, playing = false, rate = 1, token = 0, mode = null, timer = null, watch = null, srcAt = 0, metaKey = '';
  const abs = (u) => new URL(u, location.href).href;

  function setSrc(url, loop) {
    if (audio.src !== abs(url)) { audio.src = url; srcAt = Date.now(); }
    audio.loop = loop;
    audio.defaultPlaybackRate = audio.playbackRate = loop ? 1 : rate;
  }
  const start = () => { const p = audio.play(); if (p && p.catch) p.catch(err => { if (err && err.name === 'NotAllowedError') blocked(); }); };
  function blocked() {
    if (!playing) return;
    pause();
    o && o.onProblem && o.onProblem('The browser blocked playback. Press play to start.');
  }
  function clearTimers() { clearTimeout(timer); clearTimeout(watch); timer = watch = null; }
  function keepAlive() { setSrc(humUrl(), true); if (audio.paused) start(); }

  function updateMeta() {
    if (!ms || !o || !o.meta) return;
    const m = o.meta(i) || {};
    const key = JSON.stringify(m);
    if (key === metaKey) return;
    metaKey = key;
    try {
      ms.metadata = new MediaMetadata({ title: m.title || '', artist: m.artist || '', album: m.album || '',
        artwork: m.artwork ? [{ src: abs(m.artwork), sizes: '512x512' }] : [] });
    } catch (e) { /* MediaMetadata missing */ }
  }
  function setState(p) {
    playing = p;
    if (ms) ms.playbackState = p ? 'playing' : 'paused';
    o && o.onState && o.onState(p);
  }

  function run(t, auto) {
    if (t !== token || !playing) return;
    clearTimers();
    if (i >= o.steps.length) { finish(); return; }
    o.onStep && o.onStep(i, auto);
    updateMeta();
    const url = o.src(i), next = o.src(i + 1);
    if (next && pre.src !== abs(next)) pre.src = next;
    if (url) { mode = 'file'; setSrc(url, false); start(); return; }
    speak(t, 0, 0);
  }
  // Browser voices may stop in a long utterance: a long line is spoken in pieces cut after a comma, semicolon or colon.
  function pieces(text) {
    if (text.length <= 180) return [text];
    const out = [];
    let cur = '';
    for (const p of text.split(/(?<=[,;:])\s+/)) {
      if (cur && (cur + ' ' + p).length > 180) { out.push(cur); cur = p; } else cur = cur ? cur + ' ' + p : p;
    }
    if (cur) out.push(cur);
    return out;
  }
  function speak(t, attempt, part) {
    const parts = pieces(o.steps[i].say);
    part = part || 0;
    const text = parts[part];
    mode = 'speech';
    keepAlive();
    const guess = 2500 + 1000 * text.length / (13 * rate);
    const done = () => { if (part + 1 < parts.length) speak(t, 0, part + 1); else after(t); };
    if (!canSpeak) { watch = setTimeout(() => t === token && done(), guess); return; }
    clearTimeout(watch);
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const v = (o.voice && o.voice(i)) || {};
    if (v.voice) { u.voice = v.voice; u.lang = v.voice.lang; } else u.lang = 'en-US';
    u.rate = rate; u.pitch = v.pitch || 1;
    let started = false;
    u.onstart = () => { started = true; };
    u.onend = () => { if (t === token) { clearTimeout(watch); done(); } };
    u.onerror = (e) => { if (t !== token || e.error === 'interrupted' || e.error === 'canceled') return; clearTimeout(watch); done(); };
    synth.speak(u);
    // Some browsers never report the end of an utterance, or drop speech in the background: move on after a generous
    // guess; if speech never even started, try once more, then stop (rather than race through the book in silence).
    watch = setTimeout(() => {
      if (t !== token) return;
      if (started) { done(); return; }
      if (attempt < 1) { speak(t, attempt + 1, part); return; }
      pause();
      o.onProblem && o.onProblem('The browser voice stopped (some phones stop it when the screen is off). Press play to go on.');
    }, Math.max(6000, guess * 2));
  }
  function after(t) {
    if (t !== token || !playing) return;
    clearTimers();
    const gap = (o.gap ? o.gap(i) : 300) / rate;
    i++;
    if (gap > 30 && i < o.steps.length) {
      mode = 'gap';
      keepAlive();
      timer = setTimeout(() => run(t, true), gap);
    } else run(t, true);
  }
  function finish() {
    token++; clearTimers(); mode = null;
    audio.pause(); audio.removeAttribute('src'); audio.load();
    i = Math.max(0, o.steps.length - 1);
    setState(false);
    o.onEnd && o.onEnd();
  }

  audio.addEventListener('ended', () => { if (playing && mode === 'file') after(token); });
  audio.addEventListener('error', () => {
    // a missing or broken recording: the browser voice reads that step instead
    if (playing && mode === 'file' && audio.src && !audio.src.startsWith('blob:')) speak(token, 0, 0);
  });
  audio.addEventListener('pause', () => {
    // paused from outside (headphones unplugged, a phone call): follow it. Our own source changes are ignored.
    if (playing && mode === 'file' && !audio.ended && Date.now() - srcAt > 800) { token++; clearTimers(); setState(false); }
  });

  function go(k, auto) {
    token++; clearTimers();
    if (canSpeak) synth.cancel();
    i = Math.max(0, Math.min(k, o.steps.length - 1));
    setState(true);
    run(token, !!auto);
  }
  function pause() {
    if (!o) return;
    token++; clearTimers();
    if (canSpeak) synth.cancel();
    audio.pause();
    setState(false);
  }
  function resume() {
    if (!o) return;
    // a recording paused half-way goes on from there; speech and pauses start the step again
    if (mode === 'file' && o.src(i) && audio.src === abs(o.src(i)) && !audio.ended && audio.currentTime > 0) {
      token++; setState(true); audio.playbackRate = rate; start(); return;
    }
    go(i);
  }
  function stop() {
    token++; clearTimers();
    if (canSpeak) synth.cancel();
    audio.pause(); audio.removeAttribute('src'); audio.load(); pre.removeAttribute('src');
    mode = null; metaKey = '';
    if (playing) setState(false);
    if (ms) { try { ms.metadata = null; } catch (e) { /* ignore */ } ms.playbackState = 'none'; }
  }

  if (ms) {
    const on = (action, fn) => { try { ms.setActionHandler(action, fn); } catch (e) { /* unsupported action */ } };
    on('play', () => o && resume());
    on('pause', () => pause());
    on('stop', () => pause());
    on('nexttrack', () => o && o.chapter && go(o.chapter(i, +1)));
    on('previoustrack', () => o && o.chapter && go(o.chapter(i, -1)));
    on('seekforward', () => o && go(i + 1));
    on('seekbackward', () => o && go(i - 1));
  }

  return {
    canSpeak,
    load(opts, at) { stop(); o = opts; i = Math.max(0, Math.min(at || 0, opts.steps.length - 1)); },
    play: (k) => go(k == null ? i : k),
    pause, resume, stop,
    toggle() { if (playing) pause(); else resume(); },
    setRate(r) {
      rate = Math.min(3, Math.max(0.5, Number(r) || 1));
      if (mode === 'file') audio.defaultPlaybackRate = audio.playbackRate = rate;
      else if (playing && mode === 'speech') go(i);   // the browser voice takes a new speed with the next utterance: say this one again
    },
    index: () => i,
    isPlaying: () => playing
  };
})();

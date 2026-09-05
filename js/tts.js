/* Web Speech API wrapper. Speaks sentence by sentence (Chrome drops long utterances),
   reports which sentence is playing, and cancels cleanly on scene change. */
window.LP_TTS = (function () {
  const synth = window.speechSynthesis;
  const supported = !!synth && 'SpeechSynthesisUtterance' in window;
  let voices = [];
  let queue = [];
  let idx = 0;
  let playing = false;
  let paused = false;
  let session = 0;         // incremented on every cancel so stale callbacks are ignored
  let rate = 0.95;
  let voiceName = null;
  let handlers = {};
  const listeners = [];

  function refreshVoices() {
    if (!supported) return;
    const all = synth.getVoices() || [];
    voices = all.filter(v => /^en[-_]?/i.test(v.lang));
    if (!voices.length) voices = all;
    listeners.forEach(fn => fn(voices));
  }
  if (supported) {
    refreshVoices();
    if (typeof synth.addEventListener === 'function') synth.addEventListener('voiceschanged', refreshVoices);
    else synth.onvoiceschanged = refreshVoices;
  }

  function pickVoice() {
    if (!voices.length) return null;
    if (voiceName) { const v = voices.find(v => v.name === voiceName); if (v) return v; }
    const pref = ['Google US English', 'Google UK English Female', 'Samantha', 'Daniel', 'Microsoft Aria', 'Microsoft Zira'];
    for (const p of pref) { const v = voices.find(v => v.name.startsWith(p)); if (v) return v; }
    return voices.find(v => /en[-_]US/i.test(v.lang)) || voices[0];
  }

  function speakNext(mySession) {
    if (mySession !== session || !playing) return;
    if (idx >= queue.length) {
      playing = false;
      handlers.onEnd && handlers.onEnd();
      return;
    }
    const u = new SpeechSynthesisUtterance(queue[idx]);
    u.rate = rate;
    u.lang = 'en-US';
    const v = pickVoice();
    if (v) { u.voice = v; u.lang = v.lang; }
    const current = idx;
    u.onstart = () => { if (mySession === session) handlers.onSentence && handlers.onSentence(current); };
    u.onend = () => { if (mySession !== session) return; idx = current + 1; speakNext(mySession); };
    u.onerror = (e) => {
      if (mySession !== session) return;
      if (e.error === 'interrupted' || e.error === 'canceled') return;
      idx = current + 1; speakNext(mySession);
    };
    synth.speak(u);
  }

  function cancel() {
    session++;
    playing = false; paused = false; queue = []; idx = 0;
    if (supported) synth.cancel();
  }

  return {
    supported,
    voices: () => voices,
    onVoices(fn) { listeners.push(fn); if (voices.length) fn(voices); },
    setRate(r) { rate = Math.min(2, Math.max(0.5, Number(r) || 1)); },
    setVoice(name) { voiceName = name || null; },
    isPlaying: () => playing,
    isPaused: () => paused,
    speakList(sentences, h, startAt) {
      if (!supported) return false;
      cancel();
      queue = sentences.slice();
      idx = Math.max(0, startAt || 0);
      handlers = h || {};
      playing = true;
      speakNext(session);
      return true;
    },
    speakOnce(text) {
      if (!supported) return false;
      this.speakList([String(text)], {});
      return true;
    },
    pause() { if (supported && playing && !paused) { synth.pause(); paused = true; } },
    resume() { if (supported && playing && paused) { synth.resume(); paused = false; } },
    stop: cancel
  };
})();

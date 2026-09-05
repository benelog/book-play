/* localStorage wrapper, namespaced per book. Every read is guarded: a corrupted key never crashes startup. */
window.LP_STORAGE = (function () {
  const NS = 'lp.v1';
  const KEY_SETTINGS = `${NS}.settings`;      // global (answer mode, voice, rate …)
  let book = null;                             // current book id

  function read(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      const val = JSON.parse(raw);
      return val == null ? fallback : val;
    } catch (e) {
      console.warn('storage read failed', key, e);
      return fallback;
    }
  }
  function write(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); return true; }
    catch (e) { console.warn('storage write failed', key, e); return false; }
  }
  function remove(key) { try { localStorage.removeItem(key); } catch (e) { /* ignore */ } }
  const k = (name, id) => `${NS}.${id || book}.${name}`;

  function defaultProgress() {
    return { current: 1, completed: {}, read: {}, scene: {}, attempts: {}, updatedAt: null };
  }

  return {
    use(id) { book = id; },
    current: () => book,

    getChapters(id) { const c = read(k('chapters', id), null); return Array.isArray(c) && c.length ? c : null; },
    setChapters(chapters) { return write(k('chapters'), chapters); },
    clearChapters() { remove(k('chapters')); },

    getProgress(id) {
      const p = read(k('progress', id), null);
      const d = defaultProgress();
      if (!p || typeof p !== 'object') return d;
      return Object.assign(d, p);
    },
    setProgress(p) { p.updatedAt = new Date().toISOString(); return write(k('progress'), p); },
    resetProgress() { remove(k('progress')); return defaultProgress(); },

    // per-book info: text source, attribution, parser version, unlock-all flag
    getBookInfo(id) { return Object.assign({ source: null, credit: '', creditAuto: true, parserVersion: 0, freeMove: false }, read(k('book', id), {})); },
    setBookInfo(info) { return write(k('book'), info); },

    getSettings() { return Object.assign({ voice: null, rate: 0.95, autoRead: false, answerMode: 'type', koHelp: false }, read(KEY_SETTINGS, {})); },
    setSettings(s) { return write(KEY_SETTINGS, s); }
  };
})();

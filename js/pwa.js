/* PWA glue: registers sw.js (http(s) only — service workers do not exist on file://), offers the install
   prompt, shows a toast when a new version is waiting, and can store a whole book in the cache for offline reading. */
window.LP_PWA = (function () {
  const supported = 'serviceWorker' in navigator && /^https?:$/.test(location.protocol);
  const BOOKS_CACHE = 'bookplay-books';
  const IMG_EXT = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'];
  // site root: the <base href> injected for pretty URLs, else the directory of the current page
  const baseEl = document.querySelector('base');
  const root = (baseEl && baseEl.getAttribute('href')) || location.pathname.replace(/[^/]*$/, '');
  let reg = null, waiting = null, deferredPrompt = null, reloadOnChange = false;
  const installListeners = [];

  // ---------- toast ----------
  let toastEl = null, toastTimer = null;
  function toast(message, action, onAction, sticky) {
    if (!toastEl) { toastEl = document.createElement('div'); toastEl.className = 'pwa-toast'; toastEl.hidden = true; document.body.appendChild(toastEl); }
    clearTimeout(toastTimer);
    toastEl.innerHTML = `<span>${message}</span>${action ? `<button class="btn small">${action}</button>` : ''}<button class="x" aria-label="Dismiss">×</button>`;
    toastEl.hidden = false;
    const hide = () => { toastEl.hidden = true; };
    toastEl.querySelector('.x').onclick = hide;
    if (action) toastEl.querySelector('.btn').onclick = () => { hide(); onAction && onAction(); };
    if (!sticky) toastTimer = setTimeout(hide, 8000);
  }

  // ---------- registration + updates ----------
  function announce(sw) {
    waiting = sw;
    toast('A new version of Book Play is ready.', 'Reload', () => { reloadOnChange = true; sw.postMessage({ type: 'SKIP_WAITING' }); }, true);
  }
  if (supported) {
    navigator.serviceWorker.register(root + 'sw.js', { scope: root }).then(r => {
      reg = r;
      if (r.waiting && navigator.serviceWorker.controller) announce(r.waiting);
      r.addEventListener('updatefound', () => {
        const nw = r.installing;
        if (!nw) return;
        nw.addEventListener('statechange', () => { if (nw.state === 'installed' && navigator.serviceWorker.controller) announce(nw); });
      });
    }).catch(e => console.warn('service worker registration failed', e));
    navigator.serviceWorker.addEventListener('controllerchange', () => { if (reloadOnChange) { reloadOnChange = false; location.reload(); } });
  }

  // ---------- install prompt ----------
  window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferredPrompt = e; installListeners.forEach(fn => fn(true)); });
  window.addEventListener('appinstalled', () => { deferredPrompt = null; installListeners.forEach(fn => fn(false)); toast('Book Play is installed. Find it with your other apps.'); });
  const standalone = () => (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || navigator.standalone === true;

  // ---------- offline copy of a book ----------
  // Visited files land in the cache anyway (sw.js); a book counts as "saved" only after saveBook() fetched all of it,
  // which is remembered in localStorage under lp.v1.offline.
  const KEY_OFFLINE = 'lp.v1.offline';
  const readSaved = () => { try { return JSON.parse(localStorage.getItem(KEY_OFFLINE)) || {}; } catch (e) { return {}; } };
  const writeSaved = (m) => { try { localStorage.setItem(KEY_OFFLINE, JSON.stringify(m)); } catch (e) { /* ignore */ } };
  const bookId = (dir) => dir.replace(/\/$/, '').split('/').pop();
  // Caches scenes.js / art.js / text/book.js and one illustration per chapter (first extension that exists).
  async function saveBook(dir, chapters, onProgress) {
    if (!supported || !('caches' in window)) throw new Error('offline storage is not available here');
    const cache = await caches.open(BOOKS_CACHE);
    let saved = 0, step = 0;
    const total = chapters + 4;
    const tick = () => { step++; onProgress && onProgress(step, total); };
    const put = async (url) => {
      try {
        const r = await fetch(url, { cache: 'no-cache' });
        if (r.ok) { await cache.put(url, r); saved++; return true; }
      } catch (e) { /* missing file or offline */ }
      return false;
    };
    for (const f of ['scenes.js', 'art.js', 'text/book.js']) { await put(`${dir}/${f}`); tick(); }
    for (const c of ['cover.jpg', 'cover.png', 'cover.webp']) if (await put(`${dir}/images/${c}`)) break;
    tick();
    for (let n = 1; n <= chapters; n++) {
      const nn = String(n).padStart(2, '0');
      for (const ext of IMG_EXT) if (await put(`${dir}/images/chapter-${nn}.${ext}`)) break;
      tick();
    }
    const m = readSaved(); m[bookId(dir)] = { t: new Date().toISOString(), files: saved }; writeSaved(m);
    return saved;
  }
  async function isBookSaved(dir) {
    if (!supported || !('caches' in window)) return false;
    const rec = readSaved()[bookId(dir)];
    if (!rec) return false;
    try { const cache = await caches.open(BOOKS_CACHE); return !!(await cache.match(`${dir}/scenes.js`)); } catch (e) { return false; }
  }
  async function forgetBook(dir) {
    const m = readSaved(); delete m[bookId(dir)]; writeSaved(m);
    if (!supported || !('caches' in window)) return;
    const cache = await caches.open(BOOKS_CACHE);
    const keys = await cache.keys();
    const prefix = new URL(dir + '/', location.href).href;
    await Promise.all(keys.filter(r => r.url.startsWith(prefix)).map(r => cache.delete(r)));
  }

  return {
    supported, root, toast,
    canInstall: () => !!deferredPrompt,
    isStandalone: standalone,
    onInstallable(fn) { installListeners.push(fn); if (deferredPrompt) fn(true); },
    async install() {
      if (!deferredPrompt) return false;
      const p = deferredPrompt; deferredPrompt = null;
      p.prompt();
      const choice = await p.userChoice.catch(() => ({ outcome: 'dismissed' }));
      if (choice.outcome !== 'accepted') installListeners.forEach(fn => fn(false));
      return choice.outcome === 'accepted';
    },
    saveBook, isBookSaved, forgetBook
  };
})();

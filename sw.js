/* Book Play service worker.
   - The app shell (index.html, css, js, manifest, icons) is precached on install and served network-first,
     so it is always fresh online and still opens offline.
   - Book files (books/<id>/…) are cached as they are visited: scripts network-first, illustrations cache-first.
     "Save for offline" on a title page fills the same cache for a whole book (js/pwa.js).
   - Navigations to pretty URLs (/books/<id>/chapters/3) get the cached index.html, which also replaces the
     404.html redirect dance on GitHub Pages once the worker is installed.
   - Cross-origin requests (the dictionary APIs) are left alone; js/dict.js keeps its own cache in localStorage.
   Bump VERSION whenever a shell file changes so the new shell is precached and the "new version" toast appears. */
const VERSION = 'v2';
const SHELL = `bookplay-shell-${VERSION}`;
const BOOKS = 'bookplay-books';
const ROOT = new URL('./', self.location).pathname;          // '/' locally, '/book-play/' on GitHub Pages
const INDEX = ROOT + 'index.html';
const SHELL_FILES = ['', 'index.html', '404.html', 'css/style.css', 'js/storage.js', 'js/parser.js', 'js/matcher.js', 'js/tts.js',
  'js/dict.js', 'js/pwa.js', 'js/library.js', 'js/app.js', 'manifest.webmanifest',
  'icons/icon.svg', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-512.png', 'icons/apple-touch-icon.png']
  .map(p => ROOT + p);
const ROUTE = /\/books\/[^/]+(?:\/chapters\/\d+(?:\/(?:play|read))?)?\/?$/;

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(SHELL).then(cache => Promise.all(SHELL_FILES.map(url => cache.add(url).catch(err => console.warn('precache skipped', url, err))))));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('bookplay-shell-') && k !== SHELL).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('message', (e) => { if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting(); });

async function networkFirst(req, cacheName, fallback) {
  const cache = await caches.open(cacheName);
  try {
    const res = await fetch(req);
    if (res.ok) cache.put(req, res.clone());
    else if (fallback) { const alt = await cache.match(fallback); if (alt) return alt; }
    return res;
  } catch (err) {
    return (await cache.match(req)) || (fallback && await cache.match(fallback)) || Response.error();
  }
}
async function cacheFirst(req, cacheName) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (res.ok) cache.put(req, res.clone());
  return res;
}

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith(ROOT)) return;
  const path = url.pathname;
  if (req.mode === 'navigate') {
    // Pretty book URLs are always index.html; other pages are network-first with index.html as the offline fallback.
    if (ROUTE.test(path)) { e.respondWith(caches.match(INDEX).then(hit => hit || networkFirst(req, SHELL, INDEX))); return; }
    e.respondWith(networkFirst(req, SHELL, INDEX));
    return;
  }
  if (path.startsWith(ROOT + 'books/')) {
    e.respondWith(/\.(jpe?g|png|webp|gif|svg)$/i.test(path) ? cacheFirst(req, BOOKS) : networkFirst(req, BOOKS));
    return;
  }
  e.respondWith(networkFirst(req, SHELL));
});

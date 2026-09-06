/* Book Play — learn English with illustrated stories, adventure-game style.
   Library page → book page. Book assets load from books/<id>/ on demand. Works from file:// (no fetch). */
(function () {
  const SITE = 'Book Play';
  const S = window.LP_STORAGE, P = window.LP_PARSER, M = window.LP_MATCHER, T = window.LP_TTS, D = window.LP_DICT, PWA = window.LP_PWA;
  const LIBRARY = window.LP_LIBRARY || [];
  const IMG_EXT = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'];
  const MAX_MISSES = 3;

  const app = document.getElementById('app');
  let settings = S.getSettings();
  let view = { name: 'library' };
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // current book (set by initBook)
  let BOOK = null, SCENES = [], ART = null, ROLES = {}, TOTAL = 0, DIR = '';
  let chapters = null, progress = null, info = null;
  const imageCache = {};

  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const pad2 = (n) => String(n).padStart(2, '0');
  function roman(n) {
    const t = [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
    let s = ''; for (const [v, r] of t) while (n >= v) { s += r; n -= v; } return s;
  }
  const meta = (n) => SCENES.find(c => c.num === n);
  const chapterText = (n) => chapters ? chapters.find(c => c.num === n) : null;
  const save = () => S.setProgress(progress);
  const saveSettings = () => S.setSettings(settings);
  const saveInfo = () => S.setBookInfo(info);
  const isUnlocked = (n) => info.freeMove || n <= progress.current;
  const ko = (text) => settings.koHelp && text ? `<span class="ko-help">${esc(text)}</span>` : '';

  // ---------- script loading (file:// friendly) ----------
  function loadScript(src) {
    return new Promise(resolve => {
      const s = document.createElement('script');
      s.src = src; s.async = false;
      s.onload = () => resolve(true);
      s.onerror = () => { s.remove(); resolve(false); };
      document.head.appendChild(s);
    });
  }

  // generic placeholder art for books without art.js
  function genericArt(book) {
    const frame = (label) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" role="img">
      <rect width="800" height="600" fill="#f7efdd"/><rect x="24" y="24" width="752" height="552" fill="none" stroke="#6f7bb0" stroke-width="2"/>
      <text x="400" y="280" text-anchor="middle" font-family="Georgia, serif" font-size="34" fill="#3b3a4a">${esc(book.title)}</text>
      <text x="400" y="330" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="20" fill="#5a5a70">${esc(label)}</text></svg>`;
    return { chapter: (n) => frame(`Chapter ${roman(n)}`), cover: () => frame(book.author || '') };
  }

  // ---------- illustrations ----------
  function probeImage(n, cb) {
    if (n in imageCache) return cb(imageCache[n]);
    let i = 0;
    const tryNext = () => {
      if (i >= IMG_EXT.length) { imageCache[n] = false; return cb(false); }
      const url = `${DIR}/images/chapter-${pad2(n)}.${IMG_EXT[i++]}`;
      const img = new Image();
      img.onload = () => { imageCache[n] = url; cb(url); };
      img.onerror = tryNext;
      img.src = url;
    };
    tryNext();
  }
  function renderPicture(el, n, captionEl) {
    el.innerHTML = ART.chapter(n);
    if (captionEl) captionEl.textContent = 'Placeholder art';
    probeImage(n, url => {
      if (!url || view.name !== 'chapter' || view.num !== n) return;
      el.innerHTML = `<img src="${url}" alt="Chapter ${n} illustration">`;
      if (captionEl) captionEl.textContent = (BOOK.credits && BOOK.credits.images) ? BOOK.credits.images.what.replace(/,.*$/, '') : '';
    });
  }
  // cover for the shelf and the title page: images/cover.* → images/chapter-01.* → nothing
  function probeCover(dir, cb) {
    const tries = ['cover.jpg', 'cover.png', 'cover.webp', 'chapter-01.jpg', 'chapter-01.jpeg', 'chapter-01.png', 'chapter-01.webp'];
    let i = 0;
    const next = () => {
      if (i >= tries.length) return cb(false);
      const url = `${dir}/images/${tries[i++]}`;
      const img = new Image();
      img.onload = () => cb(url); img.onerror = next; img.src = url;
    };
    next();
  }
  // the open book: left page (plate) + right page (content). Returns the right page element.
  function bookShell(leftHtml, rightHtml, opts = {}) {
    app.innerHTML = `${topbar(opts.actions || '')}
      <div class="book-open">
        <div class="page left"><div class="plate-frame fresh">${leftHtml}</div>${opts.folioLeft ? `<span class="folio">${opts.folioLeft}</span>` : ''}</div>
        <div class="page right" id="page-right">${rightHtml}${opts.folioRight ? `<span class="folio">${opts.folioRight}</span>` : ''}</div>
      </div>${opts.after || ''}`;
    return document.getElementById('page-right');
  }
  function creditsHtml(book) {
    const c = book.credits;
    if (!c) return '';
    const row = (label, x) => x ? `<dt>${esc(label)}</dt><dd>${x.url ? `<a href="${esc(x.url)}" target="_blank" rel="noopener">${esc(x.what)}</a>` : esc(x.what)}<span class="lic">${esc(x.license)}</span></dd>` : '';
    return `<div class="credits"><h4>SOURCES &amp; LICENCES</h4><dl>${row('Text', c.text)}${row('Original', c.original)}${row('Illustrations', c.images)}</dl>
      ${book.textNote ? `<p class="note">${esc(book.textNote)}</p>` : ''}</div>`;
  }

  // ---------- typewriter ----------
  let typeTimer = null;
  function typewrite(el, text, done) {
    clearInterval(typeTimer);
    if (reduceMotion || !text) { el.textContent = text; done && done(); return; }
    el.textContent = '';
    el.classList.add('typing');
    let i = 0;
    typeTimer = setInterval(() => {
      el.textContent = text.slice(0, ++i);
      if (i >= text.length) { clearInterval(typeTimer); el.classList.remove('typing'); done && done(); }
    }, 22);
  }
  function shuffled(arr, seed) {
    const a = arr.slice(); let s = seed * 2654435761 % 4294967296;
    for (let i = a.length - 1; i > 0; i--) { s = (s * 1103515245 + 12345) % 2147483648; const j = s % (i + 1); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }

  // ---------- routing ----------
  // Served over http(s):  /books/<id>            /books/<id>/chapters/<n>   /books/<id>/chapters/<n>/play
  // Opened from file://:  index.html#/books/<id>  (same paths after the #)
  const ROUTE = /^(.*?)\/books\/([^/#?]+)(?:\/chapters\/(\d+)(?:\/(play|read))?)?\/?$/;
  const useHash = location.protocol === 'file:';
  function parseRoute() {
    const target = useHash ? location.hash.replace(/^#/, '') : location.pathname;
    const m = target.match(ROUTE);
    if (m) return { prefix: useHash ? '' : m[1], id: decodeURIComponent(m[2]), chapter: m[3] ? +m[3] : null, mode: m[4] || 'read' };
    // legacy ?book=<id>
    const q = new URLSearchParams(location.search).get('book');
    return { prefix: useHash ? '' : location.pathname.replace(/\/index\.html$/, '').replace(/\/$/, ''), id: q, chapter: null, mode: 'read' };
  }
  try {
    const saved = sessionStorage.getItem('lp.redirect');
    if (saved) { sessionStorage.removeItem('lp.redirect'); history.replaceState(null, '', saved); }
  } catch (e) { /* ignore */ }
  const route = parseRoute();
  function urlFor(id, chapter, mode) {
    let path = `/books/${encodeURIComponent(id)}` + (chapter ? `/chapters/${chapter}` + (mode === 'play' ? '/play' : '') : '');
    return useHash ? `${location.pathname}#${path}` : route.prefix + path;
  }
  const libraryUrl = () => useHash ? location.pathname : (route.prefix || '') + '/';
  function openBook(id) { location.href = urlFor(id); }
  function syncUrl() {
    if (!BOOK) return;
    const url = view.name === 'chapter' ? urlFor(BOOK.id, view.num, view.mode) : urlFor(BOOK.id);
    const current = useHash ? location.pathname + location.hash : location.pathname;
    if (current !== url) history.pushState({ view }, '', url);
  }
  window.addEventListener('popstate', () => {
    if (!BOOK) return;
    const r = parseRoute();
    if (r.id !== BOOK.id) { location.reload(); return; }
    go(r.chapter ? { name: 'chapter', num: Math.min(Math.max(1, r.chapter), TOTAL), mode: r.mode } : { name: 'title' }, true);
  });
  if (useHash) window.addEventListener('hashchange', () => { const r = parseRoute(); if (!BOOK || r.id !== BOOK.id) location.reload(); });

  // ---------- navigation ----------
  let turning = false;
  function go(next, fromHistory) {
    T.stop(); clearInterval(typeTimer); D.close();
    const render = () => {
      view = next;
      ({ library: renderLibrary, title: renderTitle, select: renderSelect, chapter: renderChapter })[view.name]();
      if (!fromHistory) syncUrl();
      window.scrollTo(0, 0);
      const pr = document.getElementById('page-right');
      if (pr && !reduceMotion) { pr.classList.add('turn-in'); pr.addEventListener('animationend', () => pr.classList.remove('turn-in'), { once: true }); }
    };
    const pr = document.getElementById('page-right');
    if (pr && BOOK && !reduceMotion && !turning) {
      turning = true;
      pr.classList.add('turn-out');
      const done = () => { turning = false; render(); };
      pr.addEventListener('animationend', done, { once: true });
      setTimeout(() => { if (turning) { pr.removeEventListener('animationend', done); turning = false; render(); } }, 600);
    } else render();
  }
  function topbar(extra = '') {
    const name = BOOK ? `${esc(BOOK.title)} <small>${SITE}</small>` : `${SITE} <small>learn English with illustrated stories</small>`;
    return `<div class="topbar"><h1>${name}</h1><div class="actions">${extra}</div></div>`;
  }

  // ---------- study history (shown on the library page) ----------
  const bookOf = (id) => LIBRARY.find(b => b.id === id);
  const dayKey = (d) => { const x = new Date(d); return `${x.getFullYear()}-${pad2(x.getMonth() + 1)}-${pad2(x.getDate())}`; };
  function ago(iso) {
    const s = (Date.now() - new Date(iso).getTime()) / 1000;
    if (s < 60) return 'just now';
    if (s < 3600) return `${Math.floor(s / 60)} min ago`;
    if (s < 86400) return `${Math.floor(s / 3600)} h ago`;
    const days = Math.floor(s / 86400);
    return days === 1 ? 'yesterday' : days < 7 ? `${days} days ago` : new Date(iso).toLocaleDateString();
  }
  function dayLabel(key) {
    const today = new Date(), y = new Date(); y.setDate(today.getDate() - 1);
    if (key === dayKey(today)) return 'Today';
    if (key === dayKey(y)) return 'Yesterday';
    return new Date(key + 'T12:00:00').toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
  }
  // consecutive study days ending today (or yesterday, if today has not started yet)
  function streak(history) {
    const days = new Set(history.map(e => dayKey(e.t)));
    const d = new Date(); let n = 0;
    if (!days.has(dayKey(d))) d.setDate(d.getDate() - 1);
    while (days.has(dayKey(d))) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }
  function describe(e) {
    const b = bookOf(e.book), title = b ? b.title : e.book;
    const ch = e.chapter ? `Chapter ${roman(e.chapter)}${e.title ? ` · ${e.title}` : ''}` : '';
    switch (e.type) {
      case 'word': return { what: `Looked up “${e.word}”${e.ko ? ` <span class="ko">${esc(e.ko)}</span>` : ''}`, where: title + (ch ? `, ${ch}` : ''), raw: true };
      case 'listen': return { what: `Listened to ${ch}`, where: title };
      case 'done': return { what: `Finished ${ch}`, where: title };
      default: return { what: `${e.mode === 'play' ? 'Played' : 'Read'} ${ch}`, where: title };
    }
  }
  let showAllHistory = false;
  function recentHtml() {
    const h = S.getHistory();
    const head = `<h3>Recent study${settings.koHelp ? '<span class="tier-ko">최근 학습</span>' : ''}</h3>`;
    if (!h.length) return `<section class="desk-note">${head}<p class="muted">Nothing here yet. Open a book — the chapters you read, listen to and finish, and the words you look up, will be noted on this page.</p></section>`;
    const last = h.find(e => e.type !== 'word' && bookOf(e.book) && e.chapter);
    const weekAgo = Date.now() - 7 * 86400000;
    const week = h.filter(e => new Date(e.t).getTime() >= weekAgo);
    const count = (t) => week.filter(e => e.type === t).length;
    const words = h.filter(e => e.type === 'word').slice(0, 14);
    const st = streak(h);
    const stat = (n, label) => `<span class="stat"><b>${n}</b> ${label.replace('(s)', n === 1 ? '' : 's')}</span>`;
    let list = '';
    if (showAllHistory) {
      let day = null;
      list = `<ol class="history">${h.slice(0, 80).map((e, i) => {
        const k = dayKey(e.t), d = describe(e);
        const headRow = k !== day ? `<li class="day">${esc(dayLabel(k))}</li>` : '';
        day = k;
        const time = new Date(e.t).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
        return `${headRow}<li><button class="hrow" data-i="${i}"><span class="time">${esc(time)}</span><span class="what">${d.raw ? d.what : esc(d.what)}</span><span class="where">${esc(d.where)}</span></button></li>`;
      }).join('')}</ol>`;
    }
    return `<section class="desk-note">${head}
      ${last ? `<div class="continue"><span>You were ${last.type === 'done' ? 'finishing' : last.mode === 'play' ? 'playing' : 'reading'} <b>${esc(bookOf(last.book).title)}</b>, Chapter ${roman(last.chapter)}${last.title ? ` · ${esc(last.title)}` : ''} <span class="muted">(${esc(ago(last.t))})</span></span>
        <button class="btn small primary" id="btn-continue-last">Continue →</button></div>` : ''}
      <div class="stats">${stat(count('done'), 'chapter(s) finished')}${stat(count('listen'), 'chapter(s) heard')}${stat(count('word'), 'word(s) looked up')}${stat(st, 'day(s) in a row')}<span class="muted">· this week</span></div>
      ${words.length ? `<div class="chips">${words.map(e => `<button class="chip" data-word="${esc(e.word)}" title="Look up again">${esc(e.word)}${e.ko ? `<span class="ko">${esc(e.ko)}</span>` : ''}</button>`).join('')}</div>` : ''}
      ${list}
      <div class="note-foot">
        <button class="btn small" id="btn-history-toggle">${showAllHistory ? 'Hide activity' : `Show all activity (${h.length})`}</button>
        <button class="btn small" id="btn-history-clear">Clear history</button>
      </div>
    </section>`;
  }
  function wireRecent() {
    const h = S.getHistory();
    const cont = document.getElementById('btn-continue-last');
    if (cont) cont.onclick = () => { const last = h.find(e => e.type !== 'word' && bookOf(e.book) && e.chapter); if (last) location.href = urlFor(last.book, last.chapter, last.mode === 'play' ? 'play' : 'read'); };
    const tog = document.getElementById('btn-history-toggle');
    if (tog) tog.onclick = () => { showAllHistory = !showAllHistory; renderLibrary(); };
    const clr = document.getElementById('btn-history-clear');
    if (clr) clr.onclick = () => { if (confirm('Clear the study history? (Book progress is kept.)')) { S.clearHistory(); showAllHistory = false; renderLibrary(); } };
    app.querySelectorAll('.chip[data-word]').forEach(c => c.onclick = () => D.open(c.dataset.word, c, { speak: (t) => T.speakOnce(t) }));
    app.querySelectorAll('.hrow').forEach(b => b.onclick = () => {
      const e = h[+b.dataset.i]; if (!e) return;
      if (e.type === 'word') { D.open(e.word, b, { speak: (t) => T.speakOnce(t) }); return; }
      if (bookOf(e.book) && e.chapter) location.href = urlFor(e.book, e.chapter, e.mode === 'play' ? 'play' : 'read');
    });
  }
  function syncInstallBtn() { const b = document.getElementById('btn-install'); if (b) b.hidden = !PWA.canInstall() || PWA.isStandalone(); }
  PWA.onInstallable(syncInstallBtn);

  // ---------- library ----------
  // One shelf per difficulty; a book's `difficulty` in js/library.js picks the shelf.
  const TIERS = [
    { key: 'starter', en: 'Starter', sub: 'picture books · a few lines a page', ko: '입문' },
    { key: 'beginner', en: 'Beginner', sub: 'short chapters · simple sentences', ko: '초급' },
    { key: 'intermediate', en: 'Intermediate', sub: 'longer chapters · richer vocabulary', ko: '중급' },
    { key: 'other', en: 'More books', sub: '', ko: '기타' }
  ];
  function renderLibrary() {
    document.title = SITE;
    const bookHtml = (b) => {
      const p = S.getProgress(b.id), done = Object.keys(p.completed).length, n = b.chapters || '?';
      const pct = n ? Math.round(100 * done / n) : 0;
      return `<div class="slot">
        <button class="book3d" data-id="${esc(b.id)}" style="--c:${esc(b.color || '#3b4a7a')}" title="${esc(b.title)} — ${esc(b.author)}" aria-label="Open ${esc(b.title)}">
          <span class="spine">${esc(b.title)}</span>
          <span class="pages-edge"></span>
          <span class="cover">
            <span class="plate empty" data-dir="books/${esc(b.id)}"></span>
            <span class="ctitle">${esc(b.title)}</span>
            <span class="cauthor">${esc(b.author)}${b.year ? `, ${b.year}` : ''}</span>
            ${done ? `<span class="ribbon ${done >= n ? 'done' : ''}" title="${pct}% read"></span>` : ''}
          </span>
        </button>
        <span class="label book-under">${settings.koHelp && b.ko ? esc(b.ko) + ' · ' : ''}${done} / ${n}</span>
      </div>`;
    };
    const shelves = TIERS.map(t => {
      const list = LIBRARY.filter(b => (TIERS.some(x => x.key === b.difficulty) ? b.difficulty : 'other') === t.key);
      if (!list.length) return '';
      return `<section class="shelf-row">
        <h3 class="shelf-label"><span class="tier">${esc(t.en)}</span>${settings.koHelp && t.ko ? `<span class="tier-ko">${esc(t.ko)}</span>` : ''}${t.sub ? `<span class="tier-sub">${esc(t.sub)}</span>` : ''}</h3>
        <div class="shelf">${list.map(bookHtml).join('')}<div class="slot empty"></div></div>
      </section>`;
    }).join('');
    app.innerHTML = `${topbar()}
      <div class="library-hero">
        <h2>${SITE}</h2>
        <p>Take a book from the shelf. Read a chapter, listen to it, then step into the story and say the right line to turn the page.</p>
      </div>
      ${recentHtml()}
      ${shelves}
      <div class="library-foot">
        <label><input type="checkbox" id="opt-ko" ${settings.koHelp ? 'checked' : ''}> Show Korean help</label>
        <button class="btn small" id="btn-install" hidden>⤓ Install app</button>
      </div>`;
    app.querySelectorAll('.plate[data-dir]').forEach(el => probeCover(ROOT + el.dataset.dir, url => {
      if (!url) return;
      el.classList.remove('empty'); el.innerHTML = `<img src="${url}" alt="">`;
    }));
    app.querySelectorAll('.book3d').forEach(b => b.onclick = () => {
      b.classList.add('opening');
      const plate = b.querySelector('.plate'); if (plate) plate.style.viewTransitionName = 'book-cover';
      setTimeout(() => openBook(b.dataset.id), reduceMotion ? 0 : 260);
    });
    document.getElementById('opt-ko').onchange = (e) => { settings.koHelp = e.target.checked; saveSettings(); renderLibrary(); };
    document.getElementById('btn-install').onclick = () => PWA.install();
    syncInstallBtn();
    wireRecent();
  }

  // ---------- book boot ----------
  // Asset paths are anchored at the site root (route.prefix), so they still resolve after the URL
  // has been rewritten to /books/<id>/chapters/<n> (GitHub Pages 404 redirect, history.pushState).
  const ROOT = useHash ? '' : (route.prefix || '') + '/';
  async function initBook(book) {
    BOOK = book; DIR = `${ROOT}books/${book.id}`;
    S.use(book.id);
    delete window.LP_SCENES; delete window.LP_ART; delete window.LP_BOOK; delete window.LP_ROLES;
    await loadScript(`${DIR}/art.js`);
    const okScenes = await loadScript(`${DIR}/scenes.js`);
    await loadScript(`${DIR}/text/book.js`);
    if (!okScenes || !Array.isArray(window.LP_SCENES) || !window.LP_SCENES.length) {
      app.innerHTML = `${topbar('<button class="btn small" id="btn-lib">← Library</button>')}<div class="panel"><h3>Book data missing</h3>
        <p>${esc(DIR)}/scenes.js could not be loaded. See books/README.md for the format.</p></div>`;
      document.getElementById('btn-lib').onclick = () => (location.href = libraryUrl());
      return;
    }
    SCENES = window.LP_SCENES; TOTAL = SCENES.length; ROLES = window.LP_ROLES || {};
    ART = window.LP_ART || genericArt(book);
    if (book.readOnly && route.mode === 'play') route.mode = 'read';
    chapters = S.getChapters(); progress = S.getProgress(); info = S.getBookInfo();
    document.title = `${book.title} · ${SITE}`;
    autoImport();
    go(route.chapter ? { name: 'chapter', num: Math.min(Math.max(1, route.chapter), TOTAL), mode: route.mode } : { name: 'title' }, true);
  }

  // Attribution line under the reader text: the library's text credit (what · licence), else nothing.
  function defaultCredit() {
    const c = BOOK && BOOK.credits && BOOK.credits.text;
    return c ? `${c.what} · ${String(c.license).split(' — ')[0]}` : '';
  }
  function autoImport() {
    const text = window.LP_BOOK;
    if (!text || !text.text) return;
    if (chapters && info.source === text.file && info.parserVersion === P.VERSION) return;
    const r = P.parse(text.text);
    if (!r.chapters.length) { console.warn('text/book.js: no chapters found', r.warnings); return; }
    if (S.setChapters(r.chapters)) {
      chapters = r.chapters; info.source = text.file; info.parserVersion = P.VERSION; info.front = r.front || [];
      if (!info.credit || info.creditAuto) { info.credit = defaultCredit(); info.creditAuto = true; }
      saveInfo();
    }
  }

  // ---------- book title screen ----------
  // A dedication kept from the book's front matter: library entry `dedication: { from: 'To …' }`
  // names the paragraph it starts with; everything from there to the first chapter is shown.
  function dedicationHtml() {
    const d = BOOK.dedication, front = info && info.front;
    if (!d || !Array.isArray(front)) return '';
    const i = front.findIndex(p => p.startsWith(d.from));
    if (i < 0) return '';
    return `<div class="dedication">${front.slice(i).map(p => `<p>${rich(p)}</p>`).join('')}</div>`;
  }
  function renderTitle() {
    const done = Object.keys(progress.completed).length;
    const hasText = !!chapters;
    const left = `<div class="picture cover-plate" id="cover-plate">${ART.cover()}</div><div class="caption" id="cover-caption"></div>`;
    bookShell(left, `<div class="title-page">
        <h2>${esc(BOOK.title)}</h2>
        <div class="author">${esc(BOOK.author || '')}${BOOK.year ? `, ${BOOK.year}` : ''}${settings.koHelp && BOOK.ko ? ` · ${esc(BOOK.ko)}` : ''}</div>
        ${BOOK.blurb ? `<p class="blurb">${esc(BOOK.blurb)}</p>` : ''}
        ${dedicationHtml()}
        <div class="menu">
          <button class="btn primary" id="btn-continue">${done || progress.current > 1 ? `Continue · Chapter ${roman(progress.current)}` : 'Start from the beginning'}</button>
          <button class="btn" id="btn-select">Choose a chapter</button>
          <button class="btn" id="btn-reset">Clear progress</button>
        </div>
        <div class="options">
          ${BOOK.readOnly ? '' : `<fieldset class="answer-mode">
            <legend>Answer mode</legend>
            <label><input type="radio" name="opt-mode" value="type" ${settings.answerMode === 'type' ? 'checked' : ''}> Type the line <span class="ko-tag">주관식</span></label>
            <label><input type="radio" name="opt-mode" value="choose" ${settings.answerMode === 'choose' ? 'checked' : ''}> Choose the line <span class="ko-tag">객관식</span></label>
          </fieldset>`}
          <label><input type="checkbox" id="opt-ko" ${settings.koHelp ? 'checked' : ''}> Show Korean help</label>
          <label><input type="checkbox" id="opt-autoread" ${settings.autoRead ? 'checked' : ''}> Read lines aloud automatically</label>
        </div>
        <div class="status">
          ${hasText ? '' : `No book text found in ${esc(DIR)}/text/ (see books/README.md).<br>`}Chapters completed: ${done} / ${TOTAL} · progress is saved in this browser.
          ${T.supported ? '' : '<br>This browser does not support speech synthesis (TTS).'}
        </div>
        <div class="offline-row" id="offline-row" hidden>
          <button class="btn small" id="btn-offline">⤓ Save for offline</button><span id="offline-status"></span>
        </div>
        ${creditsHtml(BOOK)}
      </div>`, { actions: '<button class="btn small" id="btn-lib">← Library</button>', folioRight: BOOK.title.toUpperCase() });
    probeCover(DIR, url => {
      const el = document.getElementById('cover-plate'); if (!url || !el) return;
      el.innerHTML = `<img src="${url}" alt="${esc(BOOK.title)} cover">`;
      const cap = document.getElementById('cover-caption'); if (cap && BOOK.credits && BOOK.credits.images) cap.textContent = BOOK.credits.images.what;
    });
    document.getElementById('btn-lib').onclick = () => (location.href = libraryUrl());
    document.getElementById('btn-continue').onclick = () => go({ name: 'chapter', num: Math.min(progress.current, TOTAL), mode: 'read' });
    document.getElementById('btn-select').onclick = () => go({ name: 'select' });
    document.getElementById('btn-reset').onclick = () => {
      if (!confirm('Clear all progress for this book? (The book text stays.)')) return;
      progress = S.resetProgress(); renderTitle();
    };
    if (!BOOK.readOnly) app.querySelectorAll('input[name="opt-mode"]').forEach(r => r.onchange = (e) => { settings.answerMode = e.target.value; saveSettings(); });
    document.getElementById('opt-ko').onchange = (e) => { settings.koHelp = e.target.checked; saveSettings(); };
    document.getElementById('opt-autoread').onchange = (e) => { settings.autoRead = e.target.checked; saveSettings(); };
    // offline copy (service worker cache) — only when served over http(s)
    if (PWA.supported) {
      const row = document.getElementById('offline-row'), btn = document.getElementById('btn-offline'), st = document.getElementById('offline-status');
      row.hidden = false;
      const setSaved = (saved, extra) => { btn.dataset.saved = saved ? '1' : ''; btn.textContent = saved ? 'Remove offline copy' : '⤓ Save for offline'; st.textContent = saved ? `Saved on this device ✓${extra || ''}` : ''; };
      PWA.isBookSaved(DIR).then(saved => { if (saved) setSaved(true); });
      btn.onclick = async () => {
        btn.disabled = true;
        try {
          if (btn.dataset.saved) { await PWA.forgetBook(DIR); setSaved(false); }
          else { const files = await PWA.saveBook(DIR, TOTAL, (i, t) => { st.textContent = `Saving… ${i} / ${t}`; }); setSaved(true, ` · ${files} files`); }
        } catch (e) { st.textContent = 'Could not save: ' + e.message; }
        btn.disabled = false;
      };
    }
  }

  function renderSelect() {
    bookShell(`<div class="picture cover-plate">${ART.cover()}</div>`, `<div class="chapter-head"><div><div class="num">CONTENTS</div><div class="title">${esc(BOOK.title)}</div></div></div>
      <div class="chapter-list">${SCENES.map(c => {
        const done = !!progress.completed[c.num], locked = !isUnlocked(c.num);
        return `<button class="chapter-card ${done ? 'done' : ''} ${locked ? 'locked' : ''}" data-n="${c.num}" ${locked ? 'disabled' : ''}>
          <span class="n">CHAPTER ${roman(c.num)}</span><span class="t">${esc(c.title)}</span>${settings.koHelp && c.ko ? `<span class="k">${esc(c.ko)}</span>` : ''}</button>`;
      }).join('')}</div>`, { actions: `<label style="font-size:14px;color:#a9b0cf"><input type="checkbox" id="free" ${info.freeMove ? 'checked' : ''}> Unlock all chapters</label><button class="btn small" id="btn-back">← Title</button>` });
    document.getElementById('btn-back').onclick = () => go({ name: 'title' });
    document.getElementById('free').onchange = (e) => { info.freeMove = e.target.checked; saveInfo(); renderSelect(); };
    app.querySelectorAll('.chapter-card').forEach(b => b.onclick = () => go({ name: 'chapter', num: +b.dataset.n, mode: 'read' }));
  }

  function renderChapter() {
    const n = view.num, m = meta(n);
    bookShell(`<div class="chapter-num">CHAPTER ${roman(n)}</div><div class="picture" id="picture"></div><div class="caption" id="picture-caption"></div>`,
      `<div class="chapter-head">
        <div><div class="num">CHAPTER ${roman(n)} · ${esc(BOOK.title)}</div><div class="title">${esc(m.title)}${settings.koHelp && m.ko ? `<span class="ko">${esc(m.ko)}</span>` : ''}</div></div>
        ${BOOK.readOnly ? '' : `<div class="tabs">
          <button class="btn small ${view.mode === 'read' ? 'active' : ''}" id="tab-read">Read</button>
          <button class="btn small ${view.mode === 'play' ? 'active' : ''}" id="tab-play">Play</button>
        </div>`}
      </div>
      <div id="body"></div>`,
      { actions: '<button class="btn small" id="btn-select">Contents</button><button class="btn small" id="btn-home">Title</button><button class="btn small" id="btn-lib">Library</button>', folioLeft: String(n), folioRight: esc(m.title).toUpperCase() });
    renderPicture(document.getElementById('picture'), n, document.getElementById('picture-caption'));
    document.getElementById('btn-select').onclick = () => go({ name: 'select' });
    document.getElementById('btn-home').onclick = () => go({ name: 'title' });
    document.getElementById('btn-lib').onclick = () => (location.href = libraryUrl());
    if (BOOK.readOnly) view.mode = 'read';
    else {
      document.getElementById('tab-read').onclick = () => go({ name: 'chapter', num: n, mode: 'read' });
      document.getElementById('tab-play').onclick = () => go({ name: 'chapter', num: n, mode: 'play' });
    }
    S.addHistory({ type: 'open', book: BOOK.id, chapter: n, title: m.title, mode: view.mode });
    if (view.mode === 'read') renderReader(n); else renderPlay(n);
  }
  const noteDone = (n) => S.addHistory({ type: 'done', book: BOOK.id, chapter: n, title: meta(n).title });

  // The word under a click, from the caret position: { node, start, end, word } or null (space / punctuation).
  function wordAtPoint(x, y, within) {
    let node, off;
    if (document.caretPositionFromPoint) { const p = document.caretPositionFromPoint(x, y); if (!p) return null; node = p.offsetNode; off = p.offset; }
    else if (document.caretRangeFromPoint) { const r = document.caretRangeFromPoint(x, y); if (!r) return null; node = r.startContainer; off = r.startOffset; }
    else return null;
    if (!node || node.nodeType !== 3 || !within.contains(node)) return null;
    const t = node.data, isW = (c) => /[A-Za-zÀ-ɏ'’-]/.test(c);
    if (!(off < t.length && isW(t[off])) && !(off > 0 && isW(t[off - 1]))) return null;
    let a = off, b = off;
    while (a > 0 && isW(t[a - 1])) a--;
    while (b < t.length && isW(t[b])) b++;
    while (a < b && !/[A-Za-zÀ-ɏ]/.test(t[a])) a++;          // trim quotes and dashes on either side
    while (b > a && !/[A-Za-zÀ-ɏ]/.test(t[b - 1])) b--;
    if (a >= b) return null;
    return { node, start: a, end: b, word: t.slice(a, b) };
  }

  // ---------- reading + TTS ----------
  // Gutenberg plain text marks italics with _underscores_. Render them as <em>; speak them without the marks.
  const plain = (s) => String(s).replace(/_/g, '');
  const rich = (s) => esc(s).replace(/_([^_]+)_/g, '<em>$1</em>').replace(/_/g, '');
  // Sentences of one paragraph, each carrying its italic state so a span that crosses a sentence boundary still closes.
  function richSentences(paragraph) {
    let open = false;
    return P.sentences(paragraph).map(s => {
      const marked = (open ? '_' : '') + s;
      open = (marked.split('_').length - 1) % 2 === 1;
      return { text: plain(s), html: rich(open ? marked + '_' : marked) };
    });
  }
  function renderReader(n) {
    const body = document.getElementById('body');
    const ch = chapterText(n);
    if (!ch) {
      body.innerHTML = `<div class="panel"><h3>No book text</h3>
        <p>This book has no text in ${esc(DIR)}/text/ yet, so there is nothing to read or listen to here.${BOOK.readOnly ? '' : ' The dialogue scenes work without it.'}</p>
        ${BOOK.readOnly ? '' : '<div class="row"><button class="btn" id="btn-play">Go to the scenes</button></div>'}</div>`;
      if (!BOOK.readOnly) document.getElementById('btn-play').onclick = () => go({ name: 'chapter', num: n, mode: 'play' });
      return;
    }
    const sentences = [];
    const html = ch.paragraphs.map(p => {
      return '<p>' + richSentences(p).map(s => { const i = sentences.push(s.text) - 1; return `<span class="s" data-i="${i}">${s.html}</span> `; }).join('') + '</p>';
    }).join('');
    body.innerHTML = `<div class="reader">
      <div class="reader-controls">
        <button class="btn small primary" id="tts-play" ${T.supported ? '' : 'disabled'}>▶ Read aloud</button>
        <button class="btn small" id="tts-pause" disabled>❚❚ Pause</button>
        <button class="btn small" id="tts-stop" disabled>■ Stop</button>
        <label>Voice <select id="voice"></select></label>
        <label>Speed <input type="range" id="rate" min="0.6" max="1.4" step="0.05" value="${settings.rate}"><span id="rate-v">${settings.rate}</span></label>
      </div>
      <div class="reader-text" id="reader-text">${html}</div>
      ${(info.creditAuto ? defaultCredit() : info.credit) ? `<div class="credit">${esc(info.creditAuto ? defaultCredit() : info.credit)}</div>` : ''}
      <div class="reader-foot">
        <span class="scene-progress">${sentences.length} sentences · click a word to look it up${settings.koHelp ? ' <span class="ko-help" style="display:inline">단어를 누르면 뜻이 나옵니다</span>' : ''}</span>
        ${BOOK.readOnly
          ? `<button class="btn primary" id="btn-to-play">${n < TOTAL ? 'Finished · next chapter →' : 'Finished · back to the library'}</button>`
          : '<button class="btn primary" id="btn-to-play">Go to the scenes →</button>'}
      </div></div>`;
    const btnPlay = document.getElementById('tts-play'), btnPause = document.getElementById('tts-pause'), btnStop = document.getElementById('tts-stop');
    const voiceSel = document.getElementById('voice'), textEl = document.getElementById('reader-text');
    T.onVoices(vs => {
      voiceSel.innerHTML = vs.map(v => `<option value="${esc(v.name)}" ${v.name === settings.voice ? 'selected' : ''}>${esc(v.name)} (${esc(v.lang)})</option>`).join('') || '<option>default</option>';
    });
    voiceSel.onchange = () => { settings.voice = voiceSel.value; saveSettings(); T.setVoice(settings.voice); };
    T.setVoice(settings.voice); T.setRate(settings.rate);
    document.getElementById('rate').oninput = (e) => { settings.rate = +e.target.value; document.getElementById('rate-v').textContent = settings.rate; saveSettings(); T.setRate(settings.rate); };

    function mark(i) {
      textEl.querySelectorAll('.s.now').forEach(el => el.classList.remove('now'));
      const el = textEl.querySelector(`.s[data-i="${i}"]`);
      if (el) { el.classList.add('now'); el.scrollIntoView({ block: 'center', behavior: reduceMotion ? 'auto' : 'smooth' }); }
    }
    function setButtons(playing) {
      btnPause.disabled = !playing; btnStop.disabled = !playing;
      btnPlay.textContent = playing ? '▶ From the start' : '▶ Read aloud';
      btnPause.textContent = '❚❚ Pause';
    }
    function play(from) {
      setButtons(true);
      T.speakList(sentences, {
        onSentence: (i) => mark(i),
        onEnd: () => {
          setButtons(false); textEl.querySelectorAll('.s.now').forEach(el => el.classList.remove('now')); progress.read[n] = true; save();
          if (from === 0) S.addHistory({ type: 'listen', book: BOOK.id, chapter: n, title: meta(n).title });
        }
      }, from);
    }
    btnPlay.onclick = () => play(0);
    btnPause.onclick = () => {
      if (T.isPaused()) { T.resume(); btnPause.textContent = '❚❚ Pause'; }
      else { T.pause(); btnPause.textContent = '▶ Resume'; }
    };
    btnStop.onclick = () => { T.stop(); setButtons(false); textEl.querySelectorAll('.s.now').forEach(el => el.classList.remove('now')); };
    // Click a word → dictionary popover (with "read from here"); a click on nothing but space or punctuation reads from that sentence.
    textEl.onclick = (e) => {
      const s = e.target.closest('.s');
      if (!s) return;
      if (e.target.closest('mark.w-hit')) { D.close(); return; }
      const w = wordAtPoint(e.clientX, e.clientY, s);
      if (!w) { play(+s.dataset.i); return; }
      const range = document.createRange(); range.setStart(w.node, w.start); range.setEnd(w.node, w.end);
      const mark = document.createElement('mark'); mark.className = 'w-hit';
      try { range.surroundContents(mark); } catch (err) { play(+s.dataset.i); return; }
      D.open(w.word, mark, {
        speak: (t) => T.speakOnce(t),
        scrollParent: textEl,
        onRead: () => play(+s.dataset.i),
        onClose: () => { const p = mark.parentNode; if (p) { mark.replaceWith(document.createTextNode(mark.textContent)); p.normalize(); } },
        onResult: (entry) => { if (entry.found || entry.ko) S.addHistory({ type: 'word', book: BOOK.id, chapter: n, title: meta(n).title, word: entry.word, ko: entry.ko || '' }); }
      });
    };
    document.getElementById('btn-to-play').onclick = () => {
      progress.read[n] = true;
      if (BOOK.readOnly) {
        progress.completed[n] = true;
        if (n >= progress.current && n < TOTAL) progress.current = n + 1;
        save(); noteDone(n);
        if (n < TOTAL) go({ name: 'chapter', num: n + 1, mode: 'read' }); else location.href = libraryUrl();
        return;
      }
      save(); go({ name: 'chapter', num: n, mode: 'play' });
    };
  }

  // ---------- adventure scenes ----------
  function renderPlay(n) {
    const body = document.getElementById('body');
    const m = meta(n);
    let idx = Math.min(progress.scene[n] || 0, m.scenes.length - 1);
    let misses = 0, hintLevel = 0, solved = false, revealed = false;

    const scene = () => m.scenes[idx];
    const roleText = (sc) => sc.roleText || (ROLES[sc.role] && ROLES[sc.role].en) || '';
    const roleKo = (sc) => sc.roleKo || (ROLES[sc.role] && ROLES[sc.role].ko) || '';

    function draw() {
      const sc = scene();
      misses = 0; hintLevel = 0; solved = false; revealed = false;
      const choose = settings.answerMode === 'choose' && Array.isArray(sc.distractors) && sc.distractors.length;
      body.innerHTML = `<div class="message" id="msg">
          <p class="situation">${esc(roleText(sc) + sc.situation)}${ko(sc.situationKo ? roleKo(sc) + sc.situationKo : '')}</p>
          <p><span class="speaker">${esc(sc.speaker)}:</span> <span class="line" id="line"></span>
             <button class="btn small" id="say" title="Listen to this line" ${T.supported ? '' : 'disabled'}>🔊</button></p>
          <p class="prompt-ko" id="prompt">${esc(sc.prompt)}${ko(sc.promptKo)}</p>
          <p class="hint" id="hint"></p>
          <p class="feedback" id="feedback"></p>
          <p class="echo" id="echo"></p>
          <p id="reply"></p>
        </div>
        <div id="answer-area"></div>
        <div class="scene-foot"><span class="scene-progress" style="margin-left:auto;order:2">Scene ${idx + 1} / ${m.scenes.length}${progress.completed[n] ? ' · chapter completed' : ''}</span>
          <span class="mode-switch">Answer mode:
            <button class="btn ${!choose ? 'active' : ''}" id="mode-type">Type</button>
            <button class="btn ${choose ? 'active' : ''}" id="mode-choose">Choose</button>
            <label><input type="checkbox" id="ko-help" ${settings.koHelp ? 'checked' : ''}> Korean help</label>
          </span>
        </div>`;
      typewrite(document.getElementById('line'), sc.line, () => { if (settings.autoRead) T.speakOnce(sc.line); });
      document.getElementById('say').onclick = () => T.speakOnce(sc.line);
      document.getElementById('mode-type').onclick = () => { settings.answerMode = 'type'; saveSettings(); draw(); };
      document.getElementById('mode-choose').onclick = () => { settings.answerMode = 'choose'; saveSettings(); draw(); };
      document.getElementById('ko-help').onchange = (e) => { settings.koHelp = e.target.checked; saveSettings(); draw(); };
      choose ? drawChoices() : drawInput();
      progress.scene[n] = idx; save();
    }

    function drawInput() {
      document.getElementById('answer-area').innerHTML = `<div class="command" id="command">
          <span class="arrow">▶</span>
          <input type="text" id="answer" autocomplete="off" spellcheck="false" placeholder="Type your line in English and press Enter">
          <button class="btn small" id="btn-hint">Hint</button>
          <button class="btn small" id="btn-reveal">Show answer</button>
        </div>`;
      const input = document.getElementById('answer');
      input.focus();
      input.onkeydown = (e) => { if (e.key === 'Enter') { e.preventDefault(); if (!solved) submitText(); } };
      document.getElementById('btn-hint').onclick = showHint;
      document.getElementById('btn-reveal').onclick = () => reveal(true);
    }

    function drawChoices() {
      const sc = scene();
      const options = shuffled([sc.model].concat(sc.distractors), n * 100 + idx);
      document.getElementById('answer-area').innerHTML = `<div class="choices" id="command">
          ${options.map((o, i) => `<button class="choice" data-i="${i}"><span class="letter">${'ABCDEF'[i]}.</span><span>${esc(o)}</span></button>`).join('')}
          <div style="display:flex;gap:6px;justify-content:flex-end"><button class="btn small" id="btn-hint">Hint</button></div>
        </div>`;
      document.getElementById('btn-hint').onclick = showHint;
      document.querySelectorAll('.choice').forEach(btn => btn.onclick = () => {
        if (solved || btn.classList.contains('wrong')) return;
        const text = options[+btn.dataset.i];
        countAttempt();
        if (text === sc.model) { btn.classList.add('right'); succeed(); }
        else {
          btn.classList.add('wrong'); misses++;
          const fb = document.getElementById('feedback');
          fb.className = 'feedback miss';
          fb.textContent = misses < MAX_MISSES ? 'Not that one. Try again.' : '';
          if (misses === 2 && hintLevel === 0) showHint();
          if (misses >= MAX_MISSES) {
            reveal(false);
            document.querySelectorAll('.choice').forEach(b => { if (options[+b.dataset.i] === sc.model) b.classList.add('right'); });
            succeed();
          }
        }
      });
    }

    function countAttempt() { const k = `${n}.${idx}`; progress.attempts[k] = (progress.attempts[k] || 0) + 1; save(); }

    function showHint() {
      const sc = scene(), hintEl = document.getElementById('hint');
      const hints = (sc.hints || []).map((h, i) => esc(h) + (settings.koHelp && sc.hintsKo && sc.hintsKo[i] ? ` <span class="ko-help">${esc(sc.hintsKo[i])}</span>` : '')).concat([`Shape of the line: ${esc(M.skeleton(sc.model))}`]);
      hintLevel = Math.min(hintLevel + 1, hints.length);
      hintEl.innerHTML = hints.slice(0, hintLevel).map(h => `· ${h}`).join('<br>');
    }

    function reveal(manual) {
      const sc = scene(), fb = document.getElementById('feedback');
      revealed = true;
      fb.className = 'feedback';
      fb.innerHTML = `<span class="ko">${manual ? 'Example answer' : `Missed ${MAX_MISSES} times. Example answer`}:</span> <span class="model">${esc(sc.model)}</span>${settings.answerMode === 'type' ? ' <span class="ko">— type it to continue.</span>' : ''}`;
      T.speakOnce(sc.model);
    }

    function submitText() {
      const sc = scene(), input = document.getElementById('answer'), fb = document.getElementById('feedback');
      const val = input.value.trim();
      if (!val) return;
      if (sc.echo) document.getElementById('echo').textContent = `${val}… ${val}… ${val}…`;
      countAttempt();
      if (M.match(val, sc.answers)) { succeed(); return; }
      misses++;
      fb.className = 'feedback miss';
      fb.textContent = misses < MAX_MISSES ? ['Hmm, not quite. Say it another way.', 'Almost there. Try the hint.'][misses - 1] : '';
      if (misses === 2 && hintLevel === 0) showHint();
      if (misses >= MAX_MISSES) reveal(false);
      input.select();
    }

    function succeed() {
      const sc = scene();
      solved = true;
      const fb = document.getElementById('feedback');
      if (!revealed) { fb.className = 'feedback ok'; fb.innerHTML = `✓ Well said. &nbsp;<span class="model">${esc(sc.model)}</span>`; }
      const reply = document.getElementById('reply');
      reply.innerHTML = `<span class="speaker">${esc(sc.reply.speaker)}:</span> <span class="line" id="reply-line"></span>`;
      typewrite(document.getElementById('reply-line'), sc.reply.line, () => { if (settings.autoRead) T.speakOnce(sc.reply.line); });
      const last = idx >= m.scenes.length - 1;
      document.getElementById('answer-area').innerHTML = `<div class="command"><span class="arrow">▶</span><span class="model-line">${esc(sc.model)}</span>
          <button class="btn small" id="say2" ${T.supported ? '' : 'disabled'}>🔊 Listen</button>
          <button class="btn small primary" id="btn-next">${last ? 'Finish chapter ✓' : 'Next scene ▼'}</button></div>`;
      document.getElementById('say2').onclick = () => T.speakOnce(sc.model);
      const nb = document.getElementById('btn-next'); nb.onclick = next; nb.focus();
    }

    function next() {
      T.stop();
      if (idx < m.scenes.length - 1) { idx++; draw(); return; }
      progress.completed[n] = true;
      progress.scene[n] = 0;
      if (n >= progress.current && n < TOTAL) progress.current = n + 1;
      save(); noteDone(n);
      body.innerHTML = `<div class="message">
          <p><span class="speaker">Chapter ${roman(n)}</span> <span class="line">completed.</span></p>
          <p class="ko">${esc(m.summary || '')}${ko(m.summaryKo)}</p>
          <p class="ko">${n < TOTAL ? `Next: Chapter ${roman(n + 1)} · ${esc(meta(n + 1).title)}` : `You have finished every chapter of ${esc(BOOK.title)}.`}</p>
        </div>
        <div class="command"><span class="arrow">▶</span>
          <button class="btn small primary" id="btn-next-ch">${n < TOTAL ? 'Next chapter →' : 'Back to the library'}</button>
          <button class="btn small" id="btn-again">Play this chapter again</button>
        </div>`;
      document.getElementById('btn-next-ch').onclick = () => n < TOTAL ? go({ name: 'chapter', num: n + 1, mode: 'read' }) : (location.href = libraryUrl());
      document.getElementById('btn-again').onclick = () => { idx = 0; draw(); };
    }
    draw();
  }

  // ---------- boot ----------
  const book = route.id && LIBRARY.find(b => b.id === route.id);
  if (book) initBook(book);
  else if (route.id) { renderLibrary(); app.insertAdjacentHTML('afterbegin', `<div class="warn-top">No book called "${esc(route.id)}". Pick one from the shelf.</div>`); }
  else renderLibrary();
})();

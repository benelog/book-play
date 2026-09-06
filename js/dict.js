/* Word lookup: click a word in the reader → a popover with English senses, a Korean gloss and pronunciation.
   Sources, all of which answer cross-origin requests (even from a file:// page):
     - English Wiktionary REST API: senses (and, when the Korean Wiktionary has the word, a Korean definition)
     - Free Dictionary API: IPA and a recorded pronunciation; skipped for the rest of the session once it fails
     - MyMemory: a machine-translated Korean gloss when Wiktionary has no Korean entry
   Every result is cached in localStorage so a word looked up once is available offline; with no network at all
   the popover falls back to links to Naver / Daum. */
window.LP_DICT = (function () {
  const S = window.LP_STORAGE;
  const WIKT_API = 'https://en.wiktionary.org/api/rest_v1/page/definition/';
  const FREE_API = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
  const KO_API = 'https://api.mymemory.translated.net/get?langpair=en|ko&q=';
  const TIMEOUT = 8000, FREE_TIMEOUT = 4000;
  let freeApiDown = false;
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const ENT = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', '#39': "'" };
  const stripHtml = (h) => String(h || '').replace(/<[^>]*>/g, '').replace(/&(#?\w+);/g, (m, e) => ENT[e] || (e[0] === '#' ? String.fromCharCode(+e.slice(1)) : m)).replace(/\s+/g, ' ').trim();
  const hasHangul = (s) => /[ㄱ-힝]/.test(s);

  // "Don’t," → "don't"
  function normalize(word) {
    return String(word || '').replace(/[’‘]/g, "'").replace(/^[^A-Za-z]+|[^A-Za-z]+$/g, '').toLowerCase();
  }
  // Inflected forms the dictionary may not list: "cyclones" → "cyclone", "running" → "run", "carried" → "carry".
  function candidates(word) {
    const w = normalize(word), out = [w];
    const add = (x) => { if (x && x.length > 1 && !out.includes(x)) out.push(x); };
    if (/'s$/.test(w)) add(w.slice(0, -2));
    if (/ies$/.test(w)) add(w.slice(0, -3) + 'y');
    if (/(ss|sh|ch|x|z)es$/.test(w)) add(w.slice(0, -2));
    else if (/es$/.test(w)) { add(w.slice(0, -1)); add(w.slice(0, -2)); }
    else if (/s$/.test(w) && !/ss$/.test(w)) add(w.slice(0, -1));
    if (/ing$/.test(w)) { const b = w.slice(0, -3); add(b); add(b + 'e'); if (/([^aeiou])\1$/.test(b)) add(b.slice(0, -1)); }
    if (/ied$/.test(w)) add(w.slice(0, -3) + 'y');
    else if (/ed$/.test(w)) { const b = w.slice(0, -2); add(b); add(b + 'e'); if (/([^aeiou])\1$/.test(b)) add(b.slice(0, -1)); }
    if (/est$/.test(w)) { add(w.slice(0, -3)); add(w.slice(0, -2)); }
    if (/er$/.test(w)) { add(w.slice(0, -2)); add(w.slice(0, -1)); }
    if (/ly$/.test(w)) add(w.slice(0, -2));
    return out.slice(0, 5);
  }

  function fetchJson(url, timeout = TIMEOUT) {
    if (typeof fetch !== 'function') return Promise.reject(new Error('no fetch'));
    const ctl = typeof AbortController === 'function' ? new AbortController() : null;
    const timer = setTimeout(() => ctl && ctl.abort(), timeout);
    return fetch(url, { signal: ctl ? ctl.signal : undefined }).then(r => {
      clearTimeout(timer);
      if (r.status === 404) return null;
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    }, e => { clearTimeout(timer); throw e; });
  }

  // One Wiktionary language block → [{ pos, defs: [{ def, ex, formOf }] }]; "plural of cyclone" style senses carry the base word.
  // Wiktionary wraps "plural of X" / "past participle of X" senses in form-of-definition spans with the base word linked inside.
  const FORM_OF = /form-of-definition-link[^>]*>(?:(?!<\/span>).)*?<a[^>]*>([^<]+)<\/a>/i;
  function senses(block) {
    return (block || []).map(m => ({
      pos: (m.partOfSpeech || '').toLowerCase(),
      defs: (m.definitions || []).map(d => {
        const f = FORM_OF.exec(d.definition || '');
        const ex = (d.parsedExamples && d.parsedExamples[0] && d.parsedExamples[0].example) || (d.examples && d.examples[0]) || '';
        const def = stripHtml(d.definition).replace(/\(Can we [^)]*\)/g, '').trim();
        return { def, ex: stripHtml(ex).slice(0, 180), formOf: f ? f[1].trim() : '' };
      }).filter(d => d.def).slice(0, 3)
    })).filter(m => m.defs.length).slice(0, 4);
  }
  // Wiktionary → { word, meanings, koDef, base } or null. Tries the clicked form, its capitalised form (names), then likely stems.
  async function fetchWiktionary(word, capitalised) {
    const forms = [];
    candidates(word).forEach((c, i) => { forms.push(c); if (capitalised || i === 0) forms.push(c[0].toUpperCase() + c.slice(1)); });
    for (const c of forms.slice(0, 7)) {
      const data = await fetchJson(WIKT_API + encodeURIComponent(c));
      if (!data || !data.en) continue;
      let meanings = senses(data.en);
      const koDef = data.ko ? senses(data.ko).flatMap(m => m.defs.map(d => d.def)).find(hasHangul) || '' : '';
      // an inflected form only: fetch the base word's senses and show those instead
      const formOf = meanings.length && meanings.every(m => m.defs.every(d => d.formOf)) ? meanings[0].defs[0].formOf : '';
      let base = c !== word ? c : '';
      if (formOf && formOf.toLowerCase() !== c.toLowerCase()) {
        const b = await fetchJson(WIKT_API + encodeURIComponent(formOf)).catch(() => null);
        if (b && b.en) { const bs = senses(b.en); if (bs.length) { meanings = [{ pos: meanings[0].pos, defs: meanings[0].defs.slice(0, 1) }].concat(bs).slice(0, 4); base = formOf; } }
      }
      if (meanings.length) return { word: c, meanings, koDef, base };
    }
    return null;
  }
  // Free Dictionary API → { phonetic, audio, meanings } or null. Also the fallback for senses when Wiktionary fails.
  async function fetchFree(word) {
    if (freeApiDown) return null;
    try {
      for (const c of candidates(word).slice(0, 2)) {
        const data = await fetchJson(FREE_API + encodeURIComponent(c), FREE_TIMEOUT);
        if (!Array.isArray(data) || !data.length) continue;
        const phon = data.flatMap(d => d.phonetics || []);
        const audio = (phon.find(p => p.audio && /-us\.mp3$/.test(p.audio)) || phon.find(p => p.audio) || {}).audio || '';
        const meanings = [];
        data.forEach(d => (d.meanings || []).forEach(m => {
          const defs = (m.definitions || []).slice(0, 3).map(x => ({ def: x.definition, ex: x.example || '' }));
          if (defs.length) meanings.push({ pos: m.partOfSpeech || '', defs });
        }));
        return { word: c, phonetic: data.map(d => d.phonetic || (d.phonetics || []).map(p => p.text).find(Boolean)).find(Boolean) || '', audio, meanings: meanings.slice(0, 4) };
      }
      return null;
    } catch (e) { freeApiDown = true; throw e; }
  }
  // MyMemory → Korean gloss or ''. Only real Hangul output counts; the service's warnings and echoes are dropped.
  async function fetchKorean(word) {
    const data = await fetchJson(KO_API + encodeURIComponent(word));
    const t = data && data.responseData && data.responseData.translatedText;
    if (!t || data.responseStatus !== 200 && data.responseStatus !== '200') return '';
    if (/MYMEMORY WARNING|QUERY LENGTH/i.test(t) || !hasHangul(t)) return '';
    return t.trim();
  }

  // Resolves to { word, base, phonetic, audio, meanings, ko, found, offline }. Never rejects.
  async function lookup(raw) {
    const word = normalize(raw);
    if (!word) return { word: raw, found: false, meanings: [], ko: '', offline: false };
    const cached = S.getDictEntry(word);
    if (cached && (cached.found || cached.ko)) return cached;
    const [rW, rF, rK] = await Promise.allSettled([fetchWiktionary(word, /^[^a-z]*[A-Z]/.test(String(raw))), fetchFree(word), fetchKorean(word)]);
    const wikt = rW.status === 'fulfilled' ? rW.value : null;
    const free = rF.status === 'fulfilled' ? rF.value : null;
    const failed = [rW, rF, rK].filter(r => r.status === 'rejected').length;
    const en = wikt || free;
    const ko = (wikt && wikt.koDef) || (rK.status === 'fulfilled' ? rK.value : '');
    const entry = {
      word, base: en && en.word.toLowerCase() !== word ? en.word : (wikt && wikt.base) || '',
      phonetic: (free && free.phonetic) || '', audio: (free && free.audio) || '',
      meanings: en ? en.meanings : [], ko, found: !!en, offline: !en && !ko && failed > 0
    };
    if (entry.found || entry.ko) S.setDictEntry(word, entry);
    return entry;
  }

  // ---------- popover ----------
  let pop = null, anchor = null, scrollParent = null, closeHandlers = [];
  function ensurePop() {
    if (pop) return pop;
    pop = document.createElement('div');
    pop.className = 'dict-pop';
    pop.setAttribute('role', 'dialog');
    pop.setAttribute('aria-label', 'Dictionary');
    pop.hidden = true;
    document.body.appendChild(pop);
    document.addEventListener('click', (e) => { if (!pop.hidden && !pop.contains(e.target) && !(anchor && anchor.contains && anchor.contains(e.target))) close(); }, true);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !pop.hidden) close(); });
    window.addEventListener('resize', place);
    return pop;
  }
  function place() {
    if (!pop || pop.hidden || !anchor) return;
    if (window.matchMedia && window.matchMedia('(max-width: 760px)').matches) { pop.style.left = pop.style.top = ''; return; }   // bottom sheet via CSS
    const r = anchor.getBoundingClientRect();
    if (scrollParent) {
      const box = scrollParent.getBoundingClientRect();
      if (r.bottom < box.top || r.top > box.bottom) { close(); return; }   // the word scrolled out of view
    }
    const w = pop.offsetWidth, h = pop.offsetHeight, vw = window.innerWidth, vh = window.innerHeight;
    let left = Math.min(Math.max(8, r.left), vw - w - 8);
    let top = r.bottom + 8;
    if (top + h > vh - 8 && r.top - h - 8 > 8) top = r.top - h - 8;
    top = Math.min(Math.max(8, top), Math.max(8, vh - h - 8));
    pop.style.left = left + 'px'; pop.style.top = top + 'px';
  }
  function close() {
    if (!pop || pop.hidden) return;
    pop.hidden = true;
    if (scrollParent) scrollParent.removeEventListener('scroll', place);
    closeHandlers.forEach(fn => { try { fn(); } catch (e) { /* ignore */ } });
    closeHandlers = []; anchor = null; scrollParent = null;
  }
  function links(word) {
    const q = encodeURIComponent(word);
    return `<a href="https://en.dict.naver.com/#/search?query=${q}" target="_blank" rel="noopener">Naver ↗</a>
      <a href="https://dic.daum.net/search.do?q=${q}&amp;dic=eng" target="_blank" rel="noopener">Daum ↗</a>`;
  }
  function render(entry, opts) {
    const head = `<div class="head"><span class="word">${esc(entry.word)}</span>${entry.base ? `<span class="base">→ ${esc(entry.base)}</span>` : ''}
        ${entry.phonetic ? `<span class="phon">${esc(entry.phonetic)}</span>` : ''}
        <button class="say" title="Pronounce" aria-label="Pronounce">🔊</button></div>`;
    let body;
    if (entry.loading) body = `<p class="loading">Looking up…</p>`;
    else {
      const ko = entry.ko ? `<p class="ko">${esc(entry.ko)}</p>` : '';
      const senses = entry.meanings.map(m => `<div class="pos">${esc(m.pos)}</div><ol>${m.defs.map(d => `<li>${esc(d.def)}${d.ex ? `<span class="ex">“${esc(d.ex)}”</span>` : ''}</li>`).join('')}</ol>`).join('');
      const miss = entry.found ? '' : `<p class="loading">${entry.offline ? 'No connection — the dictionary needs the network. Try one of the links below.' : 'No entry found for this word.'}</p>`;
      body = ko + senses + miss;
    }
    const foot = `<div class="foot">${opts.onRead ? '<button class="btn small" data-act="read">▶ Read from here</button>' : ''}${links(entry.word)}</div>`;
    pop.innerHTML = `<button class="close" aria-label="Close">×</button>${head}${body}${foot}`;
    pop.querySelector('.close').onclick = close;
    pop.querySelector('.say').onclick = () => {
      if (entry.audio) { const a = new Audio(entry.audio); a.play().catch(() => opts.speak && opts.speak(entry.word)); }
      else if (opts.speak) opts.speak(entry.word);
    };
    const rd = pop.querySelector('[data-act="read"]');
    if (rd) rd.onclick = () => { close(); opts.onRead(); };
  }
  // Open the popover for `word`, anchored to `el`. opts: { speak(word), onRead(), scrollParent, onClose(), onResult(entry) }
  async function open(word, el, opts = {}) {
    ensurePop();
    close();
    anchor = el; scrollParent = opts.scrollParent || null;
    if (opts.onClose) closeHandlers.push(opts.onClose);
    if (scrollParent) scrollParent.addEventListener('scroll', place);
    render({ word: normalize(word) || word, loading: true, meanings: [] }, opts);
    pop.hidden = false; place();
    const entry = await lookup(word);
    if (anchor !== el) return;     // another word was opened meanwhile
    render(entry, opts); place();
    if (opts.onResult) opts.onResult(entry);
  }

  return { normalize, candidates, stripHtml, lookup, open, close, isOpen: () => !!pop && !pop.hidden };
})();

/* Narration script — turns a book's text into a list of spoken steps, shared by the audiobook (js/listen.js), the
   Little Prince film (books/little-prince/film/script.js) and the recording tool (tools/book-voices.py). No DOM here,
   so node can load it too.
   Every paragraph is kept. Without a cast the narrator reads everything; with one (books/<id>/cast.js, or film/cast.js
   for The Little Prince) each "double-quoted" span is spoken by the speaker listed for it, in order, and a quote listed
   as 'narrator' (a book title, a number, a thought) stays in the narration.
   A recorded voice for a step is books/<id>/<audio dir>/<key>.mp3, where key = audioKey(who, say, tts): change a line,
   a speaker or a voice and only that step gets a new file name. */
window.LP_NARRATION = (function () {
  // Split a paragraph at double quotes: straight " toggles, curly “ opens and ” closes. A paragraph that ends inside a
  // quote (the speech goes on in the next paragraph, which opens with a new quote mark) closes it at the end.
  function spans(p) {
    const out = [];
    let cur = '', inQ = false;
    for (const ch of p) {
      if ((ch === '"' && !inQ) || (ch === '“' && !inQ)) { if (cur) out.push({ q: false, text: cur }); cur = ch; inQ = true; }
      else if ((ch === '"' || ch === '”') && inQ) { cur += ch; out.push({ q: true, text: cur }); cur = ''; inQ = false; }
      else cur += ch;
    }
    if (cur) out.push({ q: inQ, text: cur });
    return out;
  }
  const quoteCount = (p) => spans(p).filter(s => s.q).length;

  // What the voice reads: no quote marks, _italic_ or =bold= marks or [*] footnote signs, "..." as a pause, a lone dash dropped.
  function spoken(t) {
    return t.replace(/["“”_=]|\[\*\]/g, '').replace(/\.\.\.|…/g, '… ').replace(/\s—\s|—/g, ', ').replace(/\s+/g, ' ').trim();
  }
  const hasWords = (t) => /[A-Za-z0-9]/.test(t);

  // Break a line into subtitle-sized pieces at sentence ends. "..." and "!" inside a short cry do not end a
  // piece on their own: pieces under MIN characters are joined to the next one.
  const MIN = 42, MAX = 230;
  function chunks(t) {
    const re = /[^.!?…]+(?:[.!?…]+["')\]]*|$)/g;
    const sents = [];
    let m;
    while ((m = re.exec(t)) !== null) { if (m[0].trim()) sents.push(m[0]); }
    if (!sents.length) return [t.trim()];
    // keep leading spaces with the previous sentence so pieces join back to the original
    const out = [];
    let cur = '';
    for (const s of sents) {
      if (cur && (cur.trim().length >= MIN || (cur + s).trim().length > MAX)) { out.push(cur); cur = ''; }
      cur += s;
    }
    if (cur.trim()) {
      if (out.length && cur.trim().length < 14) out[out.length - 1] += cur; else out.push(cur);
    }
    const covered = out.join('').length;
    if (covered < t.length) out[out.length - 1] += t.slice(covered);   // trailing text the pattern did not take
    return out.map(s => s.trim()).filter(Boolean);
  }

  /* chapters: [{ num, paragraphs }] from LP_PARSER.parse; speakers: { [num]: 'prince pilot …' } or null (no cast:
     no quote count check). Returns { chapters: [{ num, beats: [...] }], errors: [...] }. A beat is either
       { picture: '01-1', alt }  or  { para: i, text, lines: [{ who, text, say, start, end, parts: [{ text, say }] }] }
     where start/end index into the paragraph text (for highlighting the line being spoken). */
  function build(chapters, speakers, picture) {
    const errors = [];
    const out = chapters.map(c => {
      const list = String((speakers && speakers[c.num]) || '').split(/\s+/).filter(Boolean);
      const need = c.paragraphs.reduce((n, p) => n + (picture && picture(p) ? 0 : quoteCount(p)), 0);
      if (speakers && list.length !== need) errors.push(`chapter ${c.num}: ${need} quotes in the text, ${list.length} speakers in cast.js`);
      let k = 0;
      const beats = [];
      c.paragraphs.forEach((p, i) => {
        const pic = picture && picture(p);
        if (pic) { beats.push({ picture: pic.id, alt: pic.alt }); return; }
        const lines = [];
        let pos = 0;
        for (const s of spans(p)) {
          const who = s.q ? (list[k++] || 'narrator') : 'narrator';
          const start = pos, end = pos + s.text.length;
          pos = end;
          const last = lines[lines.length - 1];
          // narration that is only punctuation or a quote kept in the narration joins its neighbour
          if (last && last.who === who) { last.text += s.text; last.end = end; continue; }
          if (!hasWords(s.text) && last) { last.text += s.text; last.end = end; continue; }
          lines.push({ who, text: s.text, start, end });
        }
        lines.forEach(l => { l.say = spoken(l.text); l.parts = chunks(l.text).map(t => ({ text: t, say: spoken(t) })); });
        beats.push({ para: i, text: p, lines: lines.filter(l => hasWords(l.text)) });
      });
      return { num: c.num, beats };
    });
    return { chapters: out, errors };
  }

  const ONES = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen',
    'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const TENS = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const numberWord = (n) => n < 20 ? ONES[n] : n < 100 ? TENS[Math.floor(n / 10)] + (n % 10 ? '-' + ONES[n % 10].toLowerCase() : '') : String(n);
  const letters = (t) => String(t).toLowerCase().replace(/[^a-z0-9]/g, '');

  /* The whole book as a list of steps: a title, the front matter to read, then for each chapter a card, its pictures
     and every subtitle-sized line. A step is { kind: 'title'|'card'|'picture'|'line'|'end', img, ch, para, who?, text?, say? };
     img is the picture on screen ('cover', 'chapter-NN' or a picture id), say what the voice reads (pictures and the end have none).
     o: { speakers, picture, scenes, title, by, note, front: [paragraphs read after the title],
          cardTitle: say the chapter title after "Chapter One." (unless the chapter's text opens with it), end: img of the end step } */
  function timeline(parsed, o) {
    o = o || {};
    const built = build(parsed.chapters, o.speakers || null, o.picture);
    const steps = [], chapterStart = {};
    const pad = (n) => String(n).padStart(2, '0');
    const narr = (text, extra) => chunks(text).map(t => Object.assign({ kind: 'line', who: 'narrator', text: t, say: spoken(t) }, extra));
    steps.push({ kind: 'title', img: 'cover', ch: 0, who: 'narrator', title: o.title || '', by: o.by || '', note: o.note || '',
      say: o.by ? `${o.title}. By ${o.by}.` : `${o.title}.`, para: 't' });
    (o.front || []).forEach((p, i) => narr(p, { img: 'cover', ch: 0, para: 'f' + i }).forEach(s => steps.push(s)));
    let img = 'cover';
    built.chapters.forEach(c => {
      const sc = (o.scenes || []).find(x => x.num === c.num) || {};
      img = 'chapter-' + pad(c.num);
      chapterStart[c.num] = steps.length;
      const first = c.beats.find(b => b.lines);
      const named = o.cardTitle && sc.title && !(first && letters(first.text).startsWith(letters(sc.title)));
      const title = named ? ' ' + sc.title.trim() + (/[.!?]$/.test(sc.title.trim()) ? '' : '.') : '';
      steps.push({ kind: 'card', img, ch: c.num, who: 'narrator', title: sc.title || '', ko: sc.ko || '', say: `Chapter ${numberWord(c.num)}.${title}`, para: 'c' + c.num });
      c.beats.forEach(b => {
        if (b.picture) { img = b.picture; steps.push({ kind: 'picture', img, ch: c.num, alt: b.alt, para: 'p' + b.picture }); return; }
        b.lines.forEach(l => l.parts.forEach(p => {
          steps.push({ kind: 'line', img, ch: c.num, who: l.who, text: p.text, say: p.say, para: c.num + '.' + b.para });
        }));
      });
    });
    const lastCh = built.chapters.length ? built.chapters[built.chapters.length - 1].num : 0;
    steps.push({ kind: 'end', img: o.end || img, ch: lastCh, para: 'end' });
    return { steps, chapterStart, errors: built.errors };
  }

  /* A library entry's audiobook (js/library.js `listen`, all optional):
       audio: folder of the recordings under books/<id>/ (default 'audio'; its list is '<audio>.js')
       cast:  file with the characters' voices and the speaker of every quote (default 'cast.js')
       frontTitle: title, author and a note are the first three front-matter paragraphs, the rest is read after them
       cardTitle: false to say only "Chapter One." on chapter cards; end: img of the end step */
  function forBook(book, parsed, scenes, cast, picture) {
    const L = book.listen || {}, front = parsed.front || [];
    const head = L.frontTitle
      ? { title: front[0] || book.title, by: front[1] || book.author || '', note: front[2] || '', front: front.slice(3) }
      : { title: book.title, by: book.author || '', front: [] };
    return timeline(parsed, Object.assign(head, { speakers: cast && cast.speakers ? cast.speakers : null, picture, scenes,
      cardTitle: L.cardTitle !== false, end: L.end }));
  }
  const audioDir = (book) => (book.listen && book.listen.audio) || 'audio';
  const castFile = (book) => (book.listen && book.listen.cast) || 'cast.js';

  // Without a cast.js the narrator alone reads the book in this voice (tools/book-voices.py records it). A tts with
  // engine: 'kokoro' is recorded on this computer by Kokoro-82M instead of OpenAI (its voice names look like am_michael).
  const DEFAULT_CAST = { characters: { narrator: { name: 'Narrator', ko: '낭독자', color: '#e9dcc0', voice: 'male', pitch: 1, rate: 1,
    tts: { voice: 'ash', shift: 0, how: 'A warm, clear storyteller reading a classic book aloud to learners of English: natural pace, gentle expression, every word distinct; characters\' lines lightly acted, never exaggerated.' } } } };
  const castOf = (cast) => (cast && cast.characters && cast.characters.narrator ? cast : DEFAULT_CAST);
  const character = (cast, who) => { const c = castOf(cast); return c.characters[who || 'narrator'] || c.characters.narrator; };

  /* FNV-1a over the UTF-8 bytes of what is said and how, 8 hex digits. */
  function audioKey(who, say, tts) {
    const t = tts || {};
    const bytes = new TextEncoder().encode(['v1', who, say, t.voice || '', t.shift || 0, t.how || ''].join('\n'));
    let h = 0x811c9dc5;
    for (const b of bytes) { h ^= b; h = Math.imul(h, 0x01000193) >>> 0; }
    return h.toString(16).padStart(8, '0');
  }
  const keyOf = (step, cast) => audioKey(step.who || 'narrator', step.say, character(cast, step.who).tts);

  return { spans, quoteCount, spoken, chunks, build, numberWord, timeline, forBook, audioDir, castFile, DEFAULT_CAST, castOf, character, audioKey, keyOf };
})();

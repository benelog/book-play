/* The Little Prince film — turns the book text into a timed script (no DOM here, so tools/test.js can load it).
   Every paragraph of text/the-little-prince.txt is kept: narration is spoken by the narrator (the pilot telling
   the story), and each "double-quoted" span is spoken by the speaker listed for it in cast.js, in order.
   A quote listed as 'narrator' (a book title, a number, a thought told by the pilot) stays in the narration. */
window.LP_FILM_SCRIPT = (function () {
  // Split a paragraph at straight double quotes. A paragraph that ends inside a quote (the speech goes on in the
  // next paragraph, which opens with a new quote mark) closes the quote at the end of the paragraph.
  function spans(p) {
    const out = [];
    let cur = '', inQ = false;
    for (const ch of p) {
      if (ch === '"') {
        if (!inQ) { if (cur) out.push({ q: false, text: cur }); cur = '"'; inQ = true; }
        else { cur += '"'; out.push({ q: true, text: cur }); cur = ''; inQ = false; }
      } else cur += ch;
    }
    if (cur) out.push({ q: inQ, text: cur });
    return out;
  }
  const quoteCount = (p) => spans(p).filter(s => s.q).length;

  // What the voice reads: no quote marks, "..." as a pause, a lone dash dropped.
  function spoken(t) {
    return t.replace(/"/g, '').replace(/\.\.\.|…/g, '… ').replace(/\s—\s|—/g, ', ').replace(/\s+/g, ' ').trim();
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

  /* chapters: [{ num, paragraphs }] from LP_PARSER.parse; speakers: { [num]: 'prince pilot …' }.
     Returns { chapters: [{ num, beats: [...] }], errors: [...] }. A beat is either
       { picture: '01-1', alt }  or  { para: i, text, lines: [{ who, text, say, start, end, parts: [{ text, say }] }] }
     where start/end index into the paragraph text (for highlighting the line being spoken). */
  function build(chapters, speakers, picture) {
    const errors = [];
    const out = chapters.map(c => {
      const list = String(speakers[c.num] || '').split(/\s+/).filter(Boolean);
      const need = c.paragraphs.reduce((n, p) => n + (picture && picture(p) ? 0 : quoteCount(p)), 0);
      if (list.length !== need) errors.push(`chapter ${c.num}: ${need} quotes in the text, ${list.length} speakers in cast.js`);
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

  return { spans, quoteCount, spoken, chunks, build };
})();

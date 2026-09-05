/* Splits a plain-text English edition into 27 chapters.
   Accepted heading styles (one per line, any case):
     Chapter 1 / CHAPTER I / Chapter One / 1 / I / 1. / XXI / Chapter 21: title
   Or a manual delimiter: a line made only of "===" (three or more).            */
window.LP_PARSER = (function () {
  const WORDS = ['zero','one','two','three','four','five','six','seven','eight','nine','ten',
    'eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty'];
  const TENS = { twenty: 20 };

  function wordToNum(w) {
    w = w.toLowerCase().replace(/\s+/g, '-');
    const i = WORDS.indexOf(w);
    if (i >= 0) return i;
    const m = w.match(/^(twenty)-?(one|two|three|four|five|six|seven|eight|nine)$/);
    if (m) return TENS[m[1]] + WORDS.indexOf(m[2]);
    return null;
  }
  function romanToNum(s) {
    const map = { i: 1, v: 5, x: 10, l: 50, c: 100 };
    s = s.toLowerCase();
    if (!/^[ivxlc]+$/.test(s)) return null;
    let total = 0;
    for (let i = 0; i < s.length; i++) {
      const cur = map[s[i]], next = map[s[i + 1]] || 0;
      total += cur < next ? -cur : cur;
    }
    return total;
  }
  const HEADING = /^\s*(?:chapter|chapitre|ch\.?)?\s*(\d{1,2}|[ivxlc]{1,7}|twenty[-\s]?(?:one|two|three|four|five|six|seven|eight|nine)|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty)\b\s*[.:—–-]?\s*(.{0,60})?$/i;

  function headingNumber(line) {
    const m = line.match(HEADING);
    if (!m) return null;
    const tok = m[1];
    let n = null;
    if (/^\d+$/.test(tok)) n = parseInt(tok, 10);
    else if (/^[ivxlc]+$/i.test(tok)) n = romanToNum(tok);
    else n = wordToNum(tok);
    // A bare word like "One" mid-text could be a sentence: only accept if the line is short.
    if (n == null) return null;
    const hasPrefix = /^\s*(chapter|chapitre|ch\.?)/i.test(line);
    const trailing = (m[2] || '').trim();
    if (!hasPrefix && trailing && !/^[.:—–-]?\s*$/.test(trailing)) return null;
    if (!hasPrefix && line.trim().length > 12) return null;
    return n;
  }

  // A hard-wrapped block (lines of similar width) usually holds several paragraphs: a paragraph
  // ends where a line is clearly shorter than the block's width and ends with a full stop or quote.
  const FRONT = /produced by|proofread|^note:|project gutenberg|https?:\/\/|author of|frederick warne|penguin|\bltd\b|\binc\b|copyright|rights reserved|printed|published|impression|berne convention|reproduced|retrieval system|transmitted|without limiting|permission of the publisher|\bisbn\b|library of congress|catalogu/i;
  const END = /[.!?…"”’')\]]$/;
  function splitRagged(block) {
    const ls = block.split('\n').map(l => l.trim()).filter(Boolean);
    if (ls.length < 4) return [ls.join(' ')];
    const width = Math.max(...ls.map(l => l.length));
    if (width < 50) return [ls.join(' ')];
    const out = []; let cur = [];
    ls.forEach((l, i) => {
      cur.push(l);
      const last = i === ls.length - 1;
      if (!last && l.length < width * 0.6 && END.test(l)) { out.push(cur.join(' ')); cur = []; }
    });
    if (cur.length) out.push(cur.join(' '));
    return out;
  }
  const NOISE = /^\s*(\[Illustration[^\]]*\]\s*|Produced by .*|E-text prepared by .*|\[?Transcriber'?s? Note.*|Printed (and bound )?in .*|First published .*|Copyright .*|All rights reserved.*|Reprinted .*|This impression .*|Universal Copyright.*|Note: Project Gutenberg.*|.*Proofreading Team.*|.*pgdp\.net.*|.*\.(htm|zip)\b.*|\s*or\s*|.*(Clowes|Beccles|Penguin|Frederick Warne|Author of|Berne Convention|retrieval system|without limiting|permission of the publisher|\bLtd\b|\bInc\b\.?|ISBN).*)$/i;
  function clean(lines) {
    return lines.map(l => l.replace(/\[Illustration[^\]]*\]/g, '').replace(/[ \t]+$/, '')).filter(l => !NOISE.test(l));
  }
  // Title pages and publisher credits arrive as a run of short lines before the story starts.
  // Three or more short paragraphs at the top are treated as front matter and dropped; one or two are kept (a title, a first line of dialogue).
  function dropFrontMatter(paras) {
    let i = 0;
    while (i < paras.length && (paras[i].split(/\s+/).length < 12 || FRONT.test(paras[i]))) i++;
    return i >= 3 && i < paras.length ? paras.slice(i) : paras;
  }
  // Front matter (everything before the first chapter heading) is kept as-is for the title page:
  // blank lines and short lines end a paragraph, so a dedication keeps its own line breaks.
  function frontParagraphs(lines) {
    lines = clean(lines).map(l => l.trim());
    const width = Math.max(0, ...lines.map(l => l.length));
    const out = []; let buf = [];
    const flush = () => { if (buf.length) out.push(buf.join(' ')); buf = []; };
    for (const l of lines) {
      if (!l) { flush(); continue; }
      if (l.length < width * 0.6) {
        if (buf.length && /^[a-z]/.test(l)) { buf.push(l); flush(); }
        else { flush(); out.push(l); }
      } else buf.push(l);
    }
    flush();
    return out.filter(p => !FRONT.test(p));
  }
  function toParagraphs(lines) {
    lines = clean(lines);
    const text = lines.join('\n').replace(/\r/g, '');
    const hasBlank = /\n\s*\n/.test(text.trim());
    let paras;
    if (hasBlank) {
      // PDF exports often put a blank line after a chapter's first line: glue a one-line block that
      // does not end a sentence onto the block that follows it.
      const blocks = text.split(/\n\s*\n+/).map(b => b.trim()).filter(Boolean);
      const merged = [];
      for (let i = 0; i < blocks.length; i++) {
        let b = blocks[i];
        // only wrapped prose is glued: a long last line with lowercase letters that does not end a sentence
        const lastLine = () => b.trim().split('\n').pop().trim();
        while (!END.test(lastLine()) && lastLine().length >= 45 && /[a-z]/.test(lastLine()) && !FRONT.test(lastLine()) && i + 1 < blocks.length) { b = b + '\n' + blocks[++i]; }
        merged.push(b);
      }
      paras = [];
      merged.forEach(b => paras.push(...splitRagged(b)));
    } else {
      paras = text.split('\n');
    }
    return dropFrontMatter(paras.map(p => p.trim()).filter(Boolean));
  }

  // Project Gutenberg files: keep only what lies between the *** START and *** END markers.
  function stripGutenberg(text) {
    const start = text.search(/^\*\*\* ?START OF (THE|THIS) PROJECT GUTENBERG EBOOK.*$/mi);
    if (start >= 0) text = text.slice(text.indexOf('\n', start) + 1);
    const end = text.search(/^\*\*\* ?END OF (THE|THIS) PROJECT GUTENBERG EBOOK.*$/mi);
    if (end >= 0) text = text.slice(0, end);
    return text;
  }
  const wordCount = (ls) => ls.join(' ').split(/\s+/).filter(Boolean).length;

  function parse(raw, expected) {
    expected = expected || 27;
    let text = String(raw || '').replace(/\r\n?/g, '\n').replace(/ /g, ' ');
    if (!/^\s*={3,}\s*$/m.test(text)) text = stripGutenberg(text);
    const lines = text.split('\n');
    const warnings = [];
    let chapters = [];
    let front = [];

    const delimIdx = lines.map((l, i) => (/^\s*={3,}\s*$/.test(l) ? i : -1)).filter(i => i >= 0);
    if (delimIdx.length >= 2) {
      // Manual delimiters: chapter k = text between delimiter k-1 and k (text before first delimiter is ignored)
      for (let k = 0; k < delimIdx.length; k++) {
        const start = delimIdx[k] + 1;
        const end = k + 1 < delimIdx.length ? delimIdx[k + 1] : lines.length;
        const body = stripGutenberg(lines.slice(start, end).join('\n')).split('\n');
        chapters.push({ num: k + 1, paragraphs: toParagraphs(body) });
      }
      front = frontParagraphs(lines.slice(0, delimIdx[0]));
      warnings.push('Split on === delimiter lines.');
    } else {
      let expected = 1;
      let current = null; // { num, lines }
      const found = [];
      let firstHeading = -1;
      for (let li = 0; li < lines.length; li++) {
        const line = lines[li];
        const n = headingNumber(line);
        // A table of contents looks like a run of headings with almost no text between them.
        // When "Chapter 1" turns up again and everything found so far is that thin, start over.
        if (n === 1 && found.length + (current ? 1 : 0) >= 2 && found.every(c => wordCount(c.lines) < 40)) {
          found.length = 0; current = null; expected = 1;
        }
        if (n != null && n === expected) {
          if (n === 1) firstHeading = li;
          if (current) found.push(current);
          current = { num: n, lines: [] };
          expected++;
          continue;
        }
        if (current) current.lines.push(line);
      }
      if (current) found.push(current);
      chapters = found.map(c => ({ num: c.num, paragraphs: toParagraphs(c.lines) }));
      if (firstHeading > 0) front = frontParagraphs(lines.slice(0, firstHeading));
      if (!chapters.length) {
        warnings.push('No chapter headings (Chapter 1, I, 1 …) were found. Put a line with === between chapters.');
      }
    }

    chapters = chapters.filter(c => c.paragraphs.length);
    if (chapters.length && chapters.length !== expected) {
      warnings.push(`Expected ${expected} chapters but found ${chapters.length}. Please check the preview.`);
    }
    const words = chapters.reduce((s, c) => s + c.paragraphs.join(' ').split(/\s+/).length, 0);
    return { chapters, warnings, words, front };
  }

  // Sentence splitter for TTS / highlighting. Keeps closing quotes with the sentence.
  const ABBR = /\b(Mr|Mrs|Ms|Dr|St|No|vs|etc)\.$/i;
  function sentences(paragraph) {
    const out = [];
    const re = /[^.!?…]+(?:[.!?…]+["'”’)\]]*|$)/g;
    let m, buf = '';
    while ((m = re.exec(paragraph)) !== null) {
      const piece = m[0];
      if (!piece.trim()) continue;
      buf += piece;
      if (ABBR.test(buf.trim()) || /\b[A-Z]\.$/.test(buf.trim())) continue; // abbreviation: keep joining
      out.push(buf.trim());
      buf = '';
    }
    if (buf.trim()) out.push(buf.trim());
    return out;
  }

  return { parse, sentences, headingNumber, VERSION: 5 };
})();

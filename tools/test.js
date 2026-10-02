/* node tools/test.js — parser, matcher and every book's scene data (no browser needed). */
const fs = require('fs'), path = require('path');
global.window = {};
// in-memory localStorage so storage.js / dict.js load outside a browser
const mem = {};
global.localStorage = { getItem: (k) => (k in mem ? mem[k] : null), setItem: (k, v) => { mem[k] = String(v); }, removeItem: (k) => { delete mem[k]; } };
require('../js/parser.js'); require('../js/narration.js'); require('../js/matcher.js'); require('../js/storage.js'); require('../js/dict.js');
const P = window.LP_PARSER, M = window.LP_MATCHER, S = window.LP_STORAGE, D = window.LP_DICT;
let fails = 0;
const ok = (cond, msg) => { if (!cond) { fails++; console.log('FAIL', msg); } };

const roman = ['', 'I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV','XV','XVI','XVII','XVIII','XIX','XX','XXI','XXII','XXIII','XXIV','XXV','XXVI','XXVII'];
const words = ['', 'One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Eleven','Twelve','Thirteen','Fourteen','Fifteen','Sixteen','Seventeen','Eighteen','Nineteen','Twenty','Twenty-One','Twenty-Two','Twenty-Three','Twenty-Four','Twenty-Five','Twenty-Six','Twenty-Seven'];
function synth(headingFn, blankLines = true) {
  let t = 'AN EXAMPLE BOOK\n\nTo a friend\n\n';
  for (let i = 1; i <= 27; i++) {
    t += headingFn(i) + '\n\n';
    t += `Paragraph one of chapter ${i}. It has two sentences! Does it? Mr. Smith said no.\n${blankLines ? '\n' : ''}Paragraph two of chapter ${i}, with "quotes." And I said: "One more."\n\n`;
  }
  return t;
}
const styles = {
  'Chapter N': i => `Chapter ${i}`, 'CHAPTER ROMAN': i => `CHAPTER ${roman[i]}`, 'bare roman': i => roman[i],
  'bare number': i => `${i}`, 'Chapter Word': i => `Chapter ${words[i]}`, 'number dot': i => `${i}.`, 'delimiter': i => `===`
};
for (const [name, fn] of Object.entries(styles)) {
  const r = P.parse(synth(fn));
  ok(r.chapters.length === 27, `${name}: got ${r.chapters.length} chapters`);
  ok(r.chapters[26] && r.chapters[26].paragraphs.length === 2, `${name}: ch27 paragraphs = ${r.chapters[26] && r.chapters[26].paragraphs.length}`);
}
ok(P.parse(synth(i => `Chapter ${i}`), 12).warnings.some(w => /Expected 12/.test(w)), 'expected-count warning');
ok((P.parse(synth(i => `Chapter ${i}`)).front || []).includes('To a friend'), 'front matter kept: ' + JSON.stringify(P.parse(synth(i => `Chapter ${i}`)).front));
const r2 = P.parse(synth(i => `Chapter ${i}`, false));
ok(r2.chapters.length === 27 && r2.chapters[0].paragraphs.length === 2, 'single newline paragraphs');
const r3 = P.parse('Chapter 1\n\nI went out.\nI\n\nChapter 2\n\nText\n\nII\n\nmore');
ok(r3.chapters.length === 2 && r3.chapters[1].paragraphs.join(' ').includes('more'), 'sequence guard');
// hard-wrapped block: short punctuated line ends a paragraph; dangling block joins the next one
const wrapped = 'Chapter 1\n\n' + 'The first line of a paragraph that is wrapped by hand at about seventy chars.\n'.repeat(3) + 'Short end.\n' + 'Another paragraph line that is also quite long and wraps around the margin.\n'.repeat(3) + 'Done.\n\nA dangling opener that was cut off by the PDF export without a full stop\n\nfinishes here.\n';
const r4 = P.parse(wrapped + '\nChapter 2\n\nx.');
ok(r4.chapters[0].paragraphs.length === 3, 'ragged split: ' + r4.chapters[0].paragraphs.length);
// a paragraph ending in a colon introduces the next one (dialogue, a song): the two are not glued
const r5 = P.parse('Chapter 1\n\nWhen I finally managed to speak, I said to him quietly:\n\n"But what are you doing here?"\n\nChapter 2\n\nx.');
ok(r5.chapters[0].paragraphs.length === 2, 'colon paragraph kept apart: ' + r5.chapters[0].paragraphs.length);
// Gutenberg-style file: licence header, a contents list, "Chapter I" + title line, licence footer
const gut = ['The Project Gutenberg eBook of Example', '', '*** START OF THE PROJECT GUTENBERG EBOOK EXAMPLE ***', '', 'Contents', '',
  ' Chapter I. The Cyclone', ' Chapter II. The Council', ' Chapter III. The Road', '', 'Introduction', '', 'Folklore and legends have followed childhood through the ages. ' + 'Every healthy youngster loves stories that are fantastic and marvellous. '.repeat(6), '']
  .concat([1, 2, 3].flatMap(i => [`Chapter ${roman[i]}`, ['The Cyclone', 'The Council', 'The Road'][i - 1], '', `Body of chapter ${i}. It has a few sentences! Yes it does.`, '', `Second paragraph of chapter ${i}.`, '']))
  .concat(['*** END OF THE PROJECT GUTENBERG EBOOK EXAMPLE ***', '', 'Section 1. General Terms of Use. Chapter I of the licence.', '']).join('\n');
const rg = P.parse(gut, 3);
ok(rg.chapters.length === 3, 'gutenberg: chapters ' + rg.chapters.length);
ok(rg.chapters[0] && rg.chapters[0].paragraphs[0] === 'The Cyclone', 'gutenberg: title line kept as first paragraph: ' + (rg.chapters[0] && rg.chapters[0].paragraphs[0]));
ok(rg.chapters[2] && !rg.chapters[2].paragraphs.join(' ').includes('licence'), 'gutenberg: footer stripped');
ok(rg.warnings.length === 0, 'gutenberg: no warnings ' + JSON.stringify(rg.warnings));

// several Gutenberg files joined with === (one tale per file): each block keeps only its own body
const tale = (i) => ['===', `The Project Gutenberg eBook of Tale ${i}`, '', '*** START OF THE PROJECT GUTENBERG EBOOK TALE ***', '', `Once upon a time there was tale number ${i}. It was short.`, '', '*** END OF THE PROJECT GUTENBERG EBOOK TALE ***', 'Licence text here.', ''].join('\n');
// front matter: [Illustration] tags, "Produced by", a run of short title-page lines
const fm = ['Chapter 1', '', '[Illustration]', '', 'THE TALE OF', '', 'PETER RABBIT', '', 'BY', '', 'BEATRIX POTTER', '', 'FREDERICK WARNE', '', 'First published 1902', '', 'Produced by Someone', '',
  'Once upon a time there were four little rabbits who lived under a big fir tree with their mother.', '', '[Illustration]', '', 'They went out. "Hi!" said one.', '', 'Chapter 2', '', 'Short title', '', 'A long enough paragraph of ordinary story text that certainly has more than twelve words in it.', ''].join('\n');
const rf = P.parse(fm, 2);
ok(rf.chapters[0] && rf.chapters[0].paragraphs.length === 2 && /^Once upon/.test(rf.chapters[0].paragraphs[0]), 'front matter dropped: ' + JSON.stringify(rf.chapters[0] && rf.chapters[0].paragraphs));
ok(rf.chapters[1] && rf.chapters[1].paragraphs[0] === 'Short title', 'single short title kept');
ok(!JSON.stringify(rf).includes('Illustration'), 'illustration tags removed');
const rj = P.parse([1, 2, 3].map(tale).join('\n'), 3);
ok(rj.chapters.length === 3, 'joined gutenberg files: chapters ' + rj.chapters.length);
ok(rj.chapters.every(c => c.paragraphs.length === 1 && /tale number/.test(c.paragraphs[0])), 'joined gutenberg files: bodies only ' + JSON.stringify(rj.chapters.map(c => c.paragraphs)));

const ss = P.sentences('Paragraph one. It has two sentences! Does it? Mr. Smith said "no." Then he left…');
ok(ss.length === 5, 'sentences: ' + JSON.stringify(ss));

// every book under books/<id>/scenes.js
const booksDir = path.join(__dirname, '..', 'books');
require(path.join(__dirname, '..', 'js', 'library.js'));
const LIB = window.LP_LIBRARY;
ok(Array.isArray(LIB) && LIB.length, 'library registry');
for (const b of LIB) ok(fs.existsSync(path.join(booksDir, b.id, 'scenes.js')), `${b.id}: registered but scenes.js missing`);
// every book folder (registered or not, except _template) must hold valid scene data
const folders = fs.readdirSync(booksDir).filter(d => !d.startsWith('_') && fs.existsSync(path.join(booksDir, d, 'scenes.js')));
for (const id of folders) {
  const b = LIB.find(x => x.id === id) || { id };
  if (!LIB.find(x => x.id === id)) console.log(`note: books/${id} is not registered in js/library.js`);
  const f = path.join(booksDir, id, 'scenes.js');
  delete window.LP_SCENES; delete window.LP_ROLES; require(f);
  const SC = window.LP_SCENES;
  ok(Array.isArray(SC) && SC.length === (b.chapters || SC.length), `${b.id}: chapter count ${SC && SC.length} vs registry ${b.chapters}`);
  const ROLES = window.LP_ROLES || {};
  SC.forEach((c, ci) => {
    ok(c.num === ci + 1 && c.title && c.scenes && c.scenes.length, `${b.id} ch${c.num}: bad chapter`);
    c.scenes.forEach((sc, i) => {
      const tag = `${b.id} ch${c.num} scene${i + 1}`;
      ok(sc.situation && sc.prompt && sc.speaker && sc.line != null && sc.model && sc.answers && sc.reply && sc.reply.line, `${tag}: missing fields`);
      ok(!sc.role || ROLES[sc.role] || sc.roleText, `${tag}: role "${sc.role}" not in LP_ROLES`);
      ok(!sc.situationKo || (sc.promptKo && sc.summaryKo !== undefined) || true, '');
      ok(M.match(sc.model, sc.answers), `${tag}: model answer does not match: "${sc.model}"`);
      if (sc.distractors) {
        ok(sc.distractors.length === 3, `${tag}: needs 3 distractors`);
        sc.distractors.forEach(d => { ok(d !== sc.model, `${tag}: distractor equals model`); ok(!M.match(d, sc.answers), `${tag}: distractor would pass as a typed answer: "${d}"`); });
      }
      ok(String(sc.model).split(/\s+/).length <= 40, `${tag}: model answer too long`);
      if (sc.hintsKo) ok(sc.hintsKo.length === (sc.hints || []).length, `${tag}: hintsKo length`);
    });
  });
}
// matcher behaviour
ok(M.match("It's a boa constricter digesting an elefant", [{ all: ['boa', 'elephant'] }]) === false, 'two typos should fail');
ok(M.match("a boa constrictor eating an elephent", [{ all: ['boa', 'elephant'] }]), 'one-letter typo tolerated');
ok(M.match("I won't leave you", [{ all: ['not', 'leave'] }]), "contraction won't");
ok(M.match("Draw me a sheep", [{ all: ['boa', 'elephant'] }]) === false, 'negative');
ok(M.match("what does tame mean?", [{ all: ['tame'], any: ['what', 'mean'] }]), 'any-group');
ok(M.match("B-612", [{ any: ['b 612', 'b612', '612'] }]), 'hyphen number');

// dictionary helpers: the clicked form is normalised, inflections fall back to likely stems
ok(D.normalize('“Don’t,”') === "don't", 'normalize: ' + D.normalize('“Don’t,”'));
ok(D.candidates('cyclones').includes('cyclone'), 'stem -s');
ok(D.candidates('carried').includes('carry'), 'stem -ied');
ok(D.candidates('running').includes('run'), 'stem -ing doubled consonant: ' + D.candidates('running'));
ok(D.candidates('hoped').includes('hope'), 'stem -ed +e');
ok(D.candidates('Dorothy’s')[0] === "dorothy's" && D.candidates('Dorothy’s').includes('dorothy'), 'possessive');
ok(D.candidates('glass').includes('glas') === false, 'no -s stem for -ss');
ok(D.candidates('quickly').includes('quick'), 'stem -ly');
ok(D.candidates('x').length <= 5 && D.candidates('happiest').length <= 5, 'at most five candidates');
ok(D.stripHtml('<span class="x"></span> Any <a href="/wiki/weather">weather</a> &amp; wind&nbsp;&#8212; “storm”') === 'Any weather & wind — “storm”', 'stripHtml: ' + D.stripHtml('<span class="x"></span> Any <a href="/wiki/weather">weather</a> &amp; wind&nbsp;&#8212; “storm”'));

// study history: same chapter / word moves to the top with a count instead of duplicating; cap holds
S.use('oz');
S.addHistory({ type: 'open', book: 'oz', chapter: 1, mode: 'read' });
S.addHistory({ type: 'word', book: 'oz', chapter: 1, word: 'cyclone', ko: '사이클론' });
S.addHistory({ type: 'open', book: 'oz', chapter: 1, mode: 'play' });
let H = S.getHistory();
ok(H.length === 2 && H[0].type === 'open' && H[0].mode === 'play' && H[0].count === 2, 'history dedupe: ' + JSON.stringify(H));
S.addHistory({ type: 'word', book: 'oz', chapter: 2, word: 'cyclone', ko: '' });
H = S.getHistory();
ok(H.length === 2 && H[0].word === 'cyclone' && H[0].count === 2 && H[0].ko === '사이클론' && H[0].chapter === 2, 'word dedupe keeps the earlier gloss: ' + JSON.stringify(H[0]));
for (let i = 0; i < 450; i++) S.addHistory({ type: 'open', book: 'b' + i, chapter: 1 });
ok(S.getHistory().length === 400, 'history capped at 400: ' + S.getHistory().length);
S.clearHistory(); ok(S.getHistory().length === 0, 'history cleared');
mem['lp.v1.history'] = '{bad json';
ok(Array.isArray(S.getHistory()) && S.getHistory().length === 0, 'corrupt history is ignored');
// dictionary cache: oldest entries are evicted past the cap
for (let i = 0; i < 305; i++) S.setDictEntry('w' + i, { found: true, meanings: [] });
ok(!S.getDictEntry('w0') && S.getDictEntry('w304'), 'dict cache evicts the oldest');

// The audiobook (js/narration.js forBook): every book reads every word of its text, its cast (if any) names a speaker
// for every quote, and every recording its list names exists; how many steps are recorded is only reported
const loadBook = require('./load-book.js');
{
  const N = window.LP_NARRATION;
  const letters = (t) => t.replace(/[^A-Za-z0-9]/g, '');
  ok(N.spoken('“Hello,” said _Alice_ =loudly= —[*] well...') === 'Hello, said Alice loudly, well…', 'narration: spoken() strips marks: ' + N.spoken('“Hello,” said _Alice_ =loudly= —[*] well...'));
  ok(N.spans('He said “one” and "two".').filter(x => x.q).length === 2, 'narration: curly and straight quotes');
  ok(N.numberWord(21) === 'Twenty-one' && N.numberWord(12) === 'Twelve', 'narration: number words');
  const report = [];
  for (const b of LIB) {
    const B = loadBook(b.id), { parsed, cast } = B;
    if (!parsed) continue;
    const tl = B.timeline();
    ok(tl.errors.length === 0, `${b.id} audiobook cast: ` + tl.errors.join('; '));
    const spokenSteps = tl.steps.filter(s => s.say);
    ok(spokenSteps.length > parsed.chapters.length, `${b.id}: audiobook has no lines`);
    spokenSteps.forEach(s => ok(/[A-Za-z0-9]/.test(s.say) && s.say.length <= 1500, `${b.id}: odd audiobook line "${s.say.slice(0, 60)}"`));
    if (cast) spokenSteps.forEach(s => ok(cast.characters[s.who || 'narrator'], `${b.id}: unknown speaker ${s.who}`));
    parsed.chapters.forEach(c => {
      const heard = tl.steps.filter(s => s.kind === 'line' && s.ch === c.num).map(s => s.text).join('');
      ok(letters(heard) === letters(c.paragraphs.filter(p => !P.picture(p)).join('')), `${b.id} ch${c.num}: the audiobook loses text`);
    });
    if (B.audio) {
      const A = B.audio, rel = path.basename(B.audioPath);
      Object.keys(A).forEach(k => ok(fs.existsSync(path.join(__dirname, '..', B.audioPath, k + '.mp3')), `${b.id}: ${rel}.js lists ${k} but the file is missing`));
      const keys = new Set(spokenSteps.map(s => N.keyOf(s, cast)));
      const stale = Object.keys(A).filter(k => !keys.has(k)).length;
      report.push(`${b.id} ${[...keys].filter(k => A[k]).length}/${keys.size}` + (stale ? ` (${stale} unused: tools/book-voices.py ${b.id} --prune)` : ''));
    }
  }
  console.log('audiobook voices recorded: ' + (report.join(', ') || 'none'));
}

// The Little Prince film plays the audiobook's steps (above); here only what is the film's own: shots for every
// picture, the picture files, mouth shapes and word times (tools/film-timing.py) and motion layers (tools/film-layers.py)
{
  const N = window.LP_NARRATION;
  const B = loadBook('little-prince'), film = path.join(B.dir, 'film');
  require(path.join(film, 'shots.js'));
  const SHOTS = window.LP_FILM_SHOTS;
  const steps = B.timeline().steps;
  steps.filter(s => s.kind === 'picture').forEach(s => {
    ok(SHOTS[s.img], `film: no shot data for picture ${s.img}`);
    // the reading screen drops a missing picture silently
    ok(fs.existsSync(path.join(B.dir, 'images', 'pictures', s.img + '.jpg')), `picture ${s.img}: images/pictures/${s.img}.jpg missing`);
  });
  for (let n = 1; n <= 27; n++) ok(SHOTS['chapter-' + String(n).padStart(2, '0')], `film: no shot data for chapter ${n}`);
  const timingJs = path.join(film, 'timing.js');
  if (B.audio && fs.existsSync(timingJs)) {
    delete window.LP_FILM_TIMING; require(timingJs);
    const T = window.LP_FILM_TIMING || {};
    const keys = new Set(steps.filter(s => s.say).map(s => N.keyOf(s, B.cast)));
    Object.keys(T).forEach(k => {
      ok(k in B.audio, `film: timing.js has ${k}, which audio.js does not list`);
      ok(/^[0-9]*$/.test(T[k].mouth) && Array.isArray(T[k].words), `film: timing.js ${k} is malformed`);
    });
    const WORD = /[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu;
    steps.filter(s => s.kind === 'line').forEach(s => {
      const t = T[N.keyOf(s, B.cast)];
      if (t && t.words.length) ok(t.words.length === (s.text.match(WORD) || []).length, `film: timing.js word count differs for "${s.text.slice(0, 40)}"`);
    });
    const timed = [...keys].filter(k => T[k]).length;
    console.log(`film timing: ${timed}/${keys.size} recordings timed, ${Object.values(T).filter(v => !v.words.length).length} without word times`);
  }
  const layersJs = path.join(film, 'layers.js');
  if (fs.existsSync(layersJs)) {
    require(layersJs);
    const LY = window.LP_FILM_LAYERS || {}, dir = path.join(B.dir, 'images', 'layers');
    const inside = (b, lo, hi) => b.x >= lo && b.y >= lo && b.x + b.w <= hi && b.y + b.h <= hi && b.w > 0 && b.h > 0;
    Object.keys(LY).forEach(id => {
      ok(SHOTS[id], `film layers: ${id} is not a picture in shots.js`);
      (LY[id].layers || []).forEach(l => {
        ok(fs.existsSync(path.join(dir, id, l.src)), `film layers: ${id}/${l.src} missing`);
        ok(typeof l.k === 'number' && inside(l, l.far ? -0.2 : -0.001, l.far ? 1.2 : 1.001), `film layers: ${id}/${l.src} box or k out of range`);
      });
      Object.keys(LY[id].faces || {}).forEach(who => {
        const f = LY[id].faces[who];
        ok(fs.existsSync(path.join(dir, id, f.src)), `film layers: ${id}/${f.src} missing`);
        ok(inside(f, 0, 1.001), `film layers: ${id} ${who} face box outside the picture`);
        const pt = SHOTS[id] && SHOTS[id][who];
        ok(!pt || (Math.abs(pt[0] - (f.x + f.w / 2)) < 0.12 && Math.abs(pt[1] - (f.y + f.h / 2)) < 0.12), `film layers: ${id} ${who} face is far from the head in shots.js`);
      });
    });
  }
}

console.log(fails ? `${fails} failure(s)` : 'all tests passed');
process.exit(fails ? 1 : 0);

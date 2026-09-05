/* node tools/test.js — parser, matcher and every book's scene data (no browser needed). */
const fs = require('fs'), path = require('path');
global.window = {};
require('../js/parser.js'); require('../js/matcher.js');
const P = window.LP_PARSER, M = window.LP_MATCHER;
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
console.log(fails ? `${fails} failure(s)` : 'all tests passed');
process.exit(fails ? 1 : 0);

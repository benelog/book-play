/* node tools/book-quotes.js <book id> [from] [to] — list every quote of a book with its paragraph, numbered per chapter,
   next to the speaker its cast file gives it (SPEAKERS=draft.json overrides the cast per chapter). Used to write and check
   the speaker lists of a cast: books/<id>/cast.js, or books/little-prince/film/cast.js (js/library.js `listen.cast`). */
const fs = require('fs');
const loadBook = require('./load-book.js');
const P = window.LP_PARSER, N = window.LP_NARRATION;
let B;
try { B = loadBook(process.argv[2]); } catch (e) { console.error('usage: node tools/book-quotes.js <book id> [from] [to]\n' + e.message); process.exit(2); }
if (!B.parsed) { console.error(`books/${B.book.id}/text/book.js is missing (run tools/embed-text.py)`); process.exit(2); }
const cast = B.cast || {};
const speakers = Object.assign({}, cast.speakers || {},
  process.env.SPEAKERS ? JSON.parse(fs.readFileSync(process.env.SPEAKERS, 'utf8')) : {});   // a draft list to check
const from = +process.argv[3] || 1, to = +process.argv[4] || 9999;
const known = cast.characters || null;
for (const c of B.parsed.chapters) {
  if (c.num < from || c.num > to) continue;
  const list = String(speakers[c.num] || '').split(/\s+/).filter(Boolean);
  console.log(`\n=== CHAPTER ${c.num} (${c.paragraphs.reduce((n, p) => n + (P.picture(p) ? 0 : N.quoteCount(p)), 0)} quotes) ===`);
  let k = 0;
  c.paragraphs.forEach((p, i) => {
    if (P.picture(p)) { console.log(`  [picture ${P.picture(p).id}]`); return; }
    const sp = N.spans(p);
    if (!sp.some(s => s.q)) { console.log(`  ¶${i} (narration) ${p.length > 110 ? p.slice(0, 110) + '…' : p}`); return; }
    console.log(`  ¶${i} ${p}`);
    sp.filter(s => s.q).forEach(s => {
      const who = list[k] || '?';
      console.log(`      #${k + 1} [${who}]${known && who !== '?' && !known[who] ? ' !! not in cast.characters' : ''} ${s.text}`);
      k++;
    });
  });
  if (list.length && list.length !== k) console.log(`  !! ${list.length} speakers listed for ${k} quotes`);
}

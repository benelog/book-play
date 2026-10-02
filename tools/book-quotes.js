/* node tools/book-quotes.js <book id> [from] [to] — list every quote of a book with its paragraph, numbered per chapter,
   next to the speaker its cast file gives it (SPEAKERS=draft.json overrides the cast per chapter). Used to write and check
   the speaker lists of a cast: books/<id>/cast.js, or books/little-prince/film/cast.js (js/library.js `listen.cast`). */
const fs = require('fs'), path = require('path');
global.window = {};
const root = path.join(__dirname, '..');
for (const f of ['js/parser.js', 'js/library.js', 'js/narration.js']) require(path.join(root, f));
const P = window.LP_PARSER, N = window.LP_NARRATION;
const id = process.argv[2], b = window.LP_LIBRARY.find(x => x.id === id);
if (!b) { console.error('usage: node tools/book-quotes.js <book id> [from] [to]   (book ids: ' + window.LP_LIBRARY.map(x => x.id).join(', ') + ')'); process.exit(2); }
const castFile = path.join(root, 'books', id, N.castFile(b));
if (fs.existsSync(castFile)) require(castFile);
const cast = window.LP_CAST || window.LP_FILM_CAST || {};
const book = {}; new Function('window', fs.readFileSync(path.join(root, 'books', id, 'text', 'book.js'), 'utf8'))(book);
const speakers = Object.assign({}, cast.speakers || {},
  process.env.SPEAKERS ? JSON.parse(fs.readFileSync(process.env.SPEAKERS, 'utf8')) : {});   // a draft list to check
const from = +process.argv[3] || 1, to = +process.argv[4] || 9999;
const known = cast.characters || null;
for (const c of P.parse(book.LP_BOOK.text).chapters) {
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

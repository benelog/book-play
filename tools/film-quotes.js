/* node tools/film-quotes.js [from] [to] — list every quote of The Little Prince with its paragraph, numbered per
   chapter, next to the speaker cast.js gives it (FILM_SPEAKERS=draft.json overrides cast.js per chapter). Used to write and check the speaker lists in
   books/little-prince/film/cast.js. */
const fs = require('fs'), path = require('path');
global.window = {};
const root = path.join(__dirname, '..');
require(path.join(root, 'js/parser.js'));
require(path.join(root, 'books/little-prince/film/script.js'));
const castFile = path.join(root, 'books/little-prince/film/cast.js');
if (fs.existsSync(castFile)) require(castFile);
const book = {}; new Function('window', fs.readFileSync(path.join(root, 'books/little-prince/text/book.js'), 'utf8'))(book);
const P = window.LP_PARSER, S = window.LP_FILM_SCRIPT;
const speakers = Object.assign({}, (window.LP_FILM_CAST && window.LP_FILM_CAST.speakers) || {},
  process.env.FILM_SPEAKERS ? JSON.parse(fs.readFileSync(process.env.FILM_SPEAKERS, 'utf8')) : {});   // a draft list to check
const from = +process.argv[2] || 1, to = +process.argv[3] || 27;
for (const c of P.parse(book.LP_BOOK.text).chapters) {
  if (c.num < from || c.num > to) continue;
  const list = String(speakers[c.num] || '').split(/\s+/).filter(Boolean);
  console.log(`\n=== CHAPTER ${c.num} (${c.paragraphs.reduce((n, p) => n + (P.picture(p) ? 0 : S.quoteCount(p)), 0)} quotes) ===`);
  let k = 0;
  c.paragraphs.forEach((p, i) => {
    if (P.picture(p)) { console.log(`  [picture ${P.picture(p).id}]`); return; }
    const sp = S.spans(p);
    if (!sp.some(s => s.q)) { console.log(`  ¶${i} (narration) ${p.length > 110 ? p.slice(0, 110) + '…' : p}`); return; }
    console.log(`  ¶${i} ${p}`);
    sp.filter(s => s.q).forEach(s => { console.log(`      #${k + 1} [${list[k] || '?'}] ${s.text}`); k++; });
  });
  if (list.length && list.length !== k) console.log(`  !! ${list.length} speakers listed for ${k} quotes`);
}

/* A book loaded in node the way the app loads it: library entry, scenes, text, cast and recording list.
   Used by tools/test.js, tools/book-quotes.js and tools/book-voices.py.
     const B = require('./load-book.js')('<book id>');
     B.book, B.scenes, B.roles, B.parsed (null without text/book.js), B.cast (null without a cast file),
     B.audio ({ key: ms } or null without a list), B.dir (absolute), B.castPath / B.audioPath (relative to the repo),
     B.timeline() -> js/narration.js forBook
   Each call reads the files again, so several books can be loaded one after another. */
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
global.window = global.window || {};
for (const f of ['parser.js', 'library.js', 'narration.js']) require(path.join(root, 'js', f));

function loadBook(id) {
  const P = window.LP_PARSER, N = window.LP_NARRATION;
  const book = window.LP_LIBRARY.find(b => b.id === id);
  if (!book) throw new Error(`no book ${id} in js/library.js (books: ${window.LP_LIBRARY.map(b => b.id).join(', ')})`);
  const rel = (f) => path.posix.join('books', id, f);
  // book files set window.LP_* globals: clear the last book's, then run the file if it exists
  const load = (f, names) => {
    names.forEach(n => delete window[n]);
    const file = path.join(root, rel(f));
    if (!fs.existsSync(file)) return false;
    new Function('window', fs.readFileSync(file, 'utf8'))(window);
    return true;
  };
  load('scenes.js', ['LP_SCENES', 'LP_ROLES']);
  const hasText = load('text/book.js', ['LP_BOOK']);
  const hasCast = load(N.castFile(book), ['LP_CAST']);
  const hasAudio = load(N.audioDir(book) + '.js', ['LP_AUDIO']);
  const parsed = hasText ? P.parse(window.LP_BOOK.text) : null;
  const scenes = window.LP_SCENES || [], cast = hasCast ? window.LP_CAST || null : null;
  return {
    book, scenes, roles: window.LP_ROLES || {}, parsed, cast,
    audio: hasAudio ? window.LP_AUDIO || {} : null,
    dir: path.join(root, 'books', id), castPath: hasCast ? rel(N.castFile(book)) : null, audioPath: rel(N.audioDir(book)),
    timeline: () => N.forBook(book, parsed, scenes, cast, P.picture)
  };
}
module.exports = loadBook;

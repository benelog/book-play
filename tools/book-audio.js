/* A book's recordings joined into audio files to play outside the app, in the order and with the pauses of the
   audiobook mode (js/narration.js):
     <out>/<Title>.m4a                      the whole book, one chapter mark per chapter
     <out>/<Title>/NN <Chapter>.m4a         one file per chapter, tagged as an album (for music players and YouTube Music)
   Every line must be recorded (tools/book-voices.py). Needs ffmpeg.
     node tools/book-audio.js <book id> [out dir]   (default: /tmp/book-audio) */
const fs = require('fs'), path = require('path'), os = require('os'), { spawnSync } = require('child_process');
const loadBook = require('./load-book.js');
const N = window.LP_NARRATION;

const [id, outArg] = process.argv.slice(2);
if (!id) { console.error('usage: node tools/book-audio.js <book id> [out dir]'); process.exit(1); }
const out = path.resolve(outArg || path.join(os.tmpdir(), 'book-audio'));
const B = loadBook(id);
if (!B.parsed || !B.audio) { console.error(`${id}: no text or no recordings`); process.exit(1); }

const RATE = 24000, BPS = 2;   // mono 16-bit PCM, the rate of the recordings
const steps = B.timeline().steps.filter(s => s.say);
const missing = steps.filter(s => !B.audio[N.keyOf(s, B.cast)]);
if (missing.length) { console.error(`${id}: ${missing.length} of ${steps.length} lines not recorded; run tools/book-voices.py first`); process.exit(1); }

const meta = (n) => B.scenes.find(c => c.num === n);
const chName = (ch) => ch ? `Chapter ${N.roman(ch)}${meta(ch) && meta(ch).title ? ` · ${meta(ch).title}` : ''}` : 'Title page';
const safe = (t) => t.replace(/[\/\\:*?"<>|]/g, '').replace(/\s+/g, ' ').trim();
const cover = ['cover.jpg', 'chapter-01.jpg'].map(f => path.join(B.dir, 'images', f)).find(f => fs.existsSync(f));
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'book-audio-'));
const pcmFile = path.join(tmp, 'book.pcm');
const pcm = fs.openSync(pcmFile, 'w');

// decode every line and write it with the pause after it; remember where each chapter starts
const chapters = [];   // { ch, from, to } in bytes
let at = 0;
steps.forEach((s, k) => {
  if (!chapters.length || chapters[chapters.length - 1].ch !== s.ch) {
    if (chapters.length) chapters[chapters.length - 1].to = at;
    chapters.push({ ch: s.ch, from: at });
  }
  const mp3 = path.join(B.dir, N.audioDir(B.book), `${N.keyOf(s, B.cast)}.mp3`);
  const r = spawnSync('ffmpeg', ['-v', 'error', '-i', mp3, '-f', 's16le', '-ac', '1', '-ar', String(RATE), '-'], { maxBuffer: 1 << 28 });
  if (r.status) throw new Error(`ffmpeg failed on ${mp3}: ${r.stderr}`);
  const gap = Buffer.alloc(Math.round(N.gapAfter(s, steps[k + 1]) * RATE / 1000) * BPS);
  fs.writeSync(pcm, r.stdout); fs.writeSync(pcm, gap);
  at += r.stdout.length + gap.length;
  if (k % 200 === 0) process.stdout.write(`\r${id}: ${k}/${steps.length} lines`);
});
chapters[chapters.length - 1].to = at;
fs.closeSync(pcm);
process.stdout.write(`\r${id}: ${steps.length}/${steps.length} lines, ${Math.round(at / BPS / RATE / 60)} min\n`);

const ms = (bytes) => Math.round(bytes / BPS / RATE * 1000);
const tags = (t) => Object.entries(t).flatMap(([k, v]) => ['-metadata', `${k}=${v}`]);
function encode(file, from, to, t, chapterFile) {
  const ins = ['-f', 's16le', '-ar', String(RATE), '-ac', '1', '-ss', String(from / BPS / RATE), '-t', String((to - from) / BPS / RATE), '-i', pcmFile];
  const maps = ['-map', '0:a'];
  if (chapterFile) { ins.push('-i', chapterFile); maps.push('-map_chapters', '1'); }
  if (cover) { maps.push('-map', `${ins.filter(x => x === '-i').length}:v`, '-c:v', 'mjpeg', '-vf', 'scale=600:-2', '-disposition:v', 'attached_pic'); ins.push('-i', cover); }
  const r = spawnSync('ffmpeg', ['-v', 'error', '-y', ...ins, ...maps, '-c:a', 'aac', '-b:a', '64k', ...tags(t), file]);
  if (r.status) throw new Error(`ffmpeg failed on ${file}: ${r.stderr}`);
}

const title = B.book.title, artist = B.book.author || '';
fs.mkdirSync(path.join(out, safe(title)), { recursive: true });
// the whole book, with chapter marks
const ffmeta = path.join(tmp, 'chapters.txt');
fs.writeFileSync(ffmeta, ';FFMETADATA1\n' + chapters.map(c =>
  `[CHAPTER]\nTIMEBASE=1/1000\nSTART=${ms(c.from)}\nEND=${ms(c.to)}\ntitle=${chName(c.ch).replace(/[=;#\\\n]/g, '\\$&')}\n`).join(''));
const whole = path.join(out, `${safe(title)}.m4a`);
encode(whole, 0, at, { title, artist, album: title, genre: 'Audiobook' }, ffmeta);
console.log(whole);
// one file per chapter
chapters.forEach((c, j) => {
  const file = path.join(out, safe(title), `${String(j + 1).padStart(2, '0')} ${safe(chName(c.ch))}.m4a`);
  encode(file, c.from, c.to, { title: chName(c.ch), artist, album_artist: artist, album: title, track: `${j + 1}/${chapters.length}`, genre: 'Audiobook' });
});
console.log(`${path.join(out, safe(title))}/  ${chapters.length} chapters`);
fs.rmSync(tmp, { recursive: true });

#!/usr/bin/env python3
"""Record a book's audiobook voices with OpenAI gpt-4o-mini-tts.

Every spoken step of the book (title, chapter cards, each subtitle-sized line; js/narration.js forBook, the same code
the audiobook and The Little Prince film run) gets one MP3, named by audioKey(who, say, tts): a changed line, speaker
or voice gets a new name, so running this again records only what is missing.
Where things live (js/library.js `listen` of the book, defaults in brackets):
  recordings  books/<id>/<audio>/<key>.mp3     [audio]          The Little Prince: film/audio
  list        books/<id>/<audio>.js            { key: length in ms } — the app plays only what is listed
  voices      books/<id>/<cast>                [cast.js]        optional; without it the narrator (DEFAULT_CAST) reads all
A cast file sets window.LP_CAST = { characters: { narrator: { name, color, pitch, tts: { voice, shift, how } }, … },
speakers: { <chapter>: 'who who …' } } — one speaker per double-quoted span, in order (node tools/book-quotes.js <id>).

Run:   OPENAI_PAT=sk-... python3 -u tools/book-voices.py <book id> [--chapter N] [--dry-run] [--prune]
       (OPENAI_API_KEY works too; the key is never printed. LP_TTS_RPM=6.5 to go slowly when the daily limit is near)
Needs: node, ffmpeg (with the rubberband filter when a voice has `shift`).
"""
import concurrent.futures as cf, json, os, re, subprocess, sys, tempfile, threading, time, urllib.error, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RPM = float(os.environ.get('LP_TTS_RPM', 400))   # stay under the account's limit (Tier 1: 500 a minute, 10,000 a day)
WORKERS = 8

def book(book_id):
    """The book's spoken steps and where its recordings go, from the app's own code (node)."""
    js = r"""
      global.window = {};
      const fs = require('fs'), id = process.argv[1];
      for (const f of ['js/parser.js', 'js/library.js', 'js/narration.js']) require('./' + f);
      const P = window.LP_PARSER, N = window.LP_NARRATION;
      const b = window.LP_LIBRARY.find(x => x.id === id);
      if (!b) { console.error('no book ' + id + ' in js/library.js'); process.exit(2); }
      const dir = 'books/' + id + '/';
      if (!fs.existsSync(dir + 'text/book.js')) { console.error(dir + 'text/book.js is missing (run tools/embed-text.py)'); process.exit(2); }
      require('./' + dir + 'text/book.js');
      if (fs.existsSync(dir + 'scenes.js')) require('./' + dir + 'scenes.js');
      const castPath = dir + N.castFile(b);
      if (fs.existsSync(castPath)) require('./' + castPath);
      const cast = window.LP_CAST || window.LP_FILM_CAST || null;
      const tl = N.forBook(b, P.parse(window.LP_BOOK.text), window.LP_SCENES || [], cast, P.picture);
      const out = [], seen = new Set();
      for (const s of tl.steps) {
        if (!s.say) continue;
        const key = N.keyOf(s, cast);
        if (seen.has(key)) continue;
        seen.add(key);
        out.push({ key, who: s.who || 'narrator', ch: s.ch, say: s.say, tts: N.character(cast, s.who).tts });
      }
      console.log(JSON.stringify({ title: b.title, author: b.author || '', audio: dir + N.audioDir(b), cast: fs.existsSync(castPath) ? castPath : null,
                                   errors: tl.errors, steps: out }));
    """
    r = subprocess.run(['node', '-e', js, book_id], cwd=ROOT, capture_output=True, text=True)
    if r.returncode: sys.exit(r.stderr.strip())
    return json.loads(r.stdout)

def steps(book_id='little-prince'):
    """The spoken steps alone (tools/film-timing.py uses this)."""
    return book(book_id)['steps']

_lock, _last = threading.Lock(), [0.0]
def throttle():
    with _lock:
        wait = _last[0] + 60 / RPM - time.time()
        if wait > 0: time.sleep(wait)
        _last[0] = time.time()

def record(item, key, audio_dir, prompt):
    t = item['tts']
    body = json.dumps({'model': 'gpt-4o-mini-tts', 'voice': t['voice'], 'input': item['say'],
                       'instructions': t['how'] + ' ' + prompt, 'response_format': 'pcm'}).encode()
    for attempt in range(12):
        throttle()
        req = urllib.request.Request('https://api.openai.com/v1/audio/speech', data=body,
                                     headers={'Authorization': 'Bearer ' + key, 'Content-Type': 'application/json'})
        try:
            with urllib.request.urlopen(req, timeout=90) as r:
                pcm = r.read()
            break
        except urllib.error.HTTPError as e:
            msg = e.read().decode(errors='replace')[:200]
            if e.code in (429, 500, 502, 503, 504) and attempt < 11 and 'insufficient_quota' not in msg:
                print(f'  retry {item["key"]} after HTTP {e.code}', flush=True)
                time.sleep(min(60, 5 * (attempt + 1))); continue
            raise RuntimeError(f'HTTP {e.code}: {msg}')
        except (urllib.error.URLError, TimeoutError, ConnectionError) as e:
            if attempt < 7:
                print(f'  retry {item["key"]} after {type(e).__name__}', flush=True)
                time.sleep(5 * (attempt + 1)); continue
            raise
    # 24 kHz 16-bit mono PCM -> trimmed, loudness-matched MP3; `shift` raises pitch and formants together
    filters = []
    if t.get('shift'): filters.append('rubberband=pitch=%.5f:formant=shifted' % 2 ** (t['shift'] / 12))
    trim = 'silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.05'
    filters += [trim, 'areverse', trim, 'areverse', 'loudnorm=I=-18:TP=-2:LRA=11', 'aresample=24000']
    out = os.path.join(audio_dir, item['key'] + '.mp3')
    with tempfile.NamedTemporaryFile(suffix='.pcm') as f:
        f.write(pcm); f.flush()
        subprocess.run(['ffmpeg', '-nostdin', '-loglevel', 'error', '-y', '-f', 's16le', '-ar', '24000', '-ac', '1', '-i', f.name,
                        '-af', ','.join(filters), '-ac', '1', '-b:a', '48k', out + '.tmp.mp3'], check=True)
    os.replace(out + '.tmp.mp3', out)
    return item['key']

def duration_ms(path):
    out = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', path],
                         capture_output=True, text=True, check=True).stdout
    return int(round(float(out) * 1000))

def write_index(items, audio_dir):
    """<audio>.js: { key: length in ms } for every recording that exists. An existing list keeps its variable name
    (The Little Prince's film/audio.js is LP_FILM_AUDIO); a new one is LP_AUDIO."""
    index = audio_dir + '.js'
    known, name = {}, 'LP_AUDIO'
    try:
        txt = open(index).read()
        m = re.search(r'window\.(\w+) =', txt)
        if m: name = m.group(1)
        old = json.loads(txt[txt.index(name + ' =') + len(name) + 2:].strip().rstrip(';'))
        if isinstance(old, dict): known = old
    except (OSError, ValueError): pass
    have = {}
    for k in sorted(i['key'] for i in items if os.path.exists(os.path.join(audio_dir, i['key'] + '.mp3'))):
        have[k] = known.get(k) or duration_ms(os.path.join(audio_dir, k + '.mp3'))
    with open(index, 'w') as f:
        f.write(f'/* generated by tools/book-voices.py — the recorded voice files in {os.path.basename(audio_dir)}/ '
                '(<key>.mp3, see js/narration.js audioKey) and their length in ms */\n')
        f.write(f'window.{name} = {{\n' + ',\n'.join(f'{json.dumps(k)}:{v}' for k, v in have.items()) + '\n};\n')
    return list(have)

def main():
    args = sys.argv[1:]
    ids = [a for i, a in enumerate(args) if not a.startswith('--') and (i == 0 or args[i - 1] != '--chapter')]
    if not ids: sys.exit(__doc__)
    b = book(ids[0])
    items, audio_dir = b['steps'], os.path.join(ROOT, b['audio'])
    for e in b['errors']: print('cast:', e)
    items_todo = items
    if '--chapter' in args:
        n = int(args[args.index('--chapter') + 1]); items_todo = [i for i in items if i['ch'] == n]
    os.makedirs(audio_dir, exist_ok=True)
    todo = [i for i in items_todo if not os.path.exists(os.path.join(audio_dir, i['key'] + '.mp3'))]
    chars = sum(len(i['say']) for i in todo)
    minutes = chars / 15 / 60   # about 15 characters a second
    voices = sorted({f"{i['who']}={i['tts']['voice']}" for i in items})
    print(f"{b['title']}: {len(items)} spoken steps, {len(todo)} to record ({chars:,} characters, about {minutes:.0f} min of audio, "
          f"roughly ${minutes * 0.015:.2f}); voices: {', '.join(voices)}" + ('' if b['cast'] else ' (no cast file: narrator only)'))
    if '--dry-run' in args: return
    key = os.environ.get('OPENAI_PAT') or os.environ.get('OPENAI_API_KEY')
    if todo and not key: sys.exit('set OPENAI_PAT or OPENAI_API_KEY')
    prompt = (f"You are reading an audiobook of {b['title']}" + (f" by {b['author']}" if b['author'] else '') +
              " for children and learners of English. Read exactly the given words, clearly and naturally, with the feeling they carry. "
              "Do not add or skip words.")
    done, failed, t0 = 0, [], time.time()
    with cf.ThreadPoolExecutor(WORKERS) as ex:
        futs = {ex.submit(record, i, key, audio_dir, prompt): i for i in todo}
        for fu in cf.as_completed(futs):
            try: fu.result(); done += 1
            except Exception as e: failed.append((futs[fu]['key'], str(e)[:160]))
            if (done + len(failed)) % 50 == 0:
                print(f'  {done + len(failed)}/{len(todo)} ({time.time() - t0:.0f}s)', flush=True)
                write_index(items, audio_dir)
    have = write_index(items, audio_dir)
    if '--prune' in args:
        keep = {i['key'] for i in items}
        for f in os.listdir(audio_dir):
            if f.endswith('.mp3') and f[:-4] not in keep: os.remove(os.path.join(audio_dir, f))
    print(f'recorded {done}, failed {len(failed)}, {len(have)}/{len(items)} steps have a voice ({time.time() - t0:.0f}s)')
    for k, e in failed[:10]: print('  failed', k, e)
    if done and ids[0] == 'little-prince': print('now run tools/film-timing.py for the mouth shapes and word times of the new recordings')
    if any('insufficient_quota' in e or 'HTTP 401' in e for _, e in failed): sys.exit(1)

if __name__ == '__main__':
    main()

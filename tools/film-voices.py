#!/usr/bin/env python3
"""Record the voices of The Little Prince film (books/little-prince/film/) with OpenAI gpt-4o-mini-tts.

Every spoken step of the film (title, chapter cards, each subtitle-sized line) gets one MP3 in film/audio/, named by
script.js audioKey(who, say, tts): a changed line or a changed voice in cast.js gets a new name, so running this again
records only what is missing. Voices and acting instructions are the `tts` fields of film/cast.js.
Afterwards film/audio.js lists the files, so the film only plays files that exist and falls back to the browser's
speech for the others.

Run:   OPENAI_PAT=sk-... python3 tools/film-voices.py [--chapter N] [--dry-run] [--prune]
       (OPENAI_API_KEY works too; the key is never printed)
Needs: node, ffmpeg with the rubberband filter (for `shift`).
"""
import concurrent.futures as cf, json, os, subprocess, sys, tempfile, threading, time, urllib.error, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FILM = os.path.join(ROOT, 'books', 'little-prince', 'film')
AUDIO = os.path.join(FILM, 'audio')
BOOK = ("You are reading an audiobook of The Little Prince (a new English translation) for children and learners of English. "
        "Read exactly the given words, clearly and naturally, with the feeling they carry. Do not add or skip words.")
RPM = float(os.environ.get('LP_TTS_RPM', 400))   # stay under the account's limit (Tier 1: 500 a minute, 10,000 a day)
WORKERS = 8

def steps():
    """The film's spoken steps, from the same code the film runs (script.js timeline + audioKey)."""
    js = r"""
      global.window = {};
      for (const f of ['js/parser.js', 'books/little-prince/text/book.js', 'books/little-prince/scenes.js',
                       'books/little-prince/film/script.js', 'books/little-prince/film/cast.js']) require('./' + f);
      const P = window.LP_PARSER, S = window.LP_FILM_SCRIPT, CAST = window.LP_FILM_CAST;
      const tl = S.timeline(P.parse(window.LP_BOOK.text), CAST.speakers, P.picture, window.LP_SCENES || []);
      const out = [], seen = new Set();
      for (const s of tl.steps) {
        if (!s.say) continue;
        const who = s.who || 'narrator', tts = (CAST.characters[who] || CAST.characters.narrator).tts;
        const key = S.audioKey(who, s.say, tts);
        if (seen.has(key)) continue;
        seen.add(key);
        out.push({ key, who, ch: s.ch, say: s.say, tts });
      }
      console.log(JSON.stringify(out));
    """
    return json.loads(subprocess.run(['node', '-e', js], cwd=ROOT, capture_output=True, text=True, check=True).stdout)

_lock, _last = threading.Lock(), [0.0]
def throttle():
    with _lock:
        wait = _last[0] + 60 / RPM - time.time()
        if wait > 0: time.sleep(wait)
        _last[0] = time.time()

def record(item, key):
    t = item['tts']
    body = json.dumps({'model': 'gpt-4o-mini-tts', 'voice': t['voice'], 'input': item['say'],
                       'instructions': t['how'] + ' ' + BOOK, 'response_format': 'pcm'}).encode()
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
    out = os.path.join(AUDIO, item['key'] + '.mp3')
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

def write_index(items):
    """audio.js: { key: length in ms } for every recording that exists (the old format was a string of keys)."""
    known = {}
    try:
        txt = open(os.path.join(FILM, 'audio.js')).read()
        old = json.loads(txt[txt.index('LP_FILM_AUDIO =') + 15:].strip().rstrip(';'))
        if isinstance(old, dict): known = old
    except (OSError, ValueError): pass
    have = {}
    for k in sorted(i['key'] for i in items if os.path.exists(os.path.join(AUDIO, i['key'] + '.mp3'))):
        have[k] = known.get(k) or duration_ms(os.path.join(AUDIO, k + '.mp3'))
    with open(os.path.join(FILM, 'audio.js'), 'w') as f:
        f.write('/* generated by tools/film-voices.py — the recorded voice files in audio/ (<key>.mp3, see script.js audioKey)\n'
                '   and their length in ms; tools/film-timing.py adds mouth shapes and word times for them in timing.js */\n')
        f.write('window.LP_FILM_AUDIO = {\n' + ',\n'.join(f'{json.dumps(k)}:{v}' for k, v in have.items()) + '\n};\n')
    return list(have)

def main():
    args = sys.argv[1:]
    items = steps()
    if '--chapter' in args:
        n = int(args[args.index('--chapter') + 1]); items_todo = [i for i in items if i['ch'] == n]
    else: items_todo = items
    os.makedirs(AUDIO, exist_ok=True)
    todo = [i for i in items_todo if not os.path.exists(os.path.join(AUDIO, i['key'] + '.mp3'))]
    chars = sum(len(i['say']) for i in todo)
    print(f'{len(items)} spoken steps in the film, {len(todo)} to record ({chars:,} characters)')
    if '--dry-run' in args: return
    key = os.environ.get('OPENAI_PAT') or os.environ.get('OPENAI_API_KEY')
    if todo and not key: sys.exit('set OPENAI_PAT or OPENAI_API_KEY')
    done, failed, t0 = 0, [], time.time()
    with cf.ThreadPoolExecutor(WORKERS) as ex:
        futs = {ex.submit(record, i, key): i for i in todo}
        for fu in cf.as_completed(futs):
            try: fu.result(); done += 1
            except Exception as e: failed.append((futs[fu]['key'], str(e)[:160]))
            if (done + len(failed)) % 50 == 0:
                print(f'  {done + len(failed)}/{len(todo)} ({time.time() - t0:.0f}s)', flush=True)
                write_index(items)
    have = write_index(items)
    if '--prune' in args:
        keep = {i['key'] for i in items}
        for f in os.listdir(AUDIO):
            if f.endswith('.mp3') and f[:-4] not in keep: os.remove(os.path.join(AUDIO, f))
    print(f'recorded {done}, failed {len(failed)}, {len(have)}/{len(items)} steps have a voice ({time.time() - t0:.0f}s)')
    for k, e in failed[:10]: print('  failed', k, e)
    if done: print('now run tools/film-timing.py for the mouth shapes and word times of the new recordings')
    if any('insufficient_quota' in e or 'HTTP 401' in e for _, e in failed): sys.exit(1)

if __name__ == '__main__':
    main()

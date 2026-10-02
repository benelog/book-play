#!/usr/bin/env python3
"""Record a book's audiobook voices: OpenAI gpt-4o-mini-tts (paid) or Kokoro-82M on this computer (free).

Every spoken step of the book (title, chapter cards, each subtitle-sized line; js/narration.js forBook, the same code
the audiobook and The Little Prince film run) gets one MP3, named by audioKey(who, say, tts): a changed line, speaker
or voice gets a new name, so running this again records only what is missing.
Where things live (js/library.js `listen` of the book, defaults in brackets):
  recordings  books/<id>/<audio>/<key>.mp3     [audio]          The Little Prince: film/audio
  list        books/<id>/<audio>.js            { key: length in ms } — the app plays only what is listed
  voices      books/<id>/<cast>                [cast.js]        optional; without it the narrator (DEFAULT_CAST, OpenAI ash) reads all
A cast file sets window.LP_CAST = { characters: { narrator: { name, color, pitch, tts }, … }, speakers: { <chapter>: 'who who …' } }
— one speaker per double-quoted span, in order (node tools/book-quotes.js <id>). A character's tts picks the engine:
  OpenAI   { voice: 'ash', shift: 0, how: 'acting directions' }        shift: semitones raised afterwards (a child's voice)
  Kokoro   { engine: 'kokoro', voice: 'am_michael', shift: 0, how: '' } runs tools/kokoro-tts.py through uv (no key, no cost)

Run:   OPENAI_PAT=sk-... python3 -u tools/book-voices.py <book id> [--chapter N] [--dry-run] [--prune]
       python3 tools/book-voices.py <book id> --sample am_michael,af_heart,ash [--lines 10] [--out DIR]
         records the first lines of chapter one in each voice (a name with '_' is Kokoro) as DIR/sample-<voice>.mp3
       (OPENAI_API_KEY works too; the key is never printed. LP_TTS_RPM=6.5 to go slowly when the daily limit is near)
Needs: node, ffmpeg (with the rubberband filter when a voice has `shift`); uv for Kokoro (the model is cached by Hugging Face).
"""
import concurrent.futures as cf, json, os, subprocess, sys, tempfile, threading, time, urllib.error, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RPM = float(os.environ.get('LP_TTS_RPM', 400))   # stay under the account's limit (Tier 1: 500 a minute, 10,000 a day)
WORKERS = 8

def book(book_id):
    """The book's spoken steps and where its recordings go, from the app's own code (node)."""
    js = r"""
      let B;
      try { B = require('./tools/load-book.js')(process.argv[1]); } catch (e) { console.error(e.message); process.exit(2); }
      const N = window.LP_NARRATION, b = B.book, cast = B.cast;
      if (!B.parsed) { console.error('books/' + b.id + '/text/book.js is missing (run tools/embed-text.py)'); process.exit(2); }
      const tl = B.timeline();
      const out = [], seen = new Set();
      for (const s of tl.steps) {
        if (!s.say) continue;
        const key = N.keyOf(s, cast);
        if (seen.has(key)) continue;
        seen.add(key);
        out.push({ key, who: s.who || 'narrator', ch: s.ch, para: s.para, say: s.say, tts: N.character(cast, s.who).tts });
      }
      console.log(JSON.stringify({ title: b.title, author: b.author || '', audio: B.audioPath, cast: B.castPath,
                                   narrator: N.character(cast, 'narrator').tts, errors: tl.errors, steps: out }));
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

KOKORO = ['uv', 'run', '-q', '--python', '3.12', '--with', 'kokoro>=0.9.4', '--with', 'transformers>=4.44', '--with', 'soundfile',
          '--with', 'pip', 'python3', os.path.join(ROOT, 'tools', 'kokoro-tts.py')]
local = lambda t: t.get('engine') == 'kokoro'

def openai_pcm(item, key, prompt):
    t = item['tts']
    body = json.dumps({'model': 'gpt-4o-mini-tts', 'voice': t['voice'], 'input': item['say'],
                       'instructions': (t.get('how') or '') + ' ' + prompt, 'response_format': 'pcm'}).encode()
    for attempt in range(12):
        throttle()
        req = urllib.request.Request('https://api.openai.com/v1/audio/speech', data=body,
                                     headers={'Authorization': 'Bearer ' + key, 'Content-Type': 'application/json'})
        try:
            with urllib.request.urlopen(req, timeout=90) as r:
                return r.read()
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

def encode(pcm, t, out):
    """24 kHz 16-bit mono PCM -> trimmed, loudness-matched MP3; `shift` raises pitch and formants together."""
    filters = []
    if t.get('shift'): filters.append('rubberband=pitch=%.5f:formant=shifted' % 2 ** (t['shift'] / 12))
    trim = 'silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.05'
    filters += [trim, 'areverse', trim, 'areverse', 'loudnorm=I=-18:TP=-2:LRA=11', 'aresample=24000']
    with tempfile.NamedTemporaryFile(suffix='.pcm') as f:
        f.write(pcm); f.flush()
        subprocess.run(['ffmpeg', '-nostdin', '-loglevel', 'error', '-y', '-f', 's16le', '-ar', '24000', '-ac', '1', '-i', f.name,
                        '-af', ','.join(filters), '-ac', '1', '-b:a', '48k', out + '.tmp.mp3'], check=True)
    os.replace(out + '.tmp.mp3', out)

def record_openai(item, key, audio_dir, prompt):
    encode(openai_pcm(item, key, prompt), item['tts'], os.path.join(audio_dir, item['key'] + '.mp3'))
    return item['key']

def record_local(items, audio_dir, on_done):
    """Kokoro in one worker process (the model loads once and uses every CPU core); each line is encoded as it comes."""
    if not items: return []
    failed = []
    with tempfile.TemporaryDirectory() as tmp, cf.ThreadPoolExecutor(4) as ex:
        jobs = os.path.join(tmp, 'jobs.json')
        json.dump([{'key': i['key'], 'say': i['say'], 'voice': i['tts']['voice']} for i in items], open(jobs, 'w'))
        log = open(os.path.join(tmp, 'kokoro.log'), 'w+')
        proc = subprocess.Popen(KOKORO + [jobs, tmp], stdout=subprocess.PIPE, stderr=log, text=True, cwd=ROOT)
        by_key, futs = {i['key']: i for i in items}, []
        def finish(it):
            path = os.path.join(tmp, it['key'] + '.pcm')
            encode(open(path, 'rb').read(), it['tts'], os.path.join(audio_dir, it['key'] + '.mp3'))
            os.remove(path)
            on_done(it['key'])
        for line in proc.stdout:
            word = line.split(maxsplit=2)
            if len(word) >= 2 and word[0] == 'done': futs.append(ex.submit(finish, by_key[word[1]]))
            elif len(word) >= 2 and word[0] == 'fail': failed.append((word[1], word[2].strip() if len(word) > 2 else ''))
        proc.wait()
        for f in futs: f.result()
        if proc.returncode:
            log.seek(0)
            tail = log.read()[-600:]
            failed += [(i['key'], 'kokoro worker stopped: ' + tail.strip().splitlines()[-1] if tail.strip() else 'kokoro worker stopped')
                       for i in items if not os.path.exists(os.path.join(audio_dir, i['key'] + '.mp3')) and i['key'] not in {k for k, _ in failed}]
    return failed

def duration_ms(path):
    out = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', path],
                         capture_output=True, text=True, check=True).stdout
    return int(round(float(out) * 1000))

def write_index(items, audio_dir):
    """<audio>.js: window.LP_AUDIO = { key: length in ms } for every recording that exists."""
    index, name = audio_dir + '.js', 'LP_AUDIO'
    known = {}
    try:
        txt = open(index).read()
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

def estimate(items):
    """(minutes of audio, OpenAI dollars, Kokoro minutes on this computer) for the items, at about 15 characters a second."""
    mins = lambda its: sum(len(i['say']) for i in its) / 15 / 60
    paid, free = [i for i in items if not local(i['tts'])], [i for i in items if local(i['tts'])]
    return mins(items), mins(paid) * 0.015, mins(free) * 0.7   # Kokoro made 90 s of audio in about 60 s here (8 cores, no GPU)

def sample(b, voices, lines, out_dir):
    """The first lines of chapter one in each voice, joined with the audiobook's pauses: <out>/sample-<voice>.mp3."""
    first = [i for i in b['steps'] if i['ch'] == 1][:lines]
    narr = b['narrator']
    for v in voices:
        tts = {'engine': 'kokoro', 'voice': v, 'shift': 0, 'how': ''} if '_' in v else {'voice': v, 'shift': 0, 'how': narr.get('how', '') if not local(narr) else ''}
        its = [dict(i, key=f'{n:03d}', tts=tts) for n, i in enumerate(first)]
        with tempfile.TemporaryDirectory() as tmp:
            if local(tts):
                failed = record_local(its, tmp, lambda k: None)
                if failed: sys.exit(f'{v}: {failed[0][1]}')
            else:
                key = os.environ.get('OPENAI_PAT') or os.environ.get('OPENAI_API_KEY')
                if not key: sys.exit('set OPENAI_PAT or OPENAI_API_KEY for the OpenAI voice ' + v)
                with cf.ThreadPoolExecutor(WORKERS) as ex: list(ex.map(lambda i: record_openai(i, key, tmp, prompt_for(b)), its))
            parts, prev = [], None
            for i in its:
                if prev is not None:
                    gap = os.path.join(tmp, i['key'] + '.gap.mp3')
                    subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-f', 'lavfi', '-i', 'anullsrc=r=24000:cl=mono', '-t',
                                    '0.25' if i['para'] == prev else '0.65', '-b:a', '48k', gap], check=True)
                    parts.append(gap)
                parts.append(os.path.join(tmp, i['key'] + '.mp3')); prev = i['para']
            listing = os.path.join(tmp, 'list.txt')
            open(listing, 'w').write(''.join(f"file '{p}'\n" for p in parts))
            out = os.path.join(out_dir, f'sample-{v}.mp3')
            subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', listing, '-ar', '24000', '-ac', '1', '-b:a', '48k', out], check=True)
        print(f'{v} ({"Kokoro, local" if local(tts) else "OpenAI"}): {out} ({duration_ms(out) / 1000:.0f}s)', flush=True)

def prompt_for(b):
    return (f"You are reading an audiobook of {b['title']}" + (f" by {b['author']}" if b['author'] else '') +
            " for children and learners of English. Read exactly the given words, clearly and naturally, with the feeling they carry. "
            "Do not add or skip words.")

def main():
    args = sys.argv[1:]
    valued = ('--chapter', '--sample', '--lines', '--out')
    opt = lambda name, default=None: args[args.index(name) + 1] if name in args else default
    ids = [a for i, a in enumerate(args) if not a.startswith('--') and (i == 0 or args[i - 1] not in valued)]
    if not ids: sys.exit(__doc__)
    b = book(ids[0])
    if '--sample' in args:
        out_dir = opt('--out', tempfile.mkdtemp(prefix='voices-'))
        os.makedirs(out_dir, exist_ok=True)
        sample(b, [v for v in opt('--sample').split(',') if v], int(opt('--lines', 10)), out_dir)
        return
    items, audio_dir = b['steps'], os.path.join(ROOT, b['audio'])
    for e in b['errors']: print('cast:', e)
    items_todo = items
    if '--chapter' in args:
        n = int(opt('--chapter')); items_todo = [i for i in items if i['ch'] == n]
    os.makedirs(audio_dir, exist_ok=True)
    todo = [i for i in items_todo if not os.path.exists(os.path.join(audio_dir, i['key'] + '.mp3'))]
    chars = sum(len(i['say']) for i in todo)
    minutes, dollars, local_minutes = estimate(todo)
    voices = sorted({f"{i['who']}={i['tts']['voice']}" + (' (Kokoro)' if local(i['tts']) else '') for i in items})
    print(f"{b['title']}: {len(items)} spoken steps, {len(todo)} to record ({chars:,} characters, about {minutes:.0f} min of audio; "
          f"OpenAI about ${dollars:.2f}, Kokoro about {local_minutes:.0f} min of work here); voices: {', '.join(voices)}"
          + ('' if b['cast'] else ' (no cast file: narrator only)'))
    if '--dry-run' in args: return
    paid, free = [i for i in todo if not local(i['tts'])], [i for i in todo if local(i['tts'])]
    key = os.environ.get('OPENAI_PAT') or os.environ.get('OPENAI_API_KEY')
    if paid and not key: sys.exit('set OPENAI_PAT or OPENAI_API_KEY')
    prompt = prompt_for(b)
    done, failed, t0 = [0], [], time.time()
    def tick(_k=None):
        done[0] += 1
        if (done[0] + len(failed)) % 50 == 0:
            print(f'  {done[0] + len(failed)}/{len(todo)} ({time.time() - t0:.0f}s)', flush=True)
            write_index(items, audio_dir)
    with cf.ThreadPoolExecutor(WORKERS) as ex:
        futs = {ex.submit(record_openai, i, key, audio_dir, prompt): i for i in paid}
        failed += record_local(free, audio_dir, tick)
        for fu in cf.as_completed(futs):
            try: fu.result(); tick()
            except Exception as e: failed.append((futs[fu]['key'], str(e)[:160]))
    have = write_index(items, audio_dir)
    if '--prune' in args:
        keep = {i['key'] for i in items}
        for f in os.listdir(audio_dir):
            if f.endswith('.mp3') and f[:-4] not in keep: os.remove(os.path.join(audio_dir, f))
    print(f'recorded {done[0]}, failed {len(failed)}, {len(have)}/{len(items)} steps have a voice ({time.time() - t0:.0f}s)')
    for k, e in failed[:10]: print('  failed', k, e)
    if done[0] and ids[0] == 'little-prince': print('now run tools/film-timing.py for the mouth shapes and word times of the new recordings')
    if any('insufficient_quota' in e or 'HTTP 401' in e for _, e in failed): sys.exit(1)

if __name__ == '__main__':
    main()

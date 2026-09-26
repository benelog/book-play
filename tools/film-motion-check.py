#!/usr/bin/env python3
"""Check the motion layers of The Little Prince film against the plain pictures (motion.md step 6).

Opens film/index.html from file:// in headless Chrome and, for every picture in film/layers.js, photographs the board:
  plain   ?motion=0, the picture as before
  still   the layers at rest, camera centred (must match plain: a halo at a layer edge or a wrong sky shows up here)
  blink   eyes closed (may differ from plain only inside the face boxes)
  mouth   mouths open (the same)
  close   a close-up on the first face with the camera off centre, so the far layer has slid (for the eye only)
Differences beyond the limits are boxed in red on a contact sheet; the report lists the pictures to look at.

Run:   uv run --with websocket-client --with opencv-python-headless --with numpy python3 tools/film-motion-check.py [id ...]
Out:   ~/.cache/book-play/film-layers/check/ (sheet.jpg and one PNG per frame)
"""
import base64, json, os, shutil, subprocess, sys, tempfile, time, urllib.request

import cv2
import numpy as np
import websocket

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FILM = os.path.join(ROOT, 'books', 'little-prince', 'film')
OUT = os.path.join(os.environ.get('LP_LAYERS_WORK') or os.path.expanduser('~/.cache/book-play/film-layers'), 'check')
PORT = 9337
SIZE = (1280, 800)
LIMIT = 0.004   # share of the board that may differ outside the faces

def load_js(name, var):
    t = open(os.path.join(FILM, name)).read()
    return json.loads(t[t.index(var + ' =') + len(var) + 2:].strip().rstrip(';'))

class Chrome:
    def __init__(self):
        self.dir = tempfile.mkdtemp(prefix='lp-check-')
        self.proc = subprocess.Popen(['google-chrome', '--headless=new', f'--remote-debugging-port={PORT}', f'--user-data-dir={self.dir}',
                                      f'--window-size={SIZE[0]},{SIZE[1]}', '--hide-scrollbars', '--mute-audio', '--no-first-run',
                                      '--allow-file-access-from-files', '--autoplay-policy=no-user-gesture-required', 'about:blank'],
                                     stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, start_new_session=True)
        for _ in range(100):
            try:
                pages = json.load(urllib.request.urlopen(f'http://127.0.0.1:{PORT}/json'))
                page = next(p for p in pages if p['type'] == 'page')
                break
            except Exception: time.sleep(0.1)
        self.ws = websocket.create_connection(page['webSocketDebuggerUrl'], timeout=60, suppress_origin=True)
        self.n = 0
        self.call('Page.enable'); self.call('Runtime.enable')
        self.call('Emulation.setDeviceMetricsOverride', width=SIZE[0], height=SIZE[1], deviceScaleFactor=1, mobile=False)

    def call(self, method, **params):
        self.n += 1
        self.ws.send(json.dumps({'id': self.n, 'method': method, 'params': params}))
        while True:
            m = json.loads(self.ws.recv())
            if m.get('id') == self.n:
                if 'error' in m: raise RuntimeError(f'{method}: {m["error"]}')
                return m.get('result', {})

    def js(self, expr):
        r = self.call('Runtime.evaluate', expression=expr, returnByValue=True, awaitPromise=True)
        if 'exceptionDetails' in r: raise RuntimeError(r['exceptionDetails'].get('exception', {}).get('description', r['exceptionDetails']))
        return r['result'].get('value')

    def open(self, url):
        self.call('Page.navigate', url=url)
        for _ in range(100):
            time.sleep(0.1)
            if self.js('document.readyState') == 'complete' and self.js('!!window.LP_FILM'): return
        raise RuntimeError('film did not load')

    def shot(self, clip):
        r = self.call('Page.captureScreenshot', format='png', clip=dict(clip, scale=1))
        return cv2.imdecode(np.frombuffer(base64.b64decode(r['data']), np.uint8), cv2.IMREAD_COLOR)

    def close(self):
        try: self.ws.close()
        finally:
            self.proc.kill(); self.proc.wait()
            shutil.rmtree(self.dir, ignore_errors=True)

SETUP = r"""(async (pid) => {
  const F = window.LP_FILM;
  document.getElementById('splash').hidden = true;
  const st = document.createElement('style');
  st.textContent = '#bar,#controls,#subtitle,#vignette,.mote,.star,.planet,.card3d,#stage::after{display:none!important} .pic .face{transition:none!important} .pic,.pic *{animation:none!important}';
  document.head.appendChild(st);
  let i = F.steps.findIndex(s => s.img === pid && s.kind === 'picture');
  if (i < 0) i = F.steps.findIndex(s => s.img === pid);
  F.show(i, false);
  F.still(true);
  F.aim(pid, [0.5, 0.5], F.fitScale());
  if (F.motion) F.motion.pose({ eyes: 'open', mouth: 0 });
  await new Promise(r => setTimeout(r, 3200));
  const el = document.querySelector('.panel .pic') || document.querySelector('.panel > img[src*="' + pid + '"]');
  const b = [...document.querySelectorAll('.panel')].find(p => p.style.visibility !== 'hidden' && p.style.opacity === '1').getBoundingClientRect();
  return { x: b.left + 12, y: b.top + 12, width: b.width - 24, height: b.height - 24 };
})"""

def mark(img, mask, colour=(0, 0, 255)):
    out = img.copy()
    n, lab, st, _ = cv2.connectedComponentsWithStats(mask.astype(np.uint8), 8)
    for i in range(1, n):
        if st[i, cv2.CC_STAT_AREA] < 30: continue
        x, y, w, h = st[i, :4]
        cv2.rectangle(out, (int(x) - 4, int(y) - 4), (int(x + w) + 4, int(y + h) + 4), colour, 2)
    return out

def changed(a, b):
    d = cv2.absdiff(cv2.GaussianBlur(a, (0, 0), 1.2), cv2.GaussianBlur(b, (0, 0), 1.2)).max(axis=2)
    return cv2.morphologyEx((d > 26).astype(np.uint8), cv2.MORPH_OPEN, np.ones((2, 2), np.uint8)) > 0

def main():
    L = load_js('layers.js', 'window.LP_FILM_LAYERS')
    SH = {}
    ids = [a for a in sys.argv[1:] if not a.startswith('-')] or sorted(L)
    os.makedirs(OUT, exist_ok=True)
    url = 'file://' + os.path.join(FILM, 'index.html')
    ch = Chrome()
    rows, flagged = [], []
    try:
        for pid in ids:
            frames = {}
            ch.open(url + '?motion=0')
            clip = ch.js(SETUP + f'({json.dumps(pid)})')
            frames['plain'] = ch.shot(clip)
            ch.open(url)
            clip2 = ch.js(SETUP + f'({json.dumps(pid)})')
            frames['still'] = ch.shot(clip2)
            ch.js("LP_FILM.motion.pose({ eyes: 'closed', mouth: 0 })"); time.sleep(0.25)
            frames['blink'] = ch.shot(clip2)
            ch.js("LP_FILM.motion.pose({ eyes: 'open', mouth: 2 })"); time.sleep(0.25)
            frames['mouth'] = ch.shot(clip2)
            faces = L[pid].get('faces', {})
            who = next(iter(faces), None)
            if who:
                f = faces[who]
                ch.js(f"LP_FILM.aim({json.dumps(pid)}, [{f['x'] + f['w'] / 2}, {f['y'] + f['h'] / 2}], LP_FILM.coverScale() * 1.4)")
            else:
                ch.js(f"LP_FILM.aim({json.dumps(pid)}, [0.2, 0.3], LP_FILM.coverScale() * 1.4)")
            time.sleep(0.6)
            frames['close'] = ch.shot({'x': 0, 'y': 0, 'width': SIZE[0], 'height': SIZE[1]})
            # compare
            h, w = frames['plain'].shape[:2]
            frames = {k: (cv2.resize(v, (w, h)) if k != 'close' and v.shape[:2] != (h, w) else v) for k, v in frames.items()}
            inface = np.zeros((h, w), bool)
            for f in faces.values():
                x0, y0 = int(f['x'] * w) - 3, int(f['y'] * h) - 3
                inface[max(0, y0):y0 + int(f['h'] * h) + 6, max(0, x0):x0 + int(f['w'] * w) + 6] = True
            notes, marked = [], {'plain': frames['plain']}
            c = changed(frames['still'], frames['plain'])
            marked['still'] = mark(frames['still'], c)
            if c.mean() > LIMIT: notes.append(f'still differs {c.mean() * 100:.2f}%')
            for k in ('blink', 'mouth'):
                c = changed(frames[k], frames['plain'])
                out = c & ~inface
                marked[k] = mark(mark(frames[k], out), c & inface, (0, 200, 0))
                if out.mean() > LIMIT: notes.append(f'{k} differs outside the faces {out.mean() * 100:.2f}%')
                if faces and not (c & inface).any(): notes.append(f'{k}: no change in the faces')
            for k, v in frames.items(): cv2.imwrite(os.path.join(OUT, f'{pid}.{k}.png'), v)
            th = 300
            row = [cv2.resize(marked[k], (int(w * th / h), th)) for k in ('plain', 'still', 'blink', 'mouth')]
            row.append(cv2.resize(frames['close'], (int(SIZE[0] * th / SIZE[1]), th)))
            row = np.hstack(row)
            cv2.putText(row, pid + ('  ' + '; '.join(notes) if notes else '  ok'), (8, 24), cv2.FONT_HERSHEY_SIMPLEX, 0.7,
                        (0, 0, 255) if notes else (0, 160, 0), 2)
            rows.append(row)
            print(pid, '; '.join(notes) or 'ok', flush=True)
            if notes: flagged.append(pid)
    finally:
        ch.close()
    wmax = max(r.shape[1] for r in rows)
    sheet = np.vstack([np.pad(r, ((0, 0), (0, wmax - r.shape[1]), (0, 0))) for r in rows])
    cv2.imwrite(os.path.join(OUT, 'sheet.jpg'), sheet, [cv2.IMWRITE_JPEG_QUALITY, 85])
    print(os.path.join(OUT, 'sheet.jpg'))
    print(f'{len(ids)} pictures, {len(flagged)} to look at: {" ".join(flagged)}' if flagged else f'{len(ids)} pictures, all ok')
    sys.exit(1 if flagged else 0)

if __name__ == '__main__':
    main()

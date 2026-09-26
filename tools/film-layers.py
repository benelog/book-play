#!/usr/bin/env python3
"""Depth layers and face sprites for The Little Prince film (motion.md steps 2 and 3).

For a picture <id> this makes books/little-prince/images/layers/<id>/:
  far.jpg          the picture with the people and the plane painted out (sky, clouds, distant land), MARGIN px of mirrored
                   edge on every side so it can slide behind the frame
  mid.png          the ground and everything standing on it (transparent sky), cut at the horizon
  <who>-face.webp  three cells side by side: eyes closed | mouth half open | mouth open, each only opaque where it
                   differs from the picture (so the eyes and the mouth can be shown independently), at SPRITE x size
and books/little-prince/film/layers.js, which motion.js reads.

The new pixels come from Codex (built-in image editing), always on a crop or the whole picture given as-is, and are
aligned back to the picture (ECC) and colour-matched; only the pixels inside the changed region are used.

  python3 tools/film-layers.py prep [id ...]        write Codex jobs (inputs + prompts) to the work folder
  python3 tools/film-layers.py codex [-P 5]         run the Codex jobs that have no output yet
  python3 tools/film-layers.py build [id ...]       make the layer files and layers.js from the outputs
  python3 tools/film-layers.py sheet                contact sheet of every face edit for a visual check
Run with: uv run --with opencv-python-headless --with numpy --with pillow --with "rembg[cpu]" python3 tools/film-layers.py ...
(rembg's isnet-general-use model finds the people and the plane; it is combined with what the Codex edit removed)
Work folder: $LP_LAYERS_WORK or ~/.cache/book-play/film-layers
"""
import concurrent.futures as cf, glob, json, os, subprocess, sys

import cv2
import numpy as np

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BOOK = os.path.join(ROOT, 'books', 'little-prince')
OUT = os.path.join(BOOK, 'images', 'layers')
WORK = os.environ.get('LP_LAYERS_WORK') or os.path.expanduser('~/.cache/book-play/film-layers')
MARGIN = 80        # far.jpg overscan on each side, in picture px
SPRITE = 2         # face sprites are stored at twice the picture's resolution (sharper in close-ups)
FEATHER = 4        # soft edge of a face piece, in picture px

W, H = 1200, 900
# How each picture comes apart:
#   horizon  [(x, y), ...] in 0-1, joined by straight lines: above it is sky (far), below it the ground (mid); the things
#            that stand up above it (people, the plane, a tree) stay in mid — found by a segmentation model and by what the
#            Codex edit removed.
#   space    True: a small planet (or the Earth, a plane in the air) floating in the sky: mid is the planet and everything
#            on it, far is the sky alone.
#   neither  no depth layers (rooms, close views): only the faces move.
# faces: who -> crop size in px (centred on the head in film/shots.js) or (x, y, size) or (x, y, size, speaker) for someone
#   shots.js does not name (a second grown-up). The crop given to Codex is about twice the head. Faces with closed eyes,
#   seen from behind or hidden (hugging, drinking) are left out.
G = lambda *pts: list(pts)
PICTURES = {
    'chapter-02': {'horizon': [(0, .415), (.45, .405), (.7, .40), (1, .37)],
                   'faces': {'prince': (.305, .375, 200), 'pilot': (.61, .395, 230)}},
    '02-1': {'horizon': [(0, .60), (.3, .60), (.5, .62), (.75, .60), (1, .58)],
             'faces': {'prince': (.47, .185, 240)}},
    '02-2': {'horizon': [(0, .30), (1, .30)],
             'faces': {'pilot': (.36, .19, 380), 'prince': (.75, .29, 360)}},
    '02-3': {'horizon': [(0, .29), (1, .29)],
             'faces': {'pilot': (.33, .32, 360), 'prince': (.66, .29, 340)}},
    '02-4': {'horizon': [(0, .295), (1, .295)],
             'faces': {'prince': (.37, .37, 320), 'pilot': (.61, .25, 320)}},
    '02-5': {'horizon': [(0, .30), (1, .30)],
             'faces': {'prince': (.40, .33, 320), 'pilot': (.79, .28, 320)}},
    '02-f1': {'horizon': [(0, .62), (1, .62)], 'faces': {}},
    '02-f2': {'horizon': [(0, .56), (1, .56)],
              'faces': {'pilot': (.32, .14, 240), 'prince': (.78, .43, 220)}},
    '02-f3': {'horizon': [(0, .50), (1, .50)],
              'faces': {'pilot': (.31, .29, 300), 'prince': (.68, .22, 260)}},
    # the rest of the book (2026-09-26)
    'cover': {'space': True, 'faces': {'prince': 140}},
    'chapter-01': {'faces': {'grownups': 230, 'grownups2': (.72, .29, 220, 'grownups')}},
    '01-f1': {'faces': {'pilot': 120}},   # as space the edit took away the land under the plane too
    '01-f2': {'faces': {'pilot': 220, 'grownups': 200}},
    'chapter-03': {'horizon': G((0, .78), (1, .76)), 'faces': {}},
    '03-f1': {'horizon': G((0, .52), (1, .50)), 'faces': {'pilot': 200, 'prince': 170}},
    '03-f2': {'horizon': G((0, .37), (1, .37)), 'faces': {'prince': 280}},
    'chapter-04': {'faces': {}},
    '04-1': {'space': True, 'faces': {'prince': 140}},
    '04-f1': {'faces': {'astronomer': 140, 'grownups': 180}},
    '04-f2': {'faces': {'astronomer': 140}},
    '04-f5': {'faces': {'grownups': 180, 'grownups2': (.80, .28, 170, 'grownups')}},
    '04-f4': {'faces': {'pilot': 220}},
    'chapter-05': {'space': True, 'faces': {'prince': 130}},
    '05-f1': {'horizon': G((0, .50), (1, .48)), 'faces': {'pilot': 220, 'prince': 180}},
    '05-f4': {'horizon': G((0, .56), (1, .55)), 'faces': {'prince': 220}},
    '05-f5': {'horizon': G((0, .42), (1, .42)), 'faces': {'pilot': 240, 'prince': (.655, .315, 220)}},
    'chapter-06': {'space': True, 'faces': {}},
    '06-f1': {'space': True, 'faces': {'prince': 140}},
    'chapter-07': {'horizon': G((0, .45), (1, .43)), 'faces': {'pilot': 200, 'prince': 170}},
    '07-f5': {'horizon': G((0, .78), (.5, .76), (1, .80)), 'faces': {}},
    '07-f2': {'horizon': G((0, .45), (1, .45)), 'faces': {'pilot': 220, 'prince': 170}},
    '07-f3': {'space': True, 'faces': {'businessman': 150}},
    '07-f6': {'space': True, 'faces': {}},
    '07-f4': {'horizon': G((0, .55), (1, .55)), 'faces': {}},
    'chapter-08': {'space': True, 'faces': {'prince': 200}},
    '08-f2': {'horizon': G((0, .78), (.5, .75), (1, .78)), 'faces': {'prince': 180}},
    '08-1': {'space': True, 'faces': {'prince': 150}},
    '08-f3': {'horizon': G((0, .83), (.5, .80), (1, .85)), 'faces': {'prince': 330}},
    '08-f5': {'horizon': G((0, .76), (1, .76)), 'faces': {'prince': 170}},
    'chapter-09': {'horizon': G((0, .72), (.3, .75), (.5, .85), (.6, 1.0), (1, 1.0)), 'faces': {'prince': 150}},
    '09-1': {'horizon': G((0, .72), (1, .70)), 'faces': {'prince': 190}},
    '09-f3': {'horizon': G((0, .80), (.5, .73), (1, .80)), 'faces': {}},
    '09-f2': {'horizon': G((0, .72), (.4, .77), (1, .90)), 'faces': {}},
    'chapter-10': {'space': True, 'faces': {'king': 170}},
    '10-f9': {'space': True, 'faces': {'king': 100, 'prince': 100}},
    '10-f2': {'space': True, 'faces': {'king': 200, 'prince': 170}},
    '10-f3': {'space': True, 'faces': {'king': 170, 'prince': 130}},
    '10-f6': {'horizon': G((0, .62), (1, .64)), 'faces': {'king': 170, 'prince': 170}},
    '10-f7': {'horizon': G((0, .52), (1, .52)), 'faces': {'king': 170}},
    '10-f8': {'space': True, 'faces': {'king': 150, 'prince': 130}},
    '10-f5': {'horizon': G((0, .58), (.5, .57), (1, .56)), 'faces': {'king': 150, 'prince': 150}},
    'chapter-11': {'space': True, 'faces': {'prince': 130, 'vainman': 150}},
    '11-f1': {'horizon': G((0, .78), (.5, .76), (1, .78)), 'faces': {'prince': 180, 'vainman': 200}},
    'chapter-12': {'space': True, 'faces': {'prince': 150}},
    'chapter-13': {'space': True, 'faces': {'prince': 150, 'businessman': 150}},
    '13-f5': {'horizon': G((0, .75), (1, .75)), 'faces': {'businessman': 170}},
    '13-f6': {'horizon': G((0, .80), (.5, .78), (1, .85)), 'faces': {'prince': 130, 'businessman': 130}},
    '13-f4': {'space': True, 'faces': {'businessman': 170, 'prince': 150}},
    '13-f2': {'horizon': G((0, .60), (1, .60)), 'faces': {'prince': 190, 'businessman': 190}},
    '13-f3': {'horizon': G((0, .83), (.5, .75), (1, .72)), 'faces': {'prince': 160, 'businessman': 160}},
    'chapter-14': {'space': True, 'faces': {'prince': 120, 'lamplighter': 140}},
    '14-f4': {'horizon': G((0, .80), (1, .80)), 'faces': {'lamplighter': 200}},
    '14-f1': {'space': True, 'faces': {'lamplighter': 100}},
    '14-f3': {'space': True, 'faces': {'prince': 130}},
    '14-f2': {'space': True, 'faces': {'prince': 180}},
    'chapter-15': {'faces': {'prince': 170, 'geographer': 170}},
    '15-f5': {'faces': {'geographer': (.10, .23, 150)}},
    '15-f6': {'horizon': G((0, .58), (1, .56)), 'faces': {'explorer': (.32, .20, 200, 'explorer')}},
    '15-f4': {'faces': {'explorer': 150, 'geographer': 130, 'prince': 140}},
    '15-f1': {'faces': {'geographer': 200, 'prince': 170}},
    '15-f2': {'faces': {'prince': 200}},
    '15-f3': {'faces': {'geographer': 170, 'prince': 150}},
    'chapter-16': {'space': True, 'faces': {}},
    '16-f1': {'space': True, 'faces': {}},
    'chapter-17': {'horizon': G((0, .50), (1, .50)), 'faces': {'prince': 120}},
    '17-f3': {'horizon': G((0, .58), (1, .58)), 'faces': {}},
    '17-f1': {'horizon': G((0, .43), (1, .43)), 'faces': {'prince': 240}},
    'chapter-18': {'horizon': G((0, .50), (1, .50)), 'faces': {'prince': 220}},
    'chapter-19': {'faces': {}},
    'chapter-20': {'horizon': G((0, .44), (1, .42)), 'faces': {}},
    '20-1': {'horizon': G((0, .45), (1, .45)), 'faces': {}},
    'chapter-21': {'horizon': G((0, .47), (1, .47)), 'faces': {'prince': 140, 'fox': 130}},
    '21-1': {'horizon': G((0, .52), (1, .52)), 'faces': {'fox': 110}},
    '21-f8': {'horizon': G((0, .35), (1, .35)), 'faces': {'fox': 160}},
    '21-f7': {'horizon': G((0, .35), (1, .35)), 'faces': {'fox': 160, 'prince': 160}},
    '21-f1': {'horizon': G((0, .36), (1, .36)), 'faces': {'prince': 170, 'fox': 130}},
    '21-f2': {'horizon': G((0, .30), (1, .30)), 'faces': {'fox': 170, 'prince': 120}},
    '21-f3': {'horizon': G((0, .37), (1, .37)), 'faces': {'fox': 150}},
    '21-f4': {'horizon': G((0, .48), (1, .48)), 'faces': {'fox': 140, 'prince': 170}},
    '21-f5': {'horizon': G((0, .30), (1, .30)), 'faces': {'prince': 150}},
    '21-f6': {'horizon': G((0, .37), (1, .37)), 'faces': {'fox': 150, 'prince': 150}},
    'chapter-22': {'horizon': G((0, .52), (1, .52)), 'faces': {'switchman': 110}},
    'chapter-23': {'horizon': G((0, .37), (1, .37)), 'faces': {'prince': 170, 'merchant': 150}},
    'chapter-24': {'horizon': G((0, .43), (1, .43)), 'faces': {'prince': 90, 'pilot': 110}},
    '24-f4': {'horizon': G((0, .45), (1, .45)), 'faces': {'prince': 170, 'pilot': 170}},
    '24-f2': {'horizon': G((0, .42), (1, .42)), 'faces': {'prince': 110}},
    '24-f3': {'horizon': G((0, .35), (1, .35)), 'faces': {'pilot': 140}},
    'chapter-25': {'horizon': G((0, .47), (1, .47)), 'faces': {'pilot': 140}},
    '25-f2': {'horizon': G((0, .48), (1, .48)), 'faces': {'pilot': 160}},
    '25-f3': {'horizon': G((0, .35), (1, .35)), 'faces': {'pilot': 200, 'prince': 180}},
    '25-f4': {'horizon': G((0, .55), (1, .55)), 'faces': {'pilot': 200, 'prince': (.71, .33, 160)}},
    'chapter-26': {'horizon': G((0, .50), (1, .50)), 'faces': {'prince': 140}},
    '26-f9': {'horizon': G((0, .47), (1, .47)), 'faces': {'prince': 180}},
    '26-f2': {'horizon': G((0, .45), (1, .45)), 'faces': {'pilot': 160}},
    '26-f7': {'horizon': G((0, .50), (1, .50)), 'faces': {'pilot': 170, 'prince': 150}},
    '26-f3': {'horizon': G((0, .60), (1, .60)), 'faces': {'prince': 150, 'pilot': 150}},
    '26-f8': {'horizon': G((0, .45), (1, .45)), 'faces': {}},
    '26-f4': {'horizon': G((0, .72), (1, .72)), 'faces': {'pilot': 90}},
    '26-f5': {'horizon': G((0, .35), (1, .35)), 'faces': {'prince': 150, 'pilot': 150}},
    '26-f6': {'horizon': G((0, .58), (1, .58)), 'faces': {'prince': (.375, .52, 140), 'pilot': 130}},
    '26-1': {'horizon': G((0, .55), (1, .55)), 'faces': {}},
    'chapter-27': {'horizon': G((0, .52), (1, .52)), 'faces': {}},
    '27-f1': {'faces': {'pilot': 250}},
    '27-f2': {'space': True, 'faces': {}},
}

WHO = {
    'prince': 'the little prince (a small boy with fluffy golden hair, small upright oval blue-grey eyes)',
    'pilot': 'the pilot (a young man with dark-brown curly hair, stubble, small upright oval brown eyes)',
    'boy': 'a small boy (the narrator as a child)',
    'grownups': 'a grown-up',
    'astronomer': 'the astronomer',
    'king': 'the old king (white beard, crown)',
    'vainman': 'the vain man',
    'drinker': 'the drinker',
    'businessman': 'the businessman (round black glasses)',
    'lamplighter': 'the old lamplighter',
    'geographer': 'the old geographer (round glasses)',
    'explorer': 'an explorer',
    'fox': 'the fox (an animal: keep it an animal, with a fox muzzle)',
    'switchman': 'the railway switchman',
    'merchant': 'the merchant',
}
_SHOTS = None
def shots():
    global _SHOTS
    if _SHOTS is None:
        js = "global.window={};require('./books/little-prince/film/shots.js');console.log(JSON.stringify(window.LP_FILM_SHOTS))"
        _SHOTS = json.loads(subprocess.run(['node', '-e', js], cwd=ROOT, capture_output=True, text=True, check=True).stdout)
    return _SHOTS

def face_spec(pid, key):
    """(x, y, size, speaker) of a face of a picture."""
    f = PICTURES[pid]['faces'][key]
    if isinstance(f, (int, float)):
        x, y = shots()[pid][key]
        return x, y, int(f), key
    return f[0], f[1], f[2], (f[3] if len(f) > 3 else key)

STYLE = ("Keep the picture's style exactly: clean thin ink outlines, simple rounded manga-like faces, pale warm watercolour "
         "colours with flat soft shading, light cream paper texture.")
FACE_EDITS = [
    ('eyes', 'The EYES are CLOSED, as in a blink: each visible eye becomes a short, gently curved closed-eyelid line with a few '
             'lashes, exactly where the open eye is now and the same width; the eyelid has the colour of the face around it. '
             'Nothing else changes: eyebrows, glasses, mouth, hair and everything else stay exactly the same.'),
    ('half', 'The MOUTH is SLIGHTLY OPEN, as in the middle of speaking a word: a small open mouth, a little dark inside, '
             'in the same place as the mouth now and about the same width. Nothing else changes: eyes, eyebrows, nose, '
             'beard, jaw line, hair and everything else stay exactly the same.'),
    ('open', 'The MOUTH is OPEN, as when saying "ah" while talking: a clearly open rounded mouth, dark inside with a hint of '
             'tongue, in the same place as the mouth now. The chin and the outline of the face stay where they are. Nothing '
             'else changes: eyes, eyebrows, nose, beard, hair and everything else stay exactly the same.'),
]

def src(pid):
    return os.path.join(BOOK, 'images', pid + '.jpg') if pid == 'cover' or pid.startswith('chapter-') else os.path.join(BOOK, 'images', 'pictures', pid + '.jpg')

def imread(p):
    im = cv2.imread(p, cv2.IMREAD_COLOR)
    if im is None: raise FileNotFoundError(p)
    return im

def face_box(pid, who):
    cx, cy, size, _ = face_spec(pid, who)
    x0 = int(round(min(max(cx * W - size / 2, 0), W - size)))
    y0 = int(round(min(max(cy * H - size / 2, 0), H - size)))
    return x0, y0, size

def horizon_y(pid, xs):
    pts = PICTURES[pid].get('horizon') or [(0, 1.0), (1, 1.0)]   # space: no ground, everything is sky
    return np.interp(xs / W, [p[0] for p in pts], [p[1] * H for p in pts])

# ---------------------------------------------------------------------------------------------------- prep
def prep(ids):
    for pid in ids:
        im = imread(src(pid))
        for who in PICTURES[pid]['faces']:
            x0, y0, s = face_box(pid, who)
            job = os.path.join(WORK, 'face', f'{pid}.{who}')
            os.makedirs(os.path.join(job, 'in'), exist_ok=True); os.makedirs(os.path.join(job, 'out'), exist_ok=True)
            cv2.imwrite(os.path.join(job, 'in', 'face.png'), cv2.resize(im[y0:y0 + s, x0:x0 + s], (1024, 1024), interpolation=cv2.INTER_LANCZOS4))
            edits = '\n'.join(f'{i + 1}. out/{k}.png — {t}' for i, (k, t) in enumerate(FACE_EDITS))
            open(os.path.join(job, 'prompt.md'), 'w').write(
                f"Edit a picture with your built-in image generation tool (image editing). Do not draw it with code, SVG, PIL or any script.\n\n"
                f"Image 1 (in/face.png) is a square close crop of {WHO.get(face_spec(pid, who)[3], 'a character')} from an illustrated edition of \"The Little Prince\". "
                f"Make THREE separate edits of image 1. Each edit starts again from image 1 itself (never from another edit), "
                f"is one square 1024x1024 image, and is a LOCAL edit: every pixel outside the eyes or the mouth stays exactly where "
                f"and how it is — same framing, no zoom, no shift, same head position, size, tilt, hair, colours and light.\n\n"
                f"{edits}\n\n{STYLE}\nDo not add anything else. No text, frames, borders or watermarks. "
                f"Do not copy or imitate Antoine de Saint-Exupery's original drawings.\n\n"
                f"Save the three images as out/eyes.png, out/half.png and out/open.png. Finish with one line: the three output paths.\n")
        if PICTURES[pid].get('horizon') or PICTURES[pid].get('space'):
            job = os.path.join(WORK, 'far', pid)
            os.makedirs(os.path.join(job, 'in'), exist_ok=True); os.makedirs(os.path.join(job, 'out'), exist_ok=True)
            cv2.imwrite(os.path.join(job, 'in', 'picture.png'), im)
            empty = ("EMPTY SKY: remove the small planet (or the Earth, or the airplane) in front of the sky and everything on "
                     "or around it — people, animals, plants, furniture, objects — and paint in the sky or space that was behind "
                     "them, continuing its colours, clouds and stars naturally. Stars, far-away planets, the moon and the sun in "
                     "the background stay where they are.\n"
                     "Everything else stays exactly where and how it is: the same framing (no zoom, no shift), the same sky colours, "
                     "clouds and stars. Keep it 4:3 (the whole picture, nothing cropped).\n") if PICTURES[pid].get('space') else None
            open(os.path.join(job, 'prompt.md'), 'w').write(
                "Edit a picture with your built-in image generation tool (image editing). Do not draw it with code, SVG, PIL or any script.\n\n"
                "Image 1 (in/picture.png) is a 4:3 picture from an illustrated edition of \"The Little Prince\". Make it an " +
                (empty or "EMPTY "
                "LANDSCAPE: remove every person and animal, the airplane, and every object standing in front of the distant "
                "landscape (anything they hold or wear, papers, a jacket, a table, a chair, a throne, a well, a stall, a lamp post, a "
                "booth, a tree or a flower in the foreground), and paint in what was behind them: the sky, the clouds, the sun, the "
                "distant hills, dunes or fields, and plain empty ground like the ground around them, continuing naturally.\n"
                "Everything else stays exactly where and how it is: the same framing (no zoom, no shift), the same horizon line, "
                "the same sky colours and clouds, the same hills, rocks, bushes and light. Keep it 4:3 (the whole picture, "
                "nothing cropped).\n") +
                f"{STYLE}\nNo text, frames, borders or watermarks. Do not copy or imitate Antoine de Saint-Exupery's original drawings.\n\n"
                "Save the image as out/far.png. Finish with one line: the output path.\n")

def codex(par):
    jobs = sorted(glob.glob(os.path.join(WORK, 'face', '*'))) + sorted(glob.glob(os.path.join(WORK, 'far', '*')))
    outputs = lambda j: [os.path.join(j, 'out', n) for n in (['far.png'] if '/far/' in j else ['eyes.png', 'half.png', 'open.png'])]
    finished = lambda j: all(os.path.exists(o) for o in outputs(j))
    todo = [j for j in jobs if not finished(j)]
    print(f'{len(todo)} Codex jobs to run, {par} at a time', flush=True)
    stop = []
    def run(j):
        if stop or finished(j): return j, 'skipped'
        with open(os.path.join(j, 'prompt.md')) as f, open(os.path.join(j, 'codex.log'), 'w') as log:
            imgs = sorted(glob.glob(os.path.join(j, 'in', '*.png')))
            cmd = ['codex', 'exec', '--skip-git-repo-check', '--sandbox', 'workspace-write', '-C', j, '-o', os.path.join(j, 'result.md')]
            for i in imgs: cmd += ['-i', i]
            subprocess.run(cmd + ['-'], stdin=f, stdout=log, stderr=subprocess.STDOUT, timeout=1800)
        if 'usage limit' in open(os.path.join(j, 'codex.log'), errors='replace').read():
            stop.append(j)   # Codex says when it can be used again; the rest would fail the same way
            return j, 'usage limit'
        return j, 'done' if finished(j) else 'no output'
    with cf.ThreadPoolExecutor(par) as ex:
        for fu in cf.as_completed([ex.submit(run, j) for j in todo]):
            try:
                j, status = fu.result()
                if status != 'skipped': print(status, os.path.relpath(j, WORK), flush=True)
            except Exception as e: print('failed', e, flush=True)
    left = [j for j in jobs if not finished(j)]
    print(f'{len(left)} jobs without output' + (' (stopped at the Codex usage limit: run again later)' if stop else ''), flush=True)

# ---------------------------------------------------------------------------------------------------- alignment
def align(new, ref, mask=None):
    """Warp `new` onto `ref` (same size) with an ECC affine fit; mask marks the pixels to fit on."""
    g1 = cv2.cvtColor(ref, cv2.COLOR_BGR2GRAY).astype(np.float32) / 255
    g2 = cv2.cvtColor(new, cv2.COLOR_BGR2GRAY).astype(np.float32) / 255
    g1, g2 = cv2.GaussianBlur(g1, (0, 0), 2), cv2.GaussianBlur(g2, (0, 0), 2)
    warp = np.eye(2, 3, dtype=np.float32)
    try:
        # coarse to fine
        for sc in (0.25, 0.5, 1.0):
            a, b = cv2.resize(g1, None, fx=sc, fy=sc), cv2.resize(g2, None, fx=sc, fy=sc)
            m = None if mask is None else cv2.resize(mask, (a.shape[1], a.shape[0]), interpolation=cv2.INTER_NEAREST)
            w = warp.copy(); w[:, 2] *= sc
            _, w = cv2.findTransformECC(a, b, w, cv2.MOTION_AFFINE, (cv2.TERM_CRITERIA_EPS | cv2.TERM_CRITERIA_COUNT, 200, 1e-6), m, 3)
            warp = w; warp[:, 2] /= sc
    except cv2.error as e:
        print('   ECC failed, using the output as it is:', str(e).splitlines()[-1][:80])
        warp = np.eye(2, 3, dtype=np.float32)
    return cv2.warpAffine(new, warp, (ref.shape[1], ref.shape[0]), flags=cv2.INTER_LINEAR | cv2.WARP_INVERSE_MAP, borderMode=cv2.BORDER_REPLICATE), warp

def colour_match(new, ref, keep):
    """Per-channel linear fit of new -> ref over the pixels in `keep` (unchanged ones)."""
    out = new.astype(np.float32)
    for c in range(3):
        a, b = new[..., c][keep].astype(np.float32), ref[..., c][keep].astype(np.float32)
        if len(a) < 50: continue
        k, d = np.polyfit(a, b, 1)
        out[..., c] = out[..., c] * k + d
    return np.clip(out, 0, 255).astype(np.uint8)

def local_match(new, ref, keep):
    """Shift the colours of `new` by the local difference to `ref`, measured on the `keep` pixels and spread into the
    rest (normalised convolution, finest scale that has enough support), so a filled hole meets its surroundings."""
    k = keep.astype(np.float32)
    diff = (ref.astype(np.float32) - new.astype(np.float32)) * k[..., None]
    off = np.zeros_like(diff)
    done = np.zeros(k.shape, bool)
    h, wd = k.shape
    small_k, small_d = cv2.resize(k, (wd // 4, h // 4), interpolation=cv2.INTER_AREA), cv2.resize(diff, (wd // 4, h // 4), interpolation=cv2.INTER_AREA)
    for sigma in (12, 30, 80, 200, 600):
        if sigma < 30:
            w = cv2.GaussianBlur(k, (0, 0), sigma)
            d = cv2.GaussianBlur(diff, (0, 0), sigma) / np.maximum(w, 1e-6)[..., None]
        else:   # wide scales on a quarter-size copy (the same result, much faster)
            w = cv2.resize(cv2.GaussianBlur(small_k, (0, 0), sigma / 4), (wd, h), interpolation=cv2.INTER_LINEAR)
            d = cv2.resize(cv2.GaussianBlur(small_d, (0, 0), sigma / 4), (wd, h), interpolation=cv2.INTER_LINEAR) / np.maximum(w, 1e-6)[..., None]
        use = (w > 0.15) & ~done
        off[use] = d[use]
        done |= use
    return np.clip(new.astype(np.float32) + off, 0, 255).astype(np.uint8)

def diff_map(a, b):
    la = cv2.cvtColor(cv2.GaussianBlur(a, (0, 0), 1.5), cv2.COLOR_BGR2LAB).astype(np.float32)
    lb = cv2.cvtColor(cv2.GaussianBlur(b, (0, 0), 1.5), cv2.COLOR_BGR2LAB).astype(np.float32)
    return np.sqrt(((la - lb) ** 2).sum(axis=2))

def blobs(mask, near=None, keep_frac=0.15):
    """The main connected parts of a binary mask (largest ones; optionally only those near a point)."""
    n, lab, st, cen = cv2.connectedComponentsWithStats(mask.astype(np.uint8), 8)
    if n <= 1: return np.zeros_like(mask, bool)
    parts = list(range(1, n))
    if near is not None:
        (px, py), r = near
        parts = [i for i in parts if abs(cen[i][0] - px) < r and abs(cen[i][1] - py) < r] or parts
    big = max(st[i, cv2.CC_STAT_AREA] for i in parts)
    return np.isin(lab, [i for i in parts if st[i, cv2.CC_STAT_AREA] >= big * keep_frac])

# ---------------------------------------------------------------------------------------------------- faces
def build_face(pid, who, im, out_dir, report):
    x0, y0, s = face_box(pid, who)
    job = os.path.join(WORK, 'face', f'{pid}.{who}')
    crop = im[y0:y0 + s, x0:x0 + s]
    Z = SPRITE
    ref = cv2.resize(crop, (s * Z, s * Z), interpolation=cv2.INTER_CUBIC)
    cells, masks = {}, {}
    for key, _ in FACE_EDITS:
        p = os.path.join(job, 'out', key + '.png')
        if not os.path.exists(p): report.append(f'{pid} {who}: no {key}.png'); return None
        new = cv2.resize(imread(p), (s * Z, s * Z), interpolation=cv2.INTER_AREA)
        new, _ = align(new, ref)
        d = diff_map(new, ref)
        ch = d > 18
        ch = cv2.morphologyEx(ch.astype(np.uint8), cv2.MORPH_OPEN, np.ones((3, 3), np.uint8))
        ch = cv2.morphologyEx(ch, cv2.MORPH_CLOSE, np.ones((9, 9), np.uint8))
        near = ((s * Z / 2, s * Z / 2), s * Z * 0.35)
        m = blobs(ch > 0, near, 0.25 if key == 'eyes' else 0.5)
        keep = (d < 8) & ~cv2.dilate(m.astype(np.uint8), np.ones((15, 15), np.uint8)).astype(bool)
        new = colour_match(new, ref, keep)
        cells[key], masks[key] = new, m
        outside = (d > 30) & ~cv2.dilate(m.astype(np.uint8), np.ones((31, 31), np.uint8)).astype(bool)
        report.append(f'{pid} {who} {key}: changed {m.mean() * 100:.1f}% of the crop, stray change outside {outside.mean() * 100:.2f}%')
    # the face box: everything any edit changed, plus the feather
    union = masks['eyes'] | masks['half'] | masks['open']
    ys, xs = np.nonzero(union)
    if not len(xs): report.append(f'{pid} {who}: nothing changed'); return None
    pad = (FEATHER + 3) * Z
    bx0, by0 = max(0, xs.min() - pad), max(0, ys.min() - pad)
    bx1, by1 = min(s * Z, xs.max() + pad + 1), min(s * Z, ys.max() + pad + 1)
    # snap the box to whole picture pixels
    bx0, by0 = bx0 // Z * Z, by0 // Z * Z
    bx1, by1 = -(-bx1 // Z) * Z, -(-by1 // Z) * Z
    bw, bh = bx1 - bx0, by1 - by0
    sheet = np.zeros((bh, bw * 3, 4), np.uint8)
    for i, (key, _) in enumerate(FACE_EDITS):
        m = cv2.dilate(masks[key].astype(np.uint8) * 255, np.ones((2 * Z + 1, 2 * Z + 1), np.uint8))
        a = cv2.GaussianBlur(m, (0, 0), FEATHER * Z / 2)
        a = np.maximum(a, m)   # fully opaque over the change itself, soft around it
        cell = np.dstack([cells[key], a])[by0:by1, bx0:bx1]
        sheet[:, i * bw:(i + 1) * bw] = cell
    from PIL import Image
    sheet[sheet[..., 3] == 0] = 0
    Image.fromarray(cv2.cvtColor(sheet, cv2.COLOR_BGRA2RGBA)).save(os.path.join(out_dir, f'{who}-face.webp'), 'WEBP', quality=90, alpha_quality=100, method=6)
    if os.path.exists(os.path.join(out_dir, f'{who}-face.png')): os.remove(os.path.join(out_dir, f'{who}-face.png'))
    fx, fy = x0 + bx0 / Z, y0 + by0 / Z
    out = {'x': round(fx / W, 5), 'y': round(fy / H, 5), 'w': round(bw / Z / W, 5), 'h': round(bh / Z / H, 5), 'src': f'{who}-face.webp'}
    if face_spec(pid, who)[3] != who: out['who'] = face_spec(pid, who)[3]
    return out

# ---------------------------------------------------------------------------------------------------- depth layers
def segment(pid, im):
    p = os.path.join(WORK, 'mask', pid + '.png')
    if not os.path.exists(p):
        from rembg import new_session, remove
        from PIL import Image
        global _seg
        if '_seg' not in globals(): _seg = new_session('isnet-general-use')
        os.makedirs(os.path.dirname(p), exist_ok=True)
        remove(Image.fromarray(cv2.cvtColor(im, cv2.COLOR_BGR2RGB)), session=_seg, only_mask=True).save(p)
    return cv2.imread(p, cv2.IMREAD_GRAYSCALE)

def build_depth(pid, im, out_dir, report):
    p = os.path.join(WORK, 'far', pid, 'out', 'far.png')
    if not os.path.exists(p): report.append(f'{pid}: no far.png'); return None
    new = imread(p)
    # the edit may come back 3:2 or square: bring it to 4:3 by the centre, then align on the sky and land that stayed
    h, w = new.shape[:2]
    if abs(w / h - 4 / 3) > 0.01:
        if w / h > 4 / 3: cw = int(h * 4 / 3); new = new[:, (w - cw) // 2:(w - cw) // 2 + cw]
        else: chh = int(w * 3 / 4); new = new[(h - chh) // 2:(h - chh) // 2 + chh]
    new = cv2.resize(new, (W, H), interpolation=cv2.INTER_AREA)
    first = diff_map(new, im)
    new, warp = align(new, im, ((first < 20) * 255).astype(np.uint8))
    d = diff_map(new, im)
    yy, xx = np.mgrid[0:H, 0:W]
    hy = horizon_y(pid, np.arange(W))
    above = yy < hy[None, :]
    # what the edit removed above the horizon: the things that stand up (they stay in mid)
    ch = (d > 22).astype(np.uint8)
    ch = cv2.morphologyEx(ch, cv2.MORPH_OPEN, np.ones((3, 3), np.uint8))
    ch = cv2.morphologyEx(ch, cv2.MORPH_CLOSE, np.ones((15, 15), np.uint8))
    # the salient things (people, the plane) from a segmentation model, cached in the work folder
    seg = segment(pid, im)
    # only what the edit took away: the model also finds the moon, a far planet or the sun, which the edit keeps in the
    # sky — in mid as well they would show twice once the layers slide
    n, lab, st, _ = cv2.connectedComponentsWithStats((seg > 128).astype(np.uint8), 8)
    removed = [i for i in range(1, n) if (d[lab == i] > 22).mean() > 0.2]
    seg = np.where(cv2.dilate(np.isin(lab, removed).astype(np.uint8), np.ones((9, 9), np.uint8)) > 0, seg, 0).astype(np.uint8)
    # keep only parts touching the ground (people and the plane stand on it): parts connected to the band below the horizon
    band = (yy < hy[None, :] + 40) & (yy > hy[None, :] - 4)
    n, lab, st, _ = cv2.connectedComponentsWithStats(ch, 8)
    grounded = [i for i in range(1, n) if (band & (lab == i)).any() and st[i, cv2.CC_STAT_AREA] > 400]
    stand = (np.isin(lab, grounded) | (seg > 128)) & (yy < hy[None, :] + 40)
    stand = cv2.morphologyEx(stand.astype(np.uint8), cv2.MORPH_CLOSE, np.ones((5, 5), np.uint8)) > 0
    # fill holes (the inside of a face that the edit did not change much)
    ff = stand.astype(np.uint8) * 255
    cnts, _ = cv2.findContours(ff, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    cv2.drawContours(ff, cnts, -1, 255, -1)
    stand = ff > 0
    # pale parts close to the sky's colour (a white wing, a canopy) are missed by both: once the edit's colours are matched
    # to the picture around the standing things, whatever still differs next to them belongs to them too
    near = cv2.dilate(stand.astype(np.uint8), cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (51, 51))) > 0
    grow0 = cv2.dilate(stand.astype(np.uint8), cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (41, 41))) > 0
    d2 = diff_map(local_match(new, im, (d < 14) & ~grow0), im)
    extra = cv2.morphologyEx(((d2 > 18) & above & near).astype(np.uint8), cv2.MORPH_OPEN, np.ones((3, 3), np.uint8))
    ff = ((stand | (extra > 0)).astype(np.uint8)) * 255
    ff = cv2.morphologyEx(ff, cv2.MORPH_CLOSE, np.ones((5, 5), np.uint8))
    cnts, _ = cv2.findContours(ff, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    cv2.drawContours(ff, cnts, -1, 255, -1)
    # (a planet's glow or a lamp's halo stays with it as a rim of sky: taking out what looks like sky there also cut
    # holes in pale wings and grass, so the rim is kept — it matches the picture at rest)
    stand = ff > 0
    stray = (d > 30) & above & ~cv2.dilate(stand.astype(np.uint8), np.ones((41, 41), np.uint8)).astype(bool)
    report.append(f'{pid}: standing things {stand[above].mean() * 100:.1f}% of the sky, other changes in the sky {stray[above].mean() * 100:.2f}%')
    # mid: below the horizon + the standing things, soft 2-3 px edge
    hard = (~above | stand).astype(np.uint8) * 255
    # the model's soft edge (hair, scarf fringes) where it has one, a 2-3 px soft edge elsewhere
    # (only a few px wide: further out the model's soft glow would carry a rim of sky with the people)
    rim = cv2.dilate(hard, np.ones((7, 7), np.uint8)) > 0
    mid_a = np.maximum(cv2.GaussianBlur(hard, (0, 0), 1.2), np.where(above & rim, seg, 0).astype(np.uint8))
    # far: the picture, with the edit's pixels inside the standing things (grown by 20 px) and soft around them
    grow = cv2.dilate(stand.astype(np.uint8) * 255, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (25, 25)))
    keep = (d < 14) & (grow == 0)
    new = local_match(new, im, keep)
    wa = cv2.GaussianBlur(grow, (0, 0), 4).astype(np.float32)[..., None] / 255
    wa = np.maximum(wa, (cv2.dilate(stand.astype(np.uint8), np.ones((13, 13), np.uint8)) > 0)[..., None].astype(np.float32))
    # below the horizon the far layer is hidden by mid, except for the strip that shows when it slides: use the empty
    # landscape there too, so no piece of a person or the plane peeks out above the ground's edge
    below = np.clip((yy - hy[None, :] - 4) / 16, 0, 1).astype(np.float32)[..., None]
    wa = np.maximum(wa, below)
    far = (im * (1 - wa) + new * wa).astype(np.uint8)
    # wherever far is no longer the picture (the filled ring around the people, where a lamp's glow or a planet's halo may
    # be missing from the edit), mid carries the picture's own pixels, so the layers at rest are exactly the picture
    ring = (np.abs(far.astype(np.int16) - im.astype(np.int16)).max(axis=2) > 6) & above
    ring = cv2.GaussianBlur(cv2.dilate(ring.astype(np.uint8) * 255, np.ones((3, 3), np.uint8)), (0, 0), 1.5)
    mid_a = np.maximum(mid_a, np.where(above, ring, 0).astype(np.uint8))
    far = cv2.copyMakeBorder(far, MARGIN, MARGIN, MARGIN, MARGIN, cv2.BORDER_REFLECT)
    cv2.imwrite(os.path.join(out_dir, 'far.jpg'), far, [cv2.IMWRITE_JPEG_QUALITY, 82, cv2.IMWRITE_JPEG_PROGRESSIVE, 1])
    # mid is stored only over its bounding box
    ys = np.nonzero(mid_a.max(axis=1) > 0)[0]
    top = int(ys.min())
    mid = np.dstack([im, mid_a])[top:]
    from PIL import Image
    Image.fromarray(cv2.cvtColor(mid, cv2.COLOR_BGRA2RGBA)).save(os.path.join(out_dir, 'mid.webp'), 'WEBP', quality=88, alpha_quality=100, method=6)
    if os.path.exists(os.path.join(out_dir, 'mid.png')): os.remove(os.path.join(out_dir, 'mid.png'))
    return [{'src': 'far.jpg', 'k': 0.6, 'x': -MARGIN / W, 'y': -MARGIN / H, 'w': (W + 2 * MARGIN) / W, 'h': (H + 2 * MARGIN) / H, 'far': True},
            {'src': 'mid.webp', 'k': 1.0, 'x': 0, 'y': round(top / H, 5), 'w': 1, 'h': round((H - top) / H, 5)}]

def write_js(data):
    with open(os.path.join(BOOK, 'film', 'layers.js'), 'w') as f:
        f.write('/* generated by tools/film-layers.py — motion layers of the pictures in ../images/layers/<id>/.\n'
                '   layers: far (sky, slides behind the frame) and mid (ground and people) with x, y, w, h as fractions of the picture\n'
                '   and k, the parallax factor (1 = moves with the picture); faces: who -> box of the face sprite, whose three cells are\n'
                '   eyes closed | mouth half open | mouth open. */\n')
        f.write('window.LP_FILM_LAYERS = {\n')
        f.write(',\n'.join(f'  {json.dumps(k)}: ' + json.dumps(data[k], separators=(',', ':')) for k in sorted(data)))
        f.write('\n};\n')

def load_js():
    p = os.path.join(BOOK, 'film', 'layers.js')
    if not os.path.exists(p): return {}
    t = open(p).read()
    return json.loads(t[t.index('LP_FILM_LAYERS =') + 16:].strip().rstrip(';'))

def build(ids):
    data, report = load_js(), []
    for pid in ids:
        im = imread(src(pid))
        out_dir = os.path.join(OUT, pid)
        os.makedirs(out_dir, exist_ok=True)
        entry = {}
        deep = PICTURES[pid].get('horizon') or PICTURES[pid].get('space')
        layers = build_depth(pid, im, out_dir, report) if deep else None
        if layers: entry['layers'] = layers
        faces = {}
        if '--depth' in sys.argv and pid in data:   # depth layers only: keep the faces already made
            faces = data[pid].get('faces', {})
        for who in ([] if '--depth' in sys.argv else PICTURES[pid]['faces']):
            f = build_face(pid, who, im, out_dir, report)
            if f: faces[who] = f
        if faces: entry['faces'] = faces
        if entry: data[pid] = entry
    write_js(data)
    print('\n'.join(report))

def sheet(ids=None):
    """Contact sheet: for every face, the crop, then eyes / half / open as the film composes them."""
    rows = []
    data = load_js()
    for pid in sorted(ids or data):
        im = imread(src(pid))
        for who, f in data.get(pid, {}).get('faces', {}).items():
            x0, y0, s = face_box(pid, who)
            spr = cv2.imread(os.path.join(OUT, pid, f['src']), cv2.IMREAD_UNCHANGED)
            bw = spr.shape[1] // 3
            fx, fy = round(f['x'] * W * SPRITE), round(f['y'] * H * SPRITE)
            base = cv2.resize(im, (W * SPRITE, H * SPRITE), interpolation=cv2.INTER_CUBIC)
            row = []
            for i in range(-1, 3):
                b = base.copy()
                if i >= 0:
                    c = spr[:, i * bw:(i + 1) * bw].astype(np.float32)
                    a = c[..., 3:] / 255
                    reg = b[fy:fy + c.shape[0], fx:fx + bw].astype(np.float32)
                    b[fy:fy + c.shape[0], fx:fx + bw] = (reg * (1 - a) + c[..., :3] * a).astype(np.uint8)
                row.append(cv2.resize(b[y0 * SPRITE:(y0 + s) * SPRITE, x0 * SPRITE:(x0 + s) * SPRITE], (300, 300)))
            r = np.hstack(row)
            cv2.putText(r, f'{len(rows)} {pid} {who}', (6, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 0, 255), 2)
            rows.append(r)
    for n in range(0, len(rows), 12):   # several sheets of 12 faces
        out = os.path.join(WORK, f'faces-sheet-{n // 12:02d}.jpg')
        cv2.imwrite(out, np.vstack(rows[n:n + 12]), [cv2.IMWRITE_JPEG_QUALITY, 85])
        print(out)

if __name__ == '__main__':
    a = sys.argv[1:]
    cmd = a[0] if a else ''
    ids = [x for x in a[1:] if not x.startswith('-') and not x.isdigit()] or list(PICTURES)
    if cmd == 'prep': prep(ids)
    elif cmd == 'codex': codex(int(a[a.index('-P') + 1]) if '-P' in a else 5)
    elif cmd == 'build': build(ids)
    elif cmd == 'sheet': sheet(ids if a[1:] else None)
    else: print(__doc__)

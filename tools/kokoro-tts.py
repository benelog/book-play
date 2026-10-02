#!/usr/bin/env python3
"""Local voices for tools/book-voices.py: Kokoro-82M (hexgrad/Kokoro-82M, Apache-2.0) on the CPU.

Reads jobs [{key, say, voice}] from the JSON file given and writes <out dir>/<key>.pcm (24 kHz 16-bit mono) for each,
printing 'done <key>' (or 'fail <key> <why>') as it goes; book-voices.py trims, levels and encodes them.
The first letter of a voice is its accent: a = American (af_heart, am_michael …), b = British (bf_emma, bm_george …).

Run by book-voices.py through uv:
  uv run --python 3.12 --with 'kokoro>=0.9.4' --with 'transformers>=4.44' --with soundfile --with pip python3 tools/kokoro-tts.py jobs.json out/
"""
import json, os, sys, warnings
warnings.filterwarnings('ignore')
import numpy as np
from kokoro import KPipeline

jobs, out = json.load(open(sys.argv[1])), sys.argv[2]
pipes = {}
for j in jobs:
    lang = j['voice'][0]
    try:
        if lang not in pipes: pipes[lang] = KPipeline(lang_code=lang, repo_id='hexgrad/Kokoro-82M')
        audio = np.concatenate([r.audio.numpy() for r in pipes[lang](j['say'], voice=j['voice']) if r.audio is not None])
        path = os.path.join(out, j['key'] + '.pcm')
        with open(path + '.tmp', 'wb') as f: f.write((np.clip(audio, -1, 1) * 32767).astype('<i2').tobytes())
        os.replace(path + '.tmp', path)
        print('done', j['key'], flush=True)
    except Exception as e:
        print('fail', j['key'], str(e).replace('\n', ' ')[:200], flush=True)

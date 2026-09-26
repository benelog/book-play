# 남은 작업 — 어린 왕자 영화 모션 코믹 (2026-09-26 기록, 같은 날 갱신)

`motion.md`의 1~4단계를 2장 시제품을 거쳐 영화 전체 그림에 적용했습니다. 모든 변경은 **커밋 전**입니다.
작업 트리의 `game/`, `game.md`, `tools/game-*` 변경은 다른 세션의 것이라 이 작업과 무관합니다.

## 끝난 것

- **1단계 입 곡선·단어 시각**: `film/timing.js`에 녹음 1,435줄이 모두 있습니다. 단어 시각이 빈 줄은 2개입니다(자막 강조만 빠짐).
  `audio.js`는 `{ 키: 길이ms }` 형식입니다. `film.js`·`test.js`·`js/pwa.js`는 옛 형식과 새 형식을 모두 읽습니다.
- **2~4단계 층·얼굴·motion.js**: 층을 나눈 그림 98장, 얼굴 조각 145개(`images/layers/`, 약 32MB)가 있습니다.
  얼굴은 모두 contact sheet로 눈 확인했고, 층도 `far`/`mid`를 나란히 놓고 눈 확인했습니다. `tools/film-motion-check.py` 자동 대조도 거쳤습니다.
  Codex 주간 한도에 걸린 뒤 초기화권 1장을 써서 끝냈습니다(초기화권은 이제 0장).
- **앱 껍데기**: `js/pwa.js`가 오프라인 저장에 `timing.js`·`layers.js`·`motion.js`와 층 이미지를 넣습니다. `sw.js` VERSION은 v16입니다.
- **문서**: `README.md`(기능 설명, 파일 구조, 도구)와 `images/README.md`의 "영화용 움직임 층" 절을 전체 기준으로 고쳤습니다.

## 결정된 것

1. **공개 방식**: 모션은 기본으로 켭니다(사용자 결정). `?motion=0`이면 꺼집니다.
2. **커밋**: 게임 관련 변경은 빼고 영화 관련 파일만 커밋해 푸시했습니다(c9f7806). 이때 로컬에만 있던 게임 커밋 579c001도 함께 푸시되었습니다.
3. **5단계·7단계**: 끝났습니다(2026-09-26). 숨 쉬는 인물 59명, 목도리 끝, 별 반짝임 41장입니다. 짧은 반복 영상은 영상 생성 도구가 없어 하지 않았고, chapter-06의 지는 해는 깨끗이 떨어지지 않아 뺐습니다.
4. **알려진 한계**(고치려면 Codex가 더 듭니다)
   - 입 칸이 비어 입이 움직이지 않는 얼굴: 08-f5·05-f5 어린 왕자, 11-f1 허영쟁이, 25-f4 조종사, chapter-21 어린 왕자·여우(반 벌림). 눈은 깜빡입니다.
   - 행성·등불 둘레의 원본 하늘 테두리가 `mid`와 함께 움직입니다(04-1, 14-f1, chapter-14, 26-f5 등). 클로즈업에서 카메라가 흐를 때 살짝 보일 수 있습니다.
   - 10-f9, chapter-22는 얼굴이 작아 자동 대조가 깜빡임을 잡지 못했습니다. 조각 자체는 확인했습니다.

## 다시 돌릴 때

```sh
# Codex 편집 (결과가 없는 작업만, 한도를 만나면 멈춤)
uv run --with opencv-python-headless --with numpy python3 tools/film-layers.py codex -P 6
# 층과 얼굴 (--depth: 층만, 얼굴은 기존 것 유지 — 층 98장 약 5분; 얼굴까지는 1시간 넘게 걸림)
uv run --with opencv-python-headless --with numpy --with pillow --with "rembg[cpu]" python3 tools/film-layers.py build [--depth] [그림 ...]
uv run --with opencv-python-headless --with numpy python3 tools/film-layers.py sheet [그림 ...]
uv run --with websocket-client --with opencv-python-headless --with numpy python3 tools/film-motion-check.py [그림 ...]
```

작업 폴더는 `~/.cache/book-play/film-layers/`(Codex 입출력, rembg 마스크, contact sheet)입니다.

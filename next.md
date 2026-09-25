# 남은 작업 — 어린 왕자 자체 번역 (2026-09-25)

커밋 `0b93cdc`에서 McNeill 영역본을 프랑스어 원문 AI 번역으로 바꾸고, `readOnly`를 풀고, 본문 속 그림 23장을 넣었습니다.
아래는 그때 끝내지 못했거나 확인하지 못한 일입니다.

## 1. 번역 검수

- [ ] **Woods 영역본(1943)과 겹치는 표현 확인.** McNeill 번역과는 8단어 이상 같은 구절이 200곳 남짓 있었습니다.
  대부분 직역이면 같아질 수밖에 없는 문장이지만, Woods 번역은 비교할 원문이 없어 확인하지 못했습니다.
  유명한 대목(1·2·21·25·26장)만이라도 사람이 직접 대조해 보세요. 비교용 사본은 저장소에 넣지 않습니다.
- [ ] 번역 에이전트들이 애매하다고 한 곳 확인하기
  - 6장 끝의 "forty-three": 원문에 44와 43이 모두 나옵니다. 원문 그대로 둔 상태입니다.
  - 13장 사업가의 계산 오류: 원문 그대로입니다.
  - 16장 "les rois nègres" → "the African kings"로 순화했습니다.
  - 23·24·26장 "fontaine" → "spring". 24·26장 "écorce" → "shell".
  - 25장 "bien autre chose qu'un aliment" → "something far more than a drink"는 조금 자유롭게 옮겼습니다.
  - 1장 "Histoires Vécues" → "Stories from Real Life", "forêt vierge" → "untouched forest".
- [ ] 여러 사람이 나눠 번역했으므로 문체와 용어가 고른지 한 번 통독하기(`books/little-prince/text/README.md`의 용어집 기준).

## 2. 앱

- [ ] 파서가 `…:`로 끝나는 문단과 다음 대사 문단을 한 문단으로 합칩니다. PDF용으로 만든 규칙 때문이고, 3장은 29문단이 22문단으로 줄었습니다.
  이 책처럼 문단이 깔끔한 텍스트에서는 합치지 않도록 할지 검토하세요. 규칙을 바꾸면 `js/parser.js`의 `VERSION`과 `sw.js`의 `VERSION`을 올려야 합니다.
- [ ] Play(게임 장면) 화면을 브라우저로 직접 확인하지 못했습니다. 60개 장면을 몇 장 골라 해 보세요. `node tools/test.js`는 통과합니다.
- [ ] 본문 속 그림을 휴대폰 너비와 `file://`에서 확인하세요. 데스크톱 http는 확인했습니다.

## 3. 그림

- [ ] 새 그림은 기존 장 삽화보다 인물이 가깝게 잡힌 구도가 많습니다. 색과 인물은 맞췄지만 여전히 어색해 보이면 해당 그림만 다시 편집하세요.
- [ ] 01-2(보아뱀 그림 1호)는 본문 설명상 모자처럼 보여야 해서 모양이 원작 그림과 비슷할 수밖에 없습니다.
  크레용 스타일로 그렸지만 한 번 더 보고 판단하세요.
- [ ] `books/little-prince/images/README.md`에 인물 맞춤 편집과 색 보정 절차를 적어 두기:
  - 인물이 나오는 17장: Codex 편집. 대상 그림에 `chapter-02.jpg`·`chapter-21.jpg`를 인물·스타일 참고로 줬습니다.
  - 색 보정: `convert in.png -resize 1200x900^ -gravity center -extent 1200x900 -modulate 86,90,100 +sigmoidal-contrast 1.2x50% -fill '#b07a3c' -colorize 7% -blur 0x0.5 -strip -quality 86 -interlace Plane out.jpg`
    (인물이 없는 6장은 `-modulate 86,98,100`, `-blur 0x0.6`)

## 참고

- 작업 중 만든 파일(장별 프랑스어 원문, Codex 원본 PNG, 번역 지침 STYLE.md)은 `/tmp` 임시 폴더에 있어서 컴퓨터를 끄면 사라집니다.
  프랑스어 원문은 `https://gutenberg.net.au/ebooks03/0300771h.html`(cp1252 인코딩)에서 다시 받을 수 있습니다.
  번역 지침과 용어집은 `books/little-prince/text/README.md`에 있습니다.

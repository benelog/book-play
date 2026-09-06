# CLAUDE.md

Book Play — 삽화가 있는 영어 책으로 영어를 배우는 정적 웹 텍스트 어드벤처.

기능·화면·파일 구조·책 목록은 `README.md`, 새 책 추가 절차는 `books/README.md`에 있습니다.
이 문서는 저장소를 읽어서는 알 수 없는 결정과 제약만 적습니다.

## 저장소와 배포

- 원격: `git@github.com:benelog/book-play.git` (public). 2026-09-06에 `once-upon-a-line`에서 이름을 바꿨습니다.
- 사이트: https://benelog.github.io/book-play/ — GitHub Pages, `main` 브랜치 루트. 푸시하면 바로 배포됩니다.
- 사이트 이름도 2026-09-06에 'Once Upon a Line' → 'Book Play'로 바뀌었습니다. 옛 이름이 남아 있으면 고쳐도 됩니다.

## 깨뜨리면 안 되는 제약

- **`file://`에서 동작해야 합니다.** 빌드도 서버도 없이 `index.html`을 직접 열어도 되어야 하므로 `fetch()`를 쓰지 마세요.
  텍스트는 `text/book.js`(=`tools/embed-text.py`가 `text/*.txt`를 미리 박아 넣은 JS)로, 이미지 존재 확인은 `Image` `onerror`로 합니다.
  URL도 `file://`에서는 경로 대신 해시(`index.html#/books/<id>/chapters/3`)로 떨어집니다.
- **장면 데이터는 자체 저작입니다.** `books/<id>/scenes.js`는 책 본문을 옮긴 게 아니라 직접 쓴 상황·대사이고, 원문 인용은 몇 단어 수준으로 제한합니다.
  객관식 오답(distractors)은 장면마다 3개씩 손으로 씁니다.
- **안내 문구는 영어가 기본**이고, `*Ko` 필드에 한국어 도움말을 넣어 "Show Korean help"로 토글합니다.
- localStorage 키는 `lp.v1.<bookId>.*` 로 책별 네임스페이스를 지킵니다.
- 책 목록 `js/library.js`는 `books/` **밖**에 둡니다 (`/books/<id>` URL과 충돌하기 때문).
- 파서(`js/parser.js`)는 Gutenberg 머리말·꼬리말·목차를 걸러 냅니다. 규칙을 바꾸면 `VERSION`을 올리세요.
- 장면을 추가·수정하면 `node tools/test.js`로 모범 답안이 자체 판정을 통과하는지 확인합니다.

## 저작권 규칙

새 책은 **원작자·삽화가(번역서면 역자 포함)가 모두 1956년 이전 사망 + 미국 1931년 이전 출판**을 기준으로 고릅니다.
등록된 책의 원문과 삽화는 저장소에 함께 커밋합니다. 저작권이 남은 책은 올리지 마세요.

어린 왕자(`books/little-prince`)만 예외이고, 조사 결과(2026-09-05~06)는 이렇습니다.

- 프랑스어 원문과 생텍쥐페리 삽화는 한국에서 퍼블릭 도메인이지만 **미국은 2039년, 프랑스는 2032년까지 보호** 중입니다.
- Katherine Woods 영역본(1943)은 역자 사망(1968) 기준 한국에서 2038년까지 보호. Project Gutenberg·Wikimedia Commons·Faded Page·Gutenberg Australia 어디에도 자유로운 영어 번역본이 없습니다(캐나다·호주 아카이브에는 프랑스어 원문뿐).
- 그래서 **완전히 자유로운(PD/CC0) 영어 번역본은 현재 존재하지 않습니다.**

따라서 어린 왕자는 Jeff McNeill 영역본(CC BY-NC-ND 4.0)을 **무수정·출처 표시**로 게시하는 `readOnly: true` 책입니다.
번역문을 고치지 말고, 사이트는 비영리로 유지하고, 생텍쥐페리 그림은 쓰지 마세요(삽화는 자체 생성). 번역 파일 머리말의 "원작·그림은 PD" 문구는 미국 기준으로 틀리므로 근거로 쓰지 마세요.

로컬에만 있던 McNeill 번역 `.txt`와 스캔 삽화 27장은 `~/source/benelog/little-prince-assets-backup/`에 옮겨 두었습니다(저장소에는 없음).

## 자산 만들기

- **삽화 생성**: 이 컴퓨터의 Codex CLI를 씁니다 — `codex exec --sandbox workspace-write -C <repo> -o result.md - < prompt.md` (한 번에 약 10분).
  생성한 그림은 1200px JPEG로 `books/<id>/images/chapter-NN.jpg`에 넣고, 표지는 `cover.jpg`(없으면 `chapter-01.jpg`가 표지로 쓰임).
- **StoryWeaver 책**: `/api/v1/stories/<slug>/read` JSON의 `pages[].html`에서 본문을, `coverImage.sizes`에서 삽화(959px)를 가져옵니다. 한 쪽이 한 장(chapter)입니다.
- **여러 `.txt` 파일**(`01-*.txt`, `02-*.txt` …)은 `tools/embed-text.py`가 `===` 로 이어 붙여 장 단위로 만듭니다.

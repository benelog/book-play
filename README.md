# Book Play

삽화가 있는 영어 책(고전과 그림책)으로 영어를 배우는 텍스트 어드벤처입니다. 서재는 입문(Starter)·초급(Beginner)·중급(Intermediate) 책장으로 나뉩니다. 첫 화면(서재)에서 책을 고르면,
1980년대 일본 PC 어드벤처처럼 위에는 삽화, 아래에는 메시지 창이 나오고, 상황에 맞는 영어 대사를 말하면 다음 장면으로 넘어갑니다.

## 실행

```bash
./start.sh          # 로컬 서버(기본 8765)를 띄우고 브라우저를 엽니다. 포트: ./start.sh 9000
```

`index.html`을 브라우저(Chrome 권장)에서 직접 열어도 동작합니다. 빌드 과정은 없습니다.

공개 사이트: https://book-play.benelog.net/ (GitHub Pages, `main` 브랜치 루트에서 배포. 커스텀 도메인은 저장소의 `CNAME` 파일, DNS는 Netlify DNS의 `book-play` CNAME → `benelog.github.io`. 옛 주소 https://benelog.github.io/book-play/ 는 여기로 넘어옵니다). GitHub Pages에는 URL 재작성이 없어서 `404.html`이 요청 경로를 기억했다가 `index.html`로 넘기는 방식으로 `/books/<id>/...` 경로를 처리합니다. 서비스 워커(`sw.js`)가 설치된 뒤에는 워커가 그 경로에 바로 `index.html`을 내려 주므로 이 우회가 필요 없어집니다.
`start.sh`는 실행 전에 `tools/embed-text.py`를 돌려 각 책의 `text/*.txt`를 `text/book.js`로 변환한 뒤 `tools/serve.py`를 띄웁니다.

## 구성

- **서재(Library)** — 난이도별 책장(`js/library.js`의 `difficulty`: starter · beginner · intermediate) 위에 책 표지가 놓여 있습니다. 표지 그림은 `images/cover.jpg`가 있으면 그것을, 없으면 `chapter-01.jpg`를 씁니다. 책을 꺼내면 펼친 책(왼쪽 삽화, 오른쪽 본문) 화면으로 넘어가고, 화면 전환 때 오른쪽 페이지가 넘어가는 애니메이션이 있습니다.
- **출처와 라이선스** — 책마다 제목 페이지 아래 "Sources & licences"에 원문과 삽화의 출처·라이선스를 표시합니다. 내용은 `js/library.js`의 `credits` 항목입니다.
- **URL** — 경로 방식입니다: `/books/<id>` (책 제목 화면), `/books/<id>/chapters/<n>` (읽기), `/books/<id>/chapters/<n>/play` (대화 장면).
  `start.sh`의 서버(`tools/serve.py`)가 이 경로를 `index.html`로 연결합니다. 정적 호스팅에서는 `_redirects`(Cloudflare Pages·Netlify 형식)처럼 `/books/*`를 `index.html`로 보내는 규칙이 필요합니다.
  `index.html`을 file://로 직접 열면 같은 경로를 `#` 뒤에 붙입니다: `index.html#/books/<id>/chapters/3`.
- **원문 읽기(Read)** — 장별 영어 원문과 TTS(브라우저 내장 음성 합성). 문장 단위로 강조됩니다. Gutenberg 텍스트의 `_밑줄_` 이탤릭 표기는 기울임체로 표시하고 음성에서는 뺍니다. 본문의 `[Picture 01-1: 설명]` 문단은 `images/pictures/01-1.jpg` 그림으로 표시합니다(파일이 없으면 생략).
- **단어 사전** — 본문의 단어를 클릭하면 팝오버에 영어 뜻(English Wiktionary), 한국어 뜻(한국어 위키낱말사전이 있으면 그것, 없으면 MyMemory 기계 번역), 발음(Free Dictionary API 녹음 또는 TTS)이 나옵니다. 팝오버의 "▶ Read from here"로 그 문장부터 읽기를 시작할 수 있고, Naver·Daum 사전 링크도 있습니다.
  `cyclones`·`carried`처럼 활용형은 원형을 찾아 함께 보여 줍니다. 찾은 결과는 localStorage(`lp.v1.dict`)에 캐시되어 오프라인에서도 다시 볼 수 있습니다. 코드는 `js/dict.js`.
  `readOnly: true`인 책은 Play 탭이 없고, 읽기 화면의 "Finished" 버튼으로 장을 완료합니다.
  Chrome의 Google 네트워크 음성은 일시 정지가 바로 반영되지 않을 수 있습니다. 정지 버튼과 문장 클릭은 항상 동작합니다.
- **대화 장면(Play)** — 상황 설명과 상대의 대사가 영어로 나오면 알맞은 대사를 답합니다.
  - **Type(주관식)**: 영어로 직접 입력. 핵심 단어 기반으로 판정하며 오타 한 글자는 허용합니다. 두 번 틀리면 힌트, 세 번 틀리면 정답 예시를 보여 주고 따라 입력하게 합니다.
  - **Choose(객관식)**: 네 개의 대사 중 하나를 고릅니다. 장면마다 손으로 쓴 오답 세 개가 섞여 있습니다.
  - 답 방식은 책 제목 화면과 장면 화면에서 언제든 바꿀 수 있고, 설정은 브라우저에 저장됩니다.
- **안내 언어** — 게임 안내(상황, 지시문, 힌트, 버튼)는 모두 영어입니다. "Show Korean help"를 켜면 영어 아래에 한국어 도움말이 함께 표시됩니다.
- **진행 저장** — 책별로 현재 장, 완료한 장, 장면 위치, 시도 횟수를 브라우저 localStorage에 저장합니다.
- **최근 학습(Recent study)** — 서재 화면의 종이 메모에 최근 활동이 나옵니다. 마지막으로 읽던 장으로 가는 "Continue" 버튼, 이번 주 통계(완료한 장·끝까지 들은 장·찾아본 단어·연속 학습일), 최근 찾아본 단어 칩(클릭하면 다시 사전), "Show all activity"로 날짜별 전체 목록.
  기록되는 활동은 장 열기(read/play), TTS로 장 끝까지 듣기, 장 완료, 단어 검색이며 전역 키 `lp.v1.history`에 최대 400개를 보관합니다. 같은 장을 다시 열거나 같은 단어를 다시 찾으면 새 항목 대신 기존 항목이 위로 올라옵니다.
- **PWA** — `manifest.webmanifest`와 `sw.js`가 있어 Chrome·Edge·Android에서 앱으로 설치할 수 있습니다(서재 하단 "Install app" 버튼, iOS는 공유 → 홈 화면에 추가). 서비스 워커는 앱 껍데기를 미리 캐시하고, 열어 본 책 파일을 방문할 때마다 캐시하므로 한 번 본 장은 오프라인에서도 열립니다.
  책 제목 페이지의 "Save for offline"은 그 책의 `scenes.js`·본문·장별 삽화를 한 번에 저장합니다. 새 버전을 배포하면 "A new version of Book Play is ready" 토스트가 뜨고 Reload로 갱신합니다. `file://`에서는 서비스 워커가 없으므로 이 기능만 빠지고 나머지는 그대로 동작합니다.

- **어린 왕자 영화(Film)** — 어린 왕자 제목 페이지의 "▶ Watch the whole book as a film"(`books/little-prince/film/`). 헌사부터 27장 끝까지 번역문 전체를 자막으로 보여 주고 브라우저 음성으로 읽습니다.
  화자(조종사)의 서술과 등장인물의 대사를 나눠 인물마다 한 가지 목소리(음색·높낮이)와 자막 색을 씁니다. 장 삽화와 본문 속 그림은 별이 뜬 공간에 떠 있는 판처럼 놓이고, 카메라가 판 사이를 날아가며 말하는 인물 쪽으로 다가갑니다.
  삽화 판은 CSS 3D로 만들었습니다. `file://`에서는 WebGL이 로컬 이미지를 텍스처로 쓸 수 없기 때문입니다. 음성이 없는 브라우저에서는 자막만으로 진행합니다. 스페이스 재생/정지, ← → 문장, [ ] 장, f 전체 화면. 이어 보기 위치는 `lp.v1.little-prince.film`에 저장합니다.
  **8·9·14·21장은 등장인물이 움직이는 3D 장면**입니다(three.js, "3D characters"로 끄고 켬). 인물은 기본 도형으로 만든 툰 셰이딩 모델이라 이미지 텍스처가 없고, 그래서 `file://`에서도 동작합니다.
  장미가 싹을 틔우고 피어나고, 어린 왕자가 물을 주고 화산을 쓸고 철새를 타고 떠나며(8·9장), 점등인이 가로등을 켜고 끄면 낮과 밤이 바뀌고(14장), 여우가 날마다 조금씩 다가옵니다(21장). 말하는 인물은 입이 움직이고 카메라가 그 인물에게 다가갑니다.

## 책

현재 등록된 책 (`js/library.js`):

| id | 책 | 장 | 원문·삽화 |
|---|---|---|---|
| little-prince | The Little Prince | 27 | 프랑스어 원문(Gutenberg Australia)을 AI로 새로 옮긴 영역본. 장 삽화·본문 속 그림은 자체 생성 |
| wizard-of-oz | The Wonderful Wizard of Oz | 24 | 퍼블릭 도메인, Gutenberg #55 / #43936 |
| alice-in-wonderland | Alice's Adventures in Wonderland | 12 | 퍼블릭 도메인, Gutenberg #11 / #114 |
| peter-rabbit | The Tales of Peter Rabbit and Friends | 10 | 퍼블릭 도메인, 이야기마다 Gutenberg 전자책 하나 |
| grimms-fairy-tales | Grimm's Fairy Tales | 12 | 퍼블릭 도메인, Gutenberg #2591 + Rackham 삽화 |
| peter-pan | Peter and Wendy | 17 | 퍼블릭 도메인, Gutenberg #26654 + Bedford 삽화 |
| red-raincoat | The Red Raincoat | 9 | CC BY 4.0, Pratham Books · StoryWeaver #369 (한 쪽이 한 장) |
| efficiency-expert | The Efficiency Expert | 28 | 퍼블릭 도메인, Gutenberg #3475. 삽화는 자체 생성. 비즈니스 영어(면접·보고·협상) 연습용 |
| sherlock-holmes | The Adventures of Sherlock Holmes | 12 | 퍼블릭 도메인, Gutenberg #1661 + Paget 삽화(Wikimedia Commons). 비즈니스 영어(의뢰·채용·협상) 연습용 |

새 책을 추가하는 방법은 `books/README.md`를 보세요.
폴더 하나(`books/<id>/`)에 `scenes.js`를 쓰고 `js/library.js`에 등록하면 서재에 나타납니다.

등록된 책은 모두 퍼블릭 도메인이라 원문(`text/*.txt`, `text/book.js`)과 삽화(`images/chapter-NN.jpg`)를 저장소에 함께 둡니다.
저작권이 남아 있는 책은 올리지 마세요. 어린 왕자는 예외입니다. 기존 영역본은 모두 보호 중이라 한국·EU에서 퍼블릭 도메인인 프랑스어 원문을 직접 번역해 싣습니다(원작은 미국 2039년·프랑스 2032년까지 보호). 자세한 내용은 `CLAUDE.md`를 보세요.

## 파일

```
index.html            진입점
start.sh              로컬 서버 실행 + 브라우저 열기
css/style.css         화면 스타일
js/app.js             서재·화면 전환·게임 흐름
js/parser.js          텍스트를 장·문단·문장으로 분할
js/matcher.js         자유 입력 답 판정
js/tts.js             Web Speech API 래퍼
js/dict.js            단어 사전 (Wiktionary · Free Dictionary API · MyMemory) + 팝오버
js/pwa.js             서비스 워커 등록, 설치 버튼, 새 버전 토스트, 책 오프라인 저장
js/storage.js         localStorage (책별 네임스페이스 + 전역 학습 이력·사전 캐시)
js/library.js        책 목록(서재)
manifest.webmanifest  PWA 매니페스트
sw.js                 서비스 워커 (앱 껍데기 미리 캐시, 책 파일 런타임 캐시, 오프라인 라우팅)
icons/                앱 아이콘 (icon.svg 원본, PNG는 ImageMagick으로 변환)
books/README.md       책 추가 가이드
books/_template/      scenes.js 템플릿
books/little-prince/  어린 왕자: scenes.js, art.js(대체 SVG 삽화), text/, images/, film/(3D 낭독 영화: index.html, film.js, film.css,
                      script.js 본문→대본, cast.js 인용마다 화자·인물별 목소리, shots.js 그림 속 인물 위치,
                      film3d.js 움직이는 인물 모델과 3D 재생, scenes3d.js 3D로 연기하는 장, vendor/three.min.js three.js r159·MIT)
books/wizard-of-oz/   오즈의 마법사: scenes.js, text/, images/ (원문·삽화 내려받기 안내는 각 README)
books/alice-in-wonderland/, books/peter-rabbit/, books/grimms-fairy-tales/, books/peter-pan/, books/red-raincoat/, books/efficiency-expert/, books/sherlock-holmes/  같은 구조
_redirects            정적 호스팅용 경로 재작성 규칙
tools/serve.py        경로 방식 URL을 지원하는 로컬 서버
tools/embed-text.py   text/*.txt → text/book.js 변환 (start.sh가 자동 실행)
tools/test.js         node tools/test.js — 파서·판정·모든 책의 장면 데이터·어린 왕자 영화 대본 검사
tools/film-quotes.js  node tools/film-quotes.js [from] [to] — 어린 왕자 인용문과 cast.js의 화자를 나란히 출력
tools/gallery.html    삽화 미리보기 (?book=<id>; images/ 파일 우선, 없으면 art.js)
```

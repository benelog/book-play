---
name: book-voices
description: Record the audiobook voices of a Book Play book with OpenAI TTS, the way The Little Prince was recorded — narrator voice, optional per-character voices for quoted speech, MP3s the audiobook mode (and the film) play instead of the browser voice. Use when the user asks to record/녹음 a book, make audio/오디오북 voices, add character voices, or re-record lines after editing a book's text or cast.
---

# 책 녹음 (book-voices)

오디오북 모드(`/books/<id>/listen`)는 녹음이 있는 줄은 MP3를, 없는 줄은 브라우저 음성을 재생합니다.
브라우저 음성은 화면이 꺼지면 멈추는 휴대폰이 있으므로(특히 iPhone), 달리면서 들을 책은 녹음해 두는 것이 확실합니다.

## 구조 (먼저 알아 둘 것)

- 대본은 `js/narration.js`의 `forBook()`이 만듭니다. 앱·영화·녹음 도구가 같은 코드를 쓰므로 녹음 키가 항상 맞습니다.
  제목 → (앞부분) → 장마다 "Chapter One. <제목>." 카드 → 문단을 자막 크기로 나눈 줄.
- 파일 이름 `<key>` = `audioKey(화자, 읽을 문장, tts)` 해시. **본문·화자·목소리(`tts`)를 바꾸면 그 줄만 이름이 바뀌어 녹음이 빠집니다.** 도구를 다시 돌리면 빠진 줄만 녹음합니다.
- 위치 (`js/library.js`의 책 항목 `listen`으로 바꿀 수 있음):
  | | 기본 | 어린 왕자 |
  |---|---|---|
  | 녹음 | `books/<id>/audio/<key>.mp3` | `film/audio/` |
  | 목록 | `books/<id>/audio.js` (`window.LP_AUDIO = { key: ms }`) | `film/audio.js` (`LP_FILM_AUDIO`) |
  | 목소리·화자 | `books/<id>/cast.js` (없어도 됨) | `film/cast.js` |
- `cast.js`가 없으면 `narration.js`의 `DEFAULT_CAST`(낭독자 하나, `ash`)가 전부 읽습니다.

## 절차

1. **비용·분량 확인** — 녹음 전에 항상 dry-run으로 줄 수·분량·예상 비용을 사용자에게 알립니다.
   ```sh
   python3 tools/book-voices.py <id> --dry-run
   ```
   대략 오디오 1분에 0.015달러입니다(어린 왕자 95분 ≈ 1.5달러, 셜록 홈즈 10시간 ≈ 9달러).
   이 조직의 gpt-4o-mini 계열은 **하루 요청 1만 회를 다른 사용처와 함께 씁니다**(한 줄 = 1회). 수천 줄짜리 책은 사용자에게 먼저 물어보고, 한도가 찼으면 `LP_TTS_RPM=6.5`로 천천히 돌리거나 다음 날 이어서 돌립니다(빠진 줄만 녹음하므로 끊겨도 안전).

2. **목소리 정하기** — 낭독자만 바꾸려면 `books/<id>/cast.js`를 만듭니다. 인물별 목소리까지 넣으려면 3번으로.
   ```js
   /* <책 제목> audiobook — voices (tools/book-voices.py). speakers: see tools/book-quotes.js */
   window.LP_CAST = {
     characters: {
       narrator: { name: 'Narrator', ko: '낭독자', color: '#e9dcc0', voice: 'female', pitch: 1, rate: 1,
         tts: { voice: 'sage', shift: 0, how: 'A warm storyteller reading … aloud to learners of English: …' } }
     }
   };
   ```
   - `tts.voice`: gpt-4o-mini-tts 목소리 (alloy, ash, ballad, cedar, coral, echo, fable, marin, nova, onyx, sage, shimmer, verse). 어린 왕자에서 쓴 조합(화자 ash, 여우 cedar, 어린 왕자 coral +3반음)은 `books/little-prince/film/cast.js` 참고.
   - `tts.shift`: 녹음 후 반음 단위로 높이기(아이 목소리). ffmpeg rubberband 필터 필요.
   - `tts.how`: 연기 지시. 인물의 나이·성격·말투를 영어로 구체적으로.
   - `color`, `pitch`, `voice: 'male'|'female'`: 화면의 화자 이름 색, 녹음이 없을 때 브라우저 음성 높낮이.
   - 목소리를 고르기 어려우면 사용자에게 후보 2~3개를 제안하고 고르게 합니다(어린 왕자도 사용자가 골랐음).

3. **(선택) 인물별 목소리** — 본문의 큰따옴표 인용(`"…"` 또는 `“…”`)마다 화자를 정합니다.
   ```sh
   node tools/book-quotes.js <id> 1 1        # 1장의 인용과 지금 정해진 화자
   ```
   `cast.js`에 인물을 추가하고 `speakers: { 1: 'dorothy henry narrator …', 2: '…' }`처럼 장마다 인용 순서대로 화자 id를 적습니다.
   책 제목·간판·속생각처럼 소리 내어 말하지 않는 인용은 `narrator`로 둡니다. 한 장씩 쓰고 `book-quotes.js`로 확인하세요.
   초안을 따로 시험할 때는 `SPEAKERS=draft.json node tools/book-quotes.js <id> 3 3` (`{ "3": "…" }`).
   `node tools/test.js`가 장마다 인용 수와 화자 수가 맞는지, 모르는 화자가 없는지 검사합니다.

4. **녹음**
   ```sh
   source .envrc && OPENAI_PAT="$OPENAI_PAT" python3 -u tools/book-voices.py <id> [--chapter N]
   ```
   키는 저장소 루트 `.envrc`(`OPENAI_PAT`)에 있고 git에서 빠져 있습니다. 키를 출력하거나 커밋하지 마세요.
   오래 걸리면 Bash `run_in_background`로 돌립니다(분당 400회 기본, 줄당 약 1~2초).
   어린 왕자는 `little-prince`로 같은 도구를 쓰고, 녹음 뒤 `tools/film-timing.py`로 영화의 입 모양·단어 시각을 만듭니다.

5. **확인**
   - `node tools/test.js` — 마지막에 `audiobook voices recorded: <id> 28/28`처럼 녹음 비율이 나옵니다.
   - 몇 개를 들어 보기: `ls books/<id>/audio | head`, `ffplay -autoexit -nodisp books/<id>/audio/<key>.mp3` (또는 사용자에게 들어 보라고 요청).
   - 쓰지 않게 된 녹음(본문·목소리를 고친 뒤 남은 옛 파일)은 `--prune`으로 지웁니다.

6. **커밋** — `audio/`·`audio.js`·`cast.js`를 커밋합니다. MP3는 48kbps 모노라 1시간에 약 20MB입니다.
   앱 껍데기 파일은 바뀌지 않으므로 `sw.js`의 `VERSION`은 올리지 않아도 됩니다(녹음 파일은 해시 이름이라 캐시 문제 없음).

## 주의

- 녹음은 책 본문을 그대로 읽은 것입니다. 저작권 규칙(CLAUDE.md)상 저장소에 있는 책만 녹음합니다.
- 장면 데이터(`scenes.js`)의 장 제목을 바꾸면 그 장의 카드 녹음 이름이 바뀝니다(어린 왕자는 카드에 제목을 읽지 않음).
- 본문의 줄 나누기(`chunks`)나 읽는 문장(`spoken`) 규칙을 바꾸면 **모든 책의 녹음 키가 바뀔 수 있습니다.** 바꾸기 전후로 `python3 tools/book-voices.py little-prince --dry-run`이 `0 to record`인지 확인하세요.

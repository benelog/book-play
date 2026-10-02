---
name: book-voices
description: Record the audiobook voices of a Book Play book — with OpenAI TTS (paid) or Kokoro on this computer (free), the way The Little Prince was recorded — narrator voice, optional per-character voices for quoted speech, MP3s the audiobook mode (and the film) play instead of the browser voice. Use when the user asks to record/녹음 a book, make audio/오디오북 voices, add character voices, or re-record lines after editing a book's text or cast.
---

# 책 녹음 (book-voices)

오디오북 모드(`/books/<id>/listen`)는 녹음이 있는 줄은 MP3를, 없는 줄은 브라우저 음성을 재생합니다.
브라우저 음성은 화면이 꺼지면 멈추는 휴대폰이 있으므로(특히 iPhone), 달리면서 들을 책은 녹음해 두는 것이 확실합니다.

**엔진과 목소리는 반드시 `AskUserQuestion`으로 사용자에게 물어서 정합니다.** 아래 2·3단계를 건너뛰지 마세요(이미 `cast.js`가 있는 책을 다시 녹음할 때만 예외 — 그때는 지금 설정을 보여 주고 바꿀지 한 번만 묻습니다).

## 구조 (먼저 알아 둘 것)

- 대본은 `js/narration.js`의 `forBook()`이 만듭니다. 앱·영화·녹음 도구가 같은 코드를 쓰므로 녹음 키가 항상 맞습니다.
  제목 → (앞부분) → 장마다 "Chapter One. <제목>." 카드 → 문단을 자막 크기로 나눈 줄.
- 파일 이름 `<key>` = `audioKey(화자, 읽을 문장, tts)` 해시. **본문·화자·목소리(`tts`)를 바꾸면 그 줄만 이름이 바뀌어 녹음이 빠집니다.** 도구를 다시 돌리면 빠진 줄만 녹음합니다.
- 위치 (`js/library.js`의 책 항목 `listen`으로 바꿀 수 있음):
  | | 기본 | 어린 왕자 |
  |---|---|---|
  | 녹음 | `books/<id>/audio/<key>.mp3` | `film/audio/` |
  | 목록 | `books/<id>/audio.js` (`window.LP_AUDIO = { key: ms }`) | `film/audio.js` (`LP_FILM_AUDIO`) |
  | 목소리·화자 | `books/<id>/cast.js` | `film/cast.js` |
- 엔진은 인물마다 `cast.js`의 `tts`로 정해집니다. `cast.js`가 없으면 `narration.js`의 `DEFAULT_CAST`(OpenAI `ash` 낭독자 하나)입니다.
  - OpenAI: `tts: { voice: 'ash', shift: 0, how: '연기 지시(영어)' }`
  - Kokoro: `tts: { engine: 'kokoro', voice: 'am_michael', shift: 0, how: '' }` — `tools/kokoro-tts.py`를 uv로 돌림(키·비용 없음, 모델은 `~/.cache/huggingface`에 있음)

## 절차

### 1. 분량 확인

```sh
python3 tools/book-voices.py <id> --dry-run
```
줄 수, 오디오 분량, OpenAI 예상 비용, Kokoro 예상 작업 시간이 나옵니다. 2단계 질문의 설명에 이 숫자를 넣습니다.
(참고: OpenAI ≈ 오디오 1분에 $0.015. Kokoro는 이 PC(CPU 8코어, GPU 없음)에서 오디오 1분에 약 40초.)

### 2. 엔진 묻기 — `AskUserQuestion`

질문: "<책 제목>(약 N분 분량)을 어떤 엔진으로 녹음할까요?" / header: `Engine`
- **Kokoro (로컬, 무료)** — 이 PC에서 생성. 비용 없음, 약 M분 걸림(백그라운드). 감정 연기 지시와 아이 목소리는 없음. 낭독자 한 명이 읽는 긴 책에 알맞음.
- **OpenAI (gpt-4o-mini-tts)** — 약 $X. 인물별 연기 지시(`how`)와 아이 목소리(`shift`) 가능. 하루 요청 1만 회를 다른 사용처와 함께 씀(한 줄 = 1회).

권장 표시(`(Recommended)`, 첫 번째 옵션): 낭독자 한 명이면 Kokoro, 인물별 목소리가 중요하면 OpenAI.
사용자는 2026-10-02 비교에서 Kokoro `am_michael`이 괜찮다고 했습니다.

OpenAI를 고르면 진행 전에 비용을 한 번 더 확인합니다. 요청 수가 수천 회(예: 셜록 홈즈 5,785줄)면 하루 한도와 겹칠 수 있다고 알립니다.

### 3. 낭독자 목소리 묻기 — `AskUserQuestion`

질문: "낭독자 목소리는 무엇으로 할까요?" / header: `Voice`. 옵션은 엔진에 따라 고르고, 마지막 옵션은 항상 **"샘플 먼저 듣기"**.

- Kokoro:
  - `am_michael (Recommended)` — 미국 남성, 차분함. 사용자가 비교 후 마음에 들어 함
  - `af_heart` — 미국 여성, Kokoro에서 품질이 가장 좋은 목소리
  - `bm_george` — 영국 남성, 고전 낭독 느낌
  - 샘플 먼저 듣기
  - (Other로 받을 수 있는 다른 영어 목소리: af_bella, af_nicole, af_sarah, am_fenrir, am_puck, am_adam, bf_emma, bf_isabella, bm_fable, bm_lewis. 첫 글자 a=미국, b=영국, 둘째 글자 f=여성, m=남성)
- OpenAI:
  - `ash (Recommended)` — 남성, 따뜻함. 어린 왕자 화자와 같은 목소리
  - `sage` — 여성, 차분함
  - `fable` — 남성, 영국풍 이야기꾼
  - 샘플 먼저 듣기
  - (Other: alloy, ballad, cedar, coral, echo, marin, nova, onyx, shimmer, verse)

**"샘플 먼저 듣기"를 고르면** 후보 목소리로 1장 앞부분 샘플을 만들어 들려준 뒤 같은 질문을 다시 합니다.
```sh
python3 tools/book-voices.py <id> --sample am_michael,af_heart,bm_george --lines 10 --out <scratchpad>/voices
```
(이름에 `_`가 있으면 Kokoro, 없으면 OpenAI. OpenAI 샘플은 목소리당 약 1센트이고 키가 필요합니다.)
사용자가 바로 들을 수 있게 `! ffplay -autoexit -nodisp <파일>` 명령을 알려 주거나, 2026-10-02에 만든 비교 페이지(https://claude.ai/artifact/8ZjFFqHMrJArpDAQpYvuCV)처럼 샘플을 넣은 페이지를 만들어 줍니다(브라우저 음성과도 비교 가능).

### 4. 인물별 목소리 여부 묻기 — `AskUserQuestion`

질문: "대사에 인물별 목소리를 넣을까요?" / header: `Cast`
- **낭독자 혼자 (Recommended)** — 바로 녹음 가능
- **인물별 목소리** — 따옴표마다 화자를 정하는 작업이 장마다 필요(오래 걸림). 주요 인물마다 목소리를 따로 고름

인물별 목소리를 고르면:
1. `node tools/book-quotes.js <id> 1 1`로 장마다 인용(`"…"`·`“…”`)과 화자를 보면서 `cast.js`의 `speakers: { 1: 'dorothy henry narrator …', … }`를 장마다 인용 순서대로 씁니다. 책 제목·간판·속생각처럼 소리 내지 않는 인용은 `narrator`. 초안 시험: `SPEAKERS=draft.json node tools/book-quotes.js <id> 3 3` (`{ "3": "…" }`).
2. 주요 인물 목록과 제안 목소리를 표로 보여 주고 `AskUserQuestion`으로 확인합니다(인물이 많으면 4명씩 나눠 묻기). 같은 엔진 안에서 고릅니다.
   OpenAI면 인물마다 `how`(나이·성격·말투, 영어)를 쓰고, 아이는 `shift: 3` 정도(어린 왕자 참고: `books/little-prince/film/cast.js`). Kokoro에는 아이 목소리가 없고 `how`는 쓰지 않습니다(`''`).
3. `node tools/test.js`가 장마다 인용 수와 화자 수, 모르는 화자를 검사합니다.

### 5. cast.js 쓰기

```js
/* <책 제목> audiobook — voices for tools/book-voices.py (chosen <날짜>). speakers: see tools/book-quotes.js */
window.LP_CAST = {
  characters: {
    narrator: { name: 'Narrator', ko: '낭독자', color: '#e9dcc0', voice: 'male', pitch: 1, rate: 1,
      tts: { engine: 'kokoro', voice: 'am_michael', shift: 0, how: '' } }
    // OpenAI: tts: { voice: 'ash', shift: 0, how: 'A warm storyteller reading … aloud to learners of English: …' }
  }
  // speakers: { 1: '…' }   (인물별 목소리일 때만)
};
```
`color`는 화면의 화자 이름 색, `voice`('male'|'female')·`pitch`는 녹음이 없을 때 브라우저 음성용입니다.

### 6. 녹음

```sh
python3 tools/book-voices.py <id> --dry-run                                   # 목소리·분량 다시 확인
source .envrc && OPENAI_PAT="$OPENAI_PAT" python3 -u tools/book-voices.py <id> [--chapter N]   # OpenAI
python3 -u tools/book-voices.py <id> [--chapter N]                            # Kokoro만이면 키 불필요
```
- 오래 걸리면 Bash `run_in_background`로 돌립니다. 끊겨도 빠진 줄만 다시 녹음하므로 그냥 다시 돌리면 됩니다.
- OpenAI 키는 저장소 루트 `.envrc`(`OPENAI_PAT`)에 있고 git에서 빠져 있습니다. 출력하거나 커밋하지 마세요. 한도가 찼으면 `LP_TTS_RPM=6.5`로 천천히, 또는 다음 날 이어서.
- 어린 왕자는 `little-prince`로 같은 도구를 쓰고, 녹음 뒤 `tools/film-timing.py`로 영화의 입 모양·단어 시각을 만듭니다.

### 7. 확인

- `node tools/test.js` — 마지막에 `audiobook voices recorded: <id> N/N`처럼 녹음 비율이 나옵니다.
- 앞부분 몇 개를 Whisper로 받아 적어 원문과 비교하면 빠뜨리거나 틀린 단어를 찾을 수 있습니다(`uv run --with faster-whisper …`).
- 쓰지 않게 된 녹음(본문·목소리를 바꾼 뒤 남은 옛 파일)은 `--prune`으로 지웁니다.

### 8. 커밋

`audio/`·`audio.js`·`cast.js`를 커밋합니다(MP3는 48kbps 모노, 1시간에 약 20MB). push는 사용자가 원할 때만.
앱 껍데기 파일은 바뀌지 않으므로 `sw.js`의 `VERSION`은 올리지 않아도 됩니다(녹음 파일은 해시 이름이라 캐시 문제 없음).

## 주의

- 녹음은 책 본문을 그대로 읽은 것입니다. 저작권 규칙(CLAUDE.md)상 저장소에 있는 책만 녹음합니다.
- 장면 데이터(`scenes.js`)의 장 제목을 바꾸면 그 장의 카드 녹음 이름이 바뀝니다(어린 왕자는 카드에 제목을 읽지 않음).
- 본문의 줄 나누기(`chunks`)나 읽는 문장(`spoken`) 규칙을 바꾸면 **모든 책의 녹음 키가 바뀔 수 있습니다.** 바꾸기 전후로 `python3 tools/book-voices.py little-prince --dry-run`이 `0 to record`인지 확인하세요.
- 엔진을 바꾸면(OpenAI ↔ Kokoro) 목소리 이름이 달라 모든 줄을 다시 녹음합니다. 옛 파일은 `--prune`으로 지웁니다.

# 책 추가하기

책 한 권은 `books/<id>/` 폴더 하나입니다. 게임은 첫 화면(서재)에서 `js/library.js`에 등록된 책을 보여 주고,
책을 고르면 `/books/<id>` 경로에서 그 폴더의 파일만 읽어 들입니다.

```
books/<id>/
  scenes.js          필수. 장별 게임 데이터 (window.LP_SCENES = [...])
  art.js             선택. 대체 삽화 (window.LP_ART = { chapter(n), cover() } → SVG 문자열)
  text/<book>.txt    선택. 영어 원문. ./start.sh 또는 python3 tools/embed-text.py 가 text/book.js 로 변환
  images/chapter-NN.jpg  선택. 장별 삽화 (4:3 권장). 없으면 art.js, 그것도 없으면 제목만 있는 기본 그림
```

## 1. 등록

`js/library.js` 배열에 항목을 추가합니다.

```js
{ id: 'wizard-of-oz', title: 'The Wonderful Wizard of Oz', author: 'L. Frank Baum', year: 1900,
  chapters: 24, ko: '오즈의 마법사', level: 'Beginner',
  blurb: 'A Kansas girl and her dog are carried by a cyclone to the land of Oz.',
  textNote: 'Text and W. W. Denslow illustrations are public domain (Project Gutenberg #43936).' }
```

`readOnly: true`를 붙이면 게임(Play) 없이 읽기 화면만 제공합니다. 번역본처럼 수정이 금지된 텍스트(CC BY-NC-ND 등)에 쓰세요. 이때도 `scenes.js`는 장 제목(`title`, `ko`) 때문에 필요하고, 장면은 표시되지 않습니다.

## 2. 장면 데이터 (`scenes.js`)

`books/_template/scenes.js` 를 복사해서 시작하세요. 장(chapter) 하나의 형태:

```js
{
  num: 1, title: 'The Cyclone', ko: '회오리바람',
  summary: 'One-line English summary shown when the chapter is completed.', summaryKo: '완료 화면의 한국어 요약',
  scenes: [
    {
      roleText: 'You are Dorothy. ', roleKo: '당신은 도로시입니다. ',   // 생략 가능
      situation: 'What is happening, in English.', situationKo: '한국어 도움말 (선택)',
      speaker: 'Aunt Em', line: 'Quick, Dorothy! Run for the cellar!',  // 상대의 대사 (짧게)
      prompt: 'What the player should say.', promptKo: '한국어 도움말 (선택)',
      answers: [{ all: ['toto'] }, { all: ['dog'], any: ['where', 'get'] }],  // 주관식 판정: 키워드 그룹
      model: 'I must get Toto first!',                                   // 모범 답안 (객관식의 정답)
      distractors: ['Wrong line one.', 'Wrong line two.', 'Wrong line three.'],  // 객관식 오답 3개 (선택)
      hints: ['English hint', 'Key word: Toto'], hintsKo: ['한국어 힌트', '핵심 단어: Toto'],  // 선택
      reply: { speaker: 'Narrator', line: 'What happens after a good answer.' },
      echo: false   // true 면 입력한 말이 메아리로 표시됨
    }
  ]
}
```

`role`은 파일 맨 위의 `window.LP_ROLES = { dorothy: { en: 'You are Dorothy. ', ko: '당신은 도로시입니다. ' } }` 표에서 찾아 상황 문장 앞에 붙입니다.
장면마다 `roleText`/`roleKo`를 직접 써도 됩니다.

판정 규칙: `answers`의 그룹 중 하나라도 만족하면 정답입니다. `all`의 단어는 모두 있어야 하고, `any`는 하나만 있으면 됩니다.
대소문자·문장 부호·축약형(won't → will not)은 무시하고, 5글자 이상 단어는 오타 한 글자를 허용합니다.
`node tools/test.js`가 모든 책의 모범 답안이 자기 판정을 통과하는지 확인합니다.

## 3. 원문 텍스트

`text/` 에 .txt 하나를 넣습니다. 장 제목이 `Chapter 1`, `CHAPTER I`, `I`, `1`, `Chapter One` 중 어느 형식이어도 되고,
자동 분할이 어긋나면 장 사이에 `===` 줄을 넣습니다. 파일 이름에 `gutenberg`가 있으면 출처 표기가 자동으로 붙습니다.
Project Gutenberg 텍스트라면 앞뒤의 라이선스 머리말·꼬리말을 지우고 본문만 남겨 두는 편이 좋습니다.

동화 모음처럼 이야기마다 파일이 따로 있으면 `text/01-first-tale.txt`, `text/02-second-tale.txt` … 처럼 번호를 붙여 넣으세요.
`tools/embed-text.py`가 이름순으로 이어 붙여 파일 하나를 한 장으로 만듭니다. 파일마다 있는 Gutenberg 머리말·꼬리말은 자동으로 걸러 냅니다.

## 4. 삽화

`images/chapter-01.jpg` … 형식으로 넣으면 자동 표시됩니다 (jpg, jpeg, png, webp, gif, svg 순으로 찾음).
`art.js`가 있으면 `tools/gallery.html?book=<id>` 에서 대체 삽화를 미리 볼 수 있습니다.

## 저작권

퍼블릭 도메인이 확실한 책(원작자와 삽화가가 모두 사망 후 70년이 지났고, 미국 출판 후 95년이 지난 것. 2026년 기준 1956년 이전 사망·1931년 이전 출판)만 원문과 삽화를 함께 커밋하세요.
번역본은 역자의 저작권이 별도로 있으므로 번역서라면 역자의 사망 연도도 확인해야 합니다. 그렇지 않은 책은 `.gitignore`에 `books/<id>/text/*.txt`와 `images/*`를 추가해 로컬에만 두세요.

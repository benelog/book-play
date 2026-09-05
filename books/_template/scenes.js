/* Copy this file to books/<id>/scenes.js and fill in one entry per chapter.
   Field reference: books/README.md */
window.LP_SCENES = [
  {
    num: 1, title: 'Chapter title', ko: '한국어 제목',
    summary: 'One-line summary shown when the chapter is completed.', summaryKo: '완료 화면 요약',
    scenes: [
      {
        roleText: 'You are the hero. ', roleKo: '당신은 주인공입니다. ',
        situation: 'Describe the moment in English.', situationKo: '상황 설명 (한국어, 선택)',
        speaker: 'Someone', line: 'A short line spoken to the player.',
        prompt: 'Tell the player what to say.', promptKo: '무엇을 말할지 (한국어, 선택)',
        answers: [{ all: ['keyword'] }, { all: ['other'], any: ['this', 'that'] }],
        model: 'The model answer with the keyword.',
        distractors: ['A wrong line.', 'Another wrong line.', 'A third wrong line.'],
        hints: ['A hint in English.', 'Key word: keyword'], hintsKo: ['힌트', '핵심 단어: keyword'],
        reply: { speaker: 'Someone', line: 'What they say after a good answer.' }
      }
    ]
  }
];

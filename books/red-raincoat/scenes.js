/* The Red Raincoat (Kiran Kasturia, illustrated by Zainab Tambawalla; © Pratham Books 2015, CC BY 4.0, from StoryWeaver).
   Game data: one scene per page. Level 1 English — very short lines. Situations and distractors are original;
   the model answers quote or lightly adapt the book, which the CC BY licence allows. Field reference: books/README.md. */
window.LP_ROLES = {
  manu: { en: 'You are Manu. ', ko: '당신은 마누입니다. ' },
  ma: { en: 'You are Ma, Manu\'s mother. ', ko: '당신은 마누의 어머니입니다. ' }
};
window.LP_SCENES = [
  {
    num: 1, title: 'Sunday: A Red Raincoat', ko: '일요일: 빨간 비옷',
    summary: 'Manu gets a red raincoat, but the sky is clear.',
    summaryKo: '마누는 빨간 비옷을 받지만 하늘은 맑습니다.',
    scenes: [
      {
        role: 'manu',
        situation: 'It is Sunday. Your parents have given you a brand-new red raincoat. You are holding it up, and you love it.',
        situationKo: '일요일입니다. 부모님이 새 빨간 비옷을 사 주셨습니다. 비옷을 들어 보니 너무 마음에 듭니다.',
        speaker: 'Ma', line: 'Do you like it, Manu?',
        prompt: 'Ask Ma if you may wear it now.',
        promptKo: '지금 입어도 되는지 어머니에게 물으세요.',
        answers: [{ any: ['wear', 'put it on', 'put on'] }],
        model: 'Ma, may I wear it now?',
        distractors: ['Ma, may I eat it now?', 'Ma, is it Monday now?', 'Ma, where is my school bag?'],
        hints: ['You want to put the raincoat on.', 'Key word: wear'],
        hintsKo: ['비옷을 입고 싶습니다.', '핵심 단어: wear'],
        reply: { speaker: 'Ma', line: 'No, my dear, the rains are near, but just now the sky is clear.' }
      }
    ]
  },
  {
    num: 2, title: 'Monday: Bright and Sunny', ko: '월요일: 맑고 화창한 날',
    summary: 'Monday is sunny. A raincoat would look funny.',
    summaryKo: '월요일은 화창합니다. 비옷을 입으면 우스워 보일 거예요.',
    scenes: [
      {
        role: 'manu',
        situation: 'It is Monday morning. The sun is shining and the sky is bright. You have your raincoat ready by the door.',
        situationKo: '월요일 아침입니다. 해가 빛나고 하늘이 밝습니다. 비옷을 문 옆에 준비해 두었습니다.',
        speaker: 'Ma', line: 'Good morning, Manu! What a bright day.',
        prompt: 'Ask Ma if it will rain today.',
        promptKo: '오늘 비가 올지 어머니에게 물으세요.',
        answers: [{ all: ['rain'], any: ['will', 'today', 'going'] }],
        model: 'Will it rain today, Mummy?',
        distractors: ['Will it snow today, Mummy?', 'Can I stay home today, Mummy?', 'Is my raincoat red, Mummy?'],
        hints: ['Ask about the weather.', 'Key words: will it rain'],
        hintsKo: ['날씨를 물으세요.', '핵심 단어: will it rain'],
        reply: { speaker: 'Ma', line: 'No, Manu, not today. If you wear your raincoat, you will look quite funny!' }
      }
    ]
  },
  {
    num: 3, title: 'Tuesday: One White Cloud', ko: '화요일: 하얀 구름 하나',
    summary: 'On Tuesday the sky is blue, with just one white cloud.',
    summaryKo: '화요일 하늘은 파랗고 하얀 구름 하나만 떠 있습니다.',
    scenes: [
      {
        role: 'ma',
        situation: 'It is Tuesday. Manu is looking out of the window at a blue sky with one small white cloud. He asks when his wish will come true.',
        situationKo: '화요일입니다. 마누가 창밖으로 작은 하얀 구름 하나 뜬 파란 하늘을 바라봅니다. 소원이 언제 이루어지느냐고 묻습니다.',
        speaker: 'Manu', line: 'Ma, WHEN will my wish come true?',
        prompt: 'Tell him not today. There is just one white cloud in the sky.',
        promptKo: '오늘은 아니라고 말하세요. 하늘에 하얀 구름 하나만 있다고요.',
        answers: [{ any: ['not today', 'one cloud', 'one white cloud', 'only one', 'just one'] }],
        model: 'Not today, my dear. There is just one white cloud in the sky!',
        distractors: ['Yes, my dear, go and get your raincoat!', 'My dear, the sky is full of dark clouds.', 'My dear, your wish came true yesterday.'],
        hints: ['Look at the sky. How many clouds?', 'Key words: not today, one cloud'],
        hintsKo: ['하늘을 보세요. 구름이 몇 개인가요?', '핵심 단어: not today, one cloud'],
        reply: { speaker: 'Narrator', line: 'Manu sighed and hung the raincoat back on its hook.' }
      }
    ]
  },
  {
    num: 4, title: 'Wednesday: Hot', ko: '수요일: 더운 날',
    summary: 'Wednesday is hot. Ma thinks it may rain before noon.',
    summaryKo: '수요일은 덥습니다. 어머니는 정오 전에 비가 올지도 모른다고 생각합니다.',
    scenes: [
      {
        role: 'manu',
        situation: 'It is Wednesday and it is very hot. You are fanning yourself and looking at the sky, which has no rain in it at all.',
        situationKo: '수요일이고 아주 덥습니다. 부채질을 하며 하늘을 보지만 비가 올 기미가 전혀 없습니다.',
        speaker: 'Ma', line: 'Come inside, Manu, it is too hot out there.',
        prompt: 'Ask Ma why it does not rain.',
        promptKo: '왜 비가 안 오는지 어머니에게 물으세요.',
        answers: [{ all: ['why'], any: ['rain'] }],
        model: 'Ma, WHY doesn\'t it rain?',
        distractors: ['Ma, where is the sun?', 'Ma, can I have some water?', 'Ma, is it Thursday yet?'],
        hints: ['You want a reason.', 'Key words: why, rain'],
        hintsKo: ['이유를 알고 싶습니다.', '핵심 단어: why, rain'],
        reply: { speaker: 'Ma', line: 'Son, I think it will rain very soon. Maybe even before it is noon.' }
      }
    ]
  },
  {
    num: 5, title: 'Thursday: The Picnic', ko: '목요일: 소풍',
    summary: 'Manu goes on a picnic. The little clouds are too high for rain.',
    summaryKo: '마누는 소풍을 갑니다. 작은 구름들은 너무 높아서 비가 오지 않습니다.',
    scenes: [
      {
        role: 'manu',
        situation: 'It is Thursday. You are going on a picnic with your basket. There are little white clouds high up in the sky.',
        situationKo: '목요일입니다. 바구니를 들고 소풍을 갑니다. 하늘 높이 작은 하얀 구름들이 떠 있습니다.',
        speaker: 'Ma', line: 'Have a lovely picnic, Manu! Have you got everything?',
        prompt: 'Ask what if it rains, and whether you should take the raincoat with you.',
        promptKo: '비가 오면 어떡하느냐고, 비옷을 가져가야 하는지 물으세요.',
        answers: [{ any: ['what if', 'take the raincoat', 'take my raincoat', 'bring the raincoat', 'bring my raincoat'] }, { all: ['raincoat'], any: ['take', 'bring', 'with me'] }],
        model: 'Ma, what if it rains? Shall I take the raincoat with me?',
        distractors: ['Ma, what is in the basket?', 'Ma, can my friends come too?', 'Ma, may I stay at home instead?'],
        hints: ['Maybe it will rain at the picnic.', 'Key words: what if, take the raincoat'],
        hintsKo: ['소풍 중에 비가 올지도 모릅니다.', '핵심 단어: what if, take the raincoat'],
        reply: { speaker: 'Ma', line: 'No, my dear, it will not rain today. The little white clouds are too high in the sky.' }
      }
    ]
  },
  {
    num: 6, title: 'Friday: Dark Clouds', ko: '금요일: 검은 구름',
    summary: 'Friday is cloudy. It might rain.',
    summaryKo: '금요일은 흐립니다. 비가 올지도 모릅니다.',
    scenes: [
      {
        role: 'ma',
        situation: 'It is Friday. Dark clouds hang low in the sky. Manu runs to you, shouting his question.',
        situationKo: '금요일입니다. 검은 구름이 하늘 낮게 깔려 있습니다. 마누가 큰 소리로 물으며 달려옵니다.',
        speaker: 'Manu', line: 'Ma, will it rain today?',
        prompt: 'Say it might. There are some dark clouds low down in the sky.',
        promptKo: '그럴지도 모른다고 하세요. 하늘 낮은 곳에 검은 구름이 있다고요.',
        answers: [{ any: ['might', 'maybe', 'perhaps', 'dark clouds'] }],
        model: 'It might, my dear. There are some dark clouds low down in the sky.',
        distractors: ['No, my dear, the sky is bright and clear.', 'Yes, my dear, it is raining already.', 'My dear, please stop asking me.'],
        hints: ['Not yes, not no.', 'Key words: it might, dark clouds'],
        hintsKo: ['네도 아니고 아니오도 아닙니다.', '핵심 단어: it might, dark clouds'],
        reply: { speaker: 'Narrator', line: 'Manu kept his raincoat by the door all day, but the rain did not come.' }
      }
    ]
  },
  {
    num: 7, title: 'Saturday: Badaboom!', ko: '토요일: 우르릉 쾅!',
    summary: 'Saturday begins with thunder.',
    summaryKo: '토요일은 천둥소리로 시작합니다.',
    scenes: [
      {
        role: 'manu',
        situation: 'It is Saturday morning. A huge bang wakes you up. Badaboom! The sky is dark and the windows shake.',
        situationKo: '토요일 아침입니다. 엄청난 소리에 잠이 깹니다. 우르릉 쾅! 하늘은 어둡고 창문이 흔들립니다.',
        speaker: 'Narrator', line: 'Badaboom!',
        prompt: 'Ask Ma if that is thunder, and if it will rain very soon.',
        promptKo: '저게 천둥이냐고, 비가 곧 오느냐고 어머니에게 물으세요.',
        answers: [{ any: ['thunder'] }, { all: ['rain'], any: ['soon', 'now'] }],
        model: 'Ma, is that thunder I hear? Will it rain very soon?',
        distractors: ['Ma, is that the school bell?', 'Ma, did you drop a plate?', 'Ma, may I sleep a little more?'],
        hints: ['What makes a bang before the rain?', 'Key word: thunder'],
        hintsKo: ['비가 오기 전에 쾅 소리를 내는 것은?', '핵심 단어: thunder'],
        reply: { speaker: 'Ma', line: 'Yes, Manu, that is thunder! Look at the sky!' }
      }
    ]
  },
  {
    num: 8, title: 'Rain at Last!', ko: '드디어 비!',
    summary: 'At last it starts raining, and Manu runs out singing.',
    summaryKo: '드디어 비가 내리고, 마누는 노래하며 뛰어나갑니다.',
    scenes: [
      {
        role: 'manu',
        situation: 'Big drops are falling. The rain has come at last! You are so happy that you run straight for the door.',
        situationKo: '굵은 빗방울이 떨어집니다. 드디어 비가 왔습니다! 너무 기뻐서 문으로 곧장 달려갑니다.',
        speaker: 'Narrator', line: 'Pitter, patter, pitter, patter.',
        prompt: 'Sing out that it is raining!',
        promptKo: '비가 온다고 신나게 외치세요!',
        answers: [{ any: ['raining', 'rain'] }],
        model: 'Oh, it\'s raining, it\'s raining!',
        distractors: ['Oh, it\'s snowing, it\'s snowing!', 'Oh no, the sun is out again!', 'Oh, where are my shoes?'],
        hints: ['Say what the sky is doing.', 'Key word: raining'],
        hintsKo: ['하늘이 무엇을 하고 있는지 말하세요.', '핵심 단어: raining'],
        reply: { speaker: 'Narrator', line: 'Manu ran out into the rain, singing and splashing.' }
      }
    ]
  },
  {
    num: 9, title: 'You Forgot Your Raincoat!', ko: '비옷을 두고 갔잖니!',
    summary: 'Ma runs after Manu — he has forgotten his raincoat.',
    summaryKo: '어머니가 마누를 쫓아 달려갑니다. 마누가 비옷을 두고 간 것입니다.',
    scenes: [
      {
        role: 'ma',
        situation: 'Manu has run out into the rain, singing. Something red is still hanging by the door. You grab it and run after him.',
        situationKo: '마누가 노래하며 빗속으로 뛰어나갔습니다. 빨간 무언가가 아직 문 옆에 걸려 있습니다. 그것을 집어 들고 마누를 쫓아갑니다.',
        speaker: 'Manu', line: 'It\'s raining, it\'s raining!',
        prompt: 'Call after Manu: he forgot his raincoat!',
        promptKo: '마누를 부르세요. 비옷을 두고 갔다고!',
        answers: [{ any: ['forgot', 'forgotten', 'left'] }, { all: ['raincoat'], any: ['your', 'the'] }],
        model: 'But Manu, you forgot your raincoat!',
        distractors: ['But Manu, dinner is ready!', 'But Manu, it is only a little rain!', 'But Manu, come and do your homework!'],
        hints: ['What is still hanging by the door?', 'Key words: forgot, raincoat'],
        hintsKo: ['문 옆에 아직 무엇이 걸려 있나요?', '핵심 단어: forgot, raincoat'],
        reply: { speaker: 'Narrator', line: 'And that is the end of the story of the red raincoat.' }
      }
    ]
  }
];

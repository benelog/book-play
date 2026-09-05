/* Game data for all 27 chapters. Written independently of the book text, so the game runs with
   whichever English edition the player imports. Quoted lines are kept to a few words.
   Fields: situation/prompt/hints (English) with *Ko Korean help; answers = keyword groups for free typing
   ({ all: [...] } every keyword required, { any: [...] } at least one); model = example answer;
   distractors = three wrong options for multiple-choice mode; reply = what happens after a good answer. */
window.LP_ROLES = {
  pilot: { en: 'You are the pilot. ', ko: '당신은 조종사입니다. ' },
  prince: { en: 'You are the little prince. ', ko: '당신은 어린 왕자입니다. ' }
};
window.LP_SCENES = [
  {
    num: 1, title: 'The Hat That Was Not a Hat', ko: '모자가 아니었던 그림',
    summary: 'A six-year-old artist gives up drawing because of the grown-ups, and becomes a pilot instead.',
    summaryKo: '여섯 살의 화가 지망생이 어른들 때문에 붓을 놓고 조종사가 됩니다.',
    scenes: [
      {
        role: 'pilot',
        situation: 'You are six years old. You show the grown-ups your brand-new Drawing Number One. They say it is only a hat.',
        situationKo: '당신은 여섯 살입니다. 방금 완성한 "그림 1호"를 어른들에게 보여줍니다. 어른들은 그저 모자라고 말합니다.',
        speaker: 'A grown-up', line: 'Why should anyone be frightened by a hat?',
        prompt: 'Explain what the drawing really shows. (Which animal swallowed what?)',
        promptKo: '그림이 진짜 무엇인지 설명해 보세요. (어떤 동물이 무엇을 삼켰나요?)',
        answers: [{ all: ['boa', 'elephant'] }, { all: ['snake', 'elephant'] }],
        model: 'It is a boa constrictor digesting an elephant.',
        distractors: ['It is a hat for a very large head.', 'It is a mountain with a cave inside.', 'It is a sheep sleeping in a box.'],
        hints: ['A boa constrictor is digesting an elephant.', 'Key words: boa, elephant'],
        hintsKo: ['보아뱀(boa constrictor)이 코끼리(elephant)를 소화시키는 중입니다.', '핵심 단어: boa, elephant'],
        reply: { speaker: 'A grown-up', line: 'Hmm. Put your drawings away and study geography instead.' }
      },
      {
        role: 'pilot',
        situation: 'Taking the grown-ups\' advice, you gave up a painter\'s career. Years later, a stranger asks about your job.',
        situationKo: '어른들의 충고에 화가의 꿈을 접었습니다. 세월이 흘러 누군가 당신의 직업을 묻습니다.',
        speaker: 'A stranger', line: 'So, what did you become instead of a painter?',
        prompt: 'Say what you learned to do and what you became.',
        promptKo: '당신이 무엇을 배웠고, 어떤 직업을 갖게 되었는지 말해 보세요.',
        answers: [{ any: ['pilot', 'fly', 'flying', 'airplane', 'airplanes', 'plane', 'planes', 'aviator'] }],
        model: 'I learned to fly airplanes. I became a pilot.',
        distractors: ['I became a geographer and never left my desk.', 'I learned to count stars and became a businessman.', 'I became a teacher of grammar and arithmetic.'],
        hints: ['A job in the sky.', 'Key words: pilot or fly'],
        hintsKo: ['하늘을 나는 직업입니다.', '핵심 단어: pilot 또는 fly'],
        reply: { speaker: 'Narrator', line: 'And so I flew a little over all parts of the world.' }
      }
    ]
  },
  {
    num: 2, title: 'Draw Me a Sheep', ko: '양 한 마리만 그려 줘',
    summary: 'A pilot crash-lands in the Sahara, and a small voice appears beside him.',
    summaryKo: '사하라 사막에 불시착한 조종사 앞에 작은 목소리가 나타납니다.',
    scenes: [
      {
        role: 'pilot',
        situation: 'Your plane has broken down in the Sahara. On the first night, at sunrise, an odd little voice wakes you up.',
        situationKo: '비행기가 사하라 사막에 불시착했습니다. 첫날 밤, 해가 뜰 무렵 이상한 작은 목소리에 잠이 깹니다.',
        speaker: 'A small voice', line: 'If you please… draw me a sheep!',
        prompt: 'You jump up and rub your eyes. What do you ask the child?',
        promptKo: '깜짝 놀라 눈을 비비며 아이에게 무엇이라고 묻겠습니까?',
        answers: [{ all: ['what', 'doing'] }, { all: ['who', 'are', 'you'] }, { all: ['where', 'come', 'from'] }, { all: ['what', 'are', 'you'] }, { all: ['where', 'are', 'you', 'from'] }],
        model: 'But… what are you doing here?',
        distractors: ['Would you like to buy an airplane?', 'Please be quiet, I am trying to sleep.', 'Have you seen my sheep anywhere?'],
        hints: ['Ask what a child is doing in the middle of the desert.', 'Example: "What are you doing here?" or "Who are you?"'],
        hintsKo: ['사람 하나 없는 사막 한가운데서 아이가 무엇을 하고 있는지 물어보세요.', '예: "What are you doing here?" 또는 "Who are you?"'],
        reply: { speaker: 'The little prince', line: 'If you please… draw me a sheep.' }
      },
      {
        role: 'pilot',
        situation: 'You have drawn three sheep and all were refused: the first looked sick, the second was a ram with horns, the third was too old. Out of patience, you draw a box.',
        situationKo: '양을 세 번 그렸지만 모두 퇴짜를 맞았습니다. 첫 양은 병들었고, 둘째는 뿔이 있는 숫양, 셋째는 너무 늙었다고 합니다. 참다못한 당신은 상자 하나를 그립니다.',
        speaker: 'The little prince', line: '(looks at the box, puzzled)',
        prompt: 'Explain what this drawing is, and where the sheep is.',
        promptKo: '이 그림이 무엇인지, 양이 어디에 있는지 설명해 보세요.',
        answers: [{ all: ['box'], any: ['inside', 'in', 'sheep'] }, { all: ['inside'] }],
        model: 'This is only his box. The sheep you asked for is inside.',
        distractors: ['This is a hat. Grown-ups like hats.', 'The sheep ran away, so I drew the desert.', 'This is an elephant that swallowed a boa constrictor.'],
        hints: ['The sheep is inside the box.', 'Key words: box, inside'],
        hintsKo: ['양은 상자(box) 안(inside)에 있습니다.', '핵심 단어: box, inside'],
        reply: { speaker: 'The little prince', line: 'That is exactly the way I wanted it! Look, he has gone to sleep.' }
      }
    ]
  },
  {
    num: 3, title: 'From Another Planet', ko: '다른 별에서 온 아이',
    summary: 'Little by little, it becomes clear where the little prince came from.',
    summaryKo: '어린 왕자가 어디에서 왔는지 조금씩 드러납니다.',
    scenes: [
      {
        role: 'pilot',
        situation: 'The little prince never answers your questions, but he points at your machine.',
        situationKo: '어린 왕자는 당신의 질문에는 대답하지 않고 비행기를 가리킵니다.',
        speaker: 'The little prince', line: 'What is that object?',
        prompt: 'Tell him what it is and what it does.',
        promptKo: '저 물건이 무엇인지, 무엇을 하는 물건인지 답해 보세요.',
        answers: [{ any: ['airplane', 'plane', 'aeroplane'] }, { all: ['it', 'flies'] }, { all: ['fly'] }],
        model: 'That is not an object. It flies. It is an airplane. It is my airplane.',
        distractors: ['That is a box. A sheep lives inside it.', 'That is a well. It gives water.', 'That is a volcano. I clean it every week.'],
        hints: ['A machine that flies.', 'Key words: airplane or fly'],
        hintsKo: ['하늘을 나는(fly) 기계입니다.', '핵심 단어: airplane 또는 fly'],
        reply: { speaker: 'The little prince', line: 'What! You dropped down from the sky?' }
      },
      {
        role: 'pilot',
        situation: 'He bursts out laughing when you say you fell from the sky, as if he came from there too. You ask him carefully.',
        situationKo: '어린 왕자는 당신이 하늘에서 왔다는 말에 웃음을 터뜨리더니, 자기도 하늘에서 왔다는 듯 말합니다. 당신은 조심스럽게 묻습니다.',
        speaker: 'The little prince', line: 'So you came from the sky, too! Which planet are you from?',
        prompt: 'Now it is your turn to ask. Ask whether he comes from another planet.',
        promptKo: '이번에는 당신이 물어볼 차례입니다. 어린 왕자가 다른 별에서 왔는지 물어보세요.',
        answers: [{ all: ['planet'], any: ['another', 'other', 'come', 'from', 'which', 'what'] }, { all: ['where', 'from'] }],
        model: 'Do you come from another planet?',
        distractors: ['Do you want to see my airplane?', 'Is your sheep hungry?', 'How old are you, and how much does your father earn?'],
        hints: ['Ask: "Do you come from another planet?"', 'Key word: planet'],
        hintsKo: ['"다른 행성(another planet)에서 왔니?"라고 물어보세요.', '핵심 단어: planet'],
        reply: { speaker: 'The little prince', line: '(does not answer, and looks at the airplane) You could not have come from very far away…' }
      }
    ]
  },
  {
    num: 4, title: 'Asteroid B-612', ko: '소행성 B-612',
    summary: 'The little prince\'s planet is scarcely bigger than a house. Grown-ups only love figures.',
    summaryKo: '어린 왕자의 별은 집 한 채만 한 크기입니다. 어른들은 숫자만 좋아합니다.',
    scenes: [
      {
        role: 'pilot',
        situation: 'The little prince\'s home is an asteroid scarcely bigger than a house. Grown-ups only believe you when you give them figures, so you decide to give the number.',
        situationKo: '어린 왕자의 별은 집 한 채보다 조금 큰 소행성입니다. 어른들은 숫자를 대야만 믿어 주기에, 당신은 그 별의 번호를 밝히기로 합니다.',
        speaker: 'A grown-up', line: 'A planet? What is its number?',
        prompt: 'Give the name (number) of the asteroid the little prince came from.',
        promptKo: '어린 왕자가 온 소행성의 이름(번호)을 말해 보세요.',
        answers: [{ any: ['b 612', 'b612', '612'] }],
        model: 'His planet is the asteroid known as B-612.',
        distractors: ['His planet is the asteroid known as A-325.', 'His planet is called the Earth.', 'His planet has no number, only a flower.'],
        hints: ['A letter B and a three-digit number.', 'Key word: B-612'],
        hintsKo: ['알파벳 B와 세 자리 숫자로 된 이름입니다.', '핵심 단어: B-612'],
        reply: { speaker: 'A grown-up', line: 'Ah, B-612! Then it must be a real planet.' }
      },
      {
        role: 'pilot',
        situation: 'When you tell grown-ups about a new friend, they never ask what his voice sounds like or what games he loves. They ask only this.',
        situationKo: '어른들은 새 친구가 생겼다고 하면 목소리가 어떤지, 무슨 놀이를 좋아하는지는 묻지 않습니다. 대신 이런 것만 묻습니다.',
        speaker: 'A grown-up', line: 'How old is he? How many brothers? How much does his father earn?',
        prompt: 'What one word covers all the things grown-ups love? "Grown-ups love ______."',
        promptKo: '어른들이 좋아하는 이런 것들을 한 단어로 부르면? "Grown-ups love ______."',
        answers: [{ any: ['figures', 'numbers', 'number', 'figure'] }],
        model: 'Grown-ups love figures.',
        distractors: ['Grown-ups love sunsets.', 'Grown-ups love drawings of boa constrictors.', 'Grown-ups love butterflies.'],
        hints: ['Age, brothers, income… they are all numbers.', 'Key words: figures or numbers'],
        hintsKo: ['나이, 형제 수, 수입… 모두 숫자입니다.', '핵심 단어: figures 또는 numbers'],
        reply: { speaker: 'Narrator', line: 'That is the way they are. One must not hold it against them.' }
      }
    ]
  },
  {
    num: 5, title: 'The Baobabs', ko: '바오밥나무',
    summary: 'Do sheep eat baobabs? On a tiny planet, baobabs are a catastrophe.',
    summaryKo: '양이 바오밥나무를 먹을까요? 작은 별에서 바오밥은 재앙입니다.',
    scenes: [
      {
        role: 'pilot',
        situation: 'On the third day, the little prince suddenly asks with a grave face.',
        situationKo: '셋째 날, 어린 왕자가 갑자기 심각한 얼굴로 묻습니다.',
        speaker: 'The little prince', line: 'Is it true that sheep eat little bushes? Then they eat baobabs too?',
        prompt: 'Explain that baobabs are not little bushes but enormous trees.',
        promptKo: '바오밥나무가 작은 덤불이 아니라 얼마나 큰 나무인지 설명해 보세요.',
        answers: [{ all: ['baobab'], any: ['big', 'huge', 'large', 'tall', 'giant', 'enormous', 'tree', 'trees', 'castle', 'castles', 'church', 'churches'] }, { all: ['not', 'bushes'] }, { all: ['not', 'little'] }],
        model: 'But baobabs are not little bushes. They are trees as big as castles.',
        distractors: ['Yes, baobabs are tiny bushes, so sheep love them.', 'Baobabs are flowers that live only one morning.', 'Sheep do not eat anything at all.'],
        hints: ['A baobab is a tree as big as a castle.', 'Key words: baobab + big/tree/castle'],
        hintsKo: ['바오밥(baobab)은 성(castle)만큼 큰(big) 나무(tree)입니다.', '핵심 단어: baobab + big/tree/castle'],
        reply: { speaker: 'The little prince', line: 'But before they grow so big, the baobabs start out by being little.' }
      },
      {
        role: 'pilot',
        situation: 'The little prince\'s planet has terrible baobab seeds. As soon as a sprout can be told apart from a rosebush, there is something one must do.',
        situationKo: '어린 왕자의 별에는 무서운 바오밥 씨앗이 있습니다. 싹이 장미인지 바오밥인지 구별되는 즉시 해야 할 일이 있다고 합니다.',
        speaker: 'The little prince', line: 'It is a question of discipline. Every morning, what must one do?',
        prompt: 'Say what must be done with the baobab sprouts every morning.',
        promptKo: '아침마다 바오밥 새싹을 어떻게 해야 하는지 말해 보세요.',
        answers: [{ any: ['pull', 'pull up', 'pull out', 'uproot', 'root out', 'remove', 'dig', 'pluck', 'tear', 'weed'] }],
        model: 'You must pull up the baobabs as soon as you can tell them from the rosebushes.',
        distractors: ['You must water the baobabs so they grow faster.', 'You must count the baobabs and write the number down.', 'You must put the baobabs under a glass globe.'],
        hints: ['Pull them up by the roots.', 'Key words: pull or uproot'],
        hintsKo: ['뿌리째 뽑아(pull up / uproot) 버려야 합니다.', '핵심 단어: pull 또는 uproot'],
        reply: { speaker: 'The little prince', line: 'Children! Watch out for the baobabs!' }
      }
    ]
  },
  {
    num: 6, title: 'Forty-Four Sunsets', ko: '마흔네 번의 해넘이',
    summary: 'The little prince\'s only pleasure is watching the sun go down.',
    summaryKo: '어린 왕자의 유일한 즐거움은 해 지는 풍경입니다.',
    scenes: [
      {
        role: 'pilot',
        situation: 'On the morning of the fourth day, the little prince says:',
        situationKo: '넷째 날 아침, 어린 왕자가 당신에게 말합니다.',
        speaker: 'The little prince', line: 'I am very fond of sunsets. Come, let us go and look at one now.',
        prompt: 'It is morning. Tell him what you have to wait for to see a sunset.',
        promptKo: '지금은 아침입니다. 해넘이를 보려면 무엇을 기다려야 하는지 말해 보세요.',
        answers: [{ all: ['wait'] }, { all: ['sun'], any: ['set', 'sets', 'goes down', 'go down', 'sunset', 'evening'] }, { any: ['evening', 'later'] }],
        model: 'But we must wait for the sun to set.',
        distractors: ['But first I must repair my airplane.', 'But I would rather stay in the shade.', 'But I do not like sunsets at all.'],
        hints: ['We have to wait until the sun goes down.', 'Key words: wait, or sun set'],
        hintsKo: ['기다려야(wait) 합니다. 해(sun)가 질(set) 때까지요.', '핵심 단어: wait 또는 sun set'],
        reply: { speaker: 'The little prince', line: 'Wait? For what? … Oh. I always think I am at home.' }
      },
      {
        role: 'pilot',
        situation: 'On his tiny planet he only has to move his chair a few steps to see the sun set again. One day he watched it forty-four times. Then he adds, quietly:',
        situationKo: '어린 왕자의 작은 별에서는 의자를 조금만 옮기면 언제든 해넘이를 볼 수 있습니다. 어느 날은 마흔네 번이나 보았다고 합니다. 그러고는 조용히 덧붙입니다.',
        speaker: 'The little prince', line: 'You know… one loves the sunset when one is very sad.',
        prompt: 'Ask whether he was so sad on the day of the forty-four sunsets.',
        promptKo: '해넘이를 마흔네 번 본 그날, 그렇게 슬펐던 것인지 물어보세요.',
        answers: [{ all: ['sad'] }, { all: ['unhappy'] }],
        model: 'Were you so sad, then, on the day of the forty-four sunsets?',
        distractors: ['Were you hungry, then, on the day of the forty-four sunsets?', 'Did you count the sunsets in a notebook?', 'Was the chair comfortable?'],
        hints: ['Ask: "Were you so sad that day?"', 'Key word: sad'],
        hintsKo: ['"그날 그렇게 슬펐니(sad)?"라고 물어보세요.', '핵심 단어: sad'],
        reply: { speaker: 'The little prince', line: '(makes no reply)' }
      }
    ]
  },
  {
    num: 7, title: 'What Are Thorns For?', ko: '가시는 무엇에 쓰나요',
    summary: 'A pilot busy with his engine and a prince worried about his flower have their first quarrel.',
    summaryKo: '엔진 수리에 바쁜 조종사와 꽃을 걱정하는 어린 왕자가 처음으로 다툽니다.',
    scenes: [
      {
        role: 'pilot',
        situation: 'The fifth day. You are wrestling with a bolt in the engine. The little prince asks again.',
        situationKo: '다섯째 날. 당신은 엔진의 볼트와 씨름 중입니다. 어린 왕자가 또 묻습니다.',
        speaker: 'The little prince', line: 'If a sheep eats little bushes, does it eat flowers, too?',
        prompt: 'Answer without thinking: a sheep eats anything it finds.',
        promptKo: '건성으로 대답해 보세요. 양은 손에 닿는 것은 무엇이든 먹는다고요.',
        answers: [{ all: ['anything'] }, { all: ['everything'] }, { all: ['yes'], any: ['flower', 'flowers', 'eat', 'eats'] }, { all: ['whatever'] }],
        model: 'A sheep eats anything it finds in its reach.',
        distractors: ['A sheep only eats baobabs.', 'A sheep never eats. It only sleeps in its box.', 'A sheep eats bolts and engines.'],
        hints: ['"A sheep eats anything."', 'Key words: anything or everything'],
        hintsKo: ['"양은 무엇이든(anything) 먹어."', '핵심 단어: anything 또는 everything'],
        reply: { speaker: 'The little prince', line: 'Even flowers that have thorns? Then the thorns… what use are they?' }
      },
      {
        role: 'pilot',
        situation: 'When you say thorns are of no use at all, the little prince gets very angry. There is one flower in the world, on his planet, and a sheep could eat her. You put down your tools.',
        situationKo: '가시는 아무 쓸모도 없다는 당신의 말에 어린 왕자는 크게 화를 냅니다. 자기 별에 세상에 하나뿐인 꽃이 있는데, 양이 먹어 버릴 수도 있다고 울먹입니다. 당신은 연장을 내려놓습니다.',
        speaker: 'The little prince', line: '(sobbing) And you think that is not important!',
        prompt: 'Comfort him: the flower is not in danger, and you will draw something for the sheep.',
        promptKo: '꽃은 위험하지 않다고, 양에게 무엇을 그려 주겠다고 달래 보세요.',
        answers: [{ any: ['muzzle', 'fence', 'railing', 'protect', 'protection', 'safe', 'not in danger', 'no danger', 'armor', 'armour'] }],
        model: 'The flower you love is not in danger. I will draw you a muzzle for your sheep.',
        distractors: ['Stop crying. Flowers are not important.', 'I will draw you a bigger sheep with sharper teeth.', 'Let me finish the engine first, then we can talk.'],
        hints: ['Offer a muzzle for the sheep, or a railing for the flower.', 'Key words: muzzle, fence, protect, danger'],
        hintsKo: ['양에게 입마개(muzzle)를, 꽃에는 울타리(railing)를 그려 주겠다고 하세요.', '핵심 단어: muzzle, fence, protect, danger'],
        reply: { speaker: 'Narrator', line: 'I took him in my arms and rocked him. It is such a mysterious place, the land of tears.' }
      }
    ]
  },
  {
    num: 8, title: 'The Rose', ko: '장미',
    summary: 'A flower blooms one morning on the little planet: demanding and vain, but beautiful.',
    summaryKo: '어느 날 아침 별에 핀 꽃은 까다롭고 허영심이 있지만, 아름다웠습니다.',
    scenes: [
      {
        role: 'prince',
        situation: 'Now you are the little prince. The bud you have watched for days opens at sunrise. The flower yawns and speaks.',
        situationKo: '이제 당신은 어린 왕자입니다. 며칠 동안 지켜본 꽃봉오리가 해 뜰 무렵 활짝 피었습니다. 꽃이 하품을 하며 말합니다.',
        speaker: 'The rose', line: 'Ah! I am scarcely awake. I beg you to excuse me…',
        prompt: 'Say how beautiful she is, the moment you first see her.',
        promptKo: '꽃을 처음 본 감탄을 말해 보세요. 얼마나 아름다운지!',
        answers: [{ any: ['beautiful', 'pretty', 'lovely', 'gorgeous'] }],
        model: 'Oh! How beautiful you are!',
        distractors: ['Oh! How late you are!', 'Are you a baobab?', 'Please go back to sleep.'],
        hints: ['"How beautiful you are!"', 'Key word: beautiful'],
        hintsKo: ['"정말 아름답구나(beautiful)!"', '핵심 단어: beautiful'],
        reply: { speaker: 'The rose', line: 'Am I not? And I was born at the same moment as the sun…' }
      },
      {
        role: 'prince',
        situation: 'Soon her vanity torments you. She talks about tigers, then says she is afraid of draughts and asks you to cover her in the evening.',
        situationKo: '꽃은 곧 자존심으로 당신을 괴롭힙니다. 호랑이 이야기를 하더니, 찬바람을 무서워하며 저녁이 되면 무언가를 씌워 달라고 합니다.',
        speaker: 'The rose', line: 'I am afraid of draughts. You would not have a screen?',
        prompt: 'Tell her what you will put over her at night. (Something made of glass.)',
        promptKo: '꽃에게 무엇을 씌워 주겠다고 답해 보세요. (유리로 된 것)',
        answers: [{ any: ['glass', 'globe', 'screen', 'cover', 'dome'] }],
        model: 'I will put you under a glass globe at night.',
        distractors: ['I will move you next to the volcano to keep you warm.', 'I will ask the sheep to sleep beside you.', 'There are no draughts on this planet.'],
        hints: ['A glass globe.', 'Key words: glass, globe, screen'],
        hintsKo: ['유리 덮개(glass globe)를 씌워 줍니다.', '핵심 단어: glass, globe, screen'],
        reply: { speaker: 'Narrator', line: 'He should have judged her by her deeds, not by her words.' }
      }
    ]
  },
  {
    num: 9, title: 'Leaving the Planet', ko: '별을 떠나며',
    summary: 'The little prince cleans his volcanoes and says goodbye. At last the flower tells the truth.',
    summaryKo: '어린 왕자는 화산을 청소하고 꽃과 작별합니다. 꽃은 마침내 진심을 말합니다.',
    scenes: [
      {
        role: 'prince',
        situation: 'On the morning of your departure, you put your planet in order. You have two active volcanoes and one extinct one.',
        situationKo: '떠나는 날 아침, 당신은 별을 정돈합니다. 활화산 둘과 휴화산 하나가 있습니다.',
        speaker: 'Narrator', line: 'What do you do with the volcanoes before you leave?',
        prompt: 'Say how you take care of the volcanoes.',
        promptKo: '화산들을 어떻게 손질하는지 말해 보세요.',
        answers: [{ any: ['clean', 'cleaned', 'sweep', 'swept', 'clear', 'cleared'] }],
        model: 'I clean out the volcanoes carefully, even the extinct one.',
        distractors: ['I fill the volcanoes with water.', 'I plant baobabs in the volcanoes.', 'I sell the volcanoes to the businessman.'],
        hints: ['You clean them. A well-cleaned volcano burns slowly and steadily.', 'Key words: clean or sweep'],
        hintsKo: ['깨끗이 청소(clean)합니다. 잘 청소된 화산은 조용히 타오르니까요.', '핵심 단어: clean 또는 sweep'],
        reply: { speaker: 'Narrator', line: 'Volcanic eruptions are like fires in a chimney. On our earth we are much too small to clean out our volcanoes.' }
      },
      {
        role: 'prince',
        situation: 'When you go to put the glass globe over her, the flower stops you. She coughs, and then confesses she loved you all along. Then she hurries you off.',
        situationKo: '유리 덮개를 씌우려 하자 꽃이 말립니다. 기침을 하더니, 사실은 당신을 사랑했노라고 고백합니다. 그리고 재촉합니다.',
        speaker: 'The rose', line: 'Don\'t linger like this. You have decided to go away. Now go!',
        prompt: 'Say goodbye to the flower.',
        promptKo: '꽃에게 작별 인사를 하세요.',
        answers: [{ any: ['goodbye', 'good bye', 'farewell', 'adieu', 'bye'] }],
        model: 'Goodbye.',
        distractors: ['Good morning.', 'Draw me a sheep.', 'See you at lunch.'],
        hints: ['One word of farewell is enough.', 'Key word: goodbye'],
        hintsKo: ['작별 인사 한마디면 됩니다.', '핵심 단어: goodbye'],
        reply: { speaker: 'The rose', line: '(She did not want him to see her crying. She was such a proud flower.)' }
      }
    ]
  },
  {
    num: 10, title: 'The King', ko: '왕',
    summary: 'On the first asteroid lives a king with no subjects. He gives only reasonable orders.',
    summaryKo: '첫 번째 별에는 신하 없는 왕이 살고 있습니다. 왕은 합리적인 명령만 내립니다.',
    scenes: [
      {
        role: 'prince',
        situation: 'The king of the first asteroid is delighted: a subject has arrived! He says his authority is absolute. You would like to see a sunset.',
        situationKo: '첫 번째 소행성의 왕은 당신을 보자마자 신하가 왔다며 기뻐합니다. 왕은 자기 권위가 절대적이라고 합니다. 당신은 해넘이가 보고 싶습니다.',
        speaker: 'The king', line: 'I am a king. My authority is absolute.',
        prompt: 'Ask the king to order the sun to set.',
        promptKo: '왕에게 해가 지도록 명령해 달라고 부탁해 보세요.',
        answers: [{ all: ['order', 'sun'] }, { all: ['command', 'sun'] }, { all: ['sunset'] }, { all: ['sun', 'set'] }],
        model: 'I should like to see a sunset. Order the sun to set!',
        distractors: ['I should like to be king. Give me your crown!', 'Order the sheep to eat the baobabs!', 'Order the stars to count themselves!'],
        hints: ['"Order the sun to set, please."', 'Key words: order + sun'],
        hintsKo: ['"해(sun)에게 지라고(set) 명령(order)해 주세요."', '핵심 단어: order + sun'],
        reply: { speaker: 'The king', line: 'You shall have your sunset. I shall command it… tonight, at about twenty minutes to eight.' }
      },
      {
        role: 'prince',
        situation: 'The king offers to make you Minister of Justice. But there is no one on this planet to judge. The king says:',
        situationKo: '왕은 당신을 법무 대신으로 삼겠다고 합니다. 하지만 이 별에는 재판할 사람이 아무도 없습니다. 왕이 말합니다.',
        speaker: 'The king', line: 'Then you shall judge yourself. That is the most difficult thing of all.',
        prompt: 'Finish the king\'s thought: "It is much more difficult to judge ______ than to judge others."',
        promptKo: '왕의 말을 이어 보세요. "It is much more difficult to judge ______ than to judge others."',
        answers: [{ any: ['yourself', 'oneself', 'myself', 'ourselves', 'himself', 'herself', 'one self', 'your self'] }],
        model: 'It is much more difficult to judge oneself than to judge others.',
        distractors: ['It is much more difficult to judge a rat than to judge others.', 'It is much more difficult to judge the sun than to judge others.', 'It is much more difficult to judge a king than to judge others.'],
        hints: ['Not others, but one\'s own self.', 'Key word: oneself / yourself'],
        hintsKo: ['남(others)이 아니라 자기 자신(oneself)을 심판하는 것이 더 어렵습니다.', '핵심 단어: oneself / yourself'],
        reply: { speaker: 'The king', line: 'If you succeed in judging yourself rightly, then you are indeed a man of true wisdom.' }
      }
    ]
  },
  {
    num: 11, title: 'The Conceited Man', ko: '허영심 많은 사람',
    summary: 'The man on the second planet believes everyone admires him.',
    summaryKo: '두 번째 별의 남자는 모두가 자기를 찬양한다고 믿습니다.',
    scenes: [
      {
        role: 'prince',
        situation: 'The man on the second planet greets you as an admirer. To make him raise his hat in salute, you must do something first.',
        situationKo: '두 번째 별의 남자는 당신을 보자마자 찬양자가 왔다며 좋아합니다. 그는 모자를 들어 인사하려면 당신이 무언가를 해 주어야 한다고 합니다.',
        speaker: 'The conceited man', line: 'Clap your hands, one against the other.',
        prompt: 'Do as he says. What do you do?',
        promptKo: '시키는 대로 해 보세요. 무엇을 하겠습니까?',
        answers: [{ any: ['clap', 'claps', 'clapping', 'applaud'] }],
        model: 'I clap my hands.',
        distractors: ['I take off my scarf.', 'I sit down and yawn.', 'I draw him a sheep.'],
        hints: ['Clap.', 'Key word: clap'],
        hintsKo: ['손뼉을 칩니다(clap).', '핵심 단어: clap'],
        reply: { speaker: 'The conceited man', line: '(raises his hat in a modest salute) Do you really admire me very much?' }
      },
      {
        role: 'prince',
        situation: 'To "admire" him, he explains, means to regard him as the handsomest, best-dressed, richest and most intelligent man on this planet.',
        situationKo: '"찬양"이란 당신이 그를 이 별에서 가장 잘생기고, 가장 옷을 잘 입고, 가장 부유하고, 가장 똑똑한 사람으로 여긴다는 뜻이라고 합니다.',
        speaker: 'The conceited man', line: 'Do me this kindness. Admire me just the same.',
        prompt: 'Point out that he is the only man on his planet.',
        promptKo: '이 별에는 그 사람 혼자뿐이라는 점을 지적해 보세요.',
        answers: [{ all: ['only'], any: ['man', 'one', 'person', 'people', 'planet'] }, { all: ['alone'] }, { all: ['nobody', 'else'] }, { all: ['no one', 'else'] }],
        model: 'But you are the only man on your planet!',
        distractors: ['But you are the richest man on the Earth!', 'But your hat is too small!', 'But I have already clapped three times!'],
        hints: ['"But you are the only one here!"', 'Key word: only'],
        hintsKo: ['"하지만 이 별에는 당신뿐(only)이잖아요!"', '핵심 단어: only'],
        reply: { speaker: 'Narrator', line: 'Grown-ups are certainly very odd, he said to himself as he went away.' }
      }
    ]
  },
  {
    num: 12, title: 'The Tippler', ko: '술꾼',
    summary: 'The tippler on the third planet drinks to forget that he is ashamed of drinking.',
    summaryKo: '세 번째 별의 술꾼은 부끄러움을 잊으려고 마시고, 마시는 것이 부끄럽습니다.',
    scenes: [
      {
        role: 'prince',
        situation: 'The third planet. A man sits in silence before a collection of empty bottles and full bottles.',
        situationKo: '세 번째 별. 빈 병과 가득 찬 병을 잔뜩 늘어놓은 남자가 말없이 앉아 있습니다.',
        speaker: 'The tippler', line: 'I am drinking.',
        prompt: 'Ask him why he is drinking.',
        promptKo: '왜 마시는지 물어보세요.',
        answers: [{ all: ['why'] }, { all: ['what', 'for'] }],
        model: 'Why are you drinking?',
        distractors: ['What are you drinking?', 'May I have a bottle?', 'Where did you buy all these bottles?'],
        hints: ['Ask for the reason.', 'Key word: why'],
        hintsKo: ['이유(why)를 물어보세요.', '핵심 단어: why'],
        reply: { speaker: 'The tippler', line: 'So that I may forget.' }
      },
      {
        role: 'prince',
        situation: 'He drinks to forget, he says. Already you feel sorry for him.',
        situationKo: '잊기 위해 마신다고 합니다. 당신은 벌써 그가 안쓰럽습니다.',
        speaker: 'The tippler', line: '(hangs his head) So that I may forget.',
        prompt: 'Ask what he wants to forget.',
        promptKo: '무엇을 잊고 싶은지 물어보세요.',
        answers: [{ all: ['forget'] }, { all: ['forgotten'] }],
        model: 'Forget what?',
        distractors: ['Remember me?', 'Remember what?', 'Drink what?'],
        hints: ['"Forget what?"', 'Key words: forget what'],
        hintsKo: ['"무엇(what)을 잊으려고(forget)?"', '핵심 단어: forget what'],
        reply: { speaker: 'The tippler', line: 'Forget that I am ashamed. … Ashamed of drinking!' }
      }
    ]
  },
  {
    num: 13, title: 'The Businessman', ko: '사업가',
    summary: 'The businessman on the fourth planet counts the stars and owns them, but is of no use to them.',
    summaryKo: '네 번째 별의 사업가는 별을 세어 소유합니다. 그러나 별에게 아무 쓸모가 없습니다.',
    scenes: [
      {
        role: 'prince',
        situation: 'The fourth planet. A man is counting without even raising his head.',
        situationKo: '네 번째 별. 남자는 고개도 들지 않고 숫자를 세고 있습니다.',
        speaker: 'The businessman', line: 'Five hundred and one million, six hundred twenty-two thousand, seven hundred thirty-one.',
        prompt: 'Ask him five hundred and one million of what.',
        promptKo: '그 오억 몇천만이 "무엇"인지 물어보세요.',
        answers: [{ all: ['what'] }, { all: ['of', 'what'] }, { all: ['million', 'what'] }],
        model: 'Five hundred and one million what?',
        distractors: ['Five hundred and one million is a lot of sheep.', 'Can you count faster, please?', 'Is that your telephone number?'],
        hints: ['"Five hundred and one million… what?"', 'Key word: what'],
        hintsKo: ['"오억 ... 무엇(what)이요?"', '핵심 단어: what'],
        reply: { speaker: 'The businessman', line: 'Stars. Millions of little golden things that set lazy men to idle dreaming.' }
      },
      {
        role: 'prince',
        situation: 'The businessman says that counting the stars, writing the number on a paper and locking it in the bank means owning them.',
        situationKo: '사업가는 별을 세어 종이에 적고 은행에 넣어 두면 그것이 소유하는 것이라고 합니다.',
        speaker: 'The businessman', line: 'I own them. I am a man of consequence.',
        prompt: 'Ask what good it does him to own the stars, or what use he is to them.',
        promptKo: '별을 소유해서 무엇이 좋은지, 별에게 무슨 쓸모가 있는지 따져 보세요.',
        answers: [{ all: ['what', 'good'] }, { all: ['good'], any: ['own', 'owning'] }, { any: ['use', 'useful', 'useless'] }, { all: ['why'], any: ['own', 'need', 'want', 'keep'] }],
        model: 'And what good does it do you to own the stars?',
        distractors: ['And how much do the stars cost each?', 'May I own a few stars as well?', 'Do the stars know that you own them?'],
        hints: ['"What good does it do you to own them?"', 'Key words: own, good, use'],
        hintsKo: ['"별을 소유(own)해서 무슨 좋은 점(good)이 있나요?"', '핵심 단어: own, good, use'],
        reply: { speaker: 'The businessman', line: 'It does me the good of making me rich. And then I can buy more stars.' }
      },
      {
        role: 'prince',
        situation: 'You own things too: a flower you water every day and three volcanoes you clean every week. You are useful to them.',
        situationKo: '당신도 소유한 것이 있습니다. 매일 물을 주는 꽃과 매주 청소하는 화산 셋. 당신은 그것들에게 쓸모가 있습니다.',
        speaker: 'The businessman', line: '(opens his mouth, but finds nothing to say)',
        prompt: 'Say what you own and take care of.',
        promptKo: '당신이 소유하고 돌보는 것을 말해 보세요.',
        answers: [{ any: ['flower', 'rose', 'volcano', 'volcanoes'] }],
        model: 'I own a flower that I water every day, and three volcanoes that I clean out every week.',
        distractors: ['I own a bank where I keep my papers.', 'I own a hundred sheep and a thousand boxes.', 'I own nothing, and I want nothing.'],
        hints: ['A flower and three volcanoes.', 'Key words: flower or volcano'],
        hintsKo: ['꽃(flower) 한 송이와 화산(volcanoes) 셋.', '핵심 단어: flower 또는 volcano'],
        reply: { speaker: 'The little prince', line: 'But you are of no use to the stars…' }
      }
    ]
  },
  {
    num: 14, title: 'The Lamplighter', ko: '가로등 켜는 사람',
    summary: 'The fifth planet is the smallest, but its lamplighter is the only one who thinks of something besides himself.',
    summaryKo: '다섯 번째 별은 가장 작지만, 자기 아닌 것을 생각하는 유일한 사람이 삽니다.',
    scenes: [
      {
        role: 'prince',
        situation: 'The fifth planet has just enough room for a street lamp and the man who lights it. He greets you, puts out his lamp, and lights it again at once.',
        situationKo: '다섯 번째 별은 가로등 하나와 그것을 켜는 사람이 겨우 들어갈 만큼 작습니다. 남자는 인사를 하며 등을 끄더니, 곧 다시 켭니다.',
        speaker: 'The lamplighter', line: 'Good morning. … Good evening.',
        prompt: 'Ask why he just put out his lamp, or what his orders are.',
        promptKo: '왜 방금 등을 껐다가 다시 켰는지, 무슨 명령을 따르는 것인지 물어보세요.',
        answers: [{ all: ['why'] }, { any: ['orders', 'order', 'instructions'] }],
        model: 'Why have you just put out your lamp? What are the orders?',
        distractors: ['Can I borrow your lamp for the night?', 'Is it morning or evening on the Earth?', 'How much does a lamp like that cost?'],
        hints: ['Ask for the reason, or about the orders.', 'Key words: why / orders'],
        hintsKo: ['이유(why) 또는 명령(orders)에 대해 물어보세요.', '핵심 단어: why / orders'],
        reply: { speaker: 'The lamplighter', line: 'Those are the orders. The planet turns faster every year, and the orders have not changed!' }
      },
      {
        role: 'prince',
        situation: 'The planet now turns once a minute instead of once a year, and the man longs for rest. His planet is so small that three strides take you all the way round it.',
        situationKo: '이 별은 일 년에 한 바퀴가 아니라 일 분에 한 바퀴를 돕니다. 남자는 쉬고 싶어 합니다. 이 별은 세 걸음이면 한 바퀴를 돌 만큼 작습니다.',
        speaker: 'The lamplighter', line: 'The one thing I love in life is to sleep.',
        prompt: 'Tell him how he could stay in the sunshine all the time. (Slowly…)',
        promptKo: '항상 햇빛 속에 있으려면 어떻게 하면 되는지 알려 주세요. (천천히 …)',
        answers: [{ any: ['walk', 'walking', 'stride', 'strides', 'step', 'steps'] }, { all: ['slowly'] }, { all: ['follow', 'sun'] }],
        model: 'You need only walk along rather slowly, and it will always be day.',
        distractors: ['You need only break the lamp, and it will always be day.', 'You need only close your eyes, and it will always be night.', 'You need only ask the king to stop the planet.'],
        hints: ['Walk slowly, following the sun.', 'Key words: walk / slowly'],
        hintsKo: ['천천히(slowly) 걸어가면(walk) 됩니다.', '핵심 단어: walk / slowly'],
        reply: { speaker: 'The lamplighter', line: 'That does not do me much good. What I want most is to sleep.' }
      }
    ]
  },
  {
    num: 15, title: 'The Geographer', ko: '지리학자',
    summary: 'The scholar on the sixth planet never leaves his desk, and does not record flowers because they are ephemeral.',
    summaryKo: '여섯 번째 별의 학자는 책상을 떠나지 않고, 꽃은 덧없어서 기록하지 않습니다.',
    scenes: [
      {
        role: 'prince',
        situation: 'The sixth planet. An old gentleman writing enormous books calls you an explorer and asks about your planet.',
        situationKo: '여섯 번째 별. 커다란 책을 쓰는 노신사가 당신을 탐험가라 부르며 당신의 별에 대해 묻습니다.',
        speaker: 'The geographer', line: 'Describe your planet to me!',
        prompt: 'Tell him what is on your planet. (Volcanoes and a flower.)',
        promptKo: '당신의 별에 무엇이 있는지 말해 보세요. (화산과 꽃)',
        answers: [{ any: ['volcano', 'volcanoes'] }, { any: ['flower', 'rose'] }],
        model: 'I have three volcanoes and a flower.',
        distractors: ['I have three oceans and a mountain.', 'I have a railway and a lamp.', 'I have five thousand roses in a garden.'],
        hints: ['Three volcanoes and one flower.', 'Key words: volcano / flower'],
        hintsKo: ['화산(volcanoes) 세 개와 꽃(flower) 한 송이.', '핵심 단어: volcano / flower'],
        reply: { speaker: 'The geographer', line: 'We do not record flowers.' }
      },
      {
        role: 'prince',
        situation: 'Mountains and oceans are recorded, he says, but not flowers, because flowers are "ephemeral".',
        situationKo: '지리학자는 산과 바다는 기록하지만 꽃은 기록하지 않는다고 합니다. 꽃은 "덧없기(ephemeral)" 때문이라고요.',
        speaker: 'The geographer', line: 'Because they are ephemeral.',
        prompt: 'Ask what "ephemeral" means.',
        promptKo: '"ephemeral"이 무슨 뜻인지 물어보세요.',
        answers: [{ all: ['ephemeral'] }, { all: ['what', 'mean'] }, { all: ['what', 'means'] }],
        model: 'What does that mean… "ephemeral"?',
        distractors: ['Is geography more important than flowers?', 'Can I borrow your pen?', 'Do you record volcanoes that are extinct?'],
        hints: ['Ask for the meaning of the word you do not know.', 'Key words: ephemeral / mean'],
        hintsKo: ['모르는 단어의 뜻(mean)을 물어보세요.', '핵심 단어: ephemeral / mean'],
        reply: { speaker: 'The geographer', line: 'It means, "which is in danger of speedy disappearance."' }
      },
      {
        role: 'prince',
        situation: 'Your flower is in danger of disappearing soon. For the first time you feel regret. Still, you gather your courage and ask.',
        situationKo: '당신의 꽃이 곧 사라질 위험에 놓여 있다는 말에 처음으로 후회가 밀려옵니다. 그래도 당신은 용기를 내어 묻습니다.',
        speaker: 'The geographer', line: '(dips his pen)',
        prompt: 'Ask him which planet he would advise you to visit next.',
        promptKo: '다음에 어느 별을 가 보면 좋을지 추천해 달라고 물어보세요.',
        answers: [{ any: ['advise', 'recommend', 'suggest'] }, { all: ['where'], any: ['go', 'visit', 'next', 'should'] }, { any: ['which planet', 'what planet', 'what place', 'which place'] }],
        model: 'What place would you advise me to visit?',
        distractors: ['Which of your books is the heaviest?', 'Would you like to come and see my planet?', 'Could you write my flower in your book anyway?'],
        hints: ['Ask where to go, or for a recommendation.', 'Key words: advise / visit / which planet'],
        hintsKo: ['어디로(where) 가면 좋을지, 추천(advise/recommend)을 부탁하세요.', '핵심 단어: advise / visit / which planet'],
        reply: { speaker: 'The geographer', line: 'The planet Earth. It has a good reputation.' }
      }
    ]
  },
  {
    num: 16, title: 'The Earth', ko: '지구',
    summary: 'The seventh planet: the Earth, with one hundred and eleven kings, seven thousand geographers and nine hundred thousand businessmen.',
    summaryKo: '일곱 번째 별, 지구. 왕 백열한 명, 지리학자 칠천 명, 사업가 구십만 명이 삽니다.',
    scenes: [
      {
        role: 'pilot',
        situation: 'The Earth is no ordinary planet. Before electricity, an army of more than four hundred thousand lamplighters lit the six continents in order, like a ballet.',
        situationKo: '지구는 평범한 별이 아닙니다. 전기가 발명되기 전에는 여섯 대륙에서 사십육만 명이 넘는 가로등 켜는 사람들이 발레처럼 순서대로 등을 켰습니다.',
        speaker: 'Narrator', line: 'On the Earth there live about two billion grown-ups. Name one kind of grown-up we have already met.',
        prompt: 'Name at least one kind of grown-up from the earlier planets.',
        promptKo: '지금까지 만난 어른의 종류를 하나 이상 영어로 말해 보세요.',
        answers: [{ any: ['king', 'kings', 'geographer', 'geographers', 'businessman', 'businessmen', 'tippler', 'tipplers', 'drunkard', 'drunkards', 'conceited', 'lamplighter', 'lamplighters', 'vain'] }],
        model: 'Kings, geographers, businessmen, tipplers, conceited men, and lamplighters.',
        distractors: ['Foxes, snakes, and roses.', 'Pilots, painters, and sheep.', 'Explorers, sailors, and astronomers.'],
        hints: ['King, geographer, businessman, tippler, conceited man, lamplighter.', 'One word is enough.'],
        hintsKo: ['왕(king), 지리학자(geographer), 사업가(businessman), 술꾼(tippler), 허영심 많은 사람(conceited man), 가로등 켜는 사람(lamplighter).', '한 단어만 맞아도 됩니다.'],
        reply: { speaker: 'Narrator', line: 'Seen from a slight distance, that would make a splendid spectacle.' }
      }
    ]
  },
  {
    num: 17, title: 'The Snake', ko: '뱀',
    summary: 'The first creature the little prince meets on Earth is a golden snake in the moonlight.',
    summaryKo: '지구에 내려온 어린 왕자가 처음 만난 것은 달빛 아래 금빛 뱀입니다.',
    scenes: [
      {
        role: 'prince',
        situation: 'You have arrived on Earth, but there is not a person in sight. On the sand, a coil the colour of moonlight moves.',
        situationKo: '지구에 도착했지만 사람이 하나도 보이지 않습니다. 모래 위에서 달빛 색깔의 고리 하나가 움직입니다.',
        speaker: 'The snake', line: 'Good evening.',
        prompt: 'Greet it, then ask what planet this is.',
        promptKo: '인사를 한 뒤, 여기가 어느 별인지 물어보세요.',
        answers: [{ all: ['what', 'planet'] }, { all: ['which', 'planet'] }, { all: ['where', 'am', 'i'] }, { all: ['where', 'is', 'this'] }, { all: ['what', 'place'] }],
        model: 'Good evening. What planet is this on which I have come down?',
        distractors: ['Good evening. Are you a sheep?', 'Good evening. Could you clean my volcanoes?', 'Good evening. Is this asteroid B-612?'],
        hints: ['"What planet is this?"', 'Key words: what/which planet'],
        hintsKo: ['"여긴 어느 별(what planet)이니?"', '핵심 단어: what/which planet'],
        reply: { speaker: 'The snake', line: 'This is the Earth. This is Africa.' }
      },
      {
        role: 'prince',
        situation: 'This is the desert, it says, and there are no people in the desert. You feel a little lonely.',
        situationKo: '이곳은 사막이라 사람이 없다고 합니다. 당신은 조금 외롭습니다.',
        speaker: 'The snake', line: 'The Earth is large.',
        prompt: 'Ask where the people are, and say it is a little lonely in the desert.',
        promptKo: '사람들은 어디 있는지 묻고, 사막이 조금 외롭다고 말해 보세요.',
        answers: [{ all: ['lonely'] }, { all: ['where'], any: ['men', 'people', 'humans', 'everyone', 'everybody'] }, { all: ['alone'] }],
        model: 'Where are the men? It is a little lonely in the desert.',
        distractors: ['Where is the railway? I want to take a train.', 'It is a little too hot in the desert.', 'Are there any baobabs in the desert?'],
        hints: ['Lonely. Where are the people?', 'Key words: lonely, or where + people'],
        hintsKo: ['외롭다(lonely), 사람들(men/people)은 어디(where) 있나요?', '핵심 단어: lonely 또는 where + people'],
        reply: { speaker: 'The snake', line: 'It is also lonely among men.' }
      },
      {
        role: 'prince',
        situation: 'The snake speaks strangely: it can send anyone back to the earth they came from, and carry you farther than any ship.',
        situationKo: '뱀은 자기가 누구든 원래 왔던 땅으로 돌려보낼 수 있다고, 배보다 멀리 데려다줄 수 있다고 알쏭달쏭한 말을 합니다.',
        speaker: 'The snake', line: 'Whomever I touch, I send back to the earth from whence he came.',
        prompt: 'Ask why it always speaks in riddles.',
        promptKo: '왜 늘 수수께끼처럼 말하느냐고 물어보세요.',
        answers: [{ any: ['riddle', 'riddles', 'puzzle', 'puzzles', 'mysterious', 'mystery'] }],
        model: 'Why do you always speak in riddles?',
        distractors: ['Why do you always speak so loudly?', 'Can you carry me to the businessman\'s planet?', 'Are you thicker than a finger?'],
        hints: ['Point out that it only speaks in riddles.', 'Key word: riddles'],
        hintsKo: ['수수께끼(riddles)로만 말한다고 지적하세요.', '핵심 단어: riddles'],
        reply: { speaker: 'The snake', line: 'I solve them all.' }
      }
    ]
  },
  {
    num: 18, title: 'A Flower in the Desert', ko: '사막의 꽃',
    summary: 'A flower with three petals says it has seen six or seven men, once.',
    summaryKo: '꽃잎 세 장의 꽃은 사람들을 예닐곱 명 본 적이 있다고 합니다.',
    scenes: [
      {
        role: 'prince',
        situation: 'Crossing the desert, you meet a flower of no account, with three petals.',
        situationKo: '사막을 건너다 꽃잎이 세 장뿐인 보잘것없는 꽃을 만납니다.',
        speaker: 'The flower', line: 'Good morning.',
        prompt: 'Greet it, and ask where the men are.',
        promptKo: '인사를 하고, 사람들이 어디 있는지 물어보세요.',
        answers: [{ all: ['where'], any: ['men', 'people', 'humans', 'anyone', 'everyone'] }],
        model: 'Good morning. Where are the men?',
        distractors: ['Good morning. Where is the water?', 'Good morning. Are you my rose?', 'Good morning. How many petals do you have?'],
        hints: ['Where are the people?', 'Key words: where + men/people'],
        hintsKo: ['사람들(men)은 어디(where) 있나요?', '핵심 단어: where + men/people'],
        reply: { speaker: 'The flower', line: 'Men? I think there are six or seven of them. The wind blows them away. They have no roots.' }
      },
      {
        role: 'prince',
        situation: 'The flower says men have no roots, which makes their life difficult. There is nothing more to say.',
        situationKo: '꽃은 사람들이 뿌리가 없어서 살기 힘들다고 말합니다. 더 할 말이 없습니다.',
        speaker: 'The flower', line: '(sways in the wind)',
        prompt: 'Say goodbye.',
        promptKo: '작별 인사를 하세요.',
        answers: [{ any: ['goodbye', 'good bye', 'farewell', 'bye', 'adieu'] }],
        model: 'Goodbye.',
        distractors: ['Good morning.', 'Thank you for the water.', 'Wait for me!'],
        hints: ['One word of farewell.', 'Key word: goodbye'],
        hintsKo: ['작별 인사 한마디.', '핵심 단어: goodbye'],
        reply: { speaker: 'The flower', line: 'Goodbye.' }
      }
    ]
  },
  {
    num: 19, title: 'The Echo', ko: '메아리',
    summary: 'The little prince climbs a high mountain and shouts, but only the echo answers.',
    summaryKo: '높은 산에 올라 소리치지만 돌아오는 것은 메아리뿐입니다.',
    scenes: [
      {
        role: 'prince',
        situation: 'You climb a high mountain, hoping to see the whole planet and all its people at a glance. You see only sharp peaks of rock. You call out.',
        situationKo: '당신은 높은 산에 오릅니다. 여기서라면 온 지구와 모든 사람을 한눈에 볼 수 있을 거라 기대했지만, 뾰족한 바위산뿐입니다. 소리쳐 봅니다.',
        speaker: 'The mountain', line: '(silence)',
        prompt: 'Shout to the mountains: ask them to be your friends, say you are all alone. (Whatever you shout comes back as an echo.)',
        promptKo: '산을 향해 외쳐 보세요. 친구가 되어 달라고, 혼자라고. (당신이 외친 말이 메아리로 돌아옵니다.)',
        answers: [{ any: ['friend', 'friends', 'alone', 'lonely', 'who are you', 'good morning', 'hello', 'anyone', 'anybody'] }],
        model: 'Be my friends. I am all alone.',
        distractors: ['Draw me a sheep. I am very busy.', 'Be my subjects. I am the king.', 'Count the stars. I am the businessman.'],
        hints: ['"Be my friends. I am all alone."', 'Key words: friend / alone'],
        hintsKo: ['"내 친구(friends)가 되어 줘. 나는 혼자(alone)야."', '핵심 단어: friend / alone'],
        echo: true,
        reply: { speaker: 'The little prince', line: 'What a queer planet! People here only repeat what one says to them…' }
      }
    ]
  },
  {
    num: 20, title: 'Five Thousand Roses', ko: '오천 송이 장미',
    summary: 'In a garden full of roses, the little prince learns his flower is not unique in all the world.',
    summaryKo: '장미가 가득 핀 정원에서 어린 왕자는 자기 꽃이 세상에 하나뿐이 아님을 알게 됩니다.',
    scenes: [
      {
        role: 'prince',
        situation: 'After a long walk you find a road, and a garden full of roses in bloom. Every one of them looks like your flower.',
        situationKo: '오랜 걸음 끝에 길을 발견하고, 장미가 활짝 핀 정원에 다다릅니다. 모두 당신의 꽃과 똑같이 생겼습니다.',
        speaker: 'The roses', line: '(five thousand of them, all alike)',
        prompt: 'Astonished, ask them who they are.',
        promptKo: '깜짝 놀라 그들이 누구인지 물어보세요.',
        answers: [{ all: ['who'] }, { all: ['what', 'are', 'you'] }],
        model: 'Who are you?',
        distractors: ['How much do you cost?', 'Are you afraid of draughts?', 'Which of you is the prettiest?'],
        hints: ['"Who are you?"', 'Key word: who'],
        hintsKo: ['"너희는 누구(who)니?"', '핵심 단어: who'],
        reply: { speaker: 'The roses', line: 'We are roses.' }
      },
      {
        role: 'prince',
        situation: 'Your flower told you she was the only one of her kind in the universe. Here are five thousand of them in a single garden. You lie down in the grass.',
        situationKo: '당신의 꽃은 우주에 자기 같은 꽃은 하나뿐이라고 했습니다. 그런데 정원 하나에 오천 송이가 있습니다. 당신은 풀밭에 엎드립니다.',
        speaker: 'Narrator', line: 'He thought he was rich with a flower unique in all the world.',
        prompt: 'Say how you feel: your flower was only a common rose, and you are not such a great prince.',
        promptKo: '지금의 기분을 말해 보세요. 나의 꽃은 흔한 장미였을 뿐이고, 나는 위대한 왕자가 아니라고.',
        answers: [{ any: ['sad', 'unhappy', 'cry', 'cried', 'crying', 'wept', 'weep', 'common', 'ordinary', 'not unique', 'not special', 'not rich', 'not a great', 'not great', 'tears'] }],
        model: 'I am not a great prince at all. All I had was a common rose. And I lay down in the grass and cried.',
        distractors: ['I am the richest prince of all. I own five thousand roses now.', 'I am so happy! I will take all of you home.', 'These roses are fake. Mine is the only real one.'],
        hints: ['A common rose; sad; cried.', 'Key words: common / sad / cried'],
        hintsKo: ['평범한(common) 장미, 슬퍼서(sad) 울었다(cried).', '핵심 단어: common / sad / cried'],
        reply: { speaker: 'Narrator', line: 'It was then that the fox appeared.' }
      }
    ]
  },
  {
    num: 21, title: 'The Fox', ko: '여우',
    summary: 'The fox teaches what it means to tame, and the secret of seeing with the heart.',
    summaryKo: '여우는 길들인다는 것의 의미와 마음으로 보는 비밀을 가르쳐 줍니다.',
    scenes: [
      {
        role: 'prince',
        situation: 'Under an apple tree, a fox says hello. You are very unhappy.',
        situationKo: '사과나무 아래서 여우가 인사합니다. 당신은 몹시 슬픕니다.',
        speaker: 'The fox', line: 'Good morning. I am a fox.',
        prompt: 'Ask the fox to come and play with you, because you are so unhappy.',
        promptKo: '여우에게 같이 놀자고 청해 보세요. 당신은 너무 슬프니까요.',
        answers: [{ any: ['play'] }],
        model: 'Come and play with me. I am so unhappy.',
        distractors: ['Go away. I am so unhappy.', 'Come and count the stars with me.', 'Are you a chicken?'],
        hints: ['"Come and play with me."', 'Key word: play'],
        hintsKo: ['"나랑 놀자(play with me)."', '핵심 단어: play'],
        reply: { speaker: 'The fox', line: 'I cannot play with you. I am not tamed.' }
      },
      {
        role: 'prince',
        situation: 'The fox cannot play because it is not "tamed". You have never heard the word.',
        situationKo: '여우는 "길들여지지" 않아서 놀 수 없다고 합니다. 처음 듣는 말입니다.',
        speaker: 'The fox', line: 'I am not tamed.',
        prompt: 'Ask what "tame" means.',
        promptKo: '"tame"이 무슨 뜻인지 물어보세요.',
        answers: [{ all: ['tame'], any: ['what', 'mean', 'means'] }, { all: ['tamed'], any: ['what', 'mean', 'means'] }, { all: ['what', 'mean'] }],
        model: 'What does that mean… "tame"?',
        distractors: ['Then I will play by myself.', 'Then I will tame you right now.', 'Who tamed you?'],
        hints: ['"What does tame mean?"', 'Key words: tame + mean'],
        hintsKo: ['"tame"이 무슨 뜻(mean)이니?', '핵심 단어: tame + mean'],
        reply: { speaker: 'The fox', line: 'It is an act too often neglected. It means to establish ties.' }
      },
      {
        role: 'prince',
        situation: 'If you tame it, the fox says, you will be unique to each other, and even the golden wheat will remind it of your hair.',
        situationKo: '여우는 당신이 자기를 길들이면 둘은 서로에게 세상에 하나뿐인 존재가 되고, 밀밭의 금빛도 당신의 머리칼을 떠올리게 할 거라고 합니다.',
        speaker: 'The fox', line: 'Please… tame me!',
        prompt: 'Ask what you must do to tame it.',
        promptKo: '여우를 길들이려면 어떻게 해야 하는지 물어보세요.',
        answers: [{ all: ['tame'], any: ['what', 'how', 'must', 'do', 'should'] }],
        model: 'What must I do, to tame you?',
        distractors: ['What must I pay, to buy you?', 'Why would a fox want a friend?', 'Can the wheat grow faster instead?'],
        hints: ['"What must I do to tame you?"', 'Key words: tame + what/how'],
        hintsKo: ['"너를 길들이려면(tame) 무엇을(what) 해야(do) 하니?"', '핵심 단어: tame + what/how'],
        reply: { speaker: 'The fox', line: 'You must be very patient. First you will sit down at a little distance from me… every day a little closer.' }
      },
      {
        role: 'prince',
        situation: 'Time to say goodbye. As a present, the fox tells you its secret. It is very simple.',
        situationKo: '작별의 시간. 여우가 선물로 비밀 하나를 알려 줍니다. 아주 간단한 비밀입니다.',
        speaker: 'The fox', line: 'It is only with the ______ that one can see rightly.',
        prompt: 'Fill in the blank. With what does one see rightly?',
        promptKo: '빈칸을 채워 보세요. 무엇으로 보아야 바로 볼 수 있을까요?',
        answers: [{ any: ['heart'] }],
        model: 'It is only with the heart that one can see rightly.',
        distractors: ['It is only with the eyes that one can see rightly.', 'It is only with a telescope that one can see rightly.', 'It is only with figures that one can see rightly.'],
        hints: ['Not the eyes, but what is in your chest.', 'Key word: heart'],
        hintsKo: ['눈(eyes)이 아니라, 가슴 속의 그것.', '핵심 단어: heart'],
        reply: { speaker: 'The fox', line: 'What is essential is invisible to the eye.' }
      },
      {
        role: 'prince',
        situation: 'It is the time you spent on your rose that makes her so important, says the fox. Then, one last thing to remember.',
        situationKo: '여우는 당신의 장미를 그토록 소중하게 만든 것은 당신이 장미에게 들인 시간이라고 합니다. 그리고 마지막 당부.',
        speaker: 'The fox', line: 'You become responsible, forever, for what you have ______.',
        prompt: 'Fill in the blank.',
        promptKo: '빈칸을 채워 보세요.',
        answers: [{ any: ['tamed', 'tame'] }],
        model: 'You become responsible, forever, for what you have tamed.',
        distractors: ['You become responsible, forever, for what you have counted.', 'You become responsible, forever, for what you have eaten.', 'You become responsible, forever, for what you have drawn.'],
        hints: ['The key word of this chapter.', 'Key word: tamed'],
        hintsKo: ['이 장의 핵심 단어입니다.', '핵심 단어: tamed'],
        reply: { speaker: 'The little prince', line: 'I am responsible for my rose.' }
      }
    ]
  },
  {
    num: 22, title: 'The Railway Switchman', ko: '철도 전철수',
    summary: 'The travellers on the trains rush without knowing what they are looking for. Only the children know.',
    summaryKo: '기차 속 여행자들은 무엇을 찾는지도 모른 채 서두릅니다. 아이들만 압니다.',
    scenes: [
      {
        role: 'prince',
        situation: 'Beside the tracks, a switchman greets you. A lighted express train thunders past.',
        situationKo: '철길 옆, 전철수가 인사합니다. 그때 불 켜진 급행열차가 천둥소리를 내며 지나갑니다.',
        speaker: 'The switchman', line: 'Good morning.',
        prompt: 'Ask him what he does here.',
        promptKo: '이곳에서 무슨 일을 하는지 물어보세요.',
        answers: [{ all: ['what'], any: ['do', 'doing', 'job', 'work'] }, { all: ['job'] }],
        model: 'What do you do here?',
        distractors: ['When does the next train leave?', 'Where can I buy a ticket?', 'Why is the train so loud?'],
        hints: ['"What do you do here?"', 'Key words: what + do'],
        hintsKo: ['"여기서 무슨 일(what)을 하세요(do)?"', '핵심 단어: what + do'],
        reply: { speaker: 'The switchman', line: 'I sort out travellers, in bundles of a thousand.' }
      },
      {
        role: 'prince',
        situation: 'The travellers are in a great hurry, but not even the engine driver knows what they are looking for. Inside they sleep or yawn. Only the children press their noses to the windows.',
        situationKo: '여행자들은 몹시 서두르지만 무엇을 찾는지는 기관사조차 모른다고 합니다. 안에서는 잠을 자거나 하품만 합니다. 창에 코를 붙이고 밖을 보는 것은 아이들뿐입니다.',
        speaker: 'The switchman', line: 'Only the ______ are flattening their noses against the windows.',
        prompt: 'Fill in the blank. Who knows what they are looking for?',
        promptKo: '빈칸을 채워 보세요. 자기가 무엇을 찾는지 아는 사람들은 누구인가요?',
        answers: [{ any: ['children', 'child', 'kids', 'kid'] }],
        model: 'Only the children know what they are looking for.',
        distractors: ['Only the businessmen know what they are looking for.', 'Only the engine drivers know what they are looking for.', 'Only the geographers know what they are looking for.'],
        hints: ['The opposite of grown-ups.', 'Key word: children'],
        hintsKo: ['어른(grown-ups)의 반대.', '핵심 단어: children'],
        reply: { speaker: 'The switchman', line: 'They are lucky.' }
      }
    ]
  },
  {
    num: 23, title: 'The Merchant', ko: '장사꾼',
    summary: 'A merchant sells pills that quench thirst and save fifty-three minutes a week.',
    summaryKo: '갈증을 없애는 알약으로 일주일에 오십삼 분을 아낄 수 있다는 장사꾼을 만납니다.',
    scenes: [
      {
        role: 'prince',
        situation: 'A merchant sells pills that quench thirst. Take one a week and you never need to drink, saving fifty-three minutes.',
        situationKo: '장사꾼이 갈증을 없애 주는 알약을 팝니다. 일주일에 하나만 먹으면 물을 마실 필요가 없어, 오십삼 분을 아낄 수 있다고 합니다.',
        speaker: 'The merchant', line: 'You can spend those fifty-three minutes any way you like.',
        prompt: 'Say what you would do with those fifty-three minutes. (Walk toward a spring…)',
        promptKo: '당신이라면 그 오십삼 분을 무엇에 쓰고 싶은지 말해 보세요. (샘물을 향해 …)',
        answers: [{ any: ['walk', 'walking', 'stroll', 'spring', 'water', 'fountain', 'well', 'leisure', 'slowly'] }],
        model: 'If I had fifty-three minutes to spend as I liked, I would walk very slowly toward a spring of fresh water.',
        distractors: ['If I had fifty-three minutes, I would buy more pills.', 'If I had fifty-three minutes, I would count my stars again.', 'If I had fifty-three minutes, I would take the express train.'],
        hints: ['Walk slowly to a spring of fresh water.', 'Key words: walk / spring / water'],
        hintsKo: ['천천히 걸어서(walk) 신선한 샘물(spring)로 가겠다고 하세요.', '핵심 단어: walk / spring / water'],
        reply: { speaker: 'The merchant', line: '(shrugs, and goes on selling pills)' }
      }
    ]
  },
  {
    num: 24, title: 'The Desert Hides a Well', ko: '사막이 감춘 우물',
    summary: 'With the last drop of water gone, the pilot and the little prince walk in search of a well.',
    summaryKo: '마지막 물 한 방울까지 마신 조종사와 어린 왕자가 함께 우물을 찾아 걷습니다.',
    scenes: [
      {
        role: 'pilot',
        situation: 'The eighth day in the desert. The water is gone. You and the little prince set out to find a well. Under the stars, he says:',
        situationKo: '사막에서 여드레째. 물이 다 떨어졌습니다. 당신과 어린 왕자는 우물을 찾아 걷습니다. 별빛 아래 어린 왕자가 말합니다.',
        speaker: 'The little prince', line: 'The stars are beautiful because of a flower that cannot be seen.',
        prompt: 'You agree. Say why the desert is beautiful: "What makes the desert beautiful is that somewhere it hides a ______."',
        promptKo: '당신도 동의합니다. 사막이 아름다운 이유를 말해 보세요. "What makes the desert beautiful is that somewhere it hides a ______."',
        answers: [{ any: ['well', 'water', 'spring', 'oasis'] }],
        model: 'What makes the desert beautiful is that somewhere it hides a well.',
        distractors: ['What makes the desert beautiful is that somewhere it hides a snake.', 'What makes the desert beautiful is that somewhere it hides a bank.', 'What makes the desert beautiful is that somewhere it hides a train.'],
        hints: ['A place where water comes up, with a bucket and a pulley.', 'Key word: well'],
        hintsKo: ['물이 솟는 곳. 두레박이 있는 그것.', '핵심 단어: well'],
        reply: { speaker: 'The little prince', line: 'Yes. Whether it is a house, the stars, or the desert, what makes them beautiful is invisible!' }
      },
      {
        role: 'pilot',
        situation: 'When the little prince falls asleep you carry him. In the moonlight you look at his pale forehead, his closed eyes, his hair in the wind, and you wonder what moves you so deeply about him.',
        situationKo: '어린 왕자가 잠들자 당신은 그를 안고 걷습니다. 달빛 아래 창백한 이마와 감긴 눈, 바람에 흔들리는 머리칼을 보며 생각합니다. 이 아이를 이토록 감동적으로 만드는 것은 무엇인가.',
        speaker: 'Narrator', line: 'What moves me so deeply about this sleeping little prince is his loyalty to a ______.',
        prompt: 'Fill in the blank: the thing the little prince stays faithful to, even in his sleep.',
        promptKo: '빈칸을 채워 보세요. 어린 왕자가 잠들어서도 지키는 것.',
        answers: [{ any: ['flower', 'rose'] }],
        model: 'His loyalty to a flower. The image of a rose shines through his whole being like the flame of a lamp.',
        distractors: ['His loyalty to a king.', 'His loyalty to a railway timetable.', 'His loyalty to a bottle.'],
        hints: ['The one on his planet.', 'Key words: flower / rose'],
        hintsKo: ['그의 별에 있는 그것.', '핵심 단어: flower / rose'],
        reply: { speaker: 'Narrator', line: 'And at daybreak I found the well.' }
      }
    ]
  },
  {
    num: 25, title: 'The Well', ko: '우물',
    summary: 'The well has a pulley like a village well, and its water is good for the heart.',
    summaryKo: '마을 우물처럼 도르래가 달린 우물의 물은 마음에 좋은 물이었습니다.',
    scenes: [
      {
        role: 'prince',
        situation: 'In the middle of the desert stands a well with a pulley and a bucket, like a village well. The pilot hauls up the bucket. You are thirsty.',
        situationKo: '사막 한가운데 마을 우물처럼 도르래와 두레박이 있는 우물이 있습니다. 조종사가 두레박을 끌어 올립니다. 당신은 목이 마릅니다.',
        speaker: 'The pilot', line: '(pulls up the bucket, panting)',
        prompt: 'Say you want to drink this water. Ask him to give you some.',
        promptKo: '이 물을 마시고 싶다고, 마시게 해 달라고 말해 보세요.',
        answers: [{ any: ['drink', 'thirsty', 'water'] }],
        model: 'I am thirsty for this water. Give me some of it to drink.',
        distractors: ['I am tired of this desert. Take me home.', 'Put the bucket down. I am not hungry.', 'Is this the well the merchant sells pills for?'],
        hints: ['Thirsty; drink.', 'Key words: drink / thirsty'],
        hintsKo: ['목이 마르다(thirsty), 마시고 싶다(drink).', '핵심 단어: drink / thirsty'],
        reply: { speaker: 'The pilot', line: '(raises the bucket to his lips) It was as sweet as some special festival treat.' }
      },
      {
        role: 'prince',
        situation: 'You say that people on Earth grow five thousand roses in one garden and still do not find what they are looking for, though it could be found in a single rose or a little water.',
        situationKo: '당신은 말합니다. 지구 사람들은 한 정원에 장미 오천 송이를 기르면서도 거기서 찾는 것을 찾지 못한다고. 찾는 것은 장미 한 송이나 물 한 모금에서 찾을 수 있는데도요.',
        speaker: 'The pilot', line: 'Yes, that is true.',
        prompt: 'Go on: "But the eyes are blind. One must look with the ______."',
        promptKo: '이어서 말해 보세요. "But the eyes are blind. One must look with the ______."',
        answers: [{ any: ['heart'] }],
        model: 'But the eyes are blind. One must look with the heart.',
        distractors: ['But the eyes are blind. One must look with a lamp.', 'But the eyes are blind. One must look with a map.', 'But the eyes are blind. One must look with glasses.'],
        hints: ['Remember the fox\'s secret.', 'Key word: heart'],
        hintsKo: ['여우가 가르쳐 준 비밀을 떠올리세요.', '핵심 단어: heart'],
        reply: { speaker: 'The little prince', line: 'You must keep your promise. … A muzzle for my sheep. I am responsible for this flower.' }
      }
    ]
  },
  {
    num: 26, title: 'The Stars That Laugh', ko: '웃는 별들',
    summary: 'The little prince prepares to return to his planet, and gives the pilot stars that know how to laugh.',
    summaryKo: '어린 왕자는 자기 별로 돌아갈 준비를 합니다. 조종사에게는 웃을 줄 아는 별들을 선물합니다.',
    scenes: [
      {
        role: 'pilot',
        situation: 'The next evening you find the little prince sitting on an old stone wall, talking to someone. Below is a yellow snake. You chase it off and lift him down. He says he goes back to his star tonight.',
        situationKo: '이튿날 저녁, 낡은 돌담 위에 앉은 어린 왕자가 누군가와 이야기하고 있습니다. 담 아래 노란 뱀이 있습니다. 당신은 뱀을 쫓고 어린 왕자를 안아 내립니다. 그는 오늘 밤 별로 돌아간다고 합니다.',
        speaker: 'The little prince', line: 'Tonight it will be a year. My star will be right above the place where I came down.',
        prompt: 'Tell him you will not leave him; you will stay by his side.',
        promptKo: '어린 왕자를 떠나보내지 않겠다고, 곁에 있겠다고 말해 보세요.',
        answers: [{ all: ['not', 'leave'] }, { all: ['stay'] }, { all: ['not', 'go'] }, { all: ['with', 'you'] }, { all: ['never', 'leave'] }],
        model: 'I shall not leave you.',
        distractors: ['I shall go back to my airplane now.', 'I shall tell the grown-ups about you.', 'I shall count the days until you return.'],
        hints: ['"I will not leave you."', 'Key words: not leave / stay'],
        hintsKo: ['"나는 너를 떠나지(leave) 않을(not) 거야."', '핵심 단어: not leave / stay'],
        reply: { speaker: 'The little prince', line: 'Little man, I want to hear you laugh again…' }
      },
      {
        role: 'pilot',
        situation: 'He gives you a present. The stars mean different things to different people: guides for travellers, problems for scholars, gold for businessmen. But for you the stars will be something else.',
        situationKo: '어린 왕자가 선물을 줍니다. 사람마다 별은 다른 것이라고요. 여행자에겐 길잡이, 학자에겐 문제, 사업가에겐 금. 하지만 당신에게 별은 다른 것이 될 거라고.',
        speaker: 'The little prince', line: 'In one of the stars I shall be living. In one of them I shall be ______.',
        prompt: 'Fill in the blank: what he will be doing on his star, and what makes your stars special.',
        promptKo: '빈칸을 채워 보세요. 어린 왕자가 그 별에서 하고 있을 일, 그래서 당신만 가지게 될 별들의 특별함.',
        answers: [{ any: ['laughing', 'laugh', 'laughs'] }],
        model: 'In one of them I shall be laughing. And so it will be as if all the stars were laughing, when you look at the sky at night.',
        distractors: ['In one of them I shall be counting.', 'In one of them I shall be sleeping.', 'In one of them I shall be drinking.'],
        hints: ['A sound like little bells; something the little prince does well.', 'Key word: laughing'],
        hintsKo: ['방울처럼 울리는 소리. 어린 왕자가 잘하는 것.', '핵심 단어: laughing'],
        reply: { speaker: 'The little prince', line: 'You, only you, will have stars that can laugh!' }
      },
      {
        role: 'pilot',
        situation: 'He will look as if he were dead, he says, but it will not be true; his body is only too heavy to carry. If you love a flower that lives on a star, then…',
        situationKo: '어린 왕자는 말합니다. 자기가 죽은 것처럼 보이겠지만 그것은 사실이 아니라고. 몸은 너무 무거워서 가져갈 수 없을 뿐이라고. 별이 사는 별에서 꽃을 사랑하면 밤하늘을 보는 것이 달콤해진다고.',
        speaker: 'The little prince', line: 'It is like the flower. If you love a flower that lives on a star…',
        prompt: 'Go on: what becomes sweet at night? "…it is sweet to look at the ______ at night."',
        promptKo: '이어서 말해 보세요. 밤에 하늘을 바라보는 일은 어떻게 될까요? "…it is sweet to look at the ______ at night."',
        answers: [{ any: ['sky', 'stars', 'heavens'] }],
        model: 'If you love a flower that lives on a star, it is sweet to look at the sky at night. All the stars are a-bloom with flowers.',
        distractors: ['…it is sweet to look at the engine at night.', '…it is sweet to look at the wall at night.', '…it is sweet to look at the bank at night.'],
        hints: ['The place you look up at, at night.', 'Key word: sky'],
        hintsKo: ['밤에 올려다보는 곳.', '핵심 단어: sky'],
        reply: { speaker: 'Narrator', line: 'There was nothing but a flash of yellow close to his ankle. He fell as gently as a tree falls.' }
      }
    ]
  },
  {
    num: 27, title: 'Six Years Later', ko: '여섯 해가 지나고',
    summary: 'Every night the pilot listens to the stars laughing, and leaves the reader a request.',
    summaryKo: '조종사는 밤마다 별들의 웃음소리를 듣습니다. 그리고 독자에게 부탁을 남깁니다.',
    scenes: [
      {
        role: 'pilot',
        situation: 'Six years have passed. You forgot to draw a leather strap on the sheep\'s muzzle. So every night you look at the stars and wonder.',
        situationKo: '여섯 해가 흘렀습니다. 당신은 양에게 그려 준 입마개에 가죽끈을 다는 것을 깜박했습니다. 그래서 밤마다 별을 보며 자문합니다.',
        speaker: 'Narrator', line: 'Look up at the sky and ask yourselves: is it yes or no?',
        prompt: 'Has the sheep eaten the flower, or not? Write your answer in English.',
        promptKo: '양이 꽃을 먹었을까요, 먹지 않았을까요? 당신의 대답을 영어로 적어 보세요.',
        answers: [{ any: ['yes', 'no', 'never', 'not', 'did', 'maybe', 'perhaps', 'hope', 'eaten', 'ate', 'eat'] }],
        model: 'Has the sheep eaten the flower? … Is it yes or no?',
        distractors: ['The sheep is a hat.', 'Five hundred and one million.', 'Draw me another sheep.'],
        hints: ['There is no wrong answer: yes, no, or what you hope.', 'Key words: yes / no'],
        hintsKo: ['정답은 없습니다. yes 또는 no, 혹은 당신의 바람을 적으세요.', '핵심 단어: yes / no'],
        reply: { speaker: 'Narrator', line: 'And you will see how everything changes… And no grown-up will ever understand that this is a matter of so much importance!' }
      },
      {
        role: 'pilot',
        situation: 'One last request. If you ever travel through the African desert and meet a child who laughs, with golden hair, who refuses to answer questions, please write. What news should the reader send?',
        situationKo: '마지막 부탁입니다. 언젠가 아프리카 사막을 여행하다가 웃는 아이를, 금빛 머리에 질문에는 대답하지 않는 아이를 만난다면 당신에게 편지를 보내 달라고. 무슨 소식을 전해 달라고 하나요?',
        speaker: 'Narrator', line: 'If this should happen, please comfort me. Send me word that…',
        prompt: 'Write the news in English: "He has come back."',
        promptKo: '그 소식을 영어로 적어 보세요. "그가 돌아왔다."',
        answers: [{ any: ['come back', 'came back', 'has come back', 'returned', 'return', 'is back', 'back', 'came home', 'come home'] }],
        model: 'Send me word that he has come back.',
        distractors: ['Send me word that the sheep is well.', 'Send me word that the engine is repaired.', 'Send me word that the stars have been counted.'],
        hints: ['To come back; to return.', 'Key words: come back'],
        hintsKo: ['돌아오다: come back / return', '핵심 단어: come back'],
        reply: { speaker: 'Narrator', line: 'This is, to me, the loveliest and saddest landscape in the world.' }
      }
    ]
  }
];

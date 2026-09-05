/* Grimms' Fairy Tales (Jacob and Wilhelm Grimm — Project Gutenberg #2591, the Edgar Taylor /
   Marian Edwardes translation, public domain). Game data for a selection of 12 tales.
   Field reference: books/README.md. Situations, prompts, hints and distractors are original;
   quoted lines are short paraphrases of the tale. */
window.LP_ROLES = {
  gretel: { en: 'You are Gretel. ', ko: '당신은 그레텔입니다. ' },
  rapunzel: { en: 'You are Rapunzel. ', ko: '당신은 라푼젤입니다. ' },
  prince: { en: "You are the king's son. ", ko: '당신은 왕자입니다. ' },
  millersdaughter: { en: "You are the miller's daughter. ", ko: '당신은 방앗간 집 딸입니다. ' },
  princess: { en: 'You are the youngest princess. ', ko: '당신은 막내 공주입니다. ' },
  queen: { en: 'You are the Queen. ', ko: '당신은 왕비입니다. ' },
  snowdrop: { en: 'You are Snowdrop. ', ko: '당신은 백설 공주입니다. ' },
  ashputtel: { en: 'You are Ashputtel. ', ko: '당신은 재투성이 아가씨입니다. ' },
  redcap: { en: 'You are Little Red-Cap. ', ko: '당신은 빨간 모자입니다. ' },
  dummling: { en: 'You are Dummling, the youngest son. ', ko: '당신은 막내아들 덤링입니다. ' },
  donkey: { en: 'You are the old ass. ', ko: '당신은 늙은 당나귀입니다. ' },
  shoemaker: { en: 'You are the shoemaker. ', ko: '당신은 구두장이입니다. ' },
  briarrose: { en: 'You are Briar Rose. ', ko: '당신은 들장미 공주입니다. ' },
  fisherman: { en: 'You are the fisherman. ', ko: '당신은 어부입니다. ' }
};
window.LP_SCENES = [
  {
    num: 1, title: 'Hansel and Gretel', ko: '헨젤과 그레텔',
    summary: 'Two children are left in the wood, find a house of bread and sugar, and outwit the old witch who lives in it.',
    summaryKo: '숲에 버려진 두 아이가 빵과 설탕으로 지은 집을 찾아내고, 그 집에 사는 늙은 마녀를 꾀로 이깁니다.',
    scenes: [
      {
        role: 'gretel',
        situation: 'It is late at night in the woodcutter’s hut. You and your brother are too hungry to sleep, and through the thin wall you have just heard your parents agree to leave you both in the forest tomorrow.',
        situationKo: '나무꾼의 오두막, 깊은 밤입니다. 너무 배가 고파 잠이 오지 않는데, 얇은 벽 너머로 내일 두 아이를 숲에 버리자는 부모님의 말이 들려왔습니다.',
        speaker: 'Hansel', line: 'Do not cry, Gretel. Go to sleep. I will take care of us.',
        prompt: 'Ask your brother how you will ever find the way home again.',
        promptKo: '집으로 돌아오는 길을 어떻게 찾을 거냐고 오빠에게 물어보세요.',
        answers: [{ any: ['home', 'back', 'way', 'find'] }],
        model: 'But how will we find the way home again?',
        distractors: ['But how will we carry all the firewood?', 'But who will feed the cat while we are gone?', 'But may I take my little bed with me?'],
        hints: ['You are afraid of being lost, not of being tired.', 'Key words: way / home / find'],
        hintsKo: ['피곤한 것보다 길을 잃는 것이 무섭습니다.', '핵심 단어: way / home / find'],
        reply: { speaker: 'Hansel', line: 'When the moon rose he crept outside and filled his pockets with white pebbles. Then he came back and said: Sleep now, God will not forsake us.' }
      },
      {
        role: 'gretel',
        situation: 'The second time you are led into the wood the birds eat the crumbs, and you wander for three days. Then, on a little hill, you find a cottage built of bread, roofed with cake and windowed with clear sugar. You have both begun to eat.',
        situationKo: '두 번째로 숲에 끌려갔을 때는 새들이 빵 부스러기를 먹어 버려 사흘을 헤맵니다. 그러다 작은 언덕에서 빵으로 짓고 과자로 지붕을 얹고 설탕으로 창을 낸 집을 발견해, 둘은 그것을 뜯어 먹기 시작합니다.',
        speaker: 'A thin voice inside', line: 'Nibble, nibble, little mouse — who is nibbling at my house?',
        prompt: 'Answer the voice with the children’s innocent little rhyme about the wind.',
        promptKo: '아이들이 둘러대는 순진한 노래로, 바람 탓이라고 대답하세요.',
        answers: [{ any: ['wind', 'heaven', 'sky'] }],
        model: 'The wind, the wind, the child of heaven.',
        distractors: ['A hungry bear, a hungry bear from the forest.', 'Nobody at all, we are only passing by.', 'Two children who have eaten your roof, madam.'],
        hints: ['Blame the weather, not yourselves.', 'Key words: wind / heaven'],
        hintsKo: ['자기들이 아니라 날씨 탓으로 돌리세요.', '핵심 단어: wind / heaven'],
        reply: { speaker: 'Narrator', line: 'The door opened, and a very old woman came creeping out on a crutch. She smiled, and led you both in to milk, pancakes, apples and nuts.' }
      },
      {
        role: 'gretel',
        situation: 'The old woman is a witch. Hansel is shut in a stable, and you have been made to carry water and cook. Now the oven is hot, and she wants you to climb inside to test it — but you have seen the flames.',
        situationKo: '노파는 마녀였습니다. 헨젤은 우리에 갇히고, 당신은 물을 긷고 요리를 해야 합니다. 이제 화덕이 달아올랐고, 마녀는 당신더러 안에 들어가 살펴보라고 합니다. 하지만 당신은 그 불길을 보았습니다.',
        speaker: 'The witch', line: 'Creep in and see if the oven is properly hot for the bread.',
        prompt: 'Pretend to be too stupid to understand, and ask her to show you how.',
        promptKo: '못 알아듣는 척하면서, 어떻게 하는지 보여 달라고 하세요.',
        answers: [{ any: ['show', 'how', 'do not know', 'cannot'] }],
        model: 'I do not know how. Show me first, and then I will do it.',
        distractors: ['Very well, I will climb in at once.', 'The bread is already burnt, so I need not look.', 'My brother is much better at ovens than I am.'],
        hints: ['Make her go first.', 'Key words: show me / how'],
        hintsKo: ['마녀가 먼저 들어가게 만드세요.', '핵심 단어: show me / how'],
        reply: { speaker: 'Narrator', line: 'The witch grumbled, put her head into the oven — and you gave her a push and shut the iron door. Then you ran to free Hansel, and you filled your pockets with her pearls.' }
      }
    ]
  },
  {
    num: 2, title: 'Rapunzel', ko: '라푼젤',
    summary: 'A girl with long golden hair is shut in a doorless tower by an enchantress, until a king’s son learns how to climb up to her.',
    summaryKo: '긴 금발의 소녀가 마녀에 의해 문 없는 탑에 갇히지만, 한 왕자가 그곳에 오르는 방법을 알아냅니다.',
    scenes: [
      {
        role: 'prince',
        situation: 'Riding in the forest you heard a voice so sweet that you stopped your horse. Hidden behind a tree, you have watched an old enchantress stand at the foot of a tower with no door and no stair, and call up to the one small window.',
        situationKo: '숲을 말을 타고 지나다 너무나 아름다운 노랫소리에 발을 멈췄습니다. 나무 뒤에 숨어, 늙은 마녀가 문도 계단도 없는 탑 아래에서 하나뿐인 작은 창을 향해 외치는 것을 보았습니다.',
        speaker: 'Narrator', line: 'The old woman has gone. The tower is quiet. You come out from behind the tree.',
        prompt: 'Call up to the window exactly as the old woman did.',
        promptKo: '노파가 했던 것과 똑같이 창문을 향해 외쳐 보세요.',
        answers: [{ all: ['rapunzel'], any: ['hair', 'down', 'let'] }, { all: ['hair'], any: ['down', 'let', 'throw'] }],
        model: 'Rapunzel, Rapunzel, let down your hair!',
        distractors: ['Rapunzel, Rapunzel, open the great door!', 'Rapunzel, Rapunzel, throw me the key!', 'Guard of the tower, lower the drawbridge!'],
        hints: ['She has no stair — only twenty ells of braided gold.', 'Key words: hair / let down'],
        hintsKo: ['탑에는 계단이 없고, 스무 발 길이의 금빛 머리채만 있습니다.', '핵심 단어: hair / let down'],
        reply: { speaker: 'Narrator', line: 'The long braid came tumbling down, and you climbed up. Rapunzel was terribly frightened, for she had never seen a man before.' }
      },
      {
        role: 'rapunzel',
        situation: 'A young man is standing in your little room. He is not the old woman, and he is not angry. He speaks kindly, and your fear begins to go away.',
        situationKo: '작은 방에 젊은 남자가 서 있습니다. 노파도 아니고, 화가 난 것도 아닙니다. 다정하게 말을 걸어오자 두려움이 조금씩 사라집니다.',
        speaker: 'The king’s son', line: 'Your singing gave me no rest. Will you take me for your husband?',
        prompt: 'Say you will go with him, and ask him to bring silk each visit so you can weave a ladder.',
        promptKo: '함께 가겠다고 말하고, 사다리를 짤 수 있게 올 때마다 비단실을 가져다 달라고 부탁하세요.',
        answers: [{ all: ['silk'] }, { all: ['ladder'] }, { any: ['go with you', 'come with you', 'i will go'] }],
        model: 'I will go with you. Bring me a skein of silk each time you come.',
        distractors: ['I will stay in this tower until the old woman dies.', 'Bring me a hundred candles and a golden comb.', 'Go away and never climb my hair again.'],
        hints: ['Silk can be woven into something you can climb down.', 'Key words: silk / ladder'],
        hintsKo: ['비단실을 엮으면 타고 내려갈 것을 만들 수 있습니다.', '핵심 단어: silk / ladder'],
        reply: { speaker: 'The king’s son', line: 'He came every evening, for the old woman came only by day, and the ladder grew longer week by week.' }
      },
      {
        role: 'rapunzel',
        situation: 'One morning the enchantress climbs up as usual. You are thinking of the evenings, of the ladder, of the young man — and without meaning to, you say something out loud.',
        situationKo: '어느 아침, 마녀가 여느 때처럼 머리채를 타고 올라옵니다. 저녁 시간과 사다리와 그 젊은이를 생각하다가, 그만 무심코 말이 튀어나옵니다.',
        speaker: 'Dame Gothel', line: 'There. Now brush my hair, child, as you always do.',
        prompt: 'Let slip the careless question that compares her with the young prince.',
        promptKo: '젊은 왕자와 마녀를 비교하는 부주의한 질문이 그만 새어 나오게 하세요.',
        answers: [{ any: ['prince', 'heavier', 'heavy'] }],
        model: 'How is it that you are so much heavier to draw up than the young prince?',
        distractors: ['How is it that you never bring me any bread?', 'Why does the sun never come into this window?', 'Shall I cut my hair short for the summer?'],
        hints: ['You accidentally mention the other visitor.', 'Key words: heavier / prince'],
        hintsKo: ['다른 방문자 이야기를 그만 입 밖에 냅니다.', '핵심 단어: heavier / prince'],
        reply: { speaker: 'Dame Gothel', line: 'Wicked child! I thought I had shut you away from the whole world, and yet you have deceived me! She cut off the braid that very hour.' }
      }
    ]
  },
  {
    num: 3, title: 'Rumpelstiltskin', ko: '룸펠슈틸츠헨',
    summary: 'A boastful miller says his daughter can spin straw into gold, and a strange little man does it for her — for a terrible price.',
    summaryKo: '허풍쟁이 방앗간 주인이 딸더러 짚을 금으로 자을 수 있다고 떠벌리고, 이상한 난쟁이가 무서운 대가를 받고 대신 그 일을 해 줍니다.',
    scenes: [
      {
        role: 'millersdaughter',
        situation: 'For the third night the King has shut you in a room full of straw. You gave the little man your necklace the first night and your ring the second. Now he stands before the wheel again, waiting.',
        situationKo: '왕은 사흘째 밤에도 당신을 짚으로 가득한 방에 가두었습니다. 첫날 밤에는 목걸이를, 둘째 날 밤에는 반지를 난쟁이에게 주었습니다. 이제 그가 다시 물레 앞에 서서 기다립니다.',
        speaker: 'The little man', line: 'What will you give me this time, if I spin the straw for you?',
        prompt: 'Tell him honestly that you have nothing left to give.',
        promptKo: '이제 줄 것이 아무것도 남지 않았다고 솔직히 말하세요.',
        answers: [{ any: ['nothing', 'no more', 'nothing left'] }],
        model: 'I have nothing left that I could give you.',
        distractors: ['I will give you my father’s mill and all his meal.', 'Take the King’s crown from the table over there.', 'I have three more rings hidden in my shoe.'],
        hints: ['The necklace and the ring are already gone.', 'Key word: nothing'],
        hintsKo: ['목걸이도 반지도 이미 주었습니다.', '핵심 단어: nothing'],
        reply: { speaker: 'The little man', line: 'Then promise me your first child, when you are queen. And the wheel went whirr, whirr, whirr, and by morning all the straw was gold.' }
      },
      {
        role: 'millersdaughter',
        situation: 'You are Queen now, and your first child has been born. You had forgotten the little man entirely — until this morning, when he walked into your chamber and asked for what you promised.',
        situationKo: '이제 당신은 왕비이고 첫아이가 태어났습니다. 난쟁이는 까맣게 잊고 있었는데, 오늘 아침 그가 방으로 들어와 약속한 것을 내놓으라고 합니다.',
        speaker: 'The little man', line: 'Something living is dearer to me than all the treasures in the world.',
        prompt: 'Offer him anything else you own, but beg him to leave you your child.',
        promptKo: '가진 것은 무엇이든 주겠으니 아이만은 남겨 달라고 애원하세요.',
        answers: [{ all: ['child'] }, { all: ['baby'] }, { any: ['riches', 'kingdom', 'treasure'] }],
        model: 'Take all the riches of the kingdom, but leave me my child.',
        distractors: ['A promise is a promise. Here, take him.', 'Then spin me one more room of gold first.', 'Guards! Throw this little man into the river.'],
        hints: ['Offer gold instead of the baby.', 'Key words: child / riches'],
        hintsKo: ['아이 대신 금은보화를 주겠다고 하세요.', '핵심 단어: child / riches'],
        reply: { speaker: 'The little man', line: 'No. But I will give you three days. If by then you know my name, you shall keep your child.' }
      },
      {
        role: 'millersdaughter',
        situation: 'Two days of names have failed. But last night a messenger came back from a high hill in the wood, where he saw a little man hopping round a fire and singing his own name aloud. It is the third day.',
        situationKo: '이틀 동안 대 본 이름은 모두 빗나갔습니다. 그런데 어젯밤, 숲속 높은 언덕에서 난쟁이가 불 주위를 뛰며 제 이름을 소리 내어 노래하는 것을 본 심부름꾼이 돌아왔습니다. 오늘이 사흘째입니다.',
        speaker: 'The little man', line: 'Now, lady Queen, tell me: what is my name?',
        prompt: 'Say the name the messenger heard by the fire in the wood.',
        promptKo: '심부름꾼이 숲속 불가에서 들은 그 이름을 말하세요.',
        answers: [{ any: ['rumpelstiltskin', 'rumplestiltskin', 'rumpelstilzchen'] }],
        model: 'Is your name Rumpelstiltskin?',
        distractors: ['Is your name Conrad?', 'Is your name Harry the spinner?', 'Is your name Dame Gothel?'],
        hints: ['A long, strange, hopping sort of name.', 'Key word: Rumpelstiltskin'],
        hintsKo: ['길고 이상한, 껑충거리는 듯한 이름입니다.', '핵심 단어: Rumpelstiltskin'],
        reply: { speaker: 'The little man', line: 'The devil has told you that! he screamed, and in his rage he stamped so hard that he could not pull his foot out again.' }
      }
    ]
  },
  {
    num: 4, title: 'The Frog-Prince', ko: '개구리 왕자',
    summary: 'A princess drops her golden ball into a well and makes a promise to a frog — a promise her father makes her keep.',
    summaryKo: '공주가 금 공을 우물에 빠뜨리고 개구리와 약속을 하는데, 아버지인 왕이 그 약속을 지키게 만듭니다.',
    scenes: [
      {
        role: 'princess',
        situation: 'Your golden ball has rolled into the deep well by the linden tree, and you are crying beside it. A fat, ugly frog has put his head out of the water and asked what is the matter.',
        situationKo: '보리수 옆 깊은 우물에 금 공이 굴러 들어가, 그 옆에서 울고 있습니다. 뚱뚱하고 못생긴 개구리가 물 밖으로 머리를 내밀고 무슨 일이냐고 묻습니다.',
        speaker: 'The frog', line: 'I can fetch your ball. But what will you give me if I bring it up?',
        prompt: 'Promise him whatever he likes — your clothes, your pearls, your crown.',
        promptKo: '옷이든 진주든 왕관이든, 무엇이든 주겠다고 약속하세요.',
        answers: [{ any: ['anything', 'whatever', 'pearls', 'crown', 'jewels'] }],
        model: 'Anything you like, dear frog — my pearls and my golden crown.',
        distractors: ['Nothing at all. Frogs cannot swim so deep.', 'I shall give you a fine dinner of flies.', 'My father will send a servant with a net instead.'],
        hints: ['You would say anything to get the ball back.', 'Key words: anything / pearls / crown'],
        hintsKo: ['공만 되찾을 수 있다면 무엇이든 말할 참입니다.', '핵심 단어: anything / pearls / crown'],
        reply: { speaker: 'The frog', line: 'I care nothing for those. But if you will love me and let me be your companion, I will bring you your ball.' }
      },
      {
        role: 'princess',
        situation: 'You took the ball and ran home, and forgot the frog at once. Now you are at dinner in the great hall when something comes splish-splash up the marble stair, knocks, and calls your name. You slam the door and sit down, white in the face.',
        situationKo: '공을 받자마자 집으로 달려와 개구리는 곧장 잊어버렸습니다. 그런데 큰 홀에서 저녁을 먹는데, 무언가가 첨벙첨벙 대리석 계단을 올라와 문을 두드리며 이름을 부릅니다. 당신은 문을 쾅 닫고 새파랗게 질려 앉습니다.',
        speaker: 'The King', line: 'My child, why are you so frightened? Is there a giant at the door?',
        prompt: 'Confess to your father who is really outside, and what you promised him.',
        promptKo: '문밖에 있는 것이 무엇인지, 그리고 무슨 약속을 했는지 아버지께 고백하세요.',
        answers: [{ all: ['frog'] }],
        model: 'No, father. It is a frog, and I promised to let him in.',
        distractors: ['No, father. It is only the wind on the stair.', 'Yes, father, a giant with a golden ball.', 'It is the gardener, come about the linden tree.'],
        hints: ['Name the creature from the well.', 'Key word: frog'],
        hintsKo: ['우물에서 나온 그 동물의 이름을 말하세요.', '핵심 단어: frog'],
        reply: { speaker: 'The King', line: 'That which you have promised must you perform. Go and let him in.' }
      },
      {
        role: 'princess',
        situation: 'The frog is on the table beside your golden plate. He has eaten from it, and now he says he is tired and wants to be carried up to your little bed. Your father is watching you from the head of the table.',
        situationKo: '개구리가 금 접시 옆 식탁 위에 앉아 있습니다. 접시에 든 것을 먹더니 이제 피곤하다며 당신의 작은 침대로 데려가 달라고 합니다. 아버지는 식탁 상석에서 당신을 지켜보고 있습니다.',
        speaker: 'The frog', line: 'I have eaten enough. Now carry me upstairs, for I am tired.',
        prompt: 'You do not want to — but say that a promise must be kept, and take him up.',
        promptKo: '하기 싫지만, 약속은 지켜야 한다고 말하고 그를 데려가세요.',
        answers: [{ any: ['promise', 'promised', 'keep', 'kept'] }],
        model: 'A promise is a promise. Come, I will carry you up.',
        distractors: ['Sleep in the well, where frogs belong.', 'The cook shall carry you up instead of me.', 'First tell me where the rest of my pearls are.'],
        hints: ['Your father already said the rule out loud.', 'Key word: promise'],
        hintsKo: ['아버지가 이미 그 원칙을 소리 내어 말했습니다.', '핵심 단어: promise'],
        reply: { speaker: 'Narrator', line: 'In the morning there was no frog by the bed, but a young prince with kind eyes, freed at last from a wicked witch’s spell.' }
      }
    ]
  },
  {
    num: 5, title: 'Snowdrop', ko: '백설 공주',
    summary: 'A queen asks her looking-glass who is fairest, and hunts the child who is fairer — but seven dwarfs and a king’s son are on the child’s side.',
    summaryKo: '왕비가 거울에게 누가 가장 아름다우냐고 묻고, 자기보다 아름다운 아이를 쫓습니다. 하지만 일곱 난쟁이와 한 왕자가 그 아이의 편입니다.',
    scenes: [
      {
        role: 'queen',
        situation: 'Every morning you stand before the wonderful looking-glass on the wall. It has never told you a lie, and this morning, as always, it is waiting for your question.',
        situationKo: '아침마다 벽에 걸린 신기한 거울 앞에 섭니다. 그 거울은 한 번도 거짓을 말한 적이 없고, 오늘 아침에도 여느 때처럼 당신의 질문을 기다리고 있습니다.',
        speaker: 'The looking-glass', line: 'I am here, my Queen. Ask, and I will answer truly.',
        prompt: 'Ask the glass the question you ask every morning: who is the fairest of all?',
        promptKo: '매일 아침 묻는 그 질문을 거울에게 하세요. 누가 가장 아름다우냐고요.',
        answers: [{ any: ['fairest', 'fair', 'most beautiful', 'prettiest'] }],
        model: 'Tell me, glass, who is the fairest of all?',
        distractors: ['Tell me, glass, where my crown is hidden.', 'Tell me, glass, what the weather will be.', 'Tell me, glass, how old the King is now.'],
        hints: ['You always ask about beauty, never about anything useful.', 'Key word: fairest'],
        hintsKo: ['늘 아름다움만 묻지, 쓸모 있는 것은 묻지 않습니다.', '핵심 단어: fairest'],
        reply: { speaker: 'The looking-glass', line: 'Thou, Queen, art the fairest here — but Snowdrop, over the seven hills, is a thousand times more fair than thou.' }
      },
      {
        role: 'snowdrop',
        situation: 'The huntsman let you run, and you have wandered all day until you found a tiny cottage. You ate a little from each of the seven plates and fell asleep in the seventh little bed. Now seven small men are standing round you with their lamps.',
        situationKo: '사냥꾼이 놓아주어 온종일 헤매다 아주 작은 오두막을 찾았습니다. 일곱 접시에서 조금씩 먹고 일곱 번째 작은 침대에서 잠들었는데, 이제 작은 남자 일곱이 등불을 들고 당신을 둘러싸고 있습니다.',
        speaker: 'The seven dwarfs', line: 'Who are you? And how did you come into our house?',
        prompt: 'Tell them your name and why you ran away from home.',
        promptKo: '이름을 말하고, 왜 집에서 도망쳐 나왔는지 이야기하세요.',
        answers: [{ all: ['snowdrop'] }, { any: ['stepmother', 'queen', 'kill'] }],
        model: 'My name is Snowdrop. My stepmother wished to have me killed.',
        distractors: ['I am a rich lady come to buy your mountain.', 'I am nobody. I will go away at once.', 'I am the huntsman’s daughter, looking for our dog.'],
        hints: ['Give your name first, then the reason.', 'Key words: Snowdrop / stepmother'],
        hintsKo: ['먼저 이름을 말하고, 그다음 이유를 말하세요.', '핵심 단어: Snowdrop / stepmother'],
        reply: { speaker: 'The seven dwarfs', line: 'If you will keep our house for us, you shall stay. But take care, and let no one in while we are at the mountain.' }
      },
      {
        role: 'snowdrop',
        situation: 'The dwarfs have gone to dig, and you are alone. An old pedlar woman is at the window with a basket. She has come twice before with laces and a comb, and both times you were nearly lost.',
        situationKo: '난쟁이들은 광산으로 떠나고 당신 혼자입니다. 늙은 행상 여인이 바구니를 들고 창가에 서 있습니다. 전에도 두 번, 끈과 빗을 들고 찾아왔고 그때마다 당신은 하마터면 죽을 뻔했습니다.',
        speaker: 'The old pedlar woman', line: 'Fine wares to sell! Will you not taste this pretty red apple?',
        prompt: 'Remember the dwarfs’ warning and refuse to let her in or take anything.',
        promptKo: '난쟁이들의 경고를 떠올리고, 들이지도 받지도 않겠다고 거절하세요.',
        answers: [{ any: ['not', 'no one', 'nobody', 'cannot', 'never'] }],
        model: 'I dare not take anything. The dwarfs told me to let no one in.',
        distractors: ['Thank you, I will eat the red half at once.', 'Come in and rest by the fire, good mother.', 'Leave the basket on the step and I will pay you later.'],
        hints: ['Twice was enough. Say no this time.', 'Key words: dare not / no one'],
        hintsKo: ['두 번이면 충분합니다. 이번에는 거절하세요.', '핵심 단어: dare not / no one'],
        reply: { speaker: 'The old pedlar woman', line: 'Silly girl, are you afraid of poison? See — I will eat the white half myself. But the red half was poisoned, and she held it out to you.' }
      }
    ]
  },
  {
    num: 6, title: 'Ashputtel', ko: '재투성이 아가씨 (신데렐라)',
    summary: 'A girl kept among the ashes is dressed by a bird from her mother’s hazel tree, and loses one golden slipper on the palace stair.',
    summaryKo: '재 속에서 지내던 소녀가 어머니 무덤의 개암나무에 사는 새에게 옷을 얻어 입고, 궁전 계단에 금 신 한 짝을 떨어뜨립니다.',
    scenes: [
      {
        role: 'ashputtel',
        situation: 'The King has proclaimed a three-day feast so his son may choose a bride. Your two stepsisters are having their hair curled and their shoes buckled, and you are sweeping the hearth in your grey smock.',
        situationKo: '왕이 아들의 신붓감을 고르려고 사흘간의 잔치를 연다고 알렸습니다. 두 의붓언니는 머리를 말고 구두를 조이는데, 당신은 잿빛 옷을 입고 벽난로를 쓸고 있습니다.',
        speaker: 'The stepmother', line: 'You, Ashputtel? You have no clothes and no shoes, and you cannot dance.',
        prompt: 'Ask her, politely but plainly, to let you go to the feast as well.',
        promptKo: '공손하지만 분명하게, 당신도 잔치에 가게 해 달라고 청하세요.',
        answers: [{ all: ['go'] }, { any: ['feast', 'ball', 'dance'] }],
        model: 'Please let me go to the feast too.',
        distractors: ['Please let me sleep by the fire tonight.', 'Please buy me a new broom for the hearth.', 'Please tell the prince I am ill.'],
        hints: ['Just ask for permission to go.', 'Key words: let me go / feast'],
        hintsKo: ['가도 되는지 허락을 구하세요.', '핵심 단어: let me go / feast'],
        reply: { speaker: 'The stepmother', line: 'She threw a dishful of peas into the ashes. Pick them out in two hours and you may go. Then two white pigeons came in at the window.' }
      },
      {
        role: 'ashputtel',
        situation: 'The peas are picked out, but your stepmother has driven off without you. You go to the little hazel tree on your mother’s grave, where a white bird always answers you.',
        situationKo: '완두콩은 다 골라냈지만, 계모는 당신을 두고 떠나 버렸습니다. 당신은 어머니 무덤의 작은 개암나무로 갑니다. 그곳의 흰 새는 언제나 당신에게 응답해 주었습니다.',
        speaker: 'The white bird', line: 'What do you want, Ashputtel? Speak, and I will hear you.',
        prompt: 'Ask the tree to shake down a dress of gold and silver so you can go.',
        promptKo: '잔치에 갈 수 있게 금과 은으로 된 옷을 흔들어 떨어뜨려 달라고 나무에게 청하세요.',
        answers: [{ any: ['dress', 'gold', 'silver', 'clothes', 'gown'] }],
        model: 'Little tree, shake and shower gold and silver over me.',
        distractors: ['Little tree, shake and shower ripe nuts over me.', 'Little tree, tell my stepmother to come back.', 'Little tree, keep the pigeons away from the peas.'],
        hints: ['You need something to wear, not something to eat.', 'Key words: gold / silver / dress'],
        hintsKo: ['먹을 것이 아니라 입을 것이 필요합니다.', '핵심 단어: gold / silver / dress'],
        reply: { speaker: 'Narrator', line: 'The bird threw down a dress of gold and silver, and slippers embroidered with silk. You dressed, and no one at the feast knew you.' }
      },
      {
        role: 'ashputtel',
        situation: 'One golden slipper stuck fast to the pitch on the palace stair. Now the king’s son has come to your house with it. Both stepsisters have cut a toe and a heel to squeeze in, and both have been found out by the pigeons.',
        situationKo: '금 신 한 짝이 궁전 계단의 역청에 붙어 버렸습니다. 이제 왕자가 그 신을 들고 집에 찾아왔습니다. 두 의붓언니는 발가락과 뒤꿈치를 잘라 억지로 신었지만, 비둘기들이 그 거짓을 밝혀냈습니다.',
        speaker: 'The king’s son', line: 'Is there no other daughter in this house?',
        prompt: 'Step out of the kitchen and ask to try the slipper on.',
        promptKo: '부엌에서 나와, 그 신을 신어 보게 해 달라고 청하세요.',
        answers: [{ all: ['try'] }, { any: ['shoe', 'slipper', 'fit'] }],
        model: 'Let me try the slipper on my foot.',
        distractors: ['Let me carry your horse’s bridle, sir.', 'Ask my two sisters again, sir.', 'I have never been to the palace in my life.'],
        hints: ['Ask for your turn.', 'Key words: try / slipper'],
        hintsKo: ['자기 차례를 달라고 하세요.', '핵심 단어: try / slipper'],
        reply: { speaker: 'Narrator', line: 'The slipper fitted like a glove. He looked in your face, knew you, and cried: This is the true bride!' }
      }
    ]
  },
  {
    num: 7, title: 'Little Red-Cap', ko: '빨간 모자',
    summary: 'A girl in a red velvet cap meets a wolf on the way to her grandmother’s, and learns why one should stay on the path.',
    summaryKo: '빨간 벨벳 모자를 쓴 소녀가 할머니 댁에 가는 길에 늑대를 만나고, 왜 길에서 벗어나면 안 되는지를 배웁니다.',
    scenes: [
      {
        role: 'redcap',
        situation: 'Your grandmother is ill. Your mother has packed a basket with cake and a bottle of wine, and is tying your red velvet cap under your chin at the door.',
        situationKo: '할머니가 편찮으십니다. 어머니가 과자와 포도주 한 병을 바구니에 담고, 문 앞에서 빨간 벨벳 모자를 턱 아래로 매어 줍니다.',
        speaker: 'Your mother', line: 'Walk properly, and do not run off the path, or the bottle will break.',
        prompt: 'Promise her that you will do exactly as she says.',
        promptKo: '어머니 말씀대로 하겠다고 약속하세요.',
        answers: [{ any: ['promise', 'care', 'careful', 'certainly'] }],
        model: 'I promise, mother. I will take great care.',
        distractors: ['The wood is boring. May I stay at home?', 'I will run all the way, so the cake stays warm.', 'Grandmother can come and fetch it herself.'],
        hints: ['A short, obedient answer.', 'Key words: promise / take care'],
        hintsKo: ['짧고 순종적인 대답이면 됩니다.', '핵심 단어: promise / take care'],
        reply: { speaker: 'Your mother', line: 'Good child. And when you go into her room, do not forget to say good morning. Now go, before the sun is too high.' }
      },
      {
        role: 'redcap',
        situation: 'A wolf has come out from among the trees and walked beside you. You do not know what a wicked creature he is, so you are not at all afraid.',
        situationKo: '늑대 한 마리가 나무 사이에서 나와 당신 옆에서 함께 걷습니다. 그가 얼마나 못된 짐승인지 몰라서 조금도 무섭지 않습니다.',
        speaker: 'The wolf', line: 'And where does your grandmother live, Little Red-Cap?',
        prompt: 'Tell him the way to the house under the three great oak trees.',
        promptKo: '큰 떡갈나무 세 그루 아래 있는 집으로 가는 길을 알려 주세요.',
        answers: [{ any: ['wood', 'forest', 'oak', 'trees', 'quarter', 'hazel'] }],
        model: 'A good quarter of an hour further into the wood, under the three oak trees.',
        distractors: ['She lives in the King’s palace by the river.', 'I have never been to her house before.', 'Just behind you, wolf, at the edge of the town.'],
        hints: ['Describe the distance and the trees.', 'Key words: wood / oak trees'],
        hintsKo: ['거리와 나무들을 설명하세요.', '핵심 단어: wood / oak trees'],
        reply: { speaker: 'The wolf', line: 'See what pretty flowers are growing here! Would your grandmother not be glad of a nosegay? And you stepped off the path.' }
      },
      {
        role: 'redcap',
        situation: 'You reach the cottage at last. The door stands open, the curtains are drawn, and grandmother is lying in bed with her cap pulled far over her face. Something about her looks very strange.',
        situationKo: '마침내 오두막에 닿습니다. 문은 열려 있고 커튼은 쳐져 있으며, 할머니는 모자를 얼굴 깊이 눌러쓰고 침대에 누워 있습니다. 무언가 몹시 이상해 보입니다.',
        speaker: 'The wolf in the bed', line: 'Come nearer, my child. Come and stand beside the bed.',
        prompt: 'Say aloud what you notice about her — the ears, the eyes, or the mouth.',
        promptKo: '할머니의 귀나 눈, 입에 대해 이상하게 느낀 점을 소리 내어 말하세요.',
        answers: [{ all: ['big'], any: ['eyes', 'ears', 'mouth', 'hands', 'teeth'] }, { all: ['what'], any: ['eyes', 'ears', 'mouth', 'hands'] }],
        model: 'Oh, grandmother, what big eyes you have!',
        distractors: ['Oh, grandmother, what a tidy little kitchen!', 'Oh, grandmother, the wine has gone sour!', 'Oh, grandmother, you look so well today!'],
        hints: ['Everything about her seems too large.', 'Key words: what big + eyes / ears / mouth'],
        hintsKo: ['할머니의 모든 것이 너무 커 보입니다.', '핵심 단어: what big + eyes / ears / mouth'],
        reply: { speaker: 'The wolf in the bed', line: 'The better to see you with, my dear. And what big teeth I have — the better to eat you with! And he sprang out of the bed.' }
      }
    ]
  },
  {
    num: 8, title: 'The Golden Goose', ko: '황금 거위',
    summary: 'The youngest son shares his poor dinner with a little grey man and is given a goose with feathers of gold that no one can let go of.',
    summaryKo: '막내아들이 보잘것없는 밥을 잿빛 난쟁이와 나눠 먹고, 아무도 손을 뗄 수 없는 황금 깃털 거위를 얻습니다.',
    scenes: [
      {
        role: 'dummling',
        situation: 'Your two clever brothers went into the wood before you and refused to share anything, and both came home hurt. Your mother has given you only cinder cake and sour beer. In a clearing, a little old grey man is watching you unpack it.',
        situationKo: '똑똑한 두 형은 먼저 숲에 갔다가 아무것도 나누지 않겠다고 하고는 둘 다 다쳐서 돌아왔습니다. 어머니는 당신에게 잿불에 구운 빵과 시어진 맥주만 주었습니다. 빈터에서 작고 늙은 잿빛 난쟁이가 당신이 그것을 꺼내는 것을 지켜봅니다.',
        speaker: 'The little grey man', line: 'Give me a piece of your cake and a drink of your wine. I am so hungry.',
        prompt: 'Say your food is poor, but invite him to sit down and share it.',
        promptKo: '변변찮은 음식이지만 앉아서 함께 먹자고 청하세요.',
        answers: [{ any: ['share', 'sit down', 'come and eat', 'together', 'have some'] }],
        model: 'It is only cinder cake and sour beer, but sit down and share it.',
        distractors: ['I have hardly enough for myself, old man.', 'Cut the wood for me first and then we shall see.', 'Go to the village. They will feed you there.'],
        hints: ['Be kinder than your brothers were.', 'Key words: share / sit down'],
        hintsKo: ['형들보다 더 친절하게 대하세요.', '핵심 단어: share / sit down'],
        reply: { speaker: 'The little grey man', line: 'When you took it out, the cake was sweet and the beer was good wine. Now fell that old tree, he said, and you will find something at its roots.' }
      },
      {
        role: 'dummling',
        situation: 'Under the roots was a goose with feathers of pure gold. You slept at an inn, and in the night the innkeeper’s three daughters tried to pull out a feather each — and stuck fast, one to the goose, the others to their sisters. Now the parson has run out to scold them.',
        situationKo: '나무뿌리 밑에는 순금 깃털을 지닌 거위가 있었습니다. 여관에서 자는 사이, 여관집 세 딸이 깃털을 하나씩 뽑으려다 하나는 거위에, 나머지는 언니들에게 딱 붙어 버렸습니다. 이제 목사가 뛰어나와 그들을 나무랍니다.',
        speaker: 'The parson', line: 'For shame, girls! Running after a young man in the street!',
        prompt: 'Warn him not to touch them — whoever touches sticks fast.',
        promptKo: '건드리지 말라고 경고하세요. 손을 대는 사람은 누구든 붙어 버립니다.',
        answers: [{ any: ['keep away', 'do not touch', 'touch', 'touches', 'stick', 'sticks', 'stuck'] }],
        model: 'Keep away, sir! Whoever touches them sticks fast.',
        distractors: ['Take them home, sir. They are nothing to do with me.', 'Pull as hard as you can and they will come free.', 'Fetch some hot water and the gold will melt.'],
        hints: ['Tell him the danger before he grabs a sleeve.', 'Key words: touch / stick fast'],
        hintsKo: ['소매를 잡기 전에 위험을 알려 주세요.', '핵심 단어: touch / stick fast'],
        reply: { speaker: 'Narrator', line: 'He seized the youngest girl by the hand and stuck fast too. Soon the clerk and two labourers were running behind, and the whole line followed you into the city.' }
      }
    ]
  },
  {
    num: 9, title: 'The Travelling Musicians', ko: '브레멘 음악대',
    summary: 'Four old animals, no longer of use to their masters, set out for Bremen and frighten a house of robbers instead.',
    summaryKo: '주인에게 더는 쓸모없어진 늙은 동물 넷이 브레멘으로 떠났다가, 도둑들의 집을 겁주어 쫓아냅니다.',
    scenes: [
      {
        role: 'donkey',
        situation: 'You have run away from a master who no longer wanted to feed you. On the road you find an old hound lying panting in the dust, as if he had run a long way.',
        situationKo: '더는 먹이를 주지 않으려는 주인에게서 도망쳐 나왔습니다. 길에서 오래 달려온 듯 먼지 속에 헐떡이며 누워 있는 늙은 사냥개를 만납니다.',
        speaker: 'The hound', line: 'I am old and slow, so my master meant to kill me. I ran away.',
        prompt: 'Invite him to come with you to Bremen and be a town musician.',
        promptKo: '함께 브레멘에 가서 거리의 악사가 되자고 청하세요.',
        answers: [{ any: ['bremen', 'music', 'musician', 'come with me', 'come with us'] }],
        model: 'Come with me to Bremen and be a town musician.',
        distractors: ['Go home and beg your master to forgive you.', 'I am sorry, old friend, but I must travel alone.', 'Lie still. Someone kind will find you soon.'],
        hints: ['You are both too old to work, but not to sing.', 'Key words: Bremen / musician'],
        hintsKo: ['둘 다 일하기엔 늙었지만 노래하기엔 늦지 않았습니다.', '핵심 단어: Bremen / musician'],
        reply: { speaker: 'The hound', line: 'He agreed gladly, and they went on together. Before evening they had also gathered a cat with blunt teeth and a cock who was to be Sunday’s soup.' }
      },
      {
        role: 'donkey',
        situation: 'Night has fallen and Bremen is still far off. From a tree the cock has spotted a light. You come near the house and, being the tallest, you put your feet on the window sill and look in.',
        situationKo: '밤이 되었지만 브레멘은 아직 멉니다. 수탉이 나무 위에서 불빛을 발견했습니다. 집에 다가가, 키가 가장 큰 당신이 창턱에 발을 올리고 안을 들여다봅니다.',
        speaker: 'The cock', line: 'Well, grey horse, what do you see in there?',
        prompt: 'Tell the others what is on the table and who is sitting at it.',
        promptKo: '식탁 위에 무엇이 있고 누가 앉아 있는지 친구들에게 알려 주세요.',
        answers: [{ any: ['robbers', 'robber', 'food', 'table', 'thieves', 'eating'] }],
        model: 'A table covered with food and drink, and robbers sitting round it.',
        distractors: ['An empty room with the fire gone out.', 'A kind old woman baking bread for travellers.', 'Nothing but sacks of straw and a broken cart.'],
        hints: ['Good news and bad news in one sentence.', 'Key words: food / robbers'],
        hintsKo: ['좋은 소식과 나쁜 소식이 한 문장에 들어 있습니다.', '핵심 단어: food / robbers'],
        reply: { speaker: 'The hound', line: 'That would be the sort of thing for us! If only we were inside. And the four of them began to plan how to drive the robbers out.' }
      },
      {
        role: 'donkey',
        situation: 'The four of you have crept up to the window. The cat is on your back, the hound is on the cat, the cock is on top of them all. Everyone is waiting for you to say when.',
        situationKo: '넷이서 창가로 살금살금 다가갔습니다. 고양이는 당신 등에, 개는 고양이 위에, 수탉은 그 위에 올라섰습니다. 모두가 당신의 신호를 기다립니다.',
        speaker: 'The cat', line: 'We are ready. Now — how shall we drive them out?',
        prompt: 'Give the signal: everybody makes his own music at once.',
        promptKo: '신호를 주세요. 모두가 동시에 자기 소리를 내는 겁니다.',
        answers: [{ any: ['sing', 'music', 'together', 'noise', 'once'] }],
        model: 'Now! Let us all sing together as loud as we can.',
        distractors: ['Now! Let us knock politely at the door.', 'Now! Let us wait until they fall asleep.', 'Now! Let us set fire to the roof.'],
        hints: ['You are musicians, after all.', 'Key words: sing / together'],
        hintsKo: ['어쨌든 당신들은 악사입니다.', '핵심 단어: sing / together'],
        reply: { speaker: 'Narrator', line: 'You brayed, the hound barked, the cat mewed and the cock crowed — and then all four crashed through the window. The robbers ran for their lives.' }
      }
    ]
  },
  {
    num: 10, title: 'The Elves and the Shoemaker', ko: '요정과 구두장이',
    summary: 'Two little naked men come by night to make a poor shoemaker’s shoes, until he and his wife find a way to thank them.',
    summaryKo: '헐벗은 작은 남자 둘이 밤마다 찾아와 가난한 구두장이의 구두를 만들어 주고, 마침내 부부가 고마움을 갚을 방법을 찾아냅니다.',
    scenes: [
      {
        role: 'shoemaker',
        situation: 'You have grown so poor that only one piece of leather is left in the whole house — enough for a single pair of shoes. It is evening, and your wife is looking at it on the bench.',
        situationKo: '너무 가난해져 집 안에 남은 가죽이라고는 구두 한 켤레 분량 한 장뿐입니다. 저녁이 되었고, 아내가 작업대 위의 그 가죽을 바라보고 있습니다.',
        speaker: 'Your wife', line: 'That is the last leather we have. What is to become of us?',
        prompt: 'Say you will cut it out tonight and sew the shoes in the morning.',
        promptKo: '오늘 밤에 재단해 두고 아침에 구두를 짓겠다고 말하세요.',
        answers: [{ any: ['cut', 'sew', 'morning', 'tomorrow'] }],
        model: 'I will cut it out tonight and sew the shoes in the morning.',
        distractors: ['I will sell the bench and the tools at the fair.', 'We must beg in the market square from now on.', 'Burn it. Leather is of no use to us any more.'],
        hints: ['A tired but steady plan for the last leather.', 'Key words: cut out / sew / morning'],
        hintsKo: ['마지막 가죽을 두고 세우는 지치지만 담담한 계획입니다.', '핵심 단어: cut out / sew / morning'],
        reply: { speaker: 'Narrator', line: 'In the morning the shoes stood finished on the bench, stitched so neatly that not one stitch was wrong. A customer paid well, and there was leather for two pairs more.' }
      },
      {
        role: 'shoemaker',
        situation: 'It is Christmas Eve. You and your wife hid behind the coats last night and saw two tiny naked men come, sew all night, and run away at dawn. You are rich now, and they have nothing at all.',
        situationKo: '크리스마스 이브입니다. 어젯밤 부부가 외투 뒤에 숨어, 벌거벗은 작은 남자 둘이 와서 밤새 바느질하고 새벽에 달아나는 것을 보았습니다. 이제 당신들은 부유해졌지만 그들에게는 아무것도 없습니다.',
        speaker: 'Your wife', line: 'They have made us rich, and they run about with nothing on. How shall we thank them?',
        prompt: 'Suggest making them little clothes — shirts, coats and tiny shoes.',
        promptKo: '작은 옷을 만들어 주자고 제안하세요. 셔츠와 외투, 그리고 작은 구두를요.',
        answers: [{ any: ['clothes', 'shirts', 'coats', 'shoes', 'stockings'] }],
        model: 'Let us make them little shirts and coats, and I will make the shoes.',
        distractors: ['Let us leave a bag of gold on the bench for them.', 'Let us lock the door so they must stay and talk.', 'Let us say nothing and hope they come again.'],
        hints: ['They are cold, not hungry.', 'Key words: clothes / shirts / shoes'],
        hintsKo: ['그들은 배고픈 것이 아니라 추운 것입니다.', '핵심 단어: clothes / shirts / shoes'],
        reply: { speaker: 'Narrator', line: 'That night the little men found the presents, dressed themselves, and danced out of the door singing. They never came back, but all went well with you ever after.' }
      }
    ]
  },
  {
    num: 11, title: 'Briar Rose', ko: '들장미 공주 (잠자는 숲속의 미녀)',
    summary: 'A princess pricks her finger on a spindle and sleeps a hundred years, behind a hedge of thorns that only one prince may pass.',
    summaryKo: '공주가 물렛가락에 손가락을 찔려 백 년을 잠들고, 오직 한 왕자만이 지날 수 있는 가시덤불이 성을 에워쌉니다.',
    scenes: [
      {
        role: 'briarrose',
        situation: 'It is your fifteenth birthday and the castle is empty. Exploring, you climb a narrow winding stair to an old tower room, where a very old woman sits busily working at something you have never seen in your life.',
        situationKo: '열다섯 번째 생일, 성은 텅 비었습니다. 여기저기 돌아다니다 좁고 구불구불한 계단을 올라 낡은 탑 방에 이르니, 아주 늙은 여인이 앉아 난생처음 보는 무언가를 부지런히 놀리고 있습니다.',
        speaker: 'The old woman', line: 'Good day, my pretty child. Come in, come in.',
        prompt: 'Ask her what the thing is that turns round so merrily in her hands.',
        promptKo: '손에서 저렇게 즐겁게 돌아가는 것이 무엇인지 물어보세요.',
        answers: [{ any: ['what', 'twirls', 'turns', 'spinning', 'spindle'] }],
        model: 'What is that thing which turns round so merrily?',
        distractors: ['Where did you hide the key to this tower?', 'Why is the whole castle so quiet today?', 'Will you come down and dine with my father?'],
        hints: ['Nobody has ever let you see a spindle before.', 'Key words: what is that / turns round'],
        hintsKo: ['아무도 당신에게 물렛가락을 보여 준 적이 없습니다.', '핵심 단어: what is that / turns round'],
        reply: { speaker: 'The old woman', line: 'She held it out. The moment you touched the spindle it pricked your finger, and you fell on the bed in a deep sleep — and the whole castle slept with you.' }
      },
      {
        role: 'prince',
        situation: 'You have come from far away. Round the old castle stands a hedge of thorns so thick that nothing can be seen through it. An old man in the village tells you what has happened to the princes who tried before.',
        situationKo: '먼 곳에서 찾아왔습니다. 낡은 성 둘레에는 아무것도 들여다보이지 않을 만큼 빽빽한 가시덤불이 서 있습니다. 마을의 한 노인이 앞서 시도했던 왕자들이 어떻게 되었는지 들려줍니다.',
        speaker: 'The old man', line: 'Many kings’ sons have tried to get through, and every one died among the thorns.',
        prompt: 'Say you are not afraid, and that you will go and see the beautiful Briar Rose.',
        promptKo: '두렵지 않다고, 아름다운 들장미 공주를 보러 가겠다고 말하세요.',
        answers: [{ any: ['not afraid', 'i will go', 'briar rose', 'go', 'try'] }],
        model: 'I am not afraid. I will go and see the beautiful Briar Rose.',
        distractors: ['Then I shall ride home before it is dark.', 'Send a woodcutter to chop the hedge down first.', 'A hundred years is far too long to wait.'],
        hints: ['The hundred years are exactly up today.', 'Key words: not afraid / I will go'],
        hintsKo: ['오늘이 바로 백 년이 다 차는 날입니다.', '핵심 단어: not afraid / I will go'],
        reply: { speaker: 'Narrator', line: 'The thorns turned to great flowers and let you pass. In the tower you found her sleeping, and stooped and kissed her — and Briar Rose opened her eyes.' }
      }
    ]
  },
  {
    num: 12, title: 'The Fisherman and His Wife', ko: '어부와 아내',
    summary: 'A fisherman spares an enchanted flounder, and his wife sends him back to the sea again and again, wishing for more and more.',
    summaryKo: '어부가 마법에 걸린 넙치를 살려 주자, 아내는 더 큰 것을 바라며 그를 자꾸만 바다로 돌려보냅니다.',
    scenes: [
      {
        role: 'fisherman',
        situation: 'You live with your wife in a little ditch of a hut by the sea. Today your line went down deep, and what came up was a great flounder — and the flounder has just spoken to you.',
        situationKo: '바닷가 도랑 같은 오두막에서 아내와 삽니다. 오늘 낚싯줄이 깊이 내려갔고, 올라온 것은 커다란 넙치였습니다. 그런데 그 넙치가 방금 당신에게 말을 걸었습니다.',
        speaker: 'The flounder', line: 'Pray let me live. I am no real fish, but an enchanted prince.',
        prompt: 'Tell him he need say no more — you will put him back in the water.',
        promptKo: '더 말할 것 없다고, 물에 놓아주겠다고 말하세요.',
        answers: [{ any: ['swim', 'free', 'let you live', 'put you back', 'back'] }],
        model: 'You need not say so much. I will let you swim away.',
        distractors: ['A talking fish will fetch a good price in the town.', 'First give me a house, and then I will let you go.', 'My wife will decide what to do with you.'],
        hints: ['Kindness first, wishes later.', 'Key words: swim away / let you go'],
        hintsKo: ['소원보다 친절이 먼저입니다.', '핵심 단어: swim away / let you go'],
        reply: { speaker: 'Narrator', line: 'The flounder went down, leaving a long streak of blood behind him. But when you told your wife, she said: Did you wish for nothing at all? Go back!' }
      },
      {
        role: 'fisherman',
        situation: 'The cottage became a castle, the castle a kingdom. Now your wife wants to be Emperor, and you are standing at the edge of a dark grey sea that heaves and stinks. You must call the flounder up again.',
        situationKo: '오두막은 성이 되고, 성은 왕국이 되었습니다. 이제 아내는 황제가 되고 싶어 합니다. 당신은 넘실대며 악취를 풍기는 어두운 잿빛 바다 앞에 서 있습니다. 다시 넙치를 불러내야 합니다.',
        speaker: 'The sea', line: 'The water is thick and black, and it boils up as if it were angry.',
        prompt: 'Call the flounder with the little rhyme you always use.',
        promptKo: '늘 쓰던 짧은 노래로 넙치를 부르세요.',
        answers: [{ any: ['flounder', 'sea', 'come'] }],
        model: 'Flounder, flounder in the sea, come, I pray thee, here to me.',
        distractors: ['Sailor, sailor on the shore, row me out a little more.', 'Sleep, old water, and trouble me no further.', 'Wife of mine, call the fish yourself if you dare.'],
        hints: ['Two lines, and they rhyme.', 'Key words: flounder / sea / come to me'],
        hintsKo: ['두 줄짜리 노래이고, 운이 맞습니다.', '핵심 단어: flounder / sea / come to me'],
        reply: { speaker: 'The flounder', line: 'Well, what does she want? — She wants to be Emperor. — Go home; she is Emperor already. But the sea grew blacker, and she was not done wishing.' }
      }
    ]
  }
];

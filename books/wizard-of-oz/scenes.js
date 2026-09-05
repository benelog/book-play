/* The Wonderful Wizard of Oz (L. Frank Baum, 1900 — public domain). Game data for all 24 chapters.
   Field reference: books/README.md. Situations, prompts and hints are original; quoted lines are short. */
window.LP_ROLES = {
  dorothy: { en: 'You are Dorothy. ', ko: '당신은 도로시입니다. ' },
  scarecrow: { en: 'You are the Scarecrow. ', ko: '당신은 허수아비입니다. ' },
  tinman: { en: 'You are the Tin Woodman. ', ko: '당신은 양철 나무꾼입니다. ' },
  lion: { en: 'You are the Cowardly Lion. ', ko: '당신은 겁쟁이 사자입니다. ' }
};
window.LP_SCENES = [
  {
    num: 1, title: 'The Cyclone', ko: '회오리바람',
    summary: 'A cyclone carries Dorothy, Toto and the little farmhouse away from the gray Kansas prairie.',
    summaryKo: '회오리바람이 도로시와 토토, 작은 농가를 잿빛 캔자스 초원에서 멀리 실어 갑니다.',
    scenes: [
      {
        role: 'dorothy',
        situation: 'The sky over the Kansas prairie has turned dark. Uncle Henry has run to the barn, and Aunt Em is at the trap door to the cellar. Toto has jumped out of your arms.',
        situationKo: '캔자스 초원의 하늘이 어두워졌습니다. 헨리 아저씨는 헛간으로 달려갔고, 엠 아주머니는 지하실 뚜껑문 앞에 있습니다. 토토가 당신 품에서 뛰쳐나갔습니다.',
        speaker: 'Aunt Em', line: 'Quick, Dorothy! Run for the cellar!',
        prompt: 'You will not leave without your dog. Say what you must do first.',
        promptKo: '강아지를 두고 갈 수는 없습니다. 먼저 해야 할 일을 말해 보세요.',
        answers: [{ any: ['toto', 'dog'] }],
        model: 'I must get Toto first!',
        distractors: ['I must close the windows first!', 'I must feed the chickens first!', 'I must find my hat first!'],
        hints: ['Your little black dog.', 'Key word: Toto'],
        hintsKo: ['작고 까만 강아지.', '핵심 단어: Toto'],
        reply: { speaker: 'Narrator', line: 'Toto hid under the bed. Before you could reach the trap door, the house shivered, whirled around, and rose slowly through the air.' }
      },
      {
        role: 'dorothy',
        situation: 'The house is flying inside the cyclone. Hour after hour passes. Toto is safe in your arms. At first you were frightened, but nothing terrible happens.',
        situationKo: '집이 회오리바람 속을 날고 있습니다. 시간이 흐르고, 토토는 당신 품에 안전히 있습니다. 처음엔 무서웠지만 끔찍한 일은 일어나지 않습니다.',
        speaker: 'Narrator', line: 'The house rocks gently, like a cradle. What will you do?',
        prompt: 'Decide to stay calm and wait, or to lie down and sleep.',
        promptKo: '침착하게 기다리기로, 혹은 누워서 자기로 하세요.',
        answers: [{ any: ['wait', 'calm', 'calmly', 'sleep', 'lie down', 'rest', 'see what happens'] }],
        model: 'I will wait calmly and see what the future brings.',
        distractors: ['I will jump out of the window.', 'I will cook dinner for Uncle Henry.', 'I will open the trap door and climb down.'],
        hints: ['There is nothing to do but wait.', 'Key words: wait / sleep'],
        hintsKo: ['기다리는 수밖에 없습니다.', '핵심 단어: wait / sleep'],
        reply: { speaker: 'Narrator', line: 'You crawled over to your bed, and Toto lay down beside you. In spite of the swaying, you soon fell fast asleep.' }
      }
    ]
  },
  {
    num: 2, title: 'The Council with the Munchkins', ko: '먼치킨들과의 만남',
    summary: 'The house lands in the Land of Oz on top of the Wicked Witch of the East. A good witch sends Dorothy to the Emerald City.',
    summaryKo: '집이 오즈의 나라에 떨어져 동쪽의 나쁜 마녀를 깔아 버립니다. 착한 마녀가 도로시를 에메랄드 시로 보냅니다.',
    scenes: [
      {
        role: 'dorothy',
        situation: 'You step out into a country of marvellous beauty. A little old woman in a white hat and three small men in blue bow to you. Two feet in silver shoes stick out from under your house.',
        situationKo: '놀랍도록 아름다운 나라입니다. 흰 모자를 쓴 작은 할머니와 파란 옷의 작은 남자 셋이 절을 합니다. 당신의 집 아래로 은구두를 신은 두 발이 삐죽 나와 있습니다.',
        speaker: 'The Witch of the North', line: 'You are welcome, most noble Sorceress. Thank you for killing the Wicked Witch of the East.',
        prompt: 'Tell her there must be some mistake: you are not a sorceress and you have not killed anything.',
        promptKo: '무언가 착오가 있다고, 당신은 마법사도 아니고 아무것도 죽이지 않았다고 말하세요.',
        answers: [{ all: ['mistake'] }, { all: ['not'], any: ['witch', 'sorceress', 'killed', 'kill'] }, { all: ['never', 'killed'] }],
        model: 'You are very kind, but there must be some mistake. I have not killed anything.',
        distractors: ['Thank you. I am the greatest sorceress in Kansas.', 'Yes, I killed her with my magic hat.', 'Where is the Wizard? I want my reward.'],
        hints: ['"There must be some mistake."', 'Key words: mistake, or not + killed'],
        hintsKo: ['"무언가 착오가 있어요."', '핵심 단어: mistake 또는 not + killed'],
        reply: { speaker: 'The Witch of the North', line: 'Your house did it, anyway, and that is the same thing. See! There are her two feet, still sticking out.' }
      },
      {
        role: 'dorothy',
        situation: 'The Munchkins are free, and the Wicked Witch\'s silver shoes are now yours. But you want to get back to Aunt Em and Uncle Henry, and no one here has heard of Kansas.',
        situationKo: '먼치킨들은 자유가 되었고, 나쁜 마녀의 은구두는 이제 당신 것입니다. 하지만 당신은 엠 아주머니와 헨리 아저씨에게 돌아가고 싶고, 여기서는 아무도 캔자스를 모릅니다.',
        speaker: 'The Witch of the North', line: 'The Land of Oz is surrounded by a great desert on every side. I am afraid you will have to live with us.',
        prompt: 'Ask her how you can get back home to Kansas.',
        promptKo: '캔자스의 집으로 어떻게 돌아갈 수 있는지 물어보세요.',
        answers: [{ all: ['kansas'] }, { any: ['home', 'go back', 'get back', 'return'] }],
        model: 'But how can I get back to Kansas?',
        distractors: ['But how can I become a Munchkin?', 'But where can I buy new shoes?', 'But who will feed the Wicked Witch?'],
        hints: ['Ask the way home.', 'Key words: Kansas / home'],
        hintsKo: ['집으로 가는 길을 물어보세요.', '핵심 단어: Kansas / home'],
        reply: { speaker: 'The Witch of the North', line: 'You must go to the City of Emeralds and ask the Great Oz. The road is paved with yellow brick.' }
      }
    ]
  },
  {
    num: 3, title: 'How Dorothy Saved the Scarecrow', ko: '도로시가 허수아비를 구하다',
    summary: 'On the road of yellow brick, Dorothy frees a Scarecrow who wishes he had brains.',
    summaryKo: '노란 벽돌길에서 도로시는 뇌를 갖고 싶어 하는 허수아비를 풀어 줍니다.',
    scenes: [
      {
        role: 'dorothy',
        situation: 'Wearing the silver shoes, you walk along the yellow brick road. In a cornfield, a Scarecrow on a pole winks at you and speaks.',
        situationKo: '은구두를 신고 노란 벽돌길을 걷습니다. 옥수수밭의 장대 위에서 허수아비가 당신에게 윙크하며 말을 겁니다.',
        speaker: 'The Scarecrow', line: 'Good day. It is very tedious being perched up here night and day.',
        prompt: 'Ask whether you can help him get down from the pole.',
        promptKo: '장대에서 내려오도록 도와줄 수 있는지 물어보세요.',
        answers: [{ any: ['pole', 'down', 'help'] }],
        model: 'Can\'t you get down? Shall I take away the pole?',
        distractors: ['Can\'t you sing? I love a good song.', 'Do the crows pay you for this job?', 'Have you seen a little black dog?'],
        hints: ['Offer to lift him off the pole.', 'Key words: pole / down / help'],
        hintsKo: ['장대(pole)에서 내려(down) 주겠다고 하세요.', '핵심 단어: pole / down / help'],
        reply: { speaker: 'The Scarecrow', line: 'If you will please take away the pole, I shall be greatly obliged to you. Thank you very much, I feel like a new man.' }
      },
      {
        role: 'dorothy',
        situation: 'You tell the Scarecrow you are going to the Emerald City to ask the Great Oz to send you home. The Scarecrow says his head is stuffed with straw, and he has no brains at all.',
        situationKo: '당신은 집으로 보내 달라고 오즈에게 부탁하러 에메랄드 시로 간다고 말합니다. 허수아비는 자기 머리에 짚만 들어 있고 뇌가 없다고 합니다.',
        speaker: 'The Scarecrow', line: 'Do you think, if I go to the Emerald City with you, that Oz would give me some brains?',
        prompt: 'Invite him to come along and ask Oz.',
        promptKo: '함께 가서 오즈에게 부탁해 보자고 청하세요.',
        answers: [{ any: ['come', 'with me', 'with us', 'join', 'ask oz', 'ask him'] }],
        model: 'I cannot tell, but you may come with me, if you like. Even if Oz gives you no brains, you will be no worse off than now.',
        distractors: ['No. Brains are only for people made of flesh.', 'Oz gives brains only to lions.', 'You had better stay on your pole and scare crows.'],
        hints: ['"Come with me."', 'Key words: come / with me'],
        hintsKo: ['"나랑 같이 가자."', '핵심 단어: come / with me'],
        reply: { speaker: 'The Scarecrow', line: 'That is true. You see, I don\'t mind my legs and arms being stuffed, because I cannot get hurt. But I do not want people to call me a fool.' }
      },
      {
        role: 'dorothy',
        situation: 'You walk on together. The Scarecrow does not eat, does not sleep, and cannot be hurt by a pin. You wonder whether he is afraid of anything at all.',
        situationKo: '함께 걷습니다. 허수아비는 먹지도 자지도 않고, 핀에 찔려도 아프지 않습니다. 무서워하는 것이 하나라도 있는지 궁금해집니다.',
        speaker: 'The Scarecrow', line: 'There is only one thing in the world I am afraid of.',
        prompt: 'Ask what that one thing is.',
        promptKo: '그 한 가지가 무엇인지 물어보세요.',
        answers: [{ all: ['what'] }, { any: ['which', 'tell me'] }],
        model: 'What is that?',
        distractors: ['Is it me?', 'Then let us go home.', 'I am afraid of nothing at all.'],
        hints: ['A simple question.', 'Key word: what'],
        hintsKo: ['간단한 질문이면 됩니다.', '핵심 단어: what'],
        reply: { speaker: 'The Scarecrow', line: 'A lighted match.' }
      }
    ]
  },
  {
    num: 4, title: 'The Road Through the Forest', ko: '숲을 지나는 길',
    summary: 'The road grows rough. Dorothy explains to the Scarecrow why she wants to go back to gray Kansas.',
    summaryKo: '길이 험해집니다. 도로시는 왜 잿빛 캔자스로 돌아가고 싶은지 허수아비에게 설명합니다.',
    scenes: [
      {
        role: 'dorothy',
        situation: 'Resting by the road, you tell the Scarecrow about Kansas, where everything is gray. He cannot understand.',
        situationKo: '길가에서 쉬며 모든 것이 잿빛인 캔자스 이야기를 합니다. 허수아비는 이해하지 못합니다.',
        speaker: 'The Scarecrow', line: 'I cannot understand why you should wish to leave this beautiful country and go back to the dry, gray place you call Kansas.',
        prompt: 'Explain that people of flesh and blood would rather live at home, however gray it is, because there is no place like home.',
        promptKo: '사람은 아무리 잿빛이어도 집에서 살고 싶어 한다고, 집만 한 곳은 없다고 설명하세요.',
        answers: [{ all: ['home'] }, { any: ['no place like', 'flesh and blood', 'rather live'] }],
        model: 'No matter how dreary and gray our homes are, we would rather live there than anywhere else. There is no place like home.',
        distractors: ['Kansas has better corn than Oz.', 'Because Aunt Em owes me money.', 'Because the Munchkins are too small to play with.'],
        hints: ['The most famous line of the book, about home.', 'Key word: home'],
        hintsKo: ['이 책에서 가장 유명한 "집"에 관한 문장입니다.', '핵심 단어: home'],
        reply: { speaker: 'The Scarecrow', line: 'Of course I cannot understand it. If your heads were stuffed with straw, like mine, you would probably all live in the beautiful places.' }
      },
      {
        role: 'dorothy',
        situation: 'Night falls in the forest. You find a cottage and go inside. You are hungry and tired, but the Scarecrow never sleeps.',
        situationKo: '숲에 밤이 내립니다. 오두막을 찾아 들어갑니다. 당신은 배고프고 피곤하지만 허수아비는 잠을 자지 않습니다.',
        speaker: 'The Scarecrow', line: 'I shall stand in the corner and wait patiently until morning. What will you do?',
        prompt: 'Say that you will eat something and then sleep.',
        promptKo: '무언가 먹고 자겠다고 말하세요.',
        answers: [{ any: ['sleep', 'eat', 'bed', 'rest', 'tired'] }],
        model: 'I am tired and hungry. I will eat some bread, and then I will sleep until morning.',
        distractors: ['I will stand in the other corner with you.', 'I will walk on alone in the dark.', 'I will light a match so we can see.'],
        hints: ['Eat, then sleep.', 'Key words: eat / sleep'],
        hintsKo: ['먹고, 잡니다.', '핵심 단어: eat / sleep'],
        reply: { speaker: 'Narrator', line: 'You lay down on a bed of dried leaves, and Toto curled up beside you. The Scarecrow stood in the corner all night.' }
      }
    ]
  },
  {
    num: 5, title: 'The Rescue of the Tin Woodman', ko: '양철 나무꾼 구하기',
    summary: 'A groan leads them to a rusted man of tin who longs for a heart.',
    summaryKo: '신음 소리를 따라가니 녹슨 양철 사람이 있습니다. 그는 심장을 갖고 싶어 합니다.',
    scenes: [
      {
        role: 'dorothy',
        situation: 'You hear a deep groan among the trees. Beside a half-chopped tree stands a man made entirely of tin, an axe raised in his hands, perfectly still.',
        situationKo: '나무들 사이에서 깊은 신음 소리가 납니다. 반쯤 잘린 나무 옆에 온몸이 양철로 된 남자가 도끼를 든 채 꼼짝 않고 서 있습니다.',
        speaker: 'The Tin Woodman', line: '(groans)',
        prompt: 'Ask whether he groaned, and what the matter is.',
        promptKo: '신음한 것이 그였는지, 무슨 일인지 물어보세요.',
        answers: [{ all: ['what'], any: ['matter', 'wrong', 'happened', 'can i do'] }, { any: ['groan', 'groaning', 'groaned'] }, { all: ['are', 'you'], any: ['hurt', 'all right', 'ok', 'okay'] }],
        model: 'Did you groan? What is the matter?',
        distractors: ['Did you chop this tree? It is mine.', 'Are you a robot from Kansas?', 'Can you lend me your axe?'],
        hints: ['Ask what is wrong.', 'Key words: groan / what is the matter'],
        hintsKo: ['무슨 일인지 물어보세요.', '핵심 단어: groan / what is the matter'],
        reply: { speaker: 'The Tin Woodman', line: 'Yes, I did. I have been groaning for more than a year, and no one has ever heard me. Get an oil-can and oil my joints.' }
      },
      {
        role: 'dorothy',
        situation: 'You oil his neck, his arms and his legs, and the Tin Woodman can move again. He tells you that the Wicked Witch of the East enchanted his axe until he was all tin, and that he has no heart.',
        situationKo: '목과 팔다리에 기름을 치자 양철 나무꾼이 다시 움직입니다. 동쪽의 나쁜 마녀가 도끼에 마법을 걸어 온몸이 양철이 되었고, 심장이 없다고 합니다.',
        speaker: 'The Tin Woodman', line: 'Do you suppose Oz could give me a heart?',
        prompt: 'Invite him to come with you and ask Oz.',
        promptKo: '함께 가서 오즈에게 부탁하자고 청하세요.',
        answers: [{ any: ['come', 'with us', 'with me', 'join', 'ask oz', 'ask him'] }],
        model: 'Why, I guess so. It would be as easy as to give the Scarecrow brains. Come with us.',
        distractors: ['No. Oz only gives hearts to Munchkins.', 'A man of tin does not need a heart.', 'Stay here and finish chopping your tree.'],
        hints: ['"Come with us."', 'Key words: come / with us'],
        hintsKo: ['"우리와 같이 가요."', '핵심 단어: come / with us'],
        reply: { speaker: 'The Tin Woodman', line: 'True. I will come, for I do not care for my joints to rust again. Please carry the oil-can in your basket.' }
      }
    ]
  },
  {
    num: 6, title: 'The Cowardly Lion', ko: '겁쟁이 사자',
    summary: 'A roaring Lion tries to bite Toto and turns out to be a coward who wants courage.',
    summaryKo: '으르렁대는 사자가 토토를 물려다가 겁쟁이임이 드러납니다. 사자는 용기를 원합니다.',
    scenes: [
      {
        role: 'dorothy',
        situation: 'A terrible roar! A great Lion bounds onto the road, knocks over the Scarecrow and strikes the Tin Woodman. Then he opens his mouth to bite little Toto. You rush forward and slap his nose.',
        situationKo: '무시무시한 포효! 커다란 사자가 길에 뛰어들어 허수아비를 넘어뜨리고 양철 나무꾼을 칩니다. 이제 토토를 물려고 입을 벌립니다. 당신은 달려가 사자의 코를 때립니다.',
        speaker: 'The Lion', line: '(opens his mouth to bite Toto)',
        prompt: 'Scold the Lion: a big beast like him should be ashamed to bite a poor little dog.',
        promptKo: '사자를 꾸짖으세요. 그렇게 큰 짐승이 작은 개를 물다니 부끄러운 줄 알라고요.',
        answers: [{ any: ['dare', 'ashamed', 'shame', 'coward', 'stop', 'leave him alone', 'little dog'] }],
        model: 'Don\'t you dare bite Toto! You ought to be ashamed of yourself, a big beast like you, to bite a poor little dog!',
        distractors: ['Please eat the Scarecrow instead. He is made of straw.', 'Good Lion! Would you like a biscuit?', 'Run, Toto! I will meet you in the Emerald City.'],
        hints: ['"You ought to be ashamed of yourself!"', 'Key words: dare / ashamed / coward'],
        hintsKo: ['"부끄러운 줄 알아야지!"', '핵심 단어: dare / ashamed / coward'],
        reply: { speaker: 'The Lion', line: 'I didn\'t bite him. I know it, I am a coward. I have always known it. But how can I help it?' }
      },
      {
        role: 'dorothy',
        situation: 'The Lion wipes a tear from his eye with his tail. A lion who is afraid of everything, he says, is a disgrace. He asks where you are all going.',
        situationKo: '사자가 꼬리로 눈물을 닦습니다. 모든 것을 무서워하는 사자는 수치라고 합니다. 그리고 모두 어디로 가느냐고 묻습니다.',
        speaker: 'The Lion', line: 'Do you think Oz could give me courage?',
        prompt: 'Tell him to come with you; Oz can give him courage as easily as brains or a heart.',
        promptKo: '같이 가자고, 오즈가 뇌나 심장을 주듯 용기도 줄 수 있을 거라고 말하세요.',
        answers: [{ any: ['come', 'with us', 'with me', 'join', 'ask oz'] }],
        model: 'Just as easily as he could give the Scarecrow brains or the Tin Woodman a heart. Come with us.',
        distractors: ['No. A lion should find courage in the jungle.', 'Oz gives courage only on Sundays.', 'Go away, you frighten my dog.'],
        hints: ['"Come with us."', 'Key words: come / courage'],
        hintsKo: ['"우리와 같이 가."', '핵심 단어: come / courage'],
        reply: { speaker: 'The Lion', line: 'Then, if you don\'t mind, I\'ll go with you, for my life is simply unbearable without a bit of courage.' }
      }
    ]
  },
  {
    num: 7, title: 'The Journey to the Great Oz', ko: '위대한 오즈를 찾아가는 길',
    summary: 'Ditches, a river and the fearsome Kalidahs: the friends help each other across.',
    summaryKo: '도랑과 강, 무서운 칼리다: 친구들은 서로 도우며 건너갑니다.',
    scenes: [
      {
        role: 'dorothy',
        situation: 'The road ends at a great ditch, too wide to jump and too deep to climb. The Scarecrow has an idea, and looks at the Lion.',
        situationKo: '길이 넓고 깊은 도랑에서 끊깁니다. 뛰어넘기엔 너무 넓고 내려가기엔 너무 깊습니다. 허수아비가 사자를 보며 무언가 떠올립니다.',
        speaker: 'The Scarecrow', line: 'I think the Lion could jump over it. Ask him.',
        prompt: 'Ask the Lion to carry you across on his back, one at a time.',
        promptKo: '사자에게 한 명씩 등에 태워 건너 달라고 부탁하세요.',
        answers: [{ any: ['jump', 'carry', 'back', 'across', 'over'] }],
        model: 'Lion, could you jump over the ditch and carry us across on your back?',
        distractors: ['Lion, could you dig a tunnel under the ditch?', 'Lion, could you drink all the water in the ditch?', 'Lion, could you roar until the ditch fills up?'],
        hints: ['Jump; carry us on your back.', 'Key words: jump / carry / back'],
        hintsKo: ['뛰어넘어(jump), 등에 태워(carry) 주세요.', '핵심 단어: jump / carry / back'],
        reply: { speaker: 'The Lion', line: 'I think I could. Who will ride first? Get on my back and we will make the attempt.' }
      },
      {
        role: 'scarecrow',
        situation: 'In the dark forest you hear the Kalidahs, monstrous beasts with bodies like bears and heads like tigers. Your friends have crossed a fallen tree over a gulf, and the Kalidahs are on the tree behind you.',
        situationKo: '어두운 숲에서 곰의 몸에 호랑이 머리를 한 괴물, 칼리다의 소리가 들립니다. 친구들은 골짜기에 쓰러진 나무를 건넜고, 칼리다들이 그 나무 위로 따라옵니다.',
        speaker: 'The Tin Woodman', line: 'What shall we do?',
        prompt: 'Tell the Tin Woodman to chop away the end of the tree so it falls into the gulf.',
        promptKo: '양철 나무꾼에게 나무 끝을 찍어 골짜기로 떨어뜨리라고 하세요.',
        answers: [{ any: ['chop', 'cut', 'axe', 'ax', 'tree'] }],
        model: 'Quick! Chop away the end of the tree with your axe!',
        distractors: ['Quick! Offer them some straw!', 'Quick! Ask the Kalidahs the way to Oz!', 'Quick! Hide under the Lion!'],
        hints: ['Use the axe on the tree.', 'Key words: chop / axe / tree'],
        hintsKo: ['도끼로 나무를 찍습니다.', '핵심 단어: chop / axe / tree'],
        reply: { speaker: 'Narrator', line: 'The tree fell with a crash into the gulf, carrying the ugly, snarling brutes with it.' }
      }
    ]
  },
  {
    num: 8, title: 'The Deadly Poppy Field', ko: '죽음의 양귀비밭',
    summary: 'A river, a kind Stork, and a field of poppies whose scent puts Dorothy and the Lion to sleep.',
    summaryKo: '강과 친절한 황새, 그리고 향기로 도로시와 사자를 잠들게 하는 양귀비밭.',
    scenes: [
      {
        role: 'dorothy',
        situation: 'Crossing the river on a raft, the Scarecrow pushed his pole so hard that it stuck in the mud, and now he hangs on it in the middle of the water. A big Stork flies by and asks who you are.',
        situationKo: '뗏목으로 강을 건너다 허수아비가 장대를 너무 세게 밀어 진흙에 박혔고, 이제 강 한가운데 장대에 매달려 있습니다. 큰 황새가 날아와 누구냐고 묻습니다.',
        speaker: 'The Stork', line: 'Who are you, and where are you going?',
        prompt: 'Explain, and ask the Stork to carry the Scarecrow back to the shore.',
        promptKo: '사정을 설명하고, 황새에게 허수아비를 강가로 옮겨 달라고 부탁하세요.',
        answers: [{ all: ['scarecrow'], any: ['carry', 'bring', 'fetch', 'rescue', 'save', 'help', 'get'] }, { all: ['friend'], any: ['carry', 'bring', 'fetch', 'rescue', 'save', 'help', 'get'] }, { all: ['him'], any: ['carry', 'bring', 'fetch', 'rescue', 'save', 'help', 'get'] }],
        model: 'We are going to the Emerald City. Could you carry our friend the Scarecrow back to us?',
        distractors: ['We are fishing. Could you bring us some worms?', 'We are lost. Could you eat the Scarecrow for us?', 'We are tired. Could you carry the Lion to Kansas?'],
        hints: ['Ask for help getting the Scarecrow off the pole.', 'Key words: carry / help / rescue'],
        hintsKo: ['허수아비를 장대에서 데려와 달라고 하세요.', '핵심 단어: carry / help / rescue'],
        reply: { speaker: 'The Stork', line: 'If he wasn\'t so big and heavy I should get him for you. He is stuffed with straw? Then I\'ll try.' }
      },
      {
        role: 'scarecrow',
        situation: 'A great meadow of scarlet poppies. Their scent makes anyone who breathes it sleep forever. Dorothy\'s eyes close and she falls; Toto is asleep; the Lion runs ahead and drops. Only you and the Tin Woodman, who do not breathe, are awake.',
        situationKo: '붉은 양귀비가 가득한 들판입니다. 향기를 맡으면 영원히 잠듭니다. 도로시가 눈을 감고 쓰러지고, 토토도 잠들고, 앞서 달리던 사자도 쓰러집니다. 숨을 쉬지 않는 당신과 양철 나무꾼만 깨어 있습니다.',
        speaker: 'The Tin Woodman', line: 'If we leave her here she will die.',
        prompt: 'Say what to do: carry Dorothy and Toto out of the poppies.',
        promptKo: '어떻게 할지 말하세요. 도로시와 토토를 들어 양귀비밭 밖으로 옮겨야 합니다.',
        answers: [{ any: ['carry', 'lift', 'pick her up', 'out of', 'take her'] }],
        model: 'We must carry her out of the poppy field at once.',
        distractors: ['We must wake her with a song.', 'We must pick all the poppies first.', 'We must lie down beside her and wait.'],
        hints: ['Carry her away from the flowers.', 'Key words: carry / out'],
        hintsKo: ['꽃에서 떨어진 곳으로 옮깁니다.', '핵심 단어: carry / out'],
        reply: { speaker: 'Narrator', line: 'You made a chair with your hands and carried the sleeping girl, with Toto in her lap, out of the deadly flowers. The Lion was too heavy to move.' }
      }
    ]
  },
  {
    num: 9, title: 'The Queen of the Field Mice', ko: '들쥐 여왕',
    summary: 'The Tin Woodman saves a mouse queen, and thousands of mice pull the Lion out of the poppies.',
    summaryKo: '양철 나무꾼이 들쥐 여왕을 구하고, 수천 마리 쥐가 사자를 양귀비밭에서 끌어냅니다.',
    scenes: [
      {
        role: 'scarecrow',
        situation: 'The Tin Woodman has killed a wildcat that was chasing a little gray mouse. The mouse turns out to be the Queen of all the Field Mice, and she is very grateful.',
        situationKo: '양철 나무꾼이 작은 회색 쥐를 쫓던 살쾡이를 처치했습니다. 그 쥐는 들쥐들의 여왕이었고, 몹시 고마워합니다.',
        speaker: 'The Queen of the Mice', line: 'Is there anything we can do to repay you for saving my life?',
        prompt: 'Ask the mice to save your friend the Lion, who is asleep in the poppy bed.',
        promptKo: '양귀비밭에 잠들어 있는 친구 사자를 구해 달라고 부탁하세요.',
        answers: [{ any: ['lion', 'save', 'rescue', 'help', 'poppy', 'poppies'] }],
        model: 'Yes! Save our friend the Cowardly Lion, who is asleep in the poppy bed.',
        distractors: ['Yes! Bring us a thousand pieces of cheese.', 'Yes! Chase away every crow in Oz.', 'Yes! Tell us the way to Kansas.'],
        hints: ['Ask them to help the Lion.', 'Key words: Lion / save'],
        hintsKo: ['사자를 도와 달라고 하세요.', '핵심 단어: Lion / save'],
        reply: { speaker: 'The Queen of the Mice', line: 'A Lion! Why, he would eat us all up!' }
      },
      {
        role: 'scarecrow',
        situation: 'The Queen is frightened. You must convince her that this Lion is no danger to mice.',
        situationKo: '여왕이 겁을 냅니다. 이 사자는 쥐에게 위험하지 않다고 설득해야 합니다.',
        speaker: 'The Queen of the Mice', line: 'Are you sure he will not harm us?',
        prompt: 'Reassure her: he is a coward, and he is your friend.',
        promptKo: '안심시키세요. 사자는 겁쟁이고, 당신들의 친구라고요.',
        answers: [{ any: ['coward', 'cowardly', 'harm', 'hurt', 'friend', 'harmless', 'promise', 'safe'] }],
        model: 'Oh, no. This Lion is a coward, and he is our friend. He would not hurt anyone.',
        distractors: ['Well, he is a little hungry, but only for wildcats.', 'He eats mice only on Mondays.', 'I am not sure. Let us find out.'],
        hints: ['A cowardly, friendly lion.', 'Key words: coward / friend / not hurt'],
        hintsKo: ['겁쟁이(coward)이고 친구(friend)인 사자.', '핵심 단어: coward / friend / not hurt'],
        reply: { speaker: 'The Queen of the Mice', line: 'Very well. We trust you. But what shall we do?' }
      }
    ]
  },
  {
    num: 10, title: 'The Guardian of the Gate', ko: '성문지기',
    summary: 'At the gate of the Emerald City, everyone must put on green spectacles.',
    summaryKo: '에메랄드 시의 성문에서는 모두 초록 안경을 써야 합니다.',
    scenes: [
      {
        role: 'dorothy',
        situation: 'A green glow fills the sky. Before a great gate studded with emeralds stands a little man in green. He rings a bell and looks at you.',
        situationKo: '하늘이 초록빛으로 물듭니다. 에메랄드가 박힌 큰 성문 앞에 초록 옷의 작은 남자가 종을 울리며 당신을 봅니다.',
        speaker: 'The Guardian of the Gate', line: 'What do you wish in the Emerald City?',
        prompt: 'Tell him you have come to see the Great Oz.',
        promptKo: '위대한 오즈를 만나러 왔다고 말하세요.',
        answers: [{ any: ['see oz', 'see the great oz', 'oz', 'wizard'] }],
        model: 'We came here to see the Great Oz.',
        distractors: ['We came here to buy emeralds.', 'We came here to sell a lion.', 'We came here to paint the gate blue.'],
        hints: ['You want to see the Wizard.', 'Key word: Oz'],
        hintsKo: ['마법사를 만나고 싶습니다.', '핵심 단어: Oz'],
        reply: { speaker: 'The Guardian of the Gate', line: 'It has been many years since anyone asked to see Oz. But first you must put on these spectacles.' }
      },
      {
        role: 'dorothy',
        situation: 'The Guardian opens a great box full of green spectacles, and says they are locked on with a key so no one can take them off inside the city.',
        situationKo: '성문지기가 초록 안경이 가득한 상자를 열고, 도시 안에서는 아무도 벗지 못하도록 열쇠로 잠근다고 합니다.',
        speaker: 'The Guardian of the Gate', line: 'Everyone must wear spectacles night and day. Those are the orders of Oz.',
        prompt: 'Ask why.',
        promptKo: '이유를 물어보세요.',
        answers: [{ all: ['why'] }, { all: ['what', 'for'] }],
        model: 'Why?',
        distractors: ['How much do they cost?', 'Do they come in blue?', 'May I keep them?'],
        hints: ['One word.', 'Key word: why'],
        hintsKo: ['한 단어면 됩니다.', '핵심 단어: why'],
        reply: { speaker: 'The Guardian of the Gate', line: 'Because if you did not wear spectacles, the brightness and glory of the Emerald City would blind you.' }
      }
    ]
  },
  {
    num: 11, title: 'The Wonderful City of Oz', ko: '놀라운 오즈의 도시',
    summary: 'Oz appears to each visitor in a different form and demands a terrible price for his help.',
    summaryKo: '오즈는 방문자마다 다른 모습으로 나타나고, 도움의 대가로 끔찍한 일을 요구합니다.',
    scenes: [
      {
        role: 'dorothy',
        situation: 'In the throne room, on a great chair of emeralds, sits an enormous Head with no body. Its eyes turn slowly to look at you.',
        situationKo: '알현실의 에메랄드 왕좌 위에 몸통 없는 거대한 머리가 있습니다. 그 눈이 천천히 당신을 향합니다.',
        speaker: 'The Head', line: 'I am Oz, the Great and Terrible. Who are you, and why do you seek me?',
        prompt: 'Introduce yourself and say you have come for help.',
        promptKo: '자기소개를 하고, 도움을 청하러 왔다고 말하세요.',
        answers: [{ all: ['dorothy'] }, { any: ['help', 'home', 'kansas'] }],
        model: 'I am Dorothy, the Small and Meek. I have come to you for help.',
        distractors: ['I am the Witch of the North. Bow to me.', 'I am a head too. Nice to meet you.', 'I am the Guardian of the Gate. Where are your spectacles?'],
        hints: ['Say your name; say you need help.', 'Key words: Dorothy / help'],
        hintsKo: ['이름을 말하고, 도움이 필요하다고 하세요.', '핵심 단어: Dorothy / help'],
        reply: { speaker: 'The Head', line: 'Where did you get the silver shoes? And why should I do this for you?' }
      },
      {
        role: 'dorothy',
        situation: 'You tell him how the house fell on the Wicked Witch of the East. Oz says he will not send you home for nothing.',
        situationKo: '집이 동쪽의 나쁜 마녀 위에 떨어진 이야기를 합니다. 오즈는 공짜로는 보내 주지 않겠다고 합니다.',
        speaker: 'The Head', line: 'Help me and I will help you.',
        prompt: 'Ask what you must do.',
        promptKo: '무엇을 해야 하는지 물어보세요.',
        answers: [{ all: ['what'], any: ['do', 'must', 'want', 'wish'] }],
        model: 'What must I do?',
        distractors: ['How much gold do you want?', 'Can the Scarecrow do it instead?', 'When may I go home?'],
        hints: ['"What must I do?"', 'Key words: what + do'],
        hintsKo: ['"무엇을 해야 하죠?"', '핵심 단어: what + do'],
        reply: { speaker: 'The Head', line: 'Kill the Wicked Witch of the West. Until she is dead I will not send you back to Kansas.' }
      },
      {
        role: 'dorothy',
        situation: 'You begin to weep. You have never killed anything willingly, and the Witch of the West is far more powerful than you.',
        situationKo: '눈물이 납니다. 당신은 일부러 무엇을 죽여 본 적이 없고, 서쪽 마녀는 당신보다 훨씬 강합니다.',
        speaker: 'The Head', line: 'That is my answer. Now go, and do not seek me again until you have done your task.',
        prompt: 'Protest: you cannot do it.',
        promptKo: '항의하세요. 그런 일은 할 수 없다고요.',
        answers: [{ any: ['cannot', 'can not', 'never killed', 'not kill', 'no', 'impossible'] }],
        model: 'But I cannot! I never killed anything willingly.',
        distractors: ['Very well. Where is she?', 'Give me a sword, then.', 'May I kill the Guardian instead?'],
        hints: ['"I cannot!"', 'Key words: cannot / never killed'],
        hintsKo: ['"할 수 없어요!"', '핵심 단어: cannot / never killed'],
        reply: { speaker: 'The Head', line: 'Remember that the Witch is Wicked and ought to be killed. Now go.' }
      }
    ]
  },
  {
    num: 12, title: 'The Search for the Wicked Witch', ko: '나쁜 마녀를 찾아서',
    summary: 'Wolves, crows, bees and Winged Monkeys; Dorothy becomes the Witch\'s slave until a bucket of water ends it all.',
    summaryKo: '늑대, 까마귀, 벌, 날개 달린 원숭이. 도로시는 마녀의 하녀가 되지만, 물 한 양동이가 모든 것을 끝냅니다.',
    scenes: [
      {
        role: 'dorothy',
        situation: 'The soldier with the green whiskers leads you back to the gate. He says there is no road to the Wicked Witch of the West, because no one ever wishes to go that way.',
        situationKo: '초록 수염의 병사가 성문까지 안내합니다. 서쪽 마녀에게 가는 길은 없다고 합니다. 아무도 그쪽으로 가고 싶어 하지 않으니까요.',
        speaker: 'The Soldier', line: 'There is no road. No one ever wishes to go that way.',
        prompt: 'Ask how you are to find her, then.',
        promptKo: '그러면 어떻게 찾아가느냐고 물어보세요.',
        answers: [{ all: ['how'], any: ['find', 'get', 'reach', 'go', 'west'] }, { all: ['which', 'way'] }],
        model: 'How, then, are we to find her?',
        distractors: ['Then we will stay in the Emerald City forever.', 'Does she have a telephone?', 'Can you come with us and fight her?'],
        hints: ['Ask how to find the way.', 'Key words: how + find'],
        hintsKo: ['어떻게(how) 찾는지(find) 물어보세요.', '핵심 단어: how + find'],
        reply: { speaker: 'The Soldier', line: 'Keep to the West, where the sun sets, and you cannot fail to find her.' }
      },
      {
        role: 'dorothy',
        situation: 'The Winged Monkeys have carried you to the Witch\'s castle, and you are her slave. She wants your silver shoes. One day she makes you trip over an invisible iron bar, and one shoe falls off. She snatches it.',
        situationKo: '날개 달린 원숭이들이 당신을 마녀의 성으로 데려왔고, 당신은 마녀의 하녀가 되었습니다. 마녀는 은구두를 원합니다. 어느 날 보이지 않는 쇠막대에 걸려 넘어지자 구두 한 짝이 벗겨지고, 마녀가 낚아챕니다.',
        speaker: 'The Wicked Witch', line: '(laughs) Now it is mine!',
        prompt: 'Demand your shoe back.',
        promptKo: '구두를 돌려 달라고 요구하세요.',
        answers: [{ any: ['give', 'back', 'shoe', 'mine', 'return'] }],
        model: 'Give me back my shoe!',
        distractors: ['Keep it. I have another pair in Kansas.', 'Would you like the other one too?', 'Please wash the floor for me.'],
        hints: ['"Give it back!"', 'Key words: give back / shoe'],
        hintsKo: ['"돌려줘!"', '핵심 단어: give back / shoe'],
        reply: { speaker: 'The Wicked Witch', line: 'I will not, for it is now my shoe, and someday I shall get the other one from you, too.' }
      },
      {
        role: 'dorothy',
        situation: 'You are so angry that you pick up something standing near you and dash it all over the Witch. She screams and begins to shrink and fall away.',
        situationKo: '너무 화가 나서 옆에 있던 것을 집어 마녀에게 끼얹습니다. 마녀가 비명을 지르며 쪼그라들기 시작합니다.',
        speaker: 'The Wicked Witch', line: 'See what you have done! In a minute I shall melt away!',
        prompt: 'What did you throw at her? Say it.',
        promptKo: '무엇을 끼얹었나요? 말해 보세요.',
        answers: [{ any: ['water', 'bucket', 'pail'] }],
        model: 'A bucket of water! I\'m very sorry, indeed.',
        distractors: ['A can of oil for the Tin Woodman!', 'A basket of straw!', 'My other silver shoe!'],
        hints: ['Something wet from the kitchen.', 'Key words: water / bucket'],
        hintsKo: ['부엌에 있던 젖은 것.', '핵심 단어: water / bucket'],
        reply: { speaker: 'The Wicked Witch', line: 'Didn\'t you know water would be the end of me? … Look out, here I go!' }
      }
    ]
  },
  {
    num: 13, title: 'The Rescue', ko: '구출',
    summary: 'The Winkies are free. They mend the Tin Woodman and stuff the Scarecrow, and Dorothy finds the Golden Cap.',
    summaryKo: '윙키들이 자유가 됩니다. 그들은 양철 나무꾼을 고치고 허수아비에 짚을 채워 주며, 도로시는 황금 모자를 찾습니다.',
    scenes: [
      {
        role: 'dorothy',
        situation: 'The Wicked Witch is gone, and the yellow Winkies are free at last. With their help you find the Tin Woodman, battered and dented, lying in a rocky place.',
        situationKo: '나쁜 마녀는 사라졌고 노란 윙키들은 마침내 자유입니다. 그들의 도움으로 바위틈에 쓰러진, 찌그러지고 움푹 팬 양철 나무꾼을 찾습니다.',
        speaker: 'A Winkie', line: 'We have tinsmiths in our land, very clever ones.',
        prompt: 'Ask the Winkie tinsmiths to mend your friend.',
        promptKo: '윙키 양철공들에게 친구를 고쳐 달라고 부탁하세요.',
        answers: [{ any: ['mend', 'repair', 'fix', 'straighten', 'make him'] }],
        model: 'Could your tinsmiths mend him and make him straight again?',
        distractors: ['Could your tinsmiths make me a crown?', 'Could you melt him into a bucket?', 'Could you carry him to the Emerald City as he is?'],
        hints: ['Ask them to repair him.', 'Key words: mend / repair / fix'],
        hintsKo: ['고쳐(mend/repair) 달라고 하세요.', '핵심 단어: mend / repair / fix'],
        reply: { speaker: 'A Winkie', line: 'Gladly. Our tinsmiths worked for three days and four nights, and he was as good as ever.' }
      },
      {
        role: 'tinman',
        situation: 'The Winkies have been so kind that when you prepare to leave, they beg you to stay and rule over the Yellow Land of the West.',
        situationKo: '윙키들이 너무 친절해서, 떠날 채비를 하자 남아서 서쪽의 노란 나라를 다스려 달라고 애원합니다.',
        speaker: 'The Winkies', line: 'Stay with us and be our ruler!',
        prompt: 'Say that you must go now, but you will come back after Dorothy is home.',
        promptKo: '지금은 가야 하지만 도로시가 집에 돌아간 뒤에 돌아오겠다고 말하세요.',
        answers: [{ any: ['come back', 'return', 'later', 'after', 'someday', 'go now', 'must go'] }],
        model: 'I must go with Dorothy now, but when she is safely home I will come back to you.',
        distractors: ['I will stay. Dorothy can find her own way.', 'A man of tin cannot rule anyone.', 'Only if you polish me every morning.'],
        hints: ['Not now, but later.', 'Key words: come back / return'],
        hintsKo: ['지금은 아니지만 나중에.', '핵심 단어: come back / return'],
        reply: { speaker: 'The Winkies', line: 'Then take these gifts: a golden oil-can, a gold-headed walking stick, and a diamond bracelet for Dorothy.' }
      }
    ]
  },
  {
    num: 14, title: 'The Winged Monkeys', ko: '날개 달린 원숭이들',
    summary: 'The Golden Cap commands the Winged Monkeys, who carry the friends back to the Emerald City and tell their story.',
    summaryKo: '황금 모자는 날개 달린 원숭이들을 부립니다. 원숭이들은 친구들을 에메랄드 시로 데려가며 자기들의 사연을 들려줍니다.',
    scenes: [
      {
        role: 'dorothy',
        situation: 'You read the charm written inside the Golden Cap and say the strange words. With a rushing of wings, the Winged Monkeys land around you, and their King bows.',
        situationKo: '황금 모자 안쪽의 주문을 읽고 이상한 말을 외웁니다. 날갯짓 소리와 함께 날개 달린 원숭이들이 내려앉고, 그 왕이 절합니다.',
        speaker: 'The Monkey King', line: 'You have called us for the first time. What is your command?',
        prompt: 'Command them to carry you all to the Emerald City.',
        promptKo: '모두를 에메랄드 시로 데려가라고 명령하세요.',
        answers: [{ any: ['emerald', 'city', 'carry us', 'take us', 'fly us', 'oz'] }],
        model: 'We wish to go to the Emerald City.',
        distractors: ['We wish to go to the Moon.', 'We wish you to fight the Kalidahs.', 'We wish to learn to fly.'],
        hints: ['Name the destination.', 'Key words: Emerald City'],
        hintsKo: ['목적지를 말하세요.', '핵심 단어: Emerald City'],
        reply: { speaker: 'The Monkey King', line: 'We will carry you. Two monkeys for each, and the Lion needs four.' }
      },
      {
        role: 'dorothy',
        situation: 'High in the air, carried by two monkeys, you grow curious. The King of the Monkeys flies beside you.',
        situationKo: '원숭이 둘에게 안겨 높이 날며 궁금해집니다. 원숭이 왕이 옆에서 날고 있습니다.',
        speaker: 'The Monkey King', line: 'It is a long story. Do you want to hear it?',
        prompt: 'Ask why the Winged Monkeys must obey the charm of the Golden Cap.',
        promptKo: '날개 달린 원숭이들이 왜 황금 모자의 주문을 따라야 하는지 물어보세요.',
        answers: [{ all: ['why'] }, { any: ['golden cap', 'obey', 'charm', 'story', 'yes'] }],
        model: 'Yes. Why must you obey the charm of the Golden Cap?',
        distractors: ['No. Please fly faster.', 'Is the cap made of real gold?', 'Do you ever get tired of flying?'],
        hints: ['Ask for the reason, or say yes.', 'Key words: why / obey'],
        hintsKo: ['이유(why)를 묻거나 예(yes)라고 하세요.', '핵심 단어: why / obey'],
        reply: { speaker: 'The Monkey King', line: 'Once we were a free people. A princess named Gayelette punished our mischief, and since then we must obey whoever wears the cap, three times.' }
      }
    ]
  },
  {
    num: 15, title: 'The Discovery of Oz, the Terrible', ko: '무시무시한 오즈의 정체',
    summary: 'Toto knocks over a screen, and the Great Oz turns out to be a little old man, a humbug.',
    summaryKo: '토토가 가리개를 넘어뜨리자, 위대한 오즈는 작은 노인, 사기꾼임이 드러납니다.',
    scenes: [
      {
        role: 'dorothy',
        situation: 'Oz keeps you waiting for days. At last, in the throne room, a voice speaks but no one is there. The Lion roars, Toto jumps aside and tips over a screen in the corner. Behind it stands a little old man with a bald head and a wrinkled face.',
        situationKo: '오즈는 며칠이나 기다리게 합니다. 마침내 알현실에서 목소리가 들리지만 아무도 없습니다. 사자가 포효하자 토토가 놀라 구석의 가리개를 넘어뜨립니다. 그 뒤에 대머리에 주름진 얼굴의 작은 노인이 서 있습니다.',
        speaker: 'The little old man', line: '(trembles) Please don\'t strike me. I\'ll do anything you want me to.',
        prompt: 'Ask him who he is.',
        promptKo: '누구냐고 물어보세요.',
        answers: [{ all: ['who'] }],
        model: 'Who are you?',
        distractors: ['Where is the Great Head?', 'Are you the Guardian of the Gate?', 'How did you get behind that screen?'],
        hints: ['Two little words and a question mark.', 'Key word: who'],
        hintsKo: ['짧은 질문 하나.', '핵심 단어: who'],
        reply: { speaker: 'The little old man', line: 'I am Oz, the Great and Terrible. But don\'t speak so loud, or you will be overheard. I\'m supposed to be a Great Wizard.' }
      },
      {
        role: 'dorothy',
        situation: 'He shows you the great Head made of paper, the tricks with wires, the voice thrown from behind the screen. He is no wizard at all, only a common man from Omaha who came in a balloon.',
        situationKo: '종이로 만든 거대한 머리, 철사로 부리는 속임수, 가리개 뒤에서 내는 목소리를 보여 줍니다. 그는 마법사가 아니라 풍선을 타고 온 오마하의 평범한 사람입니다.',
        speaker: 'Oz', line: 'I have been making believe. I am just a common man, a humbug.',
        prompt: 'Tell him what you think of him: he is a very bad man.',
        promptKo: '그를 어떻게 생각하는지 말하세요. 아주 나쁜 사람이라고요.',
        answers: [{ any: ['bad man', 'humbug', 'liar', 'shame', 'ashamed', 'terrible', 'wicked', 'cheat', 'fraud'] }],
        model: 'I think you are a very bad man.',
        distractors: ['I think you are the greatest wizard in the world.', 'I think you should build a bigger head.', 'I think Omaha must be very near Kansas.'],
        hints: ['"You are a very bad man."', 'Key words: bad man / humbug'],
        hintsKo: ['"당신은 아주 나쁜 사람이에요."', '핵심 단어: bad man / humbug'],
        reply: { speaker: 'Oz', line: 'Oh, no, my dear. I\'m really a very good man, but I\'m a very bad Wizard, I must admit.' }
      }
    ]
  },
  {
    num: 16, title: 'The Magic Art of the Great Humbug', ko: '위대한 사기꾼의 마법',
    summary: 'Oz gives the Scarecrow brains of bran and pins, the Tin Woodman a silk heart, and the Lion a drink of courage.',
    summaryKo: '오즈는 허수아비에게 밀기울과 핀으로 된 뇌를, 양철 나무꾼에게 비단 심장을, 사자에게 용기의 물약을 줍니다.',
    scenes: [
      {
        role: 'tinman',
        situation: 'Oz has cut a small square hole in your tin breast. From a chest he takes a pretty heart made of silk and stuffed with sawdust.',
        situationKo: '오즈가 당신의 양철 가슴에 네모난 구멍을 냈습니다. 서랍에서 비단으로 만들어 톱밥을 채운 예쁜 심장을 꺼냅니다.',
        speaker: 'Oz', line: 'Isn\'t it a beauty?',
        prompt: 'It is beautiful, but ask whether it is a kind heart.',
        promptKo: '아름답긴 하지만, 그것이 따뜻한(kind) 심장인지 물어보세요.',
        answers: [{ all: ['kind'] }, { all: ['heart'], any: ['good', 'gentle', 'loving'] }],
        model: 'It is, indeed! But is it a kind heart?',
        distractors: ['It is, indeed! But is it waterproof?', 'It is, indeed! How much does it weigh?', 'It is, indeed! Do you have one in blue?'],
        hints: ['You want a heart that is kind.', 'Key word: kind'],
        hintsKo: ['따뜻한 심장을 원합니다.', '핵심 단어: kind'],
        reply: { speaker: 'Oz', line: 'Oh, very! There, now you have a heart that any man might be proud of.' }
      },
      {
        role: 'lion',
        situation: 'Oz takes a square green bottle from a cupboard and pours it into a dish. He tells you to drink it.',
        situationKo: '오즈가 찬장에서 네모난 초록 병을 꺼내 접시에 따르고, 마시라고 합니다.',
        speaker: 'Oz', line: 'Drink.',
        prompt: 'Ask what it is.',
        promptKo: '그것이 무엇인지 물어보세요.',
        answers: [{ all: ['what'] }],
        model: 'What is it?',
        distractors: ['Is it milk?', 'I am not thirsty.', 'Pour some for the Scarecrow too.'],
        hints: ['A short question.', 'Key word: what'],
        hintsKo: ['짧은 질문.', '핵심 단어: what'],
        reply: { speaker: 'Oz', line: 'Courage. You know courage is always inside one, so this cannot be called courage until you have swallowed it.' }
      }
    ]
  },
  {
    num: 17, title: 'How the Balloon Was Launched', ko: '풍선을 띄우다',
    summary: 'Oz builds a balloon to take Dorothy home, but it rises without her.',
    summaryKo: '오즈는 도로시를 집으로 데려가려고 풍선을 만들지만, 풍선은 도로시 없이 떠오릅니다.',
    scenes: [
      {
        role: 'dorothy',
        situation: 'Oz has thought for three days. He says he is tired of being a humbug, and has made up his mind to leave Oz and go back with you.',
        situationKo: '오즈가 사흘 동안 생각했습니다. 사기꾼 노릇에 지쳤다며 오즈를 떠나 당신과 함께 돌아가겠다고 합니다.',
        speaker: 'Oz', line: 'I have decided to leave this country with you.',
        prompt: 'Ask how you will cross the great desert.',
        promptKo: '거대한 사막을 어떻게 건널지 물어보세요.',
        answers: [{ all: ['how'] }, { any: ['desert', 'cross'] }],
        model: 'But how shall we cross the desert?',
        distractors: ['But who will pay for the tickets?', 'But what about the Winged Monkeys?', 'But do you know Aunt Em?'],
        hints: ['Ask how.', 'Key word: how'],
        hintsKo: ['방법을 물어보세요.', '핵심 단어: how'],
        reply: { speaker: 'Oz', line: 'I came here in a balloon, and I think the best way to get across is through the air. We shall make a balloon.' }
      },
      {
        role: 'dorothy',
        situation: 'The balloon is ready and tugs at its ropes. Just as you go to climb in, Toto runs off after a kitten. When you catch him and turn back, the ropes are cut and the basket is rising into the air.',
        situationKo: '풍선이 완성되어 밧줄을 당깁니다. 타려는 순간 토토가 새끼 고양이를 쫓아 달아납니다. 토토를 잡아 돌아오니 밧줄은 끊기고 바구니가 하늘로 떠오릅니다.',
        speaker: 'Oz', line: '(from the basket, growing smaller)',
        prompt: 'Shout to Oz to come back; you want to go too.',
        promptKo: '오즈에게 돌아오라고, 당신도 가고 싶다고 소리치세요.',
        answers: [{ any: ['come back', 'wait', 'take me', 'go too', 'don\'t leave', 'do not leave', 'stop'] }],
        model: 'Come back! I want to go too!',
        distractors: ['Good-bye! Say hello to Omaha!', 'Throw down the brains!', 'Take Toto with you!'],
        hints: ['"Come back!"', 'Key words: come back / wait'],
        hintsKo: ['"돌아와요!"', '핵심 단어: come back / wait'],
        reply: { speaker: 'Oz', line: 'I can\'t come back, my dear. Good-bye!' }
      }
    ]
  },
  {
    num: 18, title: 'Away to the South', ko: '남쪽으로',
    summary: 'The soldier suggests Glinda, the good Witch of the South, and the friends set out together once more.',
    summaryKo: '병사가 남쪽의 착한 마녀 글린다를 알려 주고, 친구들은 다시 함께 길을 떠납니다.',
    scenes: [
      {
        role: 'dorothy',
        situation: 'Oz is gone, and the Scarecrow now rules the Emerald City. But you still cannot get home. You send for the soldier with the green whiskers.',
        situationKo: '오즈는 떠났고 허수아비가 에메랄드 시를 다스립니다. 하지만 당신은 여전히 집에 갈 수 없습니다. 초록 수염의 병사를 부릅니다.',
        speaker: 'The Soldier', line: 'You sent for me, Princess?',
        prompt: 'Ask who could help you get back to Kansas.',
        promptKo: '누가 캔자스로 돌아가는 것을 도울 수 있을지 물어보세요.',
        answers: [{ any: ['help', 'kansas', 'home', 'desert', 'cross'] }, { all: ['who'], any: ['could', 'can', 'send', 'take'] }],
        model: 'Is there anyone who could help me cross the desert and get back to Kansas?',
        distractors: ['Could you cut off your green whiskers?', 'Is there anyone who sells balloons?', 'Where do the Winged Monkeys sleep?'],
        hints: ['Ask who can help.', 'Key words: who / help / Kansas'],
        hintsKo: ['누가 도울 수 있는지 물어보세요.', '핵심 단어: who / help / Kansas'],
        reply: { speaker: 'The Soldier', line: 'Glinda might. She is the Witch of the South, the most powerful of all, and she rules over the Quadlings.' }
      },
      {
        role: 'dorothy',
        situation: 'You decide to go to Glinda. One by one, the Scarecrow, the Tin Woodman and the Lion say they will not let you go alone.',
        situationKo: '글린다를 찾아가기로 합니다. 허수아비, 양철 나무꾼, 사자가 차례로 혼자 보낼 수 없다고 말합니다.',
        speaker: 'The Lion', line: 'I would rather go with you. I am really a wild beast, and I need exercise.',
        prompt: 'Thank them all for being such good friends.',
        promptKo: '좋은 친구가 되어 주어 고맙다고 말하세요.',
        answers: [{ any: ['thank', 'thanks', 'kind', 'friends', 'grateful'] }],
        model: 'Thank you. You are all very kind to me.',
        distractors: ['No. I will go alone with Toto.', 'Good. Somebody has to carry my basket.', 'Only the Lion may come.'],
        hints: ['Say thank you.', 'Key words: thank / kind / friends'],
        hintsKo: ['고맙다고 하세요.', '핵심 단어: thank / kind / friends'],
        reply: { speaker: 'The Scarecrow', line: 'Then we will start tomorrow morning. Let us get ready, for it will be a long journey.' }
      }
    ]
  },
  {
    num: 19, title: 'Attacked by the Fighting Trees', ko: '싸우는 나무들의 습격',
    summary: 'Trees that grab travellers, and a high wall of white china.',
    summaryKo: '나그네를 붙잡는 나무들과 흰 도자기로 된 높은 담.',
    scenes: [
      {
        role: 'tinman',
        situation: 'At the edge of a forest, a big tree bends down its branches, seizes the Scarecrow and flings him back onto the road. You step forward with your axe.',
        situationKo: '숲 가장자리에서 큰 나무가 가지를 구부려 허수아비를 붙잡아 길로 내던집니다. 당신은 도끼를 들고 나섭니다.',
        speaker: 'The Scarecrow', line: 'Here is another space between the trees. Try that one.',
        prompt: 'Say what you do when the branch grabs you.',
        promptKo: '가지가 당신을 붙잡으면 어떻게 할지 말하세요.',
        answers: [{ any: ['chop', 'cut', 'axe', 'ax', 'hack'] }],
        model: 'I chop the branch in two with my axe.',
        distractors: ['I ask the branch politely to let go.', 'I climb the tree and sit on top.', 'I oil the branch so it slips.'],
        hints: ['You are a woodman.', 'Key words: chop / axe'],
        hintsKo: ['당신은 나무꾼입니다.', '핵심 단어: chop / axe'],
        reply: { speaker: 'Narrator', line: 'The tree shook all its branches as if in pain, and you passed safely under it. The other trees did nothing to keep you back.' }
      },
      {
        role: 'dorothy',
        situation: 'Beyond the forest stands a high wall, made of white china and smooth as a dish. It is too high to climb.',
        situationKo: '숲 너머에 접시처럼 매끈한 흰 도자기 담이 높이 서 있습니다. 기어오르기엔 너무 높습니다.',
        speaker: 'The Scarecrow', line: 'What shall we do now?',
        prompt: 'Suggest that the Tin Woodman make a ladder.',
        promptKo: '양철 나무꾼이 사다리를 만들자고 제안하세요.',
        answers: [{ any: ['ladder', 'climb', 'build', 'make'] }],
        model: 'The Tin Woodman could make a ladder, and we could climb over the wall.',
        distractors: ['The Lion could eat the wall.', 'We could throw Toto over and follow him.', 'We could wait for the wall to fall down.'],
        hints: ['Something to climb up on.', 'Key word: ladder'],
        hintsKo: ['올라갈 수 있는 것.', '핵심 단어: ladder'],
        reply: { speaker: 'The Tin Woodman', line: 'I will make a ladder from the trees in the forest.' }
      }
    ]
  },
  {
    num: 20, title: 'The Dainty China Country', ko: '앙증맞은 도자기 나라',
    summary: 'A land where everything and everyone is made of china, and breaks when it falls.',
    summaryKo: '모든 것이 도자기로 만들어져 떨어지면 깨지는 나라.',
    scenes: [
      {
        role: 'dorothy',
        situation: 'On the other side of the wall is a country where the houses, the people and the animals are all made of china. A china cow kicks over its stool and breaks its leg, and the china milkmaid is furious.',
        situationKo: '담 너머는 집도 사람도 동물도 모두 도자기로 된 나라입니다. 도자기 소가 걸상을 걷어차 다리가 부러지고, 도자기 우유 짜는 소녀가 화를 냅니다.',
        speaker: 'The Milkmaid', line: 'See what you have done! My cow has broken her leg!',
        prompt: 'Apologize.',
        promptKo: '사과하세요.',
        answers: [{ any: ['sorry', 'forgive', 'apologize', 'apologise', 'pardon'] }],
        model: 'I\'m very sorry. Please forgive us.',
        distractors: ['Cows should not have legs anyway.', 'It was Toto\'s fault.', 'Can we buy the cow?'],
        hints: ['"I\'m sorry."', 'Key word: sorry'],
        hintsKo: ['"미안해요."', '핵심 단어: sorry'],
        reply: { speaker: 'The Milkmaid', line: 'Well, I must take her to the mender\'s shop. You are clumsy, careless people!' }
      },
      {
        role: 'dorothy',
        situation: 'A beautiful china Princess runs away from you. When you promise not to chase her, she stops. You ask if she would like to come to Kansas and stand on Aunt Em\'s mantel-shelf.',
        situationKo: '아름다운 도자기 공주가 달아납니다. 쫓지 않겠다고 약속하자 멈춥니다. 캔자스에 가서 엠 아주머니의 벽난로 선반 위에 서 있지 않겠느냐고 묻습니다.',
        speaker: 'The China Princess', line: 'That would make me very unhappy. Here we can talk and move, but away from our country we become stiff and can only stand straight.',
        prompt: 'Tell her you would not make her unhappy for the world, and say goodbye.',
        promptKo: '절대로 불행하게 만들고 싶지 않다고 말하고 작별 인사를 하세요.',
        answers: [{ any: ['goodbye', 'good bye', 'unhappy', 'not make you', 'never'] }],
        model: 'I would not make you unhappy for all the world. So I\'ll just say good-bye.',
        distractors: ['Stiff is fine. Aunt Em likes quiet ornaments.', 'Then I will take the cow instead.', 'Please stand straight so I can carry you.'],
        hints: ['Say you would not make her unhappy; say goodbye.', 'Key words: unhappy / goodbye'],
        hintsKo: ['불행하게(unhappy) 하지 않겠다고, 안녕(goodbye).', '핵심 단어: unhappy / goodbye'],
        reply: { speaker: 'The China Princess', line: 'Good-bye.' }
      }
    ]
  },
  {
    num: 21, title: 'The Lion Becomes the King of Beasts', ko: '사자가 짐승의 왕이 되다',
    summary: 'In a wild forest, the Lion defeats a monstrous spider and is made King of the Beasts.',
    summaryKo: '거친 숲에서 사자는 괴물 거미를 물리치고 짐승의 왕이 됩니다.',
    scenes: [
      {
        role: 'lion',
        situation: 'Hundreds of beasts are gathered in council. A tiger tells you a monstrous spider is eating them one by one, and asks you, as a Lion, to save them.',
        situationKo: '수백 마리 짐승이 모여 회의 중입니다. 호랑이가 괴물 거미가 짐승들을 하나씩 잡아먹는다며, 사자인 당신에게 구해 달라고 합니다.',
        speaker: 'The Tiger', line: 'There are no other lions in this forest. Will you fight our enemy?',
        prompt: 'Agree, on one condition: if you kill the spider, they must bow down and obey you as King.',
        promptKo: '조건을 걸고 승낙하세요. 거미를 처치하면 모두 당신을 왕으로 섬겨야 한다고요.',
        answers: [{ any: ['king', 'obey', 'bow', 'rule', 'ruler'] }],
        model: 'If I put an end to your enemy, will you bow down and obey me as King of the Forest?',
        distractors: ['If I put an end to your enemy, will you give me a warm bed?', 'No. Spiders frighten me.', 'Ask the Tin Woodman. He has an axe.'],
        hints: ['Ask to be made King.', 'Key words: king / obey / bow'],
        hintsKo: ['왕(king)으로 삼아 달라고 하세요.', '핵심 단어: king / obey / bow'],
        reply: { speaker: 'The Tiger', line: 'We will do that gladly.' }
      },
      {
        role: 'lion',
        situation: 'You find the great spider asleep. Its body is as big as an elephant, but its neck is as slender as a wasp\'s waist.',
        situationKo: '거대한 거미가 잠들어 있습니다. 몸은 코끼리만 하지만 목은 말벌의 허리처럼 가늘습니다.',
        speaker: 'Narrator', line: 'You crouch, ready to spring. Where will you strike?',
        prompt: 'Say where you will strike: the slender neck, to knock off its head.',
        promptKo: '어디를 공격할지 말하세요. 가는 목을 쳐서 머리를 떼어 냅니다.',
        answers: [{ any: ['neck', 'head'] }],
        model: 'I will strike its slender neck and knock off its head.',
        distractors: ['I will tickle its legs.', 'I will roar until it runs away.', 'I will wait until it wakes up.'],
        hints: ['The thin part.', 'Key words: neck / head'],
        hintsKo: ['가는 부분.', '핵심 단어: neck / head'],
        reply: { speaker: 'The Beasts', line: '(bowing low) Our enemy is dead. You are our King!' }
      }
    ]
  },
  {
    num: 22, title: 'The Country of the Quadlings', ko: '쿼들링의 나라',
    summary: 'Hammer-Heads block the hill, the Winged Monkeys fly the friends over, and they reach Glinda\'s castle.',
    summaryKo: '망치 머리들이 언덕을 막지만 날개 달린 원숭이들이 친구들을 날려 보내고, 마침내 글린다의 성에 닿습니다.',
    scenes: [
      {
        role: 'dorothy',
        situation: 'A hill blocks the way. Strange men with no arms and flat heads shoot their necks out and knock the Scarecrow and the Lion back down the slope.',
        situationKo: '언덕이 길을 막습니다. 팔이 없고 머리가 납작한 이상한 남자들이 목을 쭉 뻗어 허수아비와 사자를 언덕 아래로 밀어 버립니다.',
        speaker: 'The Hammer-Head', line: 'Keep back! This hill belongs to us, and we don\'t allow anyone to cross it.',
        prompt: 'Remember the Golden Cap. Say you will call the Winged Monkeys.',
        promptKo: '황금 모자를 떠올리세요. 날개 달린 원숭이들을 부르겠다고 말하세요.',
        answers: [{ any: ['golden cap', 'cap', 'monkeys', 'monkey', 'charm'] }],
        model: 'I will use the Golden Cap and call the Winged Monkeys.',
        distractors: ['I will fight them with my basket.', 'I will ask the Hammer-Heads for a ladder.', 'I will walk back to the Emerald City.'],
        hints: ['The cap has one command left.', 'Key words: Golden Cap / Winged Monkeys'],
        hintsKo: ['모자에 명령이 한 번 남았습니다.', '핵심 단어: Golden Cap / Winged Monkeys'],
        reply: { speaker: 'The Monkey King', line: 'This is the last time you can summon us. What is your command? … Very well, to the Quadlings we go.' }
      },
      {
        role: 'dorothy',
        situation: 'The Quadlings are red and friendly. At the gate of a beautiful castle, a girl soldier in a red uniform asks your business.',
        situationKo: '쿼들링들은 붉은 옷을 입고 친절합니다. 아름다운 성문 앞에서 붉은 제복의 여자 병사가 용건을 묻습니다.',
        speaker: 'The Soldier Girl', line: 'What do you want?',
        prompt: 'Say you have come to see Glinda, the good Witch of the South.',
        promptKo: '남쪽의 착한 마녀 글린다를 만나러 왔다고 말하세요.',
        answers: [{ any: ['glinda', 'witch', 'south'] }],
        model: 'We have come to see the Good Witch who rules here. Will you take us to her?',
        distractors: ['We have come to buy red uniforms.', 'We have come to complain about the Hammer-Heads.', 'We have come to look at the castle and go home.'],
        hints: ['Name the Witch of the South.', 'Key word: Glinda'],
        hintsKo: ['남쪽 마녀의 이름을 대세요.', '핵심 단어: Glinda'],
        reply: { speaker: 'The Soldier Girl', line: 'Give me your names, and I will ask Glinda if she will receive you.' }
      }
    ]
  },
  {
    num: 23, title: 'Glinda the Good Witch Grants Dorothy\'s Wish', ko: '착한 마녀 글린다가 소원을 들어주다',
    summary: 'Glinda reveals the secret of the silver shoes, and the friends part.',
    summaryKo: '글린다가 은구두의 비밀을 알려 주고, 친구들은 작별합니다.',
    scenes: [
      {
        role: 'dorothy',
        situation: 'Glinda sits on a throne of rubies. She is young and beautiful, with red hair and blue eyes, and she looks at you kindly.',
        situationKo: '글린다가 루비 왕좌에 앉아 있습니다. 붉은 머리와 파란 눈의 젊고 아름다운 마녀가 당신을 다정하게 바라봅니다.',
        speaker: 'Glinda', line: 'What can I do for you, my child?',
        prompt: 'Tell her your greatest wish: to go back to Kansas, to Aunt Em and Uncle Henry.',
        promptKo: '가장 큰 소원을 말하세요. 캔자스의 엠 아주머니와 헨리 아저씨에게 돌아가는 것.',
        answers: [{ any: ['kansas', 'home', 'aunt em', 'uncle henry'] }],
        model: 'My greatest wish is to get back to Kansas, for Aunt Em will surely think something dreadful has happened to me.',
        distractors: ['My greatest wish is to rule the Emerald City.', 'My greatest wish is a new pair of shoes.', 'My greatest wish is to become a good witch like you.'],
        hints: ['Home to Kansas.', 'Key words: Kansas / home'],
        hintsKo: ['캔자스의 집으로.', '핵심 단어: Kansas / home'],
        reply: { speaker: 'Glinda', line: 'Bless your dear heart. I am sure I can tell you a way. But if I do, you must give me the Golden Cap.' }
      },
      {
        role: 'dorothy',
        situation: 'Glinda wants the Golden Cap so that she can send the Scarecrow back to the Emerald City, the Tin Woodman to the Winkies and the Lion to his forest, and then give the cap back to the monkeys.',
        situationKo: '글린다는 황금 모자로 허수아비를 에메랄드 시에, 양철 나무꾼을 윙키들에게, 사자를 숲으로 보낸 뒤 원숭이들에게 모자를 돌려주려 합니다.',
        speaker: 'Glinda', line: 'Will you give me the Golden Cap?',
        prompt: 'Give it to her gladly.',
        promptKo: '기꺼이 내주세요.',
        answers: [{ any: ['take it', 'here it is', 'here is', 'of course', 'gladly', 'yes', 'certainly'] }, { all: ['cap'], any: ['take', 'here', 'yours', 'give you', 'have it'] }],
        model: 'Of course! Here is the Golden Cap. It is of no use to me now.',
        distractors: ['No. The cap matches my shoes.', 'Only if you give me a ruby.', 'Ask the Monkey King. It is his cap.'],
        hints: ['Say yes and hand it over.', 'Key words: yes / here / Golden Cap'],
        hintsKo: ['예(yes)라고 하며 건네세요.', '핵심 단어: yes / here / Golden Cap'],
        reply: { speaker: 'Glinda', line: 'Thank you. Now, your Silver Shoes will carry you over the desert. If you had known their power you could have gone home the very first day.' }
      },
      {
        role: 'dorothy',
        situation: 'Glinda tells you the secret: knock the heels together three times and command the shoes to carry you wherever you wish. You hug your friends, take Toto in your arms, and click your heels.',
        situationKo: '글린다가 비밀을 알려 줍니다. 뒤꿈치를 세 번 부딪치고 구두에게 원하는 곳으로 데려가라고 명령하면 됩니다. 친구들을 안아 주고 토토를 안은 채 뒤꿈치를 부딪칩니다.',
        speaker: 'Narrator', line: 'One… two… three. Now give the shoes your command.',
        prompt: 'Command the shoes to take you home to Aunt Em.',
        promptKo: '구두에게 엠 아주머니가 있는 집으로 데려가라고 명령하세요.',
        answers: [{ any: ['home', 'kansas', 'aunt em'] }],
        model: 'Take me home to Aunt Em!',
        distractors: ['Take me to the Emerald City!', 'Take me to Omaha with Oz!', 'Take me to the top of the china wall!'],
        hints: ['"Take me home."', 'Key words: home / Aunt Em'],
        hintsKo: ['"집으로 데려다줘."', '핵심 단어: home / Aunt Em'],
        reply: { speaker: 'Narrator', line: 'Instantly you were whirling through the air, so swiftly that all you could see or feel was the wind whistling past your ears.' }
      }
    ]
  },
  {
    num: 24, title: 'Home Again', ko: '다시 집으로',
    summary: 'Dorothy rolls onto the Kansas prairie, and Aunt Em runs to meet her.',
    summaryKo: '도로시는 캔자스 초원에 굴러떨어지고, 엠 아주머니가 달려옵니다.',
    scenes: [
      {
        role: 'dorothy',
        situation: 'You tumble onto the grass and sit up. The great Kansas prairie stretches around you, and there is the new farmhouse Uncle Henry built. Aunt Em comes out of the house and runs toward you.',
        situationKo: '풀밭에 굴러떨어져 일어나 앉습니다. 넓은 캔자스 초원이 펼쳐지고, 헨리 아저씨가 새로 지은 농가가 보입니다. 엠 아주머니가 집에서 나와 달려옵니다.',
        speaker: 'Aunt Em', line: 'My darling child! Where in the world did you come from?',
        prompt: 'Tell her where you came from.',
        promptKo: '어디에서 왔는지 말하세요.',
        answers: [{ any: ['oz', 'land of oz'] }],
        model: 'From the Land of Oz. And here is Toto, too.',
        distractors: ['From the cellar. I was hiding.', 'From Omaha, in a balloon.', 'From the barn, with Uncle Henry.'],
        hints: ['The land beyond the desert.', 'Key word: Oz'],
        hintsKo: ['사막 너머의 나라.', '핵심 단어: Oz'],
        reply: { speaker: 'Aunt Em', line: '(covers your face with kisses)' }
      },
      {
        role: 'dorothy',
        situation: 'The silver shoes fell off during your flight and are lost forever in the desert. But you do not mind. You are in Aunt Em\'s arms.',
        situationKo: '은구두는 날아오는 동안 벗겨져 사막에서 영영 잃어버렸습니다. 하지만 상관없습니다. 당신은 엠 아주머니 품에 있습니다.',
        speaker: 'Aunt Em', line: '(holds you tight)',
        prompt: 'Say how glad you are to be home again.',
        promptKo: '집에 다시 돌아와서 얼마나 기쁜지 말하세요.',
        answers: [{ any: ['glad', 'happy', 'home'] }],
        model: 'Oh, Aunt Em! I\'m so glad to be at home again!',
        distractors: ['Oh, Aunt Em! I lost my shoes in the desert!', 'Oh, Aunt Em! Have you seen a Scarecrow?', 'Oh, Aunt Em! Is dinner ready?'],
        hints: ['Glad to be home.', 'Key words: glad / home'],
        hintsKo: ['집에 와서 기쁘다.', '핵심 단어: glad / home'],
        reply: { speaker: 'Narrator', line: 'The End.' }
      }
    ]
  }
];

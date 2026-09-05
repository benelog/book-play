/* The Tales of Peter Rabbit and Friends (Beatrix Potter, 1902–1910 — public domain). Game data for 10 tales.
   Field reference: books/README.md. Situations, prompts, hints and distractors are original; quoted lines are short. */
window.LP_ROLES = {
  peter: { en: 'You are Peter Rabbit. ', ko: '당신은 피터 래빗입니다. ' },
  nutkin: { en: 'You are Squirrel Nutkin. ', ko: '당신은 다람쥐 넛킨입니다. ' },
  benjamin: { en: 'You are Benjamin Bunny. ', ko: '당신은 벤자민 버니입니다. ' },
  tomthumb: { en: 'You are Tom Thumb, a little mouse. ', ko: '당신은 작은 생쥐 톰 섬입니다. ' },
  lucie: { en: 'You are Lucie, a little girl. ', ko: '당신은 어린 소녀 루시입니다. ' },
  jeremy: { en: 'You are Mr. Jeremy Fisher, a frog. ', ko: '당신은 개구리 제레미 피셔 씨입니다. ' },
  tomkitten: { en: 'You are Tom Kitten. ', ko: '당신은 아기 고양이 톰 키튼입니다. ' },
  jemima: { en: 'You are Jemima Puddle-Duck. ', ko: '당신은 오리 제미마 퍼들덕입니다. ' },
  tittlemouse: { en: 'You are Mrs. Tittlemouse, a wood mouse. ', ko: '당신은 숲쥐 티틀마우스 부인입니다. ' }
};
window.LP_SCENES = [
  {
    num: 1, title: 'The Tale of Peter Rabbit', ko: '피터 래빗 이야기',
    summary: 'Peter disobeys his mother, sneaks into Mr. McGregor\'s garden, loses his jacket and shoes, and comes home to bed with camomile tea.',
    summaryKo: '피터는 엄마 말을 어기고 맥그레거 씨의 밭에 들어갔다가 재킷과 신발을 잃어버리고, 겨우 도망쳐 캐모마일 차를 마시고 잠자리에 듭니다.',
    scenes: [
      {
        role: 'peter',
        situation: 'You live under a big fir tree with your mother and your three sisters, Flopsy, Mopsy and Cotton-tail. Your mother is putting on her cloak to go to the baker\'s, and she is looking straight at you.',
        situationKo: '당신은 큰 전나무 아래에서 엄마와 세 누이 플롭시, 몹시, 코튼테일과 함께 삽니다. 엄마는 빵집에 가려고 망토를 걸치며 당신을 똑바로 쳐다봅니다.',
        speaker: 'Mrs. Rabbit', line: 'Do not go into Mr. McGregor\'s garden. Your father had an accident there.',
        prompt: 'Tell your mother that you will not go into the garden.',
        promptKo: '엄마에게 그 밭에는 가지 않겠다고 말하세요.',
        answers: [{ all: ['not'], any: ['go', 'garden'] }, { any: ['promise', 'careful'] }],
        model: 'I will not go there.',
        distractors: ['I will eat Mr. McGregor\'s cabbages.', 'May I have a new blue jacket?', 'Let us all run to the sea.'],
        hints: ['Say "I will not …" to your mother.', 'Key words: not + go'],
        hintsKo: ['엄마에게 "가지 않을게요"라고 말하세요.', '핵심 단어: not + go'],
        reply: { speaker: 'Mrs. Rabbit', line: 'Then run along, and do not get into mischief. I am going to the baker\'s.' }
      },
      {
        role: 'peter',
        situation: 'You went straight to the garden anyway. You have eaten lettuces, French beans and radishes, and now you feel rather sick. Looking for parsley, you turn a corner and meet Mr. McGregor on his hands and knees.',
        situationKo: '당신은 결국 곧장 밭으로 갔습니다. 상추와 강낭콩과 무를 잔뜩 먹어 속이 좋지 않습니다. 파슬리를 찾다가 모퉁이를 돌자 무릎을 꿇고 있던 맥그레거 씨와 마주칩니다.',
        speaker: 'Mr. McGregor', line: 'Stop thief! Stop!',
        prompt: 'Say what you are going to do: get away as fast as you can.',
        promptKo: '무엇을 할지 말하세요. 있는 힘껏 달아나야 합니다.',
        answers: [{ any: ['run', 'away', 'escape', 'hide', 'flee'] }],
        model: 'I will run away!',
        distractors: ['I will sit down and rest.', 'Good morning, may I have some parsley?', 'I will help you dig the garden.'],
        hints: ['Do not stay and talk to him.', 'Key words: run / away'],
        hintsKo: ['멈춰 서서 이야기할 때가 아닙니다.', '핵심 단어: run / away'],
        reply: { speaker: 'Narrator', line: 'You ran, and lost one shoe among the cabbages and the other shoe among the potatoes.' }
      },
      {
        role: 'peter',
        situation: 'Running in your blue jacket, you get caught by the big brass buttons in a gooseberry net. Some friendly sparrows fly down to you in great excitement.',
        situationKo: '파란 재킷을 입고 달리다가 커다란 놋쇠 단추가 구스베리 그물에 걸려 버렸습니다. 다정한 참새들이 몹시 흥분해서 당신에게 날아옵니다.',
        speaker: 'The sparrows', line: 'Peter! Peter! Exert yourself!',
        prompt: 'Ask the sparrows to help you get out of the net.',
        promptKo: '참새들에게 그물에서 빠져나오게 도와 달라고 부탁하세요.',
        answers: [{ any: ['help', 'free', 'net', 'get out', 'out', 'save'] }],
        model: 'Please help me out!',
        distractors: ['Please sing me a little song.', 'Go away, I am having a nap.', 'I would like some more radishes.'],
        hints: ['Ask for help.', 'Key words: help / out'],
        hintsKo: ['도와 달라고 하세요.', '핵심 단어: help / out'],
        reply: { speaker: 'Narrator', line: 'You wriggled out just in time, leaving the jacket behind, and hid in a can in the tool-shed.' }
      }
    ]
  },
  {
    num: 2, title: 'The Tale of Squirrel Nutkin', ko: '다람쥐 넛킨 이야기',
    summary: 'Nutkin teases Old Brown the owl with riddles instead of paying for his nuts, and in the end he loses his tail.',
    summaryKo: '넛킨은 도토리 값을 치르는 대신 부엉이 올드 브라운에게 수수께끼를 내며 놀리다가, 결국 꼬리를 잃고 맙니다.',
    scenes: [
      {
        role: 'nutkin',
        situation: 'You and the other squirrels have rowed on little rafts to Owl Island to gather nuts. Old Brown the owl lives in the middle of the island, and the squirrels always bring him a present first.',
        situationKo: '당신과 다른 다람쥐들은 작은 뗏목을 타고 도토리를 모으러 부엉이 섬으로 건너왔습니다. 섬 한가운데에는 부엉이 올드 브라운이 살고, 다람쥐들은 늘 먼저 선물을 바칩니다.',
        speaker: 'Twinkleberry', line: 'We have brought a present of mice. Now ask him politely.',
        prompt: 'Ask Old Brown politely for permission to gather nuts on his island.',
        promptKo: '올드 브라운에게 그의 섬에서 도토리를 주워도 되는지 공손히 여쭤 보세요.',
        answers: [{ all: ['nuts'] }, { any: ['gather', 'permission', 'collect', 'pick up'] }],
        model: 'Please may we gather nuts?',
        distractors: ['Give us your feathers, old bird!', 'We would like to sleep in your tree.', 'Have you seen my lost tail?'],
        hints: ['A polite question with "may we".', 'Key words: nuts / gather'],
        hintsKo: ['"may we"로 시작하는 공손한 질문입니다.', '핵심 단어: nuts / gather'],
        reply: { speaker: 'Narrator', line: 'Old Brown opened one eye, shut it again, and said nothing at all. The squirrels filled their sacks.' }
      },
      {
        role: 'nutkin',
        situation: 'The other squirrels work quietly all day. You do not. You dance up and down in front of the owl\'s doorway like a sunbeam, tickling him with a nettle.',
        situationKo: '다른 다람쥐들은 하루 종일 조용히 일합니다. 하지만 당신은 아닙니다. 부엉이 집 문 앞에서 햇살처럼 팔짝팔짝 뛰며 쐐기풀로 그를 간질입니다.',
        speaker: 'Narrator', line: 'Old Brown sits on his doorstep with his eyes tight shut, and says nothing at all.',
        prompt: 'Tell the owl you have a riddle for him, and ask him to guess it.',
        promptKo: '부엉이에게 수수께끼가 있으니 맞혀 보라고 말하세요.',
        answers: [{ any: ['riddle', 'guess', 'puzzle', 'riddle me'] }],
        model: 'Guess my riddle, Old Brown!',
        distractors: ['I am sorry I was rude.', 'Here is a fat mouse for you.', 'May I sweep your doorstep?'],
        hints: ['A question that must be answered is a riddle.', 'Key words: riddle / guess'],
        hintsKo: ['맞혀야 하는 질문이 수수께끼(riddle)입니다.', '핵심 단어: riddle / guess'],
        reply: { speaker: 'Narrator', line: 'Old Brown took no notice whatever of Nutkin. He shut his eyes obstinately and went to sleep.' }
      },
      {
        role: 'nutkin',
        situation: 'For six days you have sung rude riddles. This morning you jump right onto the owl\'s head — and Old Brown is suddenly wide awake, holding you fast in one claw.',
        situationKo: '엿새 동안 무례한 수수께끼를 불러 댔습니다. 오늘 아침에는 부엉이의 머리 위로 폴짝 뛰어올랐는데, 올드 브라운이 번쩍 깨어나 발톱으로 당신을 꽉 붙잡았습니다.',
        speaker: 'Old Brown', line: 'So. I have you at last, little squirrel.',
        prompt: 'Beg the owl to let you go.',
        promptKo: '부엉이에게 놓아 달라고 사정하세요.',
        answers: [{ any: ['let me go', 'let go', 'sorry', 'please', 'release', 'forgive'] }],
        model: 'Let me go, please!',
        distractors: ['Now I will pull your feathers out.', 'I have another riddle for you.', 'Look at my fine bushy tail!'],
        hints: ['This is no time for another riddle.', 'Key words: let me go / please'],
        hintsKo: ['수수께끼를 낼 때가 아닙니다.', '핵심 단어: let me go / please'],
        reply: { speaker: 'Narrator', line: 'Old Brown carried you into his house — but you pulled so hard that your tail broke in two, and you escaped.' }
      }
    ]
  },
  {
    num: 3, title: 'The Tale of Benjamin Bunny', ko: '벤자민 버니 이야기',
    summary: 'Benjamin takes his cousin Peter back into the garden to fetch his clothes; a cat traps them under a basket, and old Mr. Bunny rescues them.',
    summaryKo: '벤자민은 사촌 피터의 옷을 찾으러 다시 밭으로 들어갑니다. 고양이 때문에 바구니에 갇히지만, 버니 할아버지가 둘을 구해 냅니다.',
    scenes: [
      {
        role: 'benjamin',
        situation: 'You have trotted along the top of the wall to your aunt\'s house. Your cousin Peter is sitting on the doorstep, wrapped in a red cotton handkerchief and looking very poorly.',
        situationKo: '당신은 담장 위를 총총 걸어 이모네 집에 왔습니다. 사촌 피터가 빨간 무명 손수건을 두른 채 문간에 앉아 몹시 아파 보입니다.',
        speaker: 'Peter Rabbit', line: 'I lost my jacket and my shoes in the garden.',
        prompt: 'Offer to go with Peter and get his clothes back.',
        promptKo: '피터와 함께 가서 옷을 되찾아 오자고 말하세요.',
        answers: [{ any: ['get them', 'go with', 'come with', 'together', 'clothes', 'fetch', 'back'] }],
        model: 'Let us get them back!',
        distractors: ['Buy a new jacket at the shop.', 'Never mind, stay in bed.', 'I am afraid of Mr. McGregor.'],
        hints: ['Say you will go and bring the clothes back.', 'Key words: get them / back'],
        hintsKo: ['가서 옷을 되찾아 오자고 하세요.', '핵심 단어: get them / back'],
        reply: { speaker: 'Peter Rabbit', line: 'But how? Mr. McGregor is always in the garden.' }
      },
      {
        role: 'benjamin',
        situation: 'The McGregors have driven away in a gig, so you climb down a pear tree into the garden. There, on a scarecrow in the middle of the onion bed, hang Peter\'s little jacket and shoes.',
        situationKo: '맥그레거 부부가 마차를 타고 나갔기에, 둘은 배나무를 타고 밭으로 내려옵니다. 양파밭 한가운데 허수아비에 피터의 작은 재킷과 신발이 걸려 있습니다.',
        speaker: 'Peter Rabbit', line: 'There they are — but I do not like this place at all.',
        prompt: 'Tell Peter to hurry and take his jacket off the scarecrow.',
        promptKo: '피터에게 서둘러 허수아비에서 재킷을 벗겨 오라고 말하세요.',
        answers: [{ any: ['jacket', 'clothes', 'scarecrow', 'hurry', 'quick', 'take them'] }],
        model: 'Quick, take your jacket down!',
        distractors: ['Let us pick some flowers first.', 'I will ask Mr. McGregor for tea.', 'Sit down and eat these onions.'],
        hints: ['Be quick — the clothes are on the scarecrow.', 'Key words: quick / jacket'],
        hintsKo: ['서두르세요. 옷은 허수아비에 있습니다.', '핵심 단어: quick / jacket'],
        reply: { speaker: 'Narrator', line: 'Peter put on the clothes, and you filled the handkerchief with onions as a little present for your aunt.' }
      },
      {
        role: 'benjamin',
        situation: 'A cat found you both and sat on top of the basket you were hiding under — for five hours. At last you hear heavy steps, and the basket is lifted. Your father, old Mr. Bunny, is standing over you with a switch.',
        situationKo: '고양이가 둘을 발견하고는 숨어 있던 바구니 위에 다섯 시간이나 앉아 있었습니다. 마침내 묵직한 발소리가 나고 바구니가 들리더니, 아버지 버니 할아버지가 회초리를 들고 서 있습니다.',
        speaker: 'Old Mr. Bunny', line: 'And what are you two doing under a basket?',
        prompt: 'Explain to your father that a cat shut you in.',
        promptKo: '아버지에게 고양이가 둘을 가두었다고 설명하세요.',
        answers: [{ any: ['cat', 'basket', 'shut', 'trapped', 'stuck'] }],
        model: 'A cat shut us in here.',
        distractors: ['We are playing hide and seek.', 'We are digging for carrots.', 'Nothing at all, Father.'],
        hints: ['Say who put you there.', 'Key words: cat / shut'],
        hintsKo: ['누가 그렇게 했는지 말하세요.', '핵심 단어: cat / shut'],
        reply: { speaker: 'Narrator', line: 'Old Mr. Bunny whipped you both with the switch and marched you home — but Peter\'s mother forgave him, she was so glad to see the jacket.' }
      }
    ]
  },
  {
    num: 4, title: 'The Tale of Two Bad Mice', ko: '나쁜 생쥐 두 마리 이야기',
    summary: 'Two mice wreck a dolls\' house when they find the fine food is only plaster — and then pay for the damage with a crooked sixpence.',
    summaryKo: '생쥐 두 마리가 인형의 집에 들어갔다가 훌륭한 음식이 전부 석고임을 알고 집을 부숴 버립니다. 나중에는 구부러진 6펜스로 값을 치릅니다.',
    scenes: [
      {
        role: 'tomthumb',
        situation: 'The dolls Lucinda and Jane have gone out for a drive, so you and Hunca Munca have crept into their beautiful dolls\' house. On the dining table stand a ham, a fish and a pudding, all wonderfully red and yellow. But your knife will not cut the ham.',
        situationKo: '인형 루신다와 제인이 마차를 타고 나간 사이, 당신과 헝카 뭉카는 예쁜 인형의 집으로 몰래 들어왔습니다. 식탁에는 햄과 생선과 푸딩이 빨갛고 노랗게 놓여 있습니다. 그런데 칼로 햄이 잘리지 않습니다.',
        speaker: 'Hunca Munca', line: 'Try the fish, Tom Thumb. Try the pudding.',
        prompt: 'Tell Hunca Munca that the food is not real.',
        promptKo: '헝카 뭉카에게 이 음식은 진짜가 아니라고 말하세요.',
        answers: [{ any: ['not real', 'fake', 'plaster', 'pretend', 'it is not', 'not food', 'cannot eat'] }],
        model: 'It is not real food!',
        distractors: ['This ham is very sweet.', 'Please pass me the salt.', 'I will eat the whole pudding.'],
        hints: ['The ham is hard and painted — it is only pretend.', 'Key words: not real'],
        hintsKo: ['햄은 딱딱하고 색칠만 되어 있습니다. 그저 흉내일 뿐입니다.', '핵심 단어: not real'],
        reply: { speaker: 'Narrator', line: 'The ham was made of plaster. In a rage you threw it down and broke it into pieces on the floor.' }
      },
      {
        role: 'tomthumb',
        situation: 'You have broken the ham, thrown the fish into the fire, and carried off a cradle, some clothes and a bolster to your mouse hole. Then you find a crooked sixpence under the hearth rug of the nursery.',
        situationKo: '당신은 햄을 부수고 생선을 불에 던지고, 요람과 옷과 베개를 쥐구멍으로 가져갔습니다. 그러다 아이 방 난롯가 깔개 밑에서 구부러진 6펜스 동전을 발견합니다.',
        speaker: 'Hunca Munca', line: 'The little girl who owns the dolls will be so angry.',
        prompt: 'Say that you will pay for everything you broke.',
        promptKo: '망가뜨린 것을 모두 물어 주겠다고 말하세요.',
        answers: [{ any: ['pay', 'sixpence', 'money', 'sorry', 'mend'] }],
        model: 'I will pay for it.',
        distractors: ['Let us break the beds too.', 'The dolls will never know.', 'Hide under the hearth rug.'],
        hints: ['You have found a coin.', 'Key words: pay / sixpence'],
        hintsKo: ['동전을 하나 찾았습니다.', '핵심 단어: pay / sixpence'],
        reply: { speaker: 'Narrator', line: 'On Christmas Eve you put the crooked sixpence into the dolls\' stocking — and Hunca Munca sweeps the dolls\' house every morning.' }
      }
    ]
  },
  {
    num: 5, title: 'The Tale of Mrs. Tiggy-Winkle', ko: '티기윙클 부인 이야기',
    summary: 'Lucie follows her lost handkerchiefs up the hill and finds Mrs. Tiggy-Winkle, a hedgehog washerwoman who washes for all the animals.',
    summaryKo: '루시는 잃어버린 손수건을 찾아 언덕을 올라가다가, 모든 동물의 빨래를 해 주는 고슴도치 세탁부 티기윙클 부인을 만납니다.',
    scenes: [
      {
        role: 'lucie',
        situation: 'You have lost three pocket handkerchiefs and a pinafore. You look behind the gate and under the hedge, and then you go and ask the animals of the farmyard.',
        situationKo: '당신은 손수건 세 장과 앞치마를 잃어버렸습니다. 대문 뒤와 울타리 밑을 살펴본 뒤, 농장의 동물들에게 물어보러 갑니다.',
        speaker: 'Sally Henny-penny', line: 'Cluck! Go barefoot, go barefoot!',
        prompt: 'Ask the hen whether she has seen your handkerchiefs.',
        promptKo: '암탉에게 당신의 손수건을 보았는지 물어보세요.',
        answers: [{ any: ['handkerchief', 'handkerchiefs', 'pocket', 'pinny', 'seen', 'lost', 'looking for'] }],
        model: 'Have you seen my handkerchiefs?',
        distractors: ['Please lay me a brown egg.', 'May I have some corn?', 'Where is the farm gate?'],
        hints: ['Start with "Have you seen …".', 'Key words: seen / handkerchiefs'],
        hintsKo: ['"Have you seen …"로 시작해 보세요.', '핵심 단어: seen / handkerchiefs'],
        reply: { speaker: 'Narrator', line: 'None of the animals could tell you anything, so you climbed the steep hill behind the farm to look for them.' }
      },
      {
        role: 'lucie',
        situation: 'High on the hillside you find a little door in the green turf, and a smell of hot ironing comes out of it. Somebody inside is singing.',
        situationKo: '언덕 높은 곳 푸른 잔디밭에 작은 문이 나 있고, 그 안에서 뜨겁게 다림질하는 냄새가 흘러나옵니다. 안에서 누군가 노래를 부릅니다.',
        speaker: 'A small voice inside', line: 'Who is that at my door?',
        prompt: 'Say who you are and ask if you may come in.',
        promptKo: '자기가 누구인지 말하고 들어가도 되는지 물어보세요.',
        answers: [{ any: ['lucie', 'come in', 'may i', 'please'] }],
        model: 'I am Lucie. May I come in?',
        distractors: ['Open up at once, hedgehog!', 'I am the postman with a letter.', 'Nobody is here but us hens.'],
        hints: ['Give your name, then ask politely.', 'Key words: Lucie / come in'],
        hintsKo: ['이름을 말한 뒤 공손히 물어보세요.', '핵심 단어: Lucie / come in'],
        reply: { speaker: 'Mrs. Tiggy-Winkle', line: 'Come in! My name is Mrs. Tiggy-Winkle, and I am an excellent clear-starcher.' }
      },
      {
        role: 'lucie',
        situation: 'The little brown person with prickles under her cap has been ironing all day. Out of her clothes-basket she takes three small handkerchiefs and a pinafore — clean, dry and beautifully ironed. They are yours.',
        situationKo: '모자 밑에 가시가 삐죽 나온 작고 갈색인 아주머니가 하루 종일 다림질을 했습니다. 빨래 바구니에서 작은 손수건 세 장과 앞치마를 꺼내는데, 깨끗하고 잘 말라 곱게 다려져 있습니다. 당신의 것입니다.',
        speaker: 'Mrs. Tiggy-Winkle', line: 'Here are your pocket-handkins, and your pinny is quite clean.',
        prompt: 'Thank her for washing your things.',
        promptKo: '빨래를 해 준 것에 대해 고맙다고 말하세요.',
        answers: [{ any: ['thank', 'thanks', 'thank you', 'grateful', 'kind'] }],
        model: 'Thank you very much!',
        distractors: ['These are not mine at all.', 'You have made them dirty.', 'Where is my other shoe?'],
        hints: ['Two polite words are enough.', 'Key words: thank you'],
        hintsKo: ['정중한 두 단어면 충분합니다.', '핵심 단어: thank you'],
        reply: { speaker: 'Narrator', line: 'You ran down the hill to meet her at the stile — but she was only a hedgehog, running away among the fern.' }
      }
    ]
  },
  {
    num: 6, title: 'The Tale of Mr. Jeremy Fisher', ko: '제레미 피셔 이야기',
    summary: 'Mr. Jeremy Fisher goes fishing on a lily leaf, is swallowed by a great trout, and serves roasted grasshopper to his friends instead of fish.',
    summaryKo: '제레미 피셔 씨는 연잎 배를 타고 낚시를 나갔다가 커다란 송어에게 삼켜집니다. 결국 친구들에게 생선 대신 구운 메뚜기를 대접합니다.',
    scenes: [
      {
        role: 'jeremy',
        situation: 'You went out fishing on a lily-leaf boat to catch minnows for dinner. Something enormous has just snapped you up with a great splash — and then spat you out again, because it did not like the taste of your macintosh.',
        situationKo: '당신은 저녁거리로 피라미를 잡으려고 연잎 배를 타고 낚시를 나갔습니다. 그런데 무언가 거대한 것이 첨벙 하고 당신을 삼켰다가, 우비 맛이 싫었는지 도로 뱉어 냈습니다.',
        speaker: 'Narrator', line: 'The great big trout spits you out and turns away. You float in the water.',
        prompt: 'Say that you will never go fishing again.',
        promptKo: '다시는 낚시를 하지 않겠다고 말하세요.',
        answers: [{ any: ['never', 'home', 'again', 'enough', 'stop', 'no more'] }],
        model: 'I will never fish again!',
        distractors: ['That was a lovely swim.', 'I will catch that trout tomorrow.', 'Give me back my macintosh.'],
        hints: ['Use "never" to say you have had enough.', 'Key words: never / again'],
        hintsKo: ['"never"를 써서 이제 그만이라고 말하세요.', '핵심 단어: never / again'],
        reply: { speaker: 'Narrator', line: 'You swam to the edge of the pond, scrambled out, and hopped home across the meadow with your macintosh all in tatters.' }
      },
      {
        role: 'jeremy',
        situation: 'You are safe at home again, and your friends are coming to supper. Sir Isaac Newton the newt wears his black and gold waistcoat, and Mr. Alderman Ptolemy Tortoise brings a salad in a string bag. You have no fish at all.',
        situationKo: '무사히 집에 돌아왔고, 저녁 식사에 친구들이 옵니다. 도롱뇽 아이작 뉴턴 경은 검정과 금빛 조끼를 입고 왔고, 거북 프톨레미 톨토이즈 씨는 그물 가방에 샐러드를 담아 왔습니다. 그런데 생선은 하나도 없습니다.',
        speaker: 'Sir Isaac Newton', line: 'And what is for dinner tonight, Jeremy?',
        prompt: 'Tell your guests you will serve roasted grasshopper instead of fish.',
        promptKo: '손님들에게 생선 대신 구운 메뚜기를 내겠다고 말하세요.',
        answers: [{ any: ['grasshopper', 'ladybird', 'beetle', 'no fish', 'not fish'] }],
        model: 'Roasted grasshopper with ladybird sauce.',
        distractors: ['A big fried trout, of course.', 'Nothing at all, I am afraid.', 'Bread and butter and jam.'],
        hints: ['An insect that jumps in the grass.', 'Key word: grasshopper'],
        hintsKo: ['풀밭에서 뛰어다니는 곤충입니다.', '핵심 단어: grasshopper'],
        reply: { speaker: 'Narrator', line: 'Sir Isaac and Mr. Alderman Ptolemy Tortoise thought it a beautiful treat — though I should not have liked it myself.' }
      }
    ]
  },
  {
    num: 7, title: 'The Tale of Tom Kitten', ko: '톰 키튼 이야기',
    summary: 'Tom Kitten and his sisters burst out of their party clothes on the garden wall, and the Puddle-Ducks carry the clothes away.',
    summaryKo: '톰 키튼과 누이들은 정원 담장 위에서 나들이옷을 터뜨려 벗어 버리고, 퍼들덕 오리들이 그 옷을 가져가 버립니다.',
    scenes: [
      {
        role: 'tomkitten',
        situation: 'Your mother has invited friends to tea. She has washed your face, brushed your fur, and squeezed you into a blue suit with big brass buttons. The buttons are already very tight.',
        situationKo: '엄마가 친구들을 차 모임에 초대했습니다. 엄마는 당신 얼굴을 씻기고 털을 빗기고, 커다란 놋쇠 단추가 달린 파란 옷에 억지로 밀어 넣었습니다. 단추가 벌써 몹시 꽉 낍니다.',
        speaker: 'Mrs. Tabitha Twitchit', line: 'Keep your clothes clean, and walk on your hind legs.',
        prompt: 'Complain politely that the clothes are too tight.',
        promptKo: '옷이 너무 꽉 낀다고 공손히 불평해 보세요.',
        answers: [{ any: ['tight', 'clothes', 'buttons', 'uncomfortable', 'too small', 'hot'] }],
        model: 'These clothes are too tight!',
        distractors: ['May I have another mouse?', 'I will roll in the dirt.', 'The garden is full of ducks.'],
        hints: ['The opposite of loose.', 'Key words: clothes / tight'],
        hintsKo: ['헐렁하다(loose)의 반대말입니다.', '핵심 단어: clothes / tight'],
        reply: { speaker: 'Mrs. Tabitha Twitchit', line: 'Never mind. Go out into the garden, and keep away from the dirty ash-pit.' }
      },
      {
        role: 'tomkitten',
        situation: 'On the rockery your buttons burst off one by one, and your hat falls into the road. Three Puddle-Ducks come marching along and pick everything up. Then Mr. Drake Puddle-Duck puts your clothes on himself.',
        situationKo: '돌무더기 위에서 단추가 하나씩 튀어 나가고, 모자는 길로 떨어집니다. 퍼들덕 오리 셋이 줄지어 오더니 떨어진 것을 전부 주워 갑니다. 그러고는 드레이크 퍼들덕 씨가 그 옷을 자기가 입어 버립니다.',
        speaker: 'Mr. Drake Puddle-Duck', line: 'It is a very fine morning, and this is a very fine suit.',
        prompt: 'Ask the drake to give your clothes back.',
        promptKo: '수오리에게 옷을 돌려 달라고 하세요.',
        answers: [{ any: ['clothes', 'give', 'back', 'mine', 'hat', 'trousers'] }],
        model: 'Give me my clothes back!',
        distractors: ['You may keep the buttons.', 'Please teach me to swim.', 'Let us go down to the pond.'],
        hints: ['Ask for them back.', 'Key words: give / back'],
        hintsKo: ['돌려 달라고 하세요.', '핵심 단어: give / back'],
        reply: { speaker: 'Narrator', line: 'Mr. Drake Puddle-Duck waddled off down the road with the clothes, and they were never found again.' }
      },
      {
        role: 'tomkitten',
        situation: 'Your mother comes down the garden and finds you on top of the wall with no clothes at all. The friends are already walking up the lane for tea.',
        situationKo: '엄마가 정원으로 내려와 담장 꼭대기에 옷 한 벌 없이 앉아 있는 당신을 발견합니다. 손님들은 벌써 차를 마시러 오솔길을 올라오고 있습니다.',
        speaker: 'Mrs. Tabitha Twitchit', line: 'Tom Kitten! Where are your clothes?',
        prompt: 'Say sorry and tell her the ducks took them.',
        promptKo: '죄송하다고 말하고 오리들이 가져갔다고 하세요.',
        answers: [{ any: ['sorry', 'ducks', 'duck', 'took', 'lost', 'puddle duck'] }],
        model: 'Sorry, the ducks took them.',
        distractors: ['I put them in the wardrobe.', 'I am wearing them, Mother.', 'Ask the dog next door.'],
        hints: ['Say sorry first, then say who took them.', 'Key words: sorry / ducks'],
        hintsKo: ['먼저 사과한 다음 누가 가져갔는지 말하세요.', '핵심 단어: sorry / ducks'],
        reply: { speaker: 'Narrator', line: 'She sent you upstairs, and told her guests that you were all in bed with the measles.' }
      }
    ]
  },
  {
    num: 8, title: 'The Tale of Jemima Puddle-Duck', ko: '제미마 퍼들덕 이야기',
    summary: 'Jemima looks for a place to hatch her own eggs and nearly becomes dinner for a foxy-whiskered gentleman, until Kep the collie saves her.',
    summaryKo: '제미마는 자기 알을 직접 품을 곳을 찾다가 갈색 수염 신사에게 잡아먹힐 뻔하지만, 콜리 개 켑이 그녀를 구해 줍니다.',
    scenes: [
      {
        role: 'jemima',
        situation: 'The farmer\'s wife takes away every egg you lay, because she does not believe ducks can sit still long enough to hatch them. You are very much annoyed.',
        situationKo: '농부의 아내는 오리가 알을 품을 만큼 얌전히 앉아 있지 못한다고 믿어서, 당신이 낳는 알을 전부 가져가 버립니다. 당신은 몹시 화가 납니다.',
        speaker: 'Rebeccah Puddle-Duck', line: 'I have not the patience to sit on a nest for weeks.',
        prompt: 'Tell her that you want to hatch your own eggs.',
        promptKo: '당신은 자기 알을 직접 품고 싶다고 말하세요.',
        answers: [{ any: ['hatch', 'eggs', 'egg', 'own', 'nest', 'sit on'] }],
        model: 'I want to hatch my own eggs.',
        distractors: ['I would rather learn to fly.', 'Let us swim in the pond.', 'The farmer\'s wife is very kind.'],
        hints: ['To sit on eggs until they open is to hatch them.', 'Key words: hatch / eggs'],
        hintsKo: ['알이 깨어날 때까지 품는 것을 hatch라고 합니다.', '핵심 단어: hatch / eggs'],
        reply: { speaker: 'Narrator', line: 'You determined to make a nest right away from the farm, and set off up the hill on a fine spring afternoon.' }
      },
      {
        role: 'jemima',
        situation: 'Beyond the wood you meet an elegantly dressed gentleman sitting on a tree stump, reading a newspaper. He has black prick ears and sandy-coloured whiskers, and he smiles at you very kindly.',
        situationKo: '숲 너머에서 나무 그루터기에 앉아 신문을 읽는 말쑥한 차림의 신사를 만납니다. 검고 뾰족한 귀에 모래빛 수염을 한 그가 아주 다정하게 미소 짓습니다.',
        speaker: 'The foxy gentleman', line: 'Are you looking for a place to lay your eggs?',
        prompt: 'Ask him politely if he knows a dry place for a nest.',
        promptKo: '둥지를 지을 마른 자리를 아는지 공손히 물어보세요.',
        answers: [{ any: ['nest', 'dry', 'place', 'lay'] }],
        model: 'Do you know a dry nest?',
        distractors: ['Are you a fox, sir?', 'I am looking for my bonnet.', 'Please show me the way home.'],
        hints: ['You need somewhere dry to sit.', 'Key words: dry / nest'],
        hintsKo: ['앉아 있을 마른 자리가 필요합니다.', '핵심 단어: dry / nest'],
        reply: { speaker: 'The foxy gentleman', line: 'Come and see my summer residence. There is a shed behind my house, quite full of feathers.' }
      },
      {
        role: 'jemima',
        situation: 'The gentleman has asked you to bring herbs, onions and two sage leaves for an omelette — and to shut the shed door behind you. On the way back you meet Kep, the farm collie, who looks at you very hard.',
        situationKo: '신사는 오믈렛을 만들 허브와 양파, 세이지 잎 두 장을 가져오라고 하며 헛간 문을 잘 닫으라고 했습니다. 돌아오는 길에 농장의 콜리 개 켑을 만나는데, 그가 당신을 아주 매섭게 바라봅니다.',
        speaker: 'Kep', line: 'Herbs and onions? Jemima, who is this gentleman of yours?',
        prompt: 'Ask Kep to help you, because something is wrong.',
        promptKo: '무언가 잘못되었으니 켑에게 도와 달라고 하세요.',
        answers: [{ any: ['help', 'kep', 'save', 'fox', 'danger', 'afraid'] }],
        model: 'Please help me, Kep!',
        distractors: ['I am going to a party.', 'Everything is quite all right.', 'Mind your own business, dog.'],
        hints: ['Ask the dog for help.', 'Key words: help / Kep'],
        hintsKo: ['개에게 도와 달라고 하세요.', '핵심 단어: help / Kep'],
        reply: { speaker: 'Narrator', line: 'Kep took two fox-hound puppies and ran to the wood. Your eggs were eaten, but in June you laid more and hatched four of them.' }
      }
    ]
  },
  {
    num: 9, title: 'The Tale of the Flopsy Bunnies', ko: '플롭시네 아기 토끼들 이야기',
    summary: 'Mr. McGregor bags the sleeping Flopsy Bunnies, but Mrs. Tittlemouse gnaws them free and they fill the sack with rotten vegetables.',
    summaryKo: '맥그레거 씨가 잠든 아기 토끼들을 자루에 담지만, 티틀마우스 부인이 자루를 갉아 구멍을 내 줍니다. 아기 토끼들은 자루에 썩은 채소를 대신 채워 넣습니다.',
    scenes: [
      {
        role: 'benjamin',
        situation: 'Your children ate too many soporific lettuces on Mr. McGregor\'s rubbish heap and fell fast asleep in the grass. Mr. McGregor has put all six of them into his sack. Mrs. Tittlemouse the wood mouse comes along the path.',
        situationKo: '아기 토끼들이 맥그레거 씨네 쓰레기 더미에서 졸음을 부르는 상추를 너무 많이 먹고 풀밭에서 곤히 잠들어 버렸습니다. 맥그레거 씨는 여섯 마리를 모두 자루에 담았습니다. 마침 숲쥐 티틀마우스 부인이 오솔길로 옵니다.',
        speaker: 'Mrs. Tittlemouse', line: 'Dear me! Why are you crying, Mr. Bunny?',
        prompt: 'Ask the mouse to gnaw a hole in the sack.',
        promptKo: '생쥐에게 자루를 갉아 구멍을 내 달라고 부탁하세요.',
        answers: [{ any: ['gnaw', 'hole', 'bite', 'sack', 'open', 'out'] }],
        model: 'Please gnaw a hole, Mrs. Tittlemouse.',
        distractors: ['Please make us a cup of tea.', 'Fetch Mr. McGregor at once.', 'Sing the babies a lullaby.'],
        hints: ['A mouse can bite through cloth.', 'Key words: gnaw / hole'],
        hintsKo: ['생쥐는 천을 갉아 뚫을 수 있습니다.', '핵심 단어: gnaw / hole'],
        reply: { speaker: 'Narrator', line: 'Mrs. Tittlemouse gnawed a hole in the corner of the sack, and the little bunnies wriggled out one by one.' }
      },
      {
        role: 'benjamin',
        situation: 'All six bunnies are free, and the sack lies empty on the path. Mr. McGregor will be back at any moment to carry it home, and you would like him to notice nothing.',
        situationKo: '아기 토끼 여섯 마리가 모두 빠져나왔고, 자루는 텅 빈 채 길에 놓여 있습니다. 맥그레거 씨가 곧 자루를 가지러 돌아올 텐데, 그가 눈치채지 못하게 하고 싶습니다.',
        speaker: 'Flopsy', line: 'The sack is empty now. What shall we put inside?',
        prompt: 'Say that you will fill the sack with rotten vegetables.',
        promptKo: '자루에 썩은 채소를 채워 넣자고 말하세요.',
        answers: [{ any: ['rotten', 'vegetables', 'vegetable', 'marrow', 'marrows', 'turnips', 'rubbish'] }],
        model: 'Fill it with rotten vegetables!',
        distractors: ['Put in a bunch of flowers.', 'Leave it quite empty.', 'Fill it with clean straw.'],
        hints: ['There is plenty of bad food on the rubbish heap.', 'Key words: rotten / vegetables'],
        hintsKo: ['쓰레기 더미에는 상한 먹을거리가 널려 있습니다.', '핵심 단어: rotten / vegetables'],
        reply: { speaker: 'Narrator', line: 'They put in three rotten marrows, an old blacking-brush and two decayed turnips — and Mr. McGregor carried the sack home without noticing.' }
      }
    ]
  },
  {
    num: 10, title: 'The Tale of Mrs. Tittlemouse', ko: '티틀마우스 부인 이야기',
    summary: 'Mrs. Tittlemouse cleans her burrow after beetles, bees and a dripping toad, and then holds a party with a door too small for Mr. Jackson.',
    summaryKo: '티틀마우스 부인은 딱정벌레와 벌, 물이 뚝뚝 떨어지는 두꺼비가 다녀간 굴을 청소하고는, 잭슨 씨가 들어올 수 없도록 문을 좁게 만들어 잔치를 엽니다.',
    scenes: [
      {
        role: 'tittlemouse',
        situation: 'You are a most terribly tidy mouse, always sweeping and dusting your long sandy passages. This morning a beetle with dirty little feet is walking straight down your clean floor.',
        situationKo: '당신은 지독하게 깔끔한 생쥐라서, 길고 모래빛인 굴 통로를 늘 쓸고 닦습니다. 그런데 오늘 아침 발이 더러운 딱정벌레 한 마리가 깨끗한 바닥을 태연히 걸어옵니다.',
        speaker: 'The beetle', line: 'Bizz, bizz, bizz!',
        prompt: 'Tell the beetle to go away.',
        promptKo: '딱정벌레에게 나가라고 말하세요.',
        answers: [{ any: ['go away', 'away', 'out', 'leave', 'shoo', 'dirty'] }],
        model: 'Go away, you dirty beetle!',
        distractors: ['Come in and have some tea.', 'What lovely clean feet you have.', 'Please stay for the night.'],
        hints: ['Two short words send a visitor out.', 'Key words: go away'],
        hintsKo: ['짧은 두 단어로 손님을 내보낼 수 있습니다.', '핵심 단어: go away'],
        reply: { speaker: 'Narrator', line: 'The beetle said nothing more, and walked sideways out of the door.' }
      },
      {
        role: 'tittlemouse',
        situation: 'In your storeroom, where the acorns and the cherry-stones are kept, somebody has made an untidy nest of moss. When you pull the moss, a big fat bumble bee comes out of it, buzzing angrily.',
        situationKo: '도토리와 버찌 씨를 두는 저장실에 누군가 이끼로 지저분한 둥지를 만들어 놓았습니다. 이끼를 잡아당기자 크고 뚱뚱한 호박벌이 화난 듯 붕붕대며 나옵니다.',
        speaker: 'Babbitty Bumble', line: 'Zizz, bizz, bizzz! I am living in your nuts now.',
        prompt: 'Tell the bee that this is your house and she must leave.',
        promptKo: '벌에게 여기는 당신 집이니 나가라고 말하세요.',
        answers: [{ any: ['my house', 'get out', 'out', 'leave', 'mine', 'go away'] }],
        model: 'This is my house! Get out!',
        distractors: ['You may have all my nuts.', 'What a pretty nest of moss.', 'Please make me some honey.'],
        hints: ['Say whose house it is, then send her out.', 'Key words: my house / get out'],
        hintsKo: ['누구의 집인지 말한 뒤 나가라고 하세요.', '핵심 단어: my house / get out'],
        reply: { speaker: 'Narrator', line: 'Babbitty Bumble buzzed rudely and would not come out, so you went away to fetch a shovel.' }
      },
      {
        role: 'tittlemouse',
        situation: 'Mr. Jackson the toad has invited himself in and dripped water all over your parlour while hunting for the bee. After a fortnight of cleaning you make your front door narrow, and hold a party. Mr. Jackson cannot get in, but he is not offended.',
        situationKo: '두꺼비 잭슨 씨가 제멋대로 들어와 벌을 찾는다며 응접실을 온통 물바다로 만들었습니다. 두 주 동안 청소한 뒤 당신은 현관을 좁게 만들고 잔치를 엽니다. 잭슨 씨는 들어오지 못하지만 기분 나빠 하지는 않습니다.',
        speaker: 'Mr. Jackson', line: 'No teeth, no teeth, no teeth! But I do like honey-dew.',
        prompt: 'Offer him some honeydew at the window.',
        promptKo: '창가에서 그에게 감로(honeydew)를 권하세요.',
        answers: [{ any: ['honeydew', 'honey dew', 'honey', 'window', 'drink'] }],
        model: 'Here is some honeydew, sir.',
        distractors: ['You may sleep in my best bed.', 'Have a plate of cherry stones.', 'I have no food at all.'],
        hints: ['A toad with no teeth can only drink.', 'Key word: honeydew'],
        hintsKo: ['이가 없는 두꺼비는 마시는 것만 먹을 수 있습니다.', '핵심 단어: honeydew'],
        reply: { speaker: 'Narrator', line: 'Mr. Jackson sat outside in the porch and drank acorn-cupfuls of honey-dew, and the party was a great success.' }
      }
    ]
  }
];

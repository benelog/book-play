/* Alice's Adventures in Wonderland (Lewis Carroll, 1865 — public domain). Game data for all 12 chapters.
   Field reference: books/README.md. Situations, prompts, hints and distractors are original; quoted lines are short. */
window.LP_ROLES = {
  alice: { en: 'You are Alice. ', ko: '당신은 앨리스입니다. ' },
  bill: { en: 'You are Bill the Lizard. ', ko: '당신은 도마뱀 빌입니다. ' }
};
window.LP_SCENES = [
  {
    num: 1, title: 'Down the Rabbit-Hole', ko: '토끼 굴 속으로',
    summary: 'Alice follows a talking White Rabbit down a hole, falls a long way, and changes size for the first time.',
    summaryKo: '앨리스는 말하는 흰 토끼를 따라 굴로 들어가 한참을 떨어지고, 처음으로 몸 크기가 바뀝니다.',
    scenes: [
      {
        role: 'alice',
        situation: 'You are sitting by your sister on the river bank, bored and sleepy. A White Rabbit with pink eyes runs past, takes a watch out of its waistcoat pocket, and hurries away.',
        situationKo: '강둑에서 언니 옆에 앉아 지루하고 졸린 참입니다. 분홍 눈의 흰 토끼가 달려가더니 조끼 주머니에서 시계를 꺼내 보고는 서둘러 사라집니다.',
        speaker: 'The White Rabbit', line: 'Oh dear! Oh dear! I shall be too late!',
        prompt: 'Say that you will run after the rabbit and see where it goes.',
        promptKo: '토끼를 쫓아가 어디로 가는지 보겠다고 말하세요.',
        answers: [{ any: ['follow', 'after him', 'after it', 'chase', 'run after'] }, { all: ['rabbit'], any: ['follow', 'after', 'where'] }],
        model: 'How curious! I will follow that rabbit.',
        distractors: ['How curious! I will go back to my book.', 'How curious! I will pick some daisies instead.', 'How curious! I will wake my sister up.'],
        hints: ['You want to go where the rabbit is going.', 'Key word: follow'],
        hintsKo: ['토끼가 가는 곳으로 가고 싶습니다.', '핵심 단어: follow'],
        reply: { speaker: 'Narrator', line: 'You ran across the field after it, and popped down a large rabbit hole under the hedge. Down, down, down you fell.' }
      },
      {
        role: 'alice',
        situation: 'At the bottom of the fall you find a long hall of locked doors and a tiny door you cannot get through. On a glass table stands a little bottle with a paper label round its neck.',
        situationKo: '떨어진 곳에는 잠긴 문들이 늘어선 긴 복도와, 지나갈 수 없는 아주 작은 문이 있습니다. 유리 탁자 위에는 목에 종이 딱지를 두른 작은 병이 하나 놓여 있습니다.',
        speaker: 'Narrator', line: 'The label on the bottle says, in large letters, DRINK ME.',
        prompt: 'Say that you will first look to see whether the bottle is marked "poison".',
        promptKo: '먼저 병에 "poison(독)"이라고 쓰여 있는지 살펴보겠다고 말하세요.',
        answers: [{ any: ['poison', 'poisoned'] }, { all: ['look'], any: ['first', 'label', 'careful'] }],
        model: 'I will look first and see if it is marked poison.',
        distractors: ['I will pour it away and try the little door again.', 'I will drink the whole bottle without stopping.', 'I will carry the bottle home to my sister.'],
        hints: ['Sensible children check the label before drinking.', 'Key word: poison'],
        hintsKo: ['분별 있는 아이는 마시기 전에 딱지를 확인하지요.', '핵심 단어: poison'],
        reply: { speaker: 'Narrator', line: 'It was not marked poison, so you ventured to taste it. Very soon you shut up like a telescope, only ten inches high.' }
      },
      {
        role: 'alice',
        situation: 'You are now ten inches high and just the right size for the little door. But the door is locked, and the golden key that opens it is lying far above you on the glass table.',
        situationKo: '이제 키가 25센티미터쯤 되어 작은 문에 꼭 맞습니다. 하지만 문은 잠겨 있고, 문을 여는 황금 열쇠는 저 위 유리 탁자에 놓여 있습니다.',
        speaker: 'Narrator', line: 'The table is smooth as glass. You cannot climb up it at all.',
        prompt: 'Say what you have forgotten and left on the table.',
        promptKo: '무엇을 잊고 탁자에 두고 왔는지 말하세요.',
        answers: [{ any: ['key', 'keys'] }, { all: ['forgot'], any: ['table', 'it'] }],
        model: 'Oh dear! I have left the little golden key on the table.',
        distractors: ['Oh dear! The door has grown far too big for me.', 'Oh dear! My sister will be looking for me now.', 'Oh dear! I have lost one of my shoes in the hall.'],
        hints: ['You need it to open the little door.', 'Key word: key'],
        hintsKo: ['작은 문을 여는 데 필요한 물건입니다.', '핵심 단어: key'],
        reply: { speaker: 'Narrator', line: 'Then you found a little cake marked EAT ME. You ate it, and waited to see which way you would grow.' }
      }
    ]
  },
  {
    num: 2, title: 'The Pool of Tears', ko: '눈물 웅덩이',
    summary: 'Alice grows enormous, cries a pool of tears, shrinks again, and swims in her own tears beside a Mouse.',
    summaryKo: '앨리스는 거인처럼 커졌다가 눈물로 웅덩이를 만들고, 다시 작아져 자기 눈물 속에서 생쥐와 함께 헤엄칩니다.',
    scenes: [
      {
        role: 'alice',
        situation: 'The cake has worked. You shoot up like a telescope until your head knocks against the roof of the hall, and your feet are so far off that you can hardly see them.',
        situationKo: '케이크가 효과를 냈습니다. 망원경처럼 쭉 늘어나 머리가 복도 천장에 닿고, 두 발은 너무 멀어 잘 보이지도 않습니다.',
        speaker: 'Narrator', line: 'Your feet are so far away that you can hardly see them.',
        prompt: 'Say, in surprise, that everything is getting stranger and stranger.',
        promptKo: '모든 것이 점점 더 이상해진다고 놀라며 말하세요.',
        answers: [{ any: ['curiouser', 'stranger', 'strange', 'curious', 'odder', 'queerer'] }],
        model: 'Curiouser and curiouser! This is the strangest day of all.',
        distractors: ['What a perfectly ordinary afternoon this is!', 'Now I am exactly the right size for the little door!', 'I have never felt so sleepy in all my life!'],
        hints: ['Alice invents a funny word here: "curious" plus "-er".', 'Key words: curiouser / stranger'],
        hintsKo: ['앨리스는 여기서 curious에 -er를 붙인 우스운 말을 만듭니다.', '핵심 단어: curiouser / stranger'],
        reply: { speaker: 'Narrator', line: 'You began to cry, and shed gallons of tears, until there was a large pool all round you, four inches deep.' }
      },
      {
        role: 'alice',
        situation: 'The fan has made you small again, and you have slipped into the salt water of your own tears. Something is splashing about in the pool near you.',
        situationKo: '부채 때문에 다시 작아져 자기 눈물의 짠물 속에 빠졌습니다. 웅덩이 가까이에서 무언가가 첨벙거리고 있습니다.',
        speaker: 'Narrator', line: 'A Mouse is swimming near you. It looks at you, but says nothing.',
        prompt: 'Ask the Mouse politely if it knows the way out of the pool.',
        promptKo: '생쥐에게 이 웅덩이에서 나가는 길을 아는지 공손히 물어보세요.',
        answers: [{ all: ['mouse'], any: ['way', 'out', 'help', 'know'] }, { any: ['way out', 'get out'] }],
        model: 'O Mouse, do you know the way out of this pool?',
        distractors: ['Go away, Mouse! I do not like little grey animals.', 'Mouse, my cat Dinah would love to meet you.', 'Can you dive down and fetch me that golden key?'],
        hints: ['Speak to it first, then ask about the way.', 'Key words: Mouse + way out'],
        hintsKo: ['먼저 말을 건 다음 길을 물어보세요.', '핵심 단어: Mouse + way out'],
        reply: { speaker: 'Narrator', line: 'The Mouse looked at you rather inquisitively, and seemed to wink with one of its little eyes, but it said nothing.' }
      },
      {
        role: 'alice',
        situation: 'You have told the Mouse all about Dinah, your cat, and how nicely she catches mice. The Mouse bristles all over and swims away from you as fast as it can.',
        situationKo: '고양이 다이나 이야기를, 쥐를 얼마나 잘 잡는지까지 다 해 버렸습니다. 생쥐는 온몸의 털을 곤두세우고 최대한 빨리 헤엄쳐 달아납니다.',
        speaker: 'The Mouse', line: 'Would you like cats, if you were me?',
        prompt: 'Apologize, and promise not to talk about cats any more.',
        promptKo: '사과하고, 고양이 이야기는 더 하지 않겠다고 약속하세요.',
        answers: [{ any: ['sorry', 'apologize', 'apologise', 'forgive', 'pardon'] }, { all: ['not'], any: ['talk', 'mention', 'speak'] }],
        model: 'I am so sorry! We will not talk about cats any more.',
        distractors: ['Dinah is the finest cat in the whole world.', 'Then let us talk about dogs and cats all day.', 'Cats are much nicer than mice, everybody says so.'],
        hints: ['Say sorry first, then make a promise.', 'Key word: sorry'],
        hintsKo: ['먼저 사과하고 약속을 덧붙이세요.', '핵심 단어: sorry'],
        reply: { speaker: 'The Mouse', line: 'We indeed! Come, let us get to the shore, and I will tell you my history. Then you will understand.' }
      }
    ]
  },
  {
    num: 3, title: 'A Caucus-Race and a Long Tale', ko: '코커스 경주와 긴 이야기',
    summary: 'A crowd of wet birds and animals dries itself with a race in which everybody wins, and the Mouse tells its long tale.',
    summaryKo: '흠뻑 젖은 새와 짐승들이 모두가 이기는 경주로 몸을 말리고, 생쥐는 길고 슬픈 이야기를 들려줍니다.',
    scenes: [
      {
        role: 'alice',
        situation: 'You have reached the shore with a Duck, a Dodo, a Lory, an Eaglet and other queer creatures. Everybody is soaking wet, and everybody is arguing about how to get dry.',
        situationKo: '오리, 도도새, 앵무새, 새끼독수리 같은 이상한 무리와 함께 물가에 올라왔습니다. 모두 흠뻑 젖었고, 어떻게 말릴지를 두고 다투고 있습니다.',
        speaker: 'The Dodo', line: 'The best way to get dry is a Caucus race.',
        prompt: 'Ask the Dodo what a Caucus race is.',
        promptKo: '도도새에게 코커스 경주가 무엇인지 물어보세요.',
        answers: [{ all: ['what'], any: ['caucus', 'race', 'is', 'that', 'mean'] }, { any: ['caucus race'] }],
        model: 'What is a Caucus race?',
        distractors: ['No, thank you. I am quite dry already.', 'Please tell the Mouse to go on with his history.', 'I would rather run straight home and change my dress.'],
        hints: ['A short question with "what".', 'Key words: what + Caucus race'],
        hintsKo: ['what으로 시작하는 짧은 질문이면 됩니다.', '핵심 단어: what + Caucus race'],
        reply: { speaker: 'The Dodo', line: 'The best way to explain it is to do it. First it marked out a race course, in a sort of circle.' }
      },
      {
        role: 'alice',
        situation: 'The race is over, everyone has won, and you have handed out sweets as prizes. Now the Mouse has promised to explain why it hates cats and dogs, and all the company sit down to listen.',
        situationKo: '경주가 끝나 모두가 이겼고, 당신은 사탕을 상으로 나눠 주었습니다. 이제 생쥐가 왜 고양이와 개를 싫어하는지 설명하겠다고 하여 모두 둘러앉습니다.',
        speaker: 'The Mouse', line: 'Mine is a long and a sad tale!',
        prompt: 'Say that his tail is certainly long, and ask why he calls it sad.',
        promptKo: '꼬리가 길긴 하다고 말하고, 왜 슬프다고 하는지 물어보세요.',
        answers: [{ all: ['long'], any: ['sad', 'why', 'tail'] }, { all: ['why', 'sad'] }],
        model: 'It is a long tail, certainly, but why do you call it sad?',
        distractors: ['Please tell it quickly, because I am very hungry.', 'Mice cannot tell stories at all, you know.', 'I have heard that one from my sister already.'],
        hints: ['Alice mixes up "tale" and "tail".', 'Key words: long + why + sad'],
        hintsKo: ['앨리스는 tale(이야기)과 tail(꼬리)을 헷갈립니다.', '핵심 단어: long + why + sad'],
        reply: { speaker: 'The Mouse', line: 'You are not attending! What are you thinking of? I shall tell you no more of my history.' }
      }
    ]
  },
  {
    num: 4, title: 'The Rabbit Sends in a Little Bill', ko: '토끼가 도마뱀 빌을 들여보내다',
    summary: 'Mistaken for a housemaid, Alice grows until she fills the White Rabbit\'s house, and a lizard is sent down the chimney.',
    summaryKo: '하녀로 오해받은 앨리스는 흰 토끼의 집을 가득 채울 만큼 커지고, 도마뱀 한 마리가 굴뚝으로 내려보내집니다.',
    scenes: [
      {
        role: 'alice',
        situation: 'The White Rabbit comes trotting back, looking anxiously about as if it had lost something. When it sees you it takes you for its housemaid and speaks in an angry voice.',
        situationKo: '흰 토끼가 무언가 잃어버린 듯 두리번거리며 종종걸음으로 돌아옵니다. 당신을 보더니 자기 집 하녀로 착각하고 성난 목소리로 말합니다.',
        speaker: 'The White Rabbit', line: 'Mary Ann! Run home and fetch me a pair of gloves and a fan!',
        prompt: 'You are too frightened to explain. Say that you will fetch them at once.',
        promptKo: '설명하기엔 너무 무섭습니다. 당장 가져오겠다고 말하세요.',
        answers: [{ any: ['gloves', 'fan'] }, { all: ['fetch'] }, { any: ['at once', 'right away', 'this minute'] }],
        model: 'Yes, sir! I will fetch the gloves and the fan at once.',
        distractors: ['I am not your servant. Go and find them yourself.', 'My name is Alice, and I am late for my lesson.', 'Rabbits do not wear clothes, as everybody knows.'],
        hints: ['Just agree and say what you will bring.', 'Key words: gloves / fan / fetch'],
        hintsKo: ['그냥 대답하고 무엇을 가져올지 말하세요.', '핵심 단어: gloves / fan / fetch'],
        reply: { speaker: 'Narrator', line: 'You ran off to the Rabbit\'s tidy little house, found the fan and gloves upstairs, and drank from a bottle you saw there.' }
      },
      {
        role: 'alice',
        situation: 'The drink has made you grow again. Your head is against the ceiling, one arm is out of the window and one foot is up the chimney. The Rabbit is shouting outside its own front door.',
        situationKo: '마신 것 때문에 또 커졌습니다. 머리는 천장에 닿고, 한 팔은 창밖으로, 한 발은 굴뚝 위로 나와 있습니다. 토끼는 자기 집 문밖에서 소리치고 있습니다.',
        speaker: 'The White Rabbit', line: 'Mary Ann! Where are you? Bring me my gloves this moment!',
        prompt: 'Tell him you cannot come out, because you have grown far too big for his house.',
        promptKo: '집에 비해 너무 커져서 나갈 수 없다고 말하세요.',
        answers: [{ any: ['grown', 'grew', 'large', 'huge', 'enormous', 'giant'] }, { all: ['too', 'big'] }],
        model: 'I cannot come out! I have grown much too big for your house.',
        distractors: ['I am coming down the stairs this very moment, sir.', 'Your gloves are lying on the table by the door.', 'Please open the window and let a little air in.'],
        hints: ['Explain your new size.', 'Key words: grown / too big'],
        hintsKo: ['달라진 몸 크기를 설명하세요.', '핵심 단어: grown / too big'],
        reply: { speaker: 'The White Rabbit', line: 'There is no answer. I shall go round and get in at the window. Bill! Bill! You must go down the chimney!' }
      },
      {
        role: 'bill',
        situation: 'The Rabbit has sent you down the chimney of its own house. Something enormous kicks you, and you shoot out of the chimney into the sky and land among your friends.',
        situationKo: '토끼가 자기 집 굴뚝으로 당신을 내려보냈습니다. 무언가 거대한 것이 당신을 걷어차, 굴뚝 밖 하늘로 날아올랐다가 친구들 사이에 떨어집니다.',
        speaker: 'The White Rabbit', line: 'Bill! Bill! What happened to you? Tell us all about it!',
        prompt: 'Say that something kicked you and that you flew up like a rocket.',
        promptKo: '무언가가 당신을 걷어차서 로켓처럼 날아올랐다고 말하세요.',
        answers: [{ any: ['kicked', 'kick', 'rocket', 'flew'] }, { all: ['up'], any: ['sky', 'shot', 'went', 'chimney'] }],
        model: 'Something kicked me, and up I went like a sky rocket!',
        distractors: ['The house was empty, so I simply came back out.', 'I found the gloves and the fan, sir, on the table.', 'I could not squeeze through that little door at all.'],
        hints: ['A foot came up the chimney at you.', 'Key words: kicked / up like a rocket'],
        hintsKo: ['굴뚝으로 발 하나가 올라왔습니다.', '핵심 단어: kicked / up like a rocket'],
        reply: { speaker: 'Narrator', line: 'The crowd threw pebbles at the window instead. The pebbles turned into little cakes, and Alice ate one and grew small again.' }
      }
    ]
  },
  {
    num: 5, title: 'Advice from a Caterpillar', ko: '애벌레의 충고',
    summary: 'A blue Caterpillar on a mushroom questions Alice about who she is, and tells her how the mushroom changes her size.',
    summaryKo: '버섯 위의 파란 애벌레가 앨리스에게 너는 누구냐고 캐묻고, 버섯으로 크기를 바꾸는 법을 알려 줍니다.',
    scenes: [
      {
        role: 'alice',
        situation: 'A large blue Caterpillar is sitting on the top of a mushroom, smoking a long hookah and taking no notice of you at all. At last it takes the hookah out of its mouth.',
        situationKo: '커다란 파란 애벌레가 버섯 위에 앉아 긴 물담뱃대를 피우며 당신에게는 눈길도 주지 않습니다. 마침내 물담뱃대를 입에서 뗍니다.',
        speaker: 'The Caterpillar', line: 'Who are you?',
        prompt: 'Say shyly that you hardly know, because you have changed so many times today.',
        promptKo: '오늘 하도 여러 번 바뀌어서 잘 모르겠다고 수줍게 말하세요.',
        answers: [{ any: ['hardly know', 'do not know', 'not sure', 'changed', 'change'] }, { all: ['know'], any: ['hardly', 'not', 'barely'] }],
        model: 'I hardly know, sir. I have changed so many times today.',
        distractors: ['I am the Queen of all Wonderland, if you please.', 'And who are you, you rude little worm?', 'I am a caterpillar too, only a much smaller one.'],
        hints: ['She is not sure of herself after so many sizes.', 'Key words: hardly know / changed'],
        hintsKo: ['크기가 자꾸 바뀌어 자기 자신도 확신이 없습니다.', '핵심 단어: hardly know / changed'],
        reply: { speaker: 'The Caterpillar', line: 'What do you mean by that? Explain yourself!' }
      },
      {
        role: 'alice',
        situation: 'The Caterpillar is not satisfied with your answer, and asks you to explain. But you cannot explain, because you do not feel like the same person you were this morning.',
        situationKo: '애벌레는 당신의 대답에 만족하지 않고 설명하라고 합니다. 하지만 오늘 아침의 자신과 같은 사람 같지 않으니 설명할 수가 없습니다.',
        speaker: 'The Caterpillar', line: 'Explain yourself!',
        prompt: 'Say that you cannot explain yourself, because you are not yourself today.',
        promptKo: '오늘은 자기 자신이 아니라서 자신을 설명할 수 없다고 말하세요.',
        answers: [{ all: ['cannot', 'explain'] }, { all: ['not'], any: ['myself', 'explain'] }],
        model: 'I cannot explain myself, sir, because I am not myself today.',
        distractors: ['Certainly! I am a very ordinary English girl.', 'You should explain yourself first, I think.', 'I will explain when I have had my tea.'],
        hints: ['Two words carry the answer: "explain" and "myself".', 'Key words: cannot explain / not myself'],
        hintsKo: ['핵심은 explain과 myself 두 단어입니다.', '핵심 단어: cannot explain / not myself'],
        reply: { speaker: 'The Caterpillar', line: 'One side of the mushroom will make you grow taller, and the other side will make you grow shorter.' }
      },
      {
        role: 'alice',
        situation: 'A bite of mushroom has shot your neck up above the trees, like a serpent among the branches. An angry Pigeon flies at your face, sure that you have come to steal her eggs.',
        situationKo: '버섯을 한 입 먹자 목이 나무 위로 쭉 솟아, 가지 사이의 뱀 같아 보입니다. 성난 비둘기가 알을 훔치러 왔다고 확신하며 얼굴로 달려듭니다.',
        speaker: 'The Pigeon', line: 'Serpent! You are looking for eggs, I know it!',
        prompt: 'Deny it: tell her you are not a serpent, but a little girl.',
        promptKo: '뱀이 아니라 어린 여자아이라고 부인하세요.',
        answers: [{ all: ['not'], any: ['serpent', 'snake'] }, { any: ['little girl', 'a girl', 'human'] }],
        model: 'I am not a serpent! I am a little girl.',
        distractors: ['Yes, and I like eggs better than anything.', 'I am the biggest serpent in this whole wood.', 'Your nest is very badly built, Pigeon.'],
        hints: ['Say what you are not, and then what you are.', 'Key words: not a serpent / little girl'],
        hintsKo: ['무엇이 아닌지 말한 뒤 무엇인지 말하세요.', '핵심 단어: not a serpent / little girl'],
        reply: { speaker: 'The Pigeon', line: 'A likely story indeed! You are a serpent, and there is no use denying it. Go away!' }
      }
    ]
  },
  {
    num: 6, title: 'Pig and Pepper', ko: '돼지와 후추',
    summary: 'Alice visits the Duchess\'s peppery kitchen, nurses a baby that turns into a pig, and meets the grinning Cheshire Cat.',
    summaryKo: '앨리스는 후추 가득한 공작 부인의 부엌에 들렀다가 돼지로 변하는 아기를 안게 되고, 씩 웃는 체셔 고양이를 만납니다.',
    scenes: [
      {
        role: 'alice',
        situation: 'You are standing in front of a low house in the wood. A footman with a frog\'s face is sitting on the ground beside the door, and your knocking has done no good at all.',
        situationKo: '숲속 낮은 집 앞에 서 있습니다. 개구리 얼굴의 하인이 문 옆 땅바닥에 앉아 있고, 아무리 두드려도 소용이 없습니다.',
        speaker: 'The Frog Footman', line: 'There is no use in knocking. I am on the same side as you.',
        prompt: 'Ask him, please, how you are to get in.',
        promptKo: '그러면 어떻게 들어가야 하는지 공손히 물어보세요.',
        answers: [{ all: ['how'], any: ['get in', 'in', 'enter', 'inside'] }, { any: ['get in', 'go in'] }],
        model: 'Please, then, how am I to get in?',
        distractors: ['Then I shall knock all day and all night.', 'Please tell the Duchess that Alice has arrived.', 'What a very fine coat you are wearing, sir.'],
        hints: ['Begin your question with "how".', 'Key words: how + get in'],
        hintsKo: ['how로 질문을 시작하세요.', '핵심 단어: how + get in'],
        reply: { speaker: 'The Frog Footman', line: 'I shall sit here, on and off, for days and days. Anything you like. I am going to sit here till tomorrow.' }
      },
      {
        role: 'alice',
        situation: 'You have escaped from the smoky kitchen with a baby that turned into a pig and ran off. Now a large cat with a very wide grin appears on the bough of a tree above you.',
        situationKo: '돼지로 변해 달아난 아기를 뒤로하고 연기 자욱한 부엌에서 빠져나왔습니다. 이제 아주 넓게 웃는 커다란 고양이가 머리 위 나뭇가지에 나타납니다.',
        speaker: 'The Cheshire Cat', line: 'That depends a good deal on where you want to get to.',
        prompt: 'Say that you do not much care where you go, so long as you get somewhere.',
        promptKo: '어딘가에 닿기만 한다면 어디든 크게 상관없다고 말하세요.',
        answers: [{ any: ['do not care', 'not much care', 'anywhere', 'somewhere'] }, { all: ['not'], any: ['care', 'mind', 'matter'] }],
        model: 'I do not much care where, so long as I get somewhere.',
        distractors: ['I want to go straight home to my sister, please.', 'Take me to the Queen this instant, cat.', 'I care very much indeed which road I take.'],
        hints: ['Any road will do, as long as it leads somewhere.', 'Key words: do not care / somewhere'],
        hintsKo: ['어딘가로만 이어진다면 어느 길이든 좋습니다.', '핵심 단어: do not care / somewhere'],
        reply: { speaker: 'The Cheshire Cat', line: 'Then it does not matter which way you go. You are sure to get somewhere, if you only walk long enough.' }
      },
      {
        role: 'alice',
        situation: 'The Cat has told you that a Hatter lives one way and a March Hare the other, and that both of them are mad. You say you do not want to go among mad people.',
        situationKo: '고양이는 한쪽에는 모자 장수가, 다른 쪽에는 삼월 토끼가 살며 둘 다 미쳤다고 알려 줍니다. 당신은 미친 사람들 사이로 가고 싶지 않다고 말합니다.',
        speaker: 'The Cheshire Cat', line: 'We are all mad here. I am mad. You are mad.',
        prompt: 'Ask him how he knows that you are mad.',
        promptKo: '당신이 미쳤다는 것을 어떻게 아느냐고 물어보세요.',
        answers: [{ all: ['how'], any: ['know', 'mad', 'tell'] }, { all: ['know', 'mad'] }],
        model: 'How do you know that I am mad?',
        distractors: ['Then I shall go mad as well, I suppose.', 'Cats are never mad, only rather cross.', 'Good afternoon. I must find the Duchess now.'],
        hints: ['A short question beginning with "how".', 'Key words: how + know + mad'],
        hintsKo: ['how로 시작하는 짧은 질문입니다.', '핵심 단어: how + know + mad'],
        reply: { speaker: 'The Cheshire Cat', line: 'You must be, or you would not have come here. By the by, what became of the baby?' }
      }
    ]
  },
  {
    num: 7, title: 'A Mad Tea-Party', ko: '미친 다과회',
    summary: 'The Hatter, the March Hare and a sleepy Dormouse hold an endless tea-party full of riddles and rudeness.',
    summaryKo: '모자 장수와 삼월 토끼, 졸린 겨울잠쥐가 수수께끼와 무례함으로 가득한 끝없는 다과회를 벌입니다.',
    scenes: [
      {
        role: 'alice',
        situation: 'A table is set out under a tree. The March Hare and the Hatter are having tea at one corner of it, with a Dormouse asleep between them. The table is large, and every other seat is empty.',
        situationKo: '나무 아래 식탁이 차려져 있습니다. 삼월 토끼와 모자 장수가 한쪽 구석에서 차를 마시고, 그 사이에서 겨울잠쥐가 자고 있습니다. 식탁은 넓고 다른 자리는 모두 비어 있습니다.',
        speaker: 'The March Hare and the Hatter', line: 'No room! No room!',
        prompt: 'Say indignantly that there is plenty of room.',
        promptKo: '자리가 얼마든지 있다고 발끈하며 말하세요.',
        answers: [{ any: ['plenty'] }, { all: ['room'], any: ['plenty', 'lots', 'much', 'space', 'empty'] }],
        model: 'There is plenty of room!',
        distractors: ['Very well, I shall stand up, then.', 'I am sorry. I will go away at once.', 'Who has eaten all the bread and butter?'],
        hints: ['Look at all those empty chairs.', 'Key words: plenty of room'],
        hintsKo: ['빈 의자가 저렇게 많잖아요.', '핵심 단어: plenty of room'],
        reply: { speaker: 'Narrator', line: 'You sat down in a large arm chair at one end of the table, and the March Hare offered you something.' }
      },
      {
        role: 'alice',
        situation: 'You are sitting at the table now. There are cups and a teapot and bread and butter on it, but nothing else at all. The March Hare speaks in an encouraging tone.',
        situationKo: '이제 식탁에 앉았습니다. 찻잔과 찻주전자, 버터 바른 빵은 있지만 그 외에는 아무것도 없습니다. 삼월 토끼가 상냥한 말투로 권합니다.',
        speaker: 'The March Hare', line: 'Have some wine.',
        prompt: 'Look round the table and say that you do not see any wine.',
        promptKo: '식탁을 둘러보고 와인이 보이지 않는다고 말하세요.',
        answers: [{ all: ['wine'], any: ['not', 'nothing', 'where', 'no'] }, { all: ['not'], any: ['see', 'any'] }],
        model: 'I do not see any wine.',
        distractors: ['Thank you, I will have a very large glass.', 'Wine is my favourite drink in all the world.', 'Pour it into the teapot, if you please.'],
        hints: ['There is only tea on this table.', 'Key words: not + see + wine'],
        hintsKo: ['식탁에는 차뿐입니다.', '핵심 단어: not + see + wine'],
        reply: { speaker: 'The March Hare', line: 'There is not any. And it was not very civil of you to sit down without being invited.' }
      },
      {
        role: 'alice',
        situation: 'The Hatter has been staring at you with great curiosity, and now he asks you a riddle. You think about it for a long while, but you cannot see any answer at all.',
        situationKo: '모자 장수가 아주 호기심 어린 눈으로 당신을 보더니 수수께끼를 냅니다. 한참 생각해 보지만 도무지 답을 알 수가 없습니다.',
        speaker: 'The Hatter', line: 'Why is a raven like a writing desk?',
        prompt: 'Give it up, and ask him for the answer.',
        promptKo: '포기하고 답이 무엇인지 물어보세요.',
        answers: [{ any: ['give it up', 'give up'] }, { all: ['answer'], any: ['what', 'tell'] }],
        model: 'I give it up. What is the answer?',
        distractors: ['Because they both have black feathers, of course.', 'Ravens are birds, and desks are only furniture.', 'I never guess riddles before I have had my tea.'],
        hints: ['Admit that you cannot guess, then ask.', 'Key words: give it up / what is the answer'],
        hintsKo: ['못 맞히겠다고 인정한 뒤 물어보세요.', '핵심 단어: give it up / what is the answer'],
        reply: { speaker: 'The Hatter', line: 'I have not the slightest idea. If you knew Time as well as I do, you would not talk about wasting it.' }
      }
    ]
  },
  {
    num: 8, title: 'The Queen\'s Croquet-Ground', ko: '여왕의 크로케 경기장',
    summary: 'Gardeners paint white roses red, and the Queen of Hearts orders heads off while croquet is played with flamingoes and hedgehogs.',
    summaryKo: '정원사들이 흰 장미를 붉게 칠하고, 하트 여왕은 홍학과 고슴도치로 크로케를 하며 목을 치라고 명령합니다.',
    scenes: [
      {
        role: 'alice',
        situation: 'At the entrance of the garden stands a great rose tree. The roses growing on it are white, and three gardeners shaped like playing cards are busily painting them red.',
        situationKo: '정원 입구에 커다란 장미나무가 서 있습니다. 나무에 핀 장미는 흰데, 트럼프 카드 모양의 정원사 셋이 바쁘게 붉은 칠을 하고 있습니다.',
        speaker: 'Narrator', line: 'The three gardeners are painting the white roses red, and very fast too.',
        prompt: 'Ask them politely why they are painting those roses.',
        promptKo: '왜 그 장미를 칠하고 있는지 공손히 물어보세요.',
        answers: [{ all: ['why'], any: ['painting', 'paint', 'roses', 'red'] }],
        model: 'Would you tell me, please, why you are painting those roses?',
        distractors: ['Those roses looked much prettier when they were white.', 'May I pick one of them for my hair?', 'The Queen is coming down the path behind you!'],
        hints: ['A question beginning with "why".', 'Key words: why + painting'],
        hintsKo: ['why로 시작하는 질문입니다.', '핵심 단어: why + painting'],
        reply: { speaker: 'The Gardener', line: 'This here ought to have been a red rose tree, and we put a white one in by mistake. If the Queen found out, we should lose our heads.' }
      },
      {
        role: 'alice',
        situation: 'A procession of cards, courtiers, kings and queens comes into the garden. The Queen of Hearts stops in front of you and looks at you severely.',
        situationKo: '카드 병사와 신하, 왕과 왕비의 행렬이 정원으로 들어옵니다. 하트 여왕이 당신 앞에 멈춰 서서 매섭게 바라봅니다.',
        speaker: 'The Queen of Hearts', line: 'What is your name, child?',
        prompt: 'Tell her your name politely.',
        promptKo: '이름을 공손히 말하세요.',
        answers: [{ all: ['alice'] }],
        model: 'My name is Alice, so please your Majesty.',
        distractors: ['That is none of your business, I am sure.', 'I am the Duchess of all Wonderland.', 'You may call me Mary Ann, if you like.'],
        hints: ['Simply say who you are.', 'Key word: Alice'],
        hintsKo: ['자기가 누구인지만 말하면 됩니다.', '핵심 단어: Alice'],
        reply: { speaker: 'The Queen of Hearts', line: 'And who are these? Are their heads off? Can you play croquet?' }
      },
      {
        role: 'alice',
        situation: 'The Queen has turned crimson with fury after you refused to answer one of her questions. She screams at the top of her voice, and everybody near you goes quiet.',
        situationKo: '질문 하나에 대답하지 않자 여왕은 분노로 새빨개졌습니다. 목청껏 소리를 지르고, 주위 모두가 조용해집니다.',
        speaker: 'The Queen of Hearts', line: 'Off with her head! Off with—',
        prompt: 'Say loudly and firmly that this is nonsense.',
        promptKo: '이건 말도 안 된다고 크고 단호하게 말하세요.',
        answers: [{ any: ['nonsense', 'rubbish', 'ridiculous', 'silly', 'absurd'] }],
        model: 'Nonsense! You cannot cut off my head.',
        distractors: ['Yes, your Majesty. Take my head, if you must.', 'I am very sorry that I made you angry.', 'Whose head do you mean, your Majesty?'],
        hints: ['One strong word is enough here.', 'Key word: nonsense'],
        hintsKo: ['강한 단어 하나면 충분합니다.', '핵심 단어: nonsense'],
        reply: { speaker: 'The King of Hearts', line: 'Consider, my dear: she is only a child. The Queen turned away in a huff, and the game began again.' }
      }
    ]
  },
  {
    num: 9, title: 'The Mock Turtle\'s Story', ko: '가짜 거북의 이야기',
    summary: 'The Duchess finds a moral in everything, and the Mock Turtle tells Alice about his strange school under the sea.',
    summaryKo: '공작 부인은 무엇에서든 교훈을 찾아내고, 가짜 거북은 바닷속 이상한 학교 이야기를 들려줍니다.',
    scenes: [
      {
        role: 'alice',
        situation: 'The Duchess is walking beside you, very friendly now, with her sharp little chin digging into your shoulder. She finds a moral in everything you say.',
        situationKo: '공작 부인이 이제 아주 다정하게 곁에서 걸으며, 뾰족한 턱을 당신 어깨에 파묻고 있습니다. 당신이 무슨 말을 하든 교훈을 찾아냅니다.',
        speaker: 'The Duchess', line: 'The moral of that is: be what you would seem to be.',
        prompt: 'Say that you would understand it better if you had it written down.',
        promptKo: '글로 적어 주면 더 잘 이해할 것 같다고 말하세요.',
        answers: [{ all: ['written'] }, { any: ['write it down', 'on paper', 'wrote it'] }],
        model: 'I think I should understand that better if I had it written down.',
        distractors: ['That is the cleverest thing I have ever heard.', 'Morals are for grown ups, not for little girls.', 'Please keep your sharp chin off my shoulder.'],
        hints: ['Alice cannot follow it by ear.', 'Key words: written down'],
        hintsKo: ['귀로만 들어서는 따라갈 수가 없습니다.', '핵심 단어: written down'],
        reply: { speaker: 'The Duchess', line: 'That is nothing to what I could say if I chose. And the moral of that is: take care of the sense.' }
      },
      {
        role: 'alice',
        situation: 'The Gryphon has taken you to the Mock Turtle, who sits sighing on a rock. He begins to tell you about the school he went to at the bottom of the sea.',
        situationKo: '그리핀이 바위에 앉아 한숨짓는 가짜 거북에게 당신을 데려갑니다. 거북은 바다 밑에서 다니던 학교 이야기를 시작합니다.',
        speaker: 'The Mock Turtle', line: 'We called him Tortoise because he taught us.',
        prompt: 'Ask why they called him Tortoise if he was not one.',
        promptKo: '거북이 아닌데 왜 Tortoise라고 불렀는지 물어보세요.',
        answers: [{ all: ['why'], any: ['tortoise', 'call', 'called', 'name'] }],
        model: 'Why did you call him Tortoise, if he was not one?',
        distractors: ['What a very good teacher he must have been!', 'I have a tortoise at home, and her name is Dinah.', 'Turtles cannot teach anybody anything at all.'],
        hints: ['It is a pun on "taught us".', 'Key words: why + call + Tortoise'],
        hintsKo: ['taught us(가르쳤다)를 이용한 말장난입니다.', '핵심 단어: why + call + Tortoise'],
        reply: { speaker: 'The Mock Turtle', line: 'You ought to be ashamed of yourself for asking such a simple question. We had the best of educations.' }
      }
    ]
  },
  {
    num: 10, title: 'The Lobster Quadrille', ko: '바닷가재 카드리유',
    summary: 'The Mock Turtle and the Gryphon dance and sing about lobsters, and Alice\'s recitations keep coming out wrong.',
    summaryKo: '가짜 거북과 그리핀이 바닷가재 노래를 부르며 춤추고, 앨리스의 암송은 자꾸 엉뚱하게 나옵니다.',
    scenes: [
      {
        role: 'alice',
        situation: 'The Mock Turtle has stopped sobbing at last. He and the Gryphon look at each other, and then the Mock Turtle asks you a question in a deep, hollow voice.',
        situationKo: '가짜 거북이 마침내 흐느낌을 멈춥니다. 거북과 그리핀이 서로를 보더니, 거북이 깊고 텅 빈 목소리로 묻습니다.',
        speaker: 'The Mock Turtle', line: 'Have you ever seen a Lobster Quadrille?',
        prompt: 'Say that you never have, and ask what sort of dance it is.',
        promptKo: '한 번도 본 적 없다고 말하고, 어떤 춤인지 물어보세요.',
        answers: [{ all: ['never'] }, { any: ['what sort', 'what kind'] }, { all: ['no'], any: ['dance', 'what'] }],
        model: 'No, never. What sort of a dance is it?',
        distractors: ['Yes, I danced it by the sea last summer.', 'Lobsters cannot dance at all, everybody knows that.', 'I would much rather hear another song, please.'],
        hints: ['Answer the question first, then ask your own.', 'Key words: never / what sort of dance'],
        hintsKo: ['먼저 대답하고 나서 질문하세요.', '핵심 단어: never / what sort of dance'],
        reply: { speaker: 'The Mock Turtle', line: 'You first form a line along the sea shore. Then you throw the lobsters as far out to sea as you can.' }
      },
      {
        role: 'alice',
        situation: 'The Mock Turtle has just finished a slow, sad song about turtle soup. In the distance somebody shouts, and the Gryphon seizes you by the hand and pulls you away without waiting for the end.',
        situationKo: '가짜 거북이 거북 수프에 대한 느리고 슬픈 노래를 막 끝냈습니다. 멀리서 누군가 외치자, 그리핀이 노래가 끝나기도 전에 당신의 손을 잡아끕니다.',
        speaker: 'The Gryphon', line: 'Come on! The trial is beginning!',
        prompt: 'Ask him, as you run, what trial it is.',
        promptKo: '달려가면서 무슨 재판이냐고 물어보세요.',
        answers: [{ all: ['what'], any: ['trial', 'is it'] }, { any: ['which trial', 'whose trial', 'what trial'] }],
        model: 'What trial is it?',
        distractors: ['Please let go of my hand. I want to hear the song.', 'I have already been to the Queen\'s croquet ground.', 'Turtle soup is my favourite dinner in the world.'],
        hints: ['A three word question is enough.', 'Key words: what + trial'],
        hintsKo: ['세 단어짜리 질문이면 충분합니다.', '핵심 단어: what + trial'],
        reply: { speaker: 'The Gryphon', line: 'Come on! He only ran the faster, and the sad words of the song grew fainter behind you.' }
      }
    ]
  },
  {
    num: 11, title: 'Who Stole the Tarts?', ko: '누가 타르트를 훔쳤나?',
    summary: 'The Knave of Hearts is tried for stealing the Queen\'s tarts, with the Hatter as a very nervous witness.',
    summaryKo: '하트 잭이 여왕의 타르트를 훔친 죄로 재판을 받고, 모자 장수가 몹시 떨며 증인으로 나섭니다.',
    scenes: [
      {
        role: 'alice',
        situation: 'The court is full. The King and Queen of Hearts sit on their thrones, and twelve creatures sit in the jury box, all scratching busily on slates before the trial has even begun.',
        situationKo: '법정이 가득 찼습니다. 하트 왕과 여왕이 왕좌에 앉아 있고, 배심원석의 열두 짐승은 재판이 시작되기도 전에 석판에 바쁘게 뭔가를 긁적입니다.',
        speaker: 'The Gryphon', line: 'They are putting down their names, in case they forget them.',
        prompt: 'Whisper indignantly that they are stupid things.',
        promptKo: '멍청한 것들이라고 발끈하며 속삭이세요.',
        answers: [{ any: ['stupid', 'silly', 'foolish', 'fools'] }],
        model: 'They are stupid things!',
        distractors: ['How very clever those jurors are!', 'I should like a slate and a pencil too.', 'Perhaps they are writing to the Queen.'],
        hints: ['Alice is not impressed by the jury.', 'Key word: stupid'],
        hintsKo: ['앨리스는 배심원들이 영 마음에 들지 않습니다.', '핵심 단어: stupid'],
        reply: { speaker: 'Narrator', line: 'One of the jurors had a pencil that squeaked, so you took it away from him, quite quietly.' }
      },
      {
        role: 'alice',
        situation: 'While the Hatter gives his evidence, you begin to grow again. You have already crowded the Dormouse who sits beside you, and he gets up crossly.',
        situationKo: '모자 장수가 증언하는 동안 당신은 다시 커지기 시작합니다. 옆에 앉은 겨울잠쥐를 밀치게 되었고, 겨울잠쥐가 짜증을 내며 일어섭니다.',
        speaker: 'The Dormouse', line: 'You have no right to grow here.',
        prompt: 'Tell him not to talk nonsense: he is growing too.',
        promptKo: '말도 안 되는 소리 말라고, 당신도 자라고 있지 않냐고 말하세요.',
        answers: [{ any: ['nonsense', 'rubbish'] }, { all: ['growing'] }, { all: ['grow'], any: ['too', 'also', 'as well'] }],
        model: 'Do not talk nonsense. You know you are growing too.',
        distractors: ['I am very sorry. I shall sit down at once.', 'This court is far too small for a proper trial.', 'I have every right to be here, little mouse.'],
        hints: ['Point out that he is doing the same thing.', 'Key words: nonsense / growing too'],
        hintsKo: ['상대도 똑같이 자라고 있다고 지적하세요.', '핵심 단어: nonsense / growing too'],
        reply: { speaker: 'The Dormouse', line: 'Yes, but I grow at a reasonable pace, not in that ridiculous fashion.' }
      }
    ]
  },
  {
    num: 12, title: 'Alice\'s Evidence', ko: '앨리스의 증언',
    summary: 'Alice is called as a witness, defies the King and Queen, and wakes on the river bank with her head in her sister\'s lap.',
    summaryKo: '증인으로 불려 나간 앨리스는 왕과 여왕에게 맞서고, 언니의 무릎을 벤 채 강둑에서 깨어납니다.',
    scenes: [
      {
        role: 'alice',
        situation: 'The White Rabbit has called your name. You jump up so quickly that you tip over the jury box, and the King turns to you with his notebook open.',
        situationKo: '흰 토끼가 당신의 이름을 부릅니다. 너무 급히 일어서다 배심원석을 뒤엎고, 왕이 수첩을 펼친 채 당신을 돌아봅니다.',
        speaker: 'The King of Hearts', line: 'What do you know about this business?',
        prompt: 'Answer honestly that you know nothing whatever about it.',
        promptKo: '그 일에 대해 아무것도 모른다고 솔직히 대답하세요.',
        answers: [{ any: ['nothing'] }, { all: ['not'], any: ['know', 'anything'] }],
        model: 'Nothing whatever, your Majesty.',
        distractors: ['I saw the Knave take every one of the tarts.', 'I baked those tarts myself, early this morning.', 'Everything, your Majesty. Ask me whatever you like.'],
        hints: ['Alice was not there when the tarts went missing.', 'Key word: nothing'],
        hintsKo: ['타르트가 사라질 때 앨리스는 그 자리에 없었습니다.', '핵심 단어: nothing'],
        reply: { speaker: 'The King of Hearts', line: 'That is very important. Unimportant, of course, I meant. Unimportant, unimportant.' }
      },
      {
        role: 'alice',
        situation: 'You have gone on growing all through the trial, and the King suddenly reads out of his notebook a rule that nobody has ever heard before.',
        situationKo: '재판 내내 계속 커진 당신을 두고, 왕이 갑자기 수첩에서 아무도 들어 본 적 없는 규칙을 읽습니다.',
        speaker: 'The King of Hearts', line: 'Rule forty two: all persons more than a mile high must leave the court.',
        prompt: 'Say that you are not a mile high.',
        promptKo: '자신은 1마일이나 되지 않는다고 말하세요.',
        answers: [{ all: ['not'], any: ['mile', 'high', 'tall'] }, { any: ['not a mile'] }],
        model: 'I am not a mile high.',
        distractors: ['Very well, I will walk out of the court.', 'I am certainly two miles high, at the very least.', 'Who wrote that rule, the Queen or the Knave?'],
        hints: ['Simply deny the King\'s measurement.', 'Key words: not + a mile high'],
        hintsKo: ['왕이 말한 키를 그대로 부인하면 됩니다.', '핵심 단어: not + a mile high'],
        reply: { speaker: 'The King of Hearts', line: 'You are. Nearly two miles high. And it is the oldest rule in the book.' }
      },
      {
        role: 'alice',
        situation: 'The jury are about to consider their verdict when the Queen loses patience altogether. You are now your full size again, and no longer afraid of anybody in this court.',
        situationKo: '배심원들이 평결을 내리려는 참에 여왕이 참을성을 완전히 잃습니다. 당신은 이제 본래 크기로 돌아왔고, 이 법정의 누구도 두렵지 않습니다.',
        speaker: 'The Queen of Hearts', line: 'Sentence first, verdict afterwards!',
        prompt: 'Say loudly that this is nonsense, and that they are only a pack of cards.',
        promptKo: '말도 안 되는 소리라고, 그저 카드 한 벌일 뿐이라고 크게 말하세요.',
        answers: [{ any: ['nonsense', 'stuff'] }, { all: ['pack'], any: ['cards', 'card'] }],
        model: 'Stuff and nonsense! You are nothing but a pack of cards!',
        distractors: ['As you wish, your Majesty. Cut off his head.', 'May I be the judge instead of the King?', 'I should like to see the tarts first, please.'],
        hints: ['The last, bravest thing Alice says in Wonderland.', 'Key words: nonsense / pack of cards'],
        hintsKo: ['앨리스가 원더랜드에서 하는 마지막이자 가장 용감한 말입니다.', '핵심 단어: nonsense / pack of cards'],
        reply: { speaker: 'Narrator', line: 'The whole pack rose up into the air and came flying down upon you — and you woke on the bank, with your head in your sister\'s lap.' }
      }
    ]
  }
];

/* Peter and Wendy (J. M. Barrie, 1911 — public domain). Game data for all 17 chapters.
   Field reference: books/README.md. Situations, prompts, hints and distractors are original; quoted lines are short. */
window.LP_ROLES = {
  wendy: { en: 'You are Wendy. ', ko: '당신은 웬디입니다. ' },
  peter: { en: 'You are Peter Pan. ', ko: '당신은 피터 팬입니다. ' },
  john: { en: 'You are John. ', ko: '당신은 존입니다. ' },
  michael: { en: 'You are Michael. ', ko: '당신은 마이클입니다. ' },
  tootles: { en: 'You are Tootles, one of the lost boys. ', ko: '당신은 잃어버린 아이들 중 하나인 투틀스입니다. ' },
  smee: { en: 'You are Smee, the pirate bo\'sun. ', ko: '당신은 해적 갑판장 스미입니다. ' },
  hook: { en: 'You are Captain Hook. ', ko: '당신은 후크 선장입니다. ' },
  mother: { en: 'You are Mrs. Darling. ', ko: '당신은 달링 부인입니다. ' },
  jane: { en: 'You are Jane, Wendy\'s daughter. ', ko: '당신은 웬디의 딸 제인입니다. ' }
};
window.LP_SCENES = [
  {
    num: 1, title: 'Peter Breaks Through', ko: '피터가 뚫고 들어오다',
    summary: 'At No. 14 the Darlings live with Nana the dog-nurse. Mrs. Darling finds the name Peter in her children\'s minds, and one night a boy flies in and leaves his shadow behind.',
    summaryKo: '14번지 달링 집안은 개 유모 나나와 함께 살고 있습니다. 달링 부인은 아이들 마음속에서 피터라는 이름을 발견하고, 어느 밤 한 소년이 창으로 날아들어 그림자를 두고 갑니다.',
    scenes: [
      {
        role: 'wendy',
        situation: 'You are two years old, playing in a garden. You pluck a flower and run to your mother with it. She puts her hand to her heart and looks at you.',
        situationKo: '당신은 두 살이고 정원에서 놀고 있습니다. 꽃 한 송이를 꺾어 어머니에게 달려갑니다. 어머니는 가슴에 손을 얹고 당신을 바라봅니다.',
        speaker: 'Mrs. Darling', line: 'Oh, why can\'t you remain like this for ever!',
        prompt: 'Tell your mother what you already know: that you must grow up.',
        promptKo: '이미 알고 있는 사실, 즉 자라야만 한다는 것을 어머니에게 말하세요.',
        answers: [{ any: ['grow up', 'grow', 'grown'] }, { all: ['big'], any: ['must', 'will', 'going'] }],
        model: 'But Mother, I know that I must grow up.',
        distractors: ['But Mother, I want another flower.', 'But Mother, Nana is waiting for me.', 'But Mother, it is too hot in the garden.'],
        hints: ['All children, except one, do this.', 'Key words: grow up'],
        hintsKo: ['한 아이만 빼고 모든 아이가 하는 일입니다.', '핵심 단어: grow up'],
        reply: { speaker: 'Narrator', line: 'Two is the beginning of the end. From then on you knew, as all children do, that you would grow up.' }
      },
      {
        role: 'mother',
        situation: 'It is night. You are tidying up your children\'s minds, as good mothers do, when you find a word you do not know scrawled all over Wendy\'s: Peter. Wendy is still half awake.',
        situationKo: '밤입니다. 좋은 어머니들이 그러듯 아이들의 마음을 정리하고 있는데, 웬디의 마음속 곳곳에 모르는 이름이 적혀 있습니다. 피터. 웬디는 아직 반쯤 깨어 있습니다.',
        speaker: 'Wendy', line: 'He is Peter Pan, you know, mother.',
        prompt: 'Ask Wendy who this Peter is and where he lives.',
        promptKo: '이 피터가 누구이고 어디에 사는지 웬디에게 물으세요.',
        answers: [{ any: ['who is', 'who', 'where does', 'where', 'live', 'lives'] }],
        model: 'Who is Peter, dear, and where does he live?',
        distractors: ['Go to sleep, dear; it is very late.', 'Peter is a lovely name for a doll, dear.', 'Did Nana let a boy into the nursery, dear?'],
        hints: ['You want two things: his name and his address.', 'Key words: who, where'],
        hintsKo: ['두 가지가 궁금합니다. 누구인지, 어디 사는지.', '핵심 단어: who, where'],
        reply: { speaker: 'Wendy', line: 'He lives with the fairies. He comes in at night and sits at the foot of my bed and plays his pipes to me.' }
      },
      {
        role: 'mother',
        situation: 'You dozed by the fire and woke to see a strange boy in the nursery. Nana sprang at him; he leapt out of the window, but it shut on his shadow. Nana has the shadow in her mouth.',
        situationKo: '난롯가에서 졸다가 깨어 보니 낯선 소년이 아이들 방에 있습니다. 나나가 달려들자 소년은 창밖으로 뛰어나갔지만, 창문이 그림자를 잘라 두었습니다. 나나가 그 그림자를 물고 있습니다.',
        speaker: 'Narrator', line: 'It is quite an ordinary shadow. You are not sure what a sensible mother does with one.',
        prompt: 'Say that you will roll it up and put it away in a drawer.',
        promptKo: '그림자를 말아서 서랍에 넣어 두겠다고 말하세요.',
        answers: [{ any: ['drawer', 'drawers'] }, { all: ['roll'], any: ['put', 'away', 'keep'] }],
        model: 'I shall roll it up carefully and put it away in the drawer.',
        distractors: ['I shall hang it out of the window for him.', 'I shall give it to Nana to sleep on.', 'I shall show it to George at breakfast.'],
        hints: ['Somewhere safe, where the boy may come back for it.', 'Key word: drawer'],
        hintsKo: ['소년이 찾으러 올 수 있게 안전한 곳에 두어야 합니다.', '핵심 단어: drawer'],
        reply: { speaker: 'Narrator', line: 'You rolled it up and put it in a drawer, until a fitting moment came for telling your husband. The moment came a week later, on a Friday.' }
      }
    ]
  },
  {
    num: 2, title: 'The Shadow', ko: '그림자',
    summary: 'Friday night: Mr. Darling tricks Michael over his medicine, pours his own into Nana\'s bowl, and chains Nana in the yard. The parents leave for a party, and the stars whisper "Now, Peter!"',
    summaryKo: '금요일 밤, 달링 씨는 약 문제로 마이클을 속이고 자기 약을 나나의 그릇에 쏟은 뒤 나나를 마당에 묶어 둡니다. 부모가 파티에 가자 별들이 속삭입니다. "지금이야, 피터!"',
    scenes: [
      {
        role: 'michael',
        situation: 'Nana has brought your medicine. You will not take it. Your father says that when he was a boy he took medicine without a murmur, and that he has some nasty medicine of his own.',
        situationKo: '나나가 약을 가져왔지만 당신은 먹지 않겠다고 합니다. 아버지는 자기가 어렸을 때는 군소리 없이 약을 먹었고, 자기에게도 지독한 약이 있다고 말합니다.',
        speaker: 'Mr. Darling', line: 'I would take mine now as an example to you, Michael, if I hadn\'t lost the bottle.',
        prompt: 'Say that you will take yours if Father takes his first.',
        promptKo: '아버지가 먼저 드시면 당신도 먹겠다고 말하세요.',
        answers: [{ all: ['first'] }, { any: ['same time', 'together', 'you take yours'] }],
        model: 'I will take mine if you take yours first, Father.',
        distractors: ['I will not take it, Father, not now, not ever.', 'I would rather Nana drank it for me, Father.', 'I will hide the bottle under my pillow, Father.'],
        hints: ['Make him go before you do.', 'Key word: first'],
        hintsKo: ['아버지가 먼저 하게 만드세요.', '핵심 단어: first'],
        reply: { speaker: 'Narrator', line: 'Wendy found the bottle at once. Your father looked at it, and looked at it, and at last said, "Very well: both together — one, two, three." Only you took yours.' }
      },
      {
        role: 'wendy',
        situation: 'Father has not taken his medicine. Instead he has poured it into Nana\'s bowl and called it a splendid joke. Nana has lapped it up, and now she looks at him and creeps into her kennel.',
        situationKo: '아버지는 약을 드시지 않았습니다. 대신 나나의 그릇에 쏟아 놓고 멋진 장난이라고 합니다. 나나는 그것을 핥아 먹고, 아버지를 한 번 쳐다보고는 개집으로 들어갑니다.',
        speaker: 'Mr. Darling', line: 'What a jolly joke! Why don\'t you laugh?',
        prompt: 'Tell Father that it is not a joke, and that poor Nana was to have her milk.',
        promptKo: '그건 장난이 아니고, 가엾은 나나는 우유를 먹어야 했다고 아버지에게 말하세요.',
        answers: [{ any: ['not a joke', 'not funny', 'poor nana', 'unkind', 'cruel', 'shame', 'her milk'] }],
        model: 'Oh Father, that is not a joke. Poor Nana was to have her milk!',
        distractors: ['Oh Father, may I have some of it too?', 'Oh Father, Nana likes it very much.', 'Oh Father, let us all go to the party with you.'],
        hints: ['Say what it is not, and think of the dog.', 'Key words: not a joke, poor Nana'],
        hintsKo: ['그것이 무엇이 아닌지 말하고, 개를 생각하세요.', '핵심 단어: not a joke, poor Nana'],
        reply: { speaker: 'Mr. Darling', line: 'That is all the thanks I get! I refuse to allow that dog to lord it in my nursery. The proper place for her is the yard, and there she goes this instant.' }
      },
      {
        role: 'michael',
        situation: 'Nana is chained up in the yard. Father and Mother are dressed for the party at No. 27. Mother has lit the three night-lights, one by each bed, but she does not want to leave.',
        situationKo: '나나는 마당에 묶여 있습니다. 부모님은 27번지 파티에 가려고 옷을 갖춰 입었습니다. 어머니는 침대마다 하나씩 세 개의 등불을 켰지만 떠나기를 망설입니다.',
        speaker: 'Mrs. Darling', line: 'Good night, my darlings. Nothing can hurt you while the night-lights are burning.',
        prompt: 'Ask whether anything can harm you after the night-lights are lit.',
        promptKo: '등불을 켠 뒤에도 무엇이 해칠 수 있는지 물으세요.',
        answers: [{ any: ['harm', 'hurt', 'get us', 'catch us'] }, { all: ['safe'] }],
        model: 'Can anything harm us, mother, after the night-lights are lit?',
        distractors: ['Will you bring us cake from the party, mother?', 'Why must Nana sleep in the yard tonight, mother?', 'May we stay up until you come home, mother?'],
        hints: ['You want to be sure you are safe.', 'Key word: harm'],
        hintsKo: ['안전한지 확인하고 싶습니다.', '핵심 단어: harm'],
        reply: { speaker: 'Mrs. Darling', line: 'Nothing, precious. They are the eyes a mother leaves behind her to guard her children.' }
      }
    ]
  },
  {
    num: 3, title: 'Come Away, Come Away!', ko: '가자, 가자!',
    summary: 'Peter comes back for his shadow and Wendy sews it on. He tells her about the lost boys and Tinker Bell, teaches the children to fly, and they follow him out of the window just as Nana brings the parents running.',
    summaryKo: '피터가 그림자를 찾아 돌아오고 웬디가 그림자를 꿰매 줍니다. 피터는 잃어버린 아이들과 팅커벨 이야기를 하고, 아이들에게 나는 법을 가르쳐 함께 창밖으로 날아갑니다. 나나가 부모를 데려온 바로 그 순간입니다.',
    scenes: [
      {
        role: 'wendy',
        situation: 'You wake to find a boy sitting on the nursery floor, crying. He has found his shadow in the drawer, but it will not join on. He has tried to stick it with soap from the bathroom.',
        situationKo: '잠에서 깨어 보니 한 소년이 방바닥에 앉아 울고 있습니다. 서랍에서 그림자를 찾았지만 붙지 않습니다. 욕실 비누로 붙여 보기도 했습니다.',
        speaker: 'Peter', line: 'I was crying because I can\'t get my shadow to stick on. Besides, I wasn\'t crying.',
        prompt: 'Tell him it must be sewn on, and offer to do it.',
        promptKo: '꿰매야 붙는다고 말하고 직접 해 주겠다고 하세요.',
        answers: [{ any: ['sew', 'sewn', 'stitch', 'needle', 'thread'] }],
        model: 'It must be sewn on. I shall sew it on for you.',
        distractors: ['You should try more soap on it.', 'Leave it in the drawer where it was.', 'Shadows do not matter. Come and sit down.'],
        hints: ['Soap is no good. Think of a needle.', 'Key word: sew'],
        hintsKo: ['비누는 소용없어요. 바늘을 생각하세요.', '핵심 단어: sew'],
        reply: { speaker: 'Narrator', line: 'You sewed the shadow on to his foot. It hurt a little, but soon he was leaping about, and he had already forgotten that he owed his bliss to you. "How clever I am," he crowed, "oh, the cleverness of me!"' }
      },
      {
        role: 'wendy',
        situation: 'Peter says he is not sure how old he is, because he ran away the day he was born. He lives in Kensington Gardens with the fairies, and he has never had a proper thimble — he calls a thimble a kiss.',
        situationKo: '피터는 태어난 날 도망쳤기 때문에 자기 나이를 모른다고 합니다. 켄싱턴 공원에서 요정들과 살고, 골무를 키스라고 부릅니다.',
        speaker: 'Peter', line: 'I ran away the day I was born.',
        prompt: 'Ask Peter why he ran away.',
        promptKo: '피터에게 왜 도망쳤는지 물으세요.',
        answers: [{ any: ['why'] }, { all: ['what'], any: ['reason', 'for'] }],
        model: 'Why did you run away, Peter?',
        distractors: ['How far is it to your home, Peter?', 'Did your mother let you keep the shadow, Peter?', 'Are you not cold without a jacket, Peter?'],
        hints: ['You want the reason.', 'Key word: why'],
        hintsKo: ['이유를 알고 싶습니다.', '핵심 단어: why'],
        reply: { speaker: 'Peter', line: 'Because I heard father and mother talking about what I was to be when I became a man. I don\'t want ever to be a man. I want always to be a little boy and to have fun.' }
      },
      {
        role: 'wendy',
        situation: 'Peter has told you about the lost boys, who have no mother and know no stories. He wants you to come and tell them stories, tuck them in at night and darn their clothes. But the island is far away across the sky.',
        situationKo: '피터는 어머니도 없고 이야기도 모르는 잃어버린 아이들에 대해 말했습니다. 당신이 와서 이야기를 해 주고, 밤에 이불을 덮어 주고, 옷을 기워 주기를 바랍니다. 하지만 섬은 하늘 저 멀리에 있습니다.',
        speaker: 'Peter', line: 'Wendy, come with me and tell the other boys stories.',
        prompt: 'Ask Peter to teach you to fly.',
        promptKo: '피터에게 나는 법을 가르쳐 달라고 하세요.',
        answers: [{ any: ['teach', 'taught', 'show me', 'learn'] }, { all: ['fly'], any: ['how', 'cannot', 'can'] }],
        model: 'Oh, Peter, would you teach me to fly?',
        distractors: ['Oh, Peter, I must ask mother first.', 'Oh, Peter, my brothers are sleeping.', 'Oh, Peter, the window is too small for us.'],
        hints: ['You cannot do it yet. He can.', 'Key word: teach'],
        hintsKo: ['당신은 아직 못 하지만 피터는 할 수 있습니다.', '핵심 단어: teach'],
        reply: { speaker: 'Peter', line: 'I\'ll teach you how to jump on the wind\'s back, and then away we go. Wake John and Michael — second to the right, and then straight on till morning!' }
      }
    ]
  },
  {
    num: 4, title: 'The Flight', ko: '날아가는 길',
    summary: 'For days the children fly after Peter, who is careless and forgetful. The island rises out of the sea, the pirates fire Long Tom at them, and the children are scattered. Tinker Bell leads Wendy on alone.',
    summaryKo: '아이들은 며칠 동안 무심하고 잘 잊는 피터를 따라 날아갑니다. 바다 위에 섬이 나타나고 해적이 대포 롱 톰을 쏘아 아이들이 흩어집니다. 팅커벨이 웬디를 혼자 데리고 갑니다.',
    scenes: [
      {
        role: 'wendy',
        situation: 'You have been flying for a long time. Michael keeps falling asleep in the air and dropping like a stone. Peter thinks it great fun to let him fall a long way before he saves him.',
        situationKo: '오랫동안 날고 있습니다. 마이클은 공중에서 계속 잠들어 돌처럼 떨어집니다. 피터는 마이클이 한참 떨어지게 두었다가 구하는 것을 재미있어 합니다.',
        speaker: 'John', line: 'There he goes again! Peter, look, Michael is falling!',
        prompt: 'Tell Peter to save Michael and catch him.',
        promptKo: '피터에게 마이클을 구하라고, 잡으라고 말하세요.',
        answers: [{ any: ['save', 'catch', 'help him', 'rescue'] }],
        model: 'Peter, save him! Catch Michael before he falls into the sea!',
        distractors: ['Peter, look how blue the sea is from here!', 'Peter, tell us about the pirates again.', 'Peter, I am hungry. Where is the food?'],
        hints: ['Michael is dropping. Peter can still reach him.', 'Key words: save, catch'],
        hintsKo: ['마이클이 떨어지고 있고 피터는 아직 닿을 수 있습니다.', '핵심 단어: save, catch'],
        reply: { speaker: 'Narrator', line: 'At the last moment Peter dived through the air and caught Michael just before he could strike the sea. But he was so fond of the trick that you felt he might let him fall next time.' }
      },
      {
        role: 'john',
        situation: 'The Neverland is in sight, exactly as you dreamed it. Peter tells you there are pirates on the island, and that their captain is called Hook — Jas. Hook, who was once Blackbeard\'s bo\'sun.',
        situationKo: '꿈에서 본 그대로 네버랜드가 보입니다. 피터는 섬에 해적이 있고, 그 두목이 후크라고 말합니다. 한때 검은 수염의 갑판장이었던 제임스 후크입니다.',
        speaker: 'Peter', line: 'Hook is the worst of them all. He is the only man Long John Silver was ever afraid of.',
        prompt: 'Ask what Hook is like — is he big?',
        promptKo: '후크가 어떤 사람인지, 몸집이 큰지 물으세요.',
        answers: [{ any: ['like', 'big', 'look', 'tall', 'strong'] }],
        model: 'Is he big? What is he like?',
        distractors: ['Is the sea very deep here?', 'Is Michael asleep again?', 'Are we there yet, Peter?'],
        hints: ['You want a description of the man.', 'Key words: what is he like'],
        hintsKo: ['그 사람의 모습을 알고 싶습니다.', '핵심 단어: what is he like'],
        reply: { speaker: 'Peter', line: 'He has an iron hook instead of a right hand, and he claws with it. I cut off his arm and flung it to a crocodile. And remember: if we meet Hook in open fight, you must leave him to me.' }
      },
      {
        role: 'wendy',
        situation: 'Darkness has come over the island. The pirates fired their big gun, Long Tom, and the roar blew you all apart. You are alone in the sky with Tinker Bell, who flutters ahead, ringing her little bell.',
        situationKo: '섬 위에 어둠이 내렸습니다. 해적이 대포 롱 톰을 쏘았고 그 폭음에 모두 흩어졌습니다. 당신은 팅커벨과 단둘이 하늘에 있고, 팅커벨은 앞에서 작은 종을 울리며 날아갑니다.',
        speaker: 'Narrator', line: 'Tink beckons. You cannot understand her bells, but she seems to know the way.',
        prompt: 'Say that you will follow Tinker Bell.',
        promptKo: '팅커벨을 따라가겠다고 말하세요.',
        answers: [{ any: ['follow', 'after her', 'go with her', 'tink', 'tinker'] }],
        model: 'I will follow Tinker Bell; she must know the way.',
        distractors: ['I will wait here until Peter comes back.', 'I will fly down to the pirate ship and ask.', 'I will go straight back home to mother.'],
        hints: ['She is going somewhere. You go too.', 'Key word: follow'],
        hintsKo: ['팅커벨이 어딘가로 갑니다. 당신도 갑니다.', '핵심 단어: follow'],
        reply: { speaker: 'Narrator', line: 'Tink was not all bad; or rather, she was all bad just now. She led you on — towards the lost boys, and she had a plan for you.' }
      }
    ]
  },
  {
    num: 5, title: 'The Island Come True', ko: '진짜가 된 섬',
    summary: 'Lost boys, pirates, redskins and beasts go round the island, each hunting the next. Hook tells Smee about the crocodile that swallowed a clock, and Tinker Bell tricks Tootles into shooting the "Wendy bird".',
    summaryKo: '잃어버린 아이들, 해적, 원주민, 짐승들이 서로를 쫓으며 섬을 돕니다. 후크는 스미에게 시계를 삼킨 악어 이야기를 하고, 팅커벨은 투틀스를 속여 "웬디 새"를 쏘게 합니다.',
    scenes: [
      {
        role: 'smee',
        situation: 'You are resting on a mushroom with Captain Hook. He has just told you that Peter Pan flung his arm to a crocodile, and that the crocodile has followed him ever since, licking its lips for the rest of him. Then you hear it: tick, tick, tick.',
        situationKo: '후크 선장과 버섯 위에 앉아 쉬고 있습니다. 선장은 피터 팬이 자기 팔을 악어에게 던져 주었고, 그 뒤로 악어가 남은 몸을 노리며 따라다닌다고 말했습니다. 그때 들립니다. 틱, 틱, 틱.',
        speaker: 'Hook', line: 'By a lucky chance it swallowed a clock, so before it can reach me I hear the tick and bolt.',
        prompt: 'Tell the captain to listen: the clock is ticking, the crocodile is coming.',
        promptKo: '선장에게 들어 보라고, 시계가 울린다고, 악어가 온다고 말하세요.',
        answers: [{ any: ['tick', 'ticking', 'clock', 'crocodile', 'croc'] }],
        model: 'Captain, listen! The clock — the crocodile is coming!',
        distractors: ['Captain, the cake is nearly baked.', 'Captain, the redskins are on the warpath.', 'Captain, shall I fetch you a coat?'],
        hints: ['What sound does the crocodile make?', 'Key words: tick, crocodile'],
        hintsKo: ['악어가 내는 소리는?', '핵심 단어: tick, crocodile'],
        reply: { speaker: 'Narrator', line: 'Hook shuddered and fled, and you ran after him. The crocodile passed by, and the boys came out of their trees; but there was danger in the air for Tootles.' }
      },
      {
        role: 'tootles',
        situation: 'Tinker Bell told you that Peter wanted you to shoot a great white bird flying towards you. You did, and it fell. But now Slightly is kneeling beside it, and it is not a bird at all.',
        situationKo: '팅커벨이 당신에게 피터가 다가오는 큰 흰 새를 쏘라고 했다고 전했습니다. 당신은 쏘았고 새는 떨어졌습니다. 그런데 슬라이틀리가 그 옆에 무릎을 꿇었고, 그것은 새가 아니었습니다.',
        speaker: 'Slightly', line: 'This is no bird. I think it must be a lady.',
        prompt: 'Confess that you did it — it was your arrow.',
        promptKo: '당신이 한 일이라고, 당신의 화살이었다고 고백하세요.',
        answers: [{ any: ['my arrow', 'i shot', 'i did it', 'it was me', 'it was i', 'my fault'] }],
        model: 'I did it. It was my arrow. Oh, what have I done?',
        distractors: ['Peter told us to bring her down.', 'Nibs saw her first, not me.', 'Let us carry her to the pirates.'],
        hints: ['Take the blame. Whose arrow was it?', 'Key words: my arrow'],
        hintsKo: ['책임을 지세요. 누구의 화살이었나요?', '핵심 단어: my arrow'],
        reply: { speaker: 'Narrator', line: 'Then you heard a crowing sound. Peter was coming home. "Great news, boys," he cried, "I have brought at last a mother for you all."' }
      },
      {
        role: 'tootles',
        situation: 'Peter asks where Wendy is. The boys stand in a ring round her, hiding her. Peter steps forward and sees her lying so still. He asks whose arrow it is.',
        situationKo: '피터가 웬디가 어디 있느냐고 묻습니다. 아이들은 웬디를 둘러싸 숨기고 있습니다. 피터가 다가와 꼼짝 않는 웬디를 봅니다. 누구의 화살이냐고 묻습니다.',
        speaker: 'Peter', line: 'Whose arrow?',
        prompt: 'Step forward, say it was you, and tell Peter to strike true.',
        promptKo: '앞으로 나서서 당신이 했다고 말하고, 피터에게 제대로 찌르라고 말하세요.',
        answers: [{ any: ['strike', 'punish', 'kill me', 'shoot me'] }],
        model: 'It was I, Peter. Strike, Peter; strike true.',
        distractors: ['She is only asleep under the tree, Peter.', 'Tink told us to do it, Peter.', 'We found her here, Peter; we did nothing.'],
        hints: ['Offer to take the punishment.', 'Key word: strike'],
        hintsKo: ['벌을 받겠다고 하세요.', '핵심 단어: strike'],
        reply: { speaker: 'Narrator', line: 'Peter raised the arrow — but Wendy\'s hand rose. "The Wendy lady lives!" cried Slightly. The acorn button Peter had given her had stopped the arrow. Peter\'s kiss had saved her.' }
      }
    ]
  },
  {
    num: 6, title: 'The Little House', ko: '작은 집',
    summary: 'Wendy cannot be moved, so the boys build a little house round her while she sleeps. She wakes, agrees to be their mother, and Peter stands guard outside with his sword while Tink is banished for a week.',
    summaryKo: '웬디를 옮길 수 없어서 아이들은 잠든 웬디 주위에 작은 집을 짓습니다. 웬디는 깨어나 아이들의 어머니가 되기로 하고, 피터는 칼을 들고 밖에서 지킵니다. 팅커벨은 일주일 동안 추방됩니다.',
    scenes: [
      {
        role: 'peter',
        situation: 'Wendy is lying on the ground, breathing but not awake. It would be unrespectful to carry her, and you cannot leave her lying there. The boys wait for your orders.',
        situationKo: '웬디는 숨은 쉬지만 깨어나지 않고 땅에 누워 있습니다. 들어 옮기는 것은 예의가 아니고, 그냥 두고 갈 수도 없습니다. 아이들이 당신의 명령을 기다립니다.',
        speaker: 'Curly', line: 'What shall we do with her, Peter?',
        prompt: 'Tell the boys to build a little house round her.',
        promptKo: '아이들에게 웬디 주위에 작은 집을 지으라고 하세요.',
        answers: [{ any: ['build', 'house', 'hut'] }],
        model: 'Let us build a little house round her.',
        distractors: ['Let us carry her down my tree.', 'Let us wake her with a song.', 'Let us fetch water from the lagoon.'],
        hints: ['If she cannot come to a home, bring a home to her.', 'Key words: build, house'],
        hintsKo: ['웬디가 집에 올 수 없다면 집을 웬디에게 가져오세요.', '핵심 단어: build, house'],
        reply: { speaker: 'Narrator', line: 'In a moment they were as busy as tailors the night before a wedding. John and Michael arrived, half asleep, and were set to work carrying branches at once.' }
      },
      {
        role: 'wendy',
        situation: 'You wake in a little house with red walls and a mossy roof. Outside, a row of boys with their caps off are looking at you. They have never had a mother.',
        situationKo: '붉은 벽과 이끼 지붕이 있는 작은 집에서 깨어납니다. 밖에는 모자를 벗은 아이들이 한 줄로 서서 당신을 바라봅니다. 이 아이들에게는 어머니가 없었습니다.',
        speaker: 'Peter', line: 'O Wendy lady, be our mother.',
        prompt: 'Agree, but say you are only a little girl with no real experience.',
        promptKo: '좋다고 하되, 당신은 진짜 경험이 없는 어린 소녀일 뿐이라고 말하세요.',
        answers: [{ any: ['little girl', 'experience', 'do my best', 'very well', 'of course'] }],
        model: 'Very well, I will do my best. But I am only a little girl; I have no real experience.',
        distractors: ['No, I must go home to my own mother at once.', 'Ask Tinker Bell; she knows this island better.', 'Only if Peter promises to behave himself.'],
        hints: ['Say yes, then be honest about your age.', 'Key words: very well, little girl'],
        hintsKo: ['좋다고 하고, 나이에 대해 솔직하게 말하세요.', '핵심 단어: very well, little girl'],
        reply: { speaker: 'Peter', line: 'That doesn\'t matter. What we need is just a nice motherly person. Come in — there is a fine roof, and John\'s hat for a chimney!' }
      },
      {
        role: 'peter',
        situation: 'Night has come. Wendy and the boys are inside the little house. You stand outside the door with your sword drawn. Far away, pirates are carousing, and wolves are prowling in the wood.',
        situationKo: '밤이 되었습니다. 웬디와 아이들은 작은 집 안에 있습니다. 당신은 칼을 뽑아 들고 문 앞에 서 있습니다. 멀리서 해적들이 떠들고, 숲에서는 늑대가 어슬렁거립니다.',
        speaker: 'Wendy', line: 'Peter, aren\'t you coming in? It is cold out there.',
        prompt: 'Say that you will keep guard outside all night.',
        promptKo: '밤새 밖에서 지키겠다고 말하세요.',
        answers: [{ any: ['guard', 'watch', 'protect', 'keep you safe'] }],
        model: 'No, I shall keep guard outside. Sleep, Wendy.',
        distractors: ['Yes, move over and give me a blanket.', 'The wolves are only playing; do not mind them.', 'I am going back to the pirates to fight.'],
        hints: ['Somebody must stay awake at the door.', 'Key word: guard'],
        hintsKo: ['누군가는 문 앞에서 깨어 있어야 합니다.', '핵심 단어: guard'],
        reply: { speaker: 'Narrator', line: 'By and by you fell asleep at your post, and some unsteady fairies coming home late from a party had to climb over you on their way to bed.' }
      }
    ]
  },
  {
    num: 7, title: 'The Home Under the Ground', ko: '땅속의 집',
    summary: 'Life in the home under the ground: each boy has a hollow tree fitted to his size, Michael sleeps in a basket as the baby, and Wendy cooks, darns and puts everyone to bed in one great bed.',
    summaryKo: '땅속 집의 생활입니다. 아이들마다 몸에 맞는 빈 나무가 있고, 막내 마이클은 바구니에서 자고, 웬디는 요리하고 옷을 기우고 모두를 큼직한 침대 하나에 재웁니다.',
    scenes: [
      {
        role: 'michael',
        situation: 'The boys go down to the home under the ground through hollow trees, each tree fitted to the size of one boy. The big bed holds everyone — nearly. Wendy is looking at you.',
        situationKo: '아이들은 저마다 몸 크기에 맞는 빈 나무를 통해 땅속 집으로 내려갑니다. 큰 침대에는 모두가 누울 수 있습니다. 거의요. 웬디가 당신을 바라봅니다.',
        speaker: 'Wendy', line: 'Michael, you shall sleep in the basket that hangs from the wall.',
        prompt: 'Protest that you are not a baby.',
        promptKo: '당신은 아기가 아니라고 항의하세요.',
        answers: [{ all: ['baby'], any: ['not', 'no'] }, { any: ['too big', 'grown', 'big boy'] }],
        model: 'I am not a baby, Wendy!',
        distractors: ['May I have the biggest tree, Wendy?', 'I want to go home now, Wendy.', 'Where is Nana, Wendy?'],
        hints: ['Say what you are not.', 'Key words: not a baby'],
        hintsKo: ['당신이 무엇이 아닌지 말하세요.', '핵심 단어: not a baby'],
        reply: { speaker: 'Wendy', line: 'Somebody has to be the baby, and you are the youngest. Into the basket with you!' }
      },
      {
        role: 'wendy',
        situation: 'Supper is over — half of it real food, half make-believe, depending on Peter\'s whim. The bed has been let down from the wall at half-past six. The boys are still full of noise.',
        situationKo: '저녁 식사가 끝났습니다. 피터의 기분에 따라 절반은 진짜 음식, 절반은 상상 음식이었습니다. 여섯 시 반에 벽에서 침대를 내렸습니다. 아이들은 여전히 소란스럽습니다.',
        speaker: 'Nibs', line: 'Wendy, I\'m not tired! Let us play at pirates!',
        prompt: 'Tell the boys it is bedtime and they must all get into bed.',
        promptKo: '아이들에게 잘 시간이니 모두 침대에 들어가라고 말하세요.',
        answers: [{ any: ['bed', 'bedtime', 'sleep', 'lights out'] }],
        model: 'Now then, boys, it is bedtime. Into bed, all of you!',
        distractors: ['Now then, boys, who wants a second helping?', 'Now then, boys, let us go and find Peter.', 'Now then, boys, wash your hands first.'],
        hints: ['It is half-past six. Where do children go?', 'Key word: bed'],
        hintsKo: ['여섯 시 반입니다. 아이들은 어디로 가야 할까요?', '핵심 단어: bed'],
        reply: { speaker: 'Narrator', line: 'They all slept in the one bed, packed like sardines in a tin, and there was a strict rule: nobody might turn round until one gave the signal, when all turned at once.' }
      }
    ]
  },
  {
    num: 8, title: 'The Mermaids\' Lagoon', ko: '인어의 호수',
    summary: 'On Marooners\' Rock the pirates leave Tiger Lily to drown. Peter frees her by imitating Hook\'s voice, then fights the real Hook and is wounded. Left alone on the sinking rock, he says: "To die will be an awfully big adventure."',
    summaryKo: '해적들이 타이거 릴리를 마루너스 바위에 두어 물에 빠뜨리려 합니다. 피터는 후크의 목소리를 흉내 내어 릴리를 풀어 주고, 진짜 후크와 싸우다 다칩니다. 가라앉는 바위에 홀로 남은 피터는 말합니다. "죽는 것도 엄청 큰 모험일 거야."',
    scenes: [
      {
        role: 'peter',
        situation: 'You are hiding in the water by Marooners\' Rock. Smee and Starkey have rowed up with Tiger Lily bound hand and foot, to leave her on the rock for the tide. You can imitate any voice — even Hook\'s.',
        situationKo: '마루너스 바위 옆 물속에 숨어 있습니다. 스미와 스타키가 손발이 묶인 타이거 릴리를 배에 태워 왔습니다. 바위에 두고 물이 차오르게 하려는 것입니다. 당신은 누구의 목소리든 흉내 낼 수 있습니다. 후크의 목소리도요.',
        speaker: 'Smee', line: 'Luff, you lubber! Here\'s the rock. Now then, heave her up.',
        prompt: 'In Hook\'s voice, order them to set the redskin free and cut her bonds.',
        promptKo: '후크의 목소리로, 원주민 여인을 풀어 주고 밧줄을 끊으라고 명령하세요.',
        answers: [{ any: ['free', 'loose', 'release', 'cut her', 'let her go', 'untie'] }],
        model: 'Ahoy there, you lubbers! Set her free — cut her bonds and let her go.',
        distractors: ['Ahoy there, you lubbers! Row faster, the tide is turning!', 'Ahoy there, you lubbers! Bring her to the ship and lock her up.', 'Ahoy there, you lubbers! Leave her on the rock and come back at once.'],
        hints: ['You want them to undo the ropes.', 'Key words: set her free'],
        hintsKo: ['밧줄을 풀게 해야 합니다.', '핵심 단어: set her free'],
        reply: { speaker: 'Narrator', line: '"But, captain—" said Smee. "Better do what the captain orders," said Starkey nervously. They cut her cords, and like an eel Tiger Lily slid between their legs into the water.' }
      },
      {
        role: 'wendy',
        situation: 'The real Hook came, and Peter fought him on the rock and was wounded. Now the pirates are gone, the tide is rising, and you and Peter cannot fly. A kite drifts overhead. Peter has caught its tail and tied it round you.',
        situationKo: '진짜 후크가 왔고, 피터는 바위 위에서 싸우다 다쳤습니다. 이제 해적은 가고, 물은 차오르고, 당신과 피터는 날 수 없습니다. 연 하나가 머리 위로 떠갑니다. 피터가 연 꼬리를 잡아 당신 몸에 묶었습니다.',
        speaker: 'Peter', line: 'It can\'t lift two. Michael and Curly tried. It must take you.',
        prompt: 'Refuse to leave without Peter. Ask to draw lots.',
        promptKo: '피터 없이는 가지 않겠다고 하고, 제비뽑기를 하자고 하세요.',
        answers: [{ any: ['without you', 'not without', 'draw lots', 'lots', 'together', 'both of us'] }],
        model: 'No, Peter, not without you. Let us draw lots.',
        distractors: ['Thank you, Peter; I will tell mother you were brave.', 'Peter, hold the string while I climb on.', 'Peter, is this kite Michael\'s or John\'s?'],
        hints: ['You will not go alone. Suggest a fair way to choose.', 'Key words: not without you, draw lots'],
        hintsKo: ['혼자 가지 않겠다고 하고, 공정하게 정하는 방법을 제안하세요.', '핵심 단어: not without you, draw lots'],
        reply: { speaker: 'Narrator', line: 'But Peter would have no lots. With a "Good-bye, Wendy," he pushed you from the rock, and in a few minutes the kite had carried you out of his sight.' }
      },
      {
        role: 'peter',
        situation: 'You are alone on the rock. The water is rising round your feet, and soon it will cover the rock. For the first time in your life you feel afraid — one shudder, like a wave passing over the sea.',
        situationKo: '바위에 홀로 남았습니다. 물이 발밑까지 차오르고 곧 바위를 덮을 것입니다. 태어나 처음으로 두려움을 느낍니다. 바다 위로 파도가 한 번 지나가듯, 한 번의 떨림입니다.',
        speaker: 'Narrator', line: 'The moon is rising. There is nothing to do but wait.',
        prompt: 'Say what dying will be — an awfully big adventure.',
        promptKo: '죽음이 어떤 것일지 말하세요. 엄청 큰 모험이라고.',
        answers: [{ any: ['adventure', 'adventures'] }],
        model: 'To die will be an awfully big adventure.',
        distractors: ['Wendy will send Nana to fetch me.', 'I shall swim to the ship and fight them all.', 'Somebody help! I cannot get down!'],
        hints: ['Peter is not afraid for long. What does he call everything?', 'Key word: adventure'],
        hintsKo: ['피터의 두려움은 오래가지 않습니다. 피터는 모든 것을 무엇이라고 부르나요?', '핵심 단어: adventure'],
        reply: { speaker: 'Narrator', line: 'The drum of the sea beat within you. Then something brushed against you, as light as a kiss, and stayed there — the Never bird\'s nest, floating on the water, with the bird still sitting in it.' }
      }
    ]
  },
  {
    num: 9, title: 'The Never Bird', ko: '네버 새',
    summary: 'The Never bird paddles her floating nest to Peter and, after much cross quacking on both sides, gives it to him. He puts her eggs in Starkey\'s hat, hoists his shirt for a sail, and drifts home.',
    summaryKo: '네버 새가 물에 뜬 둥지를 피터에게 밀어 옵니다. 서로 성을 내며 한참 소리친 뒤, 새는 둥지를 피터에게 내어 줍니다. 피터는 새의 알을 스타키의 모자에 넣고 셔츠를 돛으로 올려 집으로 떠갑니다.',
    scenes: [
      {
        role: 'peter',
        situation: 'The Never bird has paddled her nest close to the rock, calling to you. She wants you to get in, but neither of you knows the other\'s language, and you are both getting cross.',
        situationKo: '네버 새가 둥지를 바위 곁으로 밀어 오면서 당신에게 소리칩니다. 둥지에 타라는 뜻이지만 서로 말을 몰라 둘 다 화가 나기 시작합니다.',
        speaker: 'The Never bird', line: 'Get into the nest, you stupid boy, before it is too late!',
        prompt: 'Say that you cannot understand a word she says.',
        promptKo: '새가 하는 말을 한 마디도 못 알아듣겠다고 말하세요.',
        answers: [{ any: ['understand', 'what are you', 'what do you', 'quacking', 'saying', 'mean'] }],
        model: 'I cannot understand a word you say! What are you quacking about?',
        distractors: ['Please fly to the ship and fetch Smee.', 'You are a very fine bird indeed.', 'Take your eggs somewhere else, bird.'],
        hints: ['You hear noise, not words.', 'Key word: understand'],
        hintsKo: ['말이 아니라 소리로만 들립니다.', '핵심 단어: understand'],
        reply: { speaker: 'Narrator', line: 'Then the Never bird did a brave thing. She flew up off the nest, leaving her eggs, so that at last you understood: she was giving you the nest.' }
      },
      {
        role: 'peter',
        situation: 'You are in the nest, which floats well, but there are two large white eggs in it. On the rock stands a stake with Starkey\'s hat hanging on it — a tarpaulin hat, deep and waterproof.',
        situationKo: '둥지에 탔고 잘 뜨지만 안에 커다란 흰 알이 두 개 있습니다. 바위 위 막대에 스타키의 모자가 걸려 있습니다. 깊고 물이 새지 않는 방수 모자입니다.',
        speaker: 'Narrator', line: 'The bird is circling overhead, watching her eggs.',
        prompt: 'Say that you will put the eggs in the hat and set it afloat.',
        promptKo: '알을 모자에 넣어 물에 띄우겠다고 말하세요.',
        answers: [{ any: ['hat'] }, { all: ['eggs'], any: ['float', 'safe'] }],
        model: 'I will put the eggs in Starkey\'s hat and set it afloat.',
        distractors: ['I will eat the eggs; I am starving.', 'I will leave the eggs on the rock for the bird.', 'I will carry the eggs home to Wendy.'],
        hints: ['Something waterproof is hanging on the stake.', 'Key word: hat'],
        hintsKo: ['막대에 방수되는 물건이 걸려 있습니다.', '핵심 단어: hat'],
        reply: { speaker: 'Narrator', line: 'The hat floated beautifully. The Never bird settled on it, and you hoisted your shirt for a sail and drifted home. To this day, Never birds build their nests in the shape of a hat.' }
      }
    ]
  },
  {
    num: 10, title: 'The Happy Home', ko: '행복한 집',
    summary: 'The grateful redskins guard the home above, and Peter grows very grand. In the evening the family plays at father and mother, until Wendy asks Peter what his exact feelings for her are.',
    summaryKo: '고마워하는 원주민들이 땅 위에서 집을 지켜 주고, 피터는 아주 거만해집니다. 저녁이면 가족은 아버지와 어머니 놀이를 하는데, 웬디가 피터에게 자기에게 어떤 감정인지 정확히 묻습니다.',
    scenes: [
      {
        role: 'wendy',
        situation: 'The boys are in bed. You are darning by the fire, and Peter, home from his adventures, has sat down with a troubled look. He has been playing at being the children\'s father all evening.',
        situationKo: '아이들은 잠들었습니다. 당신은 난롯가에서 옷을 기우고, 모험에서 돌아온 피터는 근심스러운 얼굴로 앉았습니다. 피터는 저녁 내내 아이들의 아버지 역할을 했습니다.',
        speaker: 'Peter', line: 'Wendy, it is only make-believe, isn\'t it, that I am their father?',
        prompt: 'Say yes, it is only pretend, and ask what his exact feelings for you are.',
        promptKo: '그렇다고, 놀이일 뿐이라고 하고, 당신에게 어떤 감정인지 정확히 물으세요.',
        answers: [{ any: ['feelings', 'feel about me', 'feel for me', 'make believe', 'pretend'] }],
        model: 'Oh yes, it is only make-believe. Peter, what are your exact feelings for me?',
        distractors: ['Oh no, you are a real father now, Peter.', 'Oh Peter, the boys have been so good today.', 'Oh Peter, sit down; your supper is getting cold.'],
        hints: ['Reassure him, then ask the question you really want answered.', 'Key words: make-believe, feelings'],
        hintsKo: ['안심시킨 다음, 정말 궁금한 것을 물으세요.', '핵심 단어: make-believe, feelings'],
        reply: { speaker: 'Peter', line: 'Those of a devoted son, Wendy.' }
      },
      {
        role: 'michael',
        situation: 'The boys have been allowed to sit up. You are all in the big bed, and Wendy has promised a story. Peter has come to listen too, though he does not like stories about grown-ups.',
        situationKo: '아이들은 늦게까지 앉아 있어도 된다는 허락을 받았습니다. 모두 큰 침대에 있고 웬디는 이야기를 해 주겠다고 약속했습니다. 피터도 듣러 왔지만, 어른 이야기는 좋아하지 않습니다.',
        speaker: 'Wendy', line: 'Which story shall it be tonight?',
        prompt: 'Ask for the story about your mother and father and Nana.',
        promptKo: '어머니와 아버지, 나나 이야기를 해 달라고 하세요.',
        answers: [{ any: ['mother', 'father', 'nana', 'our own', 'home'] }],
        model: 'The story about mother and father and Nana, please!',
        distractors: ['The one about the pirates and the crocodile, please!', 'The one about Cinderella and the glass slipper, please!', 'No story tonight; we want to dance!'],
        hints: ['You have almost forgotten them. Ask anyway.', 'Key words: mother, father, Nana'],
        hintsKo: ['거의 잊어버렸지만 그래도 물어보세요.', '핵심 단어: mother, father, Nana'],
        reply: { speaker: 'Wendy', line: 'Very well. Listen, all of you. There was once a gentleman— ' }
      }
    ]
  },
  {
    num: 11, title: 'Wendy\'s Story', ko: '웬디의 이야기',
    summary: 'Wendy tells how the children flew away and how a mother always keeps the window open. Peter says she is wrong: mothers forget and bar the window. Wendy decides to go home at once, and the lost boys beg to come too.',
    summaryKo: '웬디는 아이들이 날아간 이야기와, 어머니는 언제나 창을 열어 둔다는 이야기를 합니다. 피터는 틀렸다고, 어머니는 잊고 창을 닫아 버린다고 말합니다. 웬디는 곧장 집에 가기로 하고, 잃어버린 아이들도 함께 가겠다고 애원합니다.',
    scenes: [
      {
        role: 'wendy',
        situation: 'In your story the children fly home and find the window open, because a mother always keeps it open. Peter interrupts with a groan. He says that long ago he flew back, and the window was barred, and another little boy was sleeping in his bed.',
        situationKo: '이야기 속에서 아이들은 집으로 날아가 열린 창을 발견합니다. 어머니는 언제나 창을 열어 두니까요. 피터가 신음하며 끼어듭니다. 오래전에 자기가 돌아갔을 때는 창이 잠겨 있었고, 다른 아이가 자기 침대에서 자고 있었다고 합니다.',
        speaker: 'Peter', line: 'You are wrong about mothers. They forget you, and bar the window.',
        prompt: 'Tell John and Michael to get up: you must go home at once.',
        promptKo: '존과 마이클에게 일어나라고, 지금 바로 집에 가야 한다고 말하세요.',
        answers: [{ any: ['home', 'at once', 'go back', 'mother'] }],
        model: 'John, Michael, get up! We must go home at once.',
        distractors: ['Peter, that is a very sad story.', 'Sit down, boys; the story is not finished.', 'Peter, your bed must have been very small.'],
        hints: ['What if your own window is barred already?', 'Key words: home, at once'],
        hintsKo: ['당신 집 창문도 이미 잠겼다면?', '핵심 단어: home, at once'],
        reply: { speaker: 'Narrator', line: 'The lost boys looked at you in dismay. Peter said coolly, "Very well. Get Tink to see you across the sea," and went on playing his pipes.' }
      },
      {
        role: 'tootles',
        situation: 'Wendy is going home, and she has said that if you all come with her, she is almost sure her father and mother will adopt you. The boys are jumping for joy and gathering their things. Peter stands apart.',
        situationKo: '웬디가 집에 가는데, 모두 함께 가면 자기 부모가 입양해 줄 거라고 거의 확신한다고 했습니다. 아이들은 기뻐 뛰며 짐을 챙깁니다. 피터는 떨어져 서 있습니다.',
        speaker: 'Wendy', line: 'Then get your things, all of you. Quick!',
        prompt: 'Ask whether Peter is coming too.',
        promptKo: '피터도 함께 가는지 물으세요.',
        answers: [{ any: ['peter', 'you too', 'coming too', 'come too', 'with us'] }],
        model: 'Peter, are you coming too?',
        distractors: ['Wendy, will your mother make us a pie?', 'Nibs, fetch my bow and arrows!', 'Slightly, put on your best hat.'],
        hints: ['One person has not said yes.', 'Key word: Peter'],
        hintsKo: ['한 사람은 아직 좋다고 하지 않았습니다.', '핵심 단어: Peter'],
        reply: { speaker: 'Peter', line: 'No. They would catch me and make me a man. I just want always to be a little boy and to have fun. Now, no fuss, no blubbering.' }
      },
      {
        role: 'wendy',
        situation: 'Everyone is ready to climb up the trees. You have set out Peter\'s medicine in a cup by his bed — one dose every night. He pretends not to care that you are going.',
        situationKo: '모두 나무를 타고 올라갈 준비가 되었습니다. 당신은 피터의 침대 곁에 약을 잔에 담아 두었습니다. 매일 밤 한 번씩입니다. 피터는 당신이 떠나는 것을 아무렇지 않은 척합니다.',
        speaker: 'Peter', line: 'Good-bye, Wendy. I hope you have a pleasant journey.',
        prompt: 'Tell Peter to take his medicine every night.',
        promptKo: '피터에게 매일 밤 약을 먹으라고 말하세요.',
        answers: [{ any: ['medicine'] }],
        model: 'Peter, you will take your medicine every night, won\'t you?',
        distractors: ['Peter, come with us, please, just once.', 'Peter, keep the window open for us.', 'Peter, may I keep Tink with me?'],
        hints: ['It is in the cup by his bed.', 'Key word: medicine'],
        hintsKo: ['피터의 침대 옆 잔에 들어 있습니다.', '핵심 단어: medicine'],
        reply: { speaker: 'Narrator', line: '"Yes," said Peter, and turned away. But above you the redskins had been beaten while you told your story, and when the boys climbed out of their trees they walked straight into the pirates\' arms.' }
      }
    ]
  },
  {
    num: 12, title: 'The Children Are Carried Off', ko: '아이들이 끌려가다',
    summary: 'The pirates have surprised and beaten the redskins. They seize the children one by one as they come up the trees, and Hook creeps down Slightly\'s tree to poison the sleeping Peter\'s medicine.',
    summaryKo: '해적들이 원주민을 기습해 물리쳤습니다. 나무에서 올라오는 아이들을 하나씩 붙잡고, 후크는 슬라이틀리의 나무로 내려가 잠든 피터의 약에 독을 넣습니다.',
    scenes: [
      {
        role: 'wendy',
        situation: 'You came up your tree last. A pirate seized each boy as he appeared and tossed him from man to man. Now Hook himself stands before you and raises his hat with ironical politeness.',
        situationKo: '당신은 마지막으로 나무에서 올라왔습니다. 해적들은 아이들이 나오는 대로 붙잡아 서로에게 던졌습니다. 이제 후크가 직접 당신 앞에 서서 비웃는 듯 예의를 차려 모자를 들어 올립니다.',
        speaker: 'Hook', line: 'Good evening, madam. Allow me to escort you to a place where your children are waiting.',
        prompt: 'Demand that he let the boys go — they are only children.',
        promptKo: '아이들을 놓아 달라고, 어린아이일 뿐이라고 요구하세요.',
        answers: [{ any: ['let them go', 'let the boys go', 'release', 'set them free', 'free them', 'let us go', 'only children'] }],
        model: 'Let the boys go! They are only children.',
        distractors: ['Where are you taking us, Captain?', 'Please be careful with Michael; he is very small.', 'Peter will hear of this, you coward!'],
        hints: ['Order him to release them.', 'Key words: let them go'],
        hintsKo: ['풀어 주라고 명령하세요.', '핵심 단어: let them go'],
        reply: { speaker: 'Narrator', line: 'Hook only bowed lower. The pirates tied you all up and carried you off through the wood, and Hook stayed behind, looking at the trees.' }
      },
      {
        role: 'hook',
        situation: 'You have squeezed down Slightly\'s tree into the home under the ground. Peter lies asleep on the bed, one arm hanging over the edge. On a shelf within reach of your hook stands his cup of medicine.',
        situationKo: '슬라이틀리의 나무를 비집고 땅속 집으로 내려왔습니다. 피터는 한 팔을 침대 밖으로 늘어뜨린 채 잠들어 있습니다. 손이 닿는 선반 위에 피터의 약이 든 잔이 놓여 있습니다.',
        speaker: 'Narrator', line: 'You cannot reach the boy through the door, but you always carry a phial of your own poison.',
        prompt: 'Say that you will put five drops of poison in his cup.',
        promptKo: '피터의 잔에 독을 다섯 방울 넣겠다고 말하세요.',
        answers: [{ any: ['poison', 'drops'] }],
        model: 'Five drops of poison in his cup, and Peter Pan is finished.',
        distractors: ['I shall carry him off to the ship with the others.', 'I shall wake him and fight him like a gentleman.', 'I shall leave him; he is only a sleeping boy.'],
        hints: ['You have a phial. His cup is right there.', 'Key word: poison'],
        hintsKo: ['독약 병이 있고, 피터의 잔이 바로 앞에 있습니다.', '핵심 단어: poison'],
        reply: { speaker: 'Narrator', line: 'You wormed your way back up the tree and stole off through the wood, a sinister figure in the moonlight. And a tiny ball of light came darting down the tree towards the sleeping boy.' }
      }
    ]
  },
  {
    num: 13, title: 'Do You Believe in Fairies?', ko: '요정을 믿나요?',
    summary: 'Tinker Bell wakes Peter, warns him, and drinks the poison herself. As her light fades, Peter calls to all dreaming children to clap if they believe in fairies. Tink is saved, and Peter swears: "Hook or me this time."',
    summaryKo: '팅커벨이 피터를 깨워 경고하고, 독을 대신 마십니다. 빛이 꺼져 가자 피터는 꿈꾸는 모든 아이들에게 요정을 믿으면 손뼉을 치라고 외칩니다. 팅커벨은 살아나고, 피터는 맹세합니다. "이번엔 후크냐 나냐다."',
    scenes: [
      {
        role: 'peter',
        situation: 'Tink has woken you and told you, in a rush of bells, that Wendy and the boys have been captured by the pirates. You reach for your medicine, and she cries out that it is poisoned — by Hook.',
        situationKo: '팅커벨이 당신을 깨워 종소리로 다급하게 알립니다. 웬디와 아이들이 해적에게 잡혔다고요. 약을 집으려는데 팅커벨이 그 약에 후크가 독을 넣었다고 소리칩니다.',
        speaker: 'Tinker Bell', line: 'Don\'t drink it! It is poisoned!',
        prompt: 'Say that is nonsense — you promised Wendy you would take it, and you will.',
        promptKo: '말도 안 된다고, 웬디에게 먹겠다고 약속했으니 먹겠다고 말하세요.',
        answers: [{ any: ['promised', 'promise', 'nonsense', 'silly', 'drink it', 'take it'] }],
        model: 'Nonsense! I promised Wendy I would take it, and I shall.',
        distractors: ['You are right, Tink; pour it away.', 'Then Hook must still be in the house! Where?', 'Fetch Wendy; she will know what to do.'],
        hints: ['Peter never believes he is in danger. What did he tell Wendy?', 'Key word: promised'],
        hintsKo: ['피터는 자기가 위험하다고 믿지 않습니다. 웬디에게 무엇을 약속했나요?', '핵심 단어: promised'],
        reply: { speaker: 'Narrator', line: 'But Tink got between your lips and the draught, and drained it to the dregs. Then she reeled in the air, and her light began to grow faint.' }
      },
      {
        role: 'peter',
        situation: 'Tink is dying. Her light is so faint you can hardly see her. She whispers that she thinks she could get well again if children believed in fairies. It is night, and children everywhere are dreaming of the Neverland.',
        situationKo: '팅커벨이 죽어 갑니다. 빛이 너무 약해 겨우 보일 정도입니다. 아이들이 요정을 믿어 준다면 다시 나을 수 있을 것 같다고 속삭입니다. 밤이고, 세상 아이들은 네버랜드 꿈을 꾸고 있습니다.',
        speaker: 'Tinker Bell', line: 'I could get well again... if children believed in fairies.',
        prompt: 'Call out to all the dreaming children: if you believe, clap your hands!',
        promptKo: '꿈꾸는 모든 아이들에게 외치세요. 믿는다면 손뼉을 치라고!',
        answers: [{ any: ['clap', 'clapping', 'hands'] }, { all: ['believe'], any: ['fairies', 'fairy'] }],
        model: 'If you believe in fairies, clap your hands! Don\'t let Tink die!',
        distractors: ['Tink, hold on; I will fetch the doctor from the ship.', 'Tink, drink some water; that will help.', 'Tink, it is only make-believe poison.'],
        hints: ['Ask every child to do something with their hands.', 'Key word: clap'],
        hintsKo: ['모든 아이들에게 손으로 무엇을 하라고 하세요.', '핵심 단어: clap'],
        reply: { speaker: 'Narrator', line: 'Many clapped. Some didn\'t. A few beasts hissed. But the clapping stopped suddenly, as if countless mothers had rushed to their nurseries — and Tink was saved. Her voice grew strong, and she was as saucy as ever.' }
      },
      {
        role: 'peter',
        situation: 'Tink is well, and there is no time to lose. You buckle on your weapons. Outside, the island lies dark and dangerous, and somewhere the crocodile is passing. You think of Hook.',
        situationKo: '팅커벨은 회복했고, 지체할 시간이 없습니다. 무기를 챕니다. 밖은 어둡고 위험한 섬이고, 어딘가에서 악어가 지나갑니다. 후크를 생각합니다.',
        speaker: 'Narrator', line: 'You crouch at the foot of the tree, ready to climb, and swear a terrible oath.',
        prompt: 'Swear the oath: Hook or me this time.',
        promptKo: '맹세하세요. 이번엔 후크냐 나냐다.',
        answers: [{ all: ['hook'], any: ['or me', 'or i', 'this time'] }, { any: ['hook or me'] }],
        model: 'Hook or me this time!',
        distractors: ['Wendy, I am coming to save you!', 'Tink, lead the way to the ship.', 'The crocodile can have him, for all I care.'],
        hints: ['One of you will not survive the night.', 'Key words: Hook or me'],
        hintsKo: ['둘 중 하나는 오늘 밤을 넘기지 못합니다.', '핵심 단어: Hook or me'],
        reply: { speaker: 'Narrator', line: 'You set off, crawling like a snake through the black night, and when you came to a clearing you crossed it like a flash. Once, far off, you heard the crocodile ticking — and an idea began to form.' }
      }
    ]
  },
  {
    num: 14, title: 'The Pirate Ship', ko: '해적선',
    summary: 'Aboard the Jolly Roger, Hook broods on good form. The boys are to walk the plank; two may live as cabin boys if they swear "Down with the King", but John and Michael refuse. Wendy is fetched for a last word, and then a ticking is heard.',
    summaryKo: '해적선 졸리 로저에서 후크는 "좋은 매너"를 곱씹습니다. 아이들은 판자 위를 걸어 바다에 떨어질 처지이고, "왕을 타도하라"고 맹세하면 둘은 사환으로 살려 준다지만 존과 마이클은 거부합니다. 웬디를 불러 마지막 말을 시키는데, 그때 틱틱 소리가 들립니다.',
    scenes: [
      {
        role: 'john',
        situation: 'You stand in a line on the deck of the Jolly Roger, bound with ropes. Hook says he has room for two cabin boys, but to be a pirate you must swear "Down with the King."',
        situationKo: '밧줄에 묶인 채 졸리 로저의 갑판에 줄지어 서 있습니다. 후크는 사환 두 명 자리가 있다면서, 해적이 되려면 "왕을 타도하라"고 맹세해야 한다고 합니다.',
        speaker: 'Hook', line: 'Well, will you swear it?',
        prompt: 'Refuse. You will not swear against the King.',
        promptKo: '거부하세요. 왕을 배신하는 맹세는 하지 않겠다고.',
        answers: [{ any: ['refuse', 'never', 'will not', 'shall not', 'loyal', 'britannia', 'god save'] }],
        model: 'Then I refuse! God save the King!',
        distractors: ['Down with the King! Where do I sign?', 'May I think about it until tomorrow?', 'Only if Michael can be a cabin boy too.'],
        hints: ['Say no like an English gentleman.', 'Key word: refuse'],
        hintsKo: ['영국 신사처럼 거절하세요.', '핵심 단어: refuse'],
        reply: { speaker: 'Hook', line: 'That seals your doom. Bring up their mother. Get the plank ready.' }
      },
      {
        role: 'wendy',
        situation: 'You have been brought up from the cabin and tied to the mast. The boys, pale but brave, stand by the plank. Hook mocks you, but he lets you speak.',
        situationKo: '선실에서 끌려 나와 돛대에 묶였습니다. 아이들은 창백하지만 용감하게 판자 옆에 서 있습니다. 후크는 당신을 비웃으면서도 말할 기회를 줍니다.',
        speaker: 'Hook', line: 'Silence all, for a mother\'s last words to her children!',
        prompt: 'Give the boys a message from their real mothers: die like English gentlemen.',
        promptKo: '아이들에게 진짜 어머니들의 메시지를 전하세요. 영국 신사처럼 죽으라고.',
        answers: [{ any: ['gentlemen', 'gentleman', 'brave', 'bravely', 'proud'] }],
        model: 'These are my last words, dear boys. Your real mothers would say this: we hope our sons will die like English gentlemen.',
        distractors: ['Dear boys, do exactly what the captain tells you.', 'Dear boys, I never wanted to be your mother anyway.', 'Dear boys, close your eyes and it will soon be over.'],
        hints: ['Tell them how to face it.', 'Key word: gentlemen'],
        hintsKo: ['어떻게 맞서야 하는지 말해 주세요.', '핵심 단어: gentlemen'],
        reply: { speaker: 'Narrator', line: 'Even Slightly straightened up. "I am going to do what my mother hopes," said Tootles. Then, through the night, came a sound: tick, tick, tick — and Hook\'s face went grey.' }
      },
      {
        role: 'peter',
        situation: 'You have swum out to the ship, ticking like the crocodile as you came. On deck the pirates have gathered round their captain to hide him, and every eye is turned away from the sea.',
        situationKo: '악어처럼 틱틱 소리를 내며 배까지 헤엄쳐 왔습니다. 갑판 위에서는 해적들이 선장을 숨기려 둘러섰고, 모두 바다에서 눈을 돌리고 있습니다.',
        speaker: 'Narrator', line: 'Nobody is looking your way.',
        prompt: 'Whisper what you will do: climb aboard while they hide their eyes.',
        promptKo: '무엇을 할지 속삭이세요. 그들이 눈을 가린 사이 배에 오르겠다고.',
        answers: [{ any: ['climb', 'aboard', 'on board', 'board', 'over the side'] }],
        model: 'Now, while they hide their eyes, I climb aboard.',
        distractors: ['Now I shall swim back and fetch the redskins.', 'Now I shall shout to Wendy that I am here.', 'Now I shall tick louder, just for fun.'],
        hints: ['Get on the ship, quietly.', 'Key word: aboard'],
        hintsKo: ['배에 조용히 올라타세요.', '핵심 단어: aboard'],
        reply: { speaker: 'Narrator', line: 'You scaled her side as noiseless as a mouse — and only then remembered that you had been ticking. You stopped. But behind you, by chance, the real crocodile was following.' }
      }
    ]
  },
  {
    num: 15, title: '\'Hook or Me This Time\'', ko: '\'후크냐 나냐\'',
    summary: 'Peter hides in the cabin and the pirates who go in do not come out. He frees the boys, takes Wendy\'s place at the mast, and reveals himself. Peter and Hook fight, and Hook leaps into the jaws of the waiting crocodile.',
    summaryKo: '피터는 선실에 숨고, 들어간 해적들은 나오지 못합니다. 피터는 아이들을 풀어 주고 돛대에서 웬디 대신 서 있다가 정체를 드러냅니다. 피터와 후크가 싸우고, 후크는 기다리던 악어의 입속으로 뛰어듭니다.',
    scenes: [
      {
        role: 'peter',
        situation: 'You are in the dark cabin. Two pirates came in and did not go out again. Now Hook has sent the boys in, tied up, to fetch something — and they have found you instead.',
        situationKo: '어두운 선실 안입니다. 해적 두 명이 들어왔다가 나가지 못했습니다. 이번에는 후크가 묶인 아이들을 무언가 가져오라고 안으로 보냈고, 아이들은 당신을 발견했습니다.',
        speaker: 'Slightly', line: 'Peter! It\'s Peter!',
        prompt: 'Tell the boys to be quiet, take the pirates\' swords, and hide till you crow.',
        promptKo: '아이들에게 조용히 하라고, 해적의 칼을 들고 당신이 닭 소리를 낼 때까지 숨으라고 하세요.',
        answers: [{ any: ['swords', 'sword', 'weapons', 'cutlass', 'hide'] }],
        model: 'Quiet, boys! Take these swords and hide till I crow.',
        distractors: ['Quiet, boys! We surrender to the captain.', 'Quiet, boys! Follow me over the side into the sea.', 'Quiet, boys! Say your prayers and be brave.'],
        hints: ['Arm them, and keep them out of sight.', 'Key words: swords, hide'],
        hintsKo: ['무장시키고 눈에 띄지 않게 하세요.', '핵심 단어: swords, hide'],
        reply: { speaker: 'Narrator', line: 'You cut their bonds and they slipped away to hide. Then you crept out, freed Wendy, and took her place at the mast, wrapped in her cloak, waiting for the moment.' }
      },
      {
        role: 'peter',
        situation: 'Hook believes the ship is cursed and that a woman aboard brings bad luck. He has ordered the girl at the mast to be flung overboard. He does not know the figure in the cloak is you.',
        situationKo: '후크는 배에 저주가 내렸고 여자가 타서 불운이 왔다고 믿습니다. 돛대에 묶인 소녀를 바다에 던지라고 명령합니다. 외투를 두른 사람이 당신인 줄은 모릅니다.',
        speaker: 'Hook', line: 'There\'s none can save you now, missy.',
        prompt: 'Throw off the cloak and tell him there is one: Peter Pan the avenger!',
        promptKo: '외투를 벗어 던지고 말하세요. 한 사람이 있다고, 복수자 피터 팬이라고!',
        answers: [{ any: ['there is one', 'peter pan', 'avenger', 'i can', 'it is i', 'it is me'] }],
        model: 'There\'s one! Peter Pan the avenger!',
        distractors: ['Captain, spare her and take me instead.', 'Wendy, close your eyes; do not look at him.', 'Ha! You have grown fat, Hook.'],
        hints: ['Answer his "none" with your name.', 'Key words: there is one, Peter Pan'],
        hintsKo: ['"아무도 없다"는 말에 당신의 이름으로 답하세요.', '핵심 단어: there is one, Peter Pan'],
        reply: { speaker: 'Narrator', line: 'The boys sprang from the cabin, and the fight was on. Soon Hook and you stood face to face. "Put up your swords, boys," you cried, "this man is mine."' }
      },
      {
        role: 'peter',
        situation: 'You and Hook face each other on the deck, swords drawn. The boys have drawn back in a ring. Hook is a master of the sword, but you dart round him like a wildcat.',
        situationKo: '갑판 위에서 후크와 마주 서서 칼을 뽑았습니다. 아이들은 물러나 둥글게 섰습니다. 후크는 검술의 달인이지만, 당신은 들고양이처럼 그 주위를 맴돕니다.',
        speaker: 'Hook', line: 'Proud and insolent youth, prepare to meet thy doom.',
        prompt: 'Answer him in the same grand style: dark and sinister man, have at thee!',
        promptKo: '같은 거창한 투로 답하세요. 어둡고 사악한 자여, 덤벼라!',
        answers: [{ any: ['dark', 'sinister', 'have at thee', 'have at you', 'come on then'] }],
        model: 'Dark and sinister man, have at thee!',
        distractors: ['Kind and gentle captain, let us be friends.', 'Wait, Hook, my sword is not ready.', 'Boys, help me; he is too strong!'],
        hints: ['Insult him back, then challenge him.', 'Key words: dark and sinister'],
        hintsKo: ['맞받아 욕한 뒤 도전하세요.', '핵심 단어: dark and sinister'],
        reply: { speaker: 'Narrator', line: '"Who and what art thou?" Hook cried at last. "I\'m youth, I\'m joy," you answered, "I\'m a little bird that has broken out of the egg." Hook flung himself into the sea — where the crocodile waited with open jaws. Thus perished James Hook.' }
      }
    ]
  },
  {
    num: 16, title: 'The Return Home', ko: '집으로',
    summary: 'The boys sail the ship home with Peter as captain. In London Mrs. Darling waits by the open window and Mr. Darling lives in the kennel. Peter flies ahead to bar the window, but cannot bear the mother\'s tears, and the children slip into their beds.',
    summaryKo: '아이들은 피터를 선장으로 삼아 배를 몰고 집으로 향합니다. 런던에서 달링 부인은 열린 창가에서 기다리고 달링 씨는 개집에서 지냅니다. 피터가 먼저 날아가 창을 잠그려 하지만 어머니의 눈물을 견디지 못하고, 아이들은 침대로 돌아옵니다.',
    scenes: [
      {
        role: 'john',
        situation: 'The Jolly Roger is yours. Peter is captain, wearing Hook\'s clothes cut down to his size, and he has decided you are all to be sailors. The boys line up on deck for orders.',
        situationKo: '졸리 로저는 이제 당신들의 배입니다. 피터는 후크의 옷을 줄여 입고 선장이 되었고, 모두 뱃사람이 되어야 한다고 정했습니다. 아이들이 명령을 기다리며 갑판에 줄을 섭니다.',
        speaker: 'Peter', line: 'Ship\'s company! What\'s our course?',
        prompt: 'Give the course: straight for home, to London.',
        promptKo: '항로를 말하세요. 곧장 집으로, 런던으로.',
        answers: [{ any: ['london', 'home', 'nursery', 'england'] }],
        model: 'Straight for home, Captain — to London!',
        distractors: ['Back to the island, Captain; we forgot the redskins.', 'Anywhere you like, Captain; the sea is wide.', 'Let Michael steer, Captain; he is bored.'],
        hints: ['Where is No. 14?', 'Key words: home, London'],
        hintsKo: ['14번지는 어디에 있나요?', '핵심 단어: home, London'],
        reply: { speaker: 'Narrator', line: 'Peter nodded, and it was so. But only Peter knew that he meant to reach the nursery first — and bar the window.' }
      },
      {
        role: 'peter',
        situation: 'You have reached the nursery ahead of the others. The window is open. Mrs. Darling sits at the piano, playing and crying; Mr. Darling is asleep in Nana\'s kennel. You have come to bar the window, so that Wendy will think her mother has forgotten her.',
        situationKo: '다른 아이들보다 먼저 아이들 방에 도착했습니다. 창문은 열려 있습니다. 달링 부인은 피아노를 치며 울고 있고, 달링 씨는 나나의 개집에서 잠들었습니다. 당신은 창을 잠그러 왔습니다. 웬디가 어머니에게 잊혔다고 생각하게 하려고요.',
        speaker: 'Tinker Bell', line: 'Quick, Peter! Bar it now, before they come!',
        prompt: 'Change your mind: say you will leave the window open for them.',
        promptKo: '마음을 바꾸세요. 아이들을 위해 창문을 열어 두겠다고 말하세요.',
        answers: [{ any: ['open', 'unbar', 'not bar', 'leave it', 'let them in'] }],
        model: 'Oh, all right. I shall leave the window open for them.',
        distractors: ['Come on, Tink, we don\'t want any silly mothers.', 'Lady, stop crying; Wendy is quite happy with us.', 'Tink, play the piano and cheer her up.'],
        hints: ['She is fond of Wendy, and so are you. You cannot both have her.', 'Key word: open'],
        hintsKo: ['부인도 웬디를 아끼고 당신도 그렇습니다. 둘 다 가질 수는 없습니다.', '핵심 단어: open'],
        reply: { speaker: 'Narrator', line: 'You flew off with Tink, and in came Wendy, John and Michael. They slipped into their beds as if they had never been away, and when Mrs. Darling turned she thought she was dreaming.' }
      },
      {
        role: 'michael',
        situation: 'You are back in your own bed, but you hardly remember this room. A lady has come in from the piano and is staring at the three beds. Wendy whispers that it is your mother.',
        situationKo: '자기 침대로 돌아왔지만 이 방이 거의 기억나지 않습니다. 피아노 쪽에서 한 부인이 들어와 침대 세 개를 바라봅니다. 웬디가 저분이 어머니라고 속삭입니다.',
        speaker: 'Wendy', line: 'Michael, it is mother. Say something to her!',
        prompt: 'Call out to your mother.',
        promptKo: '어머니를 부르세요.',
        answers: [{ any: ['mother', 'mummy', 'mama', 'mum'] }],
        model: 'Mother! Mother, it is me, Michael!',
        distractors: ['Who is that lady at the piano?', 'Wendy, whose bed is this?', 'John, is it true that we have been here before?'],
        hints: ['Use the word for the person who tucks you in.', 'Key word: mother'],
        hintsKo: ['이불을 덮어 주는 사람을 부르는 말을 쓰세요.', '핵심 단어: mother'],
        reply: { speaker: 'Narrator', line: '"Wendy, John, Michael!" she cried, and held out her arms. Mr. Darling woke in the kennel to share her joy, and Nana came rushing in. Outside, a little boy watched through the window the one joy from which he must be for ever barred.' }
      }
    ]
  },
  {
    num: 17, title: 'When Wendy Grew Up', ko: '웬디가 어른이 되었을 때',
    summary: 'The lost boys are adopted, but Peter will not be caught and made a man. He promises to come for Wendy every spring, and forgets. Years later Wendy is grown up, and Peter takes her daughter Jane to the Neverland — and so it goes on.',
    summaryKo: '잃어버린 아이들은 입양되지만 피터는 붙잡혀 어른이 되기를 거부합니다. 봄마다 웬디를 데리러 오겠다고 약속하고는 잊어버립니다. 여러 해 뒤 웬디는 어른이 되고, 피터는 웬디의 딸 제인을 네버랜드로 데려갑니다. 그리고 이야기는 계속됩니다.',
    scenes: [
      {
        role: 'peter',
        situation: 'Mrs. Darling has agreed to adopt all the lost boys. Now she turns to you at the window and asks whether you would like to stay too. She would send you to school, and then to an office.',
        situationKo: '달링 부인은 잃어버린 아이들을 모두 입양하기로 했습니다. 이제 창가의 당신에게도 함께 살지 않겠느냐고 묻습니다. 학교에 보내고, 그다음엔 사무실에 보내겠다고요.',
        speaker: 'Mrs. Darling', line: 'Would you like to stay and live with us, Peter? I would send you to school.',
        prompt: 'Refuse: no one is going to catch you and make you a man.',
        promptKo: '거절하세요. 아무도 당신을 붙잡아 어른으로 만들 수 없다고.',
        answers: [{ any: ['make me a man', 'grow up', 'be a man', 'never grow', 'a man'] }, { all: ['catch'], any: ['me', 'not'] }],
        model: 'Keep back, lady. No one is going to catch me and make me a man.',
        distractors: ['Yes, please, and may I have a bed by the window?', 'Only if Tink can come to school too.', 'I will think about it and come back tomorrow.'],
        hints: ['You want to stay a boy for ever.', 'Key words: make me a man'],
        hintsKo: ['영원히 소년으로 남고 싶습니다.', '핵심 단어: make me a man'],
        reply: { speaker: 'Mrs. Darling', line: 'Then Wendy may go to you for a week every year, to do your spring cleaning. Remember to come for her, Peter.' }
      },
      {
        role: 'wendy',
        situation: 'Years have passed. Peter forgot to come, and you grew up, and now you have a little girl of your own, Jane, asleep in this very nursery. Tonight the window blew open, and Peter dropped on the floor, exactly as he used to be.',
        situationKo: '여러 해가 흘렀습니다. 피터는 오는 것을 잊었고, 당신은 자라서 이제 딸 제인이 있습니다. 제인은 바로 이 방에서 잠들어 있습니다. 오늘 밤 창문이 열리더니 피터가 예전 모습 그대로 바닥에 내려앉았습니다.',
        speaker: 'Peter', line: 'Of course I am expecting you to fly away with me. That is why I have come.',
        prompt: 'Tell Peter you cannot come: you are grown up now.',
        promptKo: '피터에게 갈 수 없다고 말하세요. 이제 어른이 되었다고.',
        answers: [{ any: ['grown up', 'grown', 'grew up', 'old', 'a woman', 'married', 'not a girl'] }],
        model: 'I cannot come, Peter. I am grown up now. I am ever so much more than twenty.',
        distractors: ['Wait while I fetch my hat and coat, Peter.', 'Peter, you are early; spring cleaning is next week.', 'Hush, Peter, you will wake the baby.'],
        hints: ['What has happened to you that never happens to Peter?', 'Key words: grown up'],
        hintsKo: ['피터에게는 결코 일어나지 않는 일이 당신에게 일어났습니다.', '핵심 단어: grown up'],
        reply: { speaker: 'Narrator', line: 'You turned up the light, and Peter saw. He cried out, and you could not comfort him. Then, in the little bed, Jane woke and sat up. "Boy," she said, "why are you crying?"' }
      },
      {
        role: 'jane',
        situation: 'A boy is crying in the middle of your nursery, and your mother is standing by the fire, unable to speak. The boy says his name is Peter Pan, and that he came for his mother, to take her to the Neverland for spring cleaning.',
        situationKo: '한 소년이 방 한가운데서 울고 있고, 어머니는 난롯가에 서서 말을 잃었습니다. 소년은 자기 이름이 피터 팬이고, 어머니를 봄맞이 청소하러 네버랜드에 데려가려고 왔다고 합니다.',
        speaker: 'Peter', line: 'Hullo. I came back for my mother, to take her to the Neverland.',
        prompt: 'Say that he needs a mother, and you will go with him for the spring cleaning.',
        promptKo: '소년에게는 어머니가 필요하니, 당신이 봄맞이 청소를 하러 함께 가겠다고 말하세요.',
        answers: [{ any: ['spring', 'cleaning', 'go with him', 'go with you', 'fly with', 'i will go', 'needs a mother', 'need a mother'] }],
        model: 'He does so need a mother. I will go with him for the spring cleaning.',
        distractors: ['Go away, boy; you will make Mother cry again.', 'Mother, please shut the window; it is cold.', 'Boy, are you a real fairy?'],
        hints: ['Someone has to do the job your mother did.', 'Key words: spring cleaning'],
        hintsKo: ['어머니가 했던 일을 누군가는 해야 합니다.', '핵심 단어: spring cleaning'],
        reply: { speaker: 'Narrator', line: 'And so it goes on. When Jane grew up she had a daughter, Margaret, and every spring-cleaning time Peter comes for a new little mother — and it will go on, so long as children are gay and innocent and heartless.' }
      }
    ]
  }
];

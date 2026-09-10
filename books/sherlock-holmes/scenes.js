/* The Adventures of Sherlock Holmes (Arthur Conan Doyle, 1892 — Project Gutenberg #1661, public domain).
   Game data for the twelve stories, written for business-English conversation practice: each scene is a
   client meeting, a hiring interview, a negotiation, a report or a polite refusal taken from the plot.
   Field reference: books/README.md. Situations, prompts, hints, model answers and distractors are original;
   only a few words are quoted from the stories. */
window.LP_ROLES = {
  holmes: { en: 'You are Sherlock Holmes, a consulting detective. ', ko: '당신은 자문 탐정 셜록 홈즈입니다. ' },
  watson: { en: 'You are Dr. Watson. ', ko: '당신은 왓슨 박사입니다. ' },
  wilson: { en: 'You are Jabez Wilson, a pawnbroker. ', ko: '당신은 전당포 주인 제이베즈 윌슨입니다. ' },
  mary: { en: 'You are Mary Sutherland. ', ko: '당신은 메리 서덜랜드입니다. ' },
  windibank: { en: 'You are James Windibank, a wine salesman. ', ko: '당신은 와인 영업 사원 제임스 윈디뱅크입니다. ' },
  openshaw: { en: 'You are John Openshaw. ', ko: '당신은 존 오픈쇼입니다. ' },
  neville: { en: 'You are Neville St. Clair. ', ko: '당신은 네빌 세인트클레어입니다. ' },
  baker: { en: 'You are Henry Baker. ', ko: '당신은 헨리 베이커입니다. ' },
  helen: { en: 'You are Helen Stoner. ', ko: '당신은 헬렌 스토너입니다. ' },
  hatherley: { en: 'You are Victor Hatherley, a hydraulic engineer. ', ko: '당신은 수압 기술자 빅터 해덜리입니다. ' },
  hatty: { en: 'You are Hatty Doran. ', ko: '당신은 해티 도런입니다. ' },
  holder: { en: 'You are Alexander Holder, a banker. ', ko: '당신은 은행가 알렉산더 홀더입니다. ' },
  violet: { en: 'You are Violet Hunter, a governess. ', ko: '당신은 가정교사 바이올렛 헌터입니다. ' }
};
window.LP_SCENES = [
  {
    num: 1, title: 'A Scandal in Bohemia', ko: '보헤미아 왕국의 스캔들',
    summary: 'A masked client asks Holmes to recover a compromising photograph from Irene Adler, who outwits him and keeps it — on her own terms.',
    summaryKo: '가면을 쓴 의뢰인이 아이린 애들러에게서 곤란한 사진을 되찾아 달라고 홈즈에게 부탁하지만, 애들러는 홈즈를 앞질러 사진을 자기 조건대로 간직합니다.',
    scenes: [
      {
        role: 'holmes',
        situation: 'A tall visitor in a black mask has arrived at Baker Street at a quarter to eight in the evening, exactly as his unsigned letter promised. He introduces himself as a Count von Kramm, which you do not believe for a moment, and looks pointedly at Dr. Watson.',
        situationKo: '저녁 7시 45분, 서명 없는 편지에서 예고한 대로 검은 가면을 쓴 키 큰 손님이 베이커 가에 도착했습니다. 자신을 폰 크람 백작이라고 소개하지만 믿기 어렵고, 손님은 왓슨 박사를 의미심장하게 쳐다봅니다.',
        speaker: 'The visitor', line: 'The matter is extremely delicate. Before I say a word, I must know that whatever I tell you stays inside this room. May I count on that?',
        prompt: 'Reassure the client that everything he says will be treated in strict confidence, and that your colleague is bound by the same rule.',
        promptKo: '의뢰인이 하는 말은 모두 철저히 비밀로 다루어지며, 동료도 같은 원칙을 지킨다고 안심시키세요.',
        answers: [{ any: ['confidence', 'confidential', 'confidentiality', 'confidentially', 'discretion', 'discreet'] }, { all: ['between'], any: ['us', 'these walls', 'this room'] }, { all: ['not'], any: ['leave this room', 'go further', 'tell anyone', 'repeat'] }],
        model: 'You may speak freely. Everything you tell us will be treated in strict confidence, and Dr. Watson is bound by the same rule.',
        distractors: ['I am afraid I will need your real name and address before we go any further.', 'Dr. Watson will take notes and publish them in his memoirs later.', 'We only accept cases that come to us through the official police.'],
        hints: ['Use the word professionals use for keeping secrets.', 'Key words: strict confidence / bound by the same rule'],
        hintsKo: ['비밀 유지를 뜻하는 업무용 표현을 쓰세요.', '핵심 표현: strict confidence / bound by the same rule'],
        reply: { speaker: 'Narrator', line: 'The visitor hesitated, then tore off the mask. He was the King of Bohemia, and the trouble was a photograph of himself with the singer Irene Adler.' }
      },
      {
        role: 'holmes',
        situation: 'The King explains that Irene Adler will send the photograph to the family of his future bride within days. He has already tried burglary, luggage searches and a highway robbery, all without result. Now he opens a heavy chamois bag on the table and says that money is no object.',
        situationKo: '왕은 아이린 애들러가 며칠 안에 사진을 약혼녀 가문에 보낼 거라고 설명합니다. 이미 도둑질, 짐 수색, 노상강도까지 시도했지만 소득이 없었습니다. 이제 묵직한 가죽 주머니를 탁자에 올려놓으며 돈은 문제가 아니라고 말합니다.',
        speaker: 'The King', line: 'There is a thousand pounds here for expenses. You have carte blanche. I would give a province to have that photograph back.',
        prompt: 'Confirm the arrangement in business terms: the expenses are noted, and you will need the lady’s current address to begin.',
        promptKo: '업무적으로 정리하세요. 비용은 확인했고, 착수하려면 그 여성의 현재 주소가 필요하다고 말하세요.',
        answers: [{ all: ['address'] }, { all: ['expenses'], any: ['begin', 'start', 'agreed', 'noted', 'sufficient'] }, { any: ['where does she live', 'where she lives'] }],
        model: 'Then we are agreed. That will cover expenses. To begin, I will need the lady’s current address.',
        distractors: ['Then I will need the photograph itself before I can begin.', 'We are agreed, Your Majesty, but I never work on a Friday.', 'A province would suit me better than a thousand pounds, thank you.'],
        hints: ['Accept the budget briefly and ask for the one piece of information you cannot work without.', 'Key words: agreed / expenses / address'],
        hintsKo: ['예산을 간단히 확인하고, 없으면 일을 시작할 수 없는 정보 하나를 요청하세요.', '핵심 단어: agreed / expenses / address'],
        reply: { speaker: 'The King', line: 'Briony Lodge, Serpentine Avenue, St. John’s Wood. I will wait for your report with the greatest anxiety.' }
      },
      {
        role: 'holmes',
        situation: 'The next morning you take the King to Briony Lodge, but the house is empty. Irene Adler has married Godfrey Norton and left England, leaving only a letter for you and a photograph of herself alone. She writes that she will keep the compromising picture purely as protection and will never use it against the King.',
        situationKo: '다음 날 아침 왕과 함께 브라이어니 로지에 갔지만 집은 비어 있습니다. 아이린 애들러는 고드프리 노턴과 결혼해 영국을 떠났고, 당신에게 보내는 편지와 혼자 찍은 사진만 남겼습니다. 문제의 사진은 오직 자기 보호용으로 간직할 뿐 왕에게 절대 쓰지 않겠다고 적혀 있습니다.',
        speaker: 'The King', line: 'What does this mean, Mr. Holmes? Has she taken the photograph with her?',
        prompt: 'Report the outcome honestly: the photograph cannot be recovered, but the lady has given her word never to use it, so the client’s position is safe.',
        promptKo: '결과를 솔직하게 보고하세요. 사진은 되찾을 수 없지만, 그 여성이 절대 쓰지 않겠다고 약속했으므로 의뢰인은 안전합니다.',
        answers: [{ any: ['safe', 'secure', 'no danger', 'no risk', 'no longer a threat', 'nothing to fear'] }, { all: ['never'], any: ['use', 'used', 'published'] }],
        model: 'The photograph itself is not recoverable, but she gives her word that it will never be used. Your position is safe.',
        distractors: ['I have the photograph here in my pocket; that will be five hundred pounds.', 'She has agreed to sell it back to you at a fair market price.', 'I am afraid the matter is quite hopeless, Your Majesty.'],
        hints: ['Give the bad news and the good news in one calm sentence each.', 'Key words: not recoverable / never be used / safe'],
        hintsKo: ['나쁜 소식과 좋은 소식을 각각 차분한 한 문장으로 전하세요.', '핵심 표현: not recoverable / never be used / safe'],
        reply: { speaker: 'The King', line: 'Her word is inviolate. Then I am indebted to you. When he offered his emerald ring, Holmes asked instead for the photograph of Irene Adler — and kept it.' }
      }
    ]
  },
  {
    num: 2, title: 'The Red-Headed League', ko: '빨간 머리 연맹',
    summary: 'A pawnbroker is hired at four pounds a week to copy the encyclopaedia, until the League that employs him vanishes overnight — a cover for a tunnel into a bank.',
    summaryKo: '전당포 주인이 주급 4파운드에 백과사전을 베끼는 일에 고용되지만, 그를 고용한 연맹이 하룻밤 사이에 사라집니다. 은행으로 땅굴을 파기 위한 위장이었습니다.',
    scenes: [
      {
        role: 'wilson',
        situation: 'Your assistant showed you an advertisement: a vacancy in the Red-Headed League, four pounds a week for purely nominal services. At 7 Pope’s Court you have pushed through a crowd of red-headed men, and Mr. Duncan Ross has just tugged your hair to check that it is genuine.',
        situationKo: '조수가 신문 광고를 보여 주었습니다. 빨간 머리 연맹의 빈자리, 형식적인 일에 주급 4파운드. 포프스 코트 7번지에서 빨간 머리 남자들의 인파를 헤치고 들어갔고, 던컨 로스 씨가 방금 당신의 머리카락이 진짜인지 잡아당겨 확인했습니다.',
        speaker: 'Duncan Ross', line: 'Congratulations, the position is yours. The salary is four pounds a week. When could you start?',
        prompt: 'Thank him, but before accepting ask exactly what the work involves and what the hours are.',
        promptKo: '고맙다고 말하되, 수락하기 전에 업무 내용과 근무 시간을 정확히 물어보세요.',
        answers: [{ all: ['hours'] }, { any: ['duties', 'responsibilities', 'involve', 'involves', 'involved', 'what would i be', 'what the work is', 'what the job is'] }],
        model: 'Thank you. Before I accept, could you tell me exactly what the work involves and what the hours would be?',
        distractors: ['Thank you. I accept, whatever the job may turn out to be.', 'Four pounds is far too little; I will not consider less than eight.', 'May I send my assistant to do the copying in my place?'],
        hints: ['Two questions every candidate should ask before saying yes.', 'Key words: what the work involves / hours'],
        hintsKo: ['수락하기 전에 지원자가 반드시 물어야 할 두 가지입니다.', '핵심 표현: what the work involves / hours'],
        reply: { speaker: 'Duncan Ross', line: 'Ten to two every day, here in this office, and you must not leave the building during those hours. The work is to copy out the Encyclopaedia Britannica. We provide the table and chair.' }
      },
      {
        role: 'wilson',
        situation: 'For eight weeks you have copied the encyclopaedia every morning and been paid every Saturday. This morning the office door was locked, with a card nailed to it saying the League was dissolved. The landlord downstairs had never heard of Duncan Ross. Now you are sitting in Sherlock Holmes’s consulting room.',
        situationKo: '8주 동안 매일 아침 백과사전을 베끼고 토요일마다 급료를 받았습니다. 오늘 아침 사무실 문은 잠겨 있었고, 연맹이 해산되었다는 쪽지가 못으로 박혀 있었습니다. 아래층 집주인은 던컨 로스라는 사람을 들어 본 적도 없다고 합니다. 지금 당신은 셜록 홈즈의 상담실에 앉아 있습니다.',
        speaker: 'Sherlock Holmes', line: 'Please take a seat, Mr. Wilson. Tell me, in a few words, what brings you here today.',
        prompt: 'State the problem concisely: you were employed by the League, and this morning you found the office closed and the League dissolved without notice.',
        promptKo: '문제를 간결하게 말하세요. 연맹에 고용되어 일했는데, 오늘 아침 사무실이 닫혀 있었고 아무 통보 없이 연맹이 해산되었습니다.',
        answers: [{ any: ['dissolved', 'closed', 'shut', 'locked', 'vanished', 'disappeared', 'gone'] }],
        model: 'I was employed by the Red-Headed League, but this morning I found the office locked and a notice saying the League has been dissolved, without any warning.',
        distractors: ['I would like you to find me a new assistant who will work for half wages.', 'My hair has begun to turn grey, and I want to know the cause.', 'I want your permission to copy the encyclopaedia here in your rooms instead.'],
        hints: ['Say who employed you and what you found this morning.', 'Key words: employed / office locked / dissolved'],
        hintsKo: ['누구에게 고용되었는지, 오늘 아침 무엇을 발견했는지 말하세요.', '핵심 단어: employed / office locked / dissolved'],
        reply: { speaker: 'Sherlock Holmes', line: 'You have been treated rather shabbily, though you are thirty pounds richer. Now tell me about this assistant who found the advertisement for you.' }
      },
      {
        role: 'wilson',
        situation: 'Holmes wants to know about Vincent Spaulding, the assistant who answered the advertisement for you. He is quick and clever, agreed to come for half wages to learn the trade, and spends a great deal of time in the cellar with his photographs.',
        situationKo: '홈즈는 광고를 찾아 준 조수 빈센트 스폴딩에 대해 알고 싶어 합니다. 그는 재빠르고 영리하며, 일을 배우겠다며 절반의 급료만 받고 왔고, 사진을 현상한다며 지하실에서 많은 시간을 보냅니다.',
        speaker: 'Sherlock Holmes', line: 'Your assistant — what sort of employee is he, and on what terms did you take him on?',
        prompt: 'Describe him as an employer would: he is capable, he works for half wages to learn the business, and he spends a lot of time in the cellar with his photography.',
        promptKo: '고용주 입장에서 설명하세요. 유능하고, 일을 배우려고 절반 급료로 일하며, 사진 취미로 지하실에서 오랜 시간을 보냅니다.',
        answers: [{ all: ['half'], any: ['wages', 'wage', 'pay', 'salary', 'money'] }, { all: ['cellar'] }],
        model: 'He is a very capable assistant. He works for half wages so that he can learn the business, though he spends a lot of time in the cellar with his photography.',
        distractors: ['He is my nephew, and he pays me a small sum for the privilege of working there.', 'I dismissed him last week for arriving late three days running.', 'He has red hair like mine, and he applied to the League himself.'],
        hints: ['Mention his pay and his hobby; both matter more than you think.', 'Key words: half wages / cellar'],
        hintsKo: ['그의 급료와 취미를 언급하세요. 둘 다 생각보다 중요합니다.', '핵심 단어: half wages / cellar'],
        reply: { speaker: 'Narrator', line: 'Holmes visited the shop, tapped the pavement with his stick, and looked hard at the assistant’s trouser knees. That night, in the bank vault behind the shop, the police caught John Clay crawling out of his tunnel.' }
      }
    ]
  },
  {
    num: 3, title: 'A Case of Identity', ko: '신랑의 정체',
    summary: 'A short-sighted typist asks Holmes to find the fiancé who vanished on their wedding morning; the missing man was her stepfather in disguise, keeping her income in the family.',
    summaryKo: '근시인 타이피스트가 결혼식 아침에 사라진 약혼자를 찾아 달라고 홈즈에게 의뢰합니다. 사라진 남자는 그녀의 수입을 집안에 붙들어 두려고 변장한 의붓아버지였습니다.',
    scenes: [
      {
        role: 'mary',
        situation: 'You have come to Baker Street in your best boa and hat. You live with your mother and stepfather, a travelling salesman for a firm of claret importers, and you earn your own money by typewriting, besides a small income left to you by an uncle in New Zealand.',
        situationKo: '가장 좋은 목도리와 모자를 하고 베이커 가에 왔습니다. 당신은 어머니, 그리고 클라레 수입 회사의 영업 사원인 의붓아버지와 함께 살고, 타자 일로 돈을 벌며 뉴질랜드의 삼촌이 남긴 약간의 수입도 있습니다.',
        speaker: 'Sherlock Holmes', line: 'Please sit down. Before we come to your problem, tell me a little about yourself — who you are and how you make your living.',
        prompt: 'Introduce yourself professionally: your name, your typewriting work, and that you have a small independent income.',
        promptKo: '업무적으로 자기소개를 하세요. 이름, 타자 일, 그리고 약간의 독립적인 수입이 있다는 것.',
        answers: [{ any: ['typewriting', 'typewriter', 'typing', 'typist', 'type'] }, { all: ['income'] }],
        model: 'My name is Mary Sutherland. I do typewriting work from home, and I also have a small income of my own from an inheritance.',
        distractors: ['I am a traveller in wines for a firm in Fenchurch Street.', 'I keep a pawnbroker’s shop in the City with one assistant.', 'I have no work of any kind and depend entirely on my stepfather.'],
        hints: ['Name, occupation, then finances — in that order.', 'Key words: typewriting / income'],
        hintsKo: ['이름, 직업, 그다음 재정 상태 순서로 말하세요.', '핵심 단어: typewriting / income'],
        reply: { speaker: 'Sherlock Holmes', line: 'A single lady can get on very nicely on such an income. Now, what has happened?' }
      },
      {
        role: 'mary',
        situation: 'At a ball you met Mr. Hosmer Angel, a cashier in an office in Leadenhall Street. He wrote to you in typescript, asked you to swear to be faithful whatever happened, and then, on the morning of your wedding, stepped into a cab and was never seen again.',
        situationKo: '무도회에서 리든홀 가의 사무실 출납원 호스머 에인절 씨를 만났습니다. 그는 타자로 편지를 보냈고, 무슨 일이 있어도 변치 않겠다고 맹세하게 하더니, 결혼식 아침에 마차에 올라탄 뒤 다시는 나타나지 않았습니다.',
        speaker: 'Sherlock Holmes', line: 'I see. And what exactly would you like me to do for you?',
        prompt: 'State what you want clearly: you would like him to find Mr. Hosmer Angel, who disappeared on the morning of your wedding.',
        promptKo: '원하는 바를 분명히 말하세요. 결혼식 아침에 사라진 호스머 에인절 씨를 찾아 주었으면 합니다.',
        answers: [{ all: ['find'], any: ['hosmer', 'angel', 'him', 'fiance', 'fiancé'] }, { any: ['disappeared', 'vanished', 'missing'] }],
        model: 'I would like you to find Mr. Hosmer Angel. He disappeared on the morning of our wedding, and I have heard nothing since.',
        distractors: ['I would like you to write to my stepfather about the wine trade.', 'I would like a second opinion on the quality of my typewriter.', 'I want you to arrange another wedding as quickly as possible.'],
        hints: ['One clear request, then the key fact.', 'Key words: find / disappeared'],
        hintsKo: ['분명한 요청 하나, 그다음 핵심 사실.', '핵심 단어: find / disappeared'],
        reply: { speaker: 'Sherlock Holmes', line: 'Leave the matter in my hands. Meanwhile, do not let it weigh on you — let Mr. Hosmer Angel vanish from your memory as he has vanished from your life.' }
      },
      {
        role: 'windibank',
        situation: 'You are Mary’s stepfather. A letter from Sherlock Holmes has arrived at your office asking you to call at Baker Street to discuss Mr. Hosmer Angel. You cannot refuse without looking suspicious, so you must reply like a busy man of business.',
        situationKo: '당신은 메리의 의붓아버지입니다. 셜록 홈즈가 호스머 에인절 씨 문제로 베이커 가에 들러 달라는 편지를 사무실로 보냈습니다. 거절하면 의심을 살 테니, 바쁜 사업가답게 답장해야 합니다.',
        speaker: 'Holmes’s letter', line: 'I should be glad if you could call on me at six o’clock tomorrow evening on a matter concerning Mr. Hosmer Angel.',
        prompt: 'Write a short, formal reply confirming that you will call at six tomorrow, as requested.',
        promptKo: '요청대로 내일 6시에 방문하겠다고 확인하는 짧고 격식 있는 답장을 쓰세요.',
        answers: [{ all: ['six'] }, { all: ['tomorrow'], any: ['call', 'come', 'meet', 'appointment', 'visit', 'attend'] }],
        model: 'Thank you for your letter. I will call on you at six o’clock tomorrow evening, as you suggest.',
        distractors: ['I regret that the wine trade keeps me far too busy to see anyone this month.', 'Please send any questions in writing to my solicitor.', 'I do not see what business this is of yours, sir.'],
        hints: ['Acknowledge the letter, confirm the time, keep it short.', 'Key words: call on you / six o’clock tomorrow'],
        hintsKo: ['편지를 받았음을 알리고, 시간을 확인하고, 짧게 쓰세요.', '핵심 표현: call on you / six o’clock tomorrow'],
        reply: { speaker: 'Narrator', line: 'He came, and Holmes showed him how every letter of Hosmer Angel’s had the same worn typewriter faults as his own. Windibank fled; Holmes decided the truth was too cruel to tell his stepdaughter.' }
      }
    ]
  },
  {
    num: 4, title: 'The Boscombe Valley Mystery', ko: '보스컴 계곡의 수수께끼',
    summary: 'Holmes and Watson travel to Herefordshire to clear a young man accused of killing his father, and find the real culprit is a dying neighbour with an Australian past.',
    summaryKo: '홈즈와 왓슨은 아버지를 죽였다는 혐의를 받는 청년의 누명을 벗기러 헤리퍼드셔로 가고, 진범이 호주 시절의 비밀을 가진 죽어 가는 이웃임을 밝혀냅니다.',
    scenes: [
      {
        role: 'watson',
        situation: 'You are at breakfast with your wife when a telegram arrives from Holmes: have you a couple of days to spare? He is off to the west of England on the Boscombe Valley case and would be glad of your company — wire your answer. Your wife says the change would do you good, and your neighbour can take your patients.',
        situationKo: '아내와 아침을 먹는데 홈즈에게서 전보가 옵니다. 이틀 정도 시간을 낼 수 있는가? 보스컴 계곡 사건으로 잉글랜드 서부에 가는데 동행해 주면 좋겠다, 답을 전보로 달라. 아내는 기분 전환이 될 거라고 하고, 이웃 의사가 환자를 맡아 줄 수 있습니다.',
        speaker: 'Your wife', line: 'You have been looking pale. Anstruther can take your patients. Go — but answer him quickly.',
        prompt: 'Send a short telegram accepting: you can spare two days and will meet him at Paddington for the 11.15 train.',
        promptKo: '수락하는 짧은 전보를 보내세요. 이틀 시간을 낼 수 있고, 11시 15분 기차를 위해 패딩턴 역에서 만나겠다고.',
        answers: [{ any: ['paddington', '11 15', '1115', 'eleven fifteen', 'quarter past eleven'] }, { all: ['spare'] }, { all: ['will'], any: ['come', 'join', 'meet'] }],
        model: 'Delighted to come. I can spare two days. Will meet you at Paddington for the 11.15.',
        distractors: ['Regret that my practice does not allow me to leave London.', 'Please post the case papers to me and I shall read them here.', 'Ask Lestrade to accompany you instead; he knows the country.'],
        hints: ['Telegrams are short: yes, how long, where and when.', 'Key words: spare / Paddington / 11.15'],
        hintsKo: ['전보는 짧게: 수락, 기간, 장소와 시간.', '핵심 단어: spare / Paddington / 11.15'],
        reply: { speaker: 'Narrator', line: 'On the train Holmes laid out the case: old Charles McCarthy found dying by Boscombe Pool, his son James arrested, and the evidence against the young man very strong indeed.' }
      },
      {
        role: 'holmes',
        situation: 'Inspector Lestrade meets you at Ross. He has been retained on behalf of Miss Alice Turner, but he thinks the case is perfectly clear and the son is guilty. He would like you to agree so that everyone can go home.',
        situationKo: '레스트레이드 경감이 로스에서 당신을 맞이합니다. 앨리스 터너 양 측에서 그를 고용했지만, 그는 사건이 너무나 명백하고 아들이 범인이라고 생각합니다. 모두 집에 갈 수 있게 당신도 동의해 주기를 바랍니다.',
        speaker: 'Lestrade', line: 'Frankly, Mr. Holmes, the thing is as plain as daylight. The son did it. I hope you will not waste the young lady’s money looking for anything else.',
        prompt: 'Disagree politely and professionally: you are not yet convinced, and you would prefer to examine the ground yourself before reaching a conclusion.',
        promptKo: '정중하고 전문가답게 반대하세요. 아직 확신이 서지 않으며, 결론을 내리기 전에 현장을 직접 살펴보고 싶다고 말하세요.',
        answers: [{ any: ['not convinced', 'not yet convinced', 'not persuaded', 'disagree', 'different view', 'with respect', 'respectfully', 'not so sure', 'not sure'] }, { all: ['before'], any: ['examine', 'look', 'see', 'inspect', 'visit'] }],
        model: 'With respect, I am not yet convinced. I would prefer to examine the ground myself before I draw any conclusion.',
        distractors: ['You are quite right, Lestrade; there is nothing more for us to do.', 'I never argue with the official police, whatever they say.', 'Let us toss a coin and settle who is guilty that way.'],
        hints: ['Soften the disagreement first, then say what you will do instead.', 'Key words: with respect / not yet convinced / examine'],
        hintsKo: ['먼저 반대 의견을 부드럽게 꺼내고, 대신 무엇을 할지 말하세요.', '핵심 표현: with respect / not yet convinced / examine'],
        reply: { speaker: 'Narrator', line: 'By the pool Holmes found the tracks of a third man — tall, left-handed, limping, smoking Indian cigars — and a grey cloak that did not belong to either McCarthy.' }
      },
      {
        role: 'holmes',
        situation: 'John Turner, the old landowner, has come to your hotel room. He is dying, and he has just confessed that he killed Charles McCarthy, who had blackmailed him for twenty years over a robbery in Australia. He asks what you mean to do with what he has told you.',
        situationKo: '늙은 지주 존 터너가 호텔 방으로 찾아왔습니다. 그는 죽어 가고 있으며, 호주에서의 강도 사건을 빌미로 20년 동안 자신을 협박해 온 찰스 매카시를 죽였다고 방금 고백했습니다. 그는 이 이야기를 어떻게 할 생각이냐고 묻습니다.',
        speaker: 'John Turner', line: 'You have my statement, signed. What do you intend to do with it?',
        prompt: 'Explain your terms: you will keep the statement confidential and use it only if it is needed to clear young McCarthy.',
        promptKo: '조건을 설명하세요. 진술서는 비밀로 보관하고, 매카시 청년의 무죄를 밝히는 데 꼭 필요할 때만 쓰겠다고 말하세요.',
        answers: [{ any: ['confidential', 'confidence', 'private', 'secret', 'safe', 'locked'] }, { all: ['only'], any: ['need', 'needed', 'necessary', 'required', 'unless'] }],
        model: 'I will keep your statement confidential. I will use it only if it is needed to clear the young man; otherwise no one will ever see it.',
        distractors: ['I will hand it to Lestrade this evening, as I am bound to do.', 'I will publish it in the Times so that everybody knows the truth.', 'I will use it to ask you for a fee of a thousand pounds.'],
        hints: ['Promise discretion, then state the single condition.', 'Key words: confidential / only if'],
        hintsKo: ['비밀 유지를 약속한 뒤, 단 하나의 조건을 말하세요.', '핵심 표현: confidential / only if'],
        reply: { speaker: 'Narrator', line: 'James McCarthy was acquitted on the objections Holmes drew up for the defence. Old Turner lived seven months more, and the paper was never needed.' }
      }
    ]
  },
  {
    num: 5, title: 'The Five Orange Pips', ko: '다섯 개의 오렌지 씨앗',
    summary: 'A young man whose uncle and father both died after receiving five orange pips asks Holmes for help; the sender is a secret society, and the warning comes too late.',
    summaryKo: '삼촌과 아버지가 잇달아 오렌지 씨앗 다섯 개를 받고 죽은 청년이 홈즈에게 도움을 청합니다. 보낸 이는 비밀 결사이고, 경고는 너무 늦게 도착합니다.',
    scenes: [
      {
        role: 'openshaw',
        situation: 'It is a wild September night and the rain is beating on the windows. You have come up from Horsham without writing first, because the same letter that killed your uncle and your father has now come to you. A friend, Major Prendergast, told you Sherlock Holmes had never yet been beaten.',
        situationKo: '거센 9월 밤, 비가 창을 두드립니다. 삼촌과 아버지를 죽인 것과 똑같은 편지가 이번엔 당신에게 왔기에, 미리 편지도 없이 호셤에서 올라왔습니다. 친구 프렌더개스트 소령이 셜록 홈즈는 아직 진 적이 없다고 말해 주었습니다.',
        speaker: 'Sherlock Holmes', line: 'Come in and sit by the fire. You have travelled some distance in this weather, I think.',
        prompt: 'Apologise for calling so late without an appointment, and explain that the matter is urgent.',
        promptKo: '약속 없이 이렇게 늦게 찾아온 것을 사과하고, 급한 일이라고 설명하세요.',
        answers: [{ any: ['apologise', 'apologize', 'apology', 'sorry', 'forgive', 'excuse'], all: ['urgent'] }, { all: ['appointment'] }, { any: ['without notice', 'without warning', 'so late'], all: ['urgent'] }],
        model: 'I must apologise for calling so late without an appointment, but the matter is urgent and I did not know where else to turn.',
        distractors: ['I was passing by and thought I would like to see the famous rooms.', 'Major Prendergast sends his regards, and that is all I came to say.', 'The weather is dreadful; may I dry my coat by your fire for a while?'],
        hints: ['Apology first, reason second.', 'Key words: apologise / appointment / urgent'],
        hintsKo: ['먼저 사과, 그다음 이유.', '핵심 단어: apologise / appointment / urgent'],
        reply: { speaker: 'Sherlock Holmes', line: 'Then tell me everything, from the beginning, and leave nothing out.' }
      },
      {
        role: 'holmes',
        situation: 'Openshaw has told you the whole history: his uncle’s papers burned, the letters marked K.K.K., the deaths ruled accidents by the police. All that is left is one page from the uncle’s diary. The client is frightened and does not know what to do.',
        situationKo: '오픈쇼가 모든 경위를 이야기했습니다. 삼촌이 서류를 태운 일, K.K.K.라 적힌 편지들, 경찰이 사고로 결론 내린 죽음들. 남은 것은 삼촌의 일기 한 장뿐입니다. 의뢰인은 겁에 질려 어찌할 바를 모릅니다.',
        speaker: 'John Openshaw', line: 'What should I do, Mr. Holmes? Tell me and I will do it.',
        prompt: 'Give clear instructions: he must act at once — put the diary page in the brass box with a note saying the other papers were burned, and place it on the sundial as the letter demands.',
        promptKo: '명확한 지시를 내리세요. 당장 실행해야 합니다. 일기 한 장을 놋쇠 상자에 넣고, 다른 서류는 불탔다는 쪽지를 함께 넣어, 편지가 요구한 대로 해시계 위에 두라고 하세요.',
        answers: [{ all: ['sundial'] }, { all: ['box'], any: ['note', 'paper', 'page', 'diary'] }],
        model: 'There is only one thing to do, and you must do it at once. Put the diary page in the brass box with a note saying the rest was burned, and leave it on the sundial as they ask.',
        distractors: ['Go home, sleep well, and we will discuss it again next week.', 'Burn every paper in the house before dawn and tell no one.', 'Go straight to the police station and demand a guard on the house.'],
        hints: ['Give the action, the object and the place — and the timing.', 'Key words: at once / box / sundial'],
        hintsKo: ['행동, 대상, 장소, 그리고 시점을 말하세요.', '핵심 단어: at once / box / sundial'],
        reply: { speaker: 'Narrator', line: 'Openshaw left into the storm. The next morning the paper reported a young man drowned near Waterloo Bridge. Holmes said quietly that it hurt his pride, and that the matter had become personal.' }
      },
      {
        role: 'holmes',
        situation: 'From Lloyd’s registers you have identified the ship: the barque Lone Star of Savannah, whose captain James Calhoun and two mates were in London when each of the deaths occurred. She has already sailed. Watson asks what you will do now.',
        situationKo: '로이드 선박 명부에서 배를 찾아냈습니다. 서배너 항의 범선 론 스타. 선장 제임스 캘훈과 항해사 두 명이 매번 사망 사건 때 런던에 있었습니다. 배는 이미 출항했습니다. 왓슨이 이제 어떻게 할 거냐고 묻습니다.',
        speaker: 'Dr. Watson', line: 'She is at sea. What can you possibly do about her now?',
        prompt: 'Draft a concise message to the police at Savannah: Captain Calhoun and two mates of the Lone Star are wanted for murder in London; please detain them on arrival.',
        promptKo: '서배너 경찰에 보낼 간결한 메시지를 작성하세요. 론 스타의 캘훈 선장과 항해사 둘이 런던에서 살인 혐의로 수배 중이니 도착 즉시 구금해 달라고.',
        answers: [{ all: ['lone star'] }, { all: ['calhoun'] }, { any: ['detain', 'arrest', 'hold', 'apprehend'] }],
        model: 'Cable the Savannah police: Captain James Calhoun and two mates of the barque Lone Star are wanted in London for murder. Please detain them on arrival.',
        distractors: ['Send five orange pips to the captain, with my compliments.', 'Tell the harbour master that a friend from Baker Street sends his greetings.', 'Ask the Savannah police to seize every American ship in the port.'],
        hints: ['Who, what they are wanted for, and what you want done.', 'Key words: Calhoun / Lone Star / detain'],
        hintsKo: ['누구를, 무슨 혐의로, 어떻게 해 달라는지.', '핵심 단어: Calhoun / Lone Star / detain'],
        reply: { speaker: 'Narrator', line: 'The message went, but the Lone Star never reached Savannah. Far out in the Atlantic, a shattered sternpost marked L.S. was all that was ever found of her.' }
      }
    ]
  },
  {
    num: 6, title: 'The Man with the Twisted Lip', ko: '입술이 비뚤어진 남자',
    summary: 'A respectable businessman disappears in an opium den, and the beggar arrested in his place turns out to be the man himself — begging paid far better than his old job.',
    summaryKo: '점잖은 사업가가 아편굴에서 사라지고, 대신 체포된 거지가 바로 그 사람으로 밝혀집니다. 구걸이 예전 직업보다 훨씬 돈이 되었기 때문입니다.',
    scenes: [
      {
        role: 'holmes',
        situation: 'Mrs. St. Clair has taken you into her house near Lee. Her husband Neville vanished from an upstairs window of a Thames-side opium den, his clothes were found in the room, and the police have arrested a beggar called Hugh Boone. She wants no comfort — only your honest professional opinion.',
        situationKo: '세인트클레어 부인이 리 근처의 자기 집으로 당신을 맞아들였습니다. 남편 네빌은 템스 강가 아편굴 2층 창문에서 사라졌고, 그의 옷은 그 방에서 발견되었으며, 경찰은 휴 분이라는 거지를 체포했습니다. 부인은 위로가 아니라 당신의 솔직한 전문가 의견을 원합니다.',
        speaker: 'Mrs. St. Clair', line: 'I am not hysterical, Mr. Holmes, and I do not faint. I want your real opinion. Is my husband alive?',
        prompt: 'Give a candid but tactful professional opinion: you will be frank — on the evidence so far, you do not think that he is.',
        promptKo: '솔직하되 조심스러운 전문가 의견을 말하세요. 솔직히 말해, 지금까지의 증거로는 살아 있다고 생각하지 않는다고.',
        answers: [{ any: ['frank', 'frankly', 'honest', 'honestly', 'candid', 'candidly'] }, { all: ['not think'] }, { all: ['afraid'] }],
        model: 'I will be frank with you, madam. On the evidence I have seen so far, I do not think that he is.',
        distractors: ['I never give an opinion until a case is completely closed.', 'He is certainly alive and well; you need not worry at all.', 'That is a question for the police to answer, not for me.'],
        hints: ['Signal that you are about to be direct, then be direct.', 'Key words: frank / on the evidence / do not think'],
        hintsKo: ['직설적으로 말하겠다는 신호를 먼저 주고, 그다음 직설적으로 말하세요.', '핵심 표현: frank / on the evidence / do not think'],
        reply: { speaker: 'Mrs. St. Clair', line: 'Then how do you explain this? She handed you a letter that had arrived that morning — in her husband’s hand, with his signet ring inside.' }
      },
      {
        role: 'neville',
        situation: 'At Bow Street, Holmes has washed the beggar’s face with a wet sponge and revealed you — Neville St. Clair — beneath Hugh Boone’s scars and paint. Years ago, as a journalist, you begged for a day to write an article and found it paid twenty-six shillings; your paper paid two pounds a week.',
        situationKo: '보 가 경찰서에서 홈즈가 젖은 스펀지로 거지의 얼굴을 닦아 내자, 휴 분의 흉터와 분장 아래 당신, 네빌 세인트클레어가 드러났습니다. 예전에 기자였던 당신은 기사를 쓰려고 하루 구걸을 해 보았고, 26실링을 벌었습니다. 신문사는 주급 2파운드였습니다.',
        speaker: 'Sherlock Holmes', line: 'Your article was written years ago. Why did you keep it up?',
        prompt: 'Explain your decision as a matter of money: frankly, begging paid far better than journalism — a day in the street earned what a week of writing did.',
        promptKo: '돈 문제로서 결정을 설명하세요. 솔직히 구걸이 기자보다 훨씬 수입이 좋았고, 거리에서 하루 번 돈이 글로 일주일 번 돈과 같았다고.',
        answers: [{ any: ['paid', 'pay', 'pays', 'earn', 'earned', 'earning', 'money', 'income', 'profitable', 'lucrative'] }],
        model: 'Frankly, it paid far better than journalism. I could earn in one day on the street what my writing earned in a week.',
        distractors: ['Because the police asked me to continue as an informer.', 'Because my wife preferred to have me out of the house.', 'Because I enjoyed the fresh air of Threadneedle Street.'],
        hints: ['It was a business decision; talk about earnings.', 'Key words: paid / earn'],
        hintsKo: ['사업적 결정이었습니다. 수입에 대해 말하세요.', '핵심 단어: paid / earn'],
        reply: { speaker: 'Inspector Bradstreet', line: 'Seven hundred pounds a year, from a street corner. No wonder you kept the secret even from your wife.' }
      },
      {
        role: 'neville',
        situation: 'No crime has been committed, but the inspector is not obliged to keep quiet. Holmes has suggested a deal: if the police hush the matter up and drop the case, there must be no more Hugh Boone. The inspector wants your undertaking before he agrees.',
        situationKo: '범죄는 없었지만, 경감이 입을 다물 의무는 없습니다. 홈즈가 제안했습니다. 경찰이 이 일을 덮고 사건을 종결한다면, 휴 분은 더 이상 없어야 한다는 것. 경감은 동의하기 전에 당신의 다짐을 원합니다.',
        speaker: 'Inspector Bradstreet', line: 'If we drop this, it must be on one condition: no more of Hugh Boone. Do I have your word?',
        prompt: 'Give a firm, formal undertaking: he has your word — you will give up the whole business, and Hugh Boone will never be seen again.',
        promptKo: '확고하고 격식 있는 다짐을 하세요. 약속하며, 이 일을 완전히 그만두고 휴 분은 다시는 나타나지 않을 것이라고.',
        answers: [{ all: ['word'] }, { any: ['promise', 'swear', 'undertake', 'never again', 'give up', 'give it up', 'stop', 'finished', 'over'] }],
        model: 'You have my word. I will give up the whole business, and Hugh Boone will never be seen again.',
        distractors: ['I would prefer to keep the corner for Saturdays only.', 'That depends on how much the police are willing to pay me.', 'Boone earns more than I ever did as a journalist, so I must decline.'],
        hints: ['Make the commitment explicit and unconditional.', 'Key words: my word / give up / never'],
        hintsKo: ['약속을 분명하고 조건 없이 말하세요.', '핵심 표현: my word / give up / never'],
        reply: { speaker: 'Inspector Bradstreet', line: 'Then no further steps will be taken. But if you are found again, everything comes out. Mr. Holmes, we are much indebted to you.' }
      }
    ]
  },
  {
    num: 7, title: 'The Blue Carbuncle', ko: '푸른 카벙클',
    summary: 'A lost hat and a Christmas goose lead Holmes to a stolen jewel worth a fortune, and to a frightened hotel attendant whom he lets go free.',
    summaryKo: '잃어버린 모자와 크리스마스 거위가 홈즈를 엄청난 값어치의 도난 보석으로, 그리고 겁에 질린 호텔 직원에게로 이끕니다. 홈즈는 그를 그냥 놓아줍니다.',
    scenes: [
      {
        role: 'holmes',
        situation: 'Peterson the commissionaire brought you a battered hat and a goose he found in a street scuffle. The goose has to be eaten, but the hat can go back to its owner, a Mr. Henry Baker. You decide to advertise in every evening paper, and Peterson is waiting to take the text down.',
        situationKo: '수위 피터슨이 길거리 소동에서 주운 낡은 모자와 거위를 가져왔습니다. 거위는 먹어야 하지만, 모자는 주인 헨리 베이커 씨에게 돌려줄 수 있습니다. 저녁 신문마다 광고를 내기로 하고, 피터슨이 받아 적으려고 기다립니다.',
        speaker: 'Peterson', line: 'I have my pencil ready, sir. What shall I put in the papers?',
        prompt: 'Dictate a short "Found" notice: a goose and a black felt hat found at the corner of Goodge Street; Mr. Henry Baker may claim them at 221B Baker Street at 6.30 this evening.',
        promptKo: '짧은 습득물 공고를 불러 주세요. 구지 가 모퉁이에서 거위와 검은 펠트 모자를 주웠으며, 헨리 베이커 씨는 오늘 저녁 6시 30분에 베이커 가 221B로 오면 찾아갈 수 있다고.',
        answers: [{ all: ['found'], any: ['hat', 'goose'] }, { all: ['henry baker'] }],
        model: 'Found at the corner of Goodge Street: a goose and a black felt hat. Mr. Henry Baker may claim them at 221B Baker Street at 6.30 this evening.',
        distractors: ['Wanted: one goose, reasonably fat, for a Christmas dinner.', 'Lost: a blue stone of great value; a reward on its return.', 'For sale: one black felt hat, slightly worn, going cheap.'],
        hints: ['What was found, where, who may claim it, and when.', 'Key words: Found / Henry Baker / 6.30'],
        hintsKo: ['무엇을, 어디서 주웠고, 누가, 언제 찾아갈 수 있는지.', '핵심 단어: Found / Henry Baker / 6.30'],
        reply: { speaker: 'Narrator', line: 'Peterson hurried off. Then he hurried back: inside the goose his wife had found a brilliant blue stone — the Countess of Morcar’s carbuncle, with a reward of a thousand pounds on it.' }
      },
      {
        role: 'baker',
        situation: 'You saw the notice and have come to Baker Street at half past six. Mr. Holmes hands you your hat and explains that they were obliged to eat the goose before it went off, but there is a fresh bird for you on the sideboard. He asks whether you want the feathers and remains of the original.',
        situationKo: '공고를 보고 6시 30분에 베이커 가에 왔습니다. 홈즈 씨가 모자를 돌려주며, 거위는 상하기 전에 먹을 수밖에 없었지만 찬장 위에 새 거위가 준비되어 있다고 합니다. 원래 거위의 깃털과 남은 부분을 원하느냐고 묻습니다.',
        speaker: 'Sherlock Holmes', line: 'There is a fresh goose for you on the sideboard. Would you also like the remains of the original — the feathers, the crop and so on?',
        prompt: 'Accept the replacement politely and decline the remains: the fresh bird will do very well, and you have no use for the rest.',
        promptKo: '대체품을 정중히 받아들이고 남은 부분은 사양하세요. 새 거위면 충분하며, 나머지는 필요 없다고.',
        answers: [{ any: ['no use', 'no need', 'not need', 'need not', 'no further use', 'decline', 'keep them', 'keep those', 'no thank', 'not necessary', 'will not be necessary'] }, { all: ['fresh'], any: ['fine', 'perfectly', 'well', 'enough', 'sufficient'] }],
        model: 'That is very kind of you. The fresh bird will do perfectly well, and I have no use at all for the remains of the other, thank you.',
        distractors: ['I insist on the original bird, feathers and all.', 'I would rather have the money than another goose.', 'Please send both birds to my club, together with the bill.'],
        hints: ['Thank, accept, decline — three short moves.', 'Key words: very kind / do perfectly well / no use'],
        hintsKo: ['감사, 수락, 사양 — 세 가지를 짧게.', '핵심 표현: very kind / do perfectly well / no use'],
        reply: { speaker: 'Narrator', line: 'Baker knew nothing of any stone, which cleared him. He mentioned, however, that the goose came from the landlord of the Alpha Inn — and Holmes reached for his coat.' }
      },
      {
        role: 'holmes',
        situation: 'The trail led from the Alpha Inn to a Covent Garden salesman and finally to James Ryder, the head attendant at the hotel where the stone was stolen. He has confessed everything in your sitting room, sobbing, and has just bolted down the stairs. Watson is astonished that you let him go.',
        situationKo: '단서는 알파 여관에서 코번트 가든의 도매상을 거쳐, 보석이 도난당한 호텔의 수석 직원 제임스 라이더에게 이어졌습니다. 그는 당신의 거실에서 흐느끼며 모든 것을 자백하고 방금 계단을 뛰어 내려갔습니다. 왓슨은 그를 놓아준 것에 놀랍니다.',
        speaker: 'Dr. Watson', line: 'You are simply letting him go? After what he did?',
        prompt: 'Explain your decision in professional terms: the police did not hire you to do their job; the man will not offend again, and it is the season of forgiveness.',
        promptKo: '전문가답게 결정을 설명하세요. 경찰이 그들 일을 대신하라고 당신을 고용한 게 아니고, 그는 다시 죄를 짓지 않을 것이며, 지금은 용서의 계절이라고.',
        answers: [{ any: ['not hired', 'not retained', 'not employed', 'not my job', 'not paid', 'not engaged', 'did not hire', 'do not work for the police'] }, { all: ['forgiveness'] }, { all: ['not'], any: ['again'] }],
        model: 'The police did not hire me to make up for their shortcomings. He will not offend again, and it is the season of forgiveness.',
        distractors: ['Yes; I will send my bill to the Countess instead of the police.', 'Yes; Peterson may chase him down the street if he likes.', 'Yes; the goose was the real thief after all.'],
        hints: ['Say whose job it is, then why leniency makes sense.', 'Key words: not hired / not again / forgiveness'],
        hintsKo: ['누구 일인지 말한 뒤, 관용이 합당한 이유를 대세요.', '핵심 표현: not hired / not again / forgiveness'],
        reply: { speaker: 'Narrator', line: 'The stone went back to the Countess, Horner was released for want of evidence, and Holmes rang the bell for supper.' }
      }
    ]
  },
  {
    num: 8, title: 'The Speckled Band', ko: '얼룩무늬 끈',
    summary: 'A frightened young woman whose sister died mysteriously before her wedding asks Holmes for help; her stepfather is killing for the inheritance with a trained snake.',
    summaryKo: '결혼 직전 언니가 의문의 죽음을 맞은 뒤 겁에 질린 젊은 여성이 홈즈에게 도움을 청합니다. 의붓아버지가 유산을 노리고 길들인 뱀으로 살인을 저지르고 있었습니다.',
    scenes: [
      {
        role: 'helen',
        situation: 'It is a quarter past seven in the morning and you have been waiting in Holmes’s sitting room, still in your travelling clothes, since the first train from Leatherhead. You cannot pay him now: your stepfather controls the money until you marry in six weeks.',
        situationKo: '아침 7시 15분, 레더헤드에서 첫 기차를 타고 와 여행복 차림 그대로 홈즈의 거실에서 기다리고 있습니다. 지금은 사례를 할 수 없습니다. 6주 뒤 결혼할 때까지는 의붓아버지가 돈을 관리하기 때문입니다.',
        speaker: 'Sherlock Holmes', line: 'Good morning, madam. My time is at your disposal — though I confess I do not usually receive clients at this hour.',
        prompt: 'Apologise for the early hour, explain that you could not wait, and say frankly that you cannot pay a fee at present but will settle it in six weeks when you have your own income.',
        promptKo: '이른 시간을 사과하고, 기다릴 수 없었다고 설명한 뒤, 지금은 사례를 할 수 없지만 6주 뒤 자기 수입이 생기면 정산하겠다고 솔직히 말하세요.',
        answers: [{ any: ['cannot pay', 'not pay', 'no money', 'unable to pay', 'pay you later', 'settle', 'income', 'not in a position to pay', 'nothing to offer'] }],
        model: 'I am sorry to call so early, but I could not wait. I cannot pay you at present, but in six weeks I will have my own income and will settle whatever you charge.',
        distractors: ['I have brought two hundred pounds in cash to cover your fee.', 'I am in no particular hurry, so please take as long as you like.', 'My stepfather has asked me to say that he will cover your account in full.'],
        hints: ['Be honest about money; say when you will be able to pay.', 'Key words: cannot pay at present / six weeks / settle'],
        hintsKo: ['돈 문제를 솔직하게 말하고, 언제 지불할 수 있는지 밝히세요.', '핵심 표현: cannot pay at present / six weeks / settle'],
        reply: { speaker: 'Sherlock Holmes', line: 'Do not let that trouble you. Now, tell me what has frightened you so.' }
      },
      {
        role: 'holmes',
        situation: 'Miss Stoner has told you of her sister’s death two years ago, the whistle in the night, the words about a speckled band, and the repairs that have moved her into the very room where her sister died. She returns anxiously to the question of what she owes you.',
        situationKo: '스토너 양은 2년 전 언니의 죽음, 한밤중의 휘파람 소리, 얼룩무늬 끈이라는 말, 그리고 수리 때문에 언니가 죽은 바로 그 방으로 옮기게 된 일을 이야기했습니다. 그녀는 불안한 듯 사례 이야기로 되돌아갑니다.',
        speaker: 'Helen Stoner', line: 'And your fee, Mr. Holmes? I would not want you to work for nothing.',
        prompt: 'Reassure her about money: you charge nothing for the work itself — your profession is its own reward — and she may cover your expenses whenever it suits her.',
        promptKo: '비용에 대해 안심시키세요. 일 자체에는 비용을 받지 않고 — 이 직업은 그 자체가 보상이며 — 실비는 형편이 될 때 갚으면 된다고.',
        answers: [{ all: ['expenses'] }, { any: ['no fee', 'not charge', 'no charge', 'free of charge', 'nothing for', 'do not worry about', 'need not worry', 'its own reward'] }],
        model: 'Please do not worry about a fee. My work is its own reward; you may cover my expenses whenever it is convenient for you.',
        distractors: ['My fee is fifty guineas, payable strictly in advance.', 'I will send my account to Dr. Roylott at Stoke Moran.', 'I am afraid I cannot take a case without payment.'],
        hints: ['Separate the fee (none) from the expenses (later).', 'Key words: do not worry / expenses / whenever convenient'],
        hintsKo: ['수수료(없음)와 실비(나중에)를 구분해 말하세요.', '핵심 표현: do not worry / expenses / whenever convenient'],
        reply: { speaker: 'Narrator', line: 'She left, comforted. Minutes later the door crashed open and a huge man in a top hat filled the doorway: Dr. Grimesby Roylott of Stoke Moran, her stepfather.' }
      },
      {
        role: 'holmes',
        situation: 'Dr. Roylott followed his stepdaughter to Baker Street. He is enormous, red with anger, and swinging a hunting crop. He demands to know what she told you and warns that he is a dangerous man to cross.',
        situationKo: '로일롯 박사가 의붓딸을 뒤쫓아 베이커 가까지 왔습니다. 거구에 분노로 얼굴이 붉고, 사냥용 채찍을 흔들고 있습니다. 딸이 무슨 말을 했는지 캐물으며, 자기는 건드리면 위험한 사람이라고 경고합니다.',
        speaker: 'Dr. Roylott', line: 'I know you, you meddler. What has my stepdaughter been saying to you? I am a dangerous man to fall foul of.',
        prompt: 'Refuse calmly and firmly to discuss a client, and end the conversation politely by wishing him good morning.',
        promptKo: '의뢰인에 대해서는 이야기할 수 없다고 차분하고 단호하게 거절하고, 정중하게 "좋은 아침 되십시오"로 대화를 끝내세요.',
        answers: [{ all: ['not'], any: ['discuss', 'disclose', 'share', 'reveal', 'talk about', 'comment'] }, { any: ['confidential', 'confidence', 'good morning', 'good day', 'good bye', 'goodbye'] }],
        model: 'I do not discuss my clients’ business with anyone, Doctor. Now, if there is nothing else, I will wish you good morning.',
        distractors: ['She told me everything, including the terms of her mother’s will.', 'You are quite right; I shall drop the case at once.', 'If you pay me double, I will work for you instead of her.'],
        hints: ['Stay calm, refuse on principle, close the meeting.', 'Key words: do not discuss / clients / good morning'],
        hintsKo: ['침착하게, 원칙에 따라 거절하고, 대화를 마무리하세요.', '핵심 표현: do not discuss / clients / good morning'],
        reply: { speaker: 'Narrator', line: 'Roylott bent the poker into a curve and stormed out. Holmes straightened it with one heave, checked the will at Doctors’ Commons, and that night waited in the dark bedroom at Stoke Moran for the whistle.' }
      }
    ]
  },
  {
    num: 9, title: 'The Engineer’s Thumb', ko: '기술자의 엄지손가락',
    summary: 'A young engineer accepts a lucrative overnight consulting job on strict condition of secrecy, and barely escapes a gang of counterfeiters with his life — and without his thumb.',
    summaryKo: '젊은 기술자가 엄격한 비밀 유지 조건으로 보수가 후한 하룻밤짜리 자문 일을 수락했다가, 위조 화폐단에게서 목숨만 겨우 건지고 엄지손가락을 잃습니다.',
    scenes: [
      {
        role: 'hatherley',
        situation: 'You set up on your own two years ago, and business has been dreadful: three consultations and one small job, gross takings twenty-seven pounds ten. Now a Colonel Lysander Stark has walked into your office in Victoria Street and asked, without preamble, whether you would like fifty guineas for a night’s work.',
        situationKo: '2년 전 독립해 개업했지만 사업은 형편없었습니다. 자문 세 건과 작은 일 하나, 총수입 27파운드 10실링. 그런데 라이샌더 스타크 대령이라는 사람이 빅토리아 가의 사무실로 들어와, 다짜고짜 하룻밤 일에 50기니를 받겠느냐고 묻습니다.',
        speaker: 'Colonel Stark', line: 'How would fifty guineas for a night’s work suit you? I hear you are an orphan and a bachelor, and can travel at short notice.',
        prompt: 'Say the fee is very attractive, but before you accept you would like to know what the work involves and where it is to be done.',
        promptKo: '보수는 매우 매력적이지만, 수락하기 전에 어떤 일이며 어디서 하는 일인지 알고 싶다고 말하세요.',
        answers: [{ all: ['before'], any: ['accept', 'agree', 'commit', 'decide'] }, { any: ['what the work', 'involves', 'involve', 'what exactly', 'what kind of work', 'nature of the work'] }],
        model: 'Fifty guineas is very generous. Before I accept, I would like to know what the work involves and where it is to be done.',
        distractors: ['I accept at once; there is no need to explain anything.', 'That is far too little; my rate is a hundred guineas an hour.', 'I never work at night, whatever the fee may be.'],
        hints: ['Acknowledge the money, then ask your questions.', 'Key words: before I accept / what the work involves / where'],
        hintsKo: ['돈을 인정한 뒤, 질문을 던지세요.', '핵심 표현: before I accept / what the work involves / where'],
        reply: { speaker: 'Colonel Stark', line: 'A hydraulic press on my estate at Eyford, in Berkshire, has gone wrong. You will come by the last train tonight, examine it, and be back by morning.' }
      },
      {
        role: 'hatherley',
        situation: 'The colonel says the press is used to compress fuller’s earth, a valuable mineral he is quietly digging on his land. His neighbours must not learn of it, so he demands absolute secrecy: you must tell no one where you go or what you see.',
        situationKo: '대령은 그 프레스가 자기 땅에서 몰래 캐는 귀한 광물, 백토를 압축하는 데 쓰인다고 합니다. 이웃들이 알면 안 되므로 절대 비밀을 요구합니다. 어디로 가는지, 무엇을 보는지 아무에게도 말해선 안 됩니다.',
        speaker: 'Colonel Stark', line: 'I must have your promise of absolute secrecy. Not a word to anyone, before or after. Do you agree?',
        prompt: 'Agree to the confidentiality condition in a professional way, while noting that you assume the work itself is entirely legitimate.',
        promptKo: '비밀 유지 조건에 전문가답게 동의하되, 일 자체는 전적으로 합법적인 것이라 이해한다고 덧붙이세요.',
        answers: [{ any: ['confidential', 'confidentiality', 'secrecy', 'secret', 'discretion', 'discreet', 'not tell', 'tell no one', 'say nothing', 'my word', 'promise'] }],
        model: 'I understand, and you have my word of complete confidentiality. I take it that the work itself is entirely legitimate?',
        distractors: ['I must consult my partner and my solicitor first.', 'I refuse; I always describe my work in the trade papers.', 'Only if you double the fee for the inconvenience.'],
        hints: ['Give the assurance, then add one polite condition of your own.', 'Key words: my word / confidentiality / legitimate'],
        hintsKo: ['확답을 준 뒤, 정중한 조건 하나를 덧붙이세요.', '핵심 표현: my word / confidentiality / legitimate'],
        reply: { speaker: 'Narrator', line: 'It was not legitimate. The press stamped counterfeit coins, and when you found the metal deposit on its floor, the colonel tried to crush you in it — and cut off your thumb as you escaped through the window.' }
      },
      {
        role: 'hatherley',
        situation: 'It is over. You reached Reading, then London, where Dr. Watson dressed your hand and took you to Holmes. The gang’s house burned down and they got away. Holmes sums up your evening drily.',
        situationKo: '모든 것이 끝났습니다. 레딩을 거쳐 런던에 도착했고, 왓슨 박사가 손을 치료하고 홈즈에게 데려갔습니다. 일당의 집은 불타고 그들은 도망쳤습니다. 홈즈가 당신의 밤을 담담하게 요약합니다.',
        speaker: 'Sherlock Holmes', line: 'Well, you have lost your thumb and your fifty-guinea fee. What have you gained?',
        prompt: 'Answer like a professional who has learned something: you have gained experience, and a story that may be worth something to your reputation.',
        promptKo: '무언가를 배운 전문가답게 답하세요. 경험을 얻었고, 평판에 도움이 될 만한 이야깃거리를 얻었다고.',
        answers: [{ any: ['experience', 'reputation', 'story', 'lesson', 'learned', 'learnt'] }],
        model: 'Experience, I suppose — and a story that may be worth something to my reputation once I tell it.',
        distractors: ['Nothing at all; I shall never take another job as long as I live.', 'A new client in the colonel, I hope, once he calms down.', 'Fifty guineas, which I still fully expect to receive by post.'],
        hints: ['Turn a loss into something you can use.', 'Key words: experience / reputation'],
        hintsKo: ['손실을 쓸모 있는 것으로 바꿔 말하세요.', '핵심 단어: experience / reputation'],
        reply: { speaker: 'Sherlock Holmes', line: 'Precisely. It may be of indirect value: you have only to tell the story to gain an excellent reputation for the rest of your career.' }
      }
    ]
  },
  {
    num: 10, title: 'The Noble Bachelor', ko: '독신 귀족',
    summary: 'A lord’s American bride vanishes from her own wedding breakfast; Holmes finds she has simply gone back to the husband she thought was dead.',
    summaryKo: '어느 귀족의 미국인 신부가 결혼 피로연에서 사라집니다. 홈즈는 그녀가 죽은 줄 알았던 남편에게 돌아갔을 뿐임을 밝혀냅니다.',
    scenes: [
      {
        role: 'holmes',
        situation: 'Lord Robert St. Simon, second son of the Duke of Balmoral, has written to ask for a consultation and arrives at four o’clock precisely. He is polite but plainly thinks that a case involving his family is rather above your usual clientele.',
        situationKo: '밸모럴 공작의 둘째 아들 로버트 세인트사이먼 경이 상담을 요청하는 편지를 보내고 4시 정각에 도착했습니다. 예의 바르지만, 자기 가문의 사건은 당신의 평소 고객 수준보다 한참 위라고 여기는 것이 역력합니다.',
        speaker: 'Lord St. Simon', line: 'I understand you have handled delicate matters before, Mr. Holmes — though hardly, I imagine, for a family of my position.',
        prompt: 'Answer a condescending client with dignity: you have handled confidential matters for families of standing, and you treat every client with the same discretion.',
        promptKo: '거들먹거리는 의뢰인에게 품위 있게 답하세요. 지체 높은 가문의 비밀스러운 일을 다뤄 봤으며, 모든 의뢰인을 똑같이 신중하게 대한다고.',
        answers: [{ any: ['discretion', 'discreet', 'confidential', 'confidence', 'same care', 'every client'] }, { all: ['king'] }],
        model: 'I have handled a number of confidential matters for families of standing, and I treat every client with the same discretion.',
        distractors: ['No, my lord; this is my very first case of any kind.', 'I only take cases where the fee is paid in advance and in gold.', 'Please lower your voice; my landlady listens at doors.'],
        hints: ['Do not boast, do not apologise; state your standard.', 'Key words: confidential matters / every client / discretion'],
        hintsKo: ['자랑도 사과도 말고, 당신의 기준을 말하세요.', '핵심 표현: confidential matters / every client / discretion'],
        reply: { speaker: 'Lord St. Simon', line: 'Quite so. Then you know the facts from the papers: my wife, Miss Hatty Doran of San Francisco, disappeared during the wedding breakfast, and I have not seen her since.' }
      },
      {
        role: 'holmes',
        situation: 'You have asked your questions: the bride was cheerful going into church and distracted coming out; she dropped her bouquet; she spoke to her maid about somebody "jumping a claim". Lord St. Simon has nothing more to add and wants to know whether the interview is over.',
        situationKo: '질문은 끝났습니다. 신부는 교회에 들어갈 때는 쾌활했고 나올 때는 딴생각에 잠겨 있었으며, 부케를 떨어뜨렸고, 하녀에게 누군가 "남의 광구를 가로챘다"는 말을 했습니다. 세인트사이먼 경은 더 할 말이 없고, 면담이 끝났는지 알고 싶어 합니다.',
        speaker: 'Lord St. Simon', line: 'Is there anything further you require from me, Mr. Holmes?',
        prompt: 'Close the meeting professionally: you have all the facts you need, you will look into it today, and you will let him know as soon as there is news.',
        promptKo: '전문가답게 면담을 마무리하세요. 필요한 사실은 모두 파악했고, 오늘 조사에 착수하며, 소식이 있는 대로 알리겠다고.',
        answers: [{ any: ['all the facts', 'all i need', 'everything i need', 'nothing further', 'nothing more', 'nothing else'] }, { any: ['let you know', 'inform you', 'report', 'update', 'in touch', 'hear from me', 'contact you'] }],
        model: 'No, I think I have all the facts I need. I will look into it today and let you know as soon as I have any news.',
        distractors: ['Yes; I need to know exactly how large your wife’s fortune is.', 'Yes; please repeat the whole story from the very beginning.', 'No; I am afraid the case is quite beyond me.'],
        hints: ['Confirm you have enough, say what happens next, promise to report.', 'Key words: all the facts / look into it / let you know'],
        hintsKo: ['충분히 파악했음을 확인하고, 다음 단계를 말하고, 보고를 약속하세요.', '핵심 표현: all the facts / look into it / let you know'],
        reply: { speaker: 'Narrator', line: 'Lestrade arrived soaked from dragging the Serpentine, with the bride’s wedding dress and a hotel bill found in its pocket. Holmes had already solved the case, and ordered a cold supper for five.' }
      },
      {
        role: 'hatty',
        situation: 'Holmes has brought you and your first husband, Frank Moulton, face to face with Lord St. Simon in his sitting room. You had believed Frank dead in Arizona; he appeared in the church, and you went to him without a word to anyone. Lord St. Simon stands stiffly, refusing to sit down.',
        situationKo: '홈즈가 당신과 첫 남편 프랭크 몰턴을 자기 거실에서 세인트사이먼 경과 마주 앉게 했습니다. 애리조나에서 프랭크가 죽은 줄 알았는데, 그가 교회에 나타났고 당신은 아무에게도 말 없이 그에게 갔습니다. 세인트사이먼 경은 앉기를 거부하고 뻣뻣하게 서 있습니다.',
        speaker: 'Lord St. Simon', line: 'You will excuse me if I do not take this lightly. I have been made to look a fool before all of London.',
        prompt: 'Apologise sincerely for the way you left, without pretending you could have acted differently: you owe him an apology, you should have spoken to him first, and you are sorry for the distress.',
        promptKo: '떠난 방식에 대해 진심으로 사과하되, 달리 행동할 수 있었던 척은 하지 마세요. 사과할 일이며, 먼저 말했어야 했고, 고통을 준 것이 미안하다고.',
        answers: [{ any: ['apology', 'apologise', 'apologize', 'sorry', 'regret', 'forgive'] }],
        model: 'I owe you an apology, Lord St. Simon. I should have spoken to you before I left, and I am truly sorry for the distress I caused.',
        distractors: ['You brought this on yourself by being so very dull at breakfast.', 'Frank and I will send you an invoice for the wedding presents.', 'Please keep the presents; I have no further use for them.'],
        hints: ['Own the mistake, name what you should have done, express regret.', 'Key words: owe you an apology / should have / sorry'],
        hintsKo: ['잘못을 인정하고, 어떻게 했어야 했는지 말하고, 유감을 표하세요.', '핵심 표현: owe you an apology / should have / sorry'],
        reply: { speaker: 'Narrator', line: 'Lord St. Simon bowed, declined supper, and left. Holmes told Watson that he could hardly blame a man who had lost a wife and a fortune in a single afternoon.' }
      }
    ]
  },
  {
    num: 11, title: 'The Beryl Coronet', ko: '녹주석 보관(寶冠)',
    summary: 'A banker lends fifty thousand pounds against a priceless coronet, wakes to find it damaged and his son holding it, and hires Holmes to recover the missing stones before Monday.',
    summaryKo: '은행가가 값을 매길 수 없는 보관을 담보로 5만 파운드를 빌려주었다가, 잠에서 깨어 보니 보관은 망가지고 아들이 그것을 들고 있습니다. 월요일 전에 사라진 보석을 되찾으려고 홈즈를 고용합니다.',
    scenes: [
      {
        role: 'holder',
        situation: 'You are senior partner of Holder & Stevenson, Threadneedle Street. A visitor whose name is a household word — you may not say more — has come to your private office and asked for an enormous loan at once, saying he prefers to keep it a matter of business rather than borrow from friends.',
        situationKo: '당신은 스레드니들 가 홀더 앤드 스티븐슨 은행의 수석 파트너입니다. 이름을 대면 누구나 아는 인물 — 더 말할 수는 없습니다 — 이 개인 집무실로 찾아와, 친구에게 빌리기보다 사업상 거래로 하고 싶다며 당장 거액의 대출을 요청합니다.',
        speaker: 'The visitor', line: 'It is absolutely essential that I have fifty thousand pounds at once. I prefer to make this a business matter, and to carry it through myself.',
        prompt: 'Reply as a banker: the firm would be glad to advance the amount, but you must ask what security he is able to offer.',
        promptKo: '은행가답게 답하세요. 회사는 기꺼이 대출해 드리겠지만, 어떤 담보를 제공할 수 있는지 여쭤봐야 한다고.',
        answers: [{ any: ['security', 'collateral', 'guarantee', 'secured'] }],
        model: 'The firm would be glad to advance the amount, sir, but I must ask what security you are able to offer.',
        distractors: ['Fifty thousand is far beyond anything this bank could lend.', 'Of course, sir; your name alone is quite sufficient for us.', 'I will need to consult the newspapers before I can decide.'],
        hints: ['Say yes in principle, then name the condition every lender needs.', 'Key words: advance the amount / security'],
        hintsKo: ['원칙적으로 승낙한 뒤, 모든 대출 기관이 필요로 하는 조건을 말하세요.', '핵심 표현: advance the amount / security'],
        reply: { speaker: 'The visitor', line: 'He opened a black morocco case. Inside lay the Beryl Coronet — thirty-nine great beryls in gold — one of the most precious public possessions of the Empire, to be redeemed on Monday morning.' }
      },
      {
        role: 'holder',
        situation: 'You took the coronet home rather than leave it in the bank. In the night you woke to find your son Arthur standing with it in his hands, one corner bent and three stones gone. The police have arrested him; he will say nothing. You have run to Baker Street half out of your mind.',
        situationKo: '보관을 은행에 두지 않고 집에 가져갔습니다. 한밤중에 깨어 보니 아들 아서가 그것을 손에 들고 서 있었고, 한쪽 귀퉁이가 휘어지고 보석 세 개가 사라졌습니다. 경찰이 아들을 체포했지만 그는 아무 말도 하지 않습니다. 당신은 반쯤 정신이 나가 베이커 가로 달려왔습니다.',
        speaker: 'Sherlock Holmes', line: 'Calm yourself, Mr. Holder. Tell me precisely what you need from me, and by when.',
        prompt: 'Brief him like a client under a deadline: you need the three missing stones back before Monday, when the coronet must be returned, and he should spare no expense.',
        promptKo: '마감이 있는 의뢰인답게 요점을 말하세요. 보관을 돌려주어야 하는 월요일 전에 사라진 보석 세 개를 되찾아야 하며, 비용은 아끼지 말라고.',
        answers: [{ all: ['monday'] }, { all: ['stones'], any: ['before', 'by', 'back', 'recover', 'return'] }, { any: ['no expense', 'any expense', 'whatever it costs', 'whatever the cost', 'spare no'] }],
        model: 'I need the three missing stones back before Monday, when the coronet must be returned. Spare no expense — I have already offered a thousand pounds reward.',
        distractors: ['I need you to arrest my son and my niece before nightfall.', 'I need a loan of fifty thousand pounds by Friday at the latest.', 'I need the newspapers to hear nothing of this until next year.'],
        hints: ['Deliverable, deadline, budget — in that order.', 'Key words: three stones / before Monday / spare no expense'],
        hintsKo: ['결과물, 기한, 예산 순서로 말하세요.', '핵심 표현: three stones / before Monday / spare no expense'],
        reply: { speaker: 'Sherlock Holmes', line: 'Then let us go down to Streatham together, and I will look at the house, the snow, and everyone who was in it last night.' }
      },
      {
        role: 'holder',
        situation: 'Next morning Holmes hands you the missing corner of the coronet with its three beryls. The thief was your niece Mary’s lover, Sir George Burnwell, and your son was trying to stop him. Holmes bought the stones back from Burnwell for three thousand pounds.',
        situationKo: '다음 날 아침, 홈즈가 녹주석 세 개가 박힌 보관의 귀퉁이를 건넵니다. 도둑은 조카 메리의 연인 조지 번웰 경이었고, 아들은 그를 막으려던 것이었습니다. 홈즈는 번웰에게서 3천 파운드를 주고 보석을 되사 왔습니다.',
        speaker: 'Sherlock Holmes', line: 'I paid three thousand for the stones, and there is a small reward, I fancy. Have you your cheque-book?',
        prompt: 'Agree at once to settle: you will write the cheque now for four thousand pounds, and you thank him sincerely.',
        promptKo: '즉시 정산에 동의하세요. 지금 4천 파운드 수표를 쓰겠으며, 진심으로 감사한다고.',
        answers: [{ any: ['cheque', 'check', 'four thousand', '4000', '4 000', 'pay you', 'will pay', 'settle'] }],
        model: 'Gladly. I will write the cheque now for four thousand pounds, and you have my sincere thanks.',
        distractors: ['Three thousand? That is outrageous; you will get nothing from me.', 'Send me an invoice and I will consider it next quarter.', 'I am afraid the bank does not deal in rewards of any kind.'],
        hints: ['Agree, state the amount, thank him.', 'Key words: cheque / four thousand / thanks'],
        hintsKo: ['동의하고, 금액을 말하고, 감사하세요.', '핵심 단어: cheque / four thousand / thanks'],
        reply: { speaker: 'Sherlock Holmes', line: 'And now, I think, you owe an apology to your son, who behaved as I should be proud to see my own son behave.' }
      }
    ]
  },
  {
    num: 12, title: 'The Copper Beeches', ko: '너도밤나무 집',
    summary: 'A governess is offered an unusually high salary on strange conditions, and Holmes finds she is being used to impersonate a daughter locked away for her inheritance.',
    summaryKo: '가정교사가 이상한 조건으로 유난히 높은 급료를 제안받습니다. 홈즈는 그녀가 유산 때문에 갇힌 딸의 대역으로 이용되고 있음을 밝혀냅니다.',
    scenes: [
      {
        role: 'violet',
        situation: 'You were governess to Colonel Spence Munro for five years until he moved to Nova Scotia. Money is running short. At Westaway’s agency in the West End, a stout, smiling gentleman named Rucastle has jumped up the moment you entered and is asking about your qualifications.',
        situationKo: '스펜스 먼로 대령의 집에서 5년 동안 가정교사로 일했는데, 대령이 노바스코샤로 떠났습니다. 돈이 떨어져 갑니다. 웨스트엔드의 웨스터웨이 직업소개소에서, 뚱뚱하고 잘 웃는 루캐슬이라는 신사가 당신이 들어서자마자 벌떡 일어나 자격에 대해 묻고 있습니다.',
        speaker: 'Mr. Rucastle', line: 'A little French, a little German, music and drawing — excellent. And what salary do you ask?',
        prompt: 'Answer the salary question the way a candidate should: you had four pounds a month in your last position, and you would hope for something similar.',
        promptKo: '지원자답게 급료 질문에 답하세요. 이전 직장에서 월 4파운드를 받았고, 비슷한 수준을 기대한다고.',
        answers: [{ any: ['four pounds', '4 pounds', '4 a month', 'four a month'] }, { all: ['last'], any: ['position', 'place', 'post', 'employer', 'job'] }],
        model: 'I had four pounds a month in my last position, and I would hope for something similar.',
        distractors: ['I would rather not discuss money until I have seen the house.', 'Whatever you think is fair, sir; I really have no idea.', 'A hundred and fifty pounds a year, and not a penny less.'],
        hints: ['Anchor on what you earned before, then state your expectation.', 'Key words: four pounds a month / last position'],
        hintsKo: ['이전 급료를 기준으로 삼은 뒤, 기대치를 말하세요.', '핵심 표현: four pounds a month / last position'],
        reply: { speaker: 'Mr. Rucastle', line: 'Four pounds! Sweating, rank sweating! With your accomplishments, madam, your salary with me would begin at a hundred a year.' }
      },
      {
        role: 'violet',
        situation: 'A hundred a year is more than twice what you have ever earned, but Mr. Rucastle explains that his wife has certain little whims. You would be asked to wear a particular dress, sit where you are told — and to cut your beautiful chestnut hair quite short.',
        situationKo: '연 100파운드는 지금까지 받아 본 급료의 두 배가 넘지만, 루캐슬 씨는 아내에게 사소한 변덕이 몇 가지 있다고 설명합니다. 특정한 드레스를 입고, 시키는 자리에 앉고 — 그리고 아름다운 밤색 머리를 아주 짧게 잘라야 한답니다.',
        speaker: 'Mr. Rucastle', line: 'The salary is a hundred a year, but my wife would like your hair cut short before you come to us. That would be acceptable, I take it?',
        prompt: 'Decline that condition politely but clearly: it is not something you can agree to; everything else sounds acceptable, but on that point you must say no.',
        promptKo: '그 조건은 정중하지만 분명하게 거절하세요. 동의할 수 없는 일이며, 다른 조건은 괜찮지만 그 점만은 안 된다고.',
        answers: [{ any: ['afraid', 'decline', 'cannot agree', 'not agree', 'not able', 'unable', 'impossible', 'not something i can', 'must say no', 'cannot accept', 'not accept'] }],
        model: 'I am afraid that is not something I can agree to. Everything else sounds quite acceptable, but on that point I must decline.',
        distractors: ['Certainly, sir; I will have it done this very afternoon.', 'I will agree if you raise the salary to two hundred a year.', 'Only if your wife cuts her own hair first, sir.'],
        hints: ['Soft opening, clear refusal, and keep the door open on the rest.', 'Key words: I am afraid / cannot agree / decline'],
        hintsKo: ['부드럽게 시작하고, 분명히 거절하고, 나머지에는 여지를 남기세요.', '핵심 표현: I am afraid / cannot agree / decline'],
        reply: { speaker: 'Narrator', line: 'He left disappointed. Two days later a letter came from the Copper Beeches, near Winchester: his wife was set on having you, and they would now pay thirty pounds a quarter — a hundred and twenty a year.' }
      },
      {
        role: 'holmes',
        situation: 'Miss Hunter has brought the letter to Baker Street. She is inclined to accept — the money is too good to refuse — but she wants your professional advice. You do not like it: why pay a hundred and twenty a year when they could have their pick of governesses for forty?',
        situationKo: '헌터 양이 편지를 들고 베이커 가에 왔습니다. 거절하기엔 돈이 너무 좋아 수락할 마음이 있지만, 당신의 전문가 조언을 듣고 싶어 합니다. 당신은 마음에 들지 않습니다. 40파운드면 가정교사를 골라 쓸 수 있는데 왜 120파운드를 주겠다는 것일까요?',
        speaker: 'Violet Hunter', line: 'Should I accept, Mr. Holmes? The salary is very high for the work — and that is what worries me.',
        prompt: 'Advise her honestly and give her a safeguard: it is her decision, but it is not a position you would recommend; if she does take it, she should telegraph you the moment anything seems wrong, and you will come.',
        promptKo: '솔직하게 조언하고 안전장치를 주세요. 결정은 본인 몫이지만 추천할 만한 자리는 아니며, 그래도 가기로 한다면 이상한 낌새가 있을 때 즉시 전보를 치면 당신이 가겠다고.',
        answers: [{ any: ['telegraph', 'telegram', 'wire', 'send for me', 'let me know', 'keep me informed', 'contact me', 'write to me', 'call for me', 'send word'] }, { all: ['come'], any: ['once', 'immediately', 'straight', 'help', 'wrong'] }],
        model: 'It is your decision, but it is not a position I would recommend. If you do take it, telegraph me the moment anything seems wrong and I will come at once.',
        distractors: ['Take it; a hundred and twenty pounds a year is not to be refused.', 'Refuse it; I never advise anyone to leave London for the country.', 'That is not the kind of question I answer, Miss Hunter.'],
        hints: ['Respect her choice, state your view, then offer concrete support.', 'Key words: your decision / not recommend / telegraph me'],
        hintsKo: ['선택을 존중하고, 의견을 밝히고, 구체적인 지원을 제안하세요.', '핵심 표현: your decision / not recommend / telegraph me'],
        reply: { speaker: 'Narrator', line: 'A fortnight later the telegram came: please be at the Black Swan in Winchester at midday tomorrow. Behind a locked door at the Copper Beeches, Holmes found the room where Alice Rucastle had been kept from her own inheritance.' }
      }
    ]
  }
];

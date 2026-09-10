/* The Efficiency Expert (Edgar Rice Burroughs, 1921 — Project Gutenberg #3475, public domain).
   Game data for all 28 chapters, written as business-English conversation practice: interviews,
   negotiations, reports to a boss, giving instructions, handling customers, resigning politely.
   Field reference: books/README.md. Situations, prompts, model answers, hints and distractors are
   original; the book is quoted only a few words at a time. */
window.LP_ROLES = {
  jimmy: { en: 'You are Jimmy Torrance. ', ko: '당신은 지미 토런스입니다. ' },
  compton: { en: 'You are Mason Compton, president of the International Machine Company. ', ko: '당신은 인터내셔널 기계회사 사장 메이슨 컴프턴입니다. ' },
  elizabeth: { en: 'You are Elizabeth Compton. ', ko: '당신은 엘리자베스 컴프턴입니다. ' },
  harriet: { en: 'You are Harriet Holden. ', ko: '당신은 해리엇 홀든입니다. ' },
  edith: { en: 'You are Edith Hudson, Mr. Compton\'s new stenographer. ', ko: '당신은 컴프턴 사장의 새 속기사 이디스 허드슨입니다. ' },
  bince: { en: 'You are Harold Bince, the assistant general manager. ', ko: '당신은 부지배인 해럴드 빈스입니다. ' },
  attorney: { en: 'You are Jimmy\'s defence attorney. ', ko: '당신은 지미의 변호사입니다. ' }
};
window.LP_SCENES = [
  {
    num: 1, title: 'Jimmy Torrance, Jr.', ko: '지미 토런스 2세',
    summary: 'The university boxing champion is told he may not graduate. He asks the president for one more chance and, with hard work and tutors, earns his diploma.',
    summaryKo: '대학 권투 챔피언 지미는 졸업이 어렵다는 통보를 받습니다. 총장에게 한 번만 더 기회를 달라고 청하고, 고된 공부 끝에 졸업장을 받습니다.',
    scenes: [
      {
        role: 'jimmy',
        situation: 'You have just won the university boxing championship, but now you stand before the faculty. The president says your grades are so low that you should either give up all sports or resign from the university.',
        situationKo: '대학 권투 챔피언이 된 직후, 교수단 앞에 서 있습니다. 총장은 성적이 너무 낮으니 운동을 모두 그만두거나 자퇴하라고 합니다.',
        speaker: 'The President', line: 'If you cannot assure me that you will devote yourself to your studies, Mr. Torrance, it would be best for you to resign now.',
        prompt: 'Ask for one more chance, and propose a deal: you keep playing baseball, but your progress is reviewed at the end of each month.',
        promptKo: '한 번만 더 기회를 달라고 하고, 야구는 계속하되 매달 말에 성적 향상을 점검받겠다는 조건을 제안하세요.',
        answers: [{ any: ['one more chance', 'another chance', 'second chance', 'more chance'] }, { all: ['chance'], any: ['month', 'monthly', 'review', 'progress', 'improve'] }, { any: ['monthly', 'each month', 'every month', 'end of the month'] }],
        model: "I'd like to ask for one more chance, sir. Let me stay on the team, and review my progress at the end of each month.",
        distractors: ['I think I will resign today, sir. Baseball matters more to me than a diploma.', 'My grades are fine, sir. The faculty must have mixed up my records.', 'Could you move the final exams until after the baseball season?'],
        hints: ['Ask for a chance and offer a way to check on you.', 'Key words: one more chance / each month'],
        hintsKo: ['기회를 청하고, 점검 방법을 제안하세요.', '핵심 표현: one more chance / each month'],
        reply: { speaker: 'Narrator', line: 'The president, who was more human than the students believed, gave you another chance on your own terms.' }
      },
      {
        role: 'jimmy',
        situation: 'Back in your room you find half a dozen classmates waiting to hear the news. They are already planning tonight\'s celebration, but you have months of work to make up.',
        situationKo: '방으로 돌아오니 소식을 기다리던 친구들이 여섯 명이나 있습니다. 벌써 오늘 밤 파티를 계획하지만, 당신은 몇 달치 공부를 따라잡아야 합니다.',
        speaker: 'A classmate', line: 'Well? What did Whiskers want? Come on, the bar-boy has a new recipe to show us!',
        prompt: 'Tell them the bad news and ask them, politely but clearly, to give you space to study until commencement.',
        promptKo: '나쁜 소식을 전하고, 졸업식 때까지 공부할 수 있게 자리를 비워 달라고 정중하지만 분명하게 부탁하세요.',
        answers: [{ any: ['study', 'focus', 'concentrate', 'space', 'alone'] }],
        model: "It's worse than that. I need to focus on my books, so please give me some space until commencement.",
        distractors: ["Let's go out and celebrate the championship tonight!", 'Can one of you lend me your notes? I will copy them tomorrow.', 'Tell the professor I am sick and cannot take the exam.'],
        hints: ['Say what you need: quiet, and time to work.', 'Key words: focus / study / space'],
        hintsKo: ['필요한 것을 말하세요: 조용함과 공부할 시간.', '핵심 단어: focus / study / space'],
        reply: { speaker: 'A classmate', line: 'All right, Jimmy. We are with you, horse, foot and artillery. Give us the high-sign when you want us.' }
      }
    ]
  },
  {
    num: 2, title: 'Jimmy Will Accept a Position', ko: '지미, 일자리를 구하기로 하다',
    summary: 'A gentle letter from his father shows Jimmy how little he has achieved. He goes to Chicago to succeed on his own and places a Situations Wanted advertisement.',
    summaryKo: '아버지의 다정한 편지를 읽고 지미는 자신이 이룬 것이 없음을 깨닫습니다. 혼자 힘으로 성공하려고 시카고로 가서 구직 광고를 냅니다.',
    scenes: [
      {
        role: 'jimmy',
        situation: 'Your father\'s letter has arrived with a check. He does not scold you, but every line breathes disappointment. You decide to write back and go to Chicago to make your own way.',
        situationKo: '아버지의 편지가 수표와 함께 도착했습니다. 꾸짖는 말은 없지만 줄마다 실망이 배어 있습니다. 답장을 쓰고 시카고로 가서 혼자 힘으로 성공하기로 합니다.',
        speaker: 'Father (by letter)', line: 'Come home and run into debt here, where the cost of living is not so high. Am enclosing a check to cover your debts.',
        prompt: 'Thank him, and tell him you intend to succeed on your own. Ask him not to send any more money until you ask for it.',
        promptKo: '감사를 전하고, 혼자 힘으로 성공하겠다고 말하세요. 당신이 요청하기 전에는 돈을 더 보내지 말라고 부탁하세요.',
        answers: [{ any: ['on my own', 'by myself', 'my own way', 'make good', 'prove'] }, { all: ['not'], any: ['send', 'money', 'cent'] }],
        model: "Thank you for the letter and the check, Dad. I'm going to make it on my own — please don't send another cent until I ask for it.",
        distractors: ['Please send the next check by Friday, Dad. Chicago is expensive.', 'I have decided to come home and help at the corn mill after all.', 'Could you ask your friends in Chicago to find me a position?'],
        hints: ['Two ideas: independence, and no more money.', 'Key words: on my own / do not send'],
        hintsKo: ['두 가지 생각: 독립, 그리고 돈은 그만.', '핵심 표현: on my own / do not send'],
        reply: { speaker: 'Narrator', line: 'A few days later the Twentieth Century Limited carried you into La Salle Street Station, and you took a cab to a small, cheap hotel.' }
      },
      {
        role: 'jimmy',
        situation: 'Rather than apply for jobs, you have decided to let employers come to you. You are at the newspaper office to place an advertisement offering yourself as a general manager.',
        situationKo: '일자리에 지원하는 대신, 고용주가 찾아오게 하기로 했습니다. 스스로를 총지배인감으로 내놓는 광고를 내려고 신문사에 와 있습니다.',
        speaker: 'The advertising clerk', line: 'Which column — Help Wanted or Situations Wanted? And how many days do you want it to run?',
        prompt: 'Say you want it in the Situations Wanted column for three days, and ask what the rate is.',
        promptKo: '구직(Situations Wanted) 난에 사흘 동안 싣고 싶다고 말하고, 요금이 얼마인지 물어보세요.',
        answers: [{ all: ['situations wanted'] }, { all: ['three days'] }, { any: ['rate', 'cost', 'charge', 'how much', 'price'] }],
        model: "I'd like to place this in the Situations Wanted column for three days. What's the rate?",
        distractors: ["I want to buy today's paper and a magazine, please.", 'I am here to interview the editor about a management position.', 'Please cancel my subscription; I am leaving town.'],
        hints: ['Name the column, the number of days, and ask the price.', 'Key words: Situations Wanted / three days / rate'],
        hintsKo: ['광고 난, 기간을 말하고 가격을 물으세요.', '핵심 표현: Situations Wanted / three days / rate'],
        reply: { speaker: 'The advertising clerk', line: 'Three days gets you the lower rate. It will appear in tomorrow morning\'s edition.' }
      }
    ]
  },
  {
    num: 3, title: 'The Lizard', ko: '리저드',
    summary: 'Jimmy catches a pickpocket, lets him go, and discovers his watch is gone anyway. The thief, the Lizard, returns it, and the two exchange offers of help. The advertisement brings no replies at all.',
    summaryKo: '지미는 소매치기를 붙잡았다가 놓아주지만 시계는 사라지고 없습니다. 도둑 리저드가 시계를 돌려주고, 두 사람은 서로 도움을 약속합니다. 광고에는 답장이 한 통도 오지 않습니다.',
    scenes: [
      {
        role: 'jimmy',
        situation: 'The pickpocket you caught on La Salle Street has followed you to your hotel room and quietly laid your watch on the table. He says he did it because you did not have him arrested.',
        situationKo: '라살 거리에서 붙잡았던 소매치기가 호텔 방까지 따라와 시계를 탁자에 조용히 올려놓습니다. 당신이 경찰에 넘기지 않아서라고 합니다.',
        speaker: 'The Lizard', line: 'If you ever want a box cracked, look up the Lizard. That\'s me. Now I gotta be goin\'.',
        prompt: 'Return the favour in kind: offer him a job whenever he wants one, and give him your card.',
        promptKo: '같은 방식으로 호의를 갚으세요. 원할 때 언제든 일자리를 주겠다고 제안하고 명함을 건네세요.',
        answers: [{ all: ['card'] }, { all: ['job'], any: ['look me up', 'come to me', 'whenever', 'any time', 'anytime', 'want'] }, { any: ['my services', 'offer you'] }],
        model: "You've offered me your services, so I'll offer you mine. Whenever you want a job, look me up — here's my card.",
        distractors: ['I will call the police as soon as you leave this room.', 'How much would you charge to open a bank safe for me?', 'Please keep the watch. I have no use for it anymore.'],
        hints: ['Mirror his offer, and leave him a way to find you.', 'Key words: job / card'],
        hintsKo: ['그의 제안을 되돌려 주고, 연락할 방법을 남기세요.', '핵심 단어: job / card'],
        reply: { speaker: 'The Lizard', line: 'Tanks. If you don\'t want a box cracked any sooner than I want a job, the chances are we will never meet again.' }
      },
      {
        role: 'jimmy',
        situation: 'Your advertisement ran this morning. You calculated at least a hundred replies. At the Want Ad counter the clerk has just gone through a whole pile of letters — and none is for you.',
        situationKo: '오늘 아침 광고가 실렸습니다. 답장이 적어도 백 통은 올 거라 계산했습니다. 광고 창구의 직원이 편지 더미를 다 넘겨 보았지만, 당신 것은 한 통도 없습니다.',
        speaker: 'The clerk', line: 'Nothing. There is nothing for you.',
        prompt: 'Politely ask whether he is sure he looked in the right place, and ask him to check again.',
        promptKo: '제대로 된 칸을 확인했는지 정중히 묻고, 다시 한번 살펴봐 달라고 하세요.',
        answers: [{ any: ['check again', 'look again', 'double check', 'once more'] }, { all: ['sure'], any: ['right', 'correct'] }, { any: ['mistake', 'mixed up', 'misplaced', 'sidetracked'] }],
        model: 'Are you sure you looked in the right compartment? Could you check again, please?',
        distractors: ['Give me the replies of that man; he has more than he needs.', 'I would like to place a second advertisement for help wanted.', 'Never mind. I will come back next year.'],
        hints: ['Doubt the result, not the person. Ask for a second look.', 'Key words: sure / check again'],
        hintsKo: ['사람이 아니라 결과를 의심하세요. 다시 봐 달라고 하세요.', '핵심 표현: sure / check again'],
        reply: { speaker: 'The clerk', line: 'Sure. I distributed all the stuff myself. What are you advertising for — a position? That\'s the answer. That fellow there was advertising for help.' }
      }
    ]
  },
  {
    num: 4, title: 'Jimmy Hunts a Job', ko: '구직',
    summary: 'Jimmy applies to manage a factory with no experience and is thrown out. For a month he lowers his aims, down to office boy, and finds even that needs experience. He writes home admitting failure.',
    summaryKo: '경험도 없이 공장 지배인 자리에 지원했다가 쫓겨납니다. 한 달 동안 눈높이를 사환 자리까지 낮추지만, 거기에도 경력이 필요합니다. 실패를 인정하는 편지를 집에 씁니다.',
    scenes: [
      {
        role: 'jimmy',
        situation: 'You are in the office of Mr. Brown, who runs a sash, door and blind factory and advertised for a general manager. He fires questions at you like a machine gun.',
        situationKo: '창틀·문·블라인드 공장을 운영하며 총지배인을 구한다고 광고한 브라운 씨의 사무실입니다. 그는 기관총처럼 질문을 쏟아냅니다.',
        speaker: 'Mr. Brown', line: 'What experience have you had? Who have you been with, and how many years?',
        prompt: 'You have no experience in this industry. Say so honestly, but point to your strengths: four years leading teams, and you learn quickly.',
        promptKo: '이 업계 경험은 없습니다. 솔직히 말하되, 강점을 내세우세요: 4년간 팀을 이끌었고, 빨리 배운다는 것.',
        answers: [{ all: ['experience'], any: ['but', 'however', 'learn', 'lead', 'led', 'team', 'quick', 'captain'] }, { any: ['fast learner', 'learn quickly', 'quick learner', 'transferable'] }],
        model: "I have no experience in this industry yet, but I've led teams for four years, and I learn quickly.",
        distractors: ['I came here to manage your business, not to make doors.', 'I have been the general manager of three factories like this one.', 'Your advertisement did not say anything about experience.'],
        hints: ['Admit the gap, then pivot to what you can offer.', 'Key words: experience + but / learn'],
        hintsKo: ['부족한 점을 인정한 뒤, 줄 수 있는 것으로 넘어가세요.', '핵심 표현: experience + but / learn'],
        reply: { speaker: 'Mr. Brown', line: 'Hm. At least you\'re straight about it. But I need a man who knows sash, doors and blinds. Good day — and close the door after you.' }
      },
      {
        role: 'jimmy',
        situation: 'Four weeks later you have applied for a job as office boy at a life-insurance company. The kindly office manager has just told you that he will probably hire a boy who has done the job before.',
        situationKo: '4주 뒤, 생명보험회사 사환 자리에 지원했습니다. 친절한 사무 관리자는 이미 경험이 있는 소년을 뽑을 것 같다고 말합니다.',
        speaker: 'The office manager', line: 'Experience is not essential, of course, but it is preferable. I have a dozen applications already.',
        prompt: 'Accept the answer gracefully. Ask him to keep your application on file and to let you know if another opening comes up.',
        promptKo: '대답을 정중히 받아들이세요. 지원서를 보관해 두었다가 다른 자리가 나면 알려 달라고 부탁하세요.',
        answers: [{ any: ['on file', 'keep my application', 'keep my name', 'keep my details'] }, { all: ['know'], any: ['opening', 'vacancy', 'position', 'anything'] }, { any: ['reconsider', 'consider me'] }],
        model: 'I understand. Could you keep my application on file and let me know if another opening comes up?',
        distractors: ['Do I really need experience to be an office boy?', 'Then I will apply to the other insurance company instead.', 'Good day. I will not waste any more of your time.'],
        hints: ['Leave the door open for next time.', 'Key words: on file / let me know'],
        hintsKo: ['다음 기회의 문을 열어 두세요.', '핵심 표현: on file / let me know'],
        reply: { speaker: 'The office manager', line: 'Certainly. I will keep it. I am sorry I cannot do more for you today.' }
      }
    ]
  },
  {
    num: 5, title: 'Jimmy Lands One', ko: '첫 일자리',
    summary: 'Jimmy changes a wheel for a young woman whose name he does not know, refuses her tip, and tears up his letter home. The next day he lands a ten-dollar-a-week job selling hosiery in a department store.',
    summaryKo: '이름 모를 젊은 여성의 자동차 바퀴를 갈아 주고 팁을 거절한 뒤, 집에 보내려던 편지를 찢어 버립니다. 이튿날 백화점 양말 매장에서 주급 10달러 일자리를 얻습니다.',
    scenes: [
      {
        role: 'jimmy',
        situation: 'On Erie Street at night you have just changed a punctured wheel for a well-dressed young woman. Seeing your worn shoes, she holds out a banknote.',
        situationKo: '밤에 이리 거리에서 잘 차려입은 젊은 여성의 펑크 난 바퀴를 갈아 주었습니다. 낡은 구두를 본 그녀가 지폐를 내밉니다.',
        speaker: 'The young woman', line: 'Thank you so much. Please — take this for your trouble.',
        prompt: 'Decline the money politely; say you were glad to help.',
        promptKo: '돈을 정중히 거절하고, 기꺼이 도운 것이라고 말하세요.',
        answers: [{ all: ['not'], any: ['accept', 'take', 'necessary', 'need'] }, { any: ['glad to help', 'happy to help', 'my pleasure', 'no need', 'no trouble'] }],
        model: "That's very kind of you, but I couldn't accept it. I was glad to help.",
        distractors: ['Thank you. Twenty dollars would be about right for a new casing.', 'Keep it; I will send the bill to your father next week.', 'Actually, I would prefer a job to a tip.'],
        hints: ['Thank her, refuse, and say why.', 'Key words: could not accept / glad to help'],
        hintsKo: ['감사를 표하고, 거절하고, 이유를 말하세요.', '핵심 표현: could not accept / glad to help'],
        reply: { speaker: 'Narrator', line: 'She drove away. You stood on the kerb, then slowly tore up the letter to your father and dropped the pieces into the gutter. Tomorrow you would land a job.' }
      },
      {
        role: 'jimmy',
        situation: 'You are being interviewed by the hosiery buyer of a large department store. The job pays ten dollars a week, and you need it badly.',
        situationKo: '큰 백화점의 양말 매장 구매 담당자와 면접 중입니다. 주급 10달러짜리 일이지만 절실합니다.',
        speaker: 'The buyer', line: 'What experience have you had with ladies\' hosiery?',
        prompt: 'Give a confident answer about your selling experience and say you can start right away.',
        promptKo: '판매 경험을 자신 있게 말하고, 바로 시작할 수 있다고 하세요.',
        answers: [{ any: ['sold', 'sales', 'selling', 'sell', 'customers'] }, { all: ['experience'], any: ['years', 'business', 'own'] }],
        model: "I've had several years of selling experience, both in the West and in the East, and I can start right away.",
        distractors: ['None at all, but I am a college graduate, so it should be easy.', 'I would rather work in automobile accessories, if you have an opening.', 'I have never worn ladies\' hosiery, if that is what you mean.'],
        hints: ['Talk about selling, not stockings.', 'Key words: selling experience / start right away'],
        hintsKo: ['양말이 아니라 판매 이야기를 하세요.', '핵심 표현: selling experience / start right away'],
        reply: { speaker: 'The buyer', line: 'Good. We will try you in the new section of the hosiery department. You will be the only man there.' }
      },
      {
        role: 'jimmy',
        situation: 'A month has passed. You sell more hosiery than anyone, but you loathe the work and dread being recognised behind the counter. You decide to ask the buyer for a transfer.',
        situationKo: '한 달이 지났습니다. 누구보다 양말을 많이 팔지만 일이 싫고, 카운터 뒤에서 아는 사람을 만날까 두렵습니다. 부서 이동을 요청하기로 합니다.',
        speaker: 'The buyer', line: 'Your sales figures are excellent, Mr. Torrance. What can I do for you?',
        prompt: 'Request a transfer to another department — automobile accessories, for instance — where you could be more useful.',
        promptKo: '다른 부서, 예를 들어 자동차 용품 매장으로 옮겨 달라고 요청하세요. 거기서 더 쓸모 있을 거라고요.',
        answers: [{ any: ['transfer', 'move', 'reassign', 'switch'] }, { all: ['department'], any: ['another', 'different', 'accessories', 'automobile'] }],
        model: "I'd like to request a transfer to the automobile accessories department, where I think I could be more useful.",
        distractors: ["I'd like a raise. Ten dollars a week is not enough to live on.", 'Could I take my lunch hour at eleven instead of twelve?', 'I think we should stop selling hosiery to men altogether.'],
        hints: ['Ask to move, and name where.', 'Key words: transfer / department'],
        hintsKo: ['옮겨 달라고 하고, 어디로 갈지 말하세요.', '핵심 단어: transfer / department'],
        reply: { speaker: 'The buyer', line: 'I am afraid not. Your record in hosiery is far too good for me to let you go.' }
      }
    ]
  },
  {
    num: 6, title: 'Harold Plays the Raven', ko: '해럴드의 불길한 예언',
    summary: 'Mason Compton cannot understand why record sales bring smaller profits, and asks his future son-in-law Harold Bince to explain. Bince quietly tells Elizabeth her father is overworked and should travel for a year.',
    summaryKo: '메이슨 컴프턴은 최고 매출에도 이익이 줄어드는 이유를 알 수 없어 예비 사위 해럴드 빈스에게 설명을 요구합니다. 빈스는 엘리자베스에게 아버지가 과로했으니 1년쯤 여행을 보내야 한다고 은근히 말합니다.',
    scenes: [
      {
        role: 'compton',
        situation: 'You sit in your private office at the International Machine Company comparing this August\'s cost statement with last year\'s. Sales were never better, yet profits are down. You have called in Harold Bince, your assistant manager.',
        situationKo: '인터내셔널 기계회사 사장실에서 올해 8월과 작년 8월의 원가 명세서를 비교하고 있습니다. 매출은 최고인데 이익은 줄었습니다. 부지배인 해럴드 빈스를 불렀습니다.',
        speaker: 'Harold Bince', line: 'You wanted to see me, sir?',
        prompt: 'Point out that costs have risen out of all proportion to the business you did, and ask him to account for it.',
        promptKo: '원가가 매출에 비해 지나치게 늘었다고 지적하고, 그 이유를 설명해 보라고 하세요.',
        answers: [{ all: ['costs'], any: ['explain', 'account', 'why', 'how', 'reason'] }, { any: ['walk me through', 'break down', 'break it down'] }],
        model: 'Our costs have increased out of all proportion to the volume of business, Harold. How do you account for it?',
        distractors: ['Congratulations, Harold. This was our most profitable month ever.', 'Let us raise our prices again next month and forget about it.', 'I have decided to retire on Friday and leave everything to you.'],
        hints: ['State the problem in numbers, then ask for the reason.', 'Key words: costs / account for it'],
        hintsKo: ['문제를 숫자로 말한 뒤, 이유를 물으세요.', '핵심 표현: costs / account for it'],
        reply: { speaker: 'Harold Bince', line: 'Principally the increased cost of labour, sir. Every manufacturer in the country is in the same plight.' }
      },
      {
        role: 'compton',
        situation: 'Bince has blamed labour costs, but you raised your prices to cover that. You want to hand him the whole business one day, but you must be sure he can run it.',
        situationKo: '빈스는 인건비 탓을 하지만, 그만큼 가격을 올려 두었습니다. 언젠가 회사 전체를 그에게 맡기고 싶지만, 그가 경영할 수 있다는 확신이 필요합니다.',
        speaker: 'Harold Bince', line: 'I think I have reached a point now where I pretty thoroughly grasp the requirements of my work, sir.',
        prompt: 'Tell him you want to turn over the management to him, but you cannot while profits are shrinking. Ask him to find out what these figures mean.',
        promptKo: '경영을 맡기고 싶지만 이익이 줄어드는 동안은 그럴 수 없다고 말하세요. 이 숫자들이 무엇을 뜻하는지 알아내라고 하세요.',
        answers: [{ all: ['profits'], any: ['cannot', 'not', 'until', 'while', 'before'] }, { any: ['find out', 'figure out', 'get to the bottom', 'look into', 'what they mean'] }],
        model: "I want to turn the whole management over to you, Harold, but I can't while profits are shrinking. These figures mean something — find out what.",
        distractors: ['The figures do not matter, Harold. What matters is that Elizabeth is happy.', 'I will hire a new assistant manager on Monday.', 'Let us stop advancing prices; the customers are complaining.'],
        hints: ['Encouragement plus a condition plus a task.', 'Key words: profits / find out'],
        hintsKo: ['격려 + 조건 + 과제.', '핵심 표현: profits / find out'],
        reply: { speaker: 'Harold Bince', line: 'I will do my best, sir. From now on you will note a decided change for the better on the right side of the ledger.' }
      },
      {
        role: 'elizabeth',
        situation: 'You came to the works to ask your father for shopping money. In his own office Harold has taken you aside and, very seriously, told you your father is on the verge of a nervous breakdown and must travel for a year.',
        situationKo: '용돈을 받으러 아버지 회사에 들렀습니다. 해럴드가 자기 사무실로 데려가더니, 아버지가 신경쇠약 직전이니 1년쯤 여행을 떠나야 한다고 매우 심각하게 말합니다.',
        speaker: 'Harold Bince', line: 'You are the only person who can influence him, Elizabeth. Something ought to be done, and done at once.',
        prompt: 'Respond cautiously: say you will talk to your father, but you would like him to see Dr. Earle first.',
        promptKo: '신중하게 대답하세요. 아버지와 이야기해 보겠지만, 먼저 얼 박사에게 진찰을 받게 하고 싶다고요.',
        answers: [{ any: ['doctor', 'physician', 'dr', 'earle', 'specialist'] }, { all: ['talk'], any: ['him', 'father'] }],
        model: "I'll talk to him, Harold, but first I'd like him to see Dr. Earle.",
        distractors: ['You are right. I will book two tickets to Japan tonight.', 'Father is perfectly well. Please never mention it again.', 'Perhaps you should take the trip yourself, Harold.'],
        hints: ['Agree to act, but insist on a professional opinion.', 'Key words: talk to him / doctor'],
        hintsKo: ['행동은 하되, 전문가 의견을 고집하세요.', '핵심 표현: talk to him / doctor'],
        reply: { speaker: 'Harold Bince', line: "I don't believe a doctor is what he needs. What he needs is a long rest, entirely free from any thought of business." }
      }
    ]
  },
  {
    num: 7, title: 'Jobless Again', ko: '다시 실직',
    summary: 'The girl from Erie Street appears at Jimmy\'s counter. Ashamed to be seen selling stockings, he quits on the spot and refuses a raise. Soon his watch, ring and clothes are gone and the rent is overdue.',
    summaryKo: '이리 거리의 그 여성이 지미의 카운터에 나타납니다. 양말 파는 모습을 보인 것이 부끄러워 그 자리에서 그만두고, 급여 인상도 거절합니다. 곧 시계와 반지, 옷까지 사라지고 방세는 밀립니다.',
    scenes: [
      {
        role: 'jimmy',
        situation: 'Elizabeth has just left your counter without recognising you. The humiliation of being a stocking clerk is suddenly unbearable. You march to the buyer\'s desk. In the book you simply blurt "I am going to quit" — but there is a better way to do it.',
        situationKo: '엘리자베스가 당신을 알아보지 못한 채 카운터를 떠났습니다. 양말 점원 신세가 갑자기 참을 수 없이 부끄럽습니다. 구매 담당자 책상으로 갑니다. 원작에서는 "그만두겠다"고 불쑥 말하지만, 더 나은 방법이 있습니다.',
        speaker: 'The buyer', line: 'Why, what\'s wrong? Isn\'t everything perfectly satisfactory? You have never complained to me.',
        prompt: 'Give notice politely: say you have decided to leave to pursue a different line of work, and thank him for the opportunity.',
        promptKo: '정중하게 사직 의사를 밝히세요. 다른 분야의 일을 하려고 그만두기로 했다고 말하고, 기회를 준 데 감사하세요.',
        answers: [{ any: ['resign', 'give notice', 'my notice', 'move on', 'decided to leave', 'leaving'] }],
        model: "I've decided to resign to pursue a different line of work. Thank you for the opportunity you gave me here.",
        distractors: ["I quit! I wouldn't sell another sock if you paid me ten thousand a year.", 'Nothing is wrong. I just came to ask for Saturday off.', 'Everything is fine. Could you move me to the morning shift?'],
        hints: ['Say you are leaving, why, and thank him.', 'Key words: resign / thank you'],
        hintsKo: ['떠난다는 것, 이유, 감사를 말하세요.', '핵심 표현: resign / thank you'],
        reply: { speaker: 'The buyer', line: 'Ah. With our competitor, I suppose? If an increase in salary would influence you, I had intended to make it fifteen dollars next week.' }
      },
      {
        role: 'jimmy',
        situation: 'The buyer has just offered you a raise to fifteen dollars a week to stay. Your mind is made up, but you want to leave on good terms so that you can use the store as a reference.',
        situationKo: '구매 담당자가 남으면 주급을 15달러로 올려 주겠다고 합니다. 마음은 정해졌지만, 추천서를 받을 수 있게 좋게 헤어지고 싶습니다.',
        speaker: 'The buyer', line: 'Fifteen dollars, beginning next week. Surely that changes things?',
        prompt: 'Decline the counter-offer graciously but firmly: your decision is not about money, and you would like to leave on good terms.',
        promptKo: '역제안을 정중하지만 단호하게 거절하세요. 돈 때문에 그만두는 게 아니며, 좋은 관계로 떠나고 싶다고요.',
        answers: [{ all: ['not'], any: ['money', 'salary', 'about the', 'pay'] }, { any: ['good terms', 'appreciate the offer', 'thank you for the offer', 'decision is final', 'made up my mind'] }],
        model: "I appreciate the offer, but my decision isn't about money. I'd still like to leave on good terms.",
        distractors: ['Fifteen? Make it twenty and I will stay another year.', 'I accept. When does the new salary start?', 'You should have offered that a month ago; now it is too late.'],
        hints: ['Thank him, explain it is not the pay, keep the relationship.', 'Key words: not about money / good terms'],
        hintsKo: ['감사하고, 급여 문제가 아니라고 설명하고, 관계를 지키세요.', '핵심 표현: not about money / good terms'],
        reply: { speaker: 'The buyer', line: 'Very well. I am sorry to lose you, Mr. Torrance. Collect your pay at the cashier\'s window.' }
      },
      {
        role: 'jimmy',
        situation: 'Weeks later you are jobless and a week behind with the rent. It is Saturday, and the landlady of the Indiana Avenue rooming house is waiting for you at the door.',
        situationKo: '몇 주 뒤, 일자리도 없고 방세는 한 주 밀렸습니다. 토요일, 인디애나 거리 하숙집 주인이 문 앞에서 당신을 기다리고 있습니다.',
        speaker: 'The landlady', line: 'There is a nice young man wanting your room. I shall have to have it tonight unless you can pay up.',
        prompt: 'Ask for a short extension, and promise a definite day when you will pay the full amount.',
        promptKo: '짧은 유예를 부탁하고, 전액을 낼 날짜를 확실히 약속하세요.',
        answers: [{ any: ['saturday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'extension', 'few more days', 'one more week', 'until', 'by next'] }, { all: ['pay'], any: ['then', 'full', 'everything'] }],
        model: "Could you give me until next Saturday? I'll pay the full amount then, I promise.",
        distractors: ['The room is too small anyway. I am moving out tonight.', 'Rent is not my problem; write to my father in Nebraska.', 'Give the room to the nice young man. I will sleep in the park.'],
        hints: ['Name a date and a promise.', 'Key words: until / pay the full amount'],
        hintsKo: ['날짜와 약속을 말하세요.', '핵심 표현: until / pay the full amount'],
        reply: { speaker: 'The landlady', line: 'Next Saturday, then, and not a day later.' }
      }
    ]
  },
  {
    num: 8, title: 'Bread from the Waters', ko: '되돌아온 빵',
    summary: 'Starving, Jimmy trades his good suit for a shabby one and two dollars. The Lizard, who rooms in the same house, offers him thirty per cent of a safe robbery. Jimmy refuses, and the Lizard promises to find him honest work instead.',
    summaryKo: '굶주린 지미는 좋은 양복을 허름한 옷과 2달러에 바꿉니다. 같은 하숙집에 사는 리저드가 금고 털이 수익의 30%를 제안하지만, 지미는 거절하고 리저드는 대신 정직한 일자리를 찾아 주겠다고 합니다.',
    scenes: [
      {
        role: 'jimmy',
        situation: 'You have not eaten since yesterday. Next to a cheap restaurant is a shop with a sign "Clothes Bought and Sold". Your wrinkled suit is far better than anything in the window.',
        situationKo: '어제부터 아무것도 먹지 못했습니다. 싸구려 식당 옆에 "옷 삽니다·팝니다" 간판을 단 가게가 있습니다. 구겨졌어도 당신의 양복은 진열창의 어떤 옷보다 훨씬 좋습니다.',
        speaker: 'The shopkeeper', line: 'Buying or selling, young man?',
        prompt: 'Propose a trade: your suit for one of his cheaper ones, with the difference paid to you in cash.',
        promptKo: '거래를 제안하세요. 당신 양복을 그의 싼 양복과 바꾸고, 차액은 현금으로 달라고요.',
        answers: [{ any: ['trade', 'swap', 'exchange'] }, { all: ['difference'] }],
        model: "I'll trade you this suit for one of those, if you pay me the difference in cash.",
        distractors: ['How much for that suit in the window? I will pay you next week.', 'Could you press my suit while I wait?', 'I would like to donate these clothes to the poor.'],
        hints: ['Offer an exchange and name what you want on top.', 'Key words: trade / difference in cash'],
        hintsKo: ['교환을 제안하고, 덤으로 원하는 것을 말하세요.', '핵심 표현: trade / difference in cash'],
        reply: { speaker: 'Narrator', line: 'Twenty minutes later you walked out in a shabby suit of hand-me-downs — with two silver dollars in your pocket and, soon, a full stomach.' }
      },
      {
        role: 'jimmy',
        situation: 'On the stairs you meet the Lizard, who rooms in the same house. In your room he offers you a part in tomorrow night\'s job: fifty thousand dollars, split thirty-seventy. You would only have to keep watch.',
        situationKo: '계단에서 같은 하숙집에 사는 리저드를 만납니다. 그는 내일 밤 일에 끼라고 합니다. 5만 달러를 30 대 70으로 나누고, 당신은 망만 보면 된답니다.',
        speaker: 'The Lizard', line: 'It ought to be something good. I been working on it for three months. Well, bo?',
        prompt: 'Decline firmly, without preaching at him: you will not be part of it, but you are not judging him.',
        promptKo: '설교하지 말고 단호히 거절하세요. 함께하지는 않겠지만, 그를 비난하는 것도 아니라고요.',
        answers: [{ all: ['not'], any: ['part of', 'join', 'do it', 'count me', 'go along', 'in on'] }, { any: ['nothing doing', 'no thanks', 'no thank you', 'decline', 'have to pass'] }],
        model: "Nothing doing, old top. I won't judge you for it, but I can't be part of it.",
        distractors: ["I'm in. When do we start, and what is my share?", 'Only thirty per cent? Make it fifty and we have a deal.', 'I will think about it and let you know tomorrow night.'],
        hints: ['A clear no, with respect.', 'Key words: nothing doing / not part of it'],
        hintsKo: ['존중을 담은 분명한 거절.', '핵심 표현: nothing doing / not part of it'],
        reply: { speaker: 'The Lizard', line: 'I get you. I had a hunch you would turn me down, and I\'m glad you did. Now, what you want is a job.' }
      },
      {
        role: 'jimmy',
        situation: 'The Lizard says he can probably get you a job if you are not too particular, and he pushes twenty dollars across the table, calling it the money you "loaned" him.',
        situationKo: '리저드는 너무 가리지만 않으면 일자리를 구해 줄 수 있다고 하며, 당신이 "빌려준" 돈이라며 20달러를 탁자 너머로 밀어 줍니다.',
        speaker: 'The Lizard', line: 'I can probably get you one if you ain\'t too particular. What kind of a job will you take?',
        prompt: 'Tell him you would be grateful for any honest job — anything you can do and still look a policeman in the face.',
        promptKo: '정직한 일이라면 무엇이든 고맙다고 말하세요. 경찰관 얼굴을 똑바로 볼 수 있는 일이면 된다고요.',
        answers: [{ all: ['honest'] }, { any: ['any job', 'anything', 'any work', 'any kind'] }, { all: ['grateful'] }],
        model: "I'd be grateful for any honest job — anything I can do and still look a policeman in the face.",
        distractors: ['Only a management position, please. I have a diploma.', 'No thanks. I would rather starve than take help from a thief.', 'Find me something on the North Side, near my friends.'],
        hints: ['Be open, with one condition.', 'Key words: any / honest'],
        hintsKo: ['열린 태도, 조건은 하나.', '핵심 단어: any / honest'],
        reply: { speaker: 'The Lizard', line: 'All right. When I come back I\'ll bring you a job of some sort. Take the twenty — don\'t be a damn fool.' }
      }
    ]
  },
  {
    num: 9, title: 'Harold Sits in a Game', ko: '해럴드, 도박판에 앉다',
    summary: 'Compton laughs off the idea that he needs a rest. Bince loses five thousand dollars at cards and begs a creditor for more time. At two in the morning the Lizard brings Jimmy a job: waiter at Feinheimer\'s Cabaret.',
    summaryKo: '컴프턴은 휴양이 필요하다는 말을 웃어넘깁니다. 빈스는 카드 게임에서 5천 달러를 잃고 채권자에게 시간을 달라고 사정합니다. 새벽 두 시, 리저드가 지미에게 파인하이머 카바레의 웨이터 자리를 가져옵니다.',
    scenes: [
      {
        role: 'compton',
        situation: 'Your daughter has come to you, worried, suggesting a year\'s trip to the Orient for your health. You have never felt better, and you know exactly who put the idea into her head.',
        situationKo: '딸이 걱정스러운 얼굴로 건강을 위해 1년쯤 동양 여행을 떠나라고 합니다. 당신은 더없이 건강하고, 누가 그 생각을 딸에게 심었는지도 압니다.',
        speaker: 'Elizabeth', line: 'Couldn\'t Harold run the business now, Father? Then you could go.',
        prompt: 'Decline kindly. Say you will travel as soon as you are convinced Harold can take your place — perhaps in another year.',
        promptKo: '부드럽게 거절하세요. 해럴드가 당신 자리를 맡을 수 있다고 확신이 서면, 아마 1년쯤 뒤에 여행하겠다고요.',
        answers: [{ any: ['as soon as', 'when', 'once', 'another year', 'next year', 'in a year'] }, { all: ['not'], any: ['ready', 'yet', 'convinced', 'sure'] }],
        model: "I've never felt better, my dear. I'll travel as soon as I'm convinced Harold can take my place — perhaps in another year.",
        distractors: ['You are right, Elizabeth. I will sail for Japan on Monday.', 'I am dying, child. Fetch the doctor immediately.', 'Harold has been running the business for months already.'],
        hints: ['Say no for now, and set a condition.', 'Key words: as soon as / another year'],
        hintsKo: ['지금은 안 된다고 하고, 조건을 말하세요.', '핵심 표현: as soon as / another year'],
        reply: { speaker: 'Elizabeth', line: 'Very well, Father. But Harold will be disappointed. He seems to take it terribly to heart.' }
      },
      {
        role: 'bince',
        situation: 'It is two in the morning at your club. You have lost five thousand dollars tonight, and every man at the table holds your I.O.U.s. Now Harry has followed you to the buffet.',
        situationKo: '새벽 두 시, 클럽입니다. 오늘 밤 5천 달러를 잃었고, 테이블의 모두가 당신의 차용증을 쥐고 있습니다. 해리가 뷔페까지 따라왔습니다.',
        speaker: 'Harry', line: 'I hate to seem insistent, old man, but I have got to have some money. If you haven\'t got it, Mason Compton has.',
        prompt: 'Ask him for a little more time, and offer a partial payment now with the rest later.',
        promptKo: '시간을 조금만 더 달라고 하고, 지금 일부를 갚고 나머지는 나중에 갚겠다고 제안하세요.',
        answers: [{ any: ['little longer', 'more time', 'extension', 'few more', 'bit longer'] }, { any: ['part of it', 'partial', 'instalment', 'installment', 'half now', 'something now', 'rest later', 'rest after'] }],
        model: "Give me a little longer, Harry. I can pay you part of it next week and the rest after the wedding.",
        distractors: ['Go to Mr. Compton, then. He will be delighted to pay my debts.', 'I never signed those papers. You are all cheating me.', 'Deal me in again tonight; my luck has to change.'],
        hints: ['Buy time by offering something concrete.', 'Key words: a little longer / part of it'],
        hintsKo: ['구체적인 것을 제시해 시간을 버세요.', '핵심 표현: a little longer / part of it'],
        reply: { speaker: 'Harry', line: 'Well, I don\'t want to be nasty. A little longer, then — but I need it badly.' }
      },
      {
        role: 'jimmy',
        situation: 'A tap on your door at two in the morning. It is the Lizard, grinning: he has found you a job, though he warns you may not like it. It is waiting on tables at Feinheimer\'s Cabaret, a basement place on Wells Street.',
        situationKo: '새벽 두 시에 누군가 문을 두드립니다. 리저드가 씩 웃으며 일자리를 구했다고, 다만 마음에 안 들지도 모른다고 합니다. 웰스 거리 지하에 있는 파인하이머 카바레의 웨이터 자리입니다.',
        speaker: 'The Lizard', line: 'Waiter. You get the union scale, and there\'s tips. Well?',
        prompt: 'Accept the job, and ask when you start and whom you should see.',
        promptKo: '일자리를 받아들이고, 언제 시작하는지, 누구를 찾아가야 하는지 물으세요.',
        answers: [{ any: ['when do i start', 'who do i see', 'whom do i see', 'who should i', 'whom should i', 'when can i start'] }, { all: ['take it'] }, { all: ['start'], any: ['see', 'ask for', 'report'] }],
        model: "I'll take it. When do I start, and who do I see about it?",
        distractors: ['A waiter? That is beneath a college man. Find me something better.', "Is Feinheimer's the place with the cabaret? I refuse to work in a cabaret.", 'Come back in the morning; I do not do business at two o\'clock.'],
        hints: ['Say yes, then get the practical details.', 'Key words: take it / when do I start'],
        hintsKo: ['수락한 뒤, 실무적인 정보를 얻으세요.', '핵심 표현: take it / when do I start'],
        reply: { speaker: 'The Lizard', line: 'Go around and see Feinheimer to-morrow morning. He will put you right to work.' }
      }
    ]
  },
  {
    num: 10, title: 'At Feinheimer\'s', ko: '파인하이머 식당에서',
    summary: 'Jimmy serves business men at noon and the underworld at night. He comes to know the loud labour leader Steve Murray, and Little Eva, a girl who eats her breakfast at four in the afternoon and likes him because he treats her with respect.',
    summaryKo: '지미는 낮에는 사업가들을, 밤에는 뒷골목 사람들을 접대합니다. 시끄러운 노동계 거물 스티브 머리와, 오후 네 시에 아침을 먹는 소녀 리틀 이바를 알게 됩니다. 이바는 자신을 존중해 주는 지미를 좋아합니다.',
    scenes: [
      {
        role: 'jimmy',
        situation: 'Little Eva, a regular, is eating her four o\'clock breakfast at your table. She has been studying you for days and finally asks the question you dread.',
        situationKo: '단골인 리틀 이바가 당신 테이블에서 오후 네 시의 아침을 먹고 있습니다. 며칠째 당신을 살펴보더니, 마침내 피하고 싶던 질문을 합니다.',
        speaker: 'Little Eva', line: 'You\'re a funny guy. I can\'t quite figure you out. What are you doing here, anyway?',
        prompt: 'Deflect the personal question gracefully: you are just doing your job as well as you can — and ask if you can get her anything else.',
        promptKo: '사적인 질문을 부드럽게 비켜 가세요. 그저 맡은 일을 최선을 다해 하는 중이라고 하고, 더 필요한 것이 있는지 물으세요.',
        answers: [{ any: ['my job', 'doing my job', 'my work', 'best i can'] }, { any: ['anything else', 'can i get you', 'may i get you', 'something else'] }],
        model: "I'm just here doing my job as well as I can. Is there anything else I can get you?",
        distractors: ['That is none of your business, miss.', 'I am a college graduate who failed at everything else.', 'I am waiting for a rich customer to notice me.'],
        hints: ['Stay professional and turn it back to service.', 'Key words: my job / anything else'],
        hintsKo: ['프로답게, 다시 서비스 이야기로 돌리세요.', '핵심 표현: my job / anything else'],
        reply: { speaker: 'Little Eva', line: 'Oh, go on. I wasn\'t rubbering. I was just sort of interested in you.' }
      },
      {
        role: 'jimmy',
        situation: 'Filling her water glass, you hear Eva say, with a catch in her voice, that you wait on her just the same as you would on a decent girl. For a moment you do not know what to say.',
        situationKo: '물잔을 채워 주는데, 이바가 목이 메는 소리로 당신이 자기를 "제대로 된 아가씨"에게 하듯 대해 준다고 말합니다. 잠시 할 말을 잃습니다.',
        speaker: 'Little Eva', line: 'I like you, kid. You\'re not fresh. You know what I am as well as the rest of them.',
        prompt: 'Reply with respect: every customer at your table gets the same service, and she has always been kind to you.',
        promptKo: '존중을 담아 대답하세요. 당신 테이블의 손님은 누구나 같은 서비스를 받으며, 그녀는 늘 친절했다고요.',
        answers: [{ all: ['same'], any: ['service', 'treat', 'everyone', 'customer', 'way'] }, { any: ['respect', 'every customer', 'everyone'] }],
        model: "Every customer at my table gets the same service — and you've always been kind to me.",
        distractors: ['Well, the tips here are terrible, so I have to be nice.', 'Feinheimer told me to be polite to the regulars.', 'I did not know what you were, actually.'],
        hints: ['Equal treatment, said simply.', 'Key words: same service / every customer'],
        hintsKo: ['공평한 대우를 담백하게.', '핵심 표현: same service / every customer'],
        reply: { speaker: 'Narrator', line: 'Before she could answer, her eyes went past you. "Look who\'s here!" It was the Lizard, come in to give you the once-over.' }
      }
    ]
  },
  {
    num: 11, title: 'Christmas Eve', ko: '크리스마스 이브',
    summary: 'Elizabeth and Harriet dare each other to dine unescorted at Feinheimer\'s. Steve Murray drags Elizabeth onto his lap; Jimmy knocks him out cold, and Feinheimer fires him for beating up his best customer.',
    summaryKo: '엘리자베스와 해리엇은 남자 동행 없이 파인하이머 식당에서 식사하자고 서로 부추깁니다. 스티브 머리가 엘리자베스를 무릎에 끌어앉히자 지미가 그를 때려눕히고, 파인하이머는 최고의 단골을 때렸다며 지미를 해고합니다.',
    scenes: [
      {
        role: 'jimmy',
        situation: 'It is Christmas Eve at Feinheimer\'s, packed and noisy. Two unescorted women have taken your fourth table. When you lay the menu before them you nearly gasp: it is Elizabeth, and her friend.',
        situationKo: '크리스마스 이브의 파인하이머 식당, 시끄럽고 붐빕니다. 동행 없는 두 여성이 네 번째 테이블에 앉았습니다. 메뉴를 내밀다 숨이 멎을 뻔합니다. 엘리자베스와 그 친구입니다.',
        speaker: 'Elizabeth', line: 'What shall we take? What have you that\'s good?',
        prompt: 'Stay the perfect waiter. Recommend a dish and mention what is popular tonight.',
        promptKo: '완벽한 웨이터로 남으세요. 요리를 추천하고 오늘 밤 인기 있는 메뉴를 말하세요.',
        answers: [{ any: ['recommend', 'suggest', 'popular', 'special', 'speciality', 'specialty', 'may i'] }],
        model: "Good evening. I'd recommend the roast chicken tonight, and the oyster stew is very popular.",
        distractors: ['Ladies, you should not be in a place like this without an escort.', 'Miss Compton! What a surprise to see you here.', 'Everything on the menu is terrible, honestly.'],
        hints: ['Serve, do not react.', 'Key words: recommend / popular'],
        hintsKo: ['반응하지 말고 응대하세요.', '핵심 단어: recommend / popular'],
        reply: { speaker: 'Narrator', line: 'You took the order without a flicker. Elizabeth had recognised you at once, but not even an eyelid moved — it meant no more to her than seeing the same street-sweeper twice.' }
      },
      {
        role: 'jimmy',
        situation: 'You come out of the kitchen with a loaded tray to see Steve Murray, the huge labour leader, pull Elizabeth down onto his lap while she struggles. The tray crashes to the floor.',
        situationKo: '음식이 가득한 쟁반을 들고 주방에서 나오니, 거구의 노동계 거물 스티브 머리가 몸부림치는 엘리자베스를 무릎에 끌어앉히고 있습니다. 쟁반이 바닥에 떨어집니다.',
        speaker: 'Steve Murray', line: 'Come on, kiddo, let\'s be friends. Any girl in this place belongs to me if I want her!',
        prompt: 'Intervene firmly and in control: tell Murray that is enough and to let the lady go.',
        promptKo: '단호하고 침착하게 끼어드세요. 머리에게 그만하라고, 숙녀를 놓아주라고 하세요.',
        answers: [{ any: ['enough', 'stop', 'cut it', 'let her go', 'let the lady go', 'let go', 'hands off', 'leave her', 'release'] }],
        model: "That's enough, Murray. Let the lady go — she isn't your sort.",
        distractors: ['Mr. Murray, another bottle of wine for your table?', 'Ladies, please pay your bill before the fight starts.', 'Sir, I will fetch the manager to settle this.'],
        hints: ['Short, firm, no insult.', 'Key words: enough / let her go'],
        hintsKo: ['짧고 단호하게, 모욕은 없이.', '핵심 표현: enough / let her go'],
        reply: { speaker: 'Narrator', line: 'Murray rushed you like a mad bull. You ducked his clumsy left, hooked a right to his jaw, and a moment later the big man crashed to the floor.' }
      },
      {
        role: 'jimmy',
        situation: 'The girls have fled with their chauffeur. Feinheimer, purple with rage, pushes through the crowd. Murray is his best customer — and, rumour says, his financial backer.',
        situationKo: '두 여성은 운전사와 함께 빠져나갔습니다. 파인하이머가 얼굴이 시뻘게져서 인파를 헤치고 옵니다. 머리는 그의 최고 단골이자, 소문으로는 자금줄입니다.',
        speaker: 'Feinheimer', line: 'What you think I hire you for? To beat up my best customer? Take off your apron and get your time!',
        prompt: 'Explain calmly that you were protecting a customer from assault. If he is letting you go, say you will take your pay now.',
        promptKo: '손님이 폭행당하는 것을 막았을 뿐이라고 차분히 설명하세요. 해고한다면 지금 급여를 받아 가겠다고 하세요.',
        answers: [{ any: ['protect', 'protecting', 'protected', 'defend', 'defending', 'defended', 'assault', 'assaulted'] }, { any: ['my pay', 'my wages', 'my time', 'my check', 'what you owe'] }],
        model: "I was protecting a customer from being assaulted, Mr. Feinheimer. If you're letting me go, I'll take my pay now.",
        distractors: ['Murray started it, so you should fire him instead of me.', 'Fine. I will wait for Mr. Murray outside and finish the job.', 'I am sorry. I promise it will never happen again.'],
        hints: ['State the reason without apology, then the practical matter.', 'Key words: protecting a customer / my pay'],
        hintsKo: ['사과 없이 이유를 말하고, 실무적인 문제로.', '핵심 표현: protecting a customer / my pay'],
        reply: { speaker: 'Little Eva', line: 'He got what was coming to him. I didn\'t think anybody could do that to Murray. Lord, but it was pretty.' }
      }
    ]
  },
  {
    num: 12, title: 'Up or Down?', ko: '승진일까 강등일까?',
    summary: 'Two men who saw the fight hire Jimmy as a sparring partner for Young Brophy, whose coming fight is fixed. When Brophy floors him without the agreed signal in front of Elizabeth, Jimmy knocks him out and wrecks the whole scheme.',
    summaryKo: '싸움을 본 두 남자가 지미를 영 브로피의 스파링 파트너로 고용합니다. 브로피의 경기는 승부 조작이 되어 있습니다. 엘리자베스가 보는 앞에서 브로피가 약속된 신호 없이 지미를 쓰러뜨리자, 지미는 그를 KO시켜 계획 전체를 망칩니다.',
    scenes: [
      {
        role: 'jimmy',
        situation: 'You have just collected your last pay from Feinheimer. Two men who watched you handle Murray stop you at the door with a proposition.',
        situationKo: '파인하이머에게서 마지막 급여를 받았습니다. 머리를 상대하는 것을 지켜본 두 남자가 문 앞에서 제안을 합니다.',
        speaker: 'A manager', line: 'You handle your mitts like you been there before. How\'d you like a job as one of Brophy\'s sparring partners?',
        prompt: 'Show interest, and ask what it pays and what the terms are.',
        promptKo: '관심을 보이고, 보수가 얼마인지, 조건은 어떤지 물으세요.',
        answers: [{ any: ['pay', 'pays', 'salary', 'wages', 'terms', 'conditions', 'how much', 'what is in it', 'what would i get'] }],
        model: "I wouldn't mind. What does it pay, and what are the terms?",
        distractors: ['No, I have decided to give up boxing forever.', 'Only if I can fight Brophy himself for the title.', 'I would rather go back to selling stockings.'],
        hints: ['Interested — but get the numbers.', 'Key words: pay / terms'],
        hintsKo: ['관심은 있지만, 조건을 확인하세요.', '핵심 단어: pay / terms'],
        reply: { speaker: 'A manager', line: 'They named a figure that was entirely satisfactory. "Come over the day after Christmas and we\'ll give you a trial."' }
      },
      {
        role: 'jimmy',
        situation: 'After a few days at the training camp, a fellow sparring partner has explained the whole plan: Brophy will be sold to the papers as unbeatable, and then lie down in the third round while his backers bet on the other man.',
        situationKo: '훈련장에서 며칠을 보내자 동료 스파링 파트너가 계획을 다 설명해 줍니다. 신문에는 브로피가 무적이라고 알린 뒤, 3라운드에서 일부러 쓰러지고 후원자들은 상대에게 돈을 건다는 것입니다.',
        speaker: 'The sparring partner', line: 'I\'m goin\' to put up every cent I can borrow on the other guy. You better do the same.',
        prompt: 'Say it is none of your business, but you will not bet a cent on a crooked fight.',
        promptKo: '당신이 상관할 일은 아니지만, 조작된 경기에는 한 푼도 걸지 않겠다고 말하세요.',
        answers: [{ all: ['not'], any: ['bet', 'betting', 'money', 'cent', 'put up', 'wager'] }, { any: ['crooked', 'fixed', 'dishonest', 'rigged'] }],
        model: "It's none of my business, but I won't put a cent on a crooked fight.",
        distractors: ['Lend me fifty dollars and I will bet it on the other man.', 'Which man should I bet on to make the most money?', 'Great idea. Let us tell the newspapers Brophy is unbeatable.'],
        hints: ['Draw your own line without lecturing.', 'Key words: not / crooked'],
        hintsKo: ['설교하지 말고 자기 원칙을 말하세요.', '핵심 단어: not / crooked'],
        reply: { speaker: 'The sparring partner', line: 'Suit yourself. If the suckers want to lose their money, they\'re about due to lose it anyway.' }
      },
      {
        role: 'jimmy',
        situation: 'Brophy floored you at the end of the second round without giving the agreed cue — in front of Elizabeth and Harriet. In the third round you knocked him through the ropes. Now his manager is screaming at you in the dressing room.',
        situationKo: '브로피가 약속된 신호 없이 2라운드 끝에 당신을 쓰러뜨렸습니다. 엘리자베스와 해리엇이 보는 앞에서요. 3라운드에 당신은 그를 로프 밖으로 날려 버렸습니다. 이제 매니저가 탈의실에서 고함을 지릅니다.',
        speaker: 'Brophy\'s manager', line: 'You\'ve wrecked a scheme that cost thousands! You\'re through here — you understand? Through!',
        prompt: 'Stand your ground: he dropped you without the cue, so you fought back. Say you will take your pay and go.',
        promptKo: '물러서지 마세요. 신호 없이 쓰러뜨렸으니 맞받아친 것이라고 하고, 급여를 받아서 나가겠다고 하세요.',
        answers: [{ any: ['cue', 'signal', 'warning', 'agreed'] }, { any: ['fought back', 'fight back', 'defend', 'hit back'] }, { any: ['my pay', 'my wages', 'what i am owed', 'what i am due'] }],
        model: "He dropped me without the cue, so I fought back. I'll take my pay and go.",
        distractors: ['I am sorry. Please give me another chance next week.', 'Brophy tripped. I barely touched him, honestly.', 'Pay me double and I will lose to him in the real fight.'],
        hints: ['Fact, consequence, exit.', 'Key words: without the cue / my pay'],
        hintsKo: ['사실, 결과, 퇴장.', '핵심 표현: without the cue / my pay'],
        reply: { speaker: 'Narrator', line: 'You got out with difficulty, dodging half a dozen more fights on the way. From the manager down, everyone felt your crime deserved nothing short of capital punishment.' }
      }
    ]
  },
  {
    num: 13, title: 'Harriet Philosophizes', ko: '해리엇의 철학',
    summary: 'The Lizard argues that his trade is as honest as that of many rich men, and Jimmy admits he would trust him with anything. Harriet tells Elizabeth frankly that Harold is not sincere and that Elizabeth does not love him.',
    summaryKo: '리저드는 자기 직업이 부자들의 장사만큼은 정직하다고 주장하고, 지미는 그에게 무엇이든 맡길 수 있다고 인정합니다. 해리엇은 엘리자베스에게 해럴드는 진실하지 않고, 엘리자베스도 그를 사랑하지 않는다고 솔직하게 말합니다.',
    scenes: [
      {
        role: 'jimmy',
        situation: 'Fired again, you sit in the Lizard\'s room. He tells you that with your education and "front" the two of you could pull off the classiest jobs the city has ever seen.',
        situationKo: '또 해고되어 리저드의 방에 앉아 있습니다. 그는 당신의 학력과 "품위"라면 둘이서 이 도시 최고의 한탕을 할 수 있다고 합니다.',
        speaker: 'The Lizard', line: 'Why, with your education and front we two could pull off some of the classiest stuff this burg ever saw.',
        prompt: 'Turn him down with good humour, and tell him honestly that he is the one man in town you would trust with anything you have.',
        promptKo: '유머 있게 거절하고, 그가 이 도시에서 무엇이든 믿고 맡길 수 있는 유일한 사람이라고 솔직히 말하세요.',
        answers: [{ all: ['trust'] }, { any: ['forget it', 'no thanks', 'not interested', 'count me out'] }],
        model: "Forget it, Lizard. But I'll say this: you're the one man in town I'd trust with anything I have.",
        distractors: ['Let us start with the banks on La Salle Street tomorrow.', 'I would never work with a pickpocket, and you know it.', 'How much would my share be for the first job?'],
        hints: ['Refuse the offer, keep the friend.', 'Key words: forget it / trust'],
        hintsKo: ['제안은 거절하고, 친구는 지키세요.', '핵심 표현: forget it / trust'],
        reply: { speaker: 'The Lizard', line: 'Don\'t get it into your head that I\'m tryin\' to drag you from the straight and narrow. I think I like you better the way you are.' }
      },
      {
        role: 'harriet',
        situation: 'You and Elizabeth are talking about the stocking-counter young man who keeps turning up, and about Harold, who has gone about all winter with a grouch. Elizabeth suddenly turns on you.',
        situationKo: '엘리자베스와 함께, 자꾸 마주치는 양말 매장 청년과 겨우내 찌푸린 얼굴로 다니는 해럴드 이야기를 나눕니다. 엘리자베스가 갑자기 당신에게 따집니다.',
        speaker: 'Elizabeth', line: 'You don\'t like Harold. Why is it?',
        prompt: 'Give honest but tactful feedback: you like him for her sake, but you have known him all your life and he has never been sincere.',
        promptKo: '솔직하되 요령 있게 말하세요. 그녀를 위해 그를 좋아하려 하지만, 평생 알아 온 그는 한 번도 진실한 적이 없었다고요.',
        answers: [{ any: ['for your sake'] }, { all: ['not'], any: ['sincere', 'good enough', 'honest', 'genuine'] }, { any: ['never been sincere', 'insincere', 'never sincere'] }],
        model: "I like him for your sake, Elizabeth. But I've known him all my life, and he has never been sincere.",
        distractors: ['I adore Harold. You two are perfect together.', 'I have no opinion about Harold at all.', 'Because he is richer than my father, and I am jealous.'],
        hints: ['Soften first, then say the true thing.', 'Key words: for your sake / not sincere'],
        hintsKo: ['먼저 부드럽게, 그다음 진실을.', '핵심 표현: for your sake / not sincere'],
        reply: { speaker: 'Elizabeth', line: 'How perfectly ridiculous! Do you suppose I would marry a man I didn\'t love?' }
      }
    ]
  },
  {
    num: 14, title: 'In Again — Out Again', ko: '또 취직, 또 실직',
    summary: 'Driving a milk-wagon, Jimmy delivers to the Holden house and meets Harriet and Elizabeth in riding clothes. He refuses both a hundred dollars and help finding a job. Two weeks later a strike ends the job, and the Lizard vanishes after a famous safe robbery.',
    summaryKo: '우유 배달 마차를 몰던 지미는 홀든 저택에 배달을 갔다가 승마복 차림의 해리엇과 엘리자베스를 만납니다. 100달러도, 일자리 소개도 거절합니다. 2주 뒤 파업으로 일자리를 잃고, 리저드는 유명한 금고 털이 사건 뒤 자취를 감춥니다.',
    scenes: [
      {
        role: 'jimmy',
        situation: 'In your white milkman\'s uniform, carrying a tray of bottles, you have run straight into Harriet Holden and Elizabeth in the garden of the Holden house. Harriet stops you.',
        situationKo: '흰 우유 배달원 제복을 입고 병 쟁반을 든 채, 홀든 저택 정원에서 해리엇 홀든과 엘리자베스를 정면으로 마주쳤습니다. 해리엇이 당신을 불러 세웁니다.',
        speaker: 'Harriet Holden', line: 'You never came to the house as I asked you to. We wanted so much to do something to repay you for that night.',
        prompt: 'Explain politely that you could not have accepted anything for it: you only did what anyone should have done.',
        promptKo: '그 일로 무언가를 받을 수는 없었다고 정중히 설명하세요. 누구라도 했을 일을 했을 뿐이라고요.',
        answers: [{ all: ['not'], any: ['accept', 'accepted', 'reward', 'anything', 'payment'] }, { any: ['anyone', 'anybody', 'right thing', 'my duty', 'nothing else'] }],
        model: "I couldn't have accepted anything for that, Miss Holden. I only did what anyone should have done.",
        distractors: ['I was busy. Perhaps I will come next Monday.', 'I did come, but your butler sent me away.', 'I was hoping you would send the money by post.'],
        hints: ['Decline the reward, minimise the deed.', 'Key words: could not accept / anyone'],
        hintsKo: ['보상은 사양하고, 한 일은 낮추어 말하세요.', '핵심 표현: could not accept / anyone'],
        reply: { speaker: 'Harriet Holden', line: 'There were many other men in the place, but you were the only one who came to our help.' }
      },
      {
        role: 'jimmy',
        situation: 'Elizabeth offers you a hundred dollars. Harriet stops her and instead offers to use her family\'s connections to find you a better position. You can feel Elizabeth appraising your cheap cotton uniform.',
        situationKo: '엘리자베스가 100달러를 주겠다고 합니다. 해리엇이 말리며 대신 집안의 인맥으로 더 나은 자리를 찾아 주겠다고 합니다. 엘리자베스가 당신의 싸구려 면 제복을 훑어보는 것이 느껴집니다.',
        speaker: 'Harriet Holden', line: 'We know so many people here. We might help you in some way, if you are not entirely satisfied with your present position.',
        prompt: 'Decline both offers politely, saying you are quite satisfied with your present job.',
        promptKo: '두 제안 모두 정중히 거절하고, 지금 일에 아주 만족한다고 말하세요.',
        answers: [{ any: ['no thank you', 'no thanks', 'kind of you', 'kind but', 'very kind'] }, { all: ['satisfied'] }, { any: ['happy with', 'content with'] }],
        model: "No, thank you. It's kind of you, but I'm quite satisfied with my present position.",
        distractors: ['A hundred dollars? Make it two hundred and we are square.', 'Yes! Could your father get me a job as general manager?', 'This uniform is humiliating. Please get me out of here.'],
        hints: ['Pride, politely expressed.', 'Key words: kind of you / satisfied'],
        hintsKo: ['자존심을 정중하게 표현하세요.', '핵심 표현: kind of you / satisfied'],
        reply: { speaker: 'Narrator', line: 'You touched your cap and went on to your wagon. "What a strange young man," said Harriet. "Unless I am greatly mistaken, that man is a gentleman."' }
      }
    ]
  },
  {
    num: 15, title: 'Little Eva', ko: '리틀 이바',
    summary: 'Coming out of a pawnshop, Jimmy meets Little Eva, who takes him to dinner and finds an advertisement for an efficiency expert at the International Machine Company. On a hunch she presses money on him for a decent suit.',
    summaryKo: '전당포에서 나오던 지미는 리틀 이바를 만납니다. 이바는 저녁을 사 주고, 인터내셔널 기계회사의 효율성 전문가 구인 광고를 찾아냅니다. 예감을 믿고 그녀는 제대로 된 양복을 사라며 돈을 쥐여 줍니다.',
    scenes: [
      {
        role: 'jimmy',
        situation: 'Eva is reading the Help Wanted columns aloud over dinner. She stops at an advertisement and asks a question you can actually answer, because your father once hired one.',
        situationKo: '이바가 저녁을 먹으며 구인 광고를 소리 내어 읽습니다. 한 광고에서 멈추더니, 아버지가 한때 고용한 적이 있어 당신이 실제로 답할 수 있는 질문을 합니다.',
        speaker: 'Little Eva', line: 'What\'s an efficiency expert?',
        prompt: 'Explain simply what an efficiency expert does: comes into a plant from outside to find waste, cut costs and organise the work.',
        promptKo: '효율성 전문가가 하는 일을 쉽게 설명하세요. 외부에서 공장에 들어와 낭비를 찾고, 비용을 줄이고, 일을 체계화하는 사람이라고요.',
        answers: [{ any: ['cost', 'costs', 'waste', 'leaks', 'systematize', 'systematise', 'organize', 'organise', 'reorganize', 'efficient', 'efficiency', 'improve', 'streamline'] }],
        model: "He's someone a company brings in from outside to find waste, cut costs and organise the work better. My father hired one once.",
        distractors: ['He is an accountant who does taxes for factories.', 'He is a lawyer who settles strikes.', 'I have no idea. Let us look at the next advertisement.'],
        hints: ['Define the job by what it produces.', 'Key words: waste / costs / organise'],
        hintsKo: ['그 일이 만들어 내는 결과로 정의하세요.', '핵심 단어: waste / costs / organise'],
        reply: { speaker: 'Little Eva', line: 'Machine works wants a man capable of reorganising a large business, stopping leaks and systematising every activity. Why don\'t you try it?' }
      },
      {
        role: 'jimmy',
        situation: 'Eva is convinced you could land the job: all a man needs, she says, is a front and plenty of punch. You look down at your shabby, ill-fitting coat.',
        situationKo: '이바는 당신이 그 자리를 얻을 수 있다고 확신합니다. 필요한 건 당당한 인상과 배짱뿐이라면서요. 당신은 허름하고 맞지 않는 외투를 내려다봅니다.',
        speaker: 'Little Eva', line: 'This is a hunch, take it from me. I\'ll bet you can land that job and make good.',
        prompt: 'Agree to take a chance on her hunch, but point out that you would need a decent suit before walking into that office.',
        promptKo: '그녀의 예감에 한번 걸어 보겠다고 하되, 그 사무실에 들어가려면 제대로 된 양복이 필요하다고 지적하세요.',
        answers: [{ any: ['suit', 'clothes', 'outfit', 'look the part', 'rags'] }, { any: ['try', 'chance', 'hunch', 'give it a shot', 'go for it'] }],
        model: "I'll take a chance on your hunch — but I'd need a decent suit before I could walk into that office.",
        distractors: ['No. I know nothing about efficiency, and I refuse to lie.', 'Only if you come with me and do the talking.', 'The pay is probably too low for a college man.'],
        hints: ['Yes, with one practical obstacle.', 'Key words: chance / suit'],
        hintsKo: ['수락하되, 현실적인 장애물 하나를 말하세요.', '핵심 단어: chance / suit'],
        reply: { speaker: 'Little Eva', line: 'Clothes do count, no matter what we say. Won\'t you let me help you? It will only be a loan, if you want to look at it that way.' }
      },
      {
        role: 'jimmy',
        situation: 'Eva has left the table and come back. Under the edge of the tablecloth she presses a roll of bills into your hand. You do not want to hurt her, and you do want the job.',
        situationKo: '이바가 자리를 비웠다 돌아와, 식탁보 밑으로 지폐 뭉치를 당신 손에 쥐여 줍니다. 그녀를 상처 주고 싶지 않고, 그 일자리도 원합니다.',
        speaker: 'Little Eva', line: 'Here, take it! It would make me awfully happy.',
        prompt: 'Accept it gracefully, as a loan, and promise to pay back every dollar as soon as you are earning.',
        promptKo: '대출로서 고맙게 받아들이고, 돈을 벌기 시작하면 한 푼도 빠짐없이 갚겠다고 약속하세요.',
        answers: [{ any: ['loan', 'pay you back', 'pay back', 'pay it back', 'repay', 'return it', 'every dollar'] }],
        model: "All right — as a loan. I'll pay back every dollar as soon as I'm earning.",
        distractors: ['I cannot take money from a woman. Good night.', 'Thank you! Now I can buy a ticket home to Nebraska.', 'Is this all? A good suit costs more than that.'],
        hints: ['Accept, name the terms, promise.', 'Key words: loan / pay back'],
        hintsKo: ['받아들이고, 조건을 정하고, 약속하세요.', '핵심 표현: loan / pay back'],
        reply: { speaker: 'Narrator', line: 'She drew her hand away quickly, and a little sigh escaped her. The next evening you bought a ready-made suit — and a second-hand book called "How to Get More Out of Your Factory".' }
      }
    ]
  },
  {
    num: 16, title: 'Jimmy Throws a Bluff', ko: '지미의 허세',
    summary: 'Compton tells Bince he wants an outsider to find the leak. Jimmy, in a new suit and armed with letters of recommendation and a few memorised chapter titles, talks his way into the job at two hundred and fifty dollars a month.',
    summaryKo: '컴프턴은 빈스에게 외부인이 새는 곳을 찾아내길 바란다고 말합니다. 새 양복을 입고 추천서와 외운 책 목차 몇 줄로 무장한 지미는 월 250달러에 그 자리를 따냅니다.',
    scenes: [
      {
        role: 'compton',
        situation: 'Harold Bince has come into your office with the afternoon paper, upset that you advertised for an efficiency expert without telling him. You know he will object, and you have your reasons.',
        situationKo: '해럴드 빈스가 석간신문을 들고 사장실에 들어와, 자기에게 말도 없이 효율성 전문가 구인 광고를 냈다며 언짢아합니다. 반대할 줄 알았고, 당신에게는 이유가 있습니다.',
        speaker: 'Harold Bince', line: 'Why do we need an efficiency expert? These fellows do nothing but disrupt an organisation.',
        prompt: 'Explain your reasoning: there seems to be a leak somewhere, you are all too close to the work to see it, and an outsider can find it.',
        promptKo: '이유를 설명하세요. 어딘가에서 새는 것 같은데, 모두 일에 너무 가까워서 보이지 않으니 외부인이 찾아낼 수 있다고요.',
        answers: [{ any: ['leak', 'leaks', 'leaking'] }, { any: ['outsider', 'outside', 'fresh eyes', 'new angle', 'too close', 'new perspective'] }],
        model: "There seems to be a leak somewhere, Harold, and we're too close to the work to see it. It takes an outsider to find it.",
        distractors: ['You are right, Harold. I will cancel the advertisement.', 'I placed the ad because I no longer trust you.', 'The men need more red tape; it keeps them busy.'],
        hints: ['Name the problem and why you need help from outside.', 'Key words: leak / outsider'],
        hintsKo: ['문제를 지목하고, 왜 외부 도움이 필요한지 말하세요.', '핵심 단어: leak / outsider'],
        reply: { speaker: 'Harold Bince', line: 'I can\'t agree with you. I think it will do a lot of harm. And I prefer to do the pay-roll myself — I don\'t like to trust it to anyone else.' }
      },
      {
        role: 'jimmy',
        situation: 'You sit across the desk from Mason Compton in your new suit. He has read the letters of recommendation and wants to hear about your methods. In your pocket is the little book whose chapter headings you memorised last night.',
        situationKo: '새 양복을 입고 메이슨 컴프턴의 책상 맞은편에 앉아 있습니다. 그는 추천서를 읽었고, 이제 당신의 방법을 듣고 싶어 합니다. 주머니에는 어젯밤 목차를 외운 작은 책이 있습니다.',
        speaker: 'Mason Compton', line: 'Now tell me just what your experience has been, and how you go about your work.',
        prompt: 'Present your approach step by step: first study the men, then look for leaks in timekeeping and wage systems, then reduce costs by studying machines and material handling.',
        promptKo: '접근법을 단계별로 설명하세요. 먼저 사람들을 살피고, 그다음 근태·임금 체계에서 새는 곳을 찾고, 그다음 기계와 자재 운반을 연구해 비용을 줄인다고요.',
        answers: [{ any: ['leaks', 'timekeeping', 'time keeping', 'wage', 'wages'] }, { all: ['study'], any: ['men', 'people', 'staff', 'workers'] }, { any: ['reduce costs', 'cut costs', 'lower costs', 'cost'] }],
        model: "I start by studying the men. Then I look for leaks in timekeeping and wage systems, and after that I reduce costs by studying the machines and how material is handled.",
        distractors: ['I have never done this before, but how hard can it be?', 'I fire half the staff on the first day; that always works.', 'I read a book about it last night, and I remember most of the headings.'],
        hints: ['First… then… after that…', 'Key words: study the men / leaks / costs'],
        hintsKo: ['먼저… 그다음… 그 뒤에…', '핵심 표현: study the men / leaks / costs'],
        reply: { speaker: 'Mason Compton', line: 'I think you have the right idea. Some of your points are not entirely clear to me, but there are many modern methods I have not investigated sufficiently.' }
      },
      {
        role: 'jimmy',
        situation: 'Compton is satisfied and turns to money. You have no idea what an efficiency expert charges — ten dollars a day or a hundred — and you are afraid of asking too much or too little.',
        situationKo: '컴프턴은 만족하고 보수 이야기로 넘어갑니다. 효율성 전문가가 얼마를 받는지, 하루 10달러인지 100달러인지 전혀 모릅니다. 너무 많이 부를까, 너무 적게 부를까 두렵습니다.',
        speaker: 'Mason Compton', line: 'Now, what arrangement can we make?',
        prompt: 'Negotiate without naming a figure: say you would rather work into a permanent position at a reasonable salary than charge the usual contract rate, and ask what he has in mind.',
        promptKo: '숫자를 말하지 말고 협상하세요. 통상 계약 요율보다는 합리적인 급여로 정규직이 되고 싶다고 하고, 그가 생각하는 조건을 물으세요.',
        answers: [{ any: ['permanent', 'long term', 'long-term'] }, { any: ['what did you have in mind', 'what do you have in mind', 'what would you', 'what were you thinking', 'leave that to you', 'what do you think'] }, { all: ['salary'], any: ['reasonable', 'fair'] }],
        model: "I'd rather work into a permanent position at a reasonable salary than charge the usual contract rate. What did you have in mind?",
        distractors: ['One hundred dollars a day, payable in advance.', 'I will work for free until you see results.', 'Whatever Mr. Bince is getting, plus ten per cent.'],
        hints: ['Trade a lower rate for permanence, and let him name the number.', 'Key words: permanent / what did you have in mind'],
        hintsKo: ['낮은 요율 대신 정규직을 얻고, 숫자는 상대가 말하게 하세요.', '핵심 표현: permanent / what did you have in mind'],
        reply: { speaker: 'Mason Compton', line: 'With that idea in mind I should say that two hundred and fifty dollars a month might be a mutually fair arrangement to begin with. When can you start?' }
      }
    ]
  },
  {
    num: 17, title: 'Jimmy on the Job', ko: '첫 출근',
    summary: 'Eva confesses that the recommendations were invented, and Jimmy urges her to go back to being a stenographer. Officer O\'Donnell recognises them both. On Thursday Jimmy starts work, determined to earn his salary honestly.',
    summaryKo: '이바는 추천서가 지어낸 것이라고 고백하고, 지미는 그녀에게 다시 속기사로 일하라고 권합니다. 오도넬 경관이 두 사람을 알아봅니다. 목요일, 지미는 급여만큼 정직하게 일하겠다고 다짐하며 출근합니다.',
    scenes: [
      {
        role: 'jimmy',
        situation: 'You got the job, but you feel like a crook. Eva has just explained that she typed the recommendations herself on borrowed letterheads — she used to be a stenographer — and simply made up the names.',
        situationKo: '일자리를 얻었지만 사기꾼이 된 기분입니다. 이바는 빌린 회사 편지지에 추천서를 직접 타자로 쳤고, 한때 속기사였으며, 이름은 그냥 지어냈다고 설명합니다.',
        speaker: 'Little Eva', line: 'I didn\'t forge anybody\'s name. I made them up. I used to be a stenographer, you know.',
        prompt: 'Encourage her to get a position as a stenographer again, and tell her you would like that very much.',
        promptKo: '다시 속기사 일자리를 구하라고 권하고, 당신이 그것을 정말로 바란다고 말하세요.',
        answers: [{ any: ['stenographer', 'typist', 'secretary', 'office work', 'office job'] }],
        model: "Why don't you get a position as a stenographer again? I'd like that very much.",
        distractors: ['You forged those letters? I never want to see you again.', 'Could you write me a few more for my next job?', 'Let us celebrate — dinner is on me tonight.'],
        hints: ['Turn her skill into a suggestion.', 'Key word: stenographer'],
        hintsKo: ['그녀의 기술을 제안으로 바꾸세요.', '핵심 단어: stenographer'],
        reply: { speaker: 'Little Eva', line: 'It will be easy. There is no reason why I shouldn\'t — except that there was never anyone who cared what I did.' }
      },
      {
        role: 'jimmy',
        situation: 'A large man in a dark suit has stopped at your table and is telling Eva to keep out of decent places. It is Officer O\'Donnell, the policeman from the night you met the Lizard.',
        situationKo: '검은 양복의 덩치 큰 남자가 테이블 앞에 서서 이바에게 점잖은 곳에는 얼씬도 말라고 합니다. 리저드를 만난 밤의 그 경찰관, 오도넬입니다.',
        speaker: 'Officer O\'Donnell', line: 'Didn\'t I see ye flag this guy when he came in? How many times does the captain have to be issuin\' orders?',
        prompt: 'Vouch for your companion politely and firmly: she is a friend of yours, and you had an appointment to meet her here.',
        promptKo: '동행을 정중하고 단호하게 변호하세요. 당신의 친구이며, 여기서 만나기로 약속했다고요.',
        answers: [{ any: ['friend of mine', 'my friend', 'my guest', 'colleague', 'this lady'] }, { any: ['appointment', 'meeting', 'arranged', 'invited', 'agreed to meet'] }],
        model: 'This young lady is a friend of mine, officer. I had an appointment to meet her here.',
        distractors: ['I have never seen this woman before in my life.', 'Arrest her if you like; it is nothing to do with me.', 'Officer, would you care to join us for dinner?'],
        hints: ['Take responsibility for the situation.', 'Key words: friend of mine / appointment'],
        hintsKo: ['상황에 대해 책임지는 태도로.', '핵심 표현: friend of mine / appointment'],
        reply: { speaker: 'Officer O\'Donnell', line: 'Oh, it\'s you, is it? I\'m not going to pinch him — but the next time I see him I\'ll know him.' }
      },
      {
        role: 'jimmy',
        situation: 'Thursday morning, your first day at the International Machine Company. Bince has introduced you, without warmth, to Patton, the shop foreman, and left you together on the shop floor among the belts and lathes.',
        situationKo: '목요일 아침, 인터내셔널 기계회사 첫 출근입니다. 빈스가 냉담하게 당신을 공장장 패튼에게 소개하고는, 벨트와 선반이 돌아가는 작업장에 둘만 남겨 두고 갔습니다.',
        speaker: 'Patton, the foreman', line: 'So you\'re the efficiency expert. The men are wondering what you\'re here to do to them.',
        prompt: 'Introduce yourself and set the tone: you are here to make the work simpler, not to find fault or cut jobs, and you would appreciate his help.',
        promptKo: '자기소개를 하고 분위기를 잡으세요. 일을 더 단순하게 만들러 왔지, 흠을 잡거나 자리를 없애러 온 게 아니며, 그의 도움이 필요하다고요.',
        answers: [{ any: ['appreciate your help', 'need your help', 'work with you', 'your cooperation', 'help me', 'your support', 'with your help'] }, { all: ['not'], any: ['fault', 'blame', 'cut', 'fire', 'catch'] }],
        model: "I'm Jim Torrance. I'm here to make the work simpler, not to find fault — and I'd appreciate your help with that.",
        distractors: ['I am the new boss. Everything changes on Monday.', 'Which of your men are the laziest? Point them out.', 'I studied efficiency at the university, so listen carefully.'],
        hints: ['Purpose, reassurance, request.', 'Key words: not to find fault / appreciate your help'],
        hintsKo: ['목적, 안심, 부탁.', '핵심 표현: not to find fault / appreciate your help'],
        reply: { speaker: 'Patton, the foreman', line: 'Well, that\'s fair enough. Come on, I\'ll walk you through the shop.' }
      }
    ]
  },
  {
    num: 18, title: 'The Efficiency Expert', ko: '효율성 전문가',
    summary: 'Bince refuses to let Jimmy see the confidential payroll. Jimmy quietly collects every man\'s name and wage himself, simplifies the shop so that five men are no longer needed, and suggests to Compton that public accountants audit the books.',
    summaryKo: '빈스는 기밀이라며 급여 대장을 보여 주지 않습니다. 지미는 조용히 직원 한 사람 한 사람의 이름과 임금을 직접 수집하고, 작업을 단순화해 다섯 명이 필요 없게 만들며, 컴프턴에게 공인회계사의 회계 감사를 제안합니다.',
    scenes: [
      {
        role: 'jimmy',
        situation: 'It is Monday, pay-day. You asked Everett, the cashier, to show you the payroll, and he told you sourly that since Bince became assistant manager nobody but Bince may handle it.',
        situationKo: '월요일, 급여일입니다. 출납 담당 에버렛에게 급여 대장을 보여 달라고 했더니, 빈스가 부지배인이 된 뒤로는 빈스 말고는 아무도 손댈 수 없다고 퉁명스럽게 말합니다.',
        speaker: 'Everett, the cashier', line: 'All I know is the amount of the weekly check. He hires and fires everybody and pays everybody. He won\'t show it to you.',
        prompt: 'Ask Everett for the one neutral fact he does know: the total amount of this week\'s payroll check.',
        promptKo: '에버렛이 아는 중립적인 사실 하나를 물으세요. 이번 주 급여 수표의 총액입니다.',
        answers: [{ all: ['amount'] }, { any: ['total', 'how much', 'figure', 'sum'] }],
        model: "Then could you just tell me the amount of this week's payroll check?",
        distractors: ['Never mind. Payroll is none of my business.', 'Give me your keys, and I will look at it myself tonight.', 'Why does everyone here hate Mr. Bince?'],
        hints: ['Ask for what is available, not what is refused.', 'Key words: amount / this week'],
        hintsKo: ['거절된 것 말고, 얻을 수 있는 것을 물으세요.', '핵심 표현: amount / this week'],
        reply: { speaker: 'Everett, the cashier', line: 'A little over ninety-six hundred dollars.' }
      },
      {
        role: 'jimmy',
        situation: 'In Bince\'s office. He has told you the payroll is absolutely confidential, that you agreed not to interfere with each other, and that he is going to marry Compton\'s daughter and run the place.',
        situationKo: '빈스의 사무실입니다. 그는 급여 대장은 절대 기밀이며, 서로 간섭하지 않기로 했고, 자신이 컴프턴의 딸과 결혼해 회사를 맡을 거라고 말합니다.',
        speaker: 'Harold Bince', line: 'This is my work, and my office is not being investigated by any efficiency expert or anyone else. Now, do you get me?',
        prompt: 'Insist firmly, citing your mandate: Mr. Compton gave you full access to all records, and you consider the payroll part of operations.',
        promptKo: '권한을 근거로 단호하게 요구하세요. 컴프턴 사장이 모든 기록에 대한 접근을 허락했고, 급여 대장은 운영의 일부라고요.',
        answers: [{ any: ['insist'] }, { any: ['full access', 'access to all', 'all records', 'all the records', 'authorized', 'authorised', 'authority', 'mandate'] }],
        model: 'Mr. Compton gave me full access to all records, and I consider the payroll part of operations. I must insist on seeing it.',
        distractors: ['Very well. I will not mention payroll again.', 'I will tell Miss Compton what kind of man you are.', 'Fine, keep your secrets. I am going back to the shop.'],
        hints: ['Authority, definition, demand.', 'Key words: full access / insist'],
        hintsKo: ['권한, 정의, 요구.', '핵심 표현: full access / insist'],
        reply: { speaker: 'Harold Bince', line: 'I tell you again, once and for all, that you don\'t see the pay-roll nor anything else connected with my office.' }
      },
      {
        role: 'jimmy',
        situation: 'Your simple changes in the shop have cut five men from the payroll while the work moves faster, and Compton is delighted. You suspect the payroll, but you cannot accuse his future son-in-law without proof.',
        situationKo: '작업장의 간단한 개선으로 일은 더 빨라지고 다섯 명이 필요 없어져, 컴프턴은 기뻐합니다. 급여 대장이 수상하지만, 증거 없이 예비 사위를 고발할 수는 없습니다.',
        speaker: 'Mason Compton', line: 'You are running into no difficulties, then? Is there any way in which I can help you?',
        prompt: 'Suggest, tactfully and without accusing anyone, that he could save time and money by having the books audited by a firm of public accountants.',
        promptKo: '누구도 고발하지 말고 요령 있게 제안하세요. 공인회계사 사무소에 장부 감사를 맡기면 시간과 돈을 아낄 수 있다고요.',
        answers: [{ any: ['audit', 'audited', 'auditors', 'accountants', 'accountant', 'cpa', 'c p a'] }],
        model: 'You could save time and money by having your books audited by a firm of public accountants. They could also suggest a more up-to-date system.',
        distractors: ['You could fire Mr. Bince. He is stealing from you.', 'You could double my salary; the men respect money.', 'Everything is perfect. I need nothing at all.'],
        hints: ['Propose a process, not a person.', 'Key words: audited / public accountants'],
        hintsKo: ['사람이 아니라 절차를 제안하세요.', '핵심 표현: audited / public accountants'],
        reply: { speaker: 'Mason Compton', line: 'Not a bad idea. I think we will do it. By the way — you don\'t happen to know of a good stenographer? Miss Withe is leaving me Saturday.' }
      }
    ]
  },
  {
    num: 19, title: 'Plotting', ko: '음모',
    summary: 'Edith Hudson starts as Compton\'s stenographer on the same day the accountants arrive. Jimmy finds the payroll check unchanged despite five fewer men. Bince pays Krovac fifty dollars to get rid of Jimmy; two thugs attack him on Indiana Avenue and lose.',
    summaryKo: '회계사들이 오는 날, 이디스 허드슨이 컴프턴의 속기사로 일을 시작합니다. 지미는 다섯 명이 줄었는데도 급여 수표 금액이 그대로임을 발견합니다. 빈스는 크로바크에게 지미를 없애라고 50달러를 주고, 두 명의 깡패가 인디애나 거리에서 지미를 습격하지만 실패합니다.',
    scenes: [
      {
        role: 'jimmy',
        situation: 'Everett has told you this week\'s payroll figure. Five men were laid off last week and none hired, yet the check is practically the same — about a thousand dollars more than your notebook says it should be.',
        situationKo: '에버렛이 이번 주 급여 총액을 알려 주었습니다. 지난주 다섯 명이 나가고 아무도 들어오지 않았는데, 수표는 거의 그대로입니다. 당신 수첩 계산보다 약 1천 달러가 많습니다.',
        speaker: 'Everett, the cashier', line: 'A little over ninety-six hundred again — same as last week.',
        prompt: 'Note the discrepancy — five men gone, same total — and ask Everett to keep this between the two of you for now.',
        promptKo: '불일치를 지적하세요. 다섯 명이 줄었는데 총액은 같다고요. 그리고 당분간 둘만 아는 일로 해 달라고 부탁하세요.',
        answers: [{ any: ['odd', 'strange', 'funny', 'does not add up', 'discrepancy', 'same', 'unchanged'] }, { any: ['between us', 'between ourselves', 'confidential', 'quiet', 'to yourself', 'between you and me'] }],
        model: "That's odd — we laid off five men, yet the check is the same. Please keep this between us for now.",
        distractors: ['Good. That proves Mr. Bince is doing a fine job.', 'Tell the whole shop that Bince is a thief.', 'Ninety-six hundred? Then give the men a raise.'],
        hints: ['Observe, then ask for discretion.', 'Key words: odd / between us'],
        hintsKo: ['관찰한 뒤, 비밀 유지를 부탁하세요.', '핵심 표현: odd / between us'],
        reply: { speaker: 'Narrator', line: '"Phew!" you whistled to yourself. "These C.P.A.s are going to find this a more interesting job than they anticipated. Poor old Compton."' }
      },
      {
        role: 'edith',
        situation: 'It is your first week at the outer office. Mr. Bince has come in late and, before even taking off his coat, snaps a question at you about Mr. Torrance — who, oddly, has a fresh graze on his knuckles this morning.',
        situationKo: '바깥 사무실에서 일한 첫 주입니다. 빈스 씨가 늦게 출근해 외투도 벗기 전에 토런스 씨에 대해 쏘아붙이듯 묻습니다. 이상하게도 토런스 씨의 손마디에는 오늘 아침 새로 긁힌 자국이 있습니다.',
        speaker: 'Harold Bince', line: 'Is Mr. Torrance down yet?',
        prompt: 'Answer like a good receptionist: yes, he came in some time ago — and offer to let him know Mr. Bince wants to see him.',
        promptKo: '유능한 안내 직원처럼 답하세요. 네, 얼마 전에 출근했다고요. 그리고 빈스 씨가 찾는다고 전해 드릴지 물으세요.',
        answers: [{ all: ['yes'], any: ['see him', 'let him know', 'tell him', 'call him', 'send him'] }, { any: ['came in', 'has been here', 'arrived', 'some time ago'] }],
        model: "Yes, Mr. Torrance came in some time ago. Shall I let him know you'd like to see him?",
        distractors: ['No, he called in sick this morning.', 'Who is Mr. Torrance? I do not know that name.', 'He never comes in before noon, Mr. Bince.'],
        hints: ['Answer, then offer the next step.', 'Key words: yes / let him know'],
        hintsKo: ['답한 뒤, 다음 조치를 제안하세요.', '핵심 표현: yes / let him know'],
        reply: { speaker: 'Narrator', line: 'The "No" he snapped at you was more emphatic than the question warranted, and he slammed his office door. "I wonder what\'s eating him," you thought.' }
      }
    ]
  },
  {
    num: 20, title: 'An Invitation to Dine', ko: '저녁 초대',
    summary: 'Compton, ill at home, invites Jimmy to dinner. Elizabeth recognises the stocking clerk, the waiter, the boxer and the milkman, and threatens to expose him as an impostor. Jimmy refuses to leave: the future of the business may depend on it.',
    summaryKo: '집에서 앓고 있는 컴프턴이 지미를 저녁에 초대합니다. 엘리자베스는 양말 점원, 웨이터, 권투 선수, 우유 배달원이었던 그를 알아보고 사기꾼이라며 폭로하겠다고 위협합니다. 지미는 회사의 미래가 걸려 있다며 물러서지 않습니다.',
    scenes: [
      {
        role: 'jimmy',
        situation: 'You are called from the shop floor to the telephone. A woman\'s voice: Miss Compton. Her father cannot come to the office for several days and would like you to dine with them this evening.',
        situationKo: '작업장에서 전화를 받으라고 불려 갑니다. 여성의 목소리, 컴프턴 양입니다. 아버지가 며칠간 출근할 수 없어서 오늘 저녁 식사에 당신을 초대하고 싶다고 합니다.',
        speaker: 'Elizabeth Compton (on the telephone)', line: 'My father wishes very much to talk with you, and has asked me to suggest that you take dinner with us this evening.',
        prompt: 'Accept the invitation politely, and say when you will arrive.',
        promptKo: '초대를 정중히 수락하고, 언제 도착할지 말하세요.',
        answers: [{ any: ['glad to', 'happy to', 'delighted', 'pleasure', 'accept', 'love to', 'thank you'] }],
        model: "Thank you, I'd be glad to. Please tell Mr. Compton I'll come straight to the house after the shop closes.",
        distractors: ['I am afraid I am too busy this week. Perhaps next month.', 'Dinner? Will Mr. Bince be there? Then no.', 'Tell your father to come to the plant instead.'],
        hints: ['Thanks, yes, time.', 'Key words: glad to / after the shop closes'],
        hintsKo: ['감사, 수락, 시간.', '핵심 표현: glad to / after the shop closes'],
        reply: { speaker: 'Elizabeth Compton', line: 'Very well. We shall expect you.' }
      },
      {
        role: 'jimmy',
        situation: 'In the Compton library Elizabeth has recognised you. Too well-bred to say so in front of her father, she fences with you instead, with a smile that is not a smile.',
        situationKo: '컴프턴 저택의 서재에서 엘리자베스가 당신을 알아보았습니다. 아버지 앞에서 대놓고 말하기엔 교양이 있는 그녀는, 웃음 아닌 웃음을 띠고 말로 당신을 찌릅니다.',
        speaker: 'Elizabeth Compton', line: 'I presume an efficiency expert could drive a milk-wagon better than an ordinary person?',
        prompt: 'Keep your poise: agree lightly and turn it around — he could wait on a table better, too.',
        promptKo: '침착함을 잃지 마세요. 가볍게 동의하고 되받아치세요. 웨이터 일도 더 잘할 거라고요.',
        answers: [{ any: ['unquestionably', 'certainly', 'of course', 'absolutely', 'no doubt', 'undoubtedly'] }, { any: ['wait on table', 'wait on a table', 'waiter', 'table'] }],
        model: 'Unquestionably. He could wait on a table better, too.',
        distractors: ['Please do not tell your father, Miss Compton. I beg you.', 'I have never driven a milk-wagon in my life.', 'That is a rude question, and I will not answer it.'],
        hints: ['Do not flinch; match her wit.', 'Key words: unquestionably / wait on table'],
        hintsKo: ['움츠러들지 말고, 재치로 맞서세요.', '핵심 표현: unquestionably / wait on table'],
        reply: { speaker: 'Elizabeth Compton', line: 'Or sell stockings? — Now that you know that I know you to be an impostor, what do you intend to do?' }
      },
      {
        role: 'jimmy',
        situation: 'Her father has been called to the telephone. Elizabeth drops the smile: Mr. Bince has always known you are incompetent, and she will tell her father everything when he returns unless you leave the company.',
        situationKo: '아버지가 전화를 받으러 나갔습니다. 엘리자베스는 웃음을 거두고, 빈스 씨는 처음부터 당신이 무능하다는 걸 알았으며, 회사를 떠나지 않으면 아버지가 돌아오는 대로 다 말하겠다고 합니다.',
        speaker: 'Elizabeth Compton', line: 'How long do you suppose Father would keep you after I told him what I know of you? Well?',
        prompt: 'Refuse to leave, without threatening her: you intend to keep on with your work, because you have found things at the plant that the future of the business may depend on.',
        promptKo: '그녀를 위협하지 말고 떠나기를 거부하세요. 회사의 미래가 걸린 것을 공장에서 발견했기 때문에 일을 계속하겠다고요.',
        answers: [{ any: ['keep on', 'continue', 'stay', 'not leave', 'not leaving', 'refuse', 'carry on', 'go on with'] }, { any: ['future', 'depend', 'at stake', 'discovered', 'found something', 'found things', 'found some'] }],
        model: "I intend to keep on with my work, Miss Compton. I've found things at the plant that I haven't dared tell your father yet, and the future of the business may depend on my being there.",
        distractors: ['Very well. I will hand in my resignation in the morning.', 'If you tell him, I will tell him where you dined on Christmas Eve.', 'Your father already knows everything about me.'],
        hints: ['Firm, and about the business, not about her.', 'Key words: keep on / future of the business'],
        hintsKo: ['단호하게, 그녀가 아니라 회사에 대해.', '핵심 표현: keep on / future of the business'],
        reply: { speaker: 'Elizabeth Compton', line: 'You refuse to leave, then? Very well. I shall tell Father when he returns to this room just what I know of you.' }
      }
    ]
  },
  {
    num: 21, title: 'Jimmy Tells the Truth', ko: '지미, 진실을 말하다',
    summary: 'Worn down by Bince and by influenza, Compton tries to let Jimmy go. Jimmy tells him he is being robbed of a thousand dollars a week through the payroll. Elizabeth calls him a blackmailer; lonely, he spends the evening with Edith and realises he loves Elizabeth.',
    summaryKo: '빈스의 압박과 독감에 지친 컴프턴이 지미를 내보내려 합니다. 지미는 급여 대장을 통해 매주 1천 달러가 새고 있다고 말합니다. 엘리자베스는 그를 협박범이라 부르고, 외로운 지미는 이디스와 저녁을 보내다 자신이 엘리자베스를 사랑함을 깨닫습니다.',
    scenes: [
      {
        role: 'jimmy',
        situation: 'After dinner Compton, looking old and tired, tells you that Bince feels so strongly about it that he has decided to terminate your arrangement. Whatever happens to you, the auditors must not be stopped now.',
        situationKo: '저녁 식사 후, 늙고 지쳐 보이는 컴프턴이 빈스가 워낙 강경해서 당신과의 계약을 끝내기로 했다고 말합니다. 당신이 어떻게 되든, 회계사들의 일은 지금 멈추면 안 됩니다.',
        speaker: 'Mason Compton', line: 'In view of Mr. Bince\'s feelings in the matter, I believe we had better terminate our arrangement.',
        prompt: 'Accept his decision about yourself, but urge him not to let the accountants go until they have finished their work.',
        promptKo: '당신에 대한 결정은 받아들이되, 회계사들이 일을 끝낼 때까지는 내보내지 말라고 강하게 권하세요.',
        answers: [{ any: ['accountants', 'auditors', 'cpa', 'audit'] }, { all: ['finish'], any: ['work', 'job', 'report'] }],
        model: "Whatever you decide about me, sir, please don't let the accountants go until they've finished their work.",
        distractors: ['If I go, the whole investigation goes with me. That is my condition.', 'You cannot fire me; Mr. Bince is the one who should go.', 'I understand. I will clear my desk tonight.'],
        hints: ['Put the company before yourself.', 'Key words: accountants / until they have finished'],
        hintsKo: ['자신보다 회사를 앞세우세요.', '핵심 표현: accountants / until they have finished'],
        reply: { speaker: 'Mason Compton', line: 'What do you mean?' }
      },
      {
        role: 'jimmy',
        situation: 'You wanted the accountants to be the ones to tell him, but Compton insists on knowing now how he is being robbed. He is looking straight at you.',
        situationKo: '회계사들이 말해 주기를 바랐지만, 컴프턴은 어떻게 도둑맞고 있는지 지금 알아야겠다고 합니다. 그가 당신을 똑바로 쳐다봅니다.',
        speaker: 'Mason Compton', line: 'I wish to know now. How am I being robbed?',
        prompt: 'Deliver the bad news directly and briefly: through the payroll, at roughly a thousand dollars a week.',
        promptKo: '나쁜 소식을 직접, 짧게 전하세요. 급여 대장을 통해, 매주 약 1천 달러씩이라고요.',
        answers: [{ any: ['payroll', 'pay roll', 'wages', 'wage'] }],
        model: "Through the payroll, sir. You're being robbed at the rate of roughly a thousand dollars a week.",
        distractors: ['I would rather not say until I have proof.', 'Somebody is stealing tools from the shop at night.', 'Your daughter\'s shopping is costing you a fortune.'],
        hints: ['One channel, one number.', 'Key word: payroll'],
        hintsKo: ['경로 하나, 숫자 하나.', '핵심 단어: payroll'],
        reply: { speaker: 'Mason Compton', line: 'For a full minute he did not speak. "You may continue with your work in the plant, and we will keep the accountants, for a while at least."' }
      },
      {
        role: 'jimmy',
        situation: 'You are putting on your overcoat in the hall when Elizabeth appears. She overheard everything, and she believes you frightened a sick man to keep your job — and blackmailed her into silence.',
        situationKo: '현관에서 외투를 입는데 엘리자베스가 나타납니다. 다 들었다면서, 당신이 자리를 지키려고 병든 사람을 겁주고 자기를 협박해 입을 막았다고 믿습니다.',
        speaker: 'Elizabeth Compton', line: 'You are just doing it to hold your position. You are a despicable cur.',
        prompt: 'Stay professional: she may think of you as she pleases, but you must ask her not to interfere with your work.',
        promptKo: '프로답게 대응하세요. 당신을 어떻게 생각하든 상관없지만, 일에 간섭하지는 말아 달라고 하세요.',
        answers: [{ all: ['not'], any: ['interfere', 'stand in', 'obstruct', 'get in the way'] }, { any: ['as you please', 'think what you like', 'your opinion', 'think of me as'] }],
        model: 'You may think of me as you please, Miss Compton. I cannot change that. But I must ask you not to interfere with my work.',
        distractors: ['You are right. I am ashamed, and I will leave your father alone.', 'How dare you! Your fiancé is the crook, not me.', 'Please, Miss Compton, give me one more chance to explain.'],
        hints: ['Concede the opinion, protect the work.', 'Key words: as you please / not interfere'],
        hintsKo: ['의견은 양보하고, 일은 지키세요.', '핵심 표현: as you please / not interfere'],
        reply: { speaker: 'Narrator', line: 'You closed the door on a very angry young lady. Walking downtown, lonelier than you had been in weeks, you found a telephone and called the only other person who had taken a kindly interest in you: Edith.' }
      }
    ]
  },
  {
    num: 22, title: 'A Letter from Murray', ko: '머리의 편지',
    summary: 'Bince, on Murray\'s instructions, shows Compton a fake I.W.W. threat. Compton insists that Jimmy take a pistol, which Jimmy drops into his desk drawer. Searching Bince\'s desk for another letter, Edith finds Murray\'s note and hides it.',
    summaryKo: '빈스는 머리의 지시대로 가짜 노동조합(I.W.W.) 협박장을 컴프턴에게 보여 줍니다. 컴프턴은 지미에게 권총을 지니라고 고집하고, 지미는 그것을 책상 서랍에 넣어 둡니다. 다른 편지를 찾으러 빈스의 책상을 뒤지던 이디스가 머리의 편지를 발견해 숨깁니다.',
    scenes: [
      {
        role: 'jimmy',
        situation: 'Compton has called you in and shown you a crudely printed note on wrapping paper: "Treat your men right or suffer the consequences." Bince says the men are grumbling about your changes.',
        situationKo: '컴프턴이 당신을 불러 포장지에 거칠게 인쇄된 쪽지를 보여 줍니다. "직원을 제대로 대우하지 않으면 대가를 치를 것이다." 빈스는 당신의 개선안 때문에 직원들이 불평한다고 말합니다.',
        speaker: 'Mason Compton', line: 'What do you think of it?',
        prompt: 'Give a calm assessment and a recommendation: it probably amounts to little, the men have no real grievance, so ignore it — but keep the note on file.',
        promptKo: '차분한 평가와 권고를 내놓으세요. 별것 아닐 것이고, 직원들에게 진짜 불만은 없으니 무시하되, 쪽지는 보관해 두자고요.',
        answers: [{ any: ['ignore', 'not worry', 'nothing', 'amount to much', 'little', 'not serious', 'crank'] }, { any: ['file', 'keep', 'evidence', 'preserve'] }],
        model: "I doubt it amounts to much. The men have no real grievance. I'd simply ignore it, sir — but keep the note on file, just in case.",
        distractors: ['We should call the police and lock the gates tonight.', 'I told you the men would strike. Give them a raise at once.', 'This is Mr. Bince\'s handwriting, I am sure of it.'],
        hints: ['Assess the risk, then a proportionate action.', 'Key words: ignore / keep on file'],
        hintsKo: ['위험을 평가한 뒤, 비례하는 조치를.', '핵심 표현: ignore / keep on file'],
        reply: { speaker: 'Mason Compton', line: 'Very well, but we\'ll preserve this bit of evidence. File this, please, Miss Hudson. Still — I think you ought to be armed, Mr. Torrance.' }
      },
      {
        role: 'jimmy',
        situation: 'Compton has opened a desk drawer and is holding out an automatic pistol. You do not want it, but he is your employer, he is ill, and he is worried about you.',
        situationKo: '컴프턴이 책상 서랍을 열어 자동 권총을 내밉니다. 원하지 않지만, 그는 고용주이고, 아프고, 당신을 걱정하고 있습니다.',
        speaker: 'Mason Compton', line: 'Take this one. I want you to be on the safe side.',
        prompt: 'Decline politely — you do not think you need it — but accept it since he insists, and say you will keep it in your desk.',
        promptKo: '필요 없을 것 같다고 정중히 사양하되, 그가 고집하니 받아서 책상에 두겠다고 하세요.',
        answers: [{ all: ['not'], any: ['need', 'necessary', 'require'] }, { any: ['mind at ease', 'if you insist', 'keep it', 'put it', 'since you insist', 'in my desk'] }],
        model: "Really, I don't think I need it, sir — but if it puts your mind at ease, I'll keep it in my desk.",
        distractors: ['Thank you! I have wanted a gun since the night I was attacked.', 'Give it to Bince; he is the one who looks nervous.', 'I refuse to carry a weapon under any circumstances.'],
        hints: ['Soft no, then yield gracefully.', 'Key words: do not need / if it puts your mind at ease'],
        hintsKo: ['부드러운 거절, 그리고 우아한 양보.', '핵심 표현: do not need / if it puts your mind at ease'],
        reply: { speaker: 'Narrator', line: 'Outside, Bince told you to put the thing in your pocket. "It would be a nuisance there," you said, and dropped it into a drawer of your desk in the outer office.' }
      },
      {
        role: 'edith',
        situation: 'Mr. Compton cannot find a letter from Mosher and has sent you to look on Mr. Bince\'s desk. You did not find it — but you did find a letter from Steve Murray telling Bince to show the threat to Compton, and you have slipped it inside your waist.',
        situationKo: '컴프턴 씨가 모셔에게서 온 편지를 찾지 못해 빈스 씨 책상을 살펴보라고 했습니다. 편지는 없었지만, 스티브 머리가 빈스에게 협박장을 컴프턴에게 보여 주라고 지시한 편지를 발견해 옷 속에 감췄습니다.',
        speaker: 'Mason Compton', line: 'Well, Miss Hudson? Was the Mosher letter on his desk?',
        prompt: 'Report back calmly, without revealing what you found: you could not find the Mosher letter, and offer to look in the correspondence file.',
        promptKo: '발견한 것은 드러내지 말고 차분히 보고하세요. 모셔의 편지는 찾지 못했다고 하고, 서신 철을 찾아보겠다고 제안하세요.',
        answers: [{ all: ['not'], any: ['find', 'there', 'see', 'locate'] }, { any: ['file', 'files', 'check', 'look', 'search'] }],
        model: "I couldn't find the Mosher letter on his desk, sir. Shall I look in the correspondence file?",
        distractors: ['Mr. Bince has a letter from Steve Murray on his desk!', 'His desk is a mess. You should speak to him about it.', 'I found it, sir. Here it is.'],
        hints: ['Answer the question asked, and propose the next step.', 'Key words: could not find / file'],
        hintsKo: ['물어본 것에만 답하고, 다음 단계를 제안하세요.', '핵심 표현: could not find / file'],
        reply: { speaker: 'Mason Compton', line: 'Yes, please do. That\'s funny — I was certain it was here.' }
      }
    ]
  },
  {
    num: 23, title: 'Laid Up', ko: '병상에서',
    summary: 'Harriet argues with Elizabeth about the "milk-wagon driver". Murray hires the Lizard to crack the office safe and destroy the records. Jimmy collapses with influenza; in hospital he learns that a young lady brings flowers every evening.',
    summaryKo: '해리엇은 엘리자베스와 "우유 배달원"을 두고 다툽니다. 머리는 리저드에게 사무실 금고를 열어 기록을 없애라고 시킵니다. 지미는 독감으로 쓰러지고, 병원에서 매일 저녁 꽃을 가져오는 젊은 여성이 있다는 것을 알게 됩니다.',
    scenes: [
      {
        role: 'harriet',
        situation: 'You are in Elizabeth\'s boudoir. She is furious that the "milk-wagon driver" dared to tell her what she must and must not do, and she intends to demand that her father dismiss him.',
        situationKo: '엘리자베스의 방입니다. 그녀는 "우유 배달원"이 감히 자기에게 이래라저래라 했다며 분노하고, 아버지에게 그를 해고하라고 요구할 작정입니다.',
        speaker: 'Elizabeth Compton', line: 'It is absolutely insufferable. I am going to demand that Father discharge the man.',
        prompt: 'Challenge her gently: ask what reason she will give — that he protected her at Feinheimer\'s late at night?',
        promptKo: '부드럽게 반문하세요. 무슨 이유를 댈 거냐고요. 밤늦게 파인하이머 식당에서 그가 그녀를 지켜 주었다고 할 거냐고요.',
        answers: [{ any: ['why', 'reason', 'what will you tell', 'suppose he asks', 'how will you explain'] }, { any: ['feinheimer', 'protected', 'protect', 'saved', 'that night'] }],
        model: "And suppose he asks you why? Will you tell him this person protected you from a ruffian while you were dining at Feinheimer's at night?",
        distractors: ['You are right, Elizabeth. He should be dismissed today.', 'I do not care what happens to him.', 'Let us go shopping and forget the whole thing.'],
        hints: ['Answer a demand with a question.', 'Key words: why / Feinheimer\'s'],
        hintsKo: ['요구에는 질문으로.', '핵심 표현: why / Feinheimer\'s'],
        reply: { speaker: 'Elizabeth Compton', line: 'You are utterly impossible, Harriet! You have always shown a great deal more interest in the fellow than necessary.' }
      },
      {
        role: 'jimmy',
        situation: 'Five days of fever have passed. In a private room that Mr. Compton is paying for, your nurse tells you that a young lady comes every evening at six with flowers and asks when she may see you.',
        situationKo: '닷새 동안 열에 시달렸습니다. 컴프턴 씨가 비용을 대는 1인실에서, 간호사가 어떤 젊은 여성이 매일 저녁 여섯 시에 꽃을 들고 와 언제 면회할 수 있는지 묻는다고 말해 줍니다.',
        speaker: 'The nurse', line: 'She always asks about your condition, and when she may see you.',
        prompt: 'Ask who she is, and whether you may see her this evening if the doctor allows it.',
        promptKo: '누구인지 묻고, 의사가 허락한다면 오늘 저녁에 만날 수 있는지 물으세요.',
        answers: [{ any: ['who is she', 'who is it', 'her name', 'who she is'] }, { any: ['see her', 'may i see', 'could i see', 'can i see', 'visit'] }],
        model: 'Who is she? And may I see her this evening, if the doctor allows it?',
        distractors: ['Send the flowers away; they make me sneeze.', 'Tell Mr. Compton I will be back at work tomorrow morning.', 'Is it Miss Compton? Then I refuse.'],
        hints: ['Two short questions.', 'Key words: who / may I see her'],
        hintsKo: ['짧은 질문 두 개.', '핵심 표현: who / may I see her'],
        reply: { speaker: 'The nurse', line: 'We\'ll ask the doctor. — And at six o\'clock that evening she brought Edith Hudson to your bedside.' }
      },
      {
        role: 'jimmy',
        situation: 'Edith has come every evening since, sitting with you as long as the nurse allows. Her cheerful, mothering kindness has done more for you than the medicine. Tonight she is putting on her coat to leave.',
        situationKo: '그날 이후 이디스는 매일 저녁 와서 간호사가 허락하는 한 곁에 있어 주었습니다. 그녀의 밝고 다정한 보살핌은 약보다 나았습니다. 오늘 밤 그녀가 외투를 입고 돌아가려 합니다.',
        speaker: 'Edith Hudson', line: 'Same time tomorrow, then. Don\'t you dare get worse while I\'m gone.',
        prompt: 'Thank her sincerely for coming every day, and tell her it has made all the difference.',
        promptKo: '매일 와 준 것에 진심으로 감사하고, 그것이 큰 힘이 되었다고 말하세요.',
        answers: [{ any: ['thank', 'thanks', 'grateful', 'appreciate'] }],
        model: "I can't thank you enough for coming every day. It's made all the difference.",
        distractors: ['You should not have come. People will talk.', 'Did Mr. Bince send you to spy on me?', 'Bring me the payroll figures tomorrow, would you?'],
        hints: ['Say it plainly.', 'Key words: thank you / all the difference'],
        hintsKo: ['담백하게 말하세요.', '핵심 표현: thank you / all the difference'],
        reply: { speaker: 'The nurse (later)', line: 'She is such a sweet girl, and always so cheerful. She is going to make someone a mighty good wife.' }
      }
    ]
  },
  {
    num: 24, title: 'In the Toils', ko: '덫에 걸리다',
    summary: 'The auditors\' report is due Saturday, so Jimmy leaves hospital against orders. Saturday night a "watchman" telephones him to come to the plant. The Lizard, entering to crack the safe, finds Compton\'s body and flees. Jimmy arrives to find Compton dead — and two detectives at the door.',
    summaryKo: '회계 보고서가 토요일에 나오기로 되어 지미는 의사의 지시를 어기고 퇴원합니다. 토요일 밤 "경비원"이라는 사람이 전화로 공장에 오라고 합니다. 금고를 열려고 들어간 리저드는 컴프턴의 시신을 발견하고 달아납니다. 지미가 도착해 죽은 컴프턴을 발견한 순간, 문 앞에 형사 둘이 나타납니다.',
    scenes: [
      {
        role: 'jimmy',
        situation: 'Edith has told you the accountants have finished and will hand in their report on Saturday. You are dressed for the first time, and you have announced that you are leaving tomorrow.',
        situationKo: '이디스가 회계사들의 조사가 끝났고 토요일에 보고서를 낸다고 알려 주었습니다. 처음으로 옷을 갖춰 입고, 내일 퇴원하겠다고 선언했습니다.',
        speaker: 'The nurse', line: 'You can\'t do it. The doctor won\'t permit it. You ought to stay another week or ten days.',
        prompt: 'Explain firmly why you must go: you have to be at the office when the accountants\' report comes in on Saturday, and you will take full responsibility.',
        promptKo: '왜 가야 하는지 단호하게 설명하세요. 토요일에 회계 보고서가 나올 때 사무실에 있어야 하며, 책임은 전부 지겠다고요.',
        answers: [{ any: ['report', 'saturday', 'accountants', 'auditors'] }, { any: ['responsibility', 'must be', 'have to be', 'need to be', 'my own risk'] }],
        model: "I understand, but I must be at the office when the accountants' report comes in on Saturday. I'll take full responsibility.",
        distractors: ['All right, I will stay another week if you insist.', 'Then I will climb out of the window tonight.', 'Is there a telephone? I will run the plant from bed.'],
        hints: ['A reason and an acceptance of the risk.', 'Key words: report on Saturday / full responsibility'],
        hintsKo: ['이유, 그리고 위험에 대한 책임.', '핵심 표현: report on Saturday / full responsibility'],
        reply: { speaker: 'Narrator', line: 'Despite the pleas of the nurse and the orders of the physician, you appeared at the plant on Friday afternoon. Bince greeted you almost effusively.' }
      },
      {
        role: 'jimmy',
        situation: 'Saturday, ten at night. Your landlady calls you to the telephone. A man\'s voice says he is the new watchman at the plant, that something is wrong and he cannot reach Mr. Compton. Then the line goes dead.',
        situationKo: '토요일 밤 열 시. 하숙집 주인이 전화를 받으라고 합니다. 남자 목소리가 공장의 새 경비원이라며, 뭔가 잘못됐는데 컴프턴 씨와 연락이 안 된다고 합니다. 그리고 전화가 끊깁니다.',
        speaker: 'A man\'s voice', line: 'There\'s something wrong here. I can\'t get hold of Mr. Compton. I think you better come down. I\'ll be in Mr. Compton\'s office —',
        prompt: 'Respond as you would to any emergency call: ask what is wrong, and say you are on your way.',
        promptKo: '긴급 전화에 응하듯 대답하세요. 무슨 일인지 묻고, 바로 가겠다고 하세요.',
        answers: [{ any: ['right down', 'on my way', 'be there', 'coming', 'come at once', 'right away', 'straight there', 'immediately'] }, { any: ['what is wrong', 'what is the matter', 'what happened', 'what is it'] }],
        model: "What's wrong? Have you tried Mr. Compton at home? Stay there — I'm on my way.",
        distractors: ['Call the police; it is not my job.', 'Who gave you this number? I am on sick leave.', 'Wait until Monday. Nothing happens at night.'],
        hints: ['Get information, then commit.', 'Key words: what is wrong / on my way'],
        hintsKo: ['정보를 얻은 뒤, 행동을 약속하세요.', '핵심 표현: what is wrong / on my way'],
        reply: { speaker: 'Narrator', line: 'The message had ceased as though the exchange had cut you off. "Funny that he should call me," you thought, but you lost no time in getting your hat.' }
      },
      {
        role: 'jimmy',
        situation: 'You switched on the light in Compton\'s office and found him on the floor beside his desk. Kneeling to listen for his heart, you hear a gruff voice behind you and turn to see two men in the doorway with pistols levelled at you.',
        situationKo: '컴프턴의 사무실에 불을 켜니 그가 책상 옆 바닥에 쓰러져 있습니다. 무릎을 꿇고 심장 소리를 들으려는데, 뒤에서 거친 목소리가 들립니다. 돌아보니 두 남자가 문간에서 권총을 겨누고 있습니다.',
        speaker: 'A detective', line: 'Put \'em up! And be quick about it!',
        prompt: 'Comply calmly and state the facts: Mr. Compton is dead, you have only just found him, and you will do as they say.',
        promptKo: '침착하게 따르며 사실을 말하세요. 컴프턴 씨가 죽었고, 당신은 방금 발견했으며, 시키는 대로 하겠다고요.',
        answers: [{ any: ['found him', 'just found', 'just arrived', 'just got here', 'just came in'] }, { any: ['do as you say', 'cooperate', 'hands up', 'here they are', 'not armed', 'no weapon'] }],
        model: "Mr. Compton is dead — I've only just found him. I'm not armed, and I'll do as you say.",
        distractors: ['It was not me! Let me go, I have a train to catch!', 'Get out of here — I will call the police myself.', 'Bince did this. Arrest him at once.'],
        hints: ['Calm facts, no resistance.', 'Key words: just found him / do as you say'],
        hintsKo: ['침착한 사실 진술, 저항 없이.', '핵심 표현: just found him / do as you say'],
        reply: { speaker: 'Narrator', line: 'One of them was O\'Donnell, promoted to detective sergeant since you first met him. His partner searched you and found no weapon. "Where\'s the gat?"' }
      }
    ]
  },
  {
    num: 25, title: 'Circumstantial Evidence', ko: '정황 증거',
    summary: 'The murder weapon is the pistol Compton lent Jimmy, and Bince identifies it. Elizabeth supplies the motive; Edith is held as a witness. In jail, Harriet tells Jimmy she believes him and promises practical help.',
    summaryKo: '살해 도구는 컴프턴이 지미에게 빌려준 권총이고, 빈스가 그것을 확인합니다. 엘리자베스는 동기를 진술하고, 이디스는 증인으로 구금됩니다. 감옥에서 해리엇은 지미를 믿는다며 실질적인 도움을 약속합니다.',
    scenes: [
      {
        role: 'jimmy',
        situation: 'At the station the lieutenant has produced the automatic found behind the office door. Bince has just sworn it is the one Compton lent you. You have not seen the pistol since you dropped it into your drawer.',
        situationKo: '경찰서에서 경위가 사무실 문 뒤에서 발견된 권총을 내놓았습니다. 빈스는 방금 그것이 컴프턴이 당신에게 빌려준 총이라고 증언했습니다. 서랍에 넣은 뒤로 당신은 그 총을 본 적이 없습니다.',
        speaker: 'The lieutenant', line: 'Now do you recognise it?',
        prompt: 'Answer precisely: Mr. Compton did lend you a pistol of this type, you put it in your desk and never saw it again, and you cannot identify this particular one.',
        promptKo: '정확하게 답하세요. 컴프턴 씨가 이런 종류의 권총을 빌려준 것은 맞고, 책상에 넣은 뒤 다시 본 적이 없으며, 이 총이 그것인지는 확인할 수 없다고요.',
        answers: [{ any: ['loaned', 'lent', 'gave me', 'lend'] }, { all: ['desk'] }, { all: ['not'], any: ['identify', 'recognise', 'recognize', 'tell', 'sure'] }],
        model: "Mr. Compton did lend me a pistol of this type. I put it in my desk and never saw it again — so I can't identify this one as the same weapon.",
        distractors: ['I have never owned or touched a pistol in my life.', 'Yes, that is mine. I carry it everywhere.', 'I refuse to answer any more questions without a drink.'],
        hints: ['Admit what is true, deny only what you cannot know.', 'Key words: lent me / desk / cannot identify'],
        hintsKo: ['사실은 인정하고, 알 수 없는 것만 부인하세요.', '핵심 표현: lent me / desk / cannot identify'],
        reply: { speaker: 'The lieutenant', line: 'Well, we can identify it, and have. The number was recorded when Mr. Compton bought it. It looks pretty bad for you, young fellow.' }
      },
      {
        role: 'jimmy',
        situation: 'You have been in jail a week. A turnkey brings Harriet Holden to your cell. She says she cannot believe you are guilty, and that there must be a motive for such a crime.',
        situationKo: '감옥에 갇힌 지 일주일입니다. 간수가 해리엇 홀든을 감방으로 데려옵니다. 그녀는 당신이 유죄라고 믿을 수 없다며, 이런 범죄에는 반드시 동기가 있을 거라고 말합니다.',
        speaker: 'Harriet Holden', line: 'Who could there be, then, who might wish to kill him, and what could the motive be?',
        prompt: 'Answer carefully, without naming anyone: you can think of only one man who could profit from Mr. Compton\'s death, and whose whole future would have been ruined had he lived until the morning.',
        promptKo: '이름은 대지 말고 조심스럽게 답하세요. 컴프턴 씨의 죽음으로 이득을 볼 사람은 단 한 명뿐이며, 그가 다음 날 아침까지 살아 있었다면 그 사람의 미래는 끝장났을 거라고요.',
        answers: [{ any: ['profit', 'motive', 'gain', 'benefit', 'profited'] }, { any: ['one man', 'only one', 'someone', 'one person'] }],
        model: "I can think of only one man who could profit from Mr. Compton's death — and whose whole future would have been ruined if he had lived until the following morning. I won't use his name.",
        distractors: ['I did it, Miss Holden. I could not bear to be discharged.', 'There is nothing to be done. Leave me alone.', 'Mr. Compton is not dead; this is a mistake.'],
        hints: ['Point to motive, not to a name.', 'Key words: one man / profit'],
        hintsKo: ['이름이 아니라 동기를 가리키세요.', '핵심 표현: one man / profit'],
        reply: { speaker: 'Harriet Holden', line: 'You don\'t mean —? She stopped, a sudden light in her eyes, and stayed half an hour longer.' }
      },
      {
        role: 'harriet',
        situation: 'You have gone straight from the jail to Elizabeth\'s house and told her you are going to help Torrance. Elizabeth sneers at the idea.',
        situationKo: '감옥에서 곧장 엘리자베스의 집으로 가서 토런스를 돕겠다고 말했습니다. 엘리자베스는 그 생각을 비웃습니다.',
        speaker: 'Elizabeth Compton', line: 'How are you going to help him? Take flowers and cake to him in jail?',
        prompt: 'Reply calmly with a practical plan: your father will retain the best criminal attorney in Chicago for him.',
        promptKo: '침착하게 실질적인 계획으로 답하세요. 아버지가 시카고 최고의 형사 변호사를 그를 위해 선임할 것이라고요.',
        answers: [{ any: ['attorney', 'lawyer', 'counsel', 'defense', 'defence'] }],
        model: 'I have a more practical plan. My father will retain the best criminal attorney in Chicago for him.',
        distractors: ['Flowers and cake sound lovely. I will bake tonight.', 'I will break him out of jail myself.', 'I give up. You are right, Elizabeth.'],
        hints: ['Answer sarcasm with a plan.', 'Key word: attorney'],
        hintsKo: ['비꼼에는 계획으로 답하세요.', '핵심 단어: attorney'],
        reply: { speaker: 'Narrator', line: 'And so it befell that the next day a well-known criminal attorney called on Jimmy Torrance at the county jail.' }
      }
    ]
  },
  {
    num: 26, title: 'The Only Friends He Has', ko: '그의 유일한 친구들',
    summary: 'An anonymous client sends Jimmy an attorney; Jimmy accepts on condition that Edith is freed. Shadowed by police, Edith slips away to meet the Lizard and tells him where Murray\'s letter is hidden. The Lizard retrieves it — and wrestles with what he knows.',
    summaryKo: '익명의 의뢰인이 지미에게 변호사를 보내고, 지미는 이디스를 풀어 준다는 조건으로 받아들입니다. 경찰의 미행을 따돌린 이디스는 리저드를 만나 머리의 편지가 숨겨진 곳을 알려 줍니다. 리저드는 편지를 손에 넣고, 자신이 아는 것을 두고 갈등합니다.',
    scenes: [
      {
        role: 'jimmy',
        situation: 'A well-known criminal attorney has appeared at your cell, instructed by a client he will not name to defend you whether you want it or not. There is one thing you want more than your own defence.',
        situationKo: '유명한 형사 변호사가 감방에 나타나, 이름을 밝히지 않는 의뢰인의 지시로 당신이 원하든 말든 변호하겠다고 합니다. 당신에게는 자기 변호보다 더 원하는 것이 하나 있습니다.',
        speaker: 'The attorney', line: 'My instructions are to defend you whether you want me to or not, so I guess you can\'t help yourself.',
        prompt: 'Accept his services on one condition: the first thing he must do is get Miss Hudson out of jail — she could have had nothing to do with it.',
        promptKo: '조건 하나를 걸고 수락하세요. 가장 먼저 허드슨 양을 감옥에서 꺼내 줘야 한다고요. 그녀는 이 일과 아무 관계가 없다고요.',
        answers: [{ all: ['condition'] }, { any: ['miss hudson', 'edith', 'hudson', 'her out', 'her released'] }],
        model: "All right — on one condition. The first thing I want you to do is get Miss Hudson out of jail. She could have had nothing to do with it.",
        distractors: ['I cannot accept charity. Tell your client no.', 'Who is paying? I refuse to work with strangers.', 'Fine. Get me out first and worry about the rest later.'],
        hints: ['Yes, with a non-negotiable.', 'Key words: one condition / Miss Hudson'],
        hintsKo: ['수락하되, 양보 못 할 조건 하나.', '핵심 표현: one condition / Miss Hudson'],
        reply: { speaker: 'The attorney', line: 'I had no instructions to defend her also — but I will see what can be done. Within a few days Edith was released.' }
      },
      {
        role: 'edith',
        situation: 'You slipped your police shadow through the emergency exit of a picture theatre, and now the Lizard has climbed into your taxi outside Mother Kruger\'s road-house. He says a man who knows told him Jimmy did it.',
        situationKo: '영화관 비상구로 경찰 미행을 따돌렸고, 이제 마더 크루거 주점 앞에서 리저드가 당신의 택시에 올라탔습니다. 그는 사정을 아는 사람에게서 지미가 범인이라고 들었다고 합니다.',
        speaker: 'The Lizard', line: 'I wish there was some way to help him. What\'s on your mind?',
        prompt: 'Give clear instructions: Murray\'s letter and the threat are hidden under the right-hand lower drawer of your desk in the outer office; he must get them tonight and take them to Jimmy\'s attorney.',
        promptKo: '분명하게 지시하세요. 머리의 편지와 협박장은 바깥 사무실 당신 책상의 오른쪽 아래 서랍 밑에 숨겨져 있으니, 오늘 밤 가져다 지미의 변호사에게 전하라고요.',
        answers: [{ any: ['drawer', 'desk'] }, { any: ['attorney', 'lawyer'] }],
        model: "Murray's letter and the threat are hidden under the right-hand lower drawer of my desk in the outer office. Get them tonight and take them straight to Jimmy's attorney.",
        distractors: ['Forget the papers; just tell the police what you know.', 'I will get them myself tomorrow when the shop opens.', 'Take them straight to Steve Murray and ask him for a reward.'],
        hints: ['Where, when, to whom.', 'Key words: drawer of my desk / attorney'],
        hintsKo: ['어디서, 언제, 누구에게.', '핵심 표현: drawer of my desk / attorney'],
        reply: { speaker: 'The Lizard', line: 'All right, I\'ll get them. — You and I are the only friends he has, you said. He heard that.' }
      }
    ]
  },
  {
    num: 27, title: 'The Trial', ko: '재판',
    summary: 'Weeks pass with no word from the Lizard. Krovac and Bince perjure themselves, and the verdict seems certain. Bince hurries Elizabeth into marriage. Then the defence produces new witnesses: Krovac\'s accomplice, and Steve Murray — who, cornered, points at Bince.',
    summaryKo: '리저드에게서 몇 주째 소식이 없습니다. 크로바크와 빈스는 위증하고 평결은 정해진 듯합니다. 빈스는 엘리자베스를 재촉해 결혼합니다. 그때 변호인이 새 증인을 세웁니다. 크로바크의 공범, 그리고 궁지에 몰려 빈스를 가리키는 스티브 머리입니다.',
    scenes: [
      {
        role: 'elizabeth',
        situation: 'Harold is thin, pale and twitching, and blames the strain of the trial and the business. Tonight he asks you, again, to marry him at once — tomorrow. You do not want to be rushed.',
        situationKo: '해럴드는 여위고 창백하며 손을 떨고, 재판과 회사 일 때문이라고 합니다. 오늘 밤 그는 또다시 당장, 내일 결혼하자고 합니다. 당신은 서두르고 싶지 않습니다.',
        speaker: 'Harold Bince', line: 'We could be married quietly. There is every reason why we should, especially now that you are left all alone. To-morrow.',
        prompt: 'Push back on the timing but offer a compromise: tomorrow is too soon; if it must be quick, Friday morning, quietly.',
        promptKo: '시기에 대해 반대하되 절충안을 내세요. 내일은 너무 이르고, 꼭 서둘러야 한다면 금요일 아침에 조용히 하자고요.',
        answers: [{ any: ['too soon', 'too fast', 'not tomorrow', 'too quick', 'so soon'] }, { any: ['friday', 'next week', 'few days', 'compromise'] }],
        model: "Tomorrow is too soon, Harold. If it must be quick, let it be Friday morning, quietly.",
        distractors: ['Yes, tomorrow. I have waited long enough.', 'I will never marry you, Harold. Get out.', 'Let us wait until the trial is over and everyone has forgotten.'],
        hints: ['Reject the date, not the request.', 'Key words: too soon / Friday'],
        hintsKo: ['요청이 아니라 날짜를 거절하세요.', '핵심 표현: too soon / Friday'],
        reply: { speaker: 'Narrator', line: 'Harold Bince breathed more freely after that than he had for a long time. On Friday morning Mr. and Mrs. Harold Bince entered the court-room late.' }
      },
      {
        role: 'attorney',
        situation: 'The judge has admitted new evidence. Steve Murray, burly and swaggering, has admitted writing the letter to Bince but calls the threat "a little joke". He has just started to deny telephoning Torrance the night of the murder.',
        situationKo: '판사가 새 증거를 받아들였습니다. 덩치 크고 거들먹거리는 스티브 머리는 빈스에게 편지를 쓴 것은 인정하지만 협박장은 "장난"이라고 합니다. 살인 사건 밤에 토런스에게 전화한 일은 부인하기 시작했습니다.',
        speaker: 'Steve Murray', line: 'Telephoned him? I never —',
        prompt: 'Stop him and press the point: ask him to think carefully, because he made that call in the presence of a witness — and point to the head-waiter from Feinheimer\'s at the back of the court-room.',
        promptKo: '말을 끊고 밀어붙이세요. 잘 생각해 보라고, 그 전화는 증인이 보는 앞에서 걸었다고요. 그리고 법정 뒤편에 앉은 파인하이머 식당의 수석 웨이터를 가리키세요.',
        answers: [{ any: ['witness', 'witnessed'] }, { any: ['recall', 'remember', 'telephoned', 'called', 'think carefully', 'careful thought'] }],
        model: "Just a moment, Mr. Murray. If you give the matter careful thought, I'm sure you'll recall that you telephoned Mr. Torrance that night — in the presence of a witness, who is sitting at the back of this court-room.",
        distractors: ['No further questions, Your Honour.', 'Mr. Murray, do you enjoy living in Chicago?', 'I withdraw the question.'],
        hints: ['Give him a chance to correct himself — and show him why he should.', 'Key words: recall / witness'],
        hintsKo: ['정정할 기회를 주면서, 왜 그래야 하는지 보여 주세요.', '핵심 표현: recall / witness'],
        reply: { speaker: 'Steve Murray', line: 'Yes — I remember it. They\'re all trying to double-cross me! I had nothing to do with killing Compton. Ask that man there — he hired me!' }
      }
    ]
  },
  {
    num: 28, title: 'The Verdict', ko: '평결',
    summary: 'The Lizard testifies that he saw Bince leave the building minutes before he found Compton dead. Bince leaps from the court-room window. Jimmy is acquitted, reaches Edith\'s bedside in time to say good-bye, and is asked by Elizabeth to take charge of the company. Harriet has been his for a long time.',
    summaryKo: '리저드는 컴프턴의 시신을 발견하기 몇 분 전에 빈스가 건물을 나가는 것을 보았다고 증언합니다. 빈스는 법정 창문에서 뛰어내립니다. 무죄가 된 지미는 이디스의 임종을 지키고, 엘리자베스에게서 회사를 맡아 달라는 부탁을 받습니다. 해리엇은 오래전부터 그의 사람이었습니다.',
    scenes: [
      {
        role: 'jimmy',
        situation: 'The verdict is "Not guilty". Mr. Holden and your attorney are the first to congratulate you, and Mr. Holden insists you come home with him to dinner. But the Lizard has just told you that Edith is dangerously ill.',
        situationKo: '평결은 "무죄"입니다. 홀든 씨와 변호사가 가장 먼저 축하하고, 홀든 씨는 집에 가서 저녁을 함께하자고 합니다. 하지만 리저드가 방금 이디스가 위독하다고 말해 주었습니다.',
        speaker: 'Mr. Holden', line: 'Come home with me to dinner, my boy. Harriet will want to hear everything.',
        prompt: 'Decline politely with a reason, and propose coming later: there is someone you must see first, and you would like to come by later in the evening to thank him and Miss Holden.',
        promptKo: '이유를 말하며 정중히 사양하고, 나중에 가겠다고 제안하세요. 먼저 만나야 할 사람이 있고, 저녁 늦게 들러 그와 홀든 양에게 감사 인사를 드리고 싶다고요.',
        answers: [{ any: ['later', 'afterwards', 'after that', 'this evening'] }, { any: ['someone', 'some one', 'must see', 'first', 'have to see'] }],
        model: "I'm sorry — I'd like to immensely, but there's someone I must see first. May I come by later this evening to thank you and Miss Holden?",
        distractors: ['Thank you. Let us go now; I am starving.', 'No. I never want to see any of you again.', 'Only if the Lizard can come too.'],
        hints: ['Regret, reason, alternative.', 'Key words: someone I must see first / later'],
        hintsKo: ['유감, 이유, 대안.', '핵심 표현: someone I must see first / later'],
        reply: { speaker: 'Narrator', line: 'A nurse admitted you to the apartment on the north side. Edith knew you, and asked you to stay with her until she went. You did.' }
      },
      {
        role: 'jimmy',
        situation: 'It is after nine when you reach the Holden home, and to your surprise Elizabeth is there with Harriet. She has come forward to say that she wronged you — and to make you an offer.',
        situationKo: '아홉 시가 넘어 홀든 저택에 도착하니, 놀랍게도 엘리자베스가 해리엇과 함께 있습니다. 그녀는 당신에게 잘못했다고 말하러, 그리고 제안을 하러 나섰습니다.',
        speaker: 'Elizabeth Compton', line: 'There is no one now in whom I would have so much confidence as you. I wish you would come back and take charge for me.',
        prompt: 'Accept graciously: you would be glad to help, for the present at least, and the details can be arranged later.',
        promptKo: '정중히 수락하세요. 당분간이라도 기꺼이 돕겠으며, 세부 사항은 나중에 정하자고요.',
        answers: [{ any: ['glad', 'happy', 'honored', 'honoured', 'accept', 'be pleased'] }, { any: ['details', 'later', 'arrange', 'for the present', 'for now'] }],
        model: "Thank you, Miss Compton. I'd be glad to help, for the present at least — we can arrange the details later.",
        distractors: ['After the way you treated me? Never.', 'Only if you double what your father paid me.', 'I would rather go home to Nebraska and run the mill.'],
        hints: ['Accept without gloating; keep the terms open.', 'Key words: glad to help / details later'],
        hintsKo: ['우쭐대지 말고 받아들이고, 조건은 열어 두세요.', '핵심 표현: glad to help / details later'],
        reply: { speaker: 'Narrator', line: 'You realised at what cost of pride the offer had been made. Elizabeth excused herself, and went up to her room.' }
      },
      {
        role: 'jimmy',
        situation: 'Harriet has told you what Edith did for you, and you have thanked her for her friendship, her sympathy and the best attorney in Chicago. You have come, you say, to ask still more of her. She is standing very close, looking up into your face.',
        situationKo: '해리엇은 이디스가 당신을 위해 한 일을 들려주었고, 당신은 그녀의 우정과 공감, 시카고 최고의 변호사에 대해 감사했습니다. 이제 더 큰 것을 부탁하러 왔다고 말합니다. 그녀는 아주 가까이 서서 당신의 얼굴을 올려다봅니다.',
        speaker: 'Harriet Holden', line: 'What do you want?',
        prompt: 'Two words will do.',
        promptKo: '두 단어면 충분합니다.',
        answers: [{ all: ['you'] }, { any: ['harriet'] }],
        model: 'You, Harriet.',
        distractors: ['A job as general manager, of course.', 'A loan of twenty dollars until Friday.', 'Nothing at all. Good night, Miss Holden.'],
        hints: ['Not a job, not money.', 'Key word: you'],
        hintsKo: ['일자리도, 돈도 아닙니다.', '핵심 단어: you'],
        reply: { speaker: 'Harriet Holden', line: 'I have been yours for a long time, Jimmy — but you didn\'t know it.' }
      }
    ]
  }
];

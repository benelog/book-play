# 원문 텍스트 — The Efficiency Expert

Edgar Rice Burroughs의 *The Efficiency Expert*(1921)는 퍼블릭 도메인입니다(저자 1950년 사망, 미국 1921년 출판).
`the-efficiency-expert-gutenberg.txt`는 **Project Gutenberg #3475**의 Plain Text UTF-8
(https://www.gutenberg.org/ebooks/3475.txt.utf-8)에서 내려받아, 앞뒤의 Gutenberg 라이선스 머리말·꼬리말을 지우고
제목 줄(`THE EFFICIENCY EXPERT`)부터 본문 끝까지만 남긴 것입니다. 본문은 손대지 않았습니다.

장 제목은 `CHAPTER I.` … `CHAPTER XXVIII.` 형식이고 바로 다음 줄에 소제목(`JIMMY TORRANCE, JR.` 등)이 있습니다.
`js/parser.js`가 이 형식을 그대로 인식해 **28개 장**으로 나누므로 `===` 구분선은 넣지 않았습니다.
`python3 tools/embed-text.py books/efficiency-expert`를 실행하면 `text/book.js`가 다시 만들어집니다.

퍼블릭 도메인이므로 이 텍스트는 저장소에 넣어 배포합니다.

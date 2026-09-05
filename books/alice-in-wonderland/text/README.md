# 원문 텍스트 넣기 — Alice's Adventures in Wonderland

Lewis Carroll의 원문(1865)은 전 세계 퍼블릭 도메인입니다. Project Gutenberg에서 받은 파일을 이 폴더에 두면 됩니다.

1. https://www.gutenberg.org/ebooks/11 에서 **Plain Text UTF-8** 을 내려받습니다 (파일 이름 예: `pg11.txt`).
2. 이 폴더(`books/alice-in-wonderland/text/`)에 넣고 `./start.sh`를 실행하면 `text/book.js`로 변환되어 자동으로 12개 장으로 나뉩니다.
3. Gutenberg의 머리말·꼬리말과 목차는 파서가 자동으로 걸러 냅니다. 파일 이름에 `gutenberg` 또는 `pg11`이 들어 있으면 출처 표기가 붙습니다.

장 제목은 `CHAPTER I.` 형식이라 자동 분할이 잘 됩니다. 혹시 분할이 어긋나면 장과 장 사이에 `===` 줄을 넣어 주세요.

퍼블릭 도메인이므로 이 텍스트는 저장소에 넣어 배포해도 됩니다. 다만 `.gitignore`가 모든 책의 `text/*.txt`를 기본으로 제외하니, 배포하려면 예외 규칙을 추가하세요.

# 원문 텍스트 넣기 — The Tales of Peter Rabbit and Friends

Beatrix Potter(1866–1943)의 이야기 열 편은 1902~1910년에 출간되어 퍼블릭 도메인입니다.
이야기마다 Project Gutenberg 전자책이 따로 있으니, 열 개를 각각 내려받아 아래 이름으로 이 폴더에 저장하세요.

## 1. 열 편의 이야기와 Gutenberg 번호

| 장 | 이야기 | 출간 | Gutenberg | 저장할 파일 이름 |
|----|--------|------|-----------|------------------|
| 1 | The Tale of Peter Rabbit | 1902 | [#14838](https://www.gutenberg.org/ebooks/14838) | `01-peter-rabbit.txt` |
| 2 | The Tale of Squirrel Nutkin | 1903 | [#14872](https://www.gutenberg.org/ebooks/14872) | `02-squirrel-nutkin.txt` |
| 3 | The Tale of Benjamin Bunny | 1904 | [#14407](https://www.gutenberg.org/ebooks/14407) | `03-benjamin-bunny.txt` |
| 4 | The Tale of Two Bad Mice | 1904 | [#45264](https://www.gutenberg.org/ebooks/45264) | `04-two-bad-mice.txt` |
| 5 | The Tale of Mrs. Tiggy-Winkle | 1905 | [#15137](https://www.gutenberg.org/ebooks/15137) | `05-mrs-tiggy-winkle.txt` |
| 6 | The Tale of Mr. Jeremy Fisher | 1906 | [#15077](https://www.gutenberg.org/ebooks/15077) | `06-jeremy-fisher.txt` |
| 7 | The Tale of Tom Kitten | 1907 | [#14837](https://www.gutenberg.org/ebooks/14837) | `07-tom-kitten.txt` |
| 8 | The Tale of Jemima Puddle-Duck | 1908 | [#14814](https://www.gutenberg.org/ebooks/14814) | `08-jemima-puddle-duck.txt` |
| 9 | The Tale of the Flopsy Bunnies | 1909 | [#14220](https://www.gutenberg.org/ebooks/14220) | `09-flopsy-bunnies.txt` |
| 10 | The Tale of Mrs. Tittlemouse | 1910 | [#17089](https://www.gutenberg.org/ebooks/17089) | `10-mrs-tittlemouse.txt` |

## 2. 내려받아 저장하기

1. 위 표의 링크에서 **Plain Text UTF-8**(“Plain Text”, `pg14838.txt` 같은 이름)을 내려받습니다.
2. 이 폴더(`books/peter-rabbit/text/`)에 표의 파일 이름 그대로 저장합니다.
   `tools/embed-text.py`가 `*.txt`를 **이름순으로 이어 붙여** 한 파일을 한 장으로 만들기 때문에,
   앞의 두 자리 번호(`01-` … `10-`)를 반드시 붙여야 위에서 정한 순서대로 1~10장이 됩니다.
3. 프로젝트 루트에서 `./start.sh`를 실행하면 `text/book.js`가 만들어집니다
   (직접 실행하려면 `python3 tools/embed-text.py books/peter-rabbit`).

## 3. Gutenberg 머리말·꼬리말

파일마다 있는 `*** START OF THE PROJECT GUTENBERG EBOOK …` 이전과 `*** END OF …` 이후는 파서가 자동으로 걸러 냅니다.
직접 지울 필요는 없습니다. 남은 본문의 첫 줄(예: `THE TALE OF PETER RABBIT`)이 그 장의 첫 문단이 됩니다.

## 4. 저작권

열 편 모두 퍼블릭 도메인이므로 이 텍스트는 저장소에 넣어 배포해도 됩니다.
다만 `.gitignore`가 모든 책의 `text/*.txt`를 기본으로 제외하니, 배포하려면 예외 규칙을 추가하세요.

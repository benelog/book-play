# 원문 텍스트 넣기 — Grimm's Fairy Tales

Jacob·Wilhelm Grimm 동화집의 영어 번역(Edgar Taylor / Marian Edwardes)은 퍼블릭 도메인입니다.
Project Gutenberg #2591에는 **62편의 이야기가 파일 하나에** 들어 있으므로, 이 게임에서 쓰는 12편만 골라
**한 편씩 따로 파일로 저장**해야 합니다.

## 1. 내려받기

https://www.gutenberg.org/ebooks/2591 에서 **Plain Text UTF-8** 을 내려받습니다 (파일 이름 예: `pg2591.txt`).

## 2. 12편을 각각 파일로 나누기

`pg2591.txt`를 편집기로 열고, 각 이야기의 제목 줄부터 **다음 이야기 제목 줄 바로 앞까지**를 복사해
아래 이름으로 이 폴더(`books/grimms-fairy-tales/text/`)에 저장합니다.
제목 줄은 첫 줄로 그대로 남겨 두어도 됩니다.

| 파일 이름 | 원서 제목 (Gutenberg #2591) | 한국어 |
|---|---|---|
| `01-hansel-and-gretel.txt` | HANSEL AND GRETEL | 헨젤과 그레텔 |
| `02-rapunzel.txt` | RAPUNZEL | 라푼젤 |
| `03-rumpelstiltskin.txt` | RUMPELSTILTSKIN | 룸펠슈틸츠헨 |
| `04-the-frog-prince.txt` | THE FROG-PRINCE | 개구리 왕자 |
| `05-snowdrop.txt` | SNOWDROP | 백설 공주 |
| `06-ashputtel.txt` | ASHPUTTEL | 재투성이 아가씨 (신데렐라) |
| `07-little-red-cap.txt` | LITTLE RED-CAP | 빨간 모자 |
| `08-the-golden-goose.txt` | THE GOLDEN GOOSE | 황금 거위 |
| `09-the-travelling-musicians.txt` | THE TRAVELLING MUSICIANS | 브레멘 음악대 |
| `10-the-elves-and-the-shoemaker.txt` | THE ELVES AND THE SHOEMAKER | 요정과 구두장이 |
| `11-briar-rose.txt` | BRIAR ROSE | 들장미 공주 (잠자는 숲속의 미녀) |
| `12-the-fisherman-and-his-wife.txt` | THE FISHERMAN AND HIS WIFE | 어부와 아내 |

빨간 모자 이야기의 제목 줄은 원서에 `LITTLE RED-CAP [LITTLE RED RIDING HOOD]` 로 되어 있습니다.
대괄호 부제가 붙어 있어도 그대로 복사하면 됩니다.

## 3. 변환

`./start.sh` (또는 `python3 tools/embed-text.py`)를 실행하면 `text/book.js`가 만들어집니다.
번호 순서대로 이어 붙여 **파일 하나가 한 장(chapter)** 이 되므로, `scenes.js`의 12개 장과 순서가 정확히 맞습니다.
파일마다 Gutenberg 머리말·꼬리말이 붙어 있어도 자동으로 걸러 냅니다.

퍼블릭 도메인이므로 이 텍스트는 저장소에 넣어 배포해도 됩니다.
다만 `.gitignore`가 모든 책의 `text/*.txt`를 기본으로 제외하니, 배포하려면 예외 규칙을 추가하세요.

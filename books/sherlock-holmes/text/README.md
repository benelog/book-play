# 원문 텍스트 — The Adventures of Sherlock Holmes

Arthur Conan Doyle(1859–1930)의 단편집 *The Adventures of Sherlock Holmes*(1892)는 퍼블릭 도메인입니다.
Project Gutenberg #1661에는 **12편의 이야기가 파일 하나에** 들어 있으므로, 이 게임에서는
**한 편씩 따로 파일로 저장**해 파일 하나가 한 장(chapter)이 되게 했습니다.

## 1. 내려받기

https://www.gutenberg.org/ebooks/1661 에서 **Plain Text UTF-8** 을 내려받습니다
(`https://www.gutenberg.org/ebooks/1661.txt.utf-8`, 파일 이름 예: `pg1661.txt`).

## 2. 12편을 각각 파일로 나누기

원문에서 각 이야기의 제목 줄(`I. A SCANDAL IN BOHEMIA` 처럼 로마 숫자가 붙어 있음)부터
**다음 이야기 제목 줄 바로 앞까지**를 아래 이름으로 이 폴더(`books/sherlock-holmes/text/`)에 저장합니다.
Gutenberg 머리말·꼬리말과 앞쪽 목차(Contents)는 지우고, 제목 줄은 로마 숫자를 뗀 채 첫 줄로 남겨 둡니다.

| 파일 이름 | 원서 제목 (Gutenberg #1661) | 한국어 |
|---|---|---|
| `01-a-scandal-in-bohemia.txt` | A SCANDAL IN BOHEMIA | 보헤미아 왕국의 스캔들 |
| `02-the-red-headed-league.txt` | THE RED-HEADED LEAGUE | 빨간 머리 연맹 |
| `03-a-case-of-identity.txt` | A CASE OF IDENTITY | 신랑의 정체 |
| `04-the-boscombe-valley-mystery.txt` | THE BOSCOMBE VALLEY MYSTERY | 보스컴 계곡의 수수께끼 |
| `05-the-five-orange-pips.txt` | THE FIVE ORANGE PIPS | 다섯 개의 오렌지 씨앗 |
| `06-the-man-with-the-twisted-lip.txt` | THE MAN WITH THE TWISTED LIP | 입술이 비뚤어진 남자 |
| `07-the-blue-carbuncle.txt` | THE ADVENTURE OF THE BLUE CARBUNCLE | 푸른 카벙클 |
| `08-the-speckled-band.txt` | THE ADVENTURE OF THE SPECKLED BAND | 얼룩무늬 끈 |
| `09-the-engineers-thumb.txt` | THE ADVENTURE OF THE ENGINEER’S THUMB | 기술자의 엄지손가락 |
| `10-the-noble-bachelor.txt` | THE ADVENTURE OF THE NOBLE BACHELOR | 독신 귀족 |
| `11-the-beryl-coronet.txt` | THE ADVENTURE OF THE BERYL CORONET | 녹주석 보관 |
| `12-the-copper-beeches.txt` | THE ADVENTURE OF THE COPPER BEECHES | 너도밤나무 집 |

### 절(section) 번호 줄에 대하여

「보헤미아 왕국의 스캔들」과 「빨간 머리 연맹」은 원문 안에 `I.`, `II.`, `III.` 처럼 **로마 숫자만 있는 절 제목 줄**이 있습니다.
파일이 여러 개일 때 `tools/embed-text.py`가 `===` 구분자로 이어 붙이므로 파서(`js/parser.js`)는 이 줄을 장 제목으로
오인하지 않지만, 읽기 화면에 "I." 같은 한 글자짜리 문단이 남아 보기 싫으므로 **이 줄들은 지웠습니다**
(01에서 3줄, 02에서 1줄). 본문은 그 외에 손대지 않았습니다.

## 3. 변환

`./start.sh` (또는 `python3 tools/embed-text.py books/sherlock-holmes`)를 실행하면 `text/book.js`가 만들어집니다.
번호 순서대로 이어 붙여 **파일 하나가 한 장(chapter)** 이 되므로, `scenes.js`의 12개 장과 순서가 정확히 맞습니다.
(확인: 12장, 약 104,000단어.)

퍼블릭 도메인이므로 이 텍스트는 저장소에 넣어 배포합니다.

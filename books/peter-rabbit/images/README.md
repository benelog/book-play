# 삽화 넣기 — Beatrix Potter

Beatrix Potter(1943년 사망)가 직접 그린 원본 삽화는 퍼블릭 도메인입니다.
Project Gutenberg의 각 이야기 HTML판에 그림 파일이 모두 들어 있습니다.

## 1. 그림 내려받기

이야기마다 아래 페이지에서 **HTML zip**(“Download HTML (zip)”)을 받아 압축을 풀면
`images/` 폴더에 삽화가 들어 있습니다.

| 장 | 이야기 | Gutenberg HTML판 |
|----|--------|------------------|
| 1 | The Tale of Peter Rabbit | https://www.gutenberg.org/ebooks/14838 |
| 2 | The Tale of Squirrel Nutkin | https://www.gutenberg.org/ebooks/14872 |
| 3 | The Tale of Benjamin Bunny | https://www.gutenberg.org/ebooks/14407 |
| 4 | The Tale of Two Bad Mice | https://www.gutenberg.org/ebooks/45264 |
| 5 | The Tale of Mrs. Tiggy-Winkle | https://www.gutenberg.org/ebooks/15137 |
| 6 | The Tale of Mr. Jeremy Fisher | https://www.gutenberg.org/ebooks/15077 |
| 7 | The Tale of Tom Kitten | https://www.gutenberg.org/ebooks/14837 |
| 8 | The Tale of Jemima Puddle-Duck | https://www.gutenberg.org/ebooks/14814 |
| 9 | The Tale of the Flopsy Bunnies | https://www.gutenberg.org/ebooks/14220 |
| 10 | The Tale of Mrs. Tittlemouse | https://www.gutenberg.org/ebooks/17089 |

## 2. 이름 붙여 넣기

이야기마다 대표 그림을 **하나씩** 골라, 이 폴더(`books/peter-rabbit/images/`)에
위 표의 장 번호에 맞춰 저장합니다.

```
chapter-01.jpg   피터 래빗
chapter-02.jpg   다람쥐 넛킨
chapter-03.jpg   벤자민 버니
chapter-04.jpg   나쁜 생쥐 두 마리
chapter-05.jpg   티기윙클 부인
chapter-06.jpg   제레미 피셔
chapter-07.jpg   톰 키튼
chapter-08.jpg   제미마 퍼들덕
chapter-09.jpg   플롭시네 아기 토끼들
chapter-10.jpg   티틀마우스 부인
```

png도 됩니다(jpg, jpeg, png, webp, gif, svg 순으로 찾습니다).

## 3. 비율과 기본 그림

권장 비율은 **4:3** 입니다. 다른 비율은 가운데를 기준으로 잘라서 채웁니다.
Potter의 원본 삽화는 세로로 긴 것이 많으니, 4:3으로 잘랐을 때 인물이 가운데 오도록 미리 손보면 좋습니다.

파일이 없는 장은 제목만 있는 기본 그림을 보여 줍니다. 이 책에는 `art.js`(대체 삽화)가 없습니다.

## 4. 저작권

삽화는 퍼블릭 도메인이지만, `.gitignore`가 모든 책의 `images/*.jpg`, `*.png` 등 그림 파일을 기본으로 제외합니다.
저장소에 함께 배포하려면 예외 규칙을 추가하세요.

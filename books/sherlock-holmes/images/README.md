# 삽화 — Sidney Paget

Sidney Paget(1860–1908)이 *The Strand Magazine*(1891–92) 연재와 1892년 단행본에 그린 셜록 홈즈 삽화는
화가가 1908년에 세상을 떠났고 그림도 1892년 이전에 발표되었으므로 퍼블릭 도메인입니다.

그림은 Wikimedia Commons의 [Category:Illustrations from The Adventures of Sherlock Holmes by Sidney Paget](https://commons.wikimedia.org/wiki/Category:Illustrations_from_The_Adventures_of_Sherlock_Holmes_by_Sidney_Paget)
와 그 하위 분류(「A Scandal in Bohemia」 등)에서 가져왔습니다. Commons API(`action=query&prop=imageinfo&iiprop=url`)로 원본 URL을 얻어
`User-Agent: book-play/1.0 (https://book-play.benelog.net)` 헤더를 붙여 내려받았습니다.

Paget의 그림은 대부분 세로로 긴 판형이라, 머리가 잘리지 않도록 자르지 않고 **연한 크림색(#f4efe4) 4:3 캔버스 위에 맞춰 넣었습니다**:

```
convert in.jpg -resize 1200x900 -background '#f4efe4' -gravity center -extent 1200x900 -quality 90 out.jpg
```

| 파일 | 이야기·장면 | Commons 원본 |
|---|---|---|
| `cover.jpg` | 표지 — 베이커 가에서 의뢰인 윌슨의 이야기를 듣는 홈즈와 신문을 든 왓슨 (「빨간 머리 연맹」) | [Redh-02.jpg](https://commons.wikimedia.org/wiki/File:Redh-02.jpg) |
| `chapter-01.jpg` | A Scandal in Bohemia — 왕이 가면을 벗는 장면 (“He tore the mask from his face”) | [Strand2-065-HeToreTheMaskFromHisFace.jpg](https://commons.wikimedia.org/wiki/File:Strand2-065-HeToreTheMaskFromHisFace.jpg) |
| `chapter-02.jpg` | The Red-Headed League — 잠긴 사무실 문 앞의 윌슨 (“The door was shut and locked”) | [Sidney Paget - The Red-Headed League 01.jpg](https://commons.wikimedia.org/wiki/File:Sidney_Paget_-_The_Red-Headed_League_01.jpg) |
| `chapter-03.jpg` | A Case of Identity — 의뢰인을 맞이하는 홈즈 (“Sherlock Holmes welcomed her”) | [Sidney Paget - A Case of Identity 01.jpg](https://commons.wikimedia.org/wiki/File:Sidney_Paget_-_A_Case_of_Identity_01.jpg) |
| `chapter-04.jpg` | The Boscombe Valley Mystery | [Sidney Paget - The Boscombe Valley Mystery 02.jpg](https://commons.wikimedia.org/wiki/File:Sidney_Paget_-_The_Boscombe_Valley_Mystery_02.jpg) |
| `chapter-05.jpg` | The Five Orange Pips | [Sidney Paget - The Five Orange Pips 01.jpg](https://commons.wikimedia.org/wiki/File:Sidney_Paget_-_The_Five_Orange_Pips_01.jpg) |
| `chapter-06.jpg` | The Man with the Twisted Lip — 아편굴의 홈즈 | [Sherlock Holmes - The Man with the Twisted Lip.jpg](https://commons.wikimedia.org/wiki/File:Sherlock_Holmes_-_The_Man_with_the_Twisted_Lip.jpg) |
| `chapter-07.jpg` | The Blue Carbuncle — 라이더의 자백 (“Have mercy!”) | [Sidney Paget - The Adventure of the Blue Carbunkle 01.jpg](https://commons.wikimedia.org/wiki/File:Sidney_Paget_-_The_Adventure_of_the_Blue_Carbunkle_01.jpg) |
| `chapter-08.jpg` | The Speckled Band | [Sidney Paget - The Adventure of the Speckled Band 01.jpg](https://commons.wikimedia.org/wiki/File:Sidney_Paget_-_The_Adventure_of_the_Speckled_Band_01.jpg) |
| `chapter-09.jpg` | The Engineer’s Thumb | [Sidney Paget - The Adventure of the Engineer's Thumb 01.jpg](https://commons.wikimedia.org/wiki/File:Sidney_Paget_-_The_Adventure_of_the_Engineer's_Thumb_01.jpg) |
| `chapter-10.jpg` | The Noble Bachelor — 홈즈의 저녁 식탁 (“I will wish you all a very good night”) | [Sidney Paget - The Adventure of the Noble Bachelor 02.jpg](https://commons.wikimedia.org/wiki/File:Sidney_Paget_-_The_Adventure_of_the_Noble_Bachelor_02.jpg) |
| `chapter-11.jpg` | The Beryl Coronet — 번웰과의 대면 (“I clapped the pistol to his head”) | [Sidney Paget - The Adventure of the Beryl Coronet 01.jpg](https://commons.wikimedia.org/wiki/File:Sidney_Paget_-_The_Adventure_of_the_Beryl_Coronet_01.jpg) |
| `chapter-12.jpg` | The Copper Beeches | [Sidney Paget - The Adventure of the Copper Beeches 01.jpg](https://commons.wikimedia.org/wiki/File:Sidney_Paget_-_The_Adventure_of_the_Copper_Beeches_01.jpg) |

- 「A Scandal in Bohemia」 두 장(표지·chapter-01)은 *The Strand Magazine* 2권(1891년 7월호) 스캔이고, 나머지는 1892년 단행본(George Newnes) 판형 스캔입니다.
- 표지 그림 왼쪽 위의 흰 부분은 잡지 원본에서 본문이 그림을 감싸던 자리입니다.
- 다른 장면으로 바꾸고 싶으면 같은 분류에 이야기마다 8~10장씩 더 있습니다(예: `Redh-01.jpg` … `Redh-10.jpg`). 다만 그쪽은 대개 350px 안팎의 작은 스캔입니다.
- Project Gutenberg #1661에는 삽화가 없습니다. Commons를 쓸 수 없으면 삽화가 있는 Gutenberg #48320(1892년 Harper 판, 삽화가 이름 없음)의 HTML 판 이미지를 대신 쓸 수 있습니다.

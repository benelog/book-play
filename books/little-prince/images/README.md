# 삽화 — 자체 제작 만화풍 JPG

표지와 27개 장의 삽화는 `cover.jpg`, `chapter-01.jpg` … `chapter-27.jpg`에 있습니다.
모두 1200×900(4:3, 품질 90 JPEG)이며, 단순하고 얇은 윤곽선과 부드러운 색면을 살린 만화풍으로 편집했습니다. 기존 수채화 삽화의 장면과 구도를 바탕으로, 승인된 2장 시안을 공통 스타일 참고 이미지로 사용해 OpenAI 내장 이미지 편집 도구로 변환했습니다. 기존 수채화 원본 크기 파일은 `~/source/benelog/little-prince-assets-backup/generated-originals/`에 있습니다.

스타일 변환 공통 프롬프트(이미지 1: 해당 장의 기존 삽화, 이미지 2: 승인된 2장 시안):

> Use case: style-transfer. Image 1 is the EDIT TARGET; image 2 is ONLY the approved style reference. Redraw image 1 as one 4:3 landscape color illustration, faithfully preserving its own scene, subjects, character identities, poses, positions, objects, and framing. Match image 2's economical clean thin ink outlines, simple rounded manga faces with small understated eyes, simplified hair clumps, few fabric folds, pale warm colors and airy gentle atmosphere. Greatly reduce tiny lines, hatching, mechanical detail, busy texture and realistic shading. Broad flat color shapes, sparse soft shadows, subtle cream paper texture only, readable simplified backgrounds. Maintain target's time of day and narrative, including nighttime sky when present, but avoid muddy dark rendering. Match the blond prince's character design to reference if he appears. Do not transplant the reference's desert/airplane scene into the target. No added text, panels, speech bubbles, watermark or new characters. Produce exactly one image.

생텍쥐페리의 원본 수채화는 한국에서는 퍼블릭 도메인이지만 미국에서는 2039년까지 보호됩니다.
따라서 이 그림들은 원작 삽화의 구도나 선을 복제하지 않고, 각 장의 사건을 바탕으로 OpenAI 이미지 생성 도구를 사용해 새롭게 구성했습니다.

`art.js`의 SVG는 이미지 파일을 불러오지 못했을 때만 쓰는 가벼운 대체 삽화입니다.
실제 앱과 `tools/gallery.html?book=little-prince`에서는 이 폴더의 JPG를 우선 표시합니다.

## 본문 속 그림 — `pictures/`

`pictures/01-1.jpg` … 는 본문의 `[Picture 01-1: …]` 자리에 들어가는 그림입니다(23장, 1200×900 JPEG).
원서에서 그림을 가리키는 자리(보아뱀 그림 1·2호, 양, 상자, 소행성, 바오밥 …)와 인물이 처음 나오는 자리에 둡니다.
2026-09-25에 Codex CLI 내장 이미지 생성으로 만들었고, `chapter-02.jpg`·`chapter-21.jpg`를 스타일 참고 이미지로 보여 준 뒤
장면마다 새로 구성했습니다. 화자가 그린 그림(보아뱀, 양, 상자)은 종이에 크레용·연필로 그린 모습으로 그려
생텍쥐페리의 원본 그림을 닮지 않게 했습니다.

### 인물 맞춤 편집과 색 보정

새로 생성한 그림은 그대로 쓰지 않고 아래 두 단계를 거쳐 장 삽화와 인물·색을 맞췄습니다.

1. **인물 맞춤 편집** — 23장 가운데 인물이 나오는 17장은
   Codex CLI(`codex exec --sandbox workspace-write -C <repo> -o result.md - < prompt.md`, 한 장에 약 10분)로 다시 편집했습니다.
   대상 그림과 함께 `chapter-02.jpg`·`chapter-21.jpg`를 인물·스타일 참고 이미지로 주고, 대상의 장면·구도는 그대로 둔 채
   인물의 얼굴·머리·옷과 선·색감만 참고 이미지에 맞추도록 했습니다.
2. **색 보정** — Codex가 만든 PNG를 1200×900 JPEG로 바꾸면서 장 삽화의 따뜻하고 차분한 색에 맞춥니다.

   ```sh
   convert in.png -resize 1200x900^ -gravity center -extent 1200x900 \
     -modulate 86,90,100 +sigmoidal-contrast 1.2x50% -fill '#b07a3c' -colorize 7% \
     -blur 0x0.5 -strip -quality 86 -interlace Plane out.jpg
   ```

   인물이 없는 나머지 6장은 채도를 덜 낮추고 조금 더 흐리게 했습니다: `-modulate 86,98,100`, `-blur 0x0.6`.

3. **눈 맞춤** (2026-09-25) — 처음 만든 본문 그림은 눈이 흰자·하이라이트 없는 검은 점이어서 장 삽화와 달랐습니다.
   눈이 보이는 15장(02-1~02-5, 04-1, 08-1, 09-1, 10-1~15-1, 17-1)의 눈만 Codex로 다시 그렸습니다.
   장 삽화의 얼굴을 잘라 참고 이미지로 주었습니다: `chapter-08.jpg`·`chapter-13.jpg`의 어린 왕자, `chapter-02.jpg`의 조종사.
   기준은 다음과 같습니다. 작은 세로 타원 눈에 흰자가 보이고, 얇은 윗눈꺼풀 선이 있습니다. 홍채는 어린 왕자가 회청색, 어른이 갈색이고, 흰 하이라이트 점이 하나 있습니다.
   감은 눈과 내리깐 눈은 그대로 두었습니다. 색은 거의 바뀌지 않아 색 보정 없이 1200×900으로 줄이기만 했습니다.
   20-1(얼굴이 풀에 묻힘)과 26-1(눈 감음)은 손대지 않았습니다. 새 그림을 추가할 때도 이 눈 표현을 따르세요.

4. **등장인물 맞춤** (2026-09-25) — 어린 왕자 외의 인물은 장 삽화와 본문 속 그림에서 서로 다른 사람처럼 그려져 있었습니다.
   **장 삽화의 모습을 기준으로 정하고**, 본문 속 그림 10장의 인물만 Codex로 다시 그렸습니다. 참고 이미지로는 장 삽화에서 그 인물을 잘라 주었습니다.
   포즈, 위치, 소품(사업가의 꺼진 담배, 점등인의 빨간 체크무늬 손수건 등 본문에 나오는 것)은 그대로 두었습니다.

   | 인물 | 기준 모습 (장 삽화) | 고친 그림 |
   |---|---|---|
   | 조종사 | 흐트러진 짙은 갈색 곱슬머리, 짧은 수염(덥수룩한 턱수염 아님), 파란 작업복 셔츠, 크림색 스카프, 카키 바지 | 02-2 ~ 02-5 |
   | 왕 | 흰 긴 수염의 노인, 금관, 금색 별무늬 진홍색 망토와 흰 담비털 | 10-1 |
   | 허영쟁이 | 적갈색 곱슬머리와 콧수염, 흰 깃털 달린 챙 넓은 모자, 자주색 긴 코트, 금색 조끼, 크림색 반바지, 흰 스타킹 | 11-1 |
   | 술꾼 | 30~40대, 헝클어진 검은 머리, 회색 셔츠, 짙은 조끼 | 12-1 |
   | 사업가 | 마른 중년, 옆머리가 센 흐트러진 갈색 머리, 동그란 검은 안경, 흰 셔츠, 짙은 회색 조끼와 넥타이 | 13-1 |
   | 점등인 | 흰 수염 노인, 방울 달린 빨간 털모자, 남색 옷, 긴 주황빛 빨간 목도리 | 14-1 |
   | 지리학자 | 부스스한 흰 머리, 수염 없음, 동그란 안경, 남색 카디건 | 15-1 |

   여우·뱀·장미는 원래 서로 맞아서 손대지 않았습니다. 새 그림을 만들 때도 이 표의 모습을 따르세요.
   영화(`../film/`)의 `shots.js`에 그림마다 인물 위치가 있으니, 구도가 바뀌는 편집을 하면 그 값도 다시 재야 합니다.

Codex 원본 PNG는 남아 있지 않습니다. 다시 편집할 때는 이 폴더의 JPEG에서 시작하세요(색 보정을 두 번 거치지 않도록 `-modulate`·`-colorize`는 빼거나 약하게).

한 그림을 다시 편집할 때 확인할 점: 새 그림은 장 삽화보다 인물이 가깝게 잡힌 구도가 많습니다.
01-2(보아뱀 그림 1호)는 본문 설명대로 모자처럼 보여야 해서 윤곽이 원작 그림과 비슷할 수밖에 없으므로, 크레용으로 그린 아이 그림의 느낌을 유지하세요.

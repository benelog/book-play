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

Codex 원본 PNG는 남아 있지 않습니다. 다시 편집할 때는 이 폴더의 JPEG에서 시작하세요(색 보정을 두 번 거치지 않도록 `-modulate`·`-colorize`는 빼거나 약하게).

한 그림을 다시 편집할 때 확인할 점: 새 그림은 장 삽화보다 인물이 가깝게 잡힌 구도가 많습니다.
01-2(보아뱀 그림 1호)는 본문 설명대로 모자처럼 보여야 해서 윤곽이 원작 그림과 비슷할 수밖에 없으므로, 크레용으로 그린 아이 그림의 느낌을 유지하세요.

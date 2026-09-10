# 삽화 — 자체 제작 만화풍 JPG

원작 *The Efficiency Expert*(1921)에는 삽화가 없습니다. 이 폴더의 `cover.jpg`와 `chapter-01.jpg` … `chapter-28.jpg`는
각 장의 핵심 장면을 골라 **OpenAI 이미지 생성 도구로 새로 구성한 자체 제작 그림**이며, 어떤 기존 삽화도 복제하거나
참고하지 않았습니다. 모두 1200×900(4:3, 품질 90 JPEG)이고, 이 컴퓨터의 Codex CLI로
`codex exec --sandbox workspace-write -o result.md - < prompt.md` 를 실행해 한 번에 5~6장씩 만든 뒤
ImageMagick `convert … -resize 1200x900^ -gravity center -extent 1200x900 -quality 90` 으로 맞췄습니다.

장면 묘사 앞에 매번 붙인 공통 스타일 프롬프트:

> One 4:3 landscape colour illustration, storybook manga style. Economical clean thin ink outlines; simple rounded manga-like faces with small understated eyes and simplified hair clumps; few fabric folds; broad flat pale warm colours (cream, ochre, dusty rose, sage, soft slate blue); airy gentle atmosphere; sparse soft shadows; subtle cream paper texture; readable simplified backgrounds. Greatly reduce hatching, tiny lines, busy texture, mechanical detail and realistic shading; avoid muddy dark rendering even in night scenes. Setting is Chicago around 1920: roll-top desks, typewriters, ledgers, wooden filing cabinets, frosted-glass office partitions, belt-driven lathes and drill presses, streetcars, arc lamps, cloche hats, three-piece suits, flat caps. Absolutely NO text, lettering, readable signs, numbers, panels, speech bubbles, borders or watermark. Exactly one image.

등장인물이 여러 장에서 같은 모습으로 나오도록 인물 설명(지미 토런스: 키 크고 어깨 넓은 22세 청년, 짧은 검은 머리 /
메이슨 컴프턴: 철회색 머리와 콧수염의 60대, 불 붙이지 않은 시가 / 해럴드 빈스: 금발을 넘긴 마른 청년, 얇은 콧수염 /
엘리자베스 컴프턴: 검은 단발의 도도한 아가씨 / 해리엇 홀든: 연갈색 웨이브 머리의 다정한 아가씨 /
리저드: 납작모자를 쓴 작고 마른 남자 / 이디스 허드슨(리틀 이바): 갈색 머리의 작은 아가씨 /
스티브 머리: 체크 양복의 거구 / 오도넬 경관: 바다코끼리 콧수염의 순경 / 크로바크: 쥐상의 작은 노동자)을 함께 넣었습니다.

표지(`cover.jpg`)는 공장 사무실 창가에서 수첩을 든 지미가 기계 작업장을 내려다보는 장면입니다.
글자·말풍선은 넣지 않았습니다.

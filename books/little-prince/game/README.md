# 어린 왕자 3D 플레이 (프로토타입)

14장 "가로등 켜는 사람"의 별을 3D로 걸어 다니며 점등인과 영어로 대화하는 시험판입니다(2026-09-26).
`index.html`을 직접 열어도(`file://`) 동작합니다.

- 하루가 1분인 작은 별: 해가 돌면 점등인이 해 질 녘과 해 뜰 녘마다 가로등을 켜고 끕니다("Good evening." / "Good morning.").
- 점등인에게 다가가 말을 걸면(`E` 또는 Talk) `../scenes.js`의 14장 장면이 열립니다. 답 방식(Type/Choose)과 Korean help는 본편 설정(`lp.v1.settings`)을 함께 씁니다.
- 첫 장면과 둘째 장면 사이에 "40초 동안 햇빛 속에 머물기"를 직접 해 봅니다. 반나절이 30초라 가만히 서 있으면 실패하고, 지는 해를 향해 걸어야 합니다. 둘째 장면의 답("천천히 걸으면 된다")을 몸으로 먼저 겪게 하는 장치입니다.
- 끝나면 14장을 완료로 기록하고(`lp.v1.little-prince.progress`) 학습 이력에 남깁니다.
- 조작: ↑↓/WS 걷기, ←→/AD 돌기, Shift 달리기. 터치 기기는 왼쪽 아래 조이스틱.

## 파일

| 파일 | 내용 |
|---|---|
| `game.js` | 장면·카메라·조작·대화·퀘스트 |
| `models.js` | 3D 모델(.glb) base64. **생성물이라 직접 고치지 않습니다** |
| `vendor/three-game.min.js` | three.js r186 + GLTFLoader를 esbuild로 묶은 일반 스크립트(MIT, `vendor/three.LICENSE`) |
| `kenney/` | 모델 원본: Kenney Mini Characters·Nature Kit·Space Kit (CC0, 라이선스 파일 포함) |

## 모델 다시 만들기

```sh
blender -b --python tools/game-models.py            # models.js를 다시 씀
blender -b --python tools/game-models.py -- --keep-glb /tmp/glb   # .glb도 남김(확인용)
```

- 인물은 Kenney Mini Characters의 **골격과 애니메이션**(idle·walk·sprint·interact-right·emote-yes/no·sit)만 쓰고, 몸은 `images/characters/`의 기준 이미지를 보고 기본 도형으로 새로 만들어 뼈대(head·torso·arm·leg)에 강체로 붙였습니다.
- Kenney 골격은 쉬는 자세가 T자이고 idle에서 팔을 45° 내립니다. 그래서 새 팔은 미리 35° 내려서 만듭니다. 점등인의 장대는 idle 자세에서 똑바로 서도록 역산해서 붙였습니다(`posed()`).
- 소품은 가로등(직접 모델링), 바위·풀(Nature Kit), 크레이터(Space Kit)입니다. 원래 색이 밝아서 게임에서 머티리얼 이름별로 회청색·풀색으로 다시 칠합니다(`TINT`).
- 모양은 툰 셰이딩(3단)과 뒷면을 부풀린 잉크 외곽선으로 맞춥니다.

## 알려진 한계

- 인물이 기본 도형 조합이라 삽화보다 단순합니다. 이미지→3D 생성(Hyper3D·Hunyuan3D 등)은 개인 API 키가 있어야 시험할 수 있습니다.
- 본편 책 화면에서 여기로 오는 링크는 아직 없습니다.
- 서비스 워커의 미리 캐시 목록에 없으므로 오프라인 저장("Save for offline") 대상이 아닙니다.

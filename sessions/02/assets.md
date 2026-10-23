# Session 02 — official photography and player images

Retrieved and visually checked on **2026-10-23**. All delivered images were sourced from the Samsung Lions official website. The four player identities and numbers were checked against the official roster search and individual profile pages that display the 2026 season.

## Usage and rights

This is an independent fan concept, not the official Samsung Lions website. Photographs, player likenesses, team marks, and sponsor marks remain the property of their respective rights holders. Their appearance on an official public webpage is not a grant of a reuse license. Preserve the site's fan-concept identification and source attribution; obtain appropriate rights before a commercial launch or other distribution requiring permission.

Suggested site attribution: **“팬이 만든 비공식 콘셉트 사이트입니다. 사진·로고의 권리는 삼성 라이온즈 및 각 권리자에게 있습니다.”**

No generated people or places were used. No watermarks, sponsor marks, signage, or baked-in promotional text were removed. The only visual transformations were WebP encoding and a centered square crop of the wide player profile images to remove empty horizontal margins. Photographs were not enlarged beyond their native resolution.

## Delivered assets

Paths below are relative to `public/images/lions/`. Sizes are exact bytes. All eight assets are referenced by the site. All landscape photos keep their original 16:9 framing; the roster crops are square.

| Asset | Delivered size | Bytes | Image and site use | Suggested alt text |
| --- | --- | ---: | --- | --- |
| `hero-stadium.webp` | 1280 × 720 | 194,370 | Players high-fiving in front of crowded stands. Used as the home hero with a dark CSS gradient for the heading. This is an on-field match-day scene, not an aerial stadium panorama. | 관중석 앞에서 하이파이브하며 기쁨을 나누는 삼성 라이온즈 선수들 |
| `stadium.webp` | 1280 × 720 | 133,644 | Full team at Lions Park at night, with the actual stadium scoreboard and a physical team banner. Used in the home park feature and club guide. | 라이온즈파크 전광판 앞에 함께 선 삼성 라이온즈 선수단 |
| `story-team.webp` | 1280 × 720 | 135,474 | Two players exchanging a fist bump on the field. Used on the home Lions TV link card. | 그라운드에서 주먹을 맞대며 격려하는 삼성 라이온즈 선수들 |
| `story-fans.webp` | 1280 × 720 | 83,836 | Díaz celebrating with full stands behind him. Used on the home Instagram link card. The foreground subject is a player, not a fan-only crowd scene. | 관중석을 배경으로 세리머니하는 삼성 라이온즈 디아즈 |
| `player-koo.webp` | 380 × 380 | 25,322 | 구자욱, no. 5, official current profile head-and-shoulders crop. | 삼성 라이온즈 외야수 구자욱 |
| `player-won.webp` | 422 × 422 | 36,988 | 원태인, no. 18, official current profile head-and-shoulders crop. | 삼성 라이온즈 투수 원태인 |
| `player-kang.webp` | 422 × 422 | 30,470 | 강민호, no. 47, official current profile head-and-shoulders crop. | 삼성 라이온즈 포수 강민호 |
| `player-kim.webp` | 422 × 422 | 30,508 | 김지찬, no. 58, official current profile head-and-shoulders crop. | 삼성 라이온즈 외야수 김지찬 |

**Total delivered image payload:** 670,612 bytes (about 655 KiB), across eight WebP files. The hero is below 250 KB; every supporting image is below 150 KB; every player image is below 100 KB. The four player portraits appear in the home spotlight and player explorer.

The shop page uses code-rendered typography and the existing `/logo.svg` team mark to introduce the official stores. It does not display product photography or the store's promotional banners. No store banner is included in this photo set.

## Exact sources

### Match-day and editorial photography

All four images appeared in the official homepage carousel: <https://www.samsunglions.com/index.asp>. A current homepage placement does not establish when a photograph was originally captured.

- `hero-stadium.webp`: <https://www.samsunglions.com/upload/new_main/1006삼성라이온즈_홈페이지_메인대문배너_2_v.03.jpg>
- `stadium.webp`: <https://www.samsunglions.com/upload/new_main/1014삼성라이온즈_홈페이지_메인대문배너_1(2).png>
- `story-team.webp`: <https://www.samsunglions.com/upload/new_main/1014삼성라이온즈_홈페이지_메인대문배너_4.png>
- `story-fans.webp`: <https://www.samsunglions.com/upload/new_main/1014삼성라이온즈_홈페이지_메인대문배너_3(2).png>

### Player profiles

Roster verification: <https://www.samsunglions.com/roster/roster_search.asp>.

| Player | Official profile | Exact image source | Original dimensions |
| --- | --- | --- | --- |
| 구자욱 · 5 · 외야수 | <https://www.samsunglions.com/roster/roster_2.asp?pcode=A0033> | <https://www.samsunglions.com/upload/player/A0033_player_img_top(2).png> | 900 × 380 |
| 원태인 · 18 · 투수 | <https://www.samsunglions.com/roster/roster_2.asp?pcode=A0399> | <https://www.samsunglions.com/upload/player/A0399_player_img_top(2).png> | 1000 × 422 |
| 강민호 · 47 · 포수 | <https://www.samsunglions.com/roster/roster_2.asp?pcode=A0354> | <https://www.samsunglions.com/upload/player/A0354_player_img_top(2).png> | 1000 × 422 |
| 김지찬 · 58 · 외야수 | <https://www.samsunglions.com/roster/roster_2.asp?pcode=A0428> | <https://www.samsunglions.com/upload/player/A0428_player_img_top(2).png> | 1000 × 422 |

The official roster's displayed season statistics were zeroed at retrieval; no performance numbers were inferred from these images or profile placeholders.

## Selection and visual verification

All eight retained images were visually checked in the contact sheet after WebP encoding. Player names were matched to their source profiles before filenames were assigned. Portraits retain the cap and face without clipping; the original textured white background is preserved. The four photographs remain sharp at their native size, and the original event signage and sponsor marks remain in place.

The following official assets were inspected but not included:

- Gateway `images/2016gates/gate_bg.jpg`: a blurred architectural rendering of the park, unsuitable for a real-photo hero.
- The official stadium introduction at <https://www.samsunglions.com/intro/intro05.asp> publishes `mobile/img/img_dslp_m_01.jpg` through `08.jpg`, including a beautiful sunset and wide park views, but the actual images are only **320 × 156**. They were not enlarged for a full-width desktop hero.
- `img/intro/k_greeting2023.png`: a real stadium photograph with a large baked-in “WIN OR WOW” graphic; not used because that heading would conflict with the redesign.
- The official stadium guide at <https://www.samsunglions.com/intro/intro05_4.asp> provides instructional graphics instead of clean editorial photography.

The source gallery limitation is why the delivered hero emphasizes an authentic team-and-crowd moment at the park rather than a wide architectural view.

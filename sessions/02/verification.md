# Session 02 · Production verification

Verified on **2026-10-23** against the finished application. Final browser run: **02:31:22–02:31:59 UTC**.

## Result

**All final checks passed.** The documented default production build succeeded, and the resulting production server passed **48 browser scenarios**, including **32 route and viewport checks**. The three findings from the independent review were corrected and verified: monthly match details become visible and focused, small informative labels have sufficient contrast, and the displayed shirt number `05` can be searched as `05` or `#05`.

## Commands and environment

| Command | Exit | Observed result |
| --- | ---: | --- |
| `npm run lint` | 0 | No lint errors; rerun after the final smoke-script changes. |
| `npm run typecheck` | 0 | TypeScript completed without errors. |
| `npm test` | 0 | **14 passed, 0 failed, 0 skipped** with the final `--experimental-test-isolation=none` flag. |
| `npm run build -- --webpack` | 0 | Production compilation, TypeScript, static generation, and build traces completed. |
| `npm run build` | 0 | Default **Turbopack** production build completed; all application routes were prerendered. |
| `npm run start -- --hostname 0.0.0.0 --port 3187` | Running | Production server became ready in 126 ms. |
| `node scripts/smoke.mjs` with the environment variables below | 0 | **48 passed, 0 failed** against the default production output. |

Environment: **Node.js 24.19.0**, **Next.js 16.2.9**, **Chromium 148.0.7778.96**, Linux. The repository declares Node.js `>=22.14.0`; this final execution used Node.js 24.19.0, not a separate Node.js 22 installation.

An earlier development run encountered a Turbopack cache error containing `invalid digit found`. It did **not** recur in this final default production build. Both webpack and Turbopack were verified; the browser evidence below comes from the **default Turbopack build**. No default build script was changed to hide the earlier environment issue.

The npm commands emitted the environment warning `Unknown env config "http-proxy"`; it did not produce a build, lint, type-check, or test failure.

## Production browser coverage

The suite visited `/`, `/club`, `/matches`, `/players`, `/history`, `/community`, `/shop`, and `/admin` at **360, 390, 768, and 1440 px** widths. Mobile/tablet viewports used an 844 px height; desktop used 1000 px.

Across all **32 combinations**, the server returned HTTP 200, each page had one substantive main heading, images loaded, and the document stayed within its viewport. The suite also checked **23 unique internal links**, including the championship deep links, against real route and fragment targets.

| Counter | Final result |
| --- | ---: |
| Browser scenarios passed | 48 |
| Browser scenarios failed | 0 |
| Route and viewport combinations passed | 32 |
| Uncaught browser errors | 0 |
| Console errors | 0 |
| Unexpected local resource failures | 0 |
| Requests to external origins during the checks | 0 |
| Intentionally blocked script requests in no-JavaScript mode | 2 |

### Navigation and keyboard behavior

The mobile menu opens as a native modal dialog. Keyboard traversal never reaches an element behind it. Chromium briefly transfers focus to browser chrome at the end of the native dialog's Tab sequence; the test distinguishes that from page-background focus. Escape closes the menu, returns focus to its trigger, and restores body scrolling. Selecting a mobile route also closes the menu and restores scrolling.

The `/history#season-2014` link clears the sticky header. Its native disclosure expands and displays the 2014 championship description.

### Player search and calendar

Player search finds 구자욱 using `#05`, `05`, and his Korean name. Position filtering, combined search/filter empty states, and reset all work.

The calendar moves from December 2026 to January 2027 and back, returns to the verified month, and identifies unknown-month data as an incomplete snapshot. The snapshot has **14 listed games**, with **9 home** and **5 away** records; filters and selected-day details agree. Selecting a date without a recorded game retains the qualification that missing snapshot data does not mean no game was scheduled.

Selecting the final October 31 row now moves keyboard focus to the detail panel and brings the complete panel into the mobile viewport. This passed with both normal and reduced-motion preferences. Under reduced motion, the observed panel occupied **220–560 px** in the **844 px** viewport.

### Contrast and resilient behavior

The six informative text styles identified during review now have measured contrast ratios between **5.45:1 and 6.14:1**, above the 4.5:1 threshold used by the check. This includes calendar times, the season and time-zone labels, postseason text, social handles, and the checklist's storage explanation.

The checklist recovers from invalid stored JSON, saves valid selections across reload, resets correctly, and remains interactive when access to local storage throws `SecurityError`.

With JavaScript disabled, the home page retains its loaded fonts, heading, **six visible content sections**, and **11 visible footer links**. A footer link still navigates to the server-rendered player page, which shows all four spotlight cards. No iframe appears. Chromium's two expected script-blocking events in this mode are recorded separately from unexpected resource failures.

Reduced-motion mode uses automatic scrolling and a **0.00001-second** hero animation duration. The admin route presents a read-only content guide, has no save form or editable controls, and declares `noindex`.

## Screenshots

JPEGs use quality **78**. The capture routine scrolls through the page to load lazy images, returns to the top, and waits for fonts before capturing. The final desktop hero and mobile layouts were visually reviewed.

| Screenshot | Dimensions | Bytes |
| --- | --- | ---: |
| [Desktop hero](screenshots/home-desktop-hero.jpg) | 1440 × 1000 | 155,828 |
| [Full desktop home](screenshots/home-desktop.jpg) | 1440 × 4746 | 568,305 |
| [Full mobile home](screenshots/home-mobile.jpg) | 390 × 5705 | 272,102 |
| [Mobile match calendar](screenshots/matches-mobile.jpg) | 390 × 3718 | 125,100 |
| [Desktop players](screenshots/players-desktop.jpg) | 1440 × 2124 | 179,492 |

Total screenshot size: **1,300,827 bytes** (approximately **1.30 MB**).

## Reproduce

Run the ordinary repository checks, build, and start the production server:

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm run start -- --hostname 0.0.0.0 --port 3187
```

In another terminal, with Playwright available as a development tool:

```sh
SMOKE_BASE_URL=http://127.0.0.1:3187 \
SMOKE_SCREENSHOT_DIR=sessions/02/screenshots \
SMOKE_REPORT=/tmp/lions-production-smoke.json \
node scripts/smoke.mjs
```

The script first resolves a local `playwright` installation, then optionally uses `CODEX_PRIMARY_RUNTIME_NODE_MODULES` when a managed environment provides it. It adds no application runtime dependency. Chromium installed by Playwright is the default; to use another installed browser, also set `SMOKE_CHROMIUM_EXECUTABLE=/path/to/chromium`. Screenshot and JSON-report output are optional. The browser script expects the production server to be running; it does not start or stop it.

## Limits

This is production verification on Chromium in the local environment. It is not an exhaustive screen-reader, Safari, Firefox, real-device, or throttled-network audit. No public deployment or commercial purchase flow was tested. Outbound official links were inspected as destinations; the smoke suite did not visit them. The schedule remains a labelled static snapshot rather than a live feed. Node.js 22 compatibility was not separately executed in this environment.

## Repository delivery

- Pull request: [#1 — 라팍의 열기를 담은 삼성 라이온즈 팬 경험 리뉴얼](https://github.com/hslcrb/samsung_Lions-newwebapp/pull/1)
- Branch: `chatgpt/session-02/blue-pride`; base: `master`.
- Incremental commit count: **30**, including this closing verification-document commit.
- Final remote head: [branch commit history](https://github.com/hslcrb/samsung_Lions-newwebapp/commits/chatgpt/session-02/blue-pride). The 29 preceding commits are listed below; the final documentation commit records this report and the completed plan.
- Every commit uses an English prefix and Korean message. Each commit was immediately published to the remote branch with an expected-parent SHA check, then synchronized into the shallow checkout. No unpushed commit batch was accumulated.
- Shallow checkout confirmed with `git rev-parse --is-shallow-repository` → `true`.
- The PR is open and ready for review. The production branch has not been merged or promoted by this task.
- The existing Vercel Git integration creates preview deployments automatically. The latest preview status and link are tracked in the PR; the 48-scenario evidence above is from the local production build.

### Incremental commit ledger

| # | Commit | Message |
| ---: | --- | --- |
| 1 | [`1d854e2c`](https://github.com/hslcrb/samsung_Lions-newwebapp/commit/1d854e2c93d7aec341771cf4e60b731eb953f2e1) | docs: 라이온즈 리뉴얼 설계와 세션 계획 기록 |
| 2 | [`88b344d2`](https://github.com/hslcrb/samsung_Lions-newwebapp/commit/88b344d227e678aeb8c657a576f9e433319ed30f) | feat: 공식 자료 기반 구단과 선수 콘텐츠 구성 |
| 3 | [`e5be332a`](https://github.com/hslcrb/samsung_Lions-newwebapp/commit/e5be332a39e3bd4bcaff25e3dd85423f428e41c0) | feat: 확인 날짜를 명시한 공식 경기 일정 구성 |
| 4 | [`ecfbca35`](https://github.com/hslcrb/samsung_Lions-newwebapp/commit/ecfbca35fa37b249f2e8648ba6fdfc5a47d7f3ec) | asset: 라이온즈 현장 사진 최적화와 출처 기록 |
| 5 | [`e051908c`](https://github.com/hslcrb/samsung_Lions-newwebapp/commit/e051908cea1b72ad9e485b21b8626577f0fa5601) | asset: 공식 선수 사진 네 장 경량화 |
| 6 | [`788b12a9`](https://github.com/hslcrb/samsung_Lions-newwebapp/commit/788b12a915a18f7e5d1bd513d104854b26a42c9b) | feat: 반응형 내비게이션과 접근 가능한 모바일 메뉴 구현 |
| 7 | [`6b00101b`](https://github.com/hslcrb/samsung_Lions-newwebapp/commit/6b00101b09b14b45b0ad6cbfe34bfcd6568ad5c5) | feat: 선수 스포트라이트 검색과 포지션 필터 구현 |
| 8 | [`75a72d3a`](https://github.com/hslcrb/samsung_Lions-newwebapp/commit/75a72d3ad389f8b6a7676c949b5dc6b1c0fc1de4) | asset: 한글과 스포츠 서체를 로컬 경량 폰트로 구성 |
| 9 | [`40fb5439`](https://github.com/hslcrb/samsung_Lions-newwebapp/commit/40fb5439012bb1e42da63c3e27d2177b68b0bb79) | style: 라이온즈 청백 컬러와 공통 반응형 스타일 정립 |
| 10 | [`453bcb10`](https://github.com/hslcrb/samsung_Lions-newwebapp/commit/453bcb10188725f532fa14074318775313bafcec) | feat: 실제 라팍 사진으로 블루 프라이드 히어로 재구성 |
| 11 | [`9a8ef707`](https://github.com/hslcrb/samsung_Lions-newwebapp/commit/9a8ef707a8b1b4b258cdb25d7f18e4b80b884ed6) | feat: 경기 선수 역사 직관으로 이어지는 홈 콘텐츠 구현 |
| 12 | [`100050af`](https://github.com/hslcrb/samsung_Lions-newwebapp/commit/100050af0aa1e1dce691e92cc887d673376e9ff4) | style: 메인 스포츠 에디토리얼과 모바일 레이아웃 완성 |
| 13 | [`76aeb8e9`](https://github.com/hslcrb/samsung_Lions-newwebapp/commit/76aeb8e95b5cf4abb7c2fecfe5113e474dab19b3) | style: 팬 페이지의 청백 에디토리얼과 가독성 정리 |
| 14 | [`eed25791`](https://github.com/hslcrb/samsung_Lions-newwebapp/commit/eed25791114509d3910553c0ff0e90815fd7f599) | feat: 라이온즈 구단 소개와 라팍 직관 안내 구현 |
| 15 | [`0195f5f6`](https://github.com/hslcrb/samsung_Lions-newwebapp/commit/0195f5f64186e1ec608f580b01b8dbc1bc6ad5d7) | feat: 여덟 번의 우승과 영구결번 역사 구성 |
| 16 | [`7c33c003`](https://github.com/hslcrb/samsung_Lions-newwebapp/commit/7c33c00364b6c2df077530c3b0a8eaaaa35a2450) | feat: 공식 팬 채널과 저장되는 직관 체크리스트 구현 |
| 17 | [`bd569a3a`](https://github.com/hslcrb/samsung_Lions-newwebapp/commit/bd569a3a70dfd61b4b51f66de7ae138d65c71f78) | asset: 팬과 선수의 현장 이야기를 담은 사진 추가 |
| 18 | [`34631657`](https://github.com/hslcrb/samsung_Lions-newwebapp/commit/346316578f5d0fd40178ca804964c083ef88588f) | feat: 공식 어센틱 숍과 팀스토어 안내 구성 |
| 19 | [`336aa03a`](https://github.com/hslcrb/samsung_Lions-newwebapp/commit/336aa03ad318b7f0d3c2de5484ed4e2835595a42) | style: 경기 달력과 선택 일정의 반응형 화면 완성 |
| 20 | [`815f2263`](https://github.com/hslcrb/samsung_Lions-newwebapp/commit/815f226375a6d56611e255308588da6f1e77f280) | feat: 월별 경기 탐색과 홈 원정 필터 구현 |
| 21 | [`27fb13fe`](https://github.com/hslcrb/samsung_Lions-newwebapp/commit/27fb13fecc87d10f914092973a4287fe2d70ccd7) | feat: 전 페이지에 공통 내비게이션과 팬 사이트 메타데이터 연결 |
| 22 | [`761df660`](https://github.com/hslcrb/samsung_Lions-newwebapp/commit/761df660046beb029029e93a0ff1eda9010ccee9) | fix: 표시된 등번호 형식으로도 선수를 검색하도록 수정 |
| 23 | [`40a53e09`](https://github.com/hslcrb/samsung_Lions-newwebapp/commit/40a53e0921608915f1cd9891abf9f3bdb15a0913) | refactor: 동작하지 않는 관리자 화면을 콘텐츠 안내로 정리 |
| 24 | [`f0f631d3`](https://github.com/hslcrb/samsung_Lions-newwebapp/commit/f0f631d36a27526732a3f96555ba2f4a3cf1c919) | refactor: 사용하지 않는 가짜 콘텐츠와 장식 효과 코드 제거 |
| 25 | [`ab6b056c`](https://github.com/hslcrb/samsung_Lions-newwebapp/commit/ab6b056c4f7438acfb7f6cb7c7d2d4f021fd4469) | test: 경기 날짜와 달력 계산 검증 및 실행 명령 추가 |
| 26 | [`1f8125cc`](https://github.com/hslcrb/samsung_Lions-newwebapp/commit/1f8125cce49f27f2f7fbd97336deba99d7e49c66) | docs: 실행 방법과 정적 데이터 범위 및 출처 정리 |
| 27 | [`f6ae700c`](https://github.com/hslcrb/samsung_Lions-newwebapp/commit/f6ae700ce25384deff429b2179d33459154c06ad) | test: 프로덕션 반응형 화면과 핵심 사용자 흐름 검증 추가 |
| 28 | [`88485f3d`](https://github.com/hslcrb/samsung_Lions-newwebapp/commit/88485f3d19c541f7d92b4e8c1d8e7c4fa25da624) | docs: 완성된 홈의 데스크톱과 모바일 화면 기록 |
| 29 | [`0ccd6f22`](https://github.com/hslcrb/samsung_Lions-newwebapp/commit/0ccd6f229e11c2cabd3a497cbd245b1d8a5990ab) | docs: 경기 달력과 선수 탐색 검증 화면 기록 |


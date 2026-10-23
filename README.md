# BLUE IS OUR HOME

삼성 라이온즈를 응원하는 팬을 위한 **독립적인 비공식 콘셉트 사이트**입니다. 경기일의 설렘, 선수, 구단의 역사와 직관 준비를 하나의 경험으로 연결합니다. 삼성 라이온즈의 공식 서비스가 아니며, 예매와 상품 구매는 공식 서비스로 안내합니다.

## 실행하기

Next.js **16.2.9**, React **19.2.4**, TypeScript를 사용합니다. **Node.js 22.14 이상**이 필요하며, 테스트 실행 환경은 **Node.js 24**를 권장합니다.

```bash
npm ci
npm run dev
```

[http://localhost:3000](http://localhost:3000)에서 확인합니다. 환경 변수, API 키, 데이터베이스, 계정 설정은 필요하지 않습니다.

| 명령 | 용도 |
| --- | --- |
| `npm run dev` | 개발 서버 |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 빌드한 사이트 실행 |
| `npm run lint` | ESLint 검사 |
| `npm run typecheck` | TypeScript 검사 |
| `npm test` | 일정 데이터·달력 계산 테스트 |

개발 환경에서 기존 Turbopack 캐시와 호환 문제가 발생하면 `npm run dev -- --webpack`으로도 실행할 수 있습니다. 이 작업공간에서는 이 방식으로 개발 서버를 확인했습니다.

## 페이지

| 경로 | 내용 |
| --- | --- |
| `/` | 홈: 경기 안내, 선수, 우승 기록, 라팍과 팀 이야기 |
| `/club` | 구단 소개와 라이온즈파크 방문 안내 |
| `/matches` | 월별 경기 달력과 일정 필터 |
| `/players` | 선수 스포트라이트, 검색과 포지션 필터 |
| `/history` | 우승 기록과 영구결번 |
| `/community` | 팬 채널과 직관 준비 체크리스트 |
| `/shop` | 공식 어센틱 숍과 팀스토어 안내 |

`/admin`은 저장소에서 수정할 파일을 알려 주는 **읽기 전용 콘텐츠 관리 안내**입니다. 온라인 편집·저장 기능이나 관리자 인증 시스템은 없습니다.

## 데이터와 동작 범위

경기 일정은 **2026.10.23에 공식 홈페이지에서 확인한 2026년 10월 정적 스냅샷**입니다. 실시간 일정, 경기 결과, 중계 점수를 제공하지 않습니다. 일정 변경과 당일 공지는 [삼성 라이온즈 공식 일정](https://www.samsunglions.com/score/score_index.asp)에서 확인하세요. 데이터 수정 시 확인 날짜와 [출처 기록](sessions/02/sources.md)도 함께 갱신합니다.

직관 체크리스트는 이 브라우저의 `localStorage`에 항목 ID만 저장합니다. 서버나 외부 서비스로 전송하지 않으며, 브라우저 저장을 사용할 수 없으면 현재 방문 중에만 메모리에서 유지됩니다. 이 프로젝트에는 백엔드, 로그인, 결제 처리 기능이 없습니다.

## 수정할 파일

| 위치 | 내용 |
| --- | --- |
| `src/data/lions.ts` | 구단·선수·우승·영구결번·공식 링크 |
| `src/data/schedule.ts` | 경기 일정, 확인 날짜, 달력 계산 |
| `src/app/` | 페이지, 공통 레이아웃, 스타일 |
| `src/components/` | 히어로, 홈 섹션, 달력, 선수 검색, 체크리스트 |
| `public/images/lions/` | 최적화한 공식 사진과 이미지 |
| `public/fonts/` | 로컬 웹폰트와 원본 OFL 라이선스 |
| `scripts/test-schedule.mjs` | 일정·날짜 계산 검증 |

사진·로고·선수 이미지의 권리는 삼성 라이온즈와 각 권리자에게 있습니다. 공개된 공식 이미지는 별도의 재사용 허가를 의미하지 않습니다. 이미지 출처와 처리 내역은 [assets.md](sessions/02/assets.md), Freesentation·Bebas Neue의 출처와 OFL 기록은 [fonts.md](sessions/02/fonts.md)에 정리되어 있습니다. 구단 정보의 근거는 [sources.md](sessions/02/sources.md), 디자인 방향은 [design.md](sessions/02/design.md)를 참고하세요.

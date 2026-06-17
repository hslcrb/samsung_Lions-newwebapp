# Implementation Plan - Switch to Light Mode

삼성 라이온즈 웹사이트를 화이트 톤의 라이트 모드로 전환하고, 기존 다크 모드 코드를 주석 처리합니다.

## Proposed Changes

### 🎨 테마 및 스타일 (Theme & Styles)

#### [MODIFY] [content.tsx](file:///home/rheehose/문서/samsung_Lions-newwebapp/src/cms/content.tsx)
테마 색상을 다크 배경(#000000)에서 라이트 배경(#FFFFFF)으로, 텍스트 색상을 화이트(#FFFFFF)에서 다크(#111111)로 변경합니다.

#### [MODIFY] [globals.css](file:///home/rheehose/문서/samsung_Lions-newwebapp/src/app/globals.css)
CSS 변수와 테일윈드 테마 설정을 라이트 모드 중심으로 재설정하고, 다크 모드 관련 로직은 주석 처리합니다.

### 🍱 컴포넌트 조정 (Component Adjustments)

#### [MODIFY] [Header.tsx](file:///home/rheehose/%EB%AC%B8%EC%84%9C/samsung_Lions-newwebapp/src/components/Header.tsx), [Hero.tsx](file:///home/rheehose/%EB%AC%B8%EC%84%9C/samsung_Lions-newwebapp/src/components/Hero.tsx), [MainSections.tsx](file:///home/rheehose/%EB%AC%B8%EC%84%9C/samsung_Lions-newwebapp/src/components/MainSections.tsx), [FooterSections.tsx](file:///home/rheehose/%EB%AC%B8%EC%84%9C/samsung_Lions-newwebapp/src/components/FooterSections.tsx)
`bg-black`, `text-white` 등 하드코딩된 다크 모드 클래스를 제거하거나 적절한 라이트 모드 클래스로 교체합니다.

## Verification Plan

### Automated Tests
- `npm run build`를 통해 빌드 정상 여부를 확인합니다.

### Manual Verification
- 브라우저에서 배경이 하얗고 텍스트가 검게 잘 나오는지 확인합니다.
- 히어로 섹션과 섹션 간의 경계가 라이트 모드에서도 자연스러운지 확인합니다.

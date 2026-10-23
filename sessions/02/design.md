# Session 02 · BLUE PRIDE

Date: 2026-10-23 (Asia/Seoul)
Base: `master` / `701e144`, depth-one checkout.
Working branch: `chatgpt/session-02/blue-pride`.

## Intent

Rebuild the existing Samsung Lions fan concept into a distinctive, useful club experience. The user explicitly delegates creative decisions and implementation, requests very small commits, and requires a push after every commit. Messages use `English prefix: 한국어 설명`. This is an independent fan redesign, not an official club service.

## Findings

- Six public routes are identical coming-soon screens.
- The home page loads an autoplay YouTube iframe before meaningful club content.
- Primary CTAs, mobile navigation, product tiles and social cards do not work.
- Content advertises old 2024 products and unsupported prices/promotions.
- Nine externally hosted font weights and hidden-until-JavaScript sections add unnecessary loading and resilience risks.
- Metadata incorrectly presents the project as official.

## Design

Direction: **BLUE IS OUR HOME.** A contemporary sports editorial with royal blue, ice blue, white, navy and real club photography. Flat section borders, large condensed display type, disciplined Korean typography, compact utility information and generous photography. No generic gradient cards, emoji navigation, fake live scores or invented merchandise prices.

The home page tells a deliberate story: identity → match day → our players → the eight championships → a day at Lions Park → fan channels and official shops. All six existing public sections become useful destinations. The original logo and championship assets are retained; official imagery is credited separately.

### Information architecture

- `/`: visual club manifesto; date-labelled schedule snapshot; player preview; championship strip; stadium guide; club stories.
- `/matches`: accessible monthly calendar, home/away filtering, date selection, source-labelled official schedule links.
- `/players`: verified player spotlight, position filtering, name/number search, official full roster links.
- `/history`: all eight championship years, 1985 distinction, four retired numbers, source links.
- `/club`: identity, stadium introduction, transport and seat-guide links.
- `/community`: Lions TV and official social channels, personal match-day checklist, useful fan links.
- `/shop`: authentic and lifestyle official stores, no fictitious stock/prices or checkout.
- `/admin`: honest read-only content guide rather than an inert fake save button.

### Implementation

Next.js 16.2.9 App Router, React 19, existing TypeScript/Tailwind setup. Server components by default. Client islands only for mobile menu, player filtering, calendar, and local checklist. Local optimized WebP images and local fonts. No new runtime dependency. No external iframe on initial load. Shared shell in the root layout; shared content in typed data modules. Native links, buttons, labels, details elements and visible focus states. Reduced-motion support; content visible without JavaScript.

### Data rules

Facts come from Samsung Lions official pages. Schedule is a dated snapshot, not a live API; the UI identifies the observation date and directs users to the authoritative schedule. Unavailable scores/records are not synthesized. The 1985 title is the combined first/second half title, so the site says eight championships, not eight Korean Series wins. Branding, photography and logos remain the rights of their owners.

## Acceptance

1. All existing public routes render substantive page-specific content.
2. Every visible CTA navigates or has meaningful accessible behavior.
3. No horizontal document overflow at 360, 390, 768 and 1440 px; mobile menu supports Escape/focus return.
4. Search/filter/date selection and persisted checklist work, including empty states and denied storage.
5. Production build, lint and TypeScript pass; browser smoke checks cover every route.
6. Home works with JavaScript disabled and reduced motion; no eager third-party video.
7. Record asset sources, verification results and pull request number in this session.
8. Every incremental commit is immediately pushed via the authenticated GitHub integration.

## Execution decision

The user's instruction authorizes the redesign and repository updates. Proceed with the design above, keep it reviewable in a dedicated branch/PR, and communicate material decisions during execution. Local shell has no GitHub credential; GitHub Git-object tools create each small commit and immediately advance the branch with an expected-SHA lease, then the shallow checkout is synchronized. No force updates.

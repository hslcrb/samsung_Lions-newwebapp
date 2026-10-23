# BLUE PRIDE Implementation Plan

**Goal:** Replace the generic fan-site shell with an authentic, responsive Samsung Lions experience across the existing routes.
**Architecture:** Server-rendered pages and typed source-backed content, with isolated interactive components. Shared navigation and footer live in the root layout. Local imagery keeps the first render independent from remote embeds.
**Tech stack:** Existing Next.js 16.2.9, React 19.2.4, TypeScript and CSS; no new runtime packages.
**Spec:** `sessions/02/design.md`.

## Constraints

- Shallow checkout; dedicated `chatgpt/` branch.
- English commit prefix and Korean message; remote push after every commit.
- Independent fan concept; sourced data, dated schedules, authentic assets.
- All original public routes remain available.

## Tasks

- [x] 1. Record baseline and design; verify remote write route.
- [x] 2. Add verified content modules and optimized, attributed assets.
- [x] 3. Implement local typography, semantic shell, mobile navigation and footer.
- [x] 4. Rebuild the home hero and editorial sections in small commits.
- [x] 5. Implement match calendar and source-labelled schedule.
- [x] 6. Implement players, history, club, fan and shop routes with useful interactions.
- [x] 7. Remove obsolete mock components and update metadata/admin/docs.
- [x] 8. Run production build, lint, type checking, desktop/mobile/no-JS checks and focused interaction tests.
- [x] 9. Independent review; correct material findings, capture final screens, open/update PR and verify remote head.

## Review focus

- Mobile navigation: correct focus, Escape, scroll-lock cleanup, route transitions.
- Search/filter: Korean names and shirt numbers, combined filters, empty results.
- Calendar: month boundaries, home/away filtering, date labels, empty months; never invented results.
- Checklist: unavailable/corrupt local storage and hydration do not break the page.
- Remote asset resilience: local images and fonts render; no hidden sections when scripts fail.

## Commit protocol

For each coherent small change, inspect the changed files, run the appropriate focused check, create a GitHub commit, immediately update the remote branch with an expected-SHA lease, and synchronize the shallow checkout. Do not accumulate unpushed commits. Capture commit IDs in the final verification record.

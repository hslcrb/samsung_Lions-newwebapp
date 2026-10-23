# Session 02 — local webfonts

Prepared on **2026-10-23**. Font binaries and original license texts are bundled in `public/fonts/`. The application can reference them at `/fonts/…` without a third-party font request at runtime.

## Files and intended use

| File | Typeface and version | CSS weight | Bytes | Use |
| --- | --- | ---: | ---: | --- |
| `sans-regular.woff2` | Freesentation 4 Regular, 1.002 | 400 | 250,812 | Korean and Latin body text |
| `sans-bold.woff2` | Freesentation 7 Bold, 1.002 | 700 | 257,004 | Korean and Latin headings and emphasis |
| `display.woff2` | Bebas Neue, 2.000 | 400 | 21,492 | Large Latin display headings and numerals |
| `Freesentation-OFL.txt` | Author's unmodified SIL Open Font License text | — | 4,375 | Retain alongside Freesentation files |
| `BebasNeue-OFL.txt` | Google Fonts distribution's unmodified SIL Open Font License text | — | 4,337 | Retain alongside Bebas Neue file |

**Combined served font payload:** 529,308 bytes. Both Korean files are below 350 KB, so they were retained intact rather than reduced to a page-specific subset. The regular and bold fonts contain the same **4,210 Unicode mappings**, including **2,780 precomposed Hangul syllables** and **52 compatibility jamo**. This is the original CDN release's coverage, not all 11,172 modern precomposed Hangul syllables. Keep a Korean-capable system fallback after this family for future content outside that coverage.

## Provenance

The Freesentation URLs preserve the existing site's original CDN distribution:

- Regular: <https://cdn.jsdelivr.net/gh/projectnoonnu/2404@1.0/Freesentation-4Regular.woff2>
- Bold: <https://cdn.jsdelivr.net/gh/projectnoonnu/2404@1.0/Freesentation-7Bold.woff2>
- Author's official project: <https://github.com/Freesentation/freesentation>
- Author's official website: <https://freesentation.blog/freesentation>
- Exact license source: <https://raw.githubusercontent.com/Freesentation/freesentation/main/OFL%20license.txt>

Bebas Neue was downloaded from the Google Fonts repository and converted from TTF to WOFF2:

- Original font: <https://raw.githubusercontent.com/google/fonts/main/ofl/bebasneue/BebasNeue-Regular.ttf>
- Exact license source: <https://raw.githubusercontent.com/google/fonts/main/ofl/bebasneue/OFL.txt>

The two OFL files contain their upstream copyright notices and license terms without alteration. The original downloaded Bebas Neue TTF was used as a temporary conversion input; only its compressed WOFF2 is served by the site.

## Verification and transformation

- Parsed each final WOFF2 using FontTools 4.61.1 with the Brotli codec to check that the binaries decode and their family names, versions, weights, and character maps match the intended fonts.
- Scanned the project's current `.ts`, `.tsx`, `.js`, `.jsx`, and `.css` sources under `src`, `app`, and `components`. All **379 distinct Korean syllables** found during preparation are present in both Freesentation weights.
- Retained both Freesentation binaries byte-for-byte from their source URLs. No subsetting, glyph modification, or metadata renaming was applied.
- Converted Bebas Neue to WOFF2 and reopened the result. Its **461 Unicode mappings** match the original TTF's map exactly; no glyphs were removed.
- Final page visual QA should also confirm local font loading and rendering. The CSS should use the local URLs and `font-display: swap`.

## SHA-256

| File | SHA-256 |
| --- | --- |
| `sans-regular.woff2` | `e5226655ccd69e9607ea9c11580f53efd10bbc5051b13fe38368944f0f30290d` |
| `sans-bold.woff2` | `b31687c4d07206062b05581cd61bb97c16ddf8089eae8a332bc61b77fd906df1` |
| `display.woff2` | `052be62b240606a7e1b5d3754761965ba10f2f1d2b1e37f7f0d8e3dde1821fd7` |
| `Freesentation-OFL.txt` | `d592b07a70a08517d00a6b606046a1a3dce40473c870738852cf3011ad0c8820` |
| `BebasNeue-OFL.txt` | `72082f6cb4d04be2ecf7cc7d9e1e7d73787f0af8a5a278a47cade70c16b78341` |

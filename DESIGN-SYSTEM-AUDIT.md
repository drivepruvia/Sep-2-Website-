# Pruvia responsive design system audit — 2026-09-02

## Verdict
The page has responsive layouts, but accumulated CSS overrides created inconsistent type roles and breakpoints. An overflow-free page is not sufficient evidence of readable design. This pass preserves the approved visual direction while normalizing type scaling and addressing concrete interaction/reflow defects. This is not a WCAG conformance certification.

## Standards versus design choices
WCAG 2.2 does not impose a universal minimum font size. Relevant AA criteria include 1.4.3 contrast (4.5:1 for normal text), 1.4.4 text resizing to 200%, 1.4.10 reflow at 320 CSS px, and 2.5.8 targets of 24×24 CSS px with stated exceptions. We choose 44px minimum height for primary controls and navigation for usability, not as a universal AA requirement.
Sources:
- https://www.w3.org/TR/WCAG22/
- https://design-system.service.gov.uk/styles/type-scale/
- https://designsystem.gov.scot/styles/typography
GOV.UK and Scottish public-service systems are readability references, not the visual system adopted by Pruvia.

## Measured type scale (16px root)
| Role | Phone 390 | Tablet 820 | Desktop 1440 | Wide 1920 | Ultra 2560 |
|---|---:|---:|---:|---:|---:|
| Hero | 33.9 | 35.3 | 62.6 | 83.5 | 92 |
| Section title | 30 | 34.4 | 51.8 | 69.1 | 76 |
| Feature title | 28 | 28 | 41.8 | 55.7 | 62 |
| Body | 18 | 18.5 | 22.2 | 24 | 24 |
| Button | 16 | 16.1 | 19.2 | 21.6 | 22 |
| Secondary text | 16 | 16 | 17 | 18.9 | 20 |
| Label/caption | 14 | 14 | 15.4 | 17.1 | 18 |

Body line height: 1.6. Reading blocks bounded around 55–60ch, with feature prose further constrained by its column. Type declarations use rem for root-size preferences, with viewport interpolation where applicable. Semantic h2/h3 levels are independent from visual size: footer h2 headings are intentionally smaller than section headings.

## Layout and dimensions
- Phone below 768px: single-column, wrapping download controls, stacked footer, compact screenshots.
- Tablet: split hero and sequential feature rows. Touch devices retain sequential flow rather than pinned scroll presentation.
- Desktop motion stage: at least 1000px wide, 700px high, fine pointer. Copy scrolls in document flow; the sticky phone and navigation update when each stage aligns with the phone. The final stage holds its copy alongside the phone for additional reading time. Other viewports use sequential rows.
- Desktop/wide content is bounded; surfaces extend full width. Maximum wide content width is 1560px. This deliberate bound prevents unlimited line lengths on ultrawide monitors.
- Feature image limits differ by layout: small screens approximately 174–250px; wide desktop up to 420px, also constrained by viewport height.
- Logo scales from 125px to 220px. It is not tied to the body type size.
- Buttons, navigation, footer links, summaries and modal close control have usable hit areas; 44px minimum height is the preferred system convention.

## Fixed in this pass
1. Replaced fixed-pixel font limits with rem equivalents so user root-font preferences affect text.
2. Raised phone body minimum from 17 to 18px, secondary text to 16px.
3. Increased the feature introduction heading container to 1000px; previously 76px type was constrained to 680px, causing unnecessary lines.
4. Expanded small interactive link areas and dialog close control.
5. Fixed small-screen 200% text overflow in stage navigation and long curriculum labels.
6. Stage-state triggers run for both desktop and sequential layouts; desktop image changes use stage alignment rather than an early visibility threshold.
7. Aligned tablet copy elements at their starts.

## Verification
- Build and ESLint pass.
- Browser measurements at 320, 390, 820, 1180, 1440, 1920, 2560 CSS px; tablet contexts include touch capability.
- After target adjustments, sampled visible controls have no dimension below 24px.
- Additional root-font 32px stress tests at 320, 390, 720 and 1440: sampled headings, paragraphs and controls stay inside horizontal viewport bounds after fixes. This is a text-preference stress check, not an exhaustive browser zoom audit.
- Selected color-pair calculations: muted #596266 on #f9fafb 5.97:1; muted on #eff2f4 5.55:1; white on blue #0248f7 6.42:1; dark-mode muted #aab5bc on #1a252c 7.47:1.

## Remaining limitations / recommendations
- Existing CSS still contains historical overrides. Consolidate obsolete selectors in a dedicated maintenance pass with visual regression coverage; do not continue adding disconnected device-specific patches.
- Real iPad/Safari, screen readers, keyboard-only full flow, browser 200% zoom and WCAG text-spacing overrides still need complete manual acceptance. Sticky stages with unusually large user text must be checked for vertical clipping.
- Phone screenshot text is rasterized product content, not accessible live copy. The adjacent HTML must continue to communicate the benefit; important instructions must never be image-only.
- Privacy and Terms remain placeholder # links. Supply actual destinations before public launch.
- No claim that increased font sizes alone improve conversion; verify with target parents on their actual devices.
- Release validation also sampled scroll state at 1100×750 and 1440×1000: Before, During and After each activate the matching image and progress indicator.

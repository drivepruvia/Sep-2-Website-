# Pruvia: taste + GSAP design exploration

## Versions

- `main`: original local snapshot, commit `3999988`.
- `design/taste-gsap`: redesign. This folder originally had no Git repository or remote; these are local branches, not published GitHub branches.
- `/`: redesigned landing page.
- `/?design=original`: original homepage for side-by-side review.
- `/beta`, `/email-preview`, booking redirects, Netlify functions, and form field names remain available.

## Design read

A driving technology brand for parents and teens: precise typography, calm interaction, and a human context. Keep the Pruvia logo and blue. Use Manrope, cool neutral surfaces, open layouts, and small consistent corners.

DESIGN_VARIANCE: 7 / MOTION_INTENSITY: 5 / VISUAL_DENSITY: 3.

Source skills reviewed:
- https://github.com/Leonxlnx/taste-skill/tree/main/skills/taste-skill
- https://github.com/greensock/gsap-skills
- Installed design-taste-frontend, gsap-core, gsap-react, and gsap-scrolltrigger skill instructions.

## Audit and changes

Original: Inter heavy headings, repeated pill buttons and large rounded cards, blue glow effects, an immediately loaded YouTube iframe, and similar section composition throughout. The existing content also includes media names, testimonials, and statistics without source references in the repository.

Redesign: a two-line brand headline, a wide existing driving image, open process columns, interactive feature disclosure with one product image, a curriculum accordion, native video dialog, and a labeled inline signup form. Unsubstantiated social proof and numeric claims are omitted in this exploration. Licensing guidance directs visitors to their own state DMV rather than making a nationwide hours claim.

The image files are reused brand illustrations/product concepts, not verified production screenshots or documentary photography. Product concepts are labeled. Replacing these with actual App captures and original family photography is the strongest next improvement.

## Motion and accessibility

GSAP staggers the first-screen entrance, reveals content on scroll, and gives the driving image a restrained scroll-linked movement. Feature selection has a brief transition. No scroll hijacking or continuous ambient loops.

Animations are scoped through useGSAP and reverted on cleanup. matchMedia disables scroll/entrance animation for reduced-motion preferences. Details toggles and image loads refresh ScrollTrigger measurements. System dark-mode colors are defined; the logo is rendered monochrome in dark mode. Keyboard focus, skip link, labeled email field, native modal focus trapping/Escape dismissal, and an accessible mobile menu are included.

## Signup behavior

Production posts to Netlify Forms, then calls the existing welcome-email function. A welcome-email failure does not invalidate a saved signup. Local Vite preview skips Netlify Forms as before and displays a clearly labeled preview completion state. No live waitlist submission or SMTP delivery was used for validation.

## Validation

- Production build and ESLint passed.
- Browser checked feature switching, curriculum expansion, video open/Escape close, mobile menu opening and closing on navigation, and local signup completion.
- Measured a 390 CSS-pixel mobile viewport with no horizontal overflow; also inspected the desktop layout.
- Dark-mode and reduced-motion fallbacks are implemented but were not independently emulated in the browser tooling.
- Production Netlify integration and Lighthouse performance scores were not tested in this local design review.

## Review locally

Run `npm install` and `npm run dev`, then open the printed local URL. Append `?design=original` for the original homepage. To restore the exact original source, switch to `main` after saving any later changes.

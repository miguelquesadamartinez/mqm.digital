# mqm.digital — AI Coding Agent Instructions

## Project Overview
Multilingual personal CV/portfolio website for Miguel Quesada Martínez (Spanish, English, Portuguese).
Old-school static site: **all text is written directly in the HTML**, organized in divs. There is no `data.json` and no client-side rendering, so every text change shows up plainly in the git diff.

## Key Files
- **`index.html`**: Full site in Spanish (served at `/`)
- **`en.html`**: Full site in English
- **`pt.html`**: Full site in Portuguese
- **`app.js`**: Only mobile menu, show/hide pages by `#hash`, language links keeping the hash, cookie consent + Google Analytics
- **`styles.css`**: Vanilla CSS (cards, chips, drone section, responsive menu)

## Page Structure (same in the three HTML files)
- `<section class="card header">`: photo, name and title (always visible)
- `<div class="page" id="page-about">` → Cover letter (`#about`, legacy `#cover`)
- `<div class="page" id="page-experience">` → Experience (`#experience`), one `<li>` per job with a comment naming company and period
- `<div class="page" id="page-aboutme">` → Education, skills, languages, contact (`#aboutme`)
- `<div class="page" id="page-drone" data-title="...">` → Drone project (`#drone`); `#drone-architecture`, `#drone-how`, `#drone-rpi`, `#drone-challenges`, `#drone-status`, `#drone-stl`, `#drone-questions` show the drone page and scroll to that card
- `app.js` sets `hidden` on every `.page` except the one matching the hash; `data-title` (optional) changes the tab title

## Conventions
- **Always update the three language files** when changing text.
- Escape `&`, `<`, `>` in text (`&amp;`, `&lt;`, `&gt;`). Accents and quotes are written as-is.
- Keep one text per line so diffs stay readable.
- Drone status bars: color `#198754` (ok), `#e0a100` (warn), `#dc3545` (crit); the `width:` of `.status-fill` and the `%` label must match.
- CV download buttons per language: `cvs/Curriculum Miguel Quesada.pdf` (ES), `cvs/Resume Miguel Quesada.pdf` (EN), `cvs/CV Miguel Quesada.pdf` (PT).

## Cache Busting
Increment `?version=` of `styles.css` / `app.js` in the three HTML files when those files change.

## Important Notes
- **No build system**: Pure HTML/CSS/JS, serve with any static host (deployed to S3 + CloudFront via `.github/workflows/deploy.yml`)
- **Accessibility**: semantic HTML, `aria-label`, `aria-expanded`, proper heading hierarchy

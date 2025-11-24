# mqm.digital — AI Coding Agent Instructions

## Project Overview
This is a **multilingual personal portfolio/CV website** for Miguel Quesada Martínez. It's a vanilla JavaScript SPA (no build tools) with i18n support for Spanish, English, and Portuguese. The site uses client-side rendering to display resume data from `data.json`.

## Architecture & Key Files

### Core Application Pattern
- **`index.html`**: Root Spanish version with full markup for header, nav, mobile menu, language switcher
- **`app.js`**: Main SPA logic (~695 lines) handling routing, i18n, data loading, and rendering
- **`data.json`**: Centralized data store with base Spanish content + i18n overrides for EN/PT
- **`styles.css`**: Vanilla CSS with responsive design, mobile hamburger menu, chips/cards UI
- **Language-specific entry points**: `es/index.html`, `en/index.html`, `pt/index.html` set `window.INIT_LANG` to initialize language from path

### Data Flow
1. User accesses `/es/`, `/en/`, or `/pt/` → language-specific HTML loads
2. `window.INIT_LANG` sets initial language before app.js runs
3. `app.js` fetches `data.json` (versioned cache-busting: `?version=1.6`)
4. Hash-based routing (`#about`, `#experience`, etc.) triggers section renders
5. Client-side rendering combines base data with i18n overrides from `data.json`

## Critical Conventions

### Internationalization (i18n)
- **Three-layer i18n system**:
  1. UI translations: `translations` object in `app.js` (nav, buttons, labels)
  2. Data translations: `data.i18n[lang]` overrides in `data.json` (content)
  3. HTML attributes: `data-i18n` attributes for static elements
- **Helper functions**:
  - `t(key)`: Translate UI strings (e.g., `t("nav.about")`)
  - `L(key)`: Get localized data field with fallback to base Spanish
  - `localizedEntry(arrayName, index)`: Get localized array entry (experience, education)
- **Language detection order**: `window.INIT_LANG` → URL path segment → localStorage → browser language → default "es"
- **Always update three places** when changing text:
  1. Base Spanish in `data.json`
  2. `data.i18n.en` override
  3. `data.i18n.pt` override

### Routing & Sections
- Hash-based SPA routing: `#about`, `#experience`, `#education`, `#skills`, `#contact`
- `#cover` is aliased to `#about` (legacy route, now unified)
- Each route renders: `renderHeader()` (avatar + name/title) + section-specific content
- Use `patchSectionWithCV(html)` to append language-specific CV download button

### HTML Safety
- **Always use `escapeHtml()`** for user-facing text to prevent XSS
- **Use `renderInlineBold()`** for text with `**bold**` markdown-style formatting (safely escaped)
- Never concatenate unescaped strings into HTML

### Mobile Menu Implementation
- `.menu-toggle` button (hamburger icon) hidden on desktop, visible on mobile
- `.menu-overlay` provides backdrop for mobile nav drawer
- `.open` class toggles both nav and overlay
- Always close menu on link click and overlay click

### SEO & Metadata
- Dynamic meta tags updated via `updateMetaForRoute()` on route/language changes
- JSON-LD structured data (Person schema) injected dynamically from `data.json`
- Canonical and hreflang links update to language-specific paths (`/es/`, `/en/`, `/pt/`)
- Sitemap at `/sitemap.xml` lists all language variants

## Development Workflows

### Adding New Content
1. **Experience/Education**: Add to `data.json` base array, then add i18n overrides in `data.i18n.en` and `data.i18n.pt`
2. **Skills**: Add to `data.skills` array (will render as chips), add translations in `data.i18n.en.skills` and `data.i18n.pt.skills`
3. **UI Labels**: Add to `translations` object in `app.js` with all three languages

### Testing Languages
- Access `/es/`, `/en/`, `/pt/` directly to test language-specific entry points
- Use language switcher buttons (flags in header) to test dynamic switching
- Check localStorage for persisted `lang` preference

### Versioning Static Assets
- CSS: `styles.css?version=1.0` in HTML
- JSON: `data.json?version=1.6` in fetch call
- Increment version numbers to bust browser cache after changes

## Common Patterns

### Rendering Pattern
```javascript
function renderSection() {
  app.innerHTML = `
    ${renderHeader()}
    <section class="card">
      <h2 class="section-title">${t("section.title")}</h2>
      ${escapeHtml(L("fieldName"))}
    </section>
  `;
}
```

### Technologies Display
Experience entries use `.chip` spans for tech stacks:
```javascript
<div class="exp-tech">
  ${technologies.map(t => `<span class="chip">${escapeHtml(t)}</span>`).join(' ')}
</div>
```

### CV Download Buttons
Language-specific PDF links in `cvs/` directory:
- Spanish: `cvs/Curriculum Miguel Quesada.pdf`
- English: `cvs/Resume Miguel Quesada.pdf`
- Portuguese: `cvs/CV Miguel Quesada.pdf`

## Important Notes
- **No build system**: Pure HTML/CSS/JS, serve with any static host
- **Cache busting required**: Increment version params when updating assets
- **Accessibility**: Use semantic HTML, `aria-label`, `aria-expanded`, proper heading hierarchy
- **Mobile-first CSS**: Uses flexbox, responsive breakpoints in `styles.css`
- **Social links**: GitHub and LinkedIn hardcoded in `renderAbout()`

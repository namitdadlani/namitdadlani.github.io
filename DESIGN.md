# DESIGN.md — namitdadlani.com Design System

This file is the single source of truth for the design of namitdadlani.com.
Before writing any code, read this file in full. Also read all images in the
`/screenshots` folder — they show the approved mockups for the webpage design
and logo. Match them precisely.

---

## Screenshots Reference

The `/screenshots` folder in this repo contains approved visual mockups.
Always refer to these when building or modifying any part of the site:

- `screenshot-hero-light.png` — hero section in light mode
- `screenshot-hero-dark.png` — hero section in dark mode
- `screenshot-logo.png` — approved A2 curly brace logo mark
- `screenshot-full-light.png` — full page light mode (if present)
- `screenshot-full-dark.png` — full page dark mode (if present)

If a screenshot exists for the section you are building, match it exactly
before making any creative decisions of your own.

---

## Fonts

All fonts are loaded from Google Fonts. Include this single `<link>` in
the `<head>` of `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&family=JetBrains+Mono:ital,wght@0,400;0,700;1,400;1,700&family=Outfit:wght@300;400;500&display=swap" rel="stylesheet">
```

| Role | Font | Usage |
|---|---|---|
| Display / headings | `DM Serif Display` | Hero name, section headings, stat numerals |
| Body | `Outfit` | Body text, nav links, descriptions |
| Labels / tags | `DM Mono` | Section labels, tags, eyebrows, footer, date strings |
| Logo braces only | `JetBrains Mono` | Curly braces `{` and `}` in the logo mark only |

---

## Color Palette

All colors are defined as CSS custom properties on `.light` and `.dark`
classes applied to the root `<body>` element. Never hardcode colors outside
these definitions.

```css
body.light {
  --bg:           #FAFAF8;
  --bg-secondary: #EDEAE0;
  --text:         #1a1a18;
  --text-muted:   #5F5E5A;
  --text-faint:   #888780;
  --amber:        #B07D3A;
  --amber-light:  #FAEEDA;
  --border:       rgba(0, 0, 0, 0.1);
  --border-faint: rgba(0, 0, 0, 0.06);
}

body.dark {
  --bg:           #16150F;
  --bg-secondary: #2A2820;
  --text:         #EDE8DC;
  --text-muted:   #7A7568;
  --text-faint:   #5F5E5A;
  --amber:        #D4A056;
  --amber-light:  #2A2010;
  --border:       rgba(255, 255, 255, 0.08);
  --border-faint: rgba(255, 255, 255, 0.04);
}
```

---

## Logo — A2 Curly Brace Mark

The approved logo is the **A2 curly brace monogram**. See `screenshots/screenshot-logo.png`.

### Structure
```
{ ND }
```
- `{` and `}` — JetBrains Mono, amber color (`var(--amber)`)
- `N` — DM Serif Display, upright, primary text color (`var(--text)`)
- `D` — DM Serif Display, **italic**, primary text color (`var(--text)`)
- All characters tightly kerned: `letter-spacing: -0.03em`

### HTML
```html
<span class="logo-mark">
  <span class="logo-brace">{</span>
  <span class="logo-letters">N<em>D</em></span>
  <span class="logo-brace">}</span>
</span>
```

### CSS
```css
.logo-mark {
  display: inline-flex;
  align-items: baseline;
  gap: 2px;
  letter-spacing: -0.03em;
}
.logo-brace {
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.1em;
  color: var(--amber);
  font-weight: 400;
}
.logo-letters {
  font-family: 'DM Serif Display', serif;
  font-size: 1em;
  color: var(--text);
}
.logo-letters em {
  font-style: italic;
}
```

### Usage
- Nav: render at `font-size: 22px`
- Favicon: export as SVG/PNG at 32×32 and 64×64
- The logo adapts automatically to light/dark via CSS variables — no
  separate dark version needed

---

## Theme Toggle

Theme is controlled by swapping `.light` / `.dark` class on `<body>`.

```js
function toggleTheme() {
  const body = document.body;
  const isDark = body.classList.contains('dark');
  body.classList.toggle('dark', !isDark);
  body.classList.toggle('light', isDark);
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
}

// On page load — respect saved preference
const saved = localStorage.getItem('theme') || 'light';
document.body.classList.add(saved);
```

The toggle button lives in the nav, top-right. Style it in DM Mono, 11px,
with a `0.5px` border, `border-radius: 3px`. Label: `dark` / `light`.

---

## Spacing & Layout

- Max content width: `860px`, centered with `margin: 0 auto`
- Horizontal padding: `32px` on desktop, `20px` on mobile
- Section padding: `48px 0`
- Border style throughout: `0.5px solid var(--border)` — never 1px
- Border radius for tags/buttons: `3px` — sharp, not pill-shaped
- Border radius for cards (if any): `6px`

---

## Component Patterns

### Nav
- Full-width, `border-bottom: 0.5px solid var(--border)`
- Left: logo mark (see Logo section)
- Right: nav links in Outfit 13px + theme toggle button
- Padding: `18px 32px`
- Sticky on scroll

### Section Labels (eyebrows)
Used above every major section heading.
```css
.section-label {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--amber);
  margin-bottom: 12px;
}
```

### Hero
- Two-column grid: `grid-template-columns: 1fr 1fr`
- Left: eyebrow label → large name → description → CTA links
- Right: three stats stacked (number + label), right-aligned, separated by
  thin dividers
- Name: DM Serif Display, `font-size: clamp(40px, 6vw, 56px)`, italic
  last name or italic second word
- Stats: DM Serif Display numerals, `36px`, right-aligned

### Experience entries
- Two-column row: role+company left, date right
- Role: Outfit 15px, `font-weight: 500`
- Company: DM Mono or Outfit 13px, amber color
- Date: DM Mono 11px, muted color
- Separated by `0.5px` bottom borders

### Tags / Tech pills
```css
.tag {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  padding: 4px 10px;
  border: 0.5px solid var(--border);
  border-radius: 3px;
  color: var(--text-faint);
}
```

### CTA Buttons / Links
```css
.btn {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.1em;
  padding: 8px 16px;
  border: 0.5px solid var(--text);
  color: var(--text);
  border-radius: 3px;
  text-decoration: none;
  display: inline-block;
}
```

---

## Page Sections & Content

Build these sections in order:

1. **Nav** — `{ND}` logo, links (About, Experience, Education, Contact), theme toggle
2. **Hero** — name, title, description, LinkedIn + GitHub links, stats (200K hosts, 38 regions, 57% latency)
3. **About** — 2–3 paragraph bio, engineering focus, current status
4. **Experience** — AWS (2022–2026), Deloitte (2018–2021), CRA (2022), each with bullet points and tech tags
5. **Education** — Dalhousie (MCS, 2021–2022), University of Mumbai (BE, 2014–2018)
6. **Contact** — short closing statement, LinkedIn and GitHub links
7. **Footer** — `namitdadlani.com`, copyright, built-by note

Full content for each section is in the resume and career profile on file.

---

## Subsections

The site has grown a few standalone subsections beyond the main `index.html`, each with a different relationship to this design system:

- **`/news`** and **`/contactcard`** — fully self-contained, one-off pages with their own inline `<style>` blocks and their own font choices. They intentionally don't share `style.css`, since each has its own distinct visual identity (a newspaper digest, a ski-themed event card).
- **`/workshop`** — the odd one out, and the pattern to follow for anything similar going forward: it **links `../style.css`** and reuses the real nav, theme toggle, and footer markup verbatim from `index.html`, so it looks and behaves like a native part of the main site rather than a novelty. Only a small local `<style>` block is added per Workshop page, for the handful of bits genuinely specific to that page (e.g. an empty-state card). Individual future experiments live at `/workshop/<demo-name>/` and may load one CDN-hosted client-side library (e.g. Transformers.js) via a plain `<script>` tag — no bundler, no backend, no API keys exposed in the browser.

---

## Design Principles

- **Editorial warmth over developer cliché** — no terminal green, no matrix
  rain, no purple gradients. The site feels like a well-designed magazine
  profile that happens to be about an engineer.
- **Amber is the only accent** — use it sparingly: logo braces, company
  names, section labels, hover states. Not backgrounds, not large fills.
- **Monospace for structure, serif for personality** — DM Mono signals
  precision; DM Serif Display signals humanity. Never swap their roles.
- **0.5px borders everywhere** — thinner than typical, creates a refined
  and deliberate feel.
- **No shadows, no gradients** — flat surfaces only. Depth comes from
  typography scale and spacing, not visual effects.
- **Both themes feel like the same site** — warm off-white light mode,
  warm near-black dark mode. The amber carries through both.

---

## File Structure

```
/
├── index.html
├── style.css
├── DESIGN.md          ← this file
├── CNAME
├── README.md
└── screenshots/
    ├── screenshot-hero-light.png
    ├── screenshot-hero-dark.png
    ├── screenshot-logo.png
    └── (any other reference screenshots)
```

Keep all styles in `style.css`. No inline styles except where unavoidable.
No external CSS frameworks — plain CSS only.
  
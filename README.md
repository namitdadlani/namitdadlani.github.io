# namitdadlani.github.io

Personal portfolio site — [namitdadlani.com](https://namitdadlani.com) · [namitdadlani.github.io](https://namitdadlani.github.io/)

Built to be a direct, well-designed representation of my work. Not a template, not a theme — every design decision was made deliberately, from typography to color to content placement.

---

## Stack

Plain HTML, CSS, and JavaScript. No framework, no build step, no dependencies.

That's intentional. A portfolio site doesn't need React. Keeping it simple means it's fast, easy to maintain, and the code is readable by anyone who opens it.

Individual `/workshop` experiments may load a client-side library straight from a CDN (e.g. [Transformers.js](https://huggingface.co/docs/transformers.js) for in-browser AI) via a plain `<script>` tag. That's still no bundler, no npm, and no backend — just an extra script tag on that one page.

---

## Design

The design was thought through — typography, color palette, spacing, component patterns, and content placement all defined upfront. The result is an editorial, warm aesthetic: DM Serif Display for personality, DM Mono for precision, amber as the only accent color, and 0.5px borders throughout. Both light and dark themes feel like the same site.

---

## Structure

```
/
├── index.html       — homepage (all main-page content)
├── style.css        — shared styles (homepage + /workshop)
├── favicon.svg      — logo mark adapted for browser tab
├── DESIGN.md         — design system reference
├── CNAME
├── news/             — standalone digest page, /news
├── contactcard/       — standalone digital business card, /contactcard
├── workshop/          — experiments section shell, /workshop
├── resume/            — resume PDF, linked from the Contact section
├── photos/            — image assets used on the homepage
└── screenshots/       — approved design mockups used during build
```

`news/` and `contactcard/` are fully self-contained (their own inline styles, not `style.css`). `workshop/` links `style.css` and reuses the homepage's nav/theme-toggle/footer, so it stays visually part of the main site — see the "Subsections" section in DESIGN.md for why.

---

## Running locally

For the homepage alone, opening `index.html` directly works fine. But `News`, `Workshop`, and in-page links back to the homepage (`../#about`, etc.) use clean directory-style URLs that only resolve correctly through a real server — `file://` won't auto-resolve `news/` or `workshop/` to their `index.html`. Serve the repo root instead:

```
npx serve .
# or
python -m http.server
```

Then open the printed `localhost` URL.

---

## Deploying

Push to the `main` branch. GitHub Pages serves it directly from the repo root.

---

## Todo

- [x] Set up repo and GitHub Pages
- [x] Secure the domain name
- [x] Configure custom domain via CNAME
- [x] Design system — typography, color, spacing, components
- [x] Content — About, Experience, Education, Hero stats
- [x] Light / dark theme toggle
- [x] Favicon
- [x] News subsection — `/news`, a standalone digest page
- [x] Contact card subsection — `/contactcard`, a standalone digital business card
- [x] Workshop section shell — `/workshop`, empty landing page for future client-side experiments
- [x] Contact section — own section (not just a footer line), with Email / Resume / LinkedIn icon buttons
- [ ] Graphic face / illustration for the hero
- [ ] Articles / Writing section
- [ ] Photography subsection
- [ ] First Workshop experiment (client-side, keyless — e.g. Transformers.js)

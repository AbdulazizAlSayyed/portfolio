# Abdulaziz Al Sayyed — Engineering Field Notes

A static, editorial portfolio for AI, software engineering, full-stack development, and data work.

## What changed

The portfolio was redesigned around an **engineering field-notes / technical archive** visual language:

- warm paper + ink palette with a restrained orange signal color
- editorial serif display typography + monospaced technical metadata
- asymmetric project composition instead of identical SaaS cards
- project hierarchy: featured work + archive work
- expandable case studies using native `<details>`
- skills presented as capability groups instead of badge walls
- technical labels, indexes, rules, and archive markers create the visual identity
- no gradients, glassmorphism, particle effects, or decorative 3D objects

## Critical rendering fix

The previous implementation rendered important sections into empty HTML containers from JavaScript:

- `#experienceTimeline`
- `#educationTimeline`
- `#projectGrid`
- `#skillsGrid`
- `#certList`

That meant a JavaScript error, delayed execution, browser/PDF capture race, or other runtime problem could leave the section heading visible while the actual data container remained empty.

The redesigned version moves all critical portfolio content into **real HTML in `index.html`**. JavaScript is now progressive enhancement only:

- mobile navigation
- active navigation state
- project filtering
- current year

If JavaScript fails or is disabled, the portfolio content still exists and remains visible.

## Files

```text
portfolio/
├── index.html                 # complete semantic page + all visible portfolio content
├── styles.css                 # editorial design system + responsive + print rules
├── script.js                  # lightweight progressive enhancements only
├── data.js                    # preserved portfolio data reference
├── README.md
└── RESPONSIVE_FIXES.md
```

## Run locally

No build tools or dependencies are required.

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Editing content

The resilient runtime path intentionally keeps visible content in `index.html`, so changing `data.js` alone will not silently change what recruiters see. When editing portfolio facts, update the corresponding HTML content as well.

`data.js` is preserved as the structured content reference for future automation/build tooling.

## Deployment

The site is static and can be deployed directly to GitHub Pages, Netlify, Vercel static hosting, or any standard static web server.

## Accessibility

- semantic sections and headings
- keyboard-operable navigation and native disclosure elements
- visible focusable controls
- accessible menu button labels/state
- `prefers-reduced-motion` support
- no critical content depends on animation

## Verification

The redesigned build was checked at:

- 320 × 800
- 375 × 900
- 390 × 844
- 430 × 932
- 768 × 900
- 820 × 1000
- 1024 × 900
- 1280 × 900
- 1440 × 1000
- 1920 × 1080

The automated browser check reported **0px horizontal overflow at every tested viewport**, all 12 project cards and all 8 skill groups remained visible, and the JavaScript-disabled render still contained the same critical content.

Print/PDF emulation also retained all 12 projects and all 8 skill groups.

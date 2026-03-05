# Closer Brand System — Web Implementation Guide
> For use by LLMs generating or editing static website code for closerconnectandalign.com

---

## Brand Identity

**App name:** Closer  
**Tagline:** Connect & Align  
**Full brand statement:** Closer — Connect and Align  
**Voice:** Warm, intentional, modern. Research-backed but never clinical. Intimate but not sentimental.  
**Audience:** Committed couples in their 20s–40s improving their relationship through intentional practice.

---

## Logo

### The Mark
The Closer mark is two S-curves (bezier paths) crossing from opposite corners and meeting at a shared center point. A gradient ring sits at the intersection. This represents two people's paths converging.

- **Primary arc:** Teal `#2BB3B1`, stroke-width 2.4, round linecaps
- **Secondary arc:** Lavender `#B8C4E0`, stroke-width 1.5, opacity 0.55
- **Center ring:** Gradient from `#8DBED1` → `#B8C4E0` (teal-leaning to lavender)
- **Inner hole:** Matches the background color exactly

### SVG Mark (copy-paste ready)
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44" width="44" height="44">
  <defs>
    <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8DBED1"/>
      <stop offset="100%" stop-color="#B8C4E0"/>
    </linearGradient>
  </defs>
  <path d="M4 38 C10 38 14 6 22 22 C30 38 34 6 40 6"
        stroke="#2BB3B1" stroke-width="2.4" stroke-linecap="round" fill="none"/>
  <path d="M4 6 C10 6 14 38 22 22 C30 6 34 38 40 38"
        stroke="#B8C4E0" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.55"/>
  <circle cx="22" cy="22" r="3.6" fill="url(#ringGrad)"/>
  <circle cx="22" cy="22" r="1.6" fill="REPLACE_WITH_BG_COLOR"/>
</svg>
```
> ⚠️ Always replace the inner circle fill with the actual background color behind the mark.

### Wordmark
- **Font:** Inter, weight 300, letter-spacing 0.12em, text-transform: none
- **Tagline:** Inter, weight 400, 7.5–9px, letter-spacing 0.3em, text-transform: UPPERCASE

### Logo Usage Rules
- **Minimum size:** 32px height for the horizontal wordmark; 20px for mark-only
- **Clear space:** Maintain at least the height of the letter "C" in "Closer" as clear space on all sides
- **Never:** Rotate, skew, recolor, add drop shadows, or place on a busy photographic background
- **Never:** Use the wordmark without the mark unless space is severely constrained
- **Never:** Use a heart symbol or any romantic iconography alongside the logo

---

## Color Palette

| Name         | Variable          | Hex       | RGB              | Usage                                  |
|--------------|-------------------|-----------|------------------|----------------------------------------|
| Navy Dark    | `--color-navy`    | `#102A43` | 16, 42, 67       | Nav, footers, dark backgrounds, text   |
| Navy Mid     | `--color-navy-mid`| `#243B53` | 36, 59, 83       | Gradient endpoint, secondary dark bg   |
| Teal         | `--color-teal`    | `#2BB3B1` | 43, 179, 177     | Primary brand, CTAs, links, highlights |
| Teal Dark    | `--color-teal-dk` | `#239997` | 35, 153, 151     | Hover states, active states            |
| Lavender     | `--color-lavender`| `#B8C4E0` | 184, 196, 224    | Secondary accent, secondary arcs       |
| Light BG     | `--color-bg`      | `#F4F7FA` | 244, 247, 250    | Page backgrounds, card backgrounds     |
| White        | `--color-white`   | `#FFFFFF` | 255, 255, 255    | Card surfaces, inputs                  |
| Text Primary | `--color-text`    | `#102A43` | 16, 42, 67       | Body text on light backgrounds         |
| Text Secondary| `--color-text-2` | `#486581` | 72, 101, 129     | Captions, taglines, secondary text     |
| Text Light   | `--color-text-lt` | `#FFFFFF` | 255, 255, 255    | Text on dark/teal backgrounds          |

### CSS Variables (paste into :root)
```css
:root {
  --color-navy:     #102A43;
  --color-navy-mid: #243B53;
  --color-teal:     #2BB3B1;
  --color-teal-dk:  #239997;
  --color-lavender: #B8C4E0;
  --color-bg:       #F4F7FA;
  --color-white:    #FFFFFF;
  --color-text:     #102A43;
  --color-text-2:   #486581;
  --color-text-lt:  #FFFFFF;

  /* Gradient */
  --gradient-brand: linear-gradient(135deg, #2BB3B1, #B8C4E0);
  --gradient-dark:  linear-gradient(135deg, #102A43, #243B53);
}
```

### Color Pairings
| Background  | Text           | Accent  |
|-------------|----------------|---------|
| `#102A43`   | `#FFFFFF`      | `#2BB3B1` |
| `#F4F7FA`   | `#102A43`      | `#2BB3B1` |
| `#FFFFFF`   | `#102A43`      | `#2BB3B1` |
| `#2BB3B1`   | `#FFFFFF`      | `#B8C4E0` |
| Gradient    | `#FFFFFF`      | `#FFFFFF` |

---

## Typography

### Fonts
```html
<!-- Load in <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

| Role         | Font             | Weight | Notes                        |
|--------------|------------------|--------|------------------------------|
| Display/H1   | DM Serif Display | 400    | Large headlines only          |
| H2–H4        | Inter            | 600    | Section headers               |
| Body         | Inter            | 400    | Default body copy             |
| UI / Labels  | Inter            | 500    | Buttons, nav, badges          |
| Captions     | Inter            | 400    | Small text, taglines          |
| Logo word    | Inter            | 300    | The wordmark "Closer" only    |

### Type Scale (CSS)
```css
/* Type scale */
--text-xs:   0.75rem;   /* 12px — captions, labels */
--text-sm:   0.875rem;  /* 14px — secondary body */
--text-base: 1rem;      /* 16px — body */
--text-lg:   1.125rem;  /* 18px — lead text */
--text-xl:   1.25rem;   /* 20px — small headers */
--text-2xl:  1.5rem;    /* 24px — section headers */
--text-3xl:  1.875rem;  /* 30px */
--text-4xl:  2.25rem;   /* 36px */
--text-5xl:  3rem;      /* 48px — hero headlines */
--text-6xl:  3.75rem;   /* 60px — display only */
```

### Heading Hierarchy
- `<h1>`: DM Serif Display, 48–60px, color `#102A43` — page-level hero headline
- `<h2>`: Inter 600, 30–36px, color `#102A43` — section headers
- `<h3>`: Inter 600, 20–24px, color `#102A43` — card/feature titles
- `<h4>`: Inter 500, 16–18px, color `#486581` — sub-labels
- Body: Inter 400, 16px, color `#102A43`, line-height 1.65

---

## Components

### Navigation Bar
```css
.nav {
  background: #102A43;
  height: 64px;
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav-link {
  color: #B8C4E0;
  font: 500 14px/1 Inter, sans-serif;
  letter-spacing: 0.04em;
  text-decoration: none;
  transition: color 0.2s;
}
.nav-link:hover { color: #FFFFFF; }
```

### Primary Button (CTA)
```css
.btn-primary {
  background: #2BB3B1;
  color: #FFFFFF;
  font: 500 15px/1 Inter, sans-serif;
  letter-spacing: 0.04em;
  padding: 14px 28px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
}
.btn-primary:hover  { background: #239997; }
.btn-primary:active { transform: scale(0.98); }
```

### Secondary Button
```css
.btn-secondary {
  background: transparent;
  color: #2BB3B1;
  font: 500 15px/1 Inter, sans-serif;
  padding: 13px 27px;
  border-radius: 8px;
  border: 1.5px solid #2BB3B1;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-secondary:hover { background: rgba(43,179,177,0.08); }
```

### Card
```css
.card {
  background: #FFFFFF;
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 2px 12px rgba(16,42,67,0.08);
}
.card-dark {
  background: #243B53;
  border-radius: 16px;
  padding: 28px;
}
```

### Brand Gradient Section
```css
.section-gradient {
  background: linear-gradient(135deg, #2BB3B1 0%, #B8C4E0 100%);
  color: #FFFFFF;
  padding: 80px 32px;
}
```

### Hero Section (typical pattern)
```html
<section style="background:#102A43; padding:100px 32px; text-align:center;">
  <!-- Logo mark centered -->
  <!-- h1 in DM Serif Display, white -->
  <!-- Tagline in Inter 400, color #B8C4E0 -->
  <!-- CTA button primary -->
</section>
```

---

## Image & Illustration Style
- Photography: warm, candid, couples in natural settings — never posed or stock-looking
- Illustrations: minimal line-based, same teal/lavender palette
- Icons: 1.5px stroke, rounded linecaps, teal primary color
- No hearts, roses, or generic romance iconography
- Data visualizations: teal for primary data series, lavender for secondary

---

## Logo Files Reference

| File                                        | Use                                    |
|---------------------------------------------|----------------------------------------|
| `closer-mark.svg`                           | Mark on transparent bg, any placement |
| `closer-wordmark-horizontal-dark.svg/.png`  | Header on dark/navy backgrounds        |
| `closer-wordmark-horizontal-light.svg/.png` | Header on light/white backgrounds      |
| `closer-wordmark-horizontal-reversed.svg`   | On teal gradient backgrounds           |
| `closer-wordmark-stacked-dark.svg/.png`     | Compact contexts, footers              |
| `closer-favicon-32.svg/.png`               | Browser favicon                        |
| `closer-social-avatar-400x400.png`          | Social media profile image             |
| `closer-social-banner-1500x500.png`         | Twitter/X, LinkedIn cover              |

---

## Tone of Voice (for copy)
- **Short sentences.** One idea per sentence.
- **Second person** ("you", "your relationship") — never third person
- **Active voice** always
- **No jargon:** say "track how you feel" not "log psychometric indicators"
- **Grounded in research** but never cite studies in marketing copy — say "research shows" casually
- **Avoid:** "transform", "revolutionize", "game-changer", "journey", "spark"
- **Prefer:** "understand", "notice", "practice", "together", "intentional", "grow"

---

*Last updated: March 2026 — Closer / Branson Solutions*

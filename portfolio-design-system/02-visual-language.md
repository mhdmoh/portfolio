# 02 — Visual Language

This document defines the sensory system of the portfolio in implementation-agnostic terms. Values are extracted from the live product and should be treated as the baseline design tokens.

---

## Color palette

### Core tokens

| Token | Hex | RGB / notes | Role |
|-------|-----|-------------|------|
| **Primary / Canvas** | `#014035` | Deep forest green | Full-page background, scaffold field, PWA background |
| **Secondary / Accent** | `#4CAF50` | Material Green 500 | Interactive hover color, tag borders/text/fill tint, PWA theme color |
| **Ink / Primary text** | `#FFFFFF` | White | Name, role, card titles (default), phone, section labels |
| **Ink / Muted text** | `#9E9E9E` approx. (`Colors.grey`) | Mid grey | Summary, cover letter, descriptions, dates, location |
| **Ink / Extra muted** | `#757575` approx. (`grey[600]`) | Used sparingly (e.g. article publish line) | Tertiary metadata |
| **Black** | `#000000` | Defined; used in pattern asset | Pattern tile base |
| **Overlay highlight** | `rgba(255,255,255,0.078)` (`white` @ alpha ~20/255) | Card hover surface |
| **Accent translucent fill** | `rgba(76,175,80,0.12)` (secondary @ alpha 30/255) | Tag chip background |
| **Accent border soft** | secondary @ alpha 200/255 | Tag chip border and label |
| **Ambient glow** | secondary @ alpha 25/255 | Large soft cursor light |
| **Pattern veil opacity** | `0.05` | Entire background image layer | Texture without competition |

### Semantic usage rules

1. **Canvas is never pure black.** The green undertone is part of the brand.
2. **Accent is earned.** Default UI is white/grey on green. Accent appears when the user engages (hover) or when labeling skills/topics.
3. **Do not use accent as large filled buttons** in the current language—there are essentially no filled primary buttons.
4. **Grey body text on dark green** is intentional; do not brighten all text to white (hierarchy would collapse).
5. **Avoid introducing a third chromatic hue** (purple, orange, cyan UI chrome) unless imagery inside project thumbnails already carries it.

### Theme pairing (product chrome)

- Document / browser theme color: accent green `#4CAF50`
- Splash / background color: canvas `#014035`

---

## Typography

### Font family

The product uses the **platform default typeface** (no custom webfont family is registered). For recreation:

- Prefer a clean **neo-grotesque / system UI stack** that feels native and modern.
- Do **not** introduce a display serif or novelty font unless the new career stage explicitly rebrands typography.
- The “expressive” quality comes from **scale, weight, and color**, not from a branded typeface.

### Type scale (tokenized sizes)

These map to a Material-like scale used throughout:

| Token | Size (px) | Typical use in this product |
|-------|-----------|------------------------------|
| Display Small | **36** | Person name (hero identity) |
| Title Medium | **20** | Mobile section headings (“Experience”, etc.) |
| Title Small | **18** | Role, job summary, cover letter body |
| Body Large | **16** | Card titles (job title • company, project name, article title) |
| Body Medium | **14** | Job/education descriptions |
| Label Large | **14** | Location, phone, section nav labels |
| (unused but defined) | Display L/M 57/45, Headline 32/28/24, Title L 22, Label M/S 12/11, Body S 12 | Available for expansion; not heavily used in UI |

### Weight and style

| Element | Weight | Color | Notes |
|---------|--------|-------|-------|
| Name | Bold | White | Strongest typographic signal |
| Role | Regular | White | Secondary to name, still prominent |
| Job summary / cover letter | Regular | Grey | Softened to support, not compete |
| Section nav labels | Bold + Uppercase | White at full or ~60% opacity | Active vs inactive |
| Mobile section headings | Bold | White | Compensate for missing sticky nav |
| Card titles | Regular (color shifts on hover) | White → Accent | Hover turns title accent green |
| Body descriptions | Regular | Grey | Scannable paragraphs / bullets |
| Tags | Regular / default | Soft accent green | Small chip text |

### Hierarchy rules

1. **Name > Role > Summary > Meta (location/phone).**
2. **Section labels (mobile) > Card titles > Descriptions > Tags.**
3. Uppercase is reserved for **desktop section navigation**, not for body content.
4. Line breaks in the job summary are intentional (`high-performance…` / `with clean code…`)—preserve a short two-line punch.

---

## Spacing system

There is no exhaustive spacing scale object, but the product consistently uses these recurring values:

| Token (suggested) | Value | Usage |
|-------------------|-------|-------|
| `space-4` | 4px | Tight meta stacks (location → phone), tiny vertical padding on headings |
| `space-8` | 8px | Title → subtitle gaps, icon → label gaps, nav item gaps, tag gaps |
| `space-12` | 12px | Description → tags (jobs), article internal gaps |
| `space-16` | 16px | Identity column vertical separators, social icon gaps, date → content gap, image → text |
| `space-20` | 20px | Card internal padding (jobs/education/projects); desktop content horizontal pad |
| `space-64` | 64px | Between major evidence sections |
| `space-200` | 200px | Bottom scroll breathing room after last section |

### Viewport-relative spacing (important)

| Rule | Formula / value | Purpose |
|------|-----------------|---------|
| Outer page horizontal padding (wide) | **10% of viewport width** when viewport width **> 1100px** | Keep content from edge-to-edge on large monitors |
| Outer page horizontal padding (narrower) | **20px** | Compact safe margin |
| Identity column vertical margin | **10% of viewport height** top/bottom | Vertically float the identity block |
| Desktop content top offset | **15% of viewport height** | Align narrative with identity optical center |
| Ambient glow diameter | **40% of viewport width** | Soft large light, not a small spotlight |
| Glow blur | **~40% of glow diameter** | Diffuse atmospheric light |

### Card padding nuances

- Most evidence cards: **20px** all sides.
- Article cards: **16px** all sides (slightly tighter).

---

## Layout rules

### Global structure

- **Single page**, single scroll root.
- **No multi-route IA** in the current product (section jumps are in-page).
- Content is left-aligned within columns; no centered marketing hero.

### Desktop composition (≥ ~950px width)

```
[ 10% pad ] [ Identity column ~30% ][ Evidence column ~70% ] [ 10% pad or remaining ]
```

- Identity column is **visually fixed** in a stacked overlay (does not scroll away).
- Evidence column scrolls underneath / beside it.
- A **spacer equal to ~30% width** reserves space in the scroll document so text does not sit under the identity column.

### Mobile / tablet composition (< ~950px)

```
[ 20px pad ]
Identity block (full width)
Cover letter
Section heading + cards…
[ bottom spacer ]
```

- Section navigation list is **omitted**.
- Section titles become inline headings above each group.

### Alignment principles

- Everything in the identity column is **start-aligned**.
- Cards use a **horizontal split** on non-mobile: date column | content column.
- On mobile, date stacks **above** the title.

---

## Grid system

Not a 12-column marketing grid. Practical grid:

1. **Two-column page shell (desktop):** 30 / 70 identity / evidence.
2. **Two-column card shell (tablet+):** fixed meta (dates) + flexible body.
3. **Wrap grid for tags:** horizontal flow with 8px gaps; wraps freely.
4. **Social row:** horizontal auto cluster with 16px gaps.

Optical columns matter more than a formal grid framework.

---

## Border radius

| Element | Radius | Feel |
|---------|--------|------|
| Highlightable card surface | **4px** | Slight softening; still “document-like” |
| Project thumbnail | **8px** | Friendlier media corners |
| Platform icon clip (Android/iOS) | **6px** | Soft square icons |
| Tag chips | **50px** (pill) | Fully rounded capsules |
| Section nav indicator bar | **20px** | Capsule bar ends |
| Ambient glow | Circle | Soft orb |

Philosophy: **small radii on surfaces, pills on metadata**. Avoid large card rounding (16–24px) that would shift the product toward consumer “card UI.”

---

## Shadows

Shadows are minimal and atmospheric:

| Effect | Spec | Role |
|--------|------|------|
| Ambient glow | Soft box-shadow / glow using secondary @ ~10% opacity, large blur | Cursor atmosphere |
| Cards | **No drop shadow** | Hover uses flat translucent fill instead |
| Text | No text shadows | Clarity on dark field |

Do not add Material elevation stacks to cards; the language is **flat + highlight**, not **raised paper**.

---

## Iconography

### Social / platform icons

- Custom SVG marks: GitHub, LinkedIn, Medium, Android, iOS.
- Default color: **white**.
- Hover color: **accent green**.
- Size: **26×26**.
- Interaction: click opens external profile / store.

### System icons

- **Location:** city/buildings icon, grey, 16px.
- **Phone:** phone icon, white, 16px (elevated importance vs location).
- **External link:** `arrow_downward` rotated **−135°** (points up-right), 16px, inherits title color.

### Icon rules

1. Icons never replace labels for location/phone; they accompany text.
2. Social icons are label-less but universally recognized; keep targets large enough for hit areas.
3. External-link glyph is a **consistent affordance** across all outbound cards.

---

## Imagery

### Background pattern

- Seamless tile of **cyan/light-blue line icons on black**: phones, tablets, hands, gears, charts, styluses—mobile/engineering themed.
- Displayed full-bleed, **repeating**, at **5% opacity** over the green canvas.
- Reads as texture, not illustration. Recreation should keep thematic relevance (mobile/dev) and very low contrast.

### Project imagery

- Square-ish app icons / logos (~**60×60**), corner radius 8.
- When image missing: monogram tile with first letter of project name on translucent white field; letter turns accent on hover.
- Imagery shows **real shipped products**, not stock photos or abstract 3D.

### Decorative imagery rules

- No hero photograph of the person in the current design.
- No full-bleed product mockup carousel in the first viewport.
- Product images appear **in context** inside project cards, late in the journey.

---

## Use of whitespace

Whitespace (or “darkspace”) is a primary material:

1. **Vertical margin around identity (10% vh)** creates a floating card feel without drawing a card.
2. **64px section gaps** separate chapters of the career story.
3. **200px end spacer** prevents the last card from feeling slammed against the browser chrome and allows scroll-spy to settle.
4. **Grey text + green empty field** creates quiet zones between interactive rows.

Crowding is avoided; density lives **inside** cards (tags), not between sections.

---

## Visual hierarchy

### Page-level (desktop)

1. Name  
2. Role  
3. Section nav / socials (persistent)  
4. Cover letter  
5. Evidence cards  

### Card-level

1. Title line (role • company / project / article) + link arrow  
2. Description  
3. Tags / platform icons / date meta  

### Color hierarchy

White = primary claims · Grey = supporting narrative · Green = interactive/metadata emphasis.

---

## Reusable visual patterns

| Pattern | Description | Where |
|---------|-------------|-------|
| **Identity stack** | Name → role → summary → hairline divider → meta rows | Header |
| **Hairline divider** | Thin divider with large right inset (~100px) | Under summary |
| **Meta row** | 16px icon + 8px gap + label | Location, phone |
| **Highlightable row** | Transparent → translucent white surface; title → green | All evidence items |
| **Title • Entity →** | Rich title with bullet separator and outbound arrow | Jobs, projects |
| **Date | Body** | Timeline meta beside content | Jobs, education |
| **Tag wrap** | Pill chips in a wrapping row | Jobs, projects, articles |
| **Accent underline nav** | Short/long bar + uppercase label | Desktop sections |
| **Pattern + glow atmosphere** | Veil + cursor orb | Global shell |

These patterns are the real “design system.” New sections should compose from them rather than inventing new surface languages.

# 06 — Components

Inventory of reusable UI building blocks. Names are conceptual (implementation-agnostic).

---

## 1. App Shell (`MainScaffold` equivalent)

### Purpose
Provide the global environment: canvas color, pattern veil, page padding, ambient glow layer, and a slot for page content.

### Variants
- Default padding: viewport-aware horizontal padding (10% if width > 1100px, else 20px).  
- Optional custom content padding override.

### States
- Idle  
- Pointer-tracking (glow position updates)

### Layout
Full-viewport stack:

1. Pattern image (repeat, opacity 0.05)  
2. Padded content  
3. Glow overlay (non-blocking)

### Usage guidelines
- One shell for the whole product.  
- Do not nest additional full-bleed colored scaffolds that fight `#014035`.  
- Keep glow above visually but below interaction blocking.

---

## 2. Ambient Glow (`BluredWidget` equivalent)

### Purpose
Atmospheric interactive light.

### Variants
Single: circular soft green glow.

### States
- Positioned by pointer  
- Optionally hidden on coarse pointers

### Layout
Width = height = 40% of viewport width; shadow blur ≈ 40% of that width; secondary color @ low alpha.

### Usage guidelines
- Never use as a button or focal content.  
- Keep alpha low enough that text contrast remains acceptable.

---

## 3. Identity Column / Header Info

### Purpose
Brand the person and provide persistent contact + (desktop) navigation.

### Variants
| Variant | Behavior |
|---------|----------|
| **Desktop** | Fixed/overlay column ~30% width; includes Personal Info + Section Nav + Socials with spacers |
| **Mobile/Tablet** | In-flow full-width stack at top of scroll; nav omitted |

### States
Static structurally; children animate on entrance.

### Layout
Vertical stack, start-aligned, items separated by 16px; vertical margin ~10% viewport height.

### Usage guidelines
- Name must remain the strongest text node.  
- Do not place cards or stats inside this column.  
- Socials stay near the bottom of the desktop column.

---

## 4. Personal Information

### Purpose
Communicate who / what / where / how to contact.

### Structure
1. Name (Display Small, bold, white)  
2. 8px gap  
3. Profession (Title Small, white)  
4. 16px gap  
5. Summary (Title Small, grey, possibly multi-line)  
6. Divider (inset from the right ~100px, vertical padding 8)  
7. Location row (grey icon + grey text)  
8. 4px gap  
9. Phone row (white icon + white text, actionable)

### Variants
None beyond responsive typography (same structure).

### States
- Phone: idle / pressed / focused  
- Entrance animation cascade

### Usage guidelines
- Phone remains more emphatic than location.  
- Keep divider understated; it separates “pitch” from “coordinates.”

---

## 5. Section Navigation (`PortfolioSections`)

### Purpose
Desktop wayfinding and scroll orientation.

### Variants
One vertical list; each item is a section.

### States (per item)
| State | Bar width | Opacity |
|-------|-----------|---------|
| Inactive | 50 | ~0.6 |
| Active | 100 | 1.0 |

### Layout
Row: animated bar + 8px + uppercase label; items separated by 8px vertically.

### Usage guidelines
- Desktop only.  
- Labels match IA chapter names.  
- Active state must track scroll; click must smooth-scroll.  
- Do not turn into pills or enclosed buttons.

---

## 6. Social Links Row

### Purpose
Outbound professional presence.

### Variants
Default triple: GitHub, LinkedIn, Medium (order matters: code → career network → writing).

### States
Per icon: default white / hover accent / pressed.

### Layout
Horizontal row, 16px gaps, 26px icons.

### Usage guidelines
- Keep recognizable official marks.  
- Open in a new browsing context where platform conventions allow.  
- Do not add labels unless accessibility requires visible text alternatives (provide `aria-label`s at minimum).

---

## 7. Highlightable Card (primitive)

### Purpose
Shared interaction wrapper for evidence rows.

### Variants
- With outbound tap handler  
- Without (hover still works; click noop)

### States
| State | Surface |
|-------|---------|
| Default | Transparent |
| Hover / highlight | White @ ~8% alpha, radius 4 |

### Layout
Wraps arbitrary child; typically padded by consumer.

### Usage guidelines
- Use for **list evidence**, not for identity chrome.  
- Suppress loud ripples.  
- Communicate highlight to children so titles can recolor.

---

## 8. External Link Title (pattern)

### Purpose
Title treatment for outbound entities.

### Composition
`Primary text` + optional `• Secondary text` + rotated up-right arrow icon (16px).

### States
Color tracks parent highlight: white → accent.

### Usage guidelines
- Always show arrow if the row is clickable outbound.  
- Keep bullet spacing tight (≈4px).  
- Do not underline titles; color + arrow are enough.

---

## 9. Job Card

### Purpose
Present one employment experience.

### Content
- Date range (`start - end`)  
- Title • Company →  
- Description  
- Tag list  

### Variants
| Viewport | Date placement |
|----------|----------------|
| Mobile | Above title |
| Tablet/Desktop | Left column beside body |

### States
Default / highlighted; clickable if website exists.

### Layout
Padding 20. Row: date | expanded column (title, 8 gap, description, 12 gap, tags).

### Usage guidelines
- Reverse chronological in the list.  
- Tags should encode stack and practices, not soft skills paragraphs.  
- Keep description to a mid-length professional paragraph.

---

## 10. Education Card

### Purpose
Present one academic credential.

### Content
- Date range  
- Degree name →  
- Institution (grey)

### Variants
Same date relocation as Job Card.

### States
Default / highlighted; clickable if website exists.

### Layout
Padding 20. Simpler than jobs (no tags in current design).

### Usage guidelines
- Allow `PRESENT` for ongoing study.  
- Prefer institution clarity over logo walls.

---

## 11. Article Card

### Purpose
Present one published article.

### Content
- Title →  
- Published on: date (extra-muted)  
- Summary  
- Topic tags  

### Variants
Single layout (no left date column).

### States
Default / highlighted; always outbound.

### Layout
Padding 16. Vertical stack with 8/12 gaps; tags wrap with spacing 8 / run 4.

### Usage guidelines
- Summary should sell the insight, not paste the full article.  
- Topics act like tags elsewhere for visual consistency.

---

## 12. Project Card

### Purpose
Present a shipped (or notable) product.

### Content
- Thumbnail or monogram (60×60, radius 8)  
- Project name • optional company →  
- Optional Android / iOS icon actions  
- Description  
- Optional tags  

### Variants
| Variant | Visual |
|---------|--------|
| With image | App icon/logo |
| Without image | Monogram tile |
| With stores | Platform icons under title |
| Linkless | Hover still ok; no primary navigation |

### States
Default / highlighted; monogram intensifies on highlight.

### Layout
Padding 20. Top row: image + text column; then description; then tags (16 gap before tags).

### Usage guidelines
- Prefer real store icons only when links exist.  
- Descriptions may use short bullets for consumer apps; keep enterprise apps clearer and prosaic.  
- Tags highlight technical differentiators (CI/CD, biometric, Leanback, etc.).

---

## 13. Tag Chip

### Purpose
Compress skills/topics into scannable metadata.

### Variants
Visual single style; `highlighted` prop exists but styling currently does not branch—treat as reserved.

### States
Static informational.

### Layout
Horizontal padding 10, vertical 4; border 1px soft accent; fill translucent accent; radius pill; text soft accent.

### Usage guidelines
- Wrap in a flex/wrap row with 8px gaps.  
- Keep labels short (1–3 words).  
- Do not mix brand marketing slogans into tags.

---

## 14. Highlightable SVG Icon

### Purpose
Reusable tintable icon button.

### Variants
Optional clip radius (0 default; 6 for store icons).

### States
Default white / hover accent / clicked.

### Layout
26×26 asset box.

### Usage guidelines
- Use for social and store actions.  
- Provide accessible names.

---

## 15. Cover Letter / About Block

### Purpose
Short narrative bridge from identity to evidence.

### Variants
Desktop: horizontally padded (~20px). Mobile: full evidence width.

### States
Visually static; pointer events ignored on the text itself in the live product (non-selectable treatment)—recreation may allow selection for accessibility/UX benefit.

### Layout
Grey Title Small paragraph; appears directly under identity on mobile and at top of evidence on desktop.

### Usage guidelines
- Keep to ~2 short paragraphs.  
- First person is expected.  
- Avoid hard sell.

---

## 16. Mobile Section Heading

### Purpose
Replace desktop nav with in-flow labels.

### Variants
One style: bold white Title Medium, vertical padding 4.

### States
Static.

### Usage guidelines
- Render only below desktop breakpoint.  
- Place immediately above the first card of each chapter (except About).

---

## 17. Timeline Date Label

### Purpose
Show temporal context for jobs/education.

### Variants
Embedded left vs stacked top (responsive).

### States
Always grey; not interactive.

### Usage guidelines
- Keep format consistent across items.  
- Do not let dates exceed title prominence.

---

## Components intentionally absent

Documenting absences prevents accidental invention that breaks the philosophy:

- No primary filled button component  
- No navbar logo lockup beyond the name text  
- No footer component (socials live in identity)  
- No testimonial carousel  
- No skills radar/chart  
- No contact form modal  
- No dark/light theme toggle  
- No language switcher  

If the next career stage needs these, introduce them as **new components** with explicit rationale—do not pretend they were part of this system.

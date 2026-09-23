# 05 — Interaction Design

## Motion principles (global)

1. **Presence, not performance.** Motion introduces the person and confirms interaction; it does not entertain.
2. **Short durations.** Most transitions are ~150–500ms; entrance stagger spans roughly 300–1000ms.
3. **Ease of recognition.** Directionality is meaningful: identity enters from the left (origin of the sticky column); evidence rises into place.
4. **Interruptible and optional.** Atmosphere (glow) is pointer-driven; touch devices still work without it.
5. **No scroll hijacking.** Native/bouncing scroll physics; section jumps are opt-in via nav clicks.
6. **Color is the primary hover signal;** movement is secondary.

Suggested easing: standard ease-out / short material durations. Avoid springy / elastic motion.

---

## Loading behavior

| Phase | Behavior | Purpose |
|-------|----------|---------|
| Boot | Load structured content (jobs, education, projects, articles) before presenting the main view | Prevent empty sections / layout pop-in of lists |
| First paint | Dark canvas appears immediately as theme background | Brand continuity; no white flash |
| Entrance choreography | Staggered fade/slide of identity, socials, about, then evidence | Hierarchy through time |
| Idle | Ambient pattern visible; glow waits for pointer movement | Living but calm |

There is no branded splash screen animation loop, skeleton shimmer circus, or progress bar in the primary experience.

---

## Page transitions

- **None between routes** (single page).  
- **In-page transitions:** smooth scroll when a section is selected (~**500ms**).  
- Scroll spy updates nav without additional motion beyond the underline width/opacity animation.

---

## Scroll effects

| Effect | Spec / behavior | Purpose |
|--------|-----------------|----------|
| Bouncing / elastic scroll physics | Platform-friendly overscroll | Mobile naturalness |
| Scroll spy | Activation when section marker crosses ~30% viewport height | Orientation |
| No parallax layers on content | Content scrolls 1:1 | Readability |
| No sticky section titles in the evidence column | Only identity column sticky on desktop | Avoid chrome clutter |
| End spacer (200px) | Extra scroll past last item | Comfort + spy stability |

---

## Entrance animations (on load)

| Element | Motion | Delay | Duration | Why |
|---------|--------|-------|----------|-----|
| Name | Slide from left (−100) + fade | 300ms | default/short | Establish identity first |
| Profession | Slide left + fade | 400ms | | Cascade hierarchy |
| Job summary | Slide left + fade | 500ms | | |
| Location + phone | Slide left + fade | 600ms | | Meta arrives last in stack |
| Social icons | Fade | 300ms | | Early availability of CTAs |
| Section nav (desktop) | Fade | 400ms / 400ms | | Soft appearance |
| Cover letter | Fade | 400ms / 400ms | | Narrative without motion noise |
| Evidence list group | Move up from −200 + fade | **1000ms** delay / 300ms | Proof arrives after identity settles |

**Principle:** identity animates horizontally (column metaphor); evidence animates vertically (scroll metaphor).

---

## Hover states

### Highlightable cards (jobs, education, articles, projects)

| Property | Default | Hover |
|----------|---------|-------|
| Background | Transparent | White @ ~8% opacity |
| Corner radius | 4px | 4px |
| Transition | — | Short (~100–200ms) |
| Title / arrow color | White | Accent green |
| Cursor | Pointer when outbound link exists | |

Purpose: announce **selectability** and **outbound affordance** without raising elevation.

Splash/ripple effects are suppressed (transparent) to keep the hover language flat and intentional.

### Social / platform SVGs

| Property | Default | Hover |
|----------|---------|-------|
| Fill/stroke color | White | Accent green |
| Size | 26×26 | unchanged |

Purpose: lightweight confirmation; green = brand interactive state.

### Tag chips

- No dedicated hover styling in the current product (static).  
- They are informational, not buttons.

### Phone row

- Tappable/clickable; uses platform ink lightly via press target.  
- Purpose: primary conversion.

### Section nav items

| Property | Inactive | Active |
|----------|----------|--------|
| Bar width | 50 | 100 |
| Bar/label opacity | ~60% (alpha 150) | 100% |
| Motion | Animated width/opacity (~short) | |

Hover on nav is primarily a click target; the strong visual state is **active section**, not hover—though recreation may add a mild hover brightness for accessibility of intent.

---

## Micro-interactions

1. **Underline expansion** in section nav when the active chapter changes.  
2. **Title chromashift** white → green on card hover.  
3. **External arrow** that shares the title color (moves attention to outbound meaning).  
4. **Monogram tile brightening** on projects without images (background alpha 50 → 80; letter → green).  
5. **Cursor glow translation** tracking pointer with offset calibration so the orb feels near the cursor.

Each micro-interaction either **orients**, **affords clicking**, or **adds atmosphere**. None gate content.

---

## Ambient glow (pointer devices)

- Large circular soft light (~40% viewport width).  
- Color: accent green at very low alpha.  
- Follows mouse position with a fixed offset so it sits naturally under/around the pointer.  
- Layered above content hit-testing configuration that allows events to pass where needed (`opaque: false` style behavior).  
- Purpose: **studio lighting** that makes the dark green field feel dimensional and responsive.

On touch-only devices, glow may remain static or hidden; do not block scrolling.

---

## Interactive components map

| Component | Inputs | Feedback | Output |
|-----------|--------|----------|--------|
| Section nav item | Click | Active styles via spy or immediate jump | Smooth scroll to section |
| Social icon | Click / hover | Color shift | Open URL |
| Phone meta | Click | Native dialer / attempt | Call |
| Job card | Hover / click | Highlight + title green | Open company site if present |
| Education card | Hover / click | Highlight + title green | Open institution site if present |
| Article card | Hover / click | Highlight + title green | Open article |
| Project card | Hover / click | Highlight + title green | Open project link if present |
| Store icons | Click / hover | Color shift | Open Play/App Store |
| Scroll viewport | Scroll | Spy updates nav | — |
| Mouse field | Move | Glow follows | Atmosphere |

---

## Focus, keyboard, and accessibility notes (behavioral expectations for recreation)

The current product is **pointer-first**. For a faithful-but-responsible recreation:

- Provide visible **focus rings** using accent or white outline on interactive rows and icons.  
- Ensure card click targets are keyboard activable if they are links.  
- Do not rely on hover alone to communicate that a row is a link—keep the permanent external arrow.  
- Preserve contrast awareness: grey on `#014035` should be checked against WCAG; brighten muted text if needed without breaking hierarchy.

---

## Motion do’s and don’ts

### Do

- Stagger identity entrance.  
- Keep hover under 200ms.  
- Animate nav indicator width.  
- Use fade for soft UI chrome.

### Don’t

- Parallax the pattern aggressively.  
- Autoplay video backgrounds.  
- Bounce cards on hover.  
- Animate every tag individually.  
- Use page-transition theaters between sections.

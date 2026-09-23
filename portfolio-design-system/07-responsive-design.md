# 07 — Responsive Design

## Design intent by viewport

| Viewport | Intent |
|----------|--------|
| **Mobile** | Linear story; identity as header; headings as chapter markers; thumb-friendly tap rows |
| **Tablet** | Mostly linear like mobile, but dates can sit beside content; more horizontal breathing room |
| **Desktop** | Dual-pane workspace: sticky identity + scrolling evidence; section spy nav |

The product is **mobile-comfortable and desktop-elegant**, not “desktop-only shrunk down.”

---

## Breakpoints

Derived from the product’s device detection defaults:

| Name | Width rule | Product behavior class |
|------|------------|------------------------|
| **Mobile** | `< 600px` | `isMobile` behaviors (stacked dates, section titles, no sticky column) |
| **Tablet** | `600px` – `949px` | Not mobile (side dates) but **not desktop** (no sticky identity column / no section nav) |
| **Desktop** | `≥ 950px` | Sticky identity column, section nav, content top offset, reserved left spacer |
| **Wide padding** | `> 1100px` | Outer horizontal padding becomes **10% of viewport width** (else 20px) |

Orientation helpers exist (portrait/landscape) for potential layout branching; the primary portfolio layout key is **width class**, not orientation.

### Recreation recommendation

Express tokens as:

```text
--bp-tablet: 600px;
--bp-desktop: 950px;
--bp-wide: 1100px;
```

---

## Layout changes

### Mobile (< 600)

```
┌─────────────────────┐
│ Identity (full)     │
│ Socials             │
│ Cover letter        │
│ Experience heading  │
│ Job cards (stacked) │
│ Education heading   │
│ …                   │
│ Articles… Projects… │
└─────────────────────┘
```

- Identity width = 100% of content area.  
- Evidence list full width.  
- Card dates above titles.  
- Bottom spacer retained.

### Tablet (600–949)

```
┌─────────────────────┐
│ Identity (full)     │
│ Cover letter        │
│ [date | job body]   │
│ [date | edu body]   │
│ articles / projects │
└─────────────────────┘
```

- Still **no** sticky left rail / section nav.  
- Job/education use horizontal date | body split.  
- Feels like a wide mobile document.

### Desktop (≥ 950)

```
┌──────────────┬────────────────────┐
│ Identity     │ (top spacer 15vh)  │
│ (sticky)     │ Cover letter       │
│ Nav          │ Experience cards   │
│              │ Education…         │
│ Socials      │ Articles… Projects │
└──────────────┴────────────────────┘
```

- Identity width ≈ **30%** of viewport (within padded shell).  
- Scroll document includes a **30% width spacer** so evidence doesn’t slide under the rail.  
- Section titles in evidence are **hidden** (nav replaces them).

---

## Navigation behavior

| Viewport | Navigation |
|----------|------------|
| Mobile / Tablet | In-flow headings; user scrolls manually |
| Desktop | Sticky vertical section list + scroll spy + click-to-smooth-scroll |

Do not introduce a mobile drawer just to mimic desktop nav unless usability testing demands it; the current philosophy prefers **document headings**.

---

## Content reflow rules

1. **Typography sizes currently stay largely constant** across breakpoints (name remains 36, etc.). Recreation may optionally slightly reduce display size on very small phones, but the original leans on wrapping rather than aggressive type scaling.
2. **Tags wrap**; never force a single horizontal non-wrapping row that overflows.
3. **Project header row** (image + text) should wrap gracefully on very narrow widths if needed; prefer keeping image and title on one row down to mobile if possible.
4. **Social icons** remain in a row; ensure hit targets ≥ ~44px via padding even if glyph is 26px.
5. **Cover letter** retains line breaks from copy where intentional; container width drives wrapping otherwise.
6. **Images** stay 60×60; they do not become full-bleed mockups on desktop.

---

## Responsive priorities

When space is constrained, preserve in this order:

1. Name + role + contact  
2. Experience readability  
3. Projects with store links  
4. Education  
5. Articles  
6. Atmospheric glow / pattern fidelity  

Never sacrifice contact to keep decoration.

---

## Padding and density

| Context | Padding |
|---------|---------|
| Shell horizontal (≤1100) | 20px |
| Shell horizontal (>1100) | 10vw |
| Identity vertical margin | 10vh |
| Desktop evidence top | 15vh |
| Section gaps | 64px (all breakpoints) |
| Card padding | 16–20px (unchanged by breakpoint) |

Density increases inside cards via tag wrapping, not by shrinking section gaps.

---

## Pointer vs touch

| Capability | Expectation |
|------------|-------------|
| Fine pointer (mouse) | Hover highlights, glow tracking |
| Coarse pointer (touch) | Tap cards/icons; hover styles may stick or skip—ensure default state already shows link arrows |
| Keyboard | Should reach all outbound actions in recreation |

---

## Testing checklist for recreation

- [ ] 320px width: no horizontal page scroll; name wraps cleanly  
- [ ] 375–430px: identity → letter → jobs feels natural  
- [ ] 768px tablet: dates beside content; no sticky rail  
- [ ] 950px+: sticky identity appears; nav works; spy updates  
- [ ] 1440px+: 10% outer padding; line lengths remain readable  
- [ ] Hover and touch paths both open outbound links  
- [ ] Scroll to bottom still comfortable (end spacer)

# Portfolio Design System — Source of Truth

**Purpose:** Document the existing mobile-developer portfolio as a mature product so another engineering and design team can recreate its design philosophy, visual identity, and user experience in any modern stack (including React).

**Scope:** Brand, visuals, UX, information architecture, interactions, components, responsive behavior, design principles, content strategy, and critique.

**Out of scope:** Implementation details, framework-specific APIs, and redesign proposals (except as opportunities listed in the critique).

---

## How to use this documentation

1. Start with **Brand Identity** and **Design Principles** to internalize *why* the product feels the way it does.
2. Use **Visual Language** and **Components** as the implementation design system.
3. Follow **Information Architecture**, **User Experience**, and **Content Strategy** for structure and messaging.
4. Implement **Interaction Design** and **Responsive Design** as behavioral contracts.
5. Read **Strengths and Weaknesses** before changing anything that is load-bearing for the identity.

Treat contradictions between this documentation and a new brief as intentional evolution. Preserve the principles unless the brief explicitly overrides them.

---

## Document index

| # | File | Topic |
|---|------|--------|
| 01 | [01-brand-identity.md](./01-brand-identity.md) | Personality, tone, audience, emotional goals |
| 02 | [02-visual-language.md](./02-visual-language.md) | Color, type, space, imagery, patterns |
| 03 | [03-user-experience.md](./03-user-experience.md) | Journey, attention, CTAs, trust |
| 04 | [04-information-architecture.md](./04-information-architecture.md) | Structure, hierarchy, progressive disclosure |
| 05 | [05-interaction-design.md](./05-interaction-design.md) | Hover, motion, scroll, micro-interactions |
| 06 | [06-components.md](./06-components.md) | Reusable UI inventory and usage rules |
| 07 | [07-responsive-design.md](./07-responsive-design.md) | Breakpoints, layout modes, reflow |
| 08 | [08-design-principles.md](./08-design-principles.md) | Underlying decision logic |
| 09 | [09-content-strategy.md](./09-content-strategy.md) | Voice, messaging, storytelling |
| 10 | [10-strengths-and-weaknesses.md](./10-strengths-and-weaknesses.md) | Critique and opportunities |

---

## Product summary (one paragraph)

This is a **single-page, dark-themed professional portfolio** for a senior mobile application developer. It opens with identity and contact, then walks the visitor through a short narrative about the career, followed by proof in the form of experience, education, writing, and shipped projects. On large screens it uses a **sticky identity column + scrolling evidence column**; on smaller screens it becomes a **linear vertical story**. The atmosphere is quiet, technical, and confidence-forward: deep forest green, soft green accents, subtle pattern texture, restrained motion, and hover states that reward curiosity without spectacle.

---

## Non-negotiable identity anchors

When recreating or evolving the product, protect these unless deliberately redesigning:

1. **Dark forest-green field** as the dominant environment (not pure black, not purple neon).
2. **Green accent** used for interactive feedback and skill tags—not as large filled surfaces.
3. **Name-first hero** with role and short value proposition immediately underneath.
4. **Sticky personal column on desktop**; content never competes with the brand block for first ownership of the viewport.
5. **Evidence cards** (jobs, education, articles, projects) that highlight on hover and signal external links.
6. **Ambient technical texture** (subtle repeating tech-icon pattern) and a soft cursor-following glow on pointer devices.
7. **Quiet motion**: entrance fades/slides and short hover transitions; no flashy scroll hijacking.
8. **Direct contact affordances** (phone + social profiles) rather than a heavy contact form as the primary CTA.

---

## Content snapshot (as of documentation)

- **Person:** Mohamad Mohamad  
- **Role framing:** Senior Mobile Application Developer  
- **Location:** Budapest, Hungary  
- **Primary contact:** Phone number (tap-to-call)  
- **Social presence:** GitHub, LinkedIn, Medium  
- **Evidence sections:** Experience → Education → Articles → Projects  

Exact copy will change for the next career stage; **structure, hierarchy, and tone patterns** should transfer.

---

## Glossary

| Term | Meaning in this product |
|------|-------------------------|
| **Identity column** | Left (desktop) or top (mobile) block with name, role, summary, location, phone, socials, and (desktop) section nav |
| **Evidence column** | Scrollable narrative + list of professional proof items |
| **Highlightable card** | List item that gains a faint translucent surface and accent-colored title on hover/focus intent |
| **External link glyph** | Small arrow rotated to point up-right, indicating outbound navigation |
| **Tag chip** | Pill-shaped skill/topic label with green outline + translucent green fill |
| **Scroll spy** | Desktop nav state that updates based on which evidence section is near the top of the viewport |
| **Ambient glow** | Large soft circular green light that follows the cursor |
| **Pattern veil** | Very low-opacity tiled background of mobile/tech line icons |

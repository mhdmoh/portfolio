# 08 — Design Principles

These principles explain **why** the portfolio looks and behaves as it does. Use them to adjudicate new design decisions.

---

## 1. Identity is a persistent object, not a banner

**Why:** Hiring decisions are about a person. Keeping the name/role/contact present on desktop while proof scrolls past constantly re-anchors evaluation to the human.

**Implications:** Prefer sticky identity rails over top nav bars that only show a logo. Avoid designs where the name disappears after one viewport.

---

## 2. Restraint signals seniority

**Why:** Junior portfolios often overcompensate with effects. A quiet system—limited color, flat cards, short motion—reads as confidence.

**Implications:** When choosing between “more wow” and “more clarity,” choose clarity. Accent color is a spice, not a sauce.

---

## 3. Evidence beats claims

**Why:** Technical audiences distrust adjectives. Dates, employers, tags, store links, and articles are harder to fake than slogans.

**Implications:** Section real estate should favor lists of artifacts. Marketing copy stays short (summary + cover letter only).

---

## 4. Atmosphere should be thematic and quiet

**Why:** The pattern veil (mobile/dev iconography) and green glow create a studio without stealing focus. They encode “mobile engineer” subconsciously.

**Implications:** Background systems must stay near the edge of perception (≈5% opacity textures, low-alpha lights). If a visitor describes the background before the name, atmosphere is too loud.

---

## 5. Interaction confirms agency

**Why:** Hover highlights and green titles teach that rows are portals to proof on the open web. The portfolio is a hub, not a closed brochure.

**Implications:** Keep outbound arrows. Prefer click-through to companies/stores/articles over trapping content in vanity detail pages—unless deeper case studies become a career-stage need.

---

## 6. Hierarchy is mostly typographic and chromatic, not boxed

**Why:** There are almost no bordered layout cards in the identity region. Hierarchy comes from size, weight, and grey/white/green roles.

**Implications:** Don’t box the hero. Cards exist for interactive evidence rows because interaction needs a hover surface—not because everything must be a card.

---

## 7. Spacing creates chapters

**Why:** 64px gaps and large bottom spacer produce a reading rhythm similar to print résumé sections, aiding scanability.

**Implications:** Resist compressing the whole page into a dense dashboard to “show more above the fold.” Above-the-fold ownership belongs to identity + about.

---

## 8. Motion encodes reading order

**Why:** Leftward entrance for identity matches the left rail. Delayed vertical entrance for evidence matches the scroll axis. Timing says: person first, proof second.

**Implications:** Don’t randomize animation directions. Don’t run all entrances simultaneously.

---

## 9. Contact should be cheaper than conversation UI

**Why:** A visible phone and social icons remove friction. Forms add latency and distrust (“will anyone read this?”).

**Implications:** Direct channels first. Add forms only if spam or asynchronous intake becomes a real requirement.

---

## 10. Sameness across item types builds a system

**Why:** Jobs, education, articles, and projects share highlight + title + arrow grammar. The visitor learns once.

**Implications:** New content types should inherit the highlightable row language. Diverging wildly (e.g., a radically different project module) needs a strong reason.

---

## 11. Green means “live”

**Why:** Accent green appears on hover, tags, and glow—things that feel active, technical, growing. The deep canvas green feels grounded and organic rather than neon-hacker.

**Implications:** Don’t use green for error states or large static fills. Keep it associated with interactivity and skill metadata.

---

## 12. Desktop is a workstation; mobile is a narrative

**Why:** Recruiters on laptops benefit from persistent context; mobile visitors benefit from uninterrupted scroll storytelling.

**Implications:** Feature parity does not mean layout parity. Removing section nav on mobile is correct if headings replace it.

---

## 13. Typography defaults are acceptable if scale is intentional

**Why:** The product invests in scale and hierarchy rather than custom font branding. That keeps attention on content and ships cleanly across platforms.

**Implications:** If introducing a custom font for the React rebuild, it should still feel neutral-modern and must not overpower the name’s scale relationship.

---

## 14. Progressive intensity through the scroll

**Why:** Text-heavy early sections → writing → visual projects. The page becomes more concrete as commitment increases.

**Implications:** Don’t dump a screenshot gallery at the top; earn visuals.

---

## Decision test (use during recreation)

For any proposed change, ask:

1. Does the **name** still win the first viewport?  
2. Does accent color still feel **earned**?  
3. Is proof still easier to find than adjectives?  
4. Does motion still clarify hierarchy?  
5. Is contact still obvious within 5 seconds?  

If any answer is no, the change fights the product philosophy.

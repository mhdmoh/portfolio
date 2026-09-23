# 03 — User Experience

## Product model

The portfolio is a **single continuous journey**, not a multi-page site. Navigation is either:

- **Implicit:** scrolling through the document, or  
- **Explicit (desktop):** clicking section labels that smooth-scroll to chapter anchors.

There is no separate “home,” “about page,” or “contact page.” Contact lives inside the identity block at all times on desktop, and at the top of the scroll on mobile.

---

## Complete user journey

### 1. Arrival / load

- Content data (jobs, education, projects, articles) is prepared before the UI becomes interactive.
- User lands on a dark green field; pattern veil and identity content appear.
- Entrance motion staggers identity text from the left with fades; socials and cover letter fade in; evidence block fades/slides after a longer delay (~1s).

**Intent:** the person appears first; proof arrives second. The delay encodes priority.

### 2. Orientation (first 3–5 seconds)

User answers:

1. Who is this? → **Name**
2. What do they do? → **Senior Mobile Application Developer**
3. Why should I care? → **High-performance apps, clean code, exceptional UI/UX**
4. Where / how do I reach them? → **Budapest**, **phone**, **socials**

On desktop, section nav silently promises a structured story: About, Experience, Education, Articles, Projects.

### 3. Narrative handshake (About)

The cover letter paragraph establishes timeline and character:

- Career start year (2019)
- Contexts: agency, startup, freelance, leadership
- Growth mindset / continuous learning

**Intent:** humanize before the résumé bullets. Soft grey styling keeps it from overpowering the identity.

### 4. Proof of work (Experience)

User scans reverse-chronological roles:

- Date range
- Title • Company (outbound)
- Responsibility paragraph
- Technology / practice tags

Hover confirms interactivity; click opens company site when available.

**Intent:** establish seniority and stack fit quickly for technical evaluators.

### 5. Credentials (Education)

Degrees and institutions with date ranges and outbound university links.

**Intent:** reinforce credibility and current trajectory (e.g., ongoing master’s).

### 6. Thought leadership (Articles)

Published writing with date, summary, topic tags; click opens Medium (or equivalent).

**Intent:** show communication skill and depth beyond ticket delivery. Placing articles **before** projects signals that writing/thinking is part of the professional brand, not an afterthought.

### 7. Artifacts (Projects)

Shipped products with optional icon, company, description, store badges, tags.

**Intent:** concrete proof—especially valuable for mobile roles where store presence matters.

### 8. Exit / conversion

User either:

- Calls / taps phone
- Opens GitHub / LinkedIn / Medium
- Follows outbound links from cards
- Leaves after mental shortlisting

There is **no interstitial contact form** in the live experience (even if older README text mentions one). Conversion is **direct channel access**.

---

## What users notice first

1. **Color climate** (forest green dark mode)  
2. **Name typography** (largest, bold, white)  
3. **Role line**  
4. On desktop: **persistent left column** as a stable anchor  
5. Optional: **cursor glow** (pointer devices) as atmospheric delight  

Secondary notice: pattern texture, then cover letter, then first experience card.

---

## How attention is guided

| Mechanism | Effect |
|-----------|--------|
| Scale & weight | Name dominates |
| Color contrast | White claims > grey support |
| Spatial persistence (desktop) | Identity stays while evidence moves |
| Staggered entrance | Left-edge motion draws eye to identity stack order |
| Scroll spy underlines | Active section on desktop keeps orientation |
| Hover highlight | Teaches that rows are actionable |
| Accent on hover titles | Points to the clickable claim |
| Section spacing (64px) | Creates chapter breaks for scanning |
| Tags | Peripheral stack signals without demanding reading |

Attention is **vertical and linear**, not radial. There is no competing sidebar of widgets, stats, or promos.

---

## Why sections are ordered this way

Order: **About → Experience → Education → Articles → Projects**

| Position | Section | Rationale |
|----------|---------|-----------|
| 1 | About | Context and personality before claims |
| 2 | Experience | Highest-signal proof for hiring |
| 3 | Education | Formal credentials; supports career narrative |
| 4 | Articles | Differentiator / senior signal (communication) |
| 5 | Projects | Concrete artifacts; denser, more visual; rewards deeper scrollers |

Projects last also means **visual thumbnails appear after text-heavy sections**, so the journey becomes more concrete over time.

---

## Intended flow from landing to leaving

```
Land → Identify person → Read short story → Scan roles → Note education
  → Sample writing → Inspect apps → Exit via call/social/outbound link
```

Success metrics (qualitative):

- Visitor can repeat name, role, and one standout employer/project.
- Visitor knows how to contact without hunting.
- Visitor feels the person is senior and reachable.

---

## Navigation philosophy

1. **One page, many chapters.**  
2. **Desktop:** navigation is a **mirror of scroll position** (scroll spy) and a **teleporter** (click to smooth-scroll ~500ms).  
3. **Mobile:** navigation is **typographic section headings** in the document flow—no separate nav chrome.  
4. **No hamburger, no top app bar, no breadcrumbs.**  
5. Nav labels are uppercase short nouns: ABOUT, EXPERIENCE, EDUCATION, ARTICLES, PROJECTS.

Active state language: longer brighter underline + brighter label; inactive: shorter dimmer underline + dimmer label.

---

## Calls to action

Primary CTAs are **quiet but constant**:

| CTA | Placement | Behavior | Priority |
|-----|-----------|----------|----------|
| Phone number | Identity meta | Tap/click initiates call | Highest direct conversion |
| GitHub | Social row | External profile | High for engineers |
| LinkedIn | Social row | External profile | High for recruiters |
| Medium | Social row | External writing | Medium |
| Job/education/project/article cards | Evidence list | Open related URL when present | Exploration |
| Android / iOS icons | Project cards | Open store listings | High for mobile proof |

There is **no** large “Hire me” button, email form modal, or calendar embed in the current UX. The philosophy is: **make contact trivial, not theatrical**.

Phone is visually stronger than location (white vs grey), encoding priority.

---

## How trust and credibility are established

1. **Specificity:** real company names, date ranges, university names, store links.  
2. **Stack transparency:** skills listed as tags rather than vague claims.  
3. **Leadership language:** titles and descriptions that include mentoring, CI/CD, architecture.  
4. **Public artifacts:** Medium posts and app store entries.  
5. **Geographic / contact honesty:** city and phone visible.  
6. **Visual restraint:** design that looks intentional rather than template-spammy.  
7. **Consistency:** every evidence type shares interaction grammar, suggesting systems thinking.

Trust is **accumulative through scroll**, not asserted in a hero slogan.

# 04 — Information Architecture

## Page structure

```
Portfolio (single document)
├── Shell (canvas, pattern veil, ambient glow, page padding)
└── Dashboard
    ├── Identity Region
    │   ├── Personal Information
    │   │   ├── Name
    │   │   ├── Profession
    │   │   ├── Job summary (value proposition)
    │   │   ├── Divider
    │   │   ├── Location
    │   │   └── Phone (actionable)
    │   ├── Section Navigation (desktop only)
    │   └── Social Links
    └── Evidence Region (scrollable)
        ├── About (cover letter)
        ├── Experience (list of jobs)
        ├── Education (list of schools)
        ├── Articles (list of posts)
        └── Projects (list of products)
```

There are **no nested routes** and **no modal workflows** in the primary IA.

---

## Section hierarchy

### L1 — Regions

1. Identity Region  
2. Evidence Region  

### L2 — Evidence chapters

1. About  
2. Experience  
3. Education  
4. Articles  
5. Projects  

### L3 — Items inside chapters

- Job item  
- Education item  
- Article item  
- Project item  

### L4 — Item internals

Common: title, supporting text, optional outbound behavior.  
Optional: dates, tags, images, platform links.

---

## Relationships between sections

| From | To | Relationship |
|------|----|--------------|
| About | Experience | Narrative claims are substantiated by roles |
| Experience | Projects | Employers map to shipped products (e.g., Bubblz, Protech apps) |
| Experience | Articles | Senior practice spills into public writing |
| Education | About | Academic timeline frames the career origin/current growth |
| Social Medium | Articles | Same writing presence, different entry points |
| Projects | Social/store | Deep links to distribution channels |

The IA is a **funnel from self → employment → credentials → voice → artifacts**.

---

## Content prioritization

### Always visible (desktop)

- Name, role, summary, location, phone, section nav, socials  

### First in scroll

- Cover letter  

### Highest hiring signal

- Experience items (especially latest senior/lead roles)  

### Supporting signal

- Education  
- Articles  

### Depth / portfolio browsing

- Projects (more items, more visual)  

### Deprioritized / absent

- Blog index pages, services packages, pricing, testimonial walls, animated skill meters, blog CMS chrome.

---

## Navigation structure

### Desktop section nav model

Labels (in order):

1. ABOUT  
2. EXPERIENCE  
3. EDUCATION  
4. ARTICLES  
5. PROJECTS  

Behaviors:

- **Click:** smooth scroll to the first item / anchor of that section (~500ms).  
- **Scroll spy:** as the user scrolls, the active label updates when a section’s first item crosses an activation line around **30% of viewport height** from the top.  
- Priority when multiple sections intersect the line: Projects > Articles > Education > Experience > About (checked in that order in the live logic). Recreation should preserve **stable, predictable active states**; if re-implementing, prefer a clearer topmost-section algorithm, but keep the UX goal: **nav reflects where you are**.

### Mobile navigation model

- No parallel nav component.  
- In-flow headings: “Experience”, “Education”, “Articles”, “Projects”.  
- About has no heading label beyond the letter itself (identity already frames it).

---

## Progressive disclosure

Information is revealed in layers:

1. **Identity claims** (who/what/where/contact)  
2. **Story** (cover letter)  
3. **Compressed proof** (titles, companies, dates)  
4. **Expanded proof** (descriptions)  
5. **Technical texture** (tags)  
6. **External depth** (click out to sites, stores, articles)  

Nothing important is trapped behind tabs. Depth is either **on-card** or **outbound**.

Hover is a micro progressive disclosure of *interactivity*, not of hidden text (descriptions are already visible).

---

## Data entities (content model)

Document these as CMS/content types for recreation:

### Person (singleton)

- name  
- profession  
- summary  
- coverLetter  
- location  
- phone  
- socials[] `{ network, url }`  

### Job

- title  
- company  
- start  
- end  
- description  
- tags[]  
- website?  

### Education

- name (degree)  
- institution  
- from  
- to  
- website?  

### Article

- title  
- publishDate  
- summary  
- topics[]  
- link  
- impact? (optional / currently unused)  

### Project

- projectName  
- companyName?  
- description  
- tags[]?  
- image?  
- link?  
- androidLink?  
- iosLink?  

---

## Labeling guidelines

- Section nouns are short and conventional (Experience, not “Work Chronicles”).  
- Job titles preserve real seniority wording.  
- Dates use compact month.year style (`Oct.2023`).  
- “PRESENT” is allowed for ongoing items.  
- Tags are short technology/practice labels, Title Case or standard tech casing (`CI/CD`, `SwiftUI`).

---

## Architectural constraints for recreation

1. Keep a **single scroll document** unless the new career stage truly needs multi-page depth.  
2. Keep **identity persistent on large screens**.  
3. Keep **evidence as ordered lists of homogeneous cards**.  
4. Prefer **outbound links** over in-app detail pages for jobs/articles/projects (unless you intentionally deepen IA later).  
5. Preserve the **chapter order** unless messaging strategy changes.

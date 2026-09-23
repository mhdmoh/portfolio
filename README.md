# Mohamad Mohamad — Personal Website

A production-quality personal website and engineering portfolio, built as a data-driven application: the UI never touches raw content directly, everything flows through a validated content layer.

Live stack: **React 19 + TypeScript + Vite**, **Tailwind CSS v4**, **shadcn/ui**, **Framer Motion**, **React Router**, **Zod**.

---

## Architecture

The core idea: **content and UI are completely separate.** Components render data; they never import JSON or Markdown directly.

```
src/
  content/            Raw content — JSON files + Markdown collections
    site.json, hero.json, navigation.json, ...
    projects/*.md      Engineering case studies (frontmatter + body)
    publications/*.md  Publications (frontmatter + body)

  schemas/            Zod schema per content type — also the source of
                       truth for TypeScript types (`z.infer`, never
                       duplicated as hand-written interfaces)

  services/
    content.ts         The single gateway to all content. Validates every
                        JSON file and Markdown file against its schema at
                        module load time and throws loudly if anything is
                        invalid. Exposes typed getters: getHero(),
                        getProjects(), getProject(slug), etc.

  config/
    routes.ts           Route paths in one place — no magic strings
    seo.ts               Per-page metadata builder (title, OG, Twitter, JSON-LD)
    theme.ts              Light/dark theme resolution helpers

  components/
    ui/                  shadcn/ui primitives (button, card, tabs, sheet, ...)
    common/               Reusable presentational pieces (Section, SectionHeader,
                           Tag, QuoteBlock, MarkdownRenderer, Seo)
    layout/                Navbar, Footer, ThemeToggle, root Layout
    engineering/            ProjectCard
    lab/                     PublicationCard, ExperimentCard

  hooks/
    use-theme.tsx          ThemeProvider + useTheme (light/dark/system, persisted)

  lib/
    utils.ts                cn() class-merging helper (shadcn)
    animations.ts             Centralized Framer Motion presets (fadeIn, slideUp,
                               scaleIn, staggerContainer, pageTransition)
    icons.ts                   Centralized icon registry (swap icon libraries in
                                one place)

  pages/                     One file per route. Pages read content via
                              `contentService` and compose components —
                              no business logic lives here beyond that.
```

Components are **presentational only**. All data comes in through the content service; there is no component that fetches or parses content itself.

### Why this shape

- **Content and code evolve independently.** Adding a project is a Markdown file, not a React component.
- **Invalid content fails loudly.** Every JSON/Markdown file is validated against a Zod schema at startup — a missing field or wrong type breaks the dev server immediately instead of rendering a broken page.
- **Future CMS-readiness.** If content ever needs to move to Contentful, Sanity, or a custom API, only `services/content.ts` changes. Every component and page is unaffected.

---

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build     # type-check and build for production
npm run preview   # preview the production build locally
npm run lint       # oxlint
```

---

## Adding content

### Add an engineering case study

1. Create `src/content/projects/your-project.md` with frontmatter:

   ```md
   ---
   title: Your Project
   slug: your-project
   category: enterprise # enterprise | products | research | mobile
   year: "2026"
   status: live # live | in-progress | archived | concept
   featured: false
   published: true
   technologies: ["TypeScript", "PostgreSQL"]
   summary: One or two sentences for the card and SEO description.
   order: 5
   ---

   ## Overview
   ...
   ## Problem
   ...
   ```

2. Follow the standard case-study structure (Overview, Problem, Constraints, Approach, Architecture, Engineering Decisions, Challenges, Results, Lessons Learned, Related Work) — consistency here is what makes the Engineering page trustworthy.
3. Commit. No component needs to change — the content service picks it up automatically via `import.meta.glob`.

### Add a publication

Same pattern in `src/content/publications/your-paper.md`, matching `src/schemas/publication.ts`.

### Edit site-wide content

Hero copy, navigation, experience timeline, about page, contact details, social links, and the Lab page's thesis/experiments/research notes are all plain JSON files in `src/content/`. Edit the JSON; the corresponding Zod schema in `src/schemas/` documents exactly what's required.

### Add a new page

1. Add the route to `src/config/routes.ts`.
2. Create the page in `src/pages/`.
3. Register a lazy route in `src/App.tsx`.
4. Add a nav entry in `src/content/navigation.json` if it belongs in the primary nav.

---

## Theming

Design tokens live in `src/index.css` as CSS variables (`:root` for light, `.dark` for dark), sourced from the design system doc: background `#FAFAFA`/`#090909`, restrained indigo accent, Geist / Geist Mono typefaces. `src/config/theme.ts` + `src/hooks/use-theme.tsx` implement light/dark/system switching with `localStorage` persistence — a lightweight equivalent to `next-themes` for a Vite app. An inline script in `index.html` applies the stored theme before React mounts, avoiding a flash of the wrong theme.

## Motion

All animation goes through the presets in `src/lib/animations.ts` (`fadeIn`, `slideUp`, `scaleIn`, `staggerContainer`, `pageTransition`). `prefers-reduced-motion` is respected globally via CSS in `src/index.css`.

## Icons

All icons are referenced through `src/lib/icons.ts`, a single registry mapping names to `lucide-react` components. Note: recent `lucide-react` versions dropped trademarked brand logos (GitHub, LinkedIn, X), so social links use neutral glyphs paired with text labels rather than brand marks.

## SEO

`src/config/seo.ts` builds per-page title/description/Open Graph/Twitter Card metadata from `contentService.getSite()`; `src/components/common/seo.tsx` renders it via `react-helmet-async`. A `Person` JSON-LD block is emitted on the homepage. `public/robots.txt` and `public/sitemap.xml` are static and should be updated if routes change.

---

## Deployment

This is a fully static single-page app — no backend, no server, no database. Build with `npm run build` and deploy the `dist/` folder to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, S3 + CloudFront, etc.).

Because routing is client-side (React Router, `BrowserRouter`), the host needs to serve `index.html` for unknown paths so deep links like `/engineering/dear-stranger` work on refresh:

- **Netlify**: `public/_redirects` is already included (`/* /index.html 200`).
- **Vercel**: add a rewrite from `/(.*)` to `/index.html` in `vercel.json`.
- **Other static hosts**: configure an equivalent SPA fallback rule.

## Performance notes

Routes are code-split with `React.lazy`, so the heavy Markdown rendering pipeline (`react-markdown` + `remark-gfm`) only loads on case-study and publication pages. Because this is a client-rendered SPA (no SSR/SSG), Lighthouse Performance scores depend heavily on network conditions for first paint; if that becomes a priority, consider adding a prerendering step (e.g. `vite-plugin-ssg` or a prerender pass in CI) without changing the content layer or component architecture.

## Placeholder assets

`public/images/portrait-hero.svg`, `portrait-about.svg`, and `og-image.svg` are placeholders — replace them with real photography (see `docs/design_system.md` — Images) and update the paths in `src/content/hero.json`, `about.json`, and `assets.json`. `public/resume.pdf` also needs to be added.

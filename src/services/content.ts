import fm from "front-matter";

import { isStaticFile, withBase } from "@/lib/utils";

import { aboutSchema, type About } from "@/schemas/about";
import { assetsSchema, type Assets } from "@/schemas/assets";
import { contactSchema, type Contact } from "@/schemas/contact";
import { type ExperienceEntry, experienceSchema } from "@/schemas/experience";
import { type Hero, heroSchema } from "@/schemas/hero";
import { type Lab, labSchema } from "@/schemas/lab";
import { type Navigation, navigationSchema } from "@/schemas/navigation";
import { type Principle, principlesSchema } from "@/schemas/principles";
import {
  type Project,
  projectFrontmatterSchema,
  projectSchema,
} from "@/schemas/project";
import {
  type Publication,
  publicationFrontmatterSchema,
  publicationSchema,
} from "@/schemas/publication";
import { type Site, siteSchema } from "@/schemas/site";
import { type SocialLink, socialSchema } from "@/schemas/social";
import { type TimelineEvent, timelineSchema } from "@/schemas/timeline";

import aboutJson from "@/content/about.json";
import assetsJson from "@/content/assets.json";
import contactJson from "@/content/contact.json";
import experienceJson from "@/content/experience.json";
import heroJson from "@/content/hero.json";
import labJson from "@/content/lab.json";
import navigationJson from "@/content/navigation.json";
import principlesJson from "@/content/principles.json";
import siteJson from "@/content/site.json";
import socialJson from "@/content/social.json";
import timelineJson from "@/content/timeline.json";

/**
 * The content service is the single gateway to all website content.
 * Components must never import JSON or Markdown directly — everything
 * flows through the typed getters below, and everything is validated
 * once, at module load, so invalid content fails loudly during
 * development instead of rendering a broken page.
 */

function parseOrThrow<T>(
  schema: { safeParse: (input: unknown) => { success: boolean; data?: T; error?: unknown } },
  data: unknown,
  source: string,
): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Error(
      `Content validation failed for "${source}":\n${JSON.stringify(result.error, null, 2)}`,
    );
  }
  return result.data as T;
}

const projectFiles = import.meta.glob("../content/projects/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

const publicationFiles = import.meta.glob("../content/publications/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

function loadMarkdownCollection<T>(
  files: Record<string, string>,
  frontmatterSchema: { safeParse: (input: unknown) => { success: boolean; data?: unknown; error?: unknown } },
  fullSchema: { safeParse: (input: unknown) => { success: boolean; data?: T; error?: unknown } },
): T[] {
  return Object.entries(files).map(([path, raw]) => {
    const { attributes, body } = fm<Record<string, unknown>>(raw);
    const frontmatter = parseOrThrow(frontmatterSchema, attributes, path);
    return parseOrThrow(fullSchema, { ...(frontmatter as object), body: body.trim() }, path);
  });
}

/** Rewrite file links (e.g. "/resume.pdf") to include the deploy base; leave routes alone. */
const fileHref = (href: string) => (isStaticFile(href) ? withBase(href) : href);

const site: Site = parseOrThrow(siteSchema, siteJson, "site.json");
const navigation: Navigation = parseOrThrow(navigationSchema, navigationJson, "navigation.json");
const social: SocialLink[] = parseOrThrow(socialSchema, socialJson, "social.json").map(
  (link) => ({ ...link, href: fileHref(link.href) }),
);
const experience: ExperienceEntry[] = parseOrThrow(experienceSchema, experienceJson, "experience.json");
const timeline: TimelineEvent[] = parseOrThrow(timelineSchema, timelineJson, "timeline.json");
const principles: Principle[] = parseOrThrow(principlesSchema, principlesJson, "principles.json");
const aboutRaw: About = parseOrThrow(aboutSchema, aboutJson, "about.json");
const about: About = { ...aboutRaw, portrait: withBase(aboutRaw.portrait) };
const contactRaw: Contact = parseOrThrow(contactSchema, contactJson, "contact.json");
const contact: Contact = { ...contactRaw, resumeHref: withBase(contactRaw.resumeHref) };
const lab: Lab = parseOrThrow(labSchema, labJson, "lab.json");
const assetsRaw: Assets = parseOrThrow(assetsSchema, assetsJson, "assets.json");
const assets: Assets = {
  ...assetsRaw,
  profilePhoto: withBase(assetsRaw.profilePhoto),
  aboutPhoto: withBase(assetsRaw.aboutPhoto),
  logo: withBase(assetsRaw.logo),
  resume: withBase(assetsRaw.resume),
  ogImage: withBase(assetsRaw.ogImage),
};
const heroRaw: Hero = parseOrThrow(heroSchema, heroJson, "hero.json");
const hero: Hero = {
  ...heroRaw,
  portrait: withBase(heroRaw.portrait),
  buttons: heroRaw.buttons.map((button) => ({ ...button, href: fileHref(button.href) })),
};

const projects: Project[] = loadMarkdownCollection(
  projectFiles,
  projectFrontmatterSchema,
  projectSchema,
).sort((a, b) => a.order - b.order);

const publicationStatusRank: Record<Publication["status"], number> = {
  published: 0,
  accepted: 1,
  "under-review": 2,
  "in-progress": 3,
};

const publications: Publication[] = loadMarkdownCollection(
  publicationFiles,
  publicationFrontmatterSchema,
  publicationSchema,
).sort((a, b) => {
  const byStatus =
    publicationStatusRank[a.status] - publicationStatusRank[b.status];
  if (byStatus !== 0) return byStatus;
  return Number(b.year) - Number(a.year);
});

export const contentService = {
  getSite: (): Site => site,
  getNavigation: (): Navigation => navigation,
  getSocialLinks: (): SocialLink[] => social,
  getExperience: (): ExperienceEntry[] => experience,
  getTimeline: (): TimelineEvent[] => timeline,
  getPrinciples: (): Principle[] => principles,
  getAbout: (): About => about,
  getContact: (): Contact => contact,
  getLab: (): Lab => lab,
  getAssets: (): Assets => assets,
  getHero: (): Hero => hero,

  getProjects: (): Project[] => projects.filter((project) => project.published),
  getFeaturedProjects: (): Project[] =>
    projects.filter((project) => project.published && project.featured),
  getProjectsByCategory: (category: Project["category"]): Project[] =>
    projects.filter((project) => project.published && project.category === category),
  getProject: (slug: string): Project | undefined =>
    projects.find((project) => project.slug === slug && project.published),

  getPublications: (): Publication[] => publications,
  getPublication: (slug: string): Publication | undefined =>
    publications.find((publication) => publication.slug === slug),
};

export type ContentService = typeof contentService;

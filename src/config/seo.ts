import { contentService } from "@/services/content";

export interface PageMetadata {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article" | "profile";
}

const site = contentService.getSite();
const assets = contentService.getAssets();

export function buildMetadata(page: PageMetadata) {
  const title = page.path === "/" ? site.name : `${page.title} — ${site.name}`;
  const url = `${site.url}${page.path === "/" ? "/" : page.path}`;
  const image = new URL(page.image ?? assets.ogImage, site.url).toString();

  return {
    title,
    description: page.description,
    url,
    image,
    type: page.type ?? "website",
    siteName: site.name,
  };
}

export function buildPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    description: site.description,
    url: site.url,
  };
}

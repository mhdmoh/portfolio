export const routes = {
  home: "/",
  engineering: "/engineering",
  engineeringDetail: (slug: string) => `/engineering/${slug}`,
  lab: "/lab",
  experience: "/experience",
  about: "/about",
  contact: "/contact",
  publicationDetail: (slug: string) => `/lab/publications/${slug}`,
} as const;

export const routePatterns = {
  home: "/",
  engineering: "/engineering",
  engineeringDetail: "/engineering/:slug",
  lab: "/lab",
  experience: "/experience",
  about: "/about",
  contact: "/contact",
  publicationDetail: "/lab/publications/:slug",
  notFound: "*",
} as const;

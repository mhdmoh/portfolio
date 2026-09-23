import { Helmet } from "react-helmet-async";

import { buildMetadata, buildPersonJsonLd, type PageMetadata } from "@/config/seo";

export function Seo(page: PageMetadata) {
  const meta = buildMetadata(page);

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={meta.url} />

      <meta property="og:type" content={meta.type} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={meta.url} />
      <meta property="og:image" content={meta.image} />
      <meta property="og:site_name" content={meta.siteName} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.image} />

      {page.path === "/" ? (
        <script type="application/ld+json">{JSON.stringify(buildPersonJsonLd())}</script>
      ) : null}
    </Helmet>
  );
}

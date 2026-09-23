import { Link, Navigate, useParams } from "react-router-dom";

import { MarkdownRenderer } from "@/components/common/markdown-renderer";
import { Seo } from "@/components/common/seo";
import { Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { icons } from "@/lib/icons";
import { contentService } from "@/services/content";

const statusLabel = {
  published: "Published",
  accepted: "Accepted",
  "under-review": "Under Review",
  "in-progress": "In Progress",
} as const;

export function PublicationDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const publication = slug ? contentService.getPublication(slug) : undefined;

  if (!publication) {
    return <Navigate to={routes.lab} replace />;
  }

  return (
    <>
      <Seo
        path={routes.publicationDetail(publication.slug)}
        title={publication.title}
        description={publication.summary}
        type="article"
      />

      <Section className="pt-12 md:pt-16" containerClassName="max-w-3xl">
        <Button asChild variant="ghost" size="sm" className="mb-8 -ml-3">
          <Link to={routes.lab} className="inline-flex items-center gap-1.5">
            <icons.arrowRight className="size-4 rotate-180" />
            Back to Lab
          </Link>
        </Button>

        <p className="font-mono text-xs tracking-wide text-muted-foreground">
          {statusLabel[publication.status]} · {publication.year} · {publication.venue}
        </p>

        <h1 className="mt-4 text-4xl font-medium tracking-tight text-balance sm:text-5xl">
          {publication.title}
        </h1>
        <p className="mt-4 text-muted-foreground">{publication.authors.join(", ")}</p>

        <div className="mt-12">
          <MarkdownRenderer content={publication.body} />
        </div>

        {publication.link ? (
          <Button asChild className="mt-10" variant="outline">
            <a
              href={publication.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2"
            >
              View on Springer
              <icons.arrowUpRight className="size-4" />
            </a>
          </Button>
        ) : null}
      </Section>
    </>
  );
}

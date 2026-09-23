import { Navigate, useParams, Link } from "react-router-dom";

import { MarkdownRenderer } from "@/components/common/markdown-renderer";
import { Seo } from "@/components/common/seo";
import { Section } from "@/components/common/section";
import { Tag } from "@/components/common/tag";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { icons } from "@/lib/icons";
import { contentService } from "@/services/content";

const statusLabel = {
  live: "Live",
  "in-progress": "In Progress",
  archived: "Archived",
  concept: "Concept",
} as const;

export function EngineeringDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? contentService.getProject(slug) : undefined;

  if (!project) {
    return <Navigate to={routes.engineering} replace />;
  }

  return (
    <>
      <Seo
        path={routes.engineeringDetail(project.slug)}
        title={project.title}
        description={project.summary}
        type="article"
      />

      <Section className="pt-12 md:pt-16" containerClassName="max-w-3xl">
        <Button asChild variant="ghost" size="sm" className="mb-8 -ml-3">
          <Link to={routes.engineering} className="inline-flex items-center gap-1.5">
            <icons.arrowRight className="size-4 rotate-180" />
            Back to Engineering
          </Link>
        </Button>

        <p className="font-mono text-xs tracking-wide text-muted-foreground">
          {project.year} · {statusLabel[project.status]}
        </p>

        <h1 className="mt-4 text-4xl font-medium tracking-tight text-balance sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground text-balance">
          {project.summary}
        </p>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>

        <div className="mt-14">
          <MarkdownRenderer content={project.body} />
        </div>
      </Section>
    </>
  );
}

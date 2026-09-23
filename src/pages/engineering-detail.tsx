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
  live: "In production",
  "in-progress": "In Progress",
  pilot: "Pilot",
  archived: "Archived",
  concept: "Concept",
} as const;

export function EngineeringDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? contentService.getProject(slug) : undefined;

  if (!project) {
    return <Navigate to={routes.engineering} replace />;
  }

  const projects = contentService.getProjects();
  const next = projects[(projects.findIndex((p) => p.slug === project.slug) + 1) % projects.length];

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

        {project.facts && project.facts.length > 0 && (
          <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5 border-y border-border/70 py-6 sm:grid-cols-4">
            {project.facts.map((fact) => (
              <div key={fact.label}>
                <dt className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
                  {fact.label}
                </dt>
                <dd className="mt-1.5 text-sm leading-snug text-foreground">{fact.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>

        <div className="mt-14">
          <MarkdownRenderer content={project.body} />
        </div>

        <div className="mt-20 grid gap-4 border-t border-border/70 pt-10 sm:grid-cols-2">
          <Link
            to={routes.engineeringDetail(next.slug)}
            className="group rounded-md border border-border/70 p-5 transition-colors hover:border-primary/60 hover:bg-highlight"
          >
            <p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
              Next project
            </p>
            <p className="mt-2 inline-flex items-center gap-1.5 font-medium tracking-tight transition-colors group-hover:text-primary">
              {next.title}
              <icons.arrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </p>
          </Link>
          <Link
            to={routes.contact}
            className="group rounded-md border border-border/70 p-5 transition-colors hover:border-primary/60 hover:bg-highlight"
          >
            <p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
              Questions about this project?
            </p>
            <p className="mt-2 inline-flex items-center gap-1.5 font-medium tracking-tight transition-colors group-hover:text-primary">
              Get in touch
              <icons.arrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </p>
          </Link>
        </div>
      </Section>
    </>
  );
}

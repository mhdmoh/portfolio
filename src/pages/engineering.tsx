import * as React from "react";
import { motion } from "framer-motion";

import { PageHeader } from "@/components/common/page-header";
import { Seo } from "@/components/common/seo";
import { Section } from "@/components/common/section";
import { ProjectCard } from "@/components/engineering/project-card";
import { routes } from "@/config/routes";
import { staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { Project } from "@/schemas/project";
import { contentService } from "@/services/content";

const projects = contentService.getProjects();

const categories: { value: Project["category"] | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "enterprise", label: "Enterprise" },
  { value: "products", label: "Products" },
  { value: "mobile", label: "Mobile Archive" },
];

export function EngineeringPage() {
  const [category, setCategory] = React.useState<Project["category"] | "all">("all");

  const filtered = category === "all" ? projects : projects.filter((p) => p.category === category);

  return (
    <>
      <Seo
        path={routes.engineering}
        title="Engineering"
        description="Case studies: problem, constraints, trade-offs, and what I'd change."
      />
      <Section className="pt-12 md:pt-16">
        <PageHeader
          eyebrow="Work"
          title="Engineering"
          description="Case studies of production and personal projects."
        />

        <div
          role="tablist"
          aria-label="Filter by category"
          className="mt-12 flex flex-wrap gap-1 border-b border-border/70"
        >
          {categories.map((c) => (
            <button
              key={c.value}
              type="button"
              role="tab"
              aria-selected={category === c.value}
              onClick={() => setCategory(c.value)}
              className={cn(
                "relative px-3 py-3 text-sm transition-colors duration-200",
                category === c.value
                  ? "font-medium text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {c.label}
              <span
                className={cn(
                  "absolute inset-x-3 bottom-0 h-px origin-left bg-primary transition-transform duration-200",
                  category === c.value ? "scale-x-100" : "scale-x-0",
                )}
              />
            </button>
          ))}
        </div>

        <motion.div
          key={category}
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mt-2 divide-y divide-border/70"
        >
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </motion.div>

        {filtered.length === 0 ? (
          <p className="mt-10 text-muted-foreground">No projects in this category yet.</p>
        ) : null}
      </Section>
    </>
  );
}

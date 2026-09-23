import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { HighlightRow } from "@/components/common/highlight-row";
import { routes } from "@/config/routes";
import { slideUp } from "@/lib/animations";
import type { Project } from "@/schemas/project";

const statusLabel: Record<Project["status"], string> = {
  live: "Live",
  "in-progress": "In Progress",
  archived: "Archived",
  concept: "Concept",
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div variants={slideUp}>
      <HighlightRow
        href={routes.engineeringDetail(project.slug)}
        title={project.title}
        description={project.summary}
        meta={`${project.year} · ${statusLabel[project.status]}`}
        tags={project.technologies.slice(0, 4)}
      />
    </motion.div>
  );
}

/** Compact home preview link — same grammar, slightly denser. */
export function ProjectPreview({ project }: { project: Project }) {
  return (
    <Link
      to={routes.engineeringDetail(project.slug)}
      className="group -mx-3 flex items-start justify-between gap-6 rounded-md px-3 py-5 transition-colors duration-200 hover:bg-highlight focus-visible:bg-highlight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
    >
      <div className="min-w-0">
        <p className="font-mono text-xs text-muted-foreground">{project.year}</p>
        <h3 className="mt-1.5 text-xl font-medium tracking-tight transition-colors duration-200 group-hover:text-primary">
          {project.title}
        </h3>
        <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted-foreground">
          {project.summary}
        </p>
      </div>
      <span className="mt-6 shrink-0 text-sm text-muted-foreground transition-colors group-hover:text-primary">
        Case study →
      </span>
    </Link>
  );
}

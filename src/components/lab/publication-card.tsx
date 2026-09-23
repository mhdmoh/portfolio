import { Link } from "react-router-dom";

import { routes } from "@/config/routes";
import { icons } from "@/lib/icons";
import type { Publication } from "@/schemas/publication";

const statusLabel: Record<Publication["status"], string> = {
  published: "Published",
  accepted: "Accepted",
  "under-review": "Under Review",
  "in-progress": "In Progress",
};

export function PublicationCard({ publication }: { publication: Publication }) {
  return (
    <Link
      to={routes.publicationDetail(publication.slug)}
      className="group -mx-3 flex flex-col gap-2 rounded-md px-3 py-5 transition-colors duration-200 hover:bg-highlight focus-visible:bg-highlight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
    >
      <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground">
        <span>{statusLabel[publication.status]}</span>
        <span aria-hidden>·</span>
        <span>{publication.year}</span>
        <span aria-hidden>·</span>
        <span>{publication.venue}</span>
      </div>
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-medium tracking-tight transition-colors duration-200 group-hover:text-primary">
          {publication.title}
        </h3>
        <icons.arrowUpRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
      </div>
      <p className="text-sm text-muted-foreground">{publication.authors.join(", ")}</p>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
        {publication.summary}
      </p>
    </Link>
  );
}

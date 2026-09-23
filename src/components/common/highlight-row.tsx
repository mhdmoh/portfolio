import { Link } from "react-router-dom";

import { Tag } from "@/components/common/tag";
import { icons } from "@/lib/icons";
import { cn } from "@/lib/utils";

interface HighlightRowProps {
  href: string;
  title: string;
  description: string;
  meta?: string;
  tags?: string[];
  external?: boolean;
  className?: string;
}

/**
 * Evidence row — the interaction grammar carried forward from the original
 * portfolio: flat by default, translucent highlight + accent title on hover.
 */
export function HighlightRow({
  href,
  title,
  description,
  meta,
  tags,
  external = false,
  className,
}: HighlightRowProps) {
  const sharedClassName = cn(
    "group -mx-3 flex flex-col gap-3 rounded-md px-3 py-5 transition-colors duration-200",
    "hover:bg-highlight focus-visible:bg-highlight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
    "sm:flex-row sm:items-start sm:gap-8",
    className,
  );

  const body = (
    <>
      {meta ? (
        <p className="w-28 shrink-0 font-mono text-xs text-muted-foreground sm:pt-1.5">
          {meta}
        </p>
      ) : null}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-medium tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary">
            {title}
          </h3>
          <icons.arrowUpRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
        </div>
        <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
        {tags && tags.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        ) : null}
      </div>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={sharedClassName}
      >
        {body}
      </a>
    );
  }

  return (
    <Link to={href} className={sharedClassName}>
      {body}
    </Link>
  );
}

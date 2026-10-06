import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

import { CertificateLightbox } from "@/components/certificates/certificate-lightbox";
import { slideUp, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { Certificate, CertificateCategory } from "@/schemas/certificate";

const filters: { value: CertificateCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "ai-ml", label: "AI & ML" },
  { value: "software", label: "Software Engineering" },
  { value: "data", label: "Data" },
  { value: "languages", label: "Languages" },
];

interface CertificateGalleryProps {
  description?: string;
  certificates: Certificate[];
}

export function CertificateGallery({
  description,
  certificates,
}: CertificateGalleryProps) {
  const reduceMotion = useReducedMotion();
  const [category, setCategory] = React.useState<CertificateCategory | "all">("all");
  const [active, setActive] = React.useState<Certificate | null>(null);

  const filtered =
    category === "all"
      ? certificates
      : certificates.filter((certificate) => certificate.category === category);

  const availableFilters = filters.filter(
    (filter) =>
      filter.value === "all" ||
      certificates.some((certificate) => certificate.category === filter.value),
  );

  return (
    <div>
      {description ? (
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}

      {availableFilters.length > 2 ? (
        <div
          role="tablist"
          aria-label="Filter certificates by category"
          className={cn("flex flex-wrap gap-1 border-b border-border/70", description ? "mt-8" : "mt-0")}
        >
          {availableFilters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              role="tab"
              aria-selected={category === filter.value}
              onClick={() => setCategory(filter.value)}
              className={cn(
                "relative px-3 py-3 text-sm transition-colors duration-200",
                category === filter.value
                  ? "font-medium text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {filter.label}
              <span
                className={cn(
                  "absolute inset-x-3 bottom-0 h-px origin-left bg-primary transition-transform duration-200 motion-reduce:transition-none",
                  category === filter.value ? "scale-x-100" : "scale-x-0",
                )}
              />
            </button>
          ))}
        </div>
      ) : null}

      <motion.ul
        key={category}
        initial={reduceMotion ? false : "hidden"}
        animate="visible"
        variants={reduceMotion ? undefined : staggerContainer}
        className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filtered.map((certificate) => (
          <motion.li
            key={certificate.slug}
            variants={reduceMotion ? undefined : slideUp}
          >
            <button
              type="button"
              onClick={() => setActive(certificate)}
              className={cn(
                "group w-full rounded-md border border-border/70 bg-background text-left transition-colors duration-200",
                "hover:border-primary/50 hover:bg-highlight",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
              )}
            >
              <div className="overflow-hidden rounded-t-md border-b border-border/70 bg-muted/30">
                <img
                  src={certificate.image}
                  alt={certificate.alt}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-contain object-center p-2 transition-opacity duration-200 group-hover:opacity-95"
                />
              </div>
              <div className="px-3.5 py-3.5">
                <h3 className="text-sm font-medium leading-snug tracking-tight transition-colors group-hover:text-primary">
                  {certificate.title}
                </h3>
                <p className="mt-1.5 font-mono text-xs text-muted-foreground">
                  {certificate.provider}
                  {certificate.year ? ` · ${certificate.year}` : ""}
                </p>
              </div>
            </button>
          </motion.li>
        ))}
      </motion.ul>

      {filtered.length === 0 ? (
        <p className="mt-8 text-sm text-muted-foreground">No certificates in this category.</p>
      ) : null}

      <CertificateLightbox
        certificate={active}
        open={active !== null}
        onOpenChange={(open) => {
          if (!open) setActive(null);
        }}
      />
    </div>
  );
}

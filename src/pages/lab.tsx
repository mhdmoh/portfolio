import { motion } from "framer-motion";

import { PageHeader } from "@/components/common/page-header";
import { Seo } from "@/components/common/seo";
import { Section } from "@/components/common/section";
import { PublicationCard } from "@/components/lab/publication-card";
import { Tag } from "@/components/common/tag";
import { routes } from "@/config/routes";
import { slideUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { contentService } from "@/services/content";

const lab = contentService.getLab();
const publications = contentService.getPublications();

export function LabPage() {
  return (
    <>
      <Seo
        path={routes.lab}
        title="Lab"
        description="MSc research and publications, including Social Attraction PSO at ICCCI 2026."
      />

      <Section className="pt-12 md:pt-16">
        <PageHeader
          eyebrow="Research"
          title="Lab"
          description="Research, publications, and ongoing work."
        />
      </Section>

      <Section className="border-t border-border/70 pt-16 md:pt-20">
        <h2 className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">
          Degree
        </h2>
        <div className="mt-6 max-w-2xl">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-2xl font-medium tracking-tight">{lab.thesis.title}</h3>
            <span className="font-mono text-xs text-muted-foreground">{lab.thesis.timeline}</span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{lab.thesis.institution}</p>
          <p className="mt-5 leading-relaxed text-muted-foreground">{lab.thesis.overview}</p>
          <ul className="mt-5 space-y-2">
            {lab.thesis.objectives.map((objective) => (
              <li key={objective} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                <span className="mt-2 size-1 shrink-0 rounded-full bg-primary" />
                {objective}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm leading-relaxed">
            <span className="font-medium text-foreground">Status — </span>
            <span className="text-muted-foreground">{lab.thesis.progress}</span>
          </p>
        </div>
      </Section>

      <Section className="border-t border-border/70">
        <h2 className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">
          Publications
        </h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="mt-4 divide-y divide-border/70"
        >
          {publications.map((publication) => (
            <motion.div key={publication.slug} variants={slideUp}>
              <PublicationCard publication={publication} />
            </motion.div>
          ))}
        </motion.div>
      </Section>

      <Section className="border-t border-border/70">
        <h2 className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">
          Open questions
        </h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {lab.researchInterests.map((interest) => (
            <Tag key={interest.label} className="px-3 py-1.5 text-xs" title={interest.description}>
              {interest.label}
            </Tag>
          ))}
        </div>
      </Section>
    </>
  );
}

import { motion } from "framer-motion";

import { PageHeader } from "@/components/common/page-header";
import { Seo } from "@/components/common/seo";
import { Section } from "@/components/common/section";
import { PublicationCard } from "@/components/lab/publication-card";
import { Tag } from "@/components/common/tag";
import { routes } from "@/config/routes";
import { slideUp, staggerContainer } from "@/lib/animations";
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
          Thesis
        </h2>
        <div className="mt-6 max-w-2xl">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-2xl font-medium tracking-tight">{lab.thesis.title}</h3>
            <span className="font-mono text-xs text-muted-foreground">
              {lab.thesis.status ?? "In Progress"}
            </span>
          </div>
          {lab.thesis.focus ? (
            <p className="mt-3 text-base leading-relaxed text-foreground">
              {lab.thesis.focus}
            </p>
          ) : null}
          <p className="mt-2 text-sm text-muted-foreground">{lab.thesis.institution}</p>
          <p className="mt-1 font-mono text-xs text-muted-foreground">{lab.thesis.timeline}</p>
          <p className="mt-5 leading-relaxed text-muted-foreground">{lab.thesis.overview}</p>

          <div className="mt-8 space-y-6 border-t border-border/70 pt-6">
            <div>
              <h4 className="font-mono text-xs tracking-[0.12em] text-muted-foreground uppercase">
                Research objectives
              </h4>
              <ul className="mt-3 space-y-2">
                {lab.thesis.objectives.map((objective) => (
                  <li
                    key={objective}
                    className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-primary" />
                    {objective}
                  </li>
                ))}
              </ul>
            </div>

            {lab.thesis.currentDirection ? (
              <div>
                <h4 className="font-mono text-xs tracking-[0.12em] text-muted-foreground uppercase">
                  Current direction
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {lab.thesis.currentDirection}
                </p>
              </div>
            ) : null}

            <div>
              <h4 className="font-mono text-xs tracking-[0.12em] text-muted-foreground uppercase">
                Status
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {lab.thesis.progress}
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section className="border-t border-border/70">
        <h2 className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">
          Publications
        </h2>
        <motion.div
          initial={false}
          animate="visible"
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
        <div className="mt-6 flex flex-wrap gap-x-2 gap-y-6">
          {lab.researchInterests.map((interest) => (
            <div key={interest.label} className="w-full sm:w-[calc(50%-0.25rem)]">
              <Tag className="px-3 py-1.5 text-xs">{interest.label}</Tag>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {interest.description}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

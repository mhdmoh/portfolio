import { motion } from "framer-motion";

import { PageHeader } from "@/components/common/page-header";
import { Seo } from "@/components/common/seo";
import { Section } from "@/components/common/section";
import { routes } from "@/config/routes";
import { icons } from "@/lib/icons";
import { slideUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { contentService } from "@/services/content";

const about = contentService.getAbout();

export function AboutPage() {
  return (
    <>
      <Seo
        path={routes.about}
        title="About"
        description="How I think about software, AI, and research."
      />

      <Section className="pt-12 md:pt-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_280px] lg:gap-16">
          <div>
            <PageHeader eyebrow="About" title="About" />
            <div className="mt-8 max-w-xl space-y-5">
              {about.biography.map((paragraph) => (
                <p key={paragraph} className="leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <div className="relative aspect-square w-full max-w-xs overflow-hidden rounded-md bg-muted lg:max-w-none">
            <img
              src={about.portrait}
              alt="Portrait of Mohamad Mohamad"
              className="size-full object-cover object-top"
              width={900}
              height={900}
              loading="lazy"
            />
          </div>
        </div>
      </Section>

      <Section className="border-t border-border/70">
        <h2 className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">
          Outside work
        </h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {about.interests.map((interest) => (
            <motion.div key={interest.label} variants={slideUp}>
              <h3 className="font-medium tracking-tight">{interest.label}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {interest.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {about.openSource.length > 0 ? (
        <Section className="border-t border-border/70">
          <h2 className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">
            Open Source
          </h2>
          <div className="mt-4 divide-y divide-border/70">
            {about.openSource.map((project) => (
              <a
                key={project.href}
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="group -mx-3 flex items-start justify-between gap-4 rounded-md px-3 py-5 transition-colors duration-200 hover:bg-highlight"
              >
                <div>
                  <h3 className="font-medium tracking-tight transition-colors group-hover:text-primary">
                    {project.name}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                </div>
                <icons.arrowUpRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
              </a>
            ))}
          </div>
        </Section>
      ) : null}
    </>
  );
}

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { Seo } from "@/components/common/seo";
import { Section } from "@/components/common/section";
import { SectionHeader } from "@/components/common/section-header";
import { ProjectPreview } from "@/components/engineering/project-card";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { fadeIn, slideFromLeft, slideUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { icons } from "@/lib/icons";
import { contentService } from "@/services/content";

const hero = contentService.getHero();
const featuredProjects = contentService.getFeaturedProjects();
const principles = contentService.getPrinciples();
const timeline = contentService.getTimeline();
const site = contentService.getSite();
const contact = contentService.getContact();
const publication = contentService.getPublication("social-attraction-pso");

export function HomePage() {
  return (
    <>
      <Seo
        path={routes.home}
        title={site.name}
        description={site.description}
        type="profile"
      />

      <Section className="pt-16 pb-24 md:pt-24 md:pb-32">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-3xl"
        >
          <motion.p
            variants={fadeIn}
            className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase"
          >
            {hero.title}
          </motion.p>
          <motion.h1
            variants={slideFromLeft}
            className="mt-5 text-5xl font-medium tracking-tight text-balance sm:text-6xl md:text-7xl lg:text-[5.25rem] lg:leading-[1.05]"
          >
            {hero.name}
          </motion.h1>
          <motion.p
            variants={slideFromLeft}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground text-balance md:text-xl"
          >
            {hero.description}
          </motion.p>
          <motion.p
            variants={fadeIn}
            className="mt-4 font-mono text-sm text-muted-foreground"
          >
            {site.currentRole.title} · {site.currentRole.company} · Budapest
          </motion.p>
          <motion.div variants={slideFromLeft} className="mt-10 flex flex-wrap gap-3">
            {hero.buttons.map((button) => {
              const isExternal =
                button.href.startsWith("http") || button.href.endsWith(".pdf");
              const variant = button.variant === "primary" ? "default" : "outline";

              if (isExternal) {
                return (
                  <Button key={button.href} asChild size="lg" variant={variant}>
                    <a href={button.href} download={button.href.endsWith(".pdf")}>
                      {button.label}
                    </a>
                  </Button>
                );
              }

              return (
                <Button key={button.href} asChild size="lg" variant={variant}>
                  <Link to={button.href}>{button.label}</Link>
                </Button>
              );
            })}
          </motion.div>
        </motion.div>
      </Section>

      <Section className="border-t border-border/70">
        <SectionHeader
          eyebrow="Work"
          title="Engineering"
          description="Production systems — optimization, retrieval, ranking. The interesting part is usually the constraints."
        />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="mt-12 divide-y divide-border/70 border-y border-border/70"
        >
          {featuredProjects.map((project) => (
            <motion.div key={project.slug} variants={slideUp}>
              <ProjectPreview project={project} />
            </motion.div>
          ))}
        </motion.div>
        <div className="mt-8">
          <Button asChild variant="ghost" className="-ml-3">
            <Link to={routes.engineering} className="inline-flex items-center gap-1.5">
              All engineering
              <icons.arrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </Section>

      {publication ? (
        <Section className="border-t border-border/70">
          <SectionHeader
            eyebrow="Research"
            title="Publication"
            description="Peer-reviewed work alongside industry engineering."
          />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={slideUp}
            className="mt-10"
          >
            <Link
              to={routes.publicationDetail(publication.slug)}
              className="group -mx-3 flex flex-col gap-3 rounded-md px-3 py-6 transition-colors hover:bg-highlight sm:flex-row sm:items-start sm:justify-between sm:gap-10"
            >
              <div className="min-w-0 max-w-2xl">
                <p className="font-mono text-xs text-muted-foreground">
                  ICCCI 2026 · Springer CCIS 3044 · {publication.year}
                </p>
                <h3 className="mt-2 text-xl font-medium tracking-tight transition-colors group-hover:text-primary sm:text-2xl">
                  {publication.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {publication.summary}
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  {publication.authors.join(", ")}
                </p>
              </div>
              <span className="shrink-0 text-sm text-muted-foreground transition-colors group-hover:text-primary sm:pt-8">
                Read →
              </span>
            </Link>
            {publication.link ? (
              <a
                href={publication.link}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 px-3 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Springer
                <icons.arrowUpRight className="size-3.5" />
              </a>
            ) : null}
          </motion.div>
        </Section>
      ) : null}

      <Section className="border-t border-border/70">
        <SectionHeader
          eyebrow="Practice"
          title="Engineering principles"
          description="How I actually decide when something has to ship."
        />
        <motion.ol
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {principles.map((principle, index) => (
            <motion.li key={principle.title} variants={slideUp}>
              <p className="font-mono text-xs text-primary">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-base font-medium tracking-tight">{principle.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {principle.description}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </Section>

      <Section className="border-t border-border/70">
        <SectionHeader eyebrow="Path" title="How I got here" />
        <motion.ol
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="relative mt-12 max-w-2xl"
        >
          <div
            aria-hidden
            className="absolute top-2 bottom-2 left-[5px] w-px bg-border"
          />
          {timeline.map((event, index) => (
            <motion.li
              key={event.label}
              variants={slideUp}
              className="relative grid gap-1 py-5 pl-10 sm:grid-cols-[120px_1fr] sm:gap-6"
            >
              <span className="absolute top-7 left-0 size-2.5 rounded-full border-2 border-primary bg-background" />
              <p className="font-mono text-xs text-muted-foreground sm:pt-1">
                {String(index + 1).padStart(2, "0")} · {event.years}
              </p>
              <div>
                <p className="font-medium tracking-tight">{event.label}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {event.description}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </Section>

      <Section className="border-t border-border/70">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <div className="max-w-lg">
            <h2 className="text-3xl font-medium tracking-tight text-balance sm:text-4xl">
              {contact.heading}
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">{contact.description}</p>
          </div>
          <Button asChild size="lg">
            <Link to={routes.contact} className="inline-flex items-center gap-2">
              Contact
              <icons.arrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </Section>
    </>
  );
}

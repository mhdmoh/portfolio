import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { Seo } from "@/components/common/seo";
import { Section } from "@/components/common/section";
import { SectionHeader } from "@/components/common/section-header";
import { ProjectPreview } from "@/components/engineering/project-card";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { fadeIn, slideFromLeft, slideUp, staggerContainer } from "@/lib/animations";
import { icons } from "@/lib/icons";
import { contentService } from "@/services/content";

const hero = contentService.getHero();
const featuredProjects = contentService.getFeaturedProjects();
const principles = contentService.getPrinciples();
const site = contentService.getSite();
const contact = contentService.getContact();
const publication = contentService.getPublication("social-attraction-pso");

export function HomePage() {
  const proofLine = hero.proof?.length
    ? hero.proof.join(" · ")
    : `${site.experience} · ${site.currentRole.company} · Budapest`;

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
            className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground text-balance md:text-xl"
          >
            {hero.description}
          </motion.p>
          <motion.p
            variants={fadeIn}
            className="mt-5 max-w-2xl font-mono text-xs leading-relaxed text-muted-foreground sm:text-sm"
          >
            {proofLine}
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
          eyebrow="Selected Work"
          title="Engineering"
          description="Production AI and optimization work: retrieval, ranking, scheduling, and automation."
        />
        <motion.div
          initial={false}
          animate="visible"
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
            description="Peer-reviewed research from my MSc at ELTE."
          />
          <motion.div
            initial={false}
            animate="visible"
            variants={slideUp}
            className="mt-10 rounded-md border border-border/70 px-5 py-6 sm:px-6 sm:py-8"
          >
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-muted-foreground">
              <span className="text-primary">Published</span>
              <span aria-hidden>·</span>
              <span>ICCCI 2026</span>
              <span aria-hidden>·</span>
              <span>Springer CCIS 3044</span>
              <span aria-hidden>·</span>
              <span>{publication.year}</span>
            </div>
            <Link
              to={routes.publicationDetail(publication.slug)}
              className="group mt-3 block"
            >
              <h3 className="text-xl font-medium tracking-tight transition-colors group-hover:text-primary sm:text-2xl">
                {publication.title}
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {publication.summary}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                {publication.authors.join(", ")}
              </p>
            </Link>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-border/70 pt-4">
              <Link
                to={routes.publicationDetail(publication.slug)}
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Case study
                <icons.arrowRight className="size-3.5" />
              </Link>
              {publication.link ? (
                <a
                  href={publication.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Springer
                  <icons.arrowUpRight className="size-3.5" />
                </a>
              ) : null}
              {publication.doi ? (
                <a
                  href={`https://doi.org/${publication.doi}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  DOI
                  <icons.arrowUpRight className="size-3.5" />
                </a>
              ) : null}
            </div>
          </motion.div>
        </Section>
      ) : null}

      <Section className="border-t border-border/70">
        <SectionHeader
          eyebrow="Practice"
          title="How I Engineer"
          description="The rules I follow when building something for production."
        />
        <motion.ol
          initial={false}
          animate="visible"
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

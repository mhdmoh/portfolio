import { motion } from "framer-motion";

import { PageHeader } from "@/components/common/page-header";
import { Seo } from "@/components/common/seo";
import { Section } from "@/components/common/section";
import { Tag } from "@/components/common/tag";
import { routes } from "@/config/routes";
import { slideUp, staggerContainer } from "@/lib/animations";
import { contentService } from "@/services/content";

const experience = contentService.getExperience();
const skills = contentService.getSkills();

export function ExperiencePage() {
  return (
    <>
      <Seo
        path={routes.experience}
        title="Experience"
        description="My roles so far, and what each one taught me."
      />

      <Section className="pt-12 md:pt-16">
        <PageHeader
          eyebrow="Work"
          title="Experience"
          description="What I built in each role and what I learned."
        />

        <motion.div
          initial={false}
          animate="visible"
          variants={staggerContainer}
          className="mt-16 space-y-0"
        >
          {experience.map((entry) => (
            <motion.article
              key={`${entry.company}-${entry.start}`}
              variants={slideUp}
              className="grid gap-4 border-t border-border/70 py-10 first:border-t-0 first:pt-0 sm:grid-cols-[180px_1fr] sm:gap-10"
            >
              <div>
                <p className="font-mono text-sm text-muted-foreground">
                  {entry.start} — {entry.end}
                </p>
                {entry.location ? (
                  <p className="mt-1 text-sm text-muted-foreground">{entry.location}</p>
                ) : null}
              </div>

              <div>
                <h2 className="text-xl font-medium tracking-tight">{entry.role}</h2>
                <p className="mt-0.5 text-muted-foreground">{entry.company}</p>
                <p className="mt-4 leading-relaxed text-foreground">{entry.mission}</p>

                <ul className="mt-5 space-y-2">
                  {entry.responsibilities.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>

                <p className="mt-5 text-sm leading-relaxed">
                  <span className="font-medium text-foreground">What changed — </span>
                  <span className="text-muted-foreground">{entry.growth}</span>
                </p>

                <ul className="mt-4 space-y-1.5">
                  {entry.lessons.map((lesson) => (
                    <li key={lesson} className="text-sm leading-relaxed text-muted-foreground italic">
                      “{lesson}”
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </Section>

      <Section className="border-t border-border/70">
        <h2 className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">
          Skills
        </h2>
        <dl className="mt-8 space-y-6">
          {skills.map((group) => (
            <div key={group.label} className="grid gap-3 sm:grid-cols-[200px_1fr] sm:gap-6">
              <dt className="text-sm font-medium tracking-tight sm:pt-1">{group.label}</dt>
              <dd className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </Section>
    </>
  );
}

import { Tag } from "@/components/common/tag";
import type { Experiment } from "@/schemas/lab";

export function ExperimentCard({ experiment }: { experiment: Experiment }) {
  return (
    <article className="-mx-3 rounded-md px-3 py-5">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-lg font-medium tracking-tight">{experiment.title}</h3>
        <span className="font-mono text-xs text-muted-foreground">{experiment.year}</span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {experiment.description}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {experiment.technologies.map((tech) => (
          <Tag key={tech}>{tech}</Tag>
        ))}
      </div>
    </article>
  );
}

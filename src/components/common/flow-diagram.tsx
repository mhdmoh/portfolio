import { Fragment } from "react";

import { icons } from "@/lib/icons";

/**
 * Horizontal pipeline diagram for case studies. Written in Markdown as a
 * ```flow block, one step per line; "Step: note" adds a smaller note.
 */
export function FlowDiagram({ source }: { source: string }) {
  const steps = source
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const i = line.indexOf(": ");
      return i === -1
        ? { title: line, note: undefined }
        : { title: line.slice(0, i), note: line.slice(i + 2) };
    });

  return (
    <ol className="not-prose my-8 flex flex-wrap items-center gap-x-2 gap-y-3">
      {steps.map((step, index) => (
        <Fragment key={step.title}>
          {index > 0 && (
            <icons.arrowRight aria-hidden className="size-4 shrink-0 text-muted-foreground/70" />
          )}
          <li className="rounded-md border border-border/70 bg-muted/40 px-3 py-2">
            <span className="block text-sm leading-snug text-foreground">{step.title}</span>
            {step.note && (
              <span className="mt-0.5 block font-mono text-[11px] leading-snug text-muted-foreground">
                {step.note}
              </span>
            )}
          </li>
        </Fragment>
      ))}
    </ol>
  );
}

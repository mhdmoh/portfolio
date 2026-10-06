import { cn } from "@/lib/utils";

/**
 * Two-column before/after comparison for case studies.
 * Written in Markdown as a ```compare block:
 *
 * BEFORE
 * line
 * ---
 * AFTER
 * line
 */
export function CompareBlock({ source }: { source: string }) {
  const parts = source
    .split(/\n---\n/)
    .map((part) => part.trim())
    .filter(Boolean);

  const columns = parts.map((part) => {
    const lines = part.split("\n").map((l) => l.trim()).filter(Boolean);
    return { label: lines[0] ?? "", items: lines.slice(1) };
  });

  if (columns.length === 0) return null;

  return (
    <div
      className={cn(
        "not-prose my-8 grid gap-4",
        columns.length > 1 ? "sm:grid-cols-2" : "grid-cols-1",
      )}
    >
      {columns.map((column) => (
        <div
          key={column.label}
          className="rounded-md border border-border/70 bg-muted/30 px-4 py-4"
        >
          <p className="font-mono text-xs tracking-[0.12em] text-muted-foreground uppercase">
            {column.label}
          </p>
          <ul className="mt-3 space-y-2">
            {column.items.map((item) => (
              <li key={item} className="text-sm leading-snug text-foreground">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

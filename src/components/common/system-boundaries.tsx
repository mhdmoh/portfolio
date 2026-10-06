/**
 * System-boundary lanes for case studies (AI / integrations / human).
 * Written in Markdown as a ```boundaries block:
 *
 * AI
 * classification
 * ---
 * Human
 * review
 */
export function SystemBoundaries({ source }: { source: string }) {
  const parts = source
    .split(/\n---\n/)
    .map((part) => part.trim())
    .filter(Boolean);

  const lanes = parts.map((part) => {
    const lines = part.split("\n").map((l) => l.trim()).filter(Boolean);
    return { label: lines[0] ?? "", items: lines.slice(1) };
  });

  if (lanes.length === 0) return null;

  return (
    <div className="not-prose my-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {lanes.map((lane) => (
        <div
          key={lane.label}
          className="rounded-md border border-border/70 px-4 py-4"
        >
          <p className="font-mono text-xs tracking-[0.12em] text-primary uppercase">
            {lane.label}
          </p>
          <ul className="mt-3 space-y-1.5">
            {lane.items.map((item) => (
              <li key={item} className="text-sm leading-snug text-muted-foreground">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

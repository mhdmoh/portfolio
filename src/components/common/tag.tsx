import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Skill / topic chip — accent outline + translucent fill, carried from the
 * original portfolio's green pill language into the evolved system.
 */
export function Tag({
  children,
  className,
  title,
}: {
  children: ReactNode;
  className?: string;
  title?: string;
}) {
  return (
    <span
      title={title}
      className={cn(
        "inline-flex items-center rounded-full border border-primary/35 bg-primary/10 px-2.5 py-0.5 font-mono text-[11px] text-primary",
        className,
      )}
    >
      {children}
    </span>
  );
}

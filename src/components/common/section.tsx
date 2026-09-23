import * as React from "react";

import { cn } from "@/lib/utils";

interface SectionProps extends React.ComponentProps<"section"> {
  containerClassName?: string;
}

export function Section({ className, containerClassName, children, ...props }: SectionProps) {
  return (
    <section className={cn("py-20 md:py-28", className)} {...props}>
      <div className={cn("mx-auto w-full max-w-6xl px-6", containerClassName)}>{children}</div>
    </section>
  );
}

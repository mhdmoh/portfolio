import { motion } from "framer-motion";

import { slideUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  as = "h2",
}: SectionHeaderProps) {
  const Heading = as;

  return (
    <motion.div
      initial={false}
      animate="visible"
      variants={slideUp}
      className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}
    >
      {eyebrow ? (
        <p className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">
          {eyebrow}
        </p>
      ) : null}
      <Heading className="mt-3 text-3xl font-medium tracking-tight text-balance sm:text-4xl">
        {title}
      </Heading>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground text-balance sm:text-lg">
          {description}
        </p>
      ) : null}
    </motion.div>
  );
}

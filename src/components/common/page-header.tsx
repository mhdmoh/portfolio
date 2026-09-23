import { motion } from "framer-motion";

import { fadeIn, slideUp, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}

export function PageHeader({ eyebrow, title, description, className }: PageHeaderProps) {
  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className={cn("max-w-2xl", className)}
    >
      {eyebrow ? (
        <motion.p
          variants={fadeIn}
          className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase"
        >
          {eyebrow}
        </motion.p>
      ) : null}
      <motion.h1
        variants={slideUp}
        className="mt-3 text-4xl font-medium tracking-tight text-balance sm:text-5xl md:text-[3.25rem]"
      >
        {title}
      </motion.h1>
      {description ? (
        <motion.p
          variants={slideUp}
          className="mt-5 text-lg leading-relaxed text-muted-foreground text-balance"
        >
          {description}
        </motion.p>
      ) : null}
    </motion.header>
  );
}

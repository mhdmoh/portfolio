import {
  ArrowRight,
  ArrowUpRight,
  AtSign,
  Code2,
  Compass,
  FileText,
  FlaskConical,
  Hammer,
  Link2,
  Mail,
  Menu,
  Moon,
  Sun,
  X,
  type LucideIcon,
} from "lucide-react";

/**
 * Centralized icon registry. Components should reference icons by name
 * from this registry instead of importing lucide-react directly, so the
 * icon library can be swapped in one place if it ever needs to change.
 *
 * Note: lucide-react no longer ships trademarked brand logos (GitHub,
 * LinkedIn, X/Twitter), so social links use neutral, generic glyphs
 * paired with text labels instead of brand marks.
 */
export const icons = {
  github: Code2,
  linkedin: Link2,
  email: Mail,
  resume: FileText,
  twitter: AtSign,
  arrowRight: ArrowRight,
  arrowUpRight: ArrowUpRight,
  menu: Menu,
  close: X,
  sun: Sun,
  moon: Moon,
  compass: Compass,
  flask: FlaskConical,
  build: Hammer,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;

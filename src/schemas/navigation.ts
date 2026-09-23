import { z } from "zod";

export const navItemSchema = z.object({
  label: z.string(),
  href: z.string(),
});

export const navigationSchema = z.object({
  primary: z.array(navItemSchema),
  mobile: z.array(navItemSchema),
  cta: navItemSchema,
});

export type NavItem = z.infer<typeof navItemSchema>;
export type Navigation = z.infer<typeof navigationSchema>;

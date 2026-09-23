import { z } from "zod";

export const siteSchema = z.object({
  name: z.string(),
  role: z.string(),
  mission: z.string(),
  description: z.string(),
  url: z.string(),
  locale: z.string(),
  currentRole: z.object({
    title: z.string(),
    company: z.string(),
  }),
  currentFocus: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
      href: z.string().optional(),
    }),
  ),
});

export type Site = z.infer<typeof siteSchema>;

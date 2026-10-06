import { z } from "zod";

export const siteSchema = z.object({
  name: z.string(),
  role: z.string(),
  /** ISO date (YYYY-MM-DD) when professional experience started. */
  careerStart: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  /** Text after "{n}+ years ", e.g. "building production software". */
  experiencePhrase: z.string(),
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

export type SiteContent = z.infer<typeof siteSchema>;

/** Site content plus the computed experience display string. */
export type Site = SiteContent & {
  experience: string;
};

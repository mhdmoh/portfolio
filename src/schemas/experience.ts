import { z } from "zod";

export const experienceEntrySchema = z.object({
  company: z.string(),
  role: z.string(),
  location: z.string().optional(),
  start: z.string(),
  end: z.string(),
  mission: z.string(),
  responsibilities: z.array(z.string()),
  growth: z.string(),
  lessons: z.array(z.string()),
});

export const experienceSchema = z.array(experienceEntrySchema);

export type ExperienceEntry = z.infer<typeof experienceEntrySchema>;

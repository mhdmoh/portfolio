import { z } from "zod";

export const experimentSchema = z.object({
  title: z.string(),
  description: z.string(),
  technologies: z.array(z.string()),
  link: z.string().optional(),
  year: z.string(),
});

export const researchNoteSchema = z.object({
  title: z.string(),
  date: z.string(),
  summary: z.string(),
});

export const thesisSchema = z.object({
  title: z.string(),
  institution: z.string(),
  overview: z.string(),
  objectives: z.array(z.string()),
  timeline: z.string(),
  progress: z.string(),
});

export const researchInterestSchema = z.object({
  label: z.string(),
  description: z.string(),
});

export const labSchema = z.object({
  thesis: thesisSchema,
  experiments: z.array(experimentSchema),
  researchNotes: z.array(researchNoteSchema),
  researchInterests: z.array(researchInterestSchema),
});

export type Experiment = z.infer<typeof experimentSchema>;
export type ResearchNote = z.infer<typeof researchNoteSchema>;
export type Thesis = z.infer<typeof thesisSchema>;
export type ResearchInterest = z.infer<typeof researchInterestSchema>;
export type Lab = z.infer<typeof labSchema>;

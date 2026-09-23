import { z } from "zod";

export const contactSchema = z.object({
  heading: z.string(),
  description: z.string(),
  email: z.string(),
  resumeHref: z.string(),
});

export type Contact = z.infer<typeof contactSchema>;

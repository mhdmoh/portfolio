import { z } from "zod";

export const publicationStatusSchema = z.enum([
  "published",
  "accepted",
  "under-review",
  "in-progress",
]);

export const publicationFrontmatterSchema = z.object({
  title: z.string(),
  slug: z.string(),
  authors: z.array(z.string()),
  venue: z.string(),
  year: z.string(),
  status: publicationStatusSchema,
  doi: z.string().optional(),
  link: z.string().optional(),
  summary: z.string(),
});

export const publicationSchema = publicationFrontmatterSchema.extend({
  body: z.string(),
});

export type PublicationStatus = z.infer<typeof publicationStatusSchema>;
export type Publication = z.infer<typeof publicationSchema>;

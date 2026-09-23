import { z } from "zod";

export const projectCategorySchema = z.enum([
  "enterprise",
  "products",
  "research",
  "mobile",
]);

export const projectStatusSchema = z.enum([
  "live",
  "in-progress",
  "pilot",
  "archived",
  "concept",
]);

export const projectFrontmatterSchema = z.object({
  title: z.string(),
  slug: z.string(),
  category: projectCategorySchema,
  year: z.string(),
  status: projectStatusSchema,
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  technologies: z.array(z.string()),
  summary: z.string(),
  cover: z.string().optional(),
  /** Key facts shown under the title, e.g. Role, Timeline, Users. */
  facts: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
  order: z.number().default(0),
});

export const projectSchema = projectFrontmatterSchema.extend({
  body: z.string(),
});

export type ProjectCategory = z.infer<typeof projectCategorySchema>;
export type ProjectStatus = z.infer<typeof projectStatusSchema>;
export type Project = z.infer<typeof projectSchema>;

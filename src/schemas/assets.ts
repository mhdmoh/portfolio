import { z } from "zod";

export const assetsSchema = z.object({
  profilePhoto: z.string(),
  aboutPhoto: z.string(),
  logo: z.string(),
  resume: z.string(),
  ogImage: z.string(),
  projectImages: z.record(z.string(), z.string()),
});

export type Assets = z.infer<typeof assetsSchema>;

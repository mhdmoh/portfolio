import { z } from "zod";

export const heroButtonSchema = z.object({
  label: z.string(),
  href: z.string(),
  variant: z.enum(["primary", "secondary"]),
});

export const heroSchema = z.object({
  name: z.string(),
  title: z.string(),
  description: z.string(),
  /** Compact credibility line under the hero description. */
  proof: z.array(z.string()).optional(),
  portrait: z.string(),
  buttons: z.array(heroButtonSchema),
});

export type HeroButton = z.infer<typeof heroButtonSchema>;
export type Hero = z.infer<typeof heroSchema>;

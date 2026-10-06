import { z } from "zod";

export const aboutSchema = z.object({
  biography: z.array(z.string()),
  portrait: z.string(),
  interests: z.array(
    z.object({
      label: z.string(),
      description: z.string(),
    }),
  ),
  continuousLearning: z
    .array(
      z.object({
        label: z.string(),
        description: z.string(),
      }),
    )
    .optional(),
  openSource: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      href: z.string(),
    }),
  ),
});

export type About = z.infer<typeof aboutSchema>;

import { z } from "zod";

export const principleSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export const principlesSchema = z.array(principleSchema);

export type Principle = z.infer<typeof principleSchema>;

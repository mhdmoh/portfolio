import { z } from "zod";

export const skillGroupSchema = z.object({
  label: z.string(),
  items: z.array(z.string()),
});

export const skillsSchema = z.array(skillGroupSchema);

export type SkillGroup = z.infer<typeof skillGroupSchema>;

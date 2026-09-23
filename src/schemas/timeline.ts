import { z } from "zod";

export const timelineEventSchema = z.object({
  label: z.string(),
  years: z.string(),
  description: z.string(),
});

export const timelineSchema = z.array(timelineEventSchema);

export type TimelineEvent = z.infer<typeof timelineEventSchema>;

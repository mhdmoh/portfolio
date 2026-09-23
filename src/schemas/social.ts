import { z } from "zod";

export const socialLinkSchema = z.object({
  label: z.string(),
  href: z.string(),
  icon: z.enum(["github", "linkedin", "email", "resume", "twitter"]),
});

export const socialSchema = z.array(socialLinkSchema);

export type SocialLink = z.infer<typeof socialLinkSchema>;

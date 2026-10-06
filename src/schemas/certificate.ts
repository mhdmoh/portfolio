import { z } from "zod";

export const certificateCategorySchema = z.enum([
  "ai-ml",
  "software",
  "data",
  "languages",
]);

export const certificateSchema = z.object({
  slug: z.string(),
  title: z.string(),
  provider: z.string(),
  /** Completion year when clearly visible on the certificate. */
  year: z.string().optional(),
  category: certificateCategorySchema,
  image: z.string(),
  alt: z.string(),
  order: z.number().default(0),
});

export const certificatesContentSchema = z.object({
  description: z.string(),
  items: z.array(certificateSchema),
});

export type CertificateCategory = z.infer<typeof certificateCategorySchema>;
export type Certificate = z.infer<typeof certificateSchema>;
export type CertificatesContent = z.infer<typeof certificatesContentSchema>;

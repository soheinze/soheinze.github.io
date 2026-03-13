import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 1. Deine bestehende Blog-Collection
const blogCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    lang: z.enum(['de', 'en', 'fr']).optional().default('de'),
    draft: z.boolean().default(false),
  }),
});

// 2. NEU: Unsere Lebenslauf-Collection
const lebenslaufCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/lebenslauf" }),
  schema: z.object({
    title: z.string(), // z.B. "M.Sc. Digital Humanities"
    year: z.number(),  // z.B. 2023
    startDate: z.string().optional(), // z.B. "10.2019"
    endDate: z.string().optional(),   // z.B. "03.2023"
    order: z.number(), // Um die Einträge chronologisch zu sortieren (z.B. 1, 2, 3...)
  }),
});

export const collections = {
  'blog': blogCollection,
  'lebenslauf': lebenslaufCollection, // Hier melden wir sie an
};
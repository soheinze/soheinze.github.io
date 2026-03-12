import { defineCollection, z } from 'astro:content';
// 1. IMPORTIERE DEN NEUEN GLOB-LOADER
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
  // 2. ERSETZE 'type: content' DURCH DEN LOADER
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

export const collections = {
  'blog': blogCollection,
};
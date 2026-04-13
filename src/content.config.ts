import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const pinsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pins" }),
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    date: z.date(),
  }),
});

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
    tags: z.array(z.string()).optional(),
  }),
});

const lebenslaufCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/lebenslauf" }),
  schema: z.object({
    title: z.string(),
    startDate: z.string(),
    endDate: z.string().optional(),
    role: z.string().optional(),
    yearRange: z.string().optional(),
    order: z.number().optional(),
    year: z.union([z.number(), z.string()]).optional(),
  }),
});

const legalCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/legal" }),
  schema: z.object({
    title: z.string(),
  }),
});

const homeCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/home" }),
  schema: z.object({
    title: z.string(),
  }),
});

const aboutCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/about" }),
  schema: z.object({
    title: z.string(),
  }),
});

const linksCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/links" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    color: z.string().optional(),
  }),
});

export const collections = {
  'pins': pinsCollection,
  'blog': blogCollection,
  'lebenslauf': lebenslaufCollection,
  'legal': legalCollection,
  'links': linksCollection,
  'home': homeCollection,
  'about': aboutCollection,
};

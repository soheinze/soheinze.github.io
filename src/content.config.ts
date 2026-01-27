import { defineCollection, z } from 'astro:content';

// Wir definieren das Schema für die 'blog' Collection.
// z steht für "Zod", eine Bibliothek zur Validierung.
const blogCollection = defineCollection({
  type: 'content', // Es handelt sich um Markdown-Inhalte (Text)
  schema: z.object({
    // Titel ist Pflicht und muss Text sein
    title: z.string(),

    // Datum ist Pflicht. Zod versucht, Strings wie "2024-01-01" in ein Datum umzuwandeln
    pubDate: z.coerce.date(),

    // Beschreibung ist Pflicht (wichtig für SEO und Vorschau)
    description: z.string(),

    // Tags sind optional, aber wenn vorhanden, muss es eine Liste von Texten sein
    // Beispiel in YAML: tags: ["coding", "life"]
    tags: z.array(z.string()).default([]),

    // Optional: Ein Bild für den Post
    image: z.string().optional(),

    // Optional: Entwurfs-Status. Wenn true, können wir den Post später ausblenden
    draft: z.boolean().default(false),
  }),
});

// WICHTIG: Die Collection exportieren, damit Astro sie kennt
export const collections = {
  'blog': blogCollection,
};

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    category: z.enum(['Hype vs. Reality', 'Everyday Curiosities', 'Craft & Design', 'Hidden Gems']),
    author: z.string().default('Is It Special Staff'),
    authorRole: z.string().default('Senior Product Critic'),
    specialScore: z.number().min(1).max(10),
    specialVerdict: z.enum(['Overhyped', 'Solid Standard', 'True Gem', 'Modern Masterpiece']),
    readingTime: z.string().default('6 min read'),
    featured: z.boolean().default(false),
  }),
});

export const collections = { blog };

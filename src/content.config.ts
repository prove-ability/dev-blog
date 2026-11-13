import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
const posts = defineCollection({loader: glob({pattern: '**/*.md', base: './src/content/posts'}), schema: z.object({title:z.string(),description:z.string(),postId:z.string().regex(/^[a-z0-9-]+$/),date:z.coerce.date(),status:z.enum(['draft','published']).default('draft'),tags:z.array(z.string()).default([])})});
export const collections = {posts};

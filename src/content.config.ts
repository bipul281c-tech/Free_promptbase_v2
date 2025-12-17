import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Category field - required for all blog posts
			category: z.enum([
				'writing-copy',
				'coding',
				'image-generation',
				'productivity',
				'marketing',
				'business',
				'education',
				'entertainment'
			]),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
			prompt: z.string().optional(),
			model: z.string().optional(),
			author: z.string().optional(),
			tags: z.array(z.string()).optional(),
			tips: z.array(z.string()).optional(),
			username: z.string().optional(),
			faq: z.array(z.object({
				question: z.string(),
				answer: z.string(),
			})).optional(),
		}),
});

export const collections = { blog };

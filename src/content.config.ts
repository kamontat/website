// ref: https://docs.astro.build/en/guides/content-collections/

import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
	loader: glob({ base: "./src/contents/posts", pattern: "**/[^_]*.mdoc" }),
	schema: z.object({
		slug: z.string(),
		title: z.string(),
		pubDate: z.coerce.date(),
		modDate: z.coerce.date().optional(),
	}),
});

export { posts };

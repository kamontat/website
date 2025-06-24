// ref: https://docs.astro.build/en/guides/content-collections/

import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
	loader: glob({ base: "./src/blog/posts", pattern: "**/[^_]*.mdoc" }),
	schema: z.object({
		title: z.string(),
		pubDate: z.coerce.date(),
		modDate: z.coerce.date().optional(),
	}),
});

export { blog };

// ref: https://docs.astro.build/en/guides/content-collections/

import { load } from "js-yaml";
import { defineCollection, z, type BaseSchema } from "astro:content";
import { file, glob } from "astro/loaders";

const posts = defineCollection({
	loader: glob({ base: "./src/contents/posts", pattern: "**/[^_]*.mdoc" }),
	schema: z.object({
		title: z.string(),
		pubDate: z.coerce.date(),
		modDate: z.coerce.date().optional(),
	}),
});

const defineSingleton = <S extends BaseSchema>({
	name,
	schema,
}: {
	name: string;
	schema: S;
}) => {
	return defineCollection({
		loader: file(`./src/contents/data/${name}.yaml`, {
			parser: (text) => {
				const data = load(text) as Record<string, unknown>;
				return [
					{
						id: "default",
						...data,
					},
				];
			},
		}),
		schema,
	});
};

const information = defineSingleton({
	name: "information",
	schema: z.object({
		firstName: z.object({
			en: z.string(),
			th: z.string(),
		}),
		lastName: z.object({
			en: z.string(),
			th: z.string(),
		}),
	}),
});

export const collections = { posts, information };

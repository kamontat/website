// ref: https://docs.astro.build/en/guides/content-collections/

import { astroCollections } from "@utils/contents/schemas";
import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";

export const collections = await astroCollections({
	defineCollection,
	fileLoader: file,
	globLoader: glob,
});

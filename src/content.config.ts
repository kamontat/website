// ref: https://docs.astro.build/en/guides/content-collections/

import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";
import { astroCollections } from "@core/schemas";

export const collections = await astroCollections({
	defineCollection,
	fileLoader: file,
	globLoader: glob,
});

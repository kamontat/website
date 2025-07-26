import type { SchemaMap } from "@core/schemas";
import type { KeystaticCollections } from "@core/types";

import { getCollection as _getCollection, getEntry } from "astro:content";
import { newCollectionEntry } from "@core/models/collection";

type CollectionKey = keyof KeystaticCollections<SchemaMap, "collection">;

export const getCollections = async <K extends CollectionKey>(key: K) => {
	const entries = await _getCollection(key);
	return entries.map(newCollectionEntry);
};

export const getCollection = async <K extends CollectionKey>(
	key: K,
	slug: string,
) => {
	const entry = await getEntry(key, slug);
	if (!entry) throw new Error(`Cannot find collection key: "${key}"`);

	return newCollectionEntry(entry!);
};

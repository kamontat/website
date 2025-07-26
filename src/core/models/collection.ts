import type { CollectionEntry, CollectionKey } from "@core/types";
import { render, type DataEntryMap } from "astro:content";
import { getContent, mustContent } from "@core/utils/content";

export const newCollectionEntry = <
	Key extends CollectionKey,
	Entry extends DataEntryMap[Key][string],
>(
	entry: Entry,
): CollectionEntry<Key, Entry> => {
	return {
		id: entry.id,
		collection: entry.collection,
		data: entry.data,

		get: (key, locale) => getContent(entry.data, key, locale),
		must: (key, locale) => mustContent(entry.data, key, locale),
		render: () => render(entry),
	};
};

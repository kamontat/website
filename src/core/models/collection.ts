import type { CollectionEntry, CollectionKey } from "@core/types";
import { render, type DataEntryMap } from "astro:content";
import { getContent, mustContent } from "@core/utils/content";
import { modelsLogger } from "@core/constants/logger";

export const newCollectionEntry = <
	Key extends CollectionKey,
	Entry extends DataEntryMap[Key][string],
>(
	entry: Entry,
): CollectionEntry<Key, Entry> => {
	const logger = modelsLogger.extend(newCollectionEntry.name);
	logger.debug("new collection entry from '%s'", entry.id);
	return {
		id: entry.id,
		collection: entry.collection,
		data: entry.data,

		get: <
			Key extends keyof Entry["data"],
			Locale extends keyof Entry["data"][Key] | undefined = undefined,
		>(
			key: Key,
			locale: Locale,
		) => getContent<Entry["data"], Key, Locale>(entry.data, key, locale),
		must: <
			Key extends keyof Entry["data"],
			Locale extends keyof Entry["data"][Key] | undefined = undefined,
		>(
			key: Key,
			locale: Locale,
		) => mustContent<Entry["data"], Key, Locale>(entry.data, key, locale),
		render: () => render(entry),
	};
};

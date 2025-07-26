import type { DataEntryMap } from "astro:content";
import type { SingletonEntry, SingletonKey } from "@core/types";
import { getContent, mustContent } from "@core/utils/content";

export const newSingletonEntry = <
	Key extends SingletonKey,
	Entry extends DataEntryMap[Key]["default"],
>(
	entry: Entry,
): SingletonEntry<Key, Entry> => {
	return {
		id: entry.id,
		collection: entry.collection,
		data: entry.data,

		get: (key, locale) => getContent(entry.data, key, locale),
		must: (key, locale) => mustContent(entry.data, key, locale),
	};
};

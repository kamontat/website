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
	};
};

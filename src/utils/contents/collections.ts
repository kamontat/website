import type { KeystaticCollections } from "@utils/contents/schemas";
import {
	getCollection as _getCollection,
	getEntry,
	render,
	type DataEntryMap,
} from "astro:content";

export type CollectionKey = keyof KeystaticCollections<"collection">;

export const getCollections = async <K extends CollectionKey>(key: K) => {
	const entries = await _getCollection(key);
	return entries.map(warpCollection);
};

export const getCollection = async <K extends CollectionKey>(
	key: K,
	slug: string,
) => {
	const entry = await getEntry(key, slug);
	return warpCollection(entry!);
};

const warpCollection = <
	K extends CollectionKey,
	E extends DataEntryMap[K][string],
>(
	entry: E,
) => {
	return {
		id: entry.id,
		collection: entry.collection,
		get: <K extends keyof E["data"]>(
			key: Exclude<K, "id" | "collection">,
		): E["data"][K] => {
			const data = entry.data as E["data"];
			return data[key];
		},
		getByLocale: <K extends keyof E["data"], L extends keyof E["data"][K]>(
			key: Exclude<K, "id" | "collection">,
			locale: L,
		): E["data"][K][L] => {
			const data = entry.data as E["data"];
			return data[key][locale];
		},
		render: () => {
			return render(entry);
		},
	};
};

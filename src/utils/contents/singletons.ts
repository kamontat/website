import { getEntry, type DataEntryMap } from "astro:content";

export type SingletonKey = Extract<keyof DataEntryMap, "information">;

export const getSingleton = async <K extends SingletonKey>(key: K) => {
	const entry = await getEntry(key, "default");
	return warpSingleton(entry!);
};

const warpSingleton = <
	K extends SingletonKey,
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
	};
};

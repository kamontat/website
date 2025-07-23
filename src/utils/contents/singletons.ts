import { defaultLocale } from "@models/locales";
import type { KeystaticCollections } from "@utils/contents/schemas";
import { getEntry, type DataEntryMap } from "astro:content";

export type SingletonKey = keyof KeystaticCollections<"singleton">;

export interface SingletonData<
	K extends SingletonKey,
	D extends DataEntryMap[K]["default"]["data"],
> {
	readonly id: string;
	readonly collection: K;
	readonly data: D;
	get<V extends keyof D>(key: V): D[V] | undefined;
	get<V extends keyof D, L extends keyof D[V]>(
		key: V,
		locale: L,
	): D[V][L] | undefined;
	must<V extends keyof D>(key: V): D[V];
	must<V extends keyof D, L extends keyof D[V]>(key: V, locale: L): D[V][L];
}

export const getSingleton = async <K extends SingletonKey>(key: K) => {
	const entry = await getEntry(key, "default");
	if (!entry) throw new Error(`Cannot find singleton key: "${key}"`);

	type Output = SingletonData<K, DataEntryMap[K]["default"]["data"]>;

	const { id, collection, data } = entry;
	return {
		id,
		collection,
		data,
		get: (key, locale) => {
			const _data = data as Output["data"];
			const _value = _data[key];
			if (_value === undefined || _value === null) return undefined;

			if (!locale) return _value;
			// fallback to default locale if not exist
			return _value[locale] ?? _value[defaultLocale as keyof typeof _value];
		},
		must: (key, locale) => {
			const _data = data as Output["data"];
			const _value = _data[key];
			if (_value === undefined || _value === null)
				throw new Error(
					`Cannot find singleton data: ${String(locale).toUpperCase()}:${String(key)}`,
				);

			if (!locale) return _value;
			// fallback to default locale if not exist
			const value =
				_value[locale] ?? _value[defaultLocale as keyof typeof _value];
			if (_value === undefined || _value === null)
				throw new Error(
					`Cannot find localised singleton data: ${String(locale).toUpperCase()}:${String(key)}`,
				);
			return value;
		},
	} as Output;
};

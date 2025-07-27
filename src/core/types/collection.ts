import type { DataEntryMap, RenderResult } from "astro:content";
import type { SchemaMap } from "@core/schemas";
import type { LocaleContent } from "@core/utils/content";
import type { KeystaticCollections } from "./schema";

export type CollectionKey = keyof KeystaticCollections<SchemaMap, "collection">;

export interface CollectionEntry<
	Key extends CollectionKey,
	Entry extends DataEntryMap[Key][string],
> {
	readonly id: Entry["id"];
	readonly collection: Entry["collection"];
	readonly data: Entry["data"];

	get<
		Key extends keyof Entry["data"],
		Locale extends keyof Entry["data"][Key] | undefined = undefined,
	>(
		key: Key,
		locale?: Locale,
	): LocaleContent<Entry["data"], Key, Locale> | undefined;

	must<
		Key extends keyof Entry["data"],
		Locale extends keyof Entry["data"][Key] | undefined = undefined,
	>(
		key: Key,
		locale?: Locale,
	): LocaleContent<Entry["data"], Key, Locale>;

	render(): Promise<RenderResult>;
}

import type { DataEntryMap } from "astro:content";
import type { SchemaMap } from "@core/schemas";
import type { LocaleContent } from "@core/utils";
import type { KeystaticCollections } from "./schema";

export type SingletonKey = keyof KeystaticCollections<SchemaMap, "singleton">;

export interface SingletonEntry<
	Key extends SingletonKey,
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
}

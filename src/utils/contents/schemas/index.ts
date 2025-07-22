import type { CollectionConfig } from "astro/content/config";
import type {
	AstroAPIContext,
	AstroSchemaFromIDataSchema,
	KeystaticSchemaFromIDataSchema,
	KeystaticSchemaTypeMap,
} from "./models/base";

import posts from "./posts";
import information from "./information";
import ui from "./ui";
import links from "./links";

const data = {
	[posts.name]: posts,
	[information.name]: information,
	[links.name]: links,
	[ui.name]: ui,
} as const;

export type RawData = typeof data;
export type RawDataTypeSelector<T extends keyof KeystaticSchemaTypeMap> = {
	[K in keyof RawData]: RawData[K]["type"] extends T ? K : never;
}[keyof RawData];

export type AstroCollections = {
	-readonly [K in keyof RawData]: CollectionConfig<
		AstroSchemaFromIDataSchema<RawData[K]>
	>;
};

export type KeystaticCollections<T extends keyof KeystaticSchemaTypeMap> = {
	[K in RawDataTypeSelector<T>]: KeystaticSchemaTypeMap<
		KeystaticSchemaFromIDataSchema<RawData[K]>
	>[T];
};

export const astroCollections = async (context: AstroAPIContext) => {
	const entries = await Promise.all(
		Object.entries(data).map(async ([key, value]) => [
			key,
			await value.buildAstroConfig(context),
		]),
	);
	return Object.fromEntries(entries) as AstroCollections;
};

export const keystaticCollections = async () =>
	_keystaticCollections("collection");

export const keystaticSingleton = async () =>
	_keystaticCollections("singleton");

const _keystaticCollections = async <T extends keyof KeystaticSchemaTypeMap>(
	type: T,
) => {
	const values = await Promise.all(
		Object.entries(data)
			.filter(([, value]) => value.type === type)
			.map(async ([key, value]) => [key, await value.buildKeystaticConfig()]),
	);
	return Object.fromEntries(values) as KeystaticCollections<T>;
};

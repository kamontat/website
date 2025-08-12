import type {
	AstroAPIContext,
	AstroCollections,
	KeystaticCollections,
	KeystaticSchemaType,
} from "@core/types";

import information from "./information";
import ui from "./ui";

import posts from "./posts";
import links from "./links";
import authors from "./authors";

const schemas = {
	[information.name]: information,
	[links.name]: links,
	[ui.name]: ui,
	[posts.name]: posts,
	[authors.name]: authors,
} as const;

export type SchemaMap = typeof schemas;

export const astroCollections = async (context: AstroAPIContext) => {
	const entries = await Promise.all(
		Object.entries(schemas).map(async ([key, value]) => [
			key,
			await value.buildAstroConfig(context),
		]),
	);
	return Object.fromEntries(entries) as AstroCollections<SchemaMap>;
};

export const keystaticCollections = () => _keystaticCollections("collection");
export const keystaticSingleton = () => _keystaticCollections("singleton");

const _keystaticCollections = async <T extends KeystaticSchemaType>(
	type: T,
) => {
	const values = await Promise.all(
		Object.entries(schemas)
			.filter(([, value]) => value.type === type)
			.map(async ([key, value]) => [key, await value.buildKeystaticConfig()]),
	);
	return Object.fromEntries(values) as KeystaticCollections<SchemaMap, T>;
};

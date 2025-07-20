import type {
	AstroAPIContext,
	AstroSchema,
	IDataSchema,
	KeystaticSchema,
} from "./base";

import {
	collection,
	type EntryLayout,
	type SlugFormField,
} from "@keystatic/core";

export type KeystaticSlugSchema = KeystaticSchema & {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	slug: SlugFormField<string, any, any, any>;
};

export abstract class AbstractCollectionDataSchema<
	N extends string,
	AS extends AstroSchema,
	KS extends KeystaticSlugSchema,
> implements IDataSchema<"collection", N, AS, KS>
{
	readonly type = "collection" as const;

	constructor(
		readonly name: N,
		readonly label: string,
		readonly astroSchema: AS,
		readonly keystaticSchema: KS,
	) {}

	abstract readonly layout: EntryLayout;
	abstract readonly contentField: string | [string, ...string[]];
	abstract readonly filePattern: string;

	async buildKeystaticConfig() {
		return collection({
			label: this.label,
			path: `src/contents/${this.name}/**`,
			format: { data: "yaml", contentField: this.contentField },
			entryLayout: this.layout,
			schema: this.keystaticSchema,
			slugField: "slug" as never,
		});
	}

	async buildAstroConfig({ globLoader, defineCollection }: AstroAPIContext) {
		return defineCollection({
			loader: globLoader({
				base: `./src/contents/${this.name}`,
				pattern: this.filePattern,
			}),
			schema: this.astroSchema,
		});
	}
}

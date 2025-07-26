import type {
	AstroAPIContext,
	AstroSchema,
	IDataSchema,
	KeystaticSlugSchema,
} from "@core/types";

import { collection, type EntryLayout } from "@keystatic/core";

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

	get astroPath() {
		return `./src/contents/${this.name}`;
	}

	get keystaticPath(): `${string}/**` {
		return `src/contents/${this.name}/**`;
	}

	async buildKeystaticConfig() {
		return collection({
			label: this.label,
			path: this.keystaticPath,
			format: { data: "yaml", contentField: this.contentField },
			entryLayout: this.layout,
			schema: this.keystaticSchema,
			slugField: "slug" as never,
		});
	}

	async buildAstroConfig({ globLoader, defineCollection }: AstroAPIContext) {
		return defineCollection({
			loader: globLoader({
				base: this.astroPath,
				pattern: this.filePattern,
			}),
			schema: this.astroSchema,
		});
	}
}

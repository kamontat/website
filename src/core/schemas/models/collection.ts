import type {
	AstroAPIContext,
	AstroSchema,
	IDataSchema,
	KeystaticContentSchema,
	KeystaticSchema,
	KeystaticSlugSchema,
} from "@core/types";

import { collection, type EntryLayout } from "@keystatic/core";

export abstract class AbstractCollectionDataSchema<
	Name extends string,
	AS extends AstroSchema,
	KS extends KeystaticSchema,
	Slug extends keyof KS,
> implements IDataSchema<"collection", Name, AS, KS>
{
	readonly type = "collection" as const;

	constructor(
		readonly name: Name,
		readonly label: string,
		readonly slug: Slug,
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
			slugField: this.slug as never,
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

export class FormCollectionDataSchema<
	Name extends string,
	AS extends AstroSchema,
	KS extends KeystaticSchema,
	Slug extends keyof KS,
> extends AbstractCollectionDataSchema<Name, AS, KS, Slug> {
	readonly layout = "form";
	readonly contentField = "";
	readonly filePattern = "*.yaml";

	constructor(
		name: Name,
		label: string,
		astroSchema: AS,
		keystaticSchema: KS,
		slug = "slug" as Slug,
	) {
		super(name, label, slug, astroSchema, keystaticSchema);
	}
}

export class ContentCollectionDataSchema<
	N extends string,
	AS extends AstroSchema,
	KS extends KeystaticSchema & KeystaticSlugSchema & KeystaticContentSchema,
> extends AbstractCollectionDataSchema<N, AS, KS, "slug"> {
	readonly layout = "content";
	readonly contentField = "content";
	readonly filePattern = "**/*.mdoc";

	constructor(name: N, label: string, astroSchema: AS, keystaticSchema: KS) {
		super(name, label, "slug", astroSchema, keystaticSchema);
	}
}

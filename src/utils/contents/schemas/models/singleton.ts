import type {
	AstroAPIContext,
	AstroSchema,
	IDataSchema,
	KeystaticSchema,
} from "./base";

import { singleton } from "@keystatic/core";
import { load } from "js-yaml";

export interface SingletonAstroCollectionConfig {
	name: string | (() => string);
	schema: AstroSchema;
}

export class SingletonDataSchema<
	N extends string,
	AS extends AstroSchema,
	KS extends KeystaticSchema,
> implements IDataSchema<"singleton", N, AS, KS>
{
	readonly type = "singleton" as const;
	constructor(
		readonly name: N,
		readonly label: string,
		readonly astroSchema: AS,
		readonly keystaticSchema: KS,
	) {}

	async buildKeystaticConfig() {
		return singleton({
			label: this.label,
			path: `src/contents/data/${this.name}`,
			format: "yaml",
			schema: this.keystaticSchema,
		});
	}

	async buildAstroConfig(context: AstroAPIContext) {
		return await this.defineAstroCollection(context, {
			name: this.name,
			schema: this.astroSchema,
		});
	}

	protected async defineAstroCollection(
		{ defineCollection, fileLoader }: AstroAPIContext,
		config: SingletonAstroCollectionConfig,
	) {
		const path =
			typeof config.name === "function"
				? config.name()
				: `./src/contents/data/${config.name}.yaml`;
		return defineCollection({
			loader: fileLoader(path, {
				parser: (text) => {
					const data = load(text) as Record<string, unknown>;
					return [
						{
							id: "default",
							...data,
						},
					];
				},
			}),
			schema: this.astroSchema,
		});
	}
}

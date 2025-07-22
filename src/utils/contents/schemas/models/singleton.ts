import type {
	AstroAPIContext,
	AstroSchema,
	AstroSchemaBuilder,
	IDataSchema,
	KeystaticSchema,
} from "./base";

import { singleton } from "@keystatic/core";
import { load } from "js-yaml";

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
		readonly astroSchema: AS | AstroSchemaBuilder<AS>,
		readonly keystaticSchema: KS,
	) {}

	get astroPath() {
		return `./src/contents/data/${this.name}.yaml`;
	}

	get keystaticPath() {
		return `src/contents/data/${this.name}`;
	}

	async buildKeystaticConfig() {
		return singleton({
			label: this.label,
			path: this.keystaticPath,
			format: "yaml",
			schema: this.keystaticSchema,
		});
	}

	async buildAstroConfig({ defineCollection, fileLoader }: AstroAPIContext) {
		return defineCollection({
			loader: fileLoader(this.astroPath, {
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

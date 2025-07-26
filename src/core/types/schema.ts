import type {
	AstroConfig,
	AstroSchema,
	AstroSchemaBuilder,
	AstroAPIContext,
} from "./astro.schema";

import type {
	KeystaticConfig,
	KeystaticSchema,
	KeystaticSchemaType,
	KeystaticSchemaTypeMap,
} from "./keystatic.schema";

export interface IDataSchema<
	Type extends KeystaticSchemaType,
	Name extends string,
	ASchema extends AstroSchema,
	KSchema extends KeystaticSchema,
> {
	readonly type: Type;
	readonly name: Name;
	/** Similar to name, but for visualization only */
	readonly label: string;
	readonly astroSchema: ASchema | AstroSchemaBuilder<ASchema>;
	readonly keystaticSchema: KSchema;

	readonly astroPath: string;
	buildAstroConfig(context: AstroAPIContext): Promise<AstroConfig<ASchema>>;

	readonly keystaticPath: string;
	buildKeystaticConfig(): Promise<KeystaticConfig<Type, KSchema>>;
}

export type AnyDataSchema = IDataSchema<
	KeystaticSchemaType,
	string,
	AstroSchema,
	KeystaticSchema
>;

export type AstroSchemaFromIDataSchema<S> =
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	S extends IDataSchema<KeystaticSchemaType, string, infer AS, any>
		? AS
		: never;

export type AstroCollections<Map extends Record<string, AnyDataSchema>> = {
	-readonly [K in keyof Map]: AstroConfig<AstroSchemaFromIDataSchema<Map[K]>>;
};

type KeystaticSchemaTypeSelector<
	Map extends Record<string, AnyDataSchema>,
	Type extends KeystaticSchemaType,
> = {
	[K in keyof Map]: Map[K]["type"] extends Type ? K : never;
}[keyof Map];

export type KeystaticSchemaFromIDataSchema<S> =
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	S extends IDataSchema<KeystaticSchemaType, string, any, infer KS>
		? KS
		: never;

export type KeystaticCollections<
	Map extends Record<string, AnyDataSchema>,
	T extends KeystaticSchemaType,
> = {
	[K in KeystaticSchemaTypeSelector<Map, T>]: KeystaticSchemaTypeMap<
		KeystaticSchemaFromIDataSchema<Map[K]>
	>[T];
};

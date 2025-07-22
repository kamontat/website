import type { Collection, ComponentSchema, Singleton } from "@keystatic/core";
import type { BaseSchema, CollectionConfig } from "astro/content/config";
import type { file, glob, Loader } from "astro/loaders";
import type { defineCollection, SchemaContext } from "astro:content";

export type AstroSchemaBuilder<S extends AstroSchema> = (
	context: SchemaContext,
) => S;
export type AstroSchema = BaseSchema;
export type AstroConfig<S extends AstroSchema> = CollectionConfig<S>;

export type KeystaticSchemaTypeMap<
	S extends KeystaticSchema = KeystaticSchema,
> = {
	collection: Collection<S, string>;
	singleton: Singleton<S>;
};

export type KeystaticSchema = Record<string, ComponentSchema>;
export type KeystaticConfig<
	T extends keyof KeystaticSchemaTypeMap,
	S extends KeystaticSchema,
> = KeystaticSchemaTypeMap<S>[T];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type LoaderFunction = (...args: any[]) => Loader;

export interface AstroAPIContext {
	fileLoader: typeof file;
	globLoader: typeof glob;
	defineCollection: typeof defineCollection;
}

export interface IDataSchema<
	T extends keyof KeystaticSchemaTypeMap,
	N extends string,
	AS extends AstroSchema,
	KS extends KeystaticSchema,
> {
	readonly type: T;
	readonly name: N;
	/** Similar to name, but for visualization only */
	readonly label: string;
	readonly astroSchema: AS | AstroSchemaBuilder<AS>;
	readonly keystaticSchema: KS;

	readonly astroPath: string;
	buildAstroConfig(context: AstroAPIContext): Promise<CollectionConfig<AS>>;

	readonly keystaticPath: string;
	buildKeystaticConfig(): Promise<KeystaticConfig<T, KS>>;
}

export type AstroSchemaFromIDataSchema<S> =
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	S extends IDataSchema<keyof KeystaticSchemaTypeMap, string, infer AS, any>
		? AS
		: never;

export type KeystaticSchemaFromIDataSchema<S> =
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	S extends IDataSchema<keyof KeystaticSchemaTypeMap, string, any, infer KS>
		? KS
		: never;

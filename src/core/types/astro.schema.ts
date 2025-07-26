import type {
	BaseSchema,
	defineCollection,
	SchemaContext,
} from "astro:content";
import type { CollectionConfig } from "astro/content/config";
import type { file, glob } from "astro/loaders";

export type AstroSchema = BaseSchema;
export type AstroSchemaBuilder<Schema extends AstroSchema> = (
	context: SchemaContext,
) => Schema;
export type AstroConfig<Schema extends AstroSchema> = CollectionConfig<Schema>;

export interface AstroAPIContext {
	fileLoader: typeof file;
	globLoader: typeof glob;
	defineCollection: typeof defineCollection;
}

import type {
	Collection,
	ComponentSchema,
	ContentFormField,
	Singleton,
	SlugFormField,
} from "@keystatic/core";

export type KeystaticSchema = Record<string, ComponentSchema>;

export type KeystaticSchemaTypeMap<
	Schema extends KeystaticSchema = KeystaticSchema,
> = {
	collection: Collection<Schema, string>;
	singleton: Singleton<Schema>;
};

export type KeystaticSchemaType = keyof KeystaticSchemaTypeMap;

export type KeystaticConfig<
	Type extends KeystaticSchemaType,
	Schema extends KeystaticSchema,
> = KeystaticSchemaTypeMap<Schema>[Type];

export type KeystaticSlugSchema = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	slug: SlugFormField<string, any, any, any>;
};

export type KeystaticContentSchema = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	content: ContentFormField<any, any, any>;
};

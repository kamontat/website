import type { ComponentSchema } from "@keystatic/core";
import type { ContentComponent } from "@keystatic/core/content-components";

export type Builder<Argument, Output> = (arg: Argument) => Output;

export type SchemaBuilder = Builder<
	object & { label: string },
	ComponentSchema
>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ComponentBuilder = Builder<any, ContentComponent>;

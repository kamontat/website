import type { GetStaticPathsOptions } from "astro";
import type { LocaleName } from "./locale";

export type OptionalPath = string | undefined;
export type OptionalPaths = OptionalPath[];

export interface LocaleRoute {
	/** Router locale name */
	locale: LocaleName;
	/** Router raw path (path without locale prefix) */
	rawPath: string;
	/** Router path (path with locale prefix) */
	path: string;
	/** Router URL (absolute path with locale prefix) */
	url: string;
}

interface LocaleParameters {
	locale: LocaleName;
}

export interface StaticPathsItem<Parameters, Props> {
	params: LocaleParameters & Parameters;
	props?: Props;
}

export type StaticPathsBuilder<Input, Output> = (
	input: Input,
) => Output | Promise<Output>;

export type StaticPathsResult<Parameters, Props> = Promise<
	StaticPathsItem<Parameters, Props>[]
>;

export type StaticPathsFunction<Parameters, Props> = (
	options: GetStaticPathsOptions,
) => StaticPathsResult<Parameters, Props>;

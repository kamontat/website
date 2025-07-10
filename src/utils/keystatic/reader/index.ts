/* eslint-disable @typescript-eslint/no-explicit-any */

import type {
	ComponentSchema,
	ObjectField,
	ValueForReading,
} from "@keystatic/core";

import { cwd } from "node:process";
import config from "@keystatic/config";
import { createGitHubReader, type Reader } from "@keystatic/core/reader/github";
import { createReader } from "@keystatic/core/reader";
import { GITHUB_REPOSITORY } from "astro:env/client";

export type DefaultReader = ReturnType<typeof getReader>;

export type Collections<R = undefined> =
	R extends Reader<infer C, any>
		? C
		: ReturnType<typeof createReader> extends Reader<infer CC, any>
			? CC
			: never;

export type Singletons<R = undefined> =
	R extends Reader<any, infer S>
		? S
		: ReturnType<typeof createReader> extends Reader<any, infer SS>
			? SS
			: never;

export const getReader = () => {
	if (config.storage.kind === "github") {
		return createGitHubReader(config, {
			repo: GITHUB_REPOSITORY as `${string}/${string}`,
		});
	} else {
		return createReader(cwd(), config);
	}
};

export const listCollections = <N extends keyof Collections<DefaultReader>>(
	name: N,
) => {
	const reader = getReader();
	return reader.collections[name].list();
};

export const readCollection = <N extends keyof Collections<DefaultReader>>(
	name: N,
	slug: string,
) => {
	const reader = getReader();
	return reader.collections[name].readOrThrow(slug, {
		resolveLinkedFiles: false,
	});
};

export const readAllCollections = <N extends keyof Collections<DefaultReader>>(
	name: N,
) => {
	const reader = getReader();
	return reader.collections[name].all({ resolveLinkedFiles: false });
};

export const readSingleton = async <N extends keyof Singletons<DefaultReader>>(
	name: N,
) => {
	const reader = getReader();
	const data = await reader.singletons[name].readOrThrow({
		resolveLinkedFiles: false,
	});
	return warperSingleton(data);
};

const warperSingleton = <S extends Record<string, ComponentSchema>>(
	data: ValueForReading<ObjectField<S>>,
) => {
	return {
		get: <K extends keyof S>(key: K): ValueForReading<S[K]> => {
			return data[key];
		},
		getByLocale: <K extends keyof S, L extends keyof ValueForReading<S[K]>>(
			key: K,
			locale: L,
		): ValueForReading<S[K]>[L] => {
			return data[key][locale];
		},
	};
};

import type { LocaleName } from "@models/locales";
import { localeNameMap } from "@models/locales";
import {
	fields,
	type ComponentSchema,
	type ObjectField,
} from "@keystatic/core";

export type Function = (arg: object & { label: string }) => ComponentSchema;

/**
 * Support basic i18n by repeating a given Keystatic field for each locale.
 *
 * Use localised fields to reduce repetition in the config and make it easier to read.
 * This will also follow the global locales config, making sure all desired locales are automatically supported.
 *
 * @param field The Keystatic field
 * @param fieldConfig The config
 * @returns The localised fields
 */
export const ksLocalised = <F extends Function>(
	field: F,
	param: Parameters<F>[0],
): ObjectField<Record<LocaleName, ReturnType<F>>> => {
	const empty = {} as Record<LocaleName, ReturnType<F>>;
	const object = Object.entries(localeNameMap).reduce((res, [key, value]) => {
		res[key as LocaleName] = field({
			...param,
			label: `${param.label} - ${value}`,
		}) as ReturnType<F>;
		return res;
	}, empty);

	return fields.object(object);
};

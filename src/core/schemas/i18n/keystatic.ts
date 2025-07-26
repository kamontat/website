import {
	fields,
	type ComponentSchema,
	type ObjectField,
} from "@keystatic/core";
import type { LocaleName } from "@core/types";
import { getLocaleName, getLocales } from "@core/utils/locale";

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
	const object = getLocales().reduce((result, locale) => {
		const name = getLocaleName(locale);
		result[locale] = field({
			...param,
			label: `${param.label} - ${name}`,
		}) as ReturnType<F>;
		return result;
	}, empty);

	return fields.object(object);
};

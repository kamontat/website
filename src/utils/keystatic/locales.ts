import { fields, type ObjectField } from "@keystatic/core"

export const locales = {
	en: 'English',
	th: 'Thai',
} as const
export const localesRegex = /(en|th)\/[\w\d-]+/

export type Locale = keyof typeof locales

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
function localised<F extends (...args: any) => any>(
	field: F,
	...fieldParams: Parameters<F>
): ObjectField<Record<Locale, ReturnType<F>>> {
	const empty = {} as Record<Locale, ReturnType<F>>
	const object = Object.entries(locales).reduce((res, [key, value]) => {
		res[key as Locale] = field({
			...fieldParams[0],
			label: `${fieldParams[0].label} - ${value}`
		})
		return res
	}, empty)

	return fields.object(object)
}

export { localised }

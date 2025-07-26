import type { DefaultLocaleName, LocaleMapper, LocaleName } from "@core/types";
import {
	defaultLocale,
	localeList,
	localeNameMap,
	localeISOMap,
} from "@core/constants/locale";
import { utilsLogger } from "@core/constants/logger";

/**
 * check if input locales are equals
 *
 * @param expected Expected Locale to be equals to
 * @param actual Actual locale (Support Astro.currentLocal, Astro.url.pathname)
 * @returns true if expected and actual are equals
 */
const isLocale = (
	expected: LocaleName,
	actual: string | undefined,
): boolean => {
	if (!actual) return false;
	return actual?.startsWith(expected) || actual?.startsWith(`/${expected}`);
};

const getLocaleMapper = <
	Map extends LocaleMapper,
	Name extends keyof Map | undefined = undefined,
>(
	mapper: Map,
	name?: Name,
) => {
	type Result = Name extends keyof LocaleMapper
		? Map[Name]
		: Map[DefaultLocaleName];
	if (name === undefined) return mapper[defaultLocale] as Result;
	return mapper[name] as Result;
};

/**
 * @returns All supported locales
 */
export const getLocales = () => localeList;

/**
 * check if input is locale string
 * @param locale input locale string
 * @returns true if input is valid locale string; otherwise, return false
 */
export const hasLocale = (locale: string | undefined): boolean => {
	if (!locale) return false;
	return getLocales().some((l) => isLocale(l, locale));
};

/**
 * extracts the locale from the given string.
 * If the locale is not found, it will return the default locale.
 *
 * @param locale Astro.currentLocale
 * @returns locale string as Locale type.
 */
export const getLocale = <T extends boolean = true>(
	locale: string | undefined,
	useDefault: T = true as T,
) => {
	type Result = T extends false ? LocaleName | undefined : LocaleName;

	const logger = utilsLogger.extend(getLocale.name);
	const output = getLocales().find((l) => isLocale(l, locale));
	if (output === undefined) {
		const result = (useDefault ? defaultLocale : undefined) as Result;
		logger.warn(`Missing locale of input "%s", return "%s"`, locale, result);
		return result;
	}

	logger.debug(`returns "%s" from input "%s"`, output, locale);
	return output as Result;
};

export const getLocaleName = <Name extends LocaleName | undefined = undefined>(
	name?: Name,
) => {
	return getLocaleMapper(localeNameMap, name);
};

export const getLocaleISO = <Name extends LocaleName | undefined = undefined>(
	name?: Name,
) => {
	return getLocaleMapper(localeISOMap, name);
};

import type { LocaleName } from "@models/locales";

import { i18nLogger } from "./constants";
import {
	defaultLocale,
	localeISOMap,
	localeNameMap,
	localeList,
} from "@models/locales";

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
	if (actual?.startsWith(expected) || actual?.startsWith(`/${expected}`))
		return true;
	return false;
};

export const hasLocale = (locale: string | undefined) => {
	if (!locale) return false;
	return localeList.some((l) => isLocale(l, locale));
};

/**
 * extracts the locale from the given string.
 * If the locale is not found, it will return the default locale.
 *
 * @param locale Astro.currentLocale
 * @returns locale string as Locale type.
 */
export const getLocale = (locale: string | undefined): LocaleName => {
	const logger = i18nLogger.extend("getLocale");
	const output = localeList.find((l) => isLocale(l, locale));
	if (output === undefined) {
		logger.debug(
			`fn(${locale}) is missing, returns default '${defaultLocale}'`,
		);
		return defaultLocale;
	}

	logger.debug(`fn(${locale}) is success, returns '${output}'`);
	return output;
};

export const getLocaleName = <L extends LocaleName>(
	locale: L | undefined,
): (typeof localeNameMap)[L] => {
	type Output = (typeof localeNameMap)[L];
	const logger = i18nLogger.extend("getLocaleName");
	const raw = Object.entries(localeNameMap).find(([code]) =>
		isLocale(code as LocaleName, locale),
	)?.[1];
	const output = (raw ?? localeNameMap[defaultLocale]) as Output;
	if (raw === undefined) {
		logger.debug(`fn(${locale}) is missing, returns default '${output}'`);
		return output;
	}

	logger.debug(`fn(${locale}) is success, returns '${output}'`);
	return output;
};

export const getLocaleISO = <L extends LocaleName>(
	locale?: L | undefined,
): (typeof localeISOMap)[L] => {
	type Output = (typeof localeISOMap)[L];
	const logger = i18nLogger.extend("getLocaleISO");
	const raw = Object.entries(localeISOMap).find(([code]) =>
		isLocale(code as LocaleName, locale),
	)?.[1];
	const output = (raw ?? localeISOMap[defaultLocale]) as Output;
	if (raw === undefined) {
		logger.debug(`fn(${locale}) is missing, returns default '${output}'`);
		return output;
	}

	logger.debug(`fn(${locale}) is success, returns '${output}'`);
	return output;
};

/**
 *
 * @returns All supported locales
 */
export const getLocales = () => localeList;

import { getRelativeLocaleUrl } from "astro:i18n";
import { i18nLogger } from "../constants";
import type { Locale } from "../models";
import { getLocales, hasLocale } from "./locales";

export const getStaticPathParamsWithLocale = <
	P extends Record<string, string | number | boolean> | null = null,
>(
	builder?: P | ((locale: Locale) => P),
) => {
	return getLocales().map((locale) => {
		const _overrides =
			typeof builder === "function" ? builder(locale) : builder;
		const overrides = _overrides ?? ({} as P);
		return {
			params: {
				locale,
				...overrides,
			},
		} as P extends null
			? { params: { locale: Locale } }
			: { params: { locale: Locale } & P };
	});
};

export const getPathWithoutLocale = (pathname: string) => {
	const logger = i18nLogger.extend("getPathWithoutLocale");
	const paths = pathname.split("/");
	if (paths.length === 0) {
		logger.debug(`fn(%s) is invalid, returns 'undefined'`, pathname);
		return;
	}
	if (!hasLocale(pathname)) {
		logger.debug(
			`fn(%s) is success without locale, returns the same as input`,
			pathname,
		);
		return pathname;
	}

	const isRoot = paths.at(0) === "";

	const index = isRoot ? 2 : 1;
	const _output = paths.slice(index).join("/");
	const output = isRoot ? `/${_output}` : _output;
	logger.debug(`fn(%s) is success, returns '%s'`, pathname, output);
	return output;
};

export const getPathWithLocale = (pathname: string, locale: Locale) => {
	const logger = i18nLogger.extend("getPathWithLocale");
	const path = getPathWithoutLocale(pathname);
	logger.debug(
		`fn(%s, %s) is success, transform to '%s'`,
		pathname,
		locale,
		path,
	);
	return getRelativeLocaleUrl(locale, path);
};

export const goToHome = (locale: Locale) => getPathWithLocale("/", locale);
export const goToBlog = (locale: Locale) => getPathWithLocale("/blog", locale);

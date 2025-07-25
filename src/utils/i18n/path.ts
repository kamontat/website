import type { LocaleName } from "@models/locales";

import { getRelativeLocaleUrl } from "astro:i18n";
import { i18nLogger } from "./constants";
import { getLocales, hasLocale } from "./locales";

export const getStaticPathParamsWithLocale = <
	P extends Record<string, string | number | boolean> | null = null,
>(
	builder?: P | ((locale: LocaleName) => P),
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
			? { params: { locale: LocaleName } }
			: { params: { locale: LocaleName } & P };
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

export const getPathWithLocale = (pathname: string, locale: LocaleName) => {
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

export const buildPath = (...paths: (string | undefined)[]): string => {
	// remove '/' prefix and suffix
	return paths
		.map((path) => path?.replace(/(^\/|\/$)/g, ""))
		.filter((path) => typeof path === "string")
		.join("/");
};

export const goToHome = (
	locale: LocaleName,
	...appendPaths: (string | undefined)[]
) => getPathWithLocale(buildPath("/", ...appendPaths), locale);
export const goToBlog = (
	locale: LocaleName,
	...appendPaths: (string | undefined)[]
) => getPathWithLocale(buildPath("/blog", ...appendPaths), locale);

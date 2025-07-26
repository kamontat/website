import type { LocaleName, LocaleRoute, OptionalPaths } from "@core/types";

import { getAbsoluteLocaleUrl, getRelativeLocaleUrl } from "astro:i18n";
import { getLocale, getLocales } from "@core/utils/locale";
import { buildPath, getRawPath } from "@core/utils/path";

export const getLocaleRoute = (
	pathname: string,
	locale?: LocaleName,
): LocaleRoute => {
	const _locale = locale ?? getLocale(pathname, false);
	if (!_locale) {
		const msg = `Cannot find valid locale path=${pathname} locale=${locale}`;
		throw new Error(msg);
	}

	const rawPath = getRawPath(pathname);
	const path = getRelativeLocaleUrl(_locale, rawPath);
	const url = getAbsoluteLocaleUrl(_locale, rawPath);
	return {
		locale: _locale,
		rawPath,
		path,
		url,
	};
};

export const getLocaleRoutes = (
	pathname: string,
	exclude?: LocaleName,
): LocaleRoute[] => {
	return getLocales()
		.map((l) => getLocaleRoute(pathname, l))
		.filter((r) => r.locale !== exclude);
};

export const goTo = (locale: LocaleName, ...paths: OptionalPaths) =>
	getLocaleRoute(buildPath(...paths), locale).url;

export const goToHome = (locale: LocaleName, ...appendPaths: OptionalPaths) =>
	goTo(locale, "/", ...appendPaths);

export const goToBlog = (
	locale: LocaleName,
	...appendPaths: (string | undefined)[]
) => goTo(locale, "/", "blog", ...appendPaths);

import { getRelativeLocaleUrlList } from "astro:i18n";

export type Locale = "en" | "th"

/**
 * get locale object from input string
 * @param locale Astro.currentLocale
 * @returns Locale type (string alias)
 */
export const getLocale = (locale: string | undefined): Locale => {
	if (locale?.startsWith("th")) return "th"
	if (locale?.startsWith("en")) return "en"
	return "en"
}

export const getLocales = (): Locale[] => {
	const paths = getRelativeLocaleUrlList();
	return paths.map((path) => getLocale(path.split("/").at(1)));
}

import { getRelativeLocaleUrl } from "astro:i18n";

export const getSlugUrl = (prefix: string, slug: string) => {
	const [locale, name] = slug.split("/");
	return getRelativeLocaleUrl(locale, name, { prependWith: prefix });
};

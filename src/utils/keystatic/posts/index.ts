import { getRelativeLocaleUrl } from "astro:i18n";

export const getPostUrl = (slug: string) => {
	const [locale, name] = slug.split("/");
	return getRelativeLocaleUrl(locale, name, { prependWith: "blog" });
};

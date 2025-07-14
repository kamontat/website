import { getRelativeLocaleUrl } from "astro:i18n";

export const getPostUrl = (slug: string, baseUrl: URL) => {
	const [locale, name] = slug.split("/");
	return getRelativeLocaleUrl(locale, name, {
		prependWith: baseUrl.pathname.replaceAll(locale, ""),
	});
};

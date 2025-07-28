import type { CollectionEntry, LocaleName } from "@core/types";
import type { DataEntryMap } from "astro:content";
import { getLocale, getLocales } from "./locale";
import { defaultLocale } from "@core/constants/locale";
import { utilsLogger } from "@core/constants/logger";

type LocalePostEntry = CollectionEntry<"posts", DataEntryMap["posts"][string]>;

export interface LocalePost {
	/** Page locale where post will be posted */
	pageLocale: LocaleName;
	/** Post slug */
	slug: string;
	/** Post name (from slug) */
	name: string;
	/** Post locale (from slug) */
	locale: LocaleName;
	/** Post entry from getCollections APIs */
	entry: LocalePostEntry;
}

/** Mapping of slug name and mapping of locale slug data */
type PostMapper = Record<string, Record<LocaleName, LocalePost | undefined>>;

/**
 *
 * @param posts post entry from getCollections data
 * @param allLocales duplicate missing locale posts from defaultLocale
 */
const _buildLocalePosts = (posts: LocalePostEntry[], allLocales: boolean) => {
	const logger = utilsLogger.extend(buildLocalePosts.name);
	const postMapper = posts.reduce((mapper, post) => {
		const slug = post.id;
		const [_locale, name] = slug.split("/");
		const locale = getLocale(_locale);
		logger.debug("build locale post of '%s'", slug);
		if (!mapper[name]) {
			mapper[name] = {
				en: undefined,
				th: undefined,
			};
		}

		if (allLocales && locale === defaultLocale) {
			getLocales()
				.filter((l) => l !== locale)
				.forEach((pageLocale) => {
					if (!mapper[name][pageLocale]) {
						mapper[name][pageLocale] = {
							pageLocale,
							slug,
							locale,
							name,
							entry: post,
						};
					}
				});
		}

		mapper[name][locale] = {
			pageLocale: locale,
			slug,
			locale,
			name,
			entry: post,
		};
		return mapper;
	}, {} as PostMapper);

	return Object.keys(postMapper).flatMap((key) => {
		const post = postMapper[key];
		return [post.en, post.th].filter((p) => p !== undefined);
	});
};

export const buildLocalePosts = (
	posts: CollectionEntry<"posts", DataEntryMap["posts"][string]>[],
) => {
	return _buildLocalePosts(posts, true);
};

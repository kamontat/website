import type { UTMQuery } from "@core/types";

import { utilsLogger } from "@core/constants/logger";

const logger = utilsLogger.extend("url");

export const isAbsoluteURL = (input: string) => {
	const absolute = input.startsWith("https://") || input.startsWith("http://");
	logger.debug("input URL '%s' %s absolute", input, absolute ? "is" : "is not");
	return absolute;
};

export const toURL = (input: string, base: string) => {
	return isAbsoluteURL(input) ? new URL(input) : new URL(input, base);
};

export const isExternal = (input: string, base: string) => {
	if (!isAbsoluteURL(input)) {
		logger.debug("relative url is always internal");
		return false;
	}

	const url = new URL(input);
	logger.debug('check external by path: "%s" === "%s"', url.host, base);
	return url.host === base;
};

export const buildUTM = (url: URL, utm?: UTMQuery) => {
	if (!utm) return url;

	const q = url.searchParams;
	if (!q.has("utm_source")) q.set("utm_source", utm.source);
	if (!q.has("utm_medium")) q.set("utm_medium", utm.medium);
	if (!q.has("utm_campaign")) q.set("utm_campaign", utm.campaign);
	if (!q.has("utm_term") && utm.term) q.set("utm_term", utm.term);
	if (!q.has("utm_content") && utm.content) q.set("utm_content", utm.content);
	return url;
};

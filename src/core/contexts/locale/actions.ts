import type { LocaleName } from "@core/types";

import { readStorage, writeStorage } from "@core/utils/storage";

import context from "./context";
import logger from "./logger";

/**
 * must run on svelte island with 'client:load' directive
 */
export const setupLocale = () => {
	context.subscribe((locale) => {
		const previous = readStorage("locale");
		if (previous === locale) return;
		writeStorage("locale", locale);
	});
};

export const switchLocale = (overrides: LocaleName) => {
	context.update((locale) => {
		if (overrides !== locale) logger.debug("update locale to '%s'", locale);
		return overrides;
	});
};

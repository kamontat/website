import type { LocaleName } from "@core/types";

import { ctxLogger } from "@core/constants/logger";
import { context } from "./context";
import { readStorage, writeStorage } from "@core/utils/storage";

/**
 * require client:load directive
 */
export const setupLocale = () => {
	context.subscribe(({ locale }) => {
		const previous = readStorage("locale");
		if (previous === locale) return;
		writeStorage("locale", locale);
	});
};

export const switchLocale = (locale: LocaleName) => {
	const logger = ctxLogger.extend(switchLocale.name);
	context.update((ctx) => {
		if (ctx.locale === locale) return ctx;
		logger.debug("switch '%s' to '%s'", ctx.locale, locale);
		return { ...ctx, locale };
	});
};

import type { LocaleName } from "@core/types";

import { ctxLogger } from "@core/constants/logger";
import { context } from "./context";

/**
 * require client:load directive
 */
export const setupLocale = () => {
	const logger = ctxLogger.extend(setupLocale.name);
	context.subscribe(({ locale: l }) => {
		logger.debug("update locale value: %s", l);
		if (l) window.localStorage.setItem("locale", l);
	});
};

export const switchLocale = (locale: LocaleName) => {
	const logger = ctxLogger.extend(switchLocale.name);
	logger.debug("switch locale to '%s'", locale);
	context.update((ctx) => ({ ...ctx, locale }));
};

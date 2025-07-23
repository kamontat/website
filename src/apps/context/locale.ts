import { type LocaleName } from "@models/locales";
import { context, ctxLogger } from "./constants";

/**
 * require client:load directive
 */
export const setupLocale = () => {
	context.subscribe(({ locale: l }) => {
		ctxLogger.debug("update locale value: %s", l);
		if (l) window.localStorage.setItem("locale", l);
	});
};

export const switchLocale = (locale: LocaleName) => {
	ctxLogger.debug("switch locale to '%s'", locale);
	context.update((ctx) => ({ ...ctx, locale }));
};

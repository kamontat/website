import type { ThemeName } from "@core/types";
import { ctxLogger } from "@core/constants/logger";
import { nextTheme } from "@core/utils/theme";
import { context } from "./context";

/**
 * require client:load directive
 */
export const setupTheme = () => {
	context.subscribe(({ theme: t }) => {
		ctxLogger.debug("update theme value: %s", t);
		if (t) window.localStorage.setItem("theme", t);
	});

	// Load theme from localStorage
	const previous = window.localStorage.getItem("theme");
	if (previous) switchTheme(previous as ThemeName);
	else switchTheme(undefined);
};

export const switchTheme = (overrides?: ThemeName) => {
	context.update((ctx) => {
		const next = nextTheme(ctx.theme, overrides);
		ctxLogger.debug("switch theme from '%s' to '%s'", ctx.theme, next);
		if (ctx.theme === next) return ctx;
		return { ...ctx, theme: next };
	});
};

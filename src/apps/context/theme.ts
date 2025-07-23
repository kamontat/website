import { defaultTheme, themeList, type ThemeName } from "@models/themes";
import { context, ctxLogger } from "./constants";

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
	else switchTheme(defaultTheme);
};

export const switchTheme = (overrides?: ThemeName) => {
	context.update((ctx) => {
		const next = nextTheme(ctx.theme, overrides);
		ctxLogger.debug("switch theme from '%s' to '%s'", ctx.theme, next);
		if (ctx.theme === next) return ctx;
		return { ...ctx, theme: next };
	});
};

export const nextTheme = (
	current: ThemeName | undefined,
	overrides?: ThemeName,
): ThemeName => {
	if (overrides) return overrides;
	if (current === undefined) return "dark";

	const index = themeList.findIndex((t) => t === current) + 1;
	const next = index < themeList.length ? themeList[index] : themeList[0];
	return next;
};

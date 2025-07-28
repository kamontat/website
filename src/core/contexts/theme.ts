import type { ThemeName } from "@core/types";
import { ctxLogger } from "@core/constants/logger";
import { nextTheme } from "@core/utils/theme";
import { context } from "./context";
import { readStorage, writeStorage } from "@core/utils/storage";

/**
 * require client:load directive
 */
export const setupTheme = () => {
	context.subscribe(({ theme }) => {
		const previous = readStorage("theme");
		if (previous === theme) return;
		writeStorage("theme", theme);
	});

	// Load theme from localStorage
	const previous = readStorage<ThemeName>("theme");
	if (previous) switchTheme(previous);
	else switchTheme(undefined);
};

export const switchTheme = (overrides?: ThemeName) => {
	context.update((ctx) => {
		const next = nextTheme(ctx.theme, overrides);
		if (ctx.theme === next) return ctx;
		ctxLogger.debug("switch '%s' to '%s'", ctx.theme, next);
		return { ...ctx, theme: next };
	});
};

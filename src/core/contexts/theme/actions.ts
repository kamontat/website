import type { ThemeName } from "@core/types";

import { readStorage, writeStorage } from "@core/utils/storage";
import { nextTheme } from "@core/utils/theme";

import context from "./context";
import logger from "./logger";

/**
 * must run on svelte island with 'client:load' directive
 */
export const setupTheme = () => {
	context.subscribe((theme) => {
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
	context.update((theme) => {
		const next = nextTheme(theme, overrides);
		if (theme !== next) logger.debug("switch '%s' to '%s'", theme, next);
		return next;
	});
};

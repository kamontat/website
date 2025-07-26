import type { ThemeName } from "@core/types";
import { defaultTheme, themeList } from "@core/constants/theme";
import { utilsLogger } from "@core/constants/logger";

export const nextTheme = (
	current: ThemeName | undefined,
	overrides?: ThemeName,
): ThemeName => {
	const logger = utilsLogger.extend(nextTheme.name);
	if (overrides) {
		logger.debug("use override theme: %s", overrides);
		return overrides;
	}
	if (current === undefined) {
		logger.debug("use default theme: %s", defaultTheme);
		return defaultTheme;
	}

	const index = themeList.findIndex((t) => t === current) + 1;
	const next = index < themeList.length ? themeList[index] : themeList[0];
	logger.debug("loop next theme '%s' from current '%s'", current, next);
	return next;
};

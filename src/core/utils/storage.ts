import { utilsLogger } from "@core/constants/logger";

const logger = utilsLogger.extend("localStorage");

export const readStorage = <Output extends string>(
	key: string,
): Output | undefined => {
	const value = window.localStorage.getItem(key) as Output | null;
	logger.debug("read '%s' returns %s", key, value);
	return value ?? undefined;
};

export const writeStorage = <Data extends string>(
	key: string,
	data: Data | undefined | null,
) => {
	if (data) {
		logger.debug("saved '%s' to %s", key, data);
		window.localStorage.setItem(key, data);
	} else {
		logger.debug("no data available to save: %s", key);
	}
};

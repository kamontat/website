import type { ContextValue } from "@core/types";

import { writable } from "svelte/store";
import { modelsLogger } from "@core/constants/logger";

export const newContext = (name: string, value: ContextValue) => {
	const logger = modelsLogger.extend(newContext.name);
	return writable(value, () => {
		logger.debug("initiating... context: %s", name);
	});
};

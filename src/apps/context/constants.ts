import { defaultContext, type Context } from "@models/context";

import { writable } from "svelte/store";
import { newLogger } from "@utils/logger";

export const ctxLogger = newLogger("app", "context");
export const context = writable<Context>(defaultContext, () => {
	ctxLogger.debug("start create app context");
});

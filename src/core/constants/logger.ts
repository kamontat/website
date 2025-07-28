import type { DefaultSeperator } from "@core/types";
import { newLogger } from "@core/models/logger";

export const defaultSeperator: DefaultSeperator = ":";

const _newLogger = <Name extends string, Namespaces extends string[]>(
	name: Name,
	...namespaces: Namespaces
) => newLogger(name, namespaces, defaultSeperator);

export const ctxLogger = _newLogger("core", "contexts");
export const utilsLogger = _newLogger("core", "utils");
export const modelsLogger = _newLogger("core", "models");

export const atomLogger = _newLogger("components", "atoms");
export const moleculeLogger = _newLogger("components", "molecules");
export const organismLogger = _newLogger("components", "organisms");

export const pageLogger = _newLogger("page");

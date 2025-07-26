import type { Logger, NamespaceMerger } from "@core/types";

import _debug from "debug";
import { buildNamespace } from "@core/utils/logger";
import { name } from "@core/configs/package";

const baseLogger = _debug(name);

export const newLogger = <
	Namespace extends string,
	Namespaces extends string[],
	Seperator extends string,
>(
	base: Namespace,
	additionals: Namespaces,
	seperator: Seperator,
): Logger<NamespaceMerger<Namespace, Namespaces, Seperator>, Seperator> => {
	const namespace = buildNamespace(base, additionals, seperator);
	return {
		namespace,
		seperator,
		debug: baseLogger.extend("debug", seperator).extend(namespace, seperator),
		info: baseLogger.extend("info", seperator).extend(namespace, seperator),
		warn: baseLogger.extend("warn", seperator).extend(namespace, seperator),
		error: baseLogger.extend("error", seperator).extend(namespace, seperator),
		extend: (ns, ...nss) =>
			newLogger(`${namespace}${seperator}${ns}`, nss, seperator),
	};
};

import type { Logger, NamespaceMerger } from "./models";
import { APP, LEVELS, SEP, debug, info, warn, error } from "./constants";

export const buildNamespace = <N extends string, NS extends string[]>(
	ns: N,
	...nss: NS
) => {
	const namespaces = [ns, ...nss];
	const lvlIndex = namespaces.at(0) === APP ? 1 : 0;
	if (namespaces.at(lvlIndex) && LEVELS.includes(namespaces.at(0)!))
		namespaces.shift();
	if (namespaces.at(0) === APP) namespaces.shift();
	return namespaces.join(SEP) as NamespaceMerger<N, NS>;
};

export const newLogger = <N extends string, NS extends string[]>(
	ns: N,
	...nss: NS
): Logger<NamespaceMerger<N, NS>> => {
	const namespace = buildNamespace(ns, ...nss);
	return {
		namespace,
		debug: debug.extend(namespace),
		info: info.extend(namespace),
		warn: warn.extend(namespace),
		error: error.extend(namespace),
		extend: (ns, ...nss) => newLogger(`${namespace}${SEP}${ns}`, ...nss),
	};
};

export const extendLogger = <
	O extends string,
	N extends string,
	NS extends string[],
>(
	logger: Logger<O>,
	ns: N,
	...nss: NS
) => {
	return logger.extend(ns, ...nss);
};

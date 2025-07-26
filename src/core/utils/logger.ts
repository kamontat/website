import type { DefaultSeperator, NamespaceMerger } from "@core/types";
import { name } from "@core/configs/package";

const levels = ["debug", "info", "warn", "error"];

export const buildNamespace = <
	Namespace extends string,
	Namespaces extends string[],
	Seperator extends string = DefaultSeperator,
>(
	base: Namespace,
	additionals: Namespaces,
	seperator: Seperator,
) => {
	const namespaces = base.split(seperator).concat(...additionals);
	if (namespaces.at(0) === name) namespaces.shift();
	if (levels.includes(namespaces.at(1) ?? "")) namespaces.shift();

	return namespaces.join(seperator) as NamespaceMerger<
		Namespace,
		Namespaces,
		Seperator
	>;
};

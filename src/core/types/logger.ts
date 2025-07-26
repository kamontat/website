import type { Debugger } from "debug";

type NamespaceAppender<
	Namespaces extends string[],
	Seperator extends string,
> = Namespaces extends []
	? ""
	: Namespaces extends [infer Namespace]
		? Namespace extends string
			? `${Seperator}${Namespace}`
			: ""
		: Namespaces extends [infer Namespace, ...infer Rest]
			? Namespace extends string
				? Rest extends string[]
					? `${Seperator}${Namespace}${NamespaceAppender<Rest, Seperator>}`
					: ""
				: ""
			: "";

export type NamespaceMerger<
	Namespace extends string,
	Namespaces extends string[],
	Seperator extends string,
> = `${Namespace}${NamespaceAppender<Namespaces, Seperator>}`;

export type LoggerExtender<
	CurrentNamespace extends string,
	CurrentSeperator extends string,
> = <Namespace extends string, Namespaces extends string[]>(
	ns: Namespace,
	...nss: Namespaces
) => Logger<
	`${CurrentNamespace}${CurrentSeperator}${NamespaceMerger<Namespace, Namespaces, CurrentSeperator>}`,
	CurrentSeperator
>;

export interface Debuggers {
	debug: Debugger;
	info: Debugger;
	warn: Debugger;
	error: Debugger;
}

export interface Logger<Namespace extends string, Seperator extends string>
	extends Debuggers {
	readonly seperator: Seperator;
	readonly namespace: Namespace;
	extend: LoggerExtender<Namespace, Seperator>;
}

export type DefaultSeperator = ":";
export type LoggerLevels = keyof Debuggers;

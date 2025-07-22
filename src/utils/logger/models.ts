import type { Debugger } from "debug";
import type { SEP } from "./constants";

type NamespaceAdder<NS extends string[]> = NS extends []
	? ""
	: NS extends [infer F]
		? F extends string
			? `${typeof SEP}${F}`
			: ""
		: NS extends [infer F, ...infer R]
			? F extends string
				? R extends string[]
					? `${typeof SEP}${F}${NamespaceAdder<R>}`
					: ""
				: ""
			: "";

export type NamespaceMerger<
	N extends string,
	NS extends string[],
> = `${N}${NamespaceAdder<NS>}`;

export type LoggerExtender<O extends string> = <
	N extends string,
	NS extends string[],
>(
	ns: N,
	...nss: NS
) => Logger<NamespaceMerger<`${O}${typeof SEP}${N}`, NS>>;

export interface Logger<N extends string> {
	namespace: N;
	debug: Debugger;
	info: Debugger;
	warn: Debugger;
	error: Debugger;
	extend: LoggerExtender<N>;
}

import type { Debugger } from "debug";
import type { SEP } from "./constants";

export type NamespaceMerger<
	N extends string,
	NS extends string[],
> = `${N}${NS extends [] ? "" : `${typeof SEP}${NS[number]}`}`;

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

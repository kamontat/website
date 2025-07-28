import type { Writable } from "svelte/store";
import type { LocaleName } from "./locale";
import type { ThemeName } from "./theme";

export interface ContextValue {
	theme: ThemeName | undefined;
	locale: LocaleName | undefined;
	sidebar: boolean;
}

export type Context = Writable<ContextValue>;

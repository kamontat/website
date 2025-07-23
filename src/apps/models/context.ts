import type { LocaleName } from "./locales";
import type { ThemeName } from "./themes";

export interface Context {
	theme: ThemeName | undefined;
	locale: LocaleName | undefined;
}

export const defaultContext = {
	theme: undefined,
	locale: undefined,
} satisfies Context;

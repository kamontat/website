import type { localeISOMap, localeNameMap } from "./languages";

export type Locale = keyof typeof localeNameMap;

export type LocaleISO = (typeof localeISOMap)[Locale];

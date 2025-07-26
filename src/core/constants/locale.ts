import type { LocaleName, DefaultLocaleName, LocaleMapper } from "@core/types";

export const localeISOMap = {
	en: "en-US",
	th: "th-TH",
} as const satisfies LocaleMapper;

export const localeNameMap = {
	en: "English",
	th: "ไทย",
} as const satisfies LocaleMapper;

export const localeList: LocaleName[] = ["en", "th"];

export const defaultLocale: DefaultLocaleName = "en";

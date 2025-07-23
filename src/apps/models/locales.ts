export const localeISOMap = {
	en: "en-US",
	th: "th-TH",
} as const;

export const localeNameMap = {
	en: "English",
	th: "ไทย",
} as const;

export const localeList = ["en", "th"] as const satisfies string[];

export type LocaleName = keyof typeof localeNameMap;
export type LocaleISO = (typeof localeISOMap)[LocaleName];

export const defaultLocale = "en";

export const defaultLocale = "en";

export const locales = ["en", "th"] as const satisfies string[];

export const localeNameMap = {
	en: "English",
	th: "ไทย",
} as const;

export const localeISOMap = {
	en: "en-US" as const,
	th: "th-TH" as const,
} as const;

export const localePathRegex = /(en|th)\/[\w\d-]+/;

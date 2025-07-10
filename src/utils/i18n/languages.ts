export const locales = {
	en: "English",
	th: "Thai",
} as const;
export const localePathRegex = /(en|th)\/[\w\d-]+/;

export type Locale = keyof typeof locales;

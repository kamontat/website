import { z, type ZodTypeAny } from "astro:schema";
import { getLocales, type Locale } from "@utils/i18n";

export const zodLocalised = <T extends ZodTypeAny>(zod: T) => {
	const empty = {} as Record<Locale, T>;
	return z.object(
		getLocales().reduce((res, locale) => ({ ...res, [locale]: zod }), empty),
	);
};

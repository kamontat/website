import type { LocaleName } from "@models/locales";

import { z, type ZodTypeAny } from "astro:schema";
import { getLocales } from "@utils/i18n";

export const zodLocalised = <T extends ZodTypeAny>(zod: T) => {
	const empty = {} as Record<LocaleName, T>;
	return z.object(
		getLocales().reduce((res, locale) => ({ ...res, [locale]: zod }), empty),
	);
};

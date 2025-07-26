import { z, type ZodTypeAny } from "astro:schema";

import type { LocaleName } from "@core/types";
import { getLocales } from "@core/utils/locale";

export const zodLocalised = <T extends ZodTypeAny>(zod: T) => {
	const empty = {} as Record<LocaleName, T>;
	return z.object(
		getLocales().reduce((res, locale) => ({ ...res, [locale]: zod }), empty),
	);
};

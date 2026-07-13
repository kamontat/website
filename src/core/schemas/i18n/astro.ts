import { z, type ZodType } from "astro/zod";

import type { LocaleName } from "@core/types";
import { getLocales } from "@core/utils/locale";

export const zodLocalised = <T extends ZodType>(zod: T) => {
	const empty = {} as Record<LocaleName, T>;
	return z.object(
		getLocales().reduce((res, locale) => ({ ...res, [locale]: zod }), empty),
	);
};

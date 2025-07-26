import type { SingletonKey } from "@core/types";

import { getEntry } from "astro:content";
import { newSingletonEntry } from "@core/models/singleton";

export const getSingleton = async <K extends SingletonKey>(key: K) => {
	const entry = await getEntry(key, "default");
	if (!entry) throw new Error(`Cannot find singleton key: "${key}"`);

	return newSingletonEntry(entry!);
};

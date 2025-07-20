import type { LocalConfig, GitHubConfig } from "@keystatic/core";

import { CI, GITHUB_REPOSITORY } from "astro:env/client";
import { config } from "@keystatic/core";
import { getLocaleISO } from "@utils/i18n";
import {
	keystaticSingleton,
	keystaticCollections,
} from "@utils/contents/schemas";

const getStorage = () => {
	const [owner, name] = GITHUB_REPOSITORY.split("/");
	switch (CI) {
		case true:
			return {
				kind: "github",
				repo: { owner, name },
			} satisfies GitHubConfig["storage"];
		default:
			return {
				kind: "local",
			} satisfies LocalConfig["storage"];
	}
};

const baseConfig = config({
	storage: getStorage(),
	locale: getLocaleISO("en"),
	singletons: await keystaticSingleton(),
	collections: await keystaticCollections(),
});

export default baseConfig;

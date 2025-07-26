import type { LocalConfig, GitHubConfig } from "@keystatic/core";

import { CI, GITHUB_REPOSITORY } from "astro:env/client";
import { config } from "@keystatic/core";

import { keystaticCollections, keystaticSingleton } from "@core/schemas";
import { getLocaleISO } from "@core/utils/locale";

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

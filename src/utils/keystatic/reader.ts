import { cwd } from "node:process";
import config from "@keystatic/config";
import { createGitHubReader } from "@keystatic/core/reader/github";
import { createReader } from "@keystatic/core/reader";
import { GITHUB_REPOSITORY } from "astro:env/client";

export const getReader = () => {
	if (config.storage.kind === "github") {
		return createGitHubReader(config, {
			repo: GITHUB_REPOSITORY as `${string}/${string}`,
		});
	} else {
		return createReader(cwd(), config);
	}
};

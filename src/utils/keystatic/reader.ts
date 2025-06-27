import { cwd } from "node:process";
import { createGitHubReader } from "@keystatic/core/reader/github";
import { createReader } from "@keystatic/core/reader";

import config from "@keystatic/config";

const owner = import.meta.env.PUBLIC_VERCEL_GIT_REPO_OWNER;
const name = import.meta.env.PUBLIC_VERCEL_GIT_REPO_SLUG;

export const getReader = () => {
	if (config.storage.kind === "github") {
		return createGitHubReader(config, {
			repo: `${owner}/${name}`,
		});
	} else {
		return createReader(cwd(), config);
	}
};

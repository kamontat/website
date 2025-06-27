// @ts-check
import { defineConfig, envField } from "astro/config";

import svelte from "@astrojs/svelte";
import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
	site: "https://kc.in.th",
	integrations: [svelte(), markdoc(), sitemap(), keystatic(), react()],
	adapter: vercel(),
	output: "static",
	vite: {
		build: {
			chunkSizeWarningLimit: 3000, // kB
		},
	},
	env: {
		schema: {
			PUBLIC_VERCEL_GIT_REPO_OWNER: envField.string({
				access: "public",
				context: "client",
				default: import.meta.env.PUBLIC_VERCEL_GIT_REPO_OWNER,
				optional: true,
			}),
			PUBLIC_VERCEL_GIT_REPO_SLUG: envField.string({
				access: "public",
				context: "client",
				default: import.meta.env.PUBLIC_VERCEL_GIT_REPO_SLUG,
				optional: true,
			}),
			PUBLIC_VERCEL_GIT_COMMIT_SHA: envField.string({
				access: "public",
				context: "client",
				default: import.meta.env.PUBLIC_VERCEL_GIT_COMMIT_SHA,
				optional: true,
			}),
			PUBLIC_VERCEL_GIT_COMMIT_MESSAGE: envField.string({
				access: "public",
				context: "client",
				default: import.meta.env.PUBLIC_VERCEL_GIT_COMMIT_MESSAGE,
				optional: true,
			}),
		},
	},
	redirects: {
		"/go/facebook": {
			status: 301,
			destination: "https://facebook.com/kamontatc",
		},
		"/go/x": {
			status: 301,
			destination: "https://x.com/kamontatc",
		},
	},
});

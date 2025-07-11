// @ts-check
import { defineConfig, envField } from "astro/config";

import svelte from "@astrojs/svelte";
import markdoc from "@astrojs/markdoc";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import keystatic from "@keystatic/astro";
import UnoCSS from "unocss/astro";

// https://astro.build/config
export default defineConfig({
	site: "https://kc.in.th",
	integrations: [
		svelte(),
		markdoc(),
		sitemap(),
		keystatic(),
		react(),
		UnoCSS({ injectReset: true }),
	],
	adapter: vercel({
		isr: {
			expiration: 60 * 60 * 24, // second
		},
	}),
	output: "static",
	prefetch: {
		defaultStrategy: "hover",
		prefetchAll: true,
	},
	i18n: {
		locales: ["en", "th"],
		defaultLocale: "en",
		fallback: {
			th: "en",
		},
		routing: {
			prefixDefaultLocale: true,
			redirectToDefaultLocale: true,
			fallbackType: "redirect",
		},
	},
	redirects: {
		"/": "/en", // Avoid blank page before redirect occurred
		"/blog": "/blog/en",
		"/go/facebook": {
			status: 301,
			destination: "https://facebook.com/kamontatc/",
		},
		"/go/x": {
			status: 301,
			destination: "https://x.com/kamontatc/",
		},
		"/go/linkedin": {
			status: 301,
			destination: "https://www.linkedin.com/in/kamontat/",
		},
		"/go/github": {
			status: 301,
			destination: "https://github.com/kamontat/",
		},
	},
	env: {
		schema: {
			CI: envField.boolean({
				access: "public",
				context: "client",
				default: false,
			}),
			GITHUB_REPOSITORY: envField.string({
				access: "public",
				context: "client",
			}),
			GITHUB_SHA: envField.string({
				access: "public",
				context: "client",
			}),
			PUBLIC_KEYSTATIC_GITHUB_APP_SLUG: envField.string({
				access: "public",
				context: "client",
			}),
			KEYSTATIC_GITHUB_CLIENT_ID: envField.string({
				access: "secret",
				context: "server",
			}),
			KEYSTATIC_GITHUB_CLIENT_SECRET: envField.string({
				access: "secret",
				context: "server",
			}),
			KEYSTATIC_SECRET: envField.string({
				access: "secret",
				context: "server",
			}),
			VERCEL_TOKEN: envField.string({
				access: "secret",
				context: "server",
			}),
		},
	},
	vite: {
		build: {
			chunkSizeWarningLimit: 3000, // kB
		},
	},
});

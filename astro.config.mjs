// @ts-check
import { defineConfig, envField } from "astro/config";

import svelte from "@astrojs/svelte";
import markdoc from "@astrojs/markdoc";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import keystatic from "@keystatic/astro";
import UnoCSS from "unocss/astro";

import {
	defaultLocale,
	localeISOMap,
	localeList,
} from "./src/core/constants/locale";

// https://astro.build/config
export default defineConfig({
	site:
		import.meta.env.ENV === "local"
			? "http://localhost:4321"
			: "https://kc.in.th",
	integrations: [
		svelte(),
		markdoc(),
		sitemap({
			i18n: {
				defaultLocale,
				locales: localeISOMap,
			},
		}),
		keystatic(),
		react(),
		UnoCSS({ injectReset: "@kcws/reset.css" }),
	],
	adapter: vercel({
		imageService: true,
		devImageService: "sharp",
		edgeMiddleware: true,
		isr: {
			expiration: 60 * 60 * 24, // second
			exclude: [/^\/api\/.+/, /^\/keystatic\/.+/],
		},
	}),
	output: "static",
	i18n: {
		locales: localeList,
		defaultLocale,
		routing: {
			prefixDefaultLocale: true,
		},
	},
	redirects: {
		"/": "/en",
		"/blog": "/en/blog",
		"/go/facebook": {
			status: 302,
			destination: "https://facebook.com/kamontatc/",
		},
		"/go/x": {
			status: 302,
			destination: "https://x.com/kamontatc/",
		},
		"/go/linkedin": {
			status: 302,
			destination: "https://www.linkedin.com/in/kamontat/",
		},
		"/go/github": {
			status: 302,
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
			GITHUB_REF: envField.string({
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
	devToolbar: {
		enabled: false,
	},
	prefetch: {
		defaultStrategy: "hover",
		prefetchAll: true,
	},
	vite: {
		build: {
			chunkSizeWarningLimit: 3000, // kB
		},
	},
});

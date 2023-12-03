import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
	integrations: [react(), markdoc(), keystatic()],
	output: "hybrid",
	adapter: vercel({
		speedInsights: {
			enabled: true,
		},
	}),
});

// NOTE: https://github.com/withastro/astro/issues/7573#issuecomment-1817846646
console.log(
	process.env.VERCEL_ANALYTICS_ID,
	process.env.PUBLIC_VERCEL_ANALYTICS_ID,
);
if (!process.env.VERCEL_ANALYTICS_ID) {
	process.env.VERCEL_ANALYTICS_ID = process.env.PUBLIC_VERCEL_ANALYTICS_ID;
}

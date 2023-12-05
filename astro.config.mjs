import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro";
import vercel from "@astrojs/vercel/serverless";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
	integrations: [react(), markdoc(), mdx(), keystatic()],
	output: "hybrid",
	adapter: vercel({
		speedInsights: {
			enabled: true,
		},
	}),
});

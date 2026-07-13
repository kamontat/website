// @ts-check

import eslint from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";
import eslintPluginAstro from "eslint-plugin-astro";
import unocss from "@unocss/eslint-config/flat";

const config = defineConfig(
	globalIgnores([
		"node_modules",
		"dist",
		".vercel",
		".astro",
		"postcss.config.cjs",
	]),
	eslint.configs.recommended,
	tseslint.configs.eslintRecommended,
	tseslint.configs.recommended,
	eslintPluginAstro.configs.recommended,
	eslintPluginAstro.configs["jsx-a11y-recommended"],
	unocss,
);

export default config;

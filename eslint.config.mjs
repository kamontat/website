// @ts-check

import eslint from "@eslint/js";
import { globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";
import eslintPluginAstro from "eslint-plugin-astro";

export default tseslint.config(
	globalIgnores(["node_modules", "dist", ".vercel", ".astro"]),
	eslint.configs.recommended,
	tseslint.configs.eslintRecommended,
	tseslint.configs.recommended,
	eslintPluginAstro.configs.recommended,
	eslintPluginAstro.configs["jsx-a11y-recommended"],
);

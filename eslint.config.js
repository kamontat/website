import eslintPluginAstro from "eslint-plugin-astro";

export default [
	...eslintPluginAstro.configs.recommended,
	...eslintPluginAstro.configs["jsx-a11y-recommended"],
	{
		rules: {
			// override/add rules settings here, such as:
			// "astro/no-set-html-directive": "error"
		},
	},
];

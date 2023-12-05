/** @type {import("eslint").ESLint.ConfigData} */
module.exports = {
	extends: ['eslint:recommended', 'plugin:astro/recommended'],
	overrides: [
		{
			files: ['*.astro'],
			parser: 'astro-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser',
				extraFileExtensions: ['.astro'],
			},
			rules: {
				// override/add rules settings here, such as:
				// "astro/no-set-html-directive": "error"
			},
		},
		{
			files: ['*.ts'],
			parser: '@typescript-eslint/parser',
		},
		{
			files: ['*.js', '*.cjs', '*.mjs'],
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				ecmaFeatures: {
					modules: true,
				},
			},
			env: {
				node: true,
				browser: true,
			},
		},
	],
}

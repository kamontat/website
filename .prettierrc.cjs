/** @type {import("prettier").Config} */
module.exports = {
	plugins: ['prettier-plugin-astro'],
	arrowParens: 'avoid',
	semi: false,
	singleQuote: true,
	jsxSingleQuote: true,
	quoteProps: 'consistent',
	trailingComma: 'all',
	bracketSpacing: true,
	bracketSameLine: false,
	singleAttributePerLine: true,
}

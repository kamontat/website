import type { Theme } from "unocss/preset-wind4";
import {
	defineConfig,
	presetWind4,
	presetWebFonts,
	presetTypography,
	presetIcons,
	transformerDirectives,
} from "unocss";

const config = defineConfig({
	presets: [
		presetWind4({
			arbitraryVariants: false,
			preflights: {
				// Already include on astro.config.mjs file
				reset: false,
			},
			variablePrefix: "un-",
		}),
		presetWebFonts({
			provider: "fontsource",
			themeKey: undefined,
			fonts: {
				sans: [
					{
						// https://fontsource.org/fonts/mitr
						name: "Mitr",
						weights: [200, 300, 400, 500],
						subsets: ["latin", "thai"],
					},
				],
				serif: [
					{
						// https://fontsource.org/fonts/mitr
						name: "Mitr",
						weights: [200, 300, 400, 500],
						subsets: ["latin", "thai"],
					},
				],
				mono: [
					{
						// https://fontsource.org/fonts/jetbrains-mono
						name: "JetBrains Mono",
						subsets: ["latin"],
						variable: {
							ital: { default: "0", min: "0", max: "1", step: "1" },
							wght: { default: "400", min: "200", max: "700", step: "100" },
						},
					},
				],
			},
		}),
		presetTypography({
			important: true,
		}),
		presetIcons({
			cdn: "https://esm.sh/",
			prefix: "i-",
			collections: {
				// https://icon-sets.iconify.design/skill-icons/
				"skill-icons": () =>
					import("@iconify-json/skill-icons/icons.json").then((i) => i.default),
				// https://icon-sets.iconify.design/line-md/
				"line-md": () =>
					import("@iconify-json/line-md/icons.json").then((i) => i.default),
				// https://icon-sets.iconify.design/lineicons/
				lineicons: () =>
					import("@iconify-json/lineicons/icons.json").then((i) => i.default),
			},
		}),
	],
	transformers: [transformerDirectives()],
	theme: {
		font: {
			sans: '"Mitr",ui-sans-serif,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
			serif: '"Mitr", ui-serif,serif',
			mono: '"JetBrains Mono",ui-monospace,monospace',
		},
	} as Theme,
	extendTheme: (t) => {
		const theme = {
			...t,
			text: {
				sm: { fontSize: "0.85rem", lineHeight: "1.125rem" }, // small
				base: { fontSize: "1rem", lineHeight: "1.5rem" }, // h6, all
				lg: { fontSize: "1.125rem", lineHeight: "1.75rem" }, // h5
				xl: { fontSize: "1.25rem", lineHeight: "2rem" }, // h4
				"2xl": { fontSize: "1.5rem", lineHeight: "1" }, // h3
				"3xl": { fontSize: "1.75rem", lineHeight: "1.1" }, // h2
				"4xl": { fontSize: "2rem", lineHeight: "1.225" }, // h1
			},
			fontWeight: {
				extralight: "200",
				light: "300",
				normal: "400",
				medium: "500",
				bold: "700",
			},
			colors: {
				white: "oklch(99.0% 0.0045 89.9)",
				black: "oklch(2.0% 0.0030 0.0)",
				primary: {
					light: "oklch(49.43% 0.14355 31.1)",
					dark: "oklch(83.74% 0.13515 30.0)",
					black: "oklch(95.71% 0.0321 31.8)",
				},
				"on-primary": {
					light: "oklch(100% 0.0000 89.9)",
					dark: "oklch(31.90% 0.1281 31.1)",
					black: "oklch(0% 0.0000 0.0)",
				},
				"primary-container": {
					light: "oklch(91.77% 0.0633 28.8)",
					dark: "oklch(40.73% 0.13725 31.5)",
					black: "oklch(82.53% 0.147 30.1)",
				},
				"on-primary-container": {
					light: "oklch(40.73% 0.13725 31.5)",
					dark: "oklch(91.77% 0.0633 28.8)",
					black: "oklch(15.84% 0.09195 31.3)",
				},
				secondary: {
					light: "oklch(48.65% 0.0675 28.5)",
					dark: "oklch(83.30% 0.0747 30.7)",
					black: "oklch(95.71% 0.0321 31.8)",
				},
				"on-secondary": {
					light: "oklch(100% 0.0000 89.9)",
					dark: "oklch(31.35% 0.06225 30.7)",
					black: "oklch(0% 0.0000 0.0)",
				},
				"secondary-container": {
					light: "oklch(91.77% 0.0633 28.8)",
					dark: "oklch(40.02% 0.06495 29.6)",
					black: "oklch(82.09% 0.07455 29.2)",
				},
				"on-secondary-container": {
					light: "oklch(40.02% 0.06495 29.6)",
					dark: "oklch(91.77% 0.0633 28.8)",
					black: "oklch(15.53% 0.05415 30.6)",
				},
				tertiary: {
					light: "oklch(48.31% 0.1026 87.3)",
					dark: "oklch(82.83% 0.11715 86.6)",
					black: "oklch(95.45% 0.06855 83.3)",
				},
				"on-tertiary": {
					light: "oklch(100.00% 0.0000 89.9)",
					dark: "oklch(30.99% 0.0897 87.3)",
					black: "oklch(0.00% 0.0000 0.0)",
				},
				"tertiary-container": {
					light: "oklch(91.45% 0.11925 86.6)",
					dark: "oklch(39.86% 0.0975 87.8)",
					black: "oklch(81.61% 0.1158 86.2)",
				},
				"on-tertiary-container": {
					light: "oklch(39.86% 0.0975 87.8)",
					dark: "oklch(91.45% 0.11925 86.6)",
					black: "oklch(15.04% 0.0462 85.7)",
				},
				error: {
					light: "oklch(50.60% 0.28905 27.7)",
					dark: "oklch(83.83% 0.13365 26.8)",
					black: "oklch(95.74% 0.03165 28.3)",
				},
				"on-error": {
					light: "oklch(100.00% 0.0000 89.9)",
					dark: "oklch(32.75% 0.2004 27.3)",
					black: "oklch(0.00% 0.0000 0.0)",
				},
				"error-container": {
					light: "oklch(91.83% 0.0627 25.2)",
					dark: "oklch(41.71% 0.2553 27.4)",
					black: "oklch(82.62% 0.14535 27.1)",
				},
				"on-error-container": {
					light: "oklch(41.71% 0.2553 27.4)",
					dark: "oklch(91.83% 0.0627 25.2)",
					black: "oklch(15.86% 0.09675 25.9)",
				},
				background: {
					light: "oklch(98.40% 0.012 36.6)",
					dark: "oklch(18.91% 0.0231 25.9)",
					black: "oklch(18.91% 0.0231 25.9)",
				},
				"on-background": {
					light: "oklch(22.55% 0.0243 25.0)",
					dark: "oklch(91.70% 0.0309 32.5)",
					black: "oklch(91.70% 0.0309 32.5)",
				},
				surface: {
					light: "oklch(98.40% 0.012 36.6)",
					dark: "oklch(18.91% 0.0231 25.9)",
					black: "oklch(18.91% 0.0231 25.9)",
				},
				"on-surface": {
					light: "oklch(22.55% 0.0243 25.0)",
					dark: "oklch(91.70% 0.0309 32.5)",
					black: "oklch(100.00% 0.0000 89.9)",
				},
				outline: {
					light: "oklch(57.14% 0.03465 29.0)",
					dark: "oklch(65.71% 0.0369 27.9)",
					black: "oklch(95.71% 0.0321 31.8)",
				},
				shadow: {
					light: "oklch(0.00% 0.0000 0.0)",
					dark: "oklch(0.00% 0.0000 0.0)",
					black: "oklch(0.00% 0.0000 0.0)",
				},
				gray: {
					"50": "oklch(98.5% 0.0075 247.839)",
					"100": "oklch(96.7% 0.0075 264.542)",
					"200": "oklch(92.8% 0.0075 264.531)",
					"300": "oklch(87.2% 0.0075 258.338)",
					"400": "oklch(70.7% 0.0075 261.325)",
					"500": "oklch(55.1% 0.0075 264.364)",
					"600": "oklch(44.6% 0.0075 256.802)",
					"700": "oklch(37.3% 0.0075 259.733)",
					"800": "oklch(27.8% 0.0075 256.848)",
					"900": "oklch(21% 0.0075 264.665)",
					"950": "oklch(13% 0.0075 261.692)",
					DEFAULT: "oklch(70.7% 0.033 261.325)",
				},
			},
		} as Theme;
		// console.log(theme);
		return theme;
	},
	variants: [
		(matcher) => {
			if (!matcher.startsWith("black:")) return matcher;
			return {
				// slice `black:` prefix and passed to the next variants and rules
				matcher: matcher.slice(6),
				selector: (s) => `.black ${s}`,
			};
		},
	],
	blocklist: [[/font-\d+/, { message: "use named weight instead" }]],
});

export default config;

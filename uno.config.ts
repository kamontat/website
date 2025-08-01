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
		// presetAttributify({
		// 	prefix: "un-",
		// 	prefixedOnly: true,
		// }),
	],
	transformers: [transformerDirectives()],
	theme: {
		font: {
			sans: 'ui-sans-serif,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
			serif: "ui-serif,serif",
			mono: "ui-monospace,monospace",
		},
		fontWeight: {
			extralight: "200",
			light: "300",
			normal: "400",
			medium: "500",
			bold: "700",
		},
	} satisfies Theme,
	extendTheme: (t) => {
		const theme = t as Theme;
		// console.log(theme);
		return {
			...theme,
			spacing: {
				...theme.spacing,
			},
		};
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

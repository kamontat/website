import {
	defineConfig,
	presetWind4,
	presetWebFonts,
	presetTypography,
	presetIcons,
	presetAttributify,
	transformerDirectives,
} from "unocss";

export default defineConfig({
	presets: [
		presetWind4({
			attributifyPseudo: true,
			dark: "media",
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
							wght: { default: "400", min: "100", max: "800", step: "100" },
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
				"skill-icons": () =>
					import("@iconify-json/skill-icons/icons.json").then((i) => i.default),
				"line-md": () =>
					import("@iconify-json/line-md/icons.json").then((i) => i.default),
			},
		}),
		presetAttributify({
			prefix: "un-",
			prefixedOnly: true,
		}),
	],
	transformers: [transformerDirectives()],
	extendTheme: (theme) => {
		return {
			...theme,
			fontWeight: {
				thin: "100",
				extralight: "200",
				light: "300",
				normal: "400",
				medium: "500",
				semibold: "600",
				bold: "700",
				extrabold: "800",
			},
		};
	},
});

import { defineMarkdocConfig } from "@astrojs/markdoc/config";
import { astroMarkdocConfig } from "src/core/schemas/components";
import shiki from "@astrojs/markdoc/shiki";

export default defineMarkdocConfig({
	extends: [
		shiki({
			themes: {
				light: "github-light",
				dark: "github-dark",
				black: "vitesse-black",
			},
		}),
	],
	...astroMarkdocConfig(),
});

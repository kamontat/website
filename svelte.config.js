import { vitePreprocess } from "@astrojs/svelte";
// import UnoCSS from "@unocss/svelte-scoped/preprocess";

export default {
	preprocess: [vitePreprocess()],
};

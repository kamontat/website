<script lang="ts">
	import { onMount } from "svelte";
	import { newLogger } from "@utils/logger";

	const themeMap = {
		black: "Black",
		dark: "Dark",
		light: "Light",
	} as const;
	const themes = ["black", "dark", "light"] as const;

	type ThemeName = (typeof themes)[number];
	const defaultTheme: ThemeName = "dark";
	const logger = newLogger("components", "common", "ThemeSwitch");

	let theme = $state<ThemeName>(defaultTheme);

	const getTheme = (overrides?: ThemeName) => {
		const current = theme;
		const index = themes.findIndex((t) => t === theme) + 1;
		const next = index < themes.length ? themes[index] : themes[0];
		return { current, next: overrides ?? next };
	};

	const switchTheme = (overrides?: ThemeName) => {
		const { current, next } = getTheme(overrides);
		logger.debug(`switch theme from ${current} to ${next}`);

		const classList = document.documentElement.classList;
		themes.forEach((t) => {
			if (classList.contains(t)) classList.remove(t);
		});
		classList.add(next);

		logger.debug(`current theme = ${$state.snapshot(theme)}`);
		theme = next;
		logger.debug(`after update theme = ${$state.snapshot(theme)}`);
		return next;
	};

	const onclick = () => {
		logger.debug("[event] click switch theme");
		localStorage.setItem("theme", switchTheme());
	};

	onMount(() => {
		const previous = localStorage.getItem("theme");
		if (previous) {
			switchTheme(previous as ThemeName);
		} else {
			const applied = themes.some((t) => {
				if (window.matchMedia(`(prefers-color-scheme: ${t})`).matches) {
					switchTheme(t);
					return true;
				}
				return false;
			});
			if (!applied) switchTheme(defaultTheme);
		}
	});
</script>

<button class="mx-1" {onclick}>{themeMap[theme]}</button>

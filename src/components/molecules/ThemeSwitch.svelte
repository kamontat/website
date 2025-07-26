<script lang="ts">
	import { onMount } from "svelte";
	import { themeList, themeMap } from "@core/constants/theme";
	import { moleculeLogger } from "@core/constants/logger";
	import { context, setupTheme, switchTheme } from "@core/contexts";

	const logger = moleculeLogger.extend("ThemeSwitch");

	context.subscribe(({ theme }) => {
		if (theme) {
			const classList = document.documentElement.classList;
			themeList.forEach((t) => classList.remove(t));
			classList.add(theme);
		}
	});

	const onclick = () => {
		logger.debug("[event] click switch theme");
		switchTheme();
	};

	onMount(() => {
		logger.debug("onMount callback");
		setupTheme();
	});
</script>

{#if $context.theme}
	<button class="mx-1" {onclick}>{themeMap[$context.theme]}</button>
{/if}

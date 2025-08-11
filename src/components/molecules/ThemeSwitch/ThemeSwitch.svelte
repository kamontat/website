<script lang="ts">
	import { onMount } from "svelte";

	import Button from "@components/atoms/Button/Button.svelte";

	import { themeList, themeMap } from "@core/constants/theme";
	import { moleculeLogger } from "@core/constants/logger";
	import context, { setupTheme, switchTheme } from "@core/contexts/theme";

	const logger = moleculeLogger.extend("ThemeSwitch");

	context.subscribe((theme) => {
		if (theme) {
			const classList = document.documentElement.classList;
			themeList.forEach((t) => classList.remove(t));
			classList.add(theme);
		}
	});

	const onclick = () => {
		if ($context) {
			logger.debug("[event] click switch theme");
			switchTheme();
		} else {
			logger.warn("[event] click switch theme but no theme defined");
		}
	};

	onMount(() => {
		logger.debug("onMount callback");
		setupTheme();
	});
</script>

<Button class="min-w-14 mx-1 text-center" {onclick}>
	{#if $context}
		{themeMap[$context]}
	{/if}
</Button>

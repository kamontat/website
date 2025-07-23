<script lang="ts">
	import type { LocaleName } from "@models/locales";

	import { onMount } from "svelte";
	import { context, setupLocale, switchLocale } from "@app";
	import { getLocaleName, getLocales, getPathWithLocale } from "@utils/i18n";
	import { newLogger } from "@utils/logger";

	interface Props {
		currentLocale: LocaleName;
		/** Set to Astro.url */
		currentUrl: URL;
	}

	const logger = newLogger("components", "common", "LocaleSwitch");

	const { currentUrl, currentLocale }: Props = $props();
	const other = getLocales().filter((l) => l !== currentLocale);

	onMount(() => {
		logger.debug("onMount callback");
		setupLocale();
		switchLocale(currentLocale);
	});
</script>

<div>
	{#each other as locale}
		<a class:mx-2={true} href={getPathWithLocale(currentUrl.pathname, locale)}>
			{getLocaleName(locale)}
		</a>
	{/each}
</div>

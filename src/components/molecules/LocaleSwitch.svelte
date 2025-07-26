<script lang="ts">
	import type { BaseProps } from "@core/types/svelte";
	import type { LocaleName } from "@core/types";

	import { onMount } from "svelte";
	import { moleculeLogger } from "@core/constants/logger";
	import { setupLocale, switchLocale } from "@core/contexts";
	import { getLocaleRoutes } from "@core/models/route";
	import { getLocaleName } from "@core/utils/locale";

	type Props = BaseProps<{
		currentLocale: LocaleName;
		/** Set to Astro.url */
		currentUrl: URL;
	}>;

	let { currentUrl, currentLocale }: Props = $props();
	const logger = moleculeLogger.extend("LocaleSwitch");

	let other = getLocaleRoutes(currentUrl.pathname, currentLocale);

	onMount(() => {
		logger.debug("onMount callback");
		setupLocale();
		switchLocale(currentLocale);
	});
</script>

<div>
	{#each other as path}
		<a class="mx-2" href={path.url} hreflang={path.locale}>
			{getLocaleName(path.locale)}
		</a>
	{/each}
</div>

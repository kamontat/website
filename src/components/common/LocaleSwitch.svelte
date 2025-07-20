<script lang="ts">
	import {
		getLocaleName,
		getLocales,
		getPathWithLocale,
		type Locale,
	} from "@utils/i18n";

	interface Props {
		currentLocale: Locale;
		/** Set to Astro.url */
		currentUrl: URL;
	}

	const { currentUrl, currentLocale }: Props = $props();
	const other = getLocales().filter((l) => l !== currentLocale);
</script>

<div>
	{#each other as locale}
		<a class:mx-2={true} href={getPathWithLocale(currentUrl.pathname, locale)}>
			{getLocaleName(locale)}
		</a>
	{/each}
</div>

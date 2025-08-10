<script lang="ts">
	import type { BaseProps } from "@core/types/svelte";
	import type { LocaleName } from "@core/types";

	import { onMount } from "svelte";
	import Link from "@components/atoms/Link.svelte";

	import { moleculeLogger } from "@core/constants/logger";
	import { setupLocale, switchLocale } from "@core/contexts/locale";
	import { getLocaleRoutes } from "@core/models/route";
	import { getLocaleName } from "@core/utils/locale";

	type Props = BaseProps<{
		currentLocale: LocaleName;
		/** Set to Astro.url */
		currentUrl: URL;
		/** Set to true, to hidden locale switch if page not existed */
		autoHidden: boolean;
	}>;

	let { currentUrl, currentLocale, autoHidden }: Props = $props();
	const logger = moleculeLogger.extend("LocaleSwitch");

	let other = getLocaleRoutes(currentUrl.pathname, currentLocale);
	let promise = Promise.all(
		other.map(async (r) => {
			if (autoHidden) {
				try {
					const response = await fetch(r.url, {
						method: "HEAD",
						cache: "no-cache",
						keepalive: false,
						redirect: "error",
						mode: "same-origin",
					});
					logger.warn(
						`checking validate url "%s": %s`,
						response.url,
						response.ok,
					);

					return { ...r, enabled: response.ok };
				} catch (error) {
					logger.warn(`Cannot validate url: %s`, error);
					return { ...r, enabled: false };
				}
			}
			return { ...r, enabled: true };
		}),
	);

	onMount(() => {
		logger.debug("onMount callback");
		setupLocale();
		switchLocale(currentLocale);
	});
</script>

{#await promise}
	<div class="min-w-20 mx-1"></div>
{:then paths}
	{#each paths as path}
		{#if path.enabled}
			<Link
				class="min-w-20 mx-1 text-center"
				href={path.url}
				hreflang={path.locale}
			>
				{getLocaleName(path.locale)}
			</Link>
		{/if}
	{/each}
{/await}

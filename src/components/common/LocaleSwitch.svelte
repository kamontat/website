<script lang="ts">
	import { getLocales, type Locale } from "@utils/i18n";
	import { getRelativeLocaleUrl } from "astro:i18n";

	interface Props {
		current: Locale;
	}

	const { current }: Props = $props();
</script>

<a
	href={getRelativeLocaleUrl(current === "en" ? "th" : "en")}
	class:mx-2={true}
>
	{current}
</a>

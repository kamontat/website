<script lang="ts">
	import type { BaseProps, WithChildren } from "@core/types/svelte";
	import type { LocaleName } from "@core/types";

	import { context } from "@core/contexts";
	import { moleculeLogger } from "@core/constants/logger";
	import Div from "@components/atoms/Div.svelte";

	type Props = BaseProps<{
		currentLocale: LocaleName;
	}> &
		WithChildren;

	let { children }: Props = $props();
	const logger = moleculeLogger.extend("Sidebar");
</script>

<aside
	class={[
		"absolute",
		"pt-12",
		"z-20",
		"h-full w-full md:w-46",
		"opacity-95 sm:opacity-90",
		"bg-secondary-light dark:bg-secondary-dark black:bg-secondary-black",
		"text-on-secondary-light dark:text-on-secondary-dark black:text-on-secondary-black",
		"transition-transform duration-100 sm:duration-250 ease-in",
		"overflow-x-hidden",
		$context.sidebar || "-translate-x-full",
	]}
	onblur={() => logger.debug("on:blur")}
>
	<Div class="mt-8 mx-6 text-xl items-center">
		<Div class="items-start gap-1">
			{@render children()}
		</Div>
	</Div>
</aside>

<script lang="ts">
	import type { BaseProps, WithChildren } from "@core/types/svelte";
	import type { LocaleName } from "@core/types";

	import { context } from "@core/contexts";
	import { moleculeLogger } from "@core/constants/logger";

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
		"h-full sm:w-50",
		"opacity-90",
		"bg-blue-200 dark:bg-blue-500 black:bg-blue-800",
		"transition-transform delay-150 duration-200 ease-in",
		"overflow-x-hidden",
		$context.sidebar || "-translate-x-full",
	]}
	onblur={() => logger.debug("on:blur")}
>
	<div class="mt-8 mx-6 text-xl items-center">
		<div class="items-start gap-3">
			{@render children()}
		</div>
	</div>
</aside>

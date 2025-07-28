<script lang="ts">
	import type { BaseProps, HTMLSnippet, WithSnippet } from "@core/types/svelte";

	type Props = BaseProps &
		WithSnippet<{
			left?: HTMLSnippet;
			right?: HTMLSnippet;
		}>;

	const { left, right }: Props = $props();
</script>

<nav
	class={[
		"h-12",
		"flex flex-row items-center justify-between",
		"px-2 sm:px-4 lg:px-6",
		"bg-blue-300 dark:bg-blue-600 black:bg-blue-900",
		"z-999",
	]}
>
	<div class="flex flex-1 flex-row items-center justify-stretch">
		{#if left}
			{@render left()}
		{/if}
	</div>
	<div class="flex flex-row">
		{#if right}
			{@render right()}
		{/if}
	</div>
</nav>

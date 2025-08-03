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
	data-component-name="Navigation"
	class={[
		"h-12",
		"flex flex-row items-center justify-between",
		"px-2 sm:px-4 lg:px-6",
		"bg-primary-light dark:bg-primary-dark black:bg-primary-black",
		"text-on-primary-light dark:text-on-primary-dark black:text-on-primary-black",
		"z-999",
	]}
>
	<div
		class="flex flex-1 flex-row items-center justify-stretch flex-nowrap text-nowrap"
	>
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

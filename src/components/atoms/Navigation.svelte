<script lang="ts">
	import type {
		BaseProps,
		HTMLSnippet,
		WithElement,
		WithSnippet,
	} from "@core/types/svelte";
	import Div from "./Div.svelte";

	type Props = BaseProps<{
		leftClass?: string;
		rightClass?: string;
	}> &
		WithSnippet<{
			left?: HTMLSnippet;
			right?: HTMLSnippet;
		}> &
		WithElement<"nav">;

	const {
		left,
		leftClass,
		right,
		rightClass,
		class: className,
		...rest
	}: Props = $props();
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
		className,
	]}
	{...rest}
>
	<Div class={["flex-1 flex-row items-center flex-nowrap", leftClass]}>
		{#if left}
			{@render left()}
		{/if}
	</Div>
	<Div class={["flex-row items-center flex-nowrap", rightClass]}>
		{#if right}
			{@render right()}
		{/if}
	</Div>
</nav>

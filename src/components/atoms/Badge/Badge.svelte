<script lang="ts">
	import type {
		BaseProps,
		WithChildren,
		WithComponent,
	} from "@core/types/svelte";
	import Div from "@components/atoms/Div/Div.svelte";
	import Icon from "@components/atoms/Icon/Icon.svelte";

	type Props = BaseProps<{
		iconClass?: string;
	}> &
		Partial<WithChildren> &
		WithComponent<typeof Div>;
	let { iconClass, children, class: className, ...rest }: Props = $props();
</script>

<Div
	class={[
		className,
		"flex flex-row w-fit border rounded-md items-center",
		children === undefined ? "p-2" : "px-3 py-2",
	]}
	{...rest}
>
	{#if iconClass}
		<Icon class={iconClass} />
	{/if}
	<span class="text-center text-lg font-mono">
		{@render children?.()}
	</span>
</Div>

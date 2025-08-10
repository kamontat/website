<script lang="ts">
	import type {
		BaseProps,
		WithChildren,
		WithComponent,
	} from "@core/types/svelte";
	import Div from "@components/atoms/Div.svelte";
	import Icon from "@components/atoms/Icon.svelte";
	import Link from "@components/atoms/Link.svelte";

	type DefaultProps = BaseProps<{
		iconClass?: string;
	}> &
		Partial<WithChildren>;

	type LinkProps = DefaultProps & WithComponent<typeof Link>;
	type DivProps = DefaultProps & WithComponent<typeof Div>;

	type Props = LinkProps & DivProps;
	let {
		iconClass,
		children,
		class: className,
		href,
		...rest
	}: Props = $props();

	const Component = href ? Link : Div;
</script>

<Component
	href={href!}
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
</Component>

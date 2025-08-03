<script lang="ts">
	import type { BaseProps, WithComponent } from "@core/types/svelte";
	import Div from "@components/atoms/Div.svelte";

	type Props = BaseProps & WithComponent<typeof Div>;

	let { children, class: className, ...rest }: Props = $props();
</script>

<Div
	class={["min-h-full w-full pb-4 pt-6 px-12 md:px-52", className]}
	{...rest}
>
	{@render children()}
</Div>

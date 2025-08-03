<script lang="ts">
	import type { BaseProps, WithComponent } from "@core/types/svelte";
	import Div from "@components/atoms/Div.svelte";

	type Props = BaseProps & WithComponent<typeof Div>;

	let { class: className, children, ...rest }: Props = $props();
</script>

<Div class="min-h-full w-full px-12 md:px-52 items-center justify-center">
	<Div
		class={[
			className,
			"items-center",
			"mb-4",
			"mt-6",
			"px-6",
			"md:px-0",
			"sm:px-10",
		]}
		{...rest}>{@render children()}</Div
	>
</Div>

<script lang="ts">
	import Div from "@components/atoms/Div.svelte";
	import type { ComponentProps } from "svelte";

	let {
		class: className,
		children,
		...rest
	}: ComponentProps<typeof Div> = $props();
</script>

<Div class="min-h-100% w-100% items-center justify-center">
	<Div class={[className, "items-center"]} {...rest}>{@render children()}</Div>
</Div>

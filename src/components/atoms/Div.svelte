<script lang="ts">
	import type { SvelteHTMLElements } from "svelte/elements";

	type Div = Required<Pick<SvelteHTMLElements["div"], "children">> &
		Omit<SvelteHTMLElements["div"], "children">;

	let { children, ...rest }: Div = $props();
</script>

<div {...rest}>
	{@render children()}
</div>

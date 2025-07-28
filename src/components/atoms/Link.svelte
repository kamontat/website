<script lang="ts">
	import type {
		BaseProps,
		WithChildren,
		WithElement,
	} from "@core/types/svelte";

	type Props = BaseProps & WithElement<"a"> & WithChildren;
	let { children, ...rest }: Props = $props();
</script>

<a {...rest}>{@render children()}</a>

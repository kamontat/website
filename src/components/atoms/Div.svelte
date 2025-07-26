<script lang="ts">
	import type {
		BaseProps,
		WithChildren,
		WithElement,
	} from "@core/types/svelte";

	type Props = BaseProps & WithChildren & WithElement<"div">;

	let { children, ...rest }: Props = $props();
</script>

<div {...rest}>
	{@render children()}
</div>

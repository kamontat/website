<script lang="ts">
	import type {
		BaseProps,
		WithChildren,
		WithElement,
	} from "@core/types/svelte";

	type Props = BaseProps & WithElement<"button"> & WithChildren;
	let { class: className, children, ...rest }: Props = $props();
</script>

<button
	data-component-name="Button"
	class={["px-3 py-2 rounded-lg", className]}
	{...rest}
>
	{@render children()}
</button>

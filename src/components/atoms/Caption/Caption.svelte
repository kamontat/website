<script lang="ts">
	import type {
		BaseProps,
		WithChildren,
		WithElement,
	} from "@core/types/svelte";

	type Props = BaseProps & WithChildren & WithElement<"small">;

	let { children, class: className, ...rest }: Props = $props();
</script>

<small
	data-component-name="Caption"
	class={[
		"text-sm font-light text-gray-600 black:text-gray-300 dark:text-gray-400",
		className,
	]}
	{...rest}
>
	{@render children()}
</small>

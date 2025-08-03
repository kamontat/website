<script lang="ts">
	import type {
		BaseProps,
		WithChildren,
		WithElement,
	} from "@core/types/svelte";

	type Props = BaseProps & WithChildren & WithElement<"p">;
	let { children, class: className, ...rest }: Props = $props();
</script>

<p
	class={[
		className,
		"text-base text-black dark:text-gray-100 black:text-white",
	]}
	{...rest}
>
	{@render children()}
</p>

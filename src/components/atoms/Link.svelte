<script lang="ts">
	import type {
		BaseProps,
		WithChildren,
		WithElement,
	} from "@core/types/svelte";

	type Props = BaseProps<{
		reload?: boolean;
	}> &
		WithElement<"a"> &
		WithChildren;
	let { class: className, reload = false, children, ...rest }: Props = $props();
</script>

<a
	data-component-name="Link"
	data-astro-reload={reload}
	class={["px-3 py-2 rounded-lg", className]}
	{...rest}
>
	{@render children()}
</a>

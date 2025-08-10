<script lang="ts">
	import type {
		BaseProps,
		WithChildren,
		WithElement,
	} from "@core/types/svelte";

	type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

	type Props = BaseProps<{
		level: HeadingLevel;
	}> &
		WithChildren &
		WithElement<"h1">;

	const classMap = {
		1: "text-4xl font-sans font-bold tracking-wider",
		2: "text-3xl font-sans font-bold tracking-wider",
		3: "text-2xl font-sans font-bold tracking-wider",
		4: "text-xl font-sans font-medium tracking-wide",
		5: "text-lg font-sans font-medium",
		6: "text-base font-sans font-light",
	};

	let { level, children, class: className, ...rest }: Props = $props();
</script>

<svelte:element
	this={`h${level}`}
	class={[classMap[level], className]}
	data-component-name="Heading"
	{...rest}
>
	{@render children()}
</svelte:element>

<script lang="ts">
	import type {
		BaseProps,
		WithChildren,
		WithElement,
	} from "@core/types/svelte";

	type HeadingLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6;

	type Props = BaseProps<{
		level: HeadingLevel;
	}> &
		WithChildren &
		WithElement<"h1">;

	const classMap = {
		0: "",
		1: "text-4xl font-sans font-bold tracking-wider mt-4",
		2: "text-3xl font-sans font-bold tracking-wider mt-3",
		3: "text-2xl font-sans font-bold tracking-wider mt-2",
		4: "text-xl font-sans font-medium tracking-wide mt-2",
		5: "text-lg font-sans font-medium mt-1",
		6: "text-base font-sans font-light mt-1",
	};

	let { level, children, class: className, ...rest }: Props = $props();
</script>

<svelte:element
	this={level > 0 ? `h${level}` : "span"}
	class={[classMap[level], className]}
	data-component-name="Heading"
	{...rest}
>
	{@render children()}
</svelte:element>

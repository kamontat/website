<script lang="ts">
	import type {
		BaseProps,
		WithOptionalPolymorphic,
		HTMLTag,
		WithElement,
	} from "@core/types/svelte";

	type Size = "sm" | "md" | "lg";
	type Props<Tag extends HTMLTag> = BaseProps<{
		class: string;
		size?: Size;
	}> &
		WithOptionalPolymorphic<Tag> &
		WithElement<Tag>;

	let { as, class: className, size, ...rest }: Props<HTMLTag> = $props();
	const sizeMap: Record<Size, string> = {
		sm: "text-xl",
		md: "text-2xl",
		lg: "text-4xl",
	};
</script>

<svelte:element
	this={as ?? "i"}
	aria-hidden={as === "i"}
	class={[sizeMap[size ?? "md"], "mx-2", className]}
	data-component-name="Icon"
	{...rest}
>
</svelte:element>

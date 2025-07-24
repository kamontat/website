<!-- ---


const { as, class: className, size, ...rest } = Astro.props;

const Tag = as ?? "i";
--- -->

<script lang="ts">
	import type { HTMLTag, Polymorphic } from "astro/types";

	type Props<T extends HTMLTag> = Polymorphic<{ as: T }> & {
		class: string;
		size: "sm" | "md" | "lg";
	};

	const { as, class: className, size, ...rest }: Props<HTMLTag> = $props();
	const sizeMap: Record<string, string> = {
		sm: "text-xl",
		md: "text-2xl",
		lg: "text-4xl",
	};
</script>

<svelte:element
	this={as ?? "i"}
	aria-hidden="true"
	class={[sizeMap[size ?? "md"], "mx-2", className]}
	{...rest}
>
</svelte:element>

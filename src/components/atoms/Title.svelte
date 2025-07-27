<script lang="ts">
	import type { BaseProps, WithElement } from "@core/types/svelte";

	type Props = BaseProps<{
		text: string;
	}> &
		Omit<WithElement<"h1">, "class">;

	let { text, ...rest }: Props = $props();
</script>

<div class="flex-row items-center justify-center mt-4">
	<h1 class="text-4xl font-bold" {...rest}>{text}</h1>
</div>

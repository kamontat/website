<script lang="ts">
	import type { BaseProps } from "@core/types/svelte";

	type Props = BaseProps<{
		text: string;
	}>;

	let { text }: Props = $props();
</script>

<div class="flex-row items-center justify-center mt-4">
	<h1 class="text-4xl font-bold">{text}</h1>
</div>

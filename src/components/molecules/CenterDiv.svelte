<script lang="ts">
	import type { BaseProps, WithComponent } from "@core/types/svelte";
	import Div from "@components/atoms/Div.svelte";

	type Props = BaseProps & WithComponent<typeof Div>;

	let { class: className, children, ...rest }: Props = $props();
</script>

<Div class="min-h-100% w-100% items-center justify-center">
	<Div class={[className, "items-center"]} {...rest}>{@render children()}</Div>
</Div>

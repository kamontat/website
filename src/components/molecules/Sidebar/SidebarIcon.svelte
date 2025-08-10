<script lang="ts">
	import Icon from "@components/atoms/Icon.svelte";
	import { toggleSidebar } from "@core/contexts/sidebar";
</script>

<Icon
	as="button"
	class="i-lineicons:menu-hamburger-1"
	size="md"
	onclick={toggleSidebar}
/>

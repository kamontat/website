<script lang="ts">
	import { atomLogger } from "@core/constants/logger";
	import type { BaseProps } from "@core/types/svelte";

	type Props = BaseProps<{
		gtmId?: string;
	}>;

	let { gtmId }: Props = $props();
	const logger = atomLogger.extend("GTMServer");

	logger.debug("initiate gtm.js id: %s", gtmId);
</script>

{#if gtmId}
	<noscript>
		<iframe
			title="google-tag-manager"
			src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
			height="0"
			width="0"
			class="hidden"
		></iframe>
	</noscript>
{/if}

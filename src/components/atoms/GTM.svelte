<script lang="ts">
	import { atomLogger } from "@core/constants/logger";
	import type { BaseProps } from "@core/types/svelte";

	type Props = BaseProps<{
		gtmId: string;
	}>;

	type GTagFn = (...args: unknown[]) => void;
	type CustomWindow = Window & { dataLayer?: Array<unknown>; gtag?: GTagFn };
	const customWindow = window as CustomWindow;

	let { gtmId }: Props = $props();
	const logger = atomLogger.extend("GTM");
	const gtag: GTagFn = (...args: unknown[]) => {
		logger.debug("push data layer: %o", args);
		customWindow.dataLayer?.push(args);
	};

	customWindow.dataLayer = customWindow.dataLayer || [];
	customWindow.gtag = gtag;
	gtag("js", new Date());
	gtag("config", gtmId);
</script>

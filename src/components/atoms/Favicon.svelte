<script lang="ts">
	import type { BaseProps } from "@core/types/svelte";
	import type { ThemeName } from "@core/types";
	import { context } from "@core/contexts";
	import { atomLogger } from "@core/constants/logger";

	type Props = BaseProps<{
		base?: string;
		light?: string;
		dark?: string;
		black?: string;
	}>;

	let { base = "/favicon.ico", light, dark, black }: Props = $props();
	const logger = atomLogger.extend("Favicon");

	const getIcon = (theme: ThemeName | undefined) => {
		logger.debug("get icon from theme: %s", theme);
		if (theme === "light") return light ?? base;
		if (theme === "dark") return dark ?? base;
		if (theme === "black") return black ?? dark ?? base;
		return base;
	};

	let icon = $state(base);
	context.subscribe(({ theme }) => {
		icon = getIcon(theme);
		logger.debug("switch icon: %s (theme=%s)", $state.snapshot(icon), theme);
	});
</script>

<svelte:head>
	<link rel="icon" type="image/svg+xml" href={icon} />
</svelte:head>

<script lang="ts">
	import type { BaseProps } from "@core/types/svelte";
	import type { ThemeName } from "@core/types";

	import { atomLogger } from "@core/constants/logger";
	import theme from "@core/contexts/theme";

	type Props = BaseProps<{
		base?: string;
		light?: string;
		dark?: string;
		black?: string;
	}>;

	let { base = "/favicon.ico", light, dark, black }: Props = $props();
	const logger = atomLogger.extend("Favicon");

	const getIcon = (theme: ThemeName | undefined) => {
		if (theme === "light") return light ?? base;
		if (theme === "dark") return dark ?? base;
		if (theme === "black") return black ?? dark ?? base;
		return base;
	};

	let icon = $state(base);
	theme.subscribe((t) => {
		const _icon = getIcon(t);
		if (icon === _icon) return;
		logger.debug("switch favicon for theme %s: %s", theme, _icon);
		icon = _icon;
	});
</script>

<svelte:head>
	<link rel="icon" type="image/svg+xml" href={icon} />
</svelte:head>

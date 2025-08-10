<script lang="ts">
	import type { BaseProps } from "@core/types/svelte";

	import context from "@core/contexts/theme";
	import dark from "./dark.svg";
	import light from "./light.svg";
	import transparently from "./transparently.svg";
	import { moleculeLogger } from "@core/constants/logger";

	type SizeUnit = "xs" | "sm" | "md" | "lg";

	type Props = BaseProps<{
		size?: SizeUnit;
		auto?: boolean;
		rounded?: boolean;
	}>;
	let { size = "md", auto = false, rounded = true }: Props = $props();
	const logger = moleculeLogger.extend("KcLogo");
	const sizeMap: Record<SizeUnit, string> = {
		xs: "h-8 w-8 min-w-8",
		sm: "h-12 w-12 min-w-12",
		md: "h-16 w-16 min-w-16",
		lg: "h-20 w-20 min-w-20",
	};

	logger.debug(auto ? "enabled auto mode" : "disabled auto mode");
</script>

{#if auto && $context === "light"}
	<img
		class={{ "rounded-999": rounded, [sizeMap[size]]: true }}
		src={light.src}
		alt="The website logo in light theme"
	/>
{:else if auto && $context === "dark"}
	<img
		class={{ "rounded-999": rounded, [sizeMap[size]]: true }}
		src={dark.src}
		alt="The website logo in dark theme"
	/>
{:else if auto && $context === "black"}
	<img
		class={{ "rounded-999": rounded, [sizeMap[size]]: true }}
		src={dark.src}
		alt="The website logo in black theme"
	/>
{:else}
	<img
		class={{ "rounded-999": rounded, [sizeMap[size]]: true }}
		src={transparently.src}
		alt="The website logo in transparently theme"
	/>
{/if}

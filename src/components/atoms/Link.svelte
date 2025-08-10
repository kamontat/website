<script lang="ts">
	import { atomLogger } from "@core/constants/logger";
	import type {
		BaseProps,
		WithChildren,
		WithElement,
	} from "@core/types/svelte";

	interface UTM {
		source?: string;
		medium: string;
		campaign: string;
		term?: string;
		content?: string;
	}

	type Props = BaseProps<{
		href: string;
		reload?: boolean;
		raw?: boolean;
		utm?: UTM;
		external?: boolean;
	}> &
		Omit<WithElement<"a">, "href"> &
		WithChildren;

	let {
		class: className,
		reload = false,
		raw = false,
		utm,
		external,
		href,
		rel,
		target,
		children,
		...rest
	}: Props = $props();
	const logger = atomLogger.extend("Link");
	const internalLinks = ["kc.in.th"];
	if (typeof external !== "boolean") {
		logger.debug("calculating is external link?");
		if (href.startsWith("https://") || href.startsWith("http://")) {
			const hostname = new URL(href).host.toLowerCase();
			external = internalLinks.some((link) =>
				hostname.endsWith(link.toLowerCase()),
			);
			if (external) logger.debug("treat current link as external");
			else logger.debug("treat current link as internal");
		} else {
			external = false;
			logger.debug("fallback current link as internal");
		}
	}

	const finalRel = rel ?? (external ? "_blank" : undefined);
	const finalTarget = target ?? (external ? "noopener" : undefined);
</script>

<a
	data-component-name="Link"
	data-external={external ? "true" : undefined}
	data-astro-reload={reload}
	class={[{ "px-3 py-1 rounded-lg": !raw }, className]}
	{href}
	rel={finalRel}
	target={finalTarget}
	{...rest}
>
	{@render children()}
</a>

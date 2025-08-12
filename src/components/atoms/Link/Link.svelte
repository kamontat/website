<script lang="ts">
	import type { UTMQuery } from "@core/types";
	import type {
		BaseProps,
		WithChildren,
		WithElement,
	} from "@core/types/svelte";
	import { isExternal, toURL, buildUTM } from "@core/utils/url";

	type Props = BaseProps<{
		href: string;
		/** Set to Astro.site!.origin */
		baseLink: string;
		reload?: true;
		builtinStyles?: boolean;
		prefetch?: true | false | "hover" | "tap" | "viewport" | "load";
		utm?: UTMQuery;
		/** Force treat this as external */
		external?: boolean;
	}> &
		Omit<WithElement<"a">, "href"> &
		WithChildren;

	let {
		href,
		baseLink,
		reload,
		prefetch,
		builtinStyles = true,
		utm,
		external,
		rel,
		target,
		class: className,
		children,
		...rest
	}: Props = $props();
	external = external ?? isExternal(href, baseLink);
	const url = toURL(href, baseLink);

	const finalRel = rel ?? (external ? "_blank" : undefined);
	const finalTarget = target ?? (external ? "noopener" : undefined);
	const finalHref = buildUTM(url, utm).toString();
</script>

<a
	data-component-name="Link"
	data-external={external ? "true" : undefined}
	data-astro-reload={reload ? "true" : undefined}
	data-astro-prefetch={prefetch === true ? undefined : prefetch}
	class={[className, builtinStyles ? "px-3 py-1 rounded-lg" : undefined]}
	href={finalHref}
	rel={finalRel}
	target={finalTarget}
	{...rest}
>
	{@render children()}
</a>

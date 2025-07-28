/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */

import type {
	Component as _SvelteComponent,
	ComponentProps as SvelteComponentProps,
	Snippet,
} from "svelte";
import type {
	HTMLAttributes,
	MouseEventHandler,
	SvelteHTMLElements,
} from "svelte/elements";
import type { SingletonKey } from "../singleton";
import type { DataEntryMap } from "astro:content";

export type HTMLElements = SvelteHTMLElements;
export type HTMLTag = keyof HTMLElements;
export type HTMLSnippet<Parameters extends unknown[] = []> =
	Snippet<Parameters>;

export interface HTMLEvents<Tag extends HTMLTag> {
	onClick: MouseEventHandler<
		HTMLElements[Tag] extends HTMLAttributes<infer E> ? E : never
	>;
}

export type Component<
	Props extends Record<string, any> = {},
	Exports extends Record<string, any> = {},
	Bindings extends keyof Props | "" = string,
> = _SvelteComponent<Props, Exports, Bindings>;

export type AnyComponent = Component<any, any>;

export type BaseProps<Element extends Record<string, any> = {}> = Element;

export type WithSnippet<Snippets extends Record<string, HTMLSnippet>> = {
	[Key in keyof Snippets]: Snippets[Key];
};
export type WithOptionalSnippet<Snippets extends Record<string, HTMLSnippet>> =
	Partial<WithSnippet<Snippets>>;

export type WithChildren<Parameters extends unknown[] = []> = WithSnippet<{
	children: HTMLSnippet<Parameters>;
}>;
export type WithOptionalChildren<Parameters extends unknown[] = []> =
	WithOptionalSnippet<{
		children: HTMLSnippet<Parameters>;
	}>;

export type WithElement<Tag extends HTMLTag> = Omit<
	HTMLElements[Tag],
	"children"
>;

export type WithComponent<Component extends AnyComponent> =
	SvelteComponentProps<Component>;

export type WithPolymorphic<Tag extends HTMLTag> = {
	as: Tag;
};
export type WithOptionalPolymorphic<Tag extends HTMLTag> = Partial<
	WithPolymorphic<Tag>
>;

export type WithEvent<
	Tag extends HTMLTag,
	EventName extends keyof HTMLEvents<Tag>,
> = {
	[Key in EventName]: HTMLEvents<Tag>[Key];
};

export type WithOptionalEvent<
	Tag extends HTMLTag,
	EventName extends keyof HTMLEvents<Tag>,
> = Partial<WithEvent<Tag, EventName>>;

export type WithSingletonEntry<EntryKey extends SingletonKey> = {
	[Key in EntryKey]: DataEntryMap[EntryKey][string];
};

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */

import type {
	Component as _SvelteComponent,
	ComponentProps as SvelteComponentProps,
	Snippet,
} from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

export type HTMLElements = SvelteHTMLElements;
export type HTMLTag = keyof HTMLElements;

export type Component<
	Props extends Record<string, any> = {},
	Exports extends Record<string, any> = {},
	Bindings extends keyof Props | "" = string,
> = _SvelteComponent<Props, Exports, Bindings>;

export type AnyComponent = Component<any, any>;

export type BaseProps<Element extends Record<string, any> = {}> = Element;

export interface WithChildren<Parameters extends unknown[] = []> {
	children: Snippet<Parameters>;
}
export type WithOptionalChildren<Parameters extends unknown[] = []> = Partial<
	WithChildren<Parameters>
>;

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

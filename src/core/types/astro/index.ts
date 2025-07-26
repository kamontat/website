/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */

import type {
	HTMLTag,
	ComponentProps as AstroComponentProps,
	HTMLAttributes as AstroHTMLAttributes,
} from "astro/types";

export type HTMLElements = {
	[Tag in HTMLTag]: AstroHTMLAttributes<Tag>;
};
export type { HTMLTag };

export type Component<Arguments, Component> = (args: Arguments) => Component;
export type AnyComponent = Component<any, any>;

export type BaseProps<Element extends Record<string, any> = {}> = Element;

export interface WithChildren {
	children: Node | Node[];
}
export type WithOptionalChildren = Partial<WithChildren>;

export type WithElement<Tag extends HTMLTag> = Omit<
	AstroHTMLAttributes<Tag>,
	"children"
>;

export type WithComponent<Component extends AnyComponent> =
	AstroComponentProps<Component>;

export type WithPolymorphic<Tag extends HTMLTag> = {
	as: Tag;
};
export type WithOptionalPolymorphic<Tag extends HTMLTag> = Partial<
	WithPolymorphic<Tag>
>;

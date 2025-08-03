import type { AstroMarkdocConfig } from "@astrojs/markdoc/config";
import type {
	AstroMarkdownNodeComponent,
	AstroMarkdownNodeName,
	AstroMarkdownTagComponent,
	AstroMarkdownTagName,
} from "@core/types";

import Heading from "./Heading";
import Paragraph from "./Paragraph";

import Testimonial from "./Testimonial";

export const components = {
	[Testimonial.name]: Testimonial,
	[Heading.name]: Heading,
	[Paragraph.name]: Paragraph,
};

export type ComponentMap = typeof components;

export const astroMarkdocConfig = (): AstroMarkdocConfig => {
	const emptyTags = {} as Record<
		AstroMarkdownTagName,
		AstroMarkdownTagComponent<AstroMarkdownTagName>
	>;
	const emptyNodes = {} as Record<
		AstroMarkdownNodeName,
		AstroMarkdownNodeComponent<AstroMarkdownNodeName>
	>;

	const tags = Object.entries(components)
		.filter(([, value]) => value.type === "tag")
		.reduce((prev, [key, value]) => {
			prev[key as AstroMarkdownTagName] = value.buildAstroConfig();
			return prev;
		}, emptyTags);

	const nodes = Object.entries(components)
		.filter(([, value]) => value.type === "node")
		.reduce((prev, [key, value]) => {
			prev[key as AstroMarkdownNodeName] = value.buildAstroConfig();
			return prev;
		}, emptyNodes);

	return {
		tags,
		nodes,
	};
};

export const keystaticMarkdocConfig = <Name extends keyof ComponentMap>(
	name: Name,
) => {
	const component: ComponentMap[Name] = components[name];
	return {
		[name]: component.buildKeystaticConfig() as ReturnType<
			ComponentMap[Name]["buildKeystaticConfig"]
		>,
	};
};

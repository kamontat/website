import type { ContentComponent } from "@keystatic/core/content-components";
import type { AstroMarkdocConfig } from "@astrojs/markdoc/config";

export type ComponentType = "node" | "tag";

export type KeystaticContentComponent<Type extends ComponentType> =
	Type extends "node" ? undefined : ContentComponent;

export type AstroMarkdownTagName = string;
export type AstroMarkdownNodeName = keyof Required<AstroMarkdocConfig>["nodes"];

export type AstroMarkdownTagComponent<Name extends AstroMarkdownTagName> =
	Required<AstroMarkdocConfig>["tags"][Name];
export type AstroMarkdownNodeComponent<Name extends AstroMarkdownNodeName> =
	Required<Required<AstroMarkdocConfig>["nodes"]>[Name];

export type AstroMarkdownComponentName<Type extends ComponentType> =
	Type extends "node" ? AstroMarkdownNodeName : AstroMarkdownTagName;

export type AstroMarkdownComponent<
	Type extends ComponentType,
	Name extends AstroMarkdownComponentName<Type>,
> = Type extends "node"
	? AstroMarkdownNodeComponent<
			Name extends AstroMarkdownNodeName ? Name : never
		>
	: AstroMarkdownTagComponent<Name>;

export interface IMarkdownComponent<
	Type extends ComponentType,
	Name extends AstroMarkdownComponentName<Type>,
> {
	readonly type: Type;
	readonly name: Name;

	buildKeystaticConfig(): KeystaticContentComponent<Type>;
	buildAstroConfig(): AstroMarkdownComponent<Type, Name>;
}

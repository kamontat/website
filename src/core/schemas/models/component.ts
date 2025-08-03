import type {
	ComponentBuilder,
	AstroMarkdownNodeComponent,
	AstroMarkdownNodeName,
	AstroMarkdownTagComponent,
	AstroMarkdownTagName,
	IMarkdownComponent,
} from "@core/types";
import type { ContentComponent } from "@keystatic/core/content-components";

export class MarkdownTagComponent<
	Name extends AstroMarkdownTagName,
	Builder extends ComponentBuilder,
> implements IMarkdownComponent<"tag", Name>
{
	readonly name: Name;
	readonly type = "tag" as const;

	private config: AstroMarkdownTagComponent<Name>;
	private builder: Builder;
	private builderConfig: Parameters<Builder>[0];
	constructor(
		name: Name,
		builder: Builder,
		builderConfig: Omit<Parameters<Builder>[0], "label">,
		config: AstroMarkdownTagComponent<Name>,
	) {
		this.name = name;
		this.builder = builder;
		this.builderConfig = builderConfig;
		this.config = config;
	}

	buildKeystaticConfig(): ContentComponent {
		return this.builder({
			...this.builderConfig,
			label: this.name,
		});
	}

	buildAstroConfig(): AstroMarkdownTagComponent<Name> {
		return this.config;
	}
}

export class MarkdownNodeComponent<Name extends AstroMarkdownNodeName>
	implements IMarkdownComponent<"node", Name>
{
	readonly name: Name;
	readonly type = "node" as const;

	private config: AstroMarkdownNodeComponent<Name>;
	constructor(name: Name, config: AstroMarkdownNodeComponent<Name>) {
		this.name = name;
		this.config = config;
	}

	buildKeystaticConfig() {
		return undefined;
	}

	buildAstroConfig(): AstroMarkdownNodeComponent<Name> {
		return this.config;
	}
}

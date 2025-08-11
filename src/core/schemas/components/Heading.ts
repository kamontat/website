import { MarkdownNodeComponent } from "../models/component";
import { component, nodes } from "@astrojs/markdoc/config";

export default new MarkdownNodeComponent("heading", {
	...nodes.heading,
	render: component("./src/components/atoms/Heading/Heading.svelte"),
});

import { MarkdownNodeComponent } from "../models/component";
import { component, nodes } from "@astrojs/markdoc/config";

export default new MarkdownNodeComponent("paragraph", {
	...nodes.paragraph,
	render: component("./src/components/atoms/Paragraph/Paragraph.svelte"),
});

import { wrapper } from "@keystatic/core/content-components";
import { MarkdownTagComponent } from "../models/component";
import { component } from "@astrojs/markdoc/config";
import { fields } from "@keystatic/core";

export default new MarkdownTagComponent(
	"Testimonial",
	wrapper,
	{
		schema: {
			author: fields.text({ label: "Author" }),
			role: fields.text({ label: "Role" }),
		},
	},
	{
		render: component("./src/components/molecules/Testimonial.svelte"),
		attributes: {
			author: {
				type: "String",
				required: true,
			},
			role: {
				type: "String",
				required: true,
			},
		},
	},
);

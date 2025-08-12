import { z } from "astro:schema";
import { fields } from "@keystatic/core";

import { getLocales } from "@core/utils/locale";
import { ContentCollectionDataSchema } from "./models";
import { keystaticMarkdocConfig } from "./components";

export default new ContentCollectionDataSchema(
	"posts",
	"Posts",
	z.object({
		title: z.string(),
		pubDate: z.coerce.date(),
		modDate: z.coerce.date().optional(),
	}),
	{
		slug: fields.text({
			label: "Slug",
			validation: {
				isRequired: true,
				pattern: {
					regex: new RegExp(`(${getLocales().join("|")})\\/[\\w\\d-]+`),
				},
			},
		}),
		coverImage: fields.image({
			label: "Cover image",
			description: "The cover post image",
			directory: "src/assets/posts",
			publicPath: "@assets/posts/",
			validation: { isRequired: false },
		}),
		title: fields.text({
			label: "Title",
			validation: { isRequired: true },
		}),
		pubDate: fields.date({
			label: "Publish date",
			defaultValue: { kind: "today" },
			validation: { isRequired: true },
		}),
		modDate: fields.date({
			label: "Modified date",
		}),
		content: fields.markdoc({
			label: "Content",
			extension: "mdoc",
			options: {
				image: {
					directory: "src/assets/posts",
					publicPath: "@assets/posts/",
				},
			},
			components: {
				...keystaticMarkdocConfig("Testimonial"),
			},
		}),
	},
);

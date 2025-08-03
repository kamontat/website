import type { AstroSchema, KeystaticSlugSchema } from "@core/types";

import { z } from "astro:schema";
import { fields } from "@keystatic/core";

import { AbstractCollectionDataSchema } from "./models";
import { getLocales } from "@core/utils/locale";
import { keystaticMarkdocConfig } from "./components";

class PostsDataSchema<
	AS extends AstroSchema,
	KS extends KeystaticSlugSchema,
> extends AbstractCollectionDataSchema<"posts", AS, KS> {
	readonly layout = "content";
	readonly contentField = "content";
	readonly filePattern = "**/*.mdoc";

	constructor(
		readonly astroSchema: AS,
		readonly keystaticSchema: KS,
	) {
		super("posts", "Posts", astroSchema, keystaticSchema);
	}
}

export default new PostsDataSchema(
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

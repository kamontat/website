import type { AstroSchema } from "./models/base";

import { z } from "astro:schema";
import { fields } from "@keystatic/core";

import { localePathRegex } from "@utils/i18n/languages";
import {
	AbstractCollectionDataSchema,
	type KeystaticSlugSchema,
} from "./models";

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
			validation: { isRequired: true, pattern: { regex: localePathRegex } },
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
		}),
	},
);

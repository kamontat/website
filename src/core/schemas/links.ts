import { z } from "astro:schema";
import { fields } from "@keystatic/core";

import { SingletonDataSchema } from "./models";
import { ksLocalised, zodLocalised } from "./i18n";

export default new SingletonDataSchema(
	"links",
	"Links",
	z.object({
		link: z
			.object({
				name: zodLocalised(z.string()),
				url: zodLocalised(z.string()),
			})
			.array(),
	}),
	{
		link: fields.array(
			fields.object({
				name: ksLocalised(fields.text, {
					label: "Name",
					validation: { isRequired: true },
				}),
				url: ksLocalised(fields.url, {
					label: "URL",
					validation: { isRequired: true },
				}),
			}),
		),
	},
);

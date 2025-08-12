import { z } from "astro:schema";
import { fields } from "@keystatic/core";

import { FormCollectionDataSchema } from "./models";
import { ksLocalised, zodLocalised } from "./i18n";

export default new FormCollectionDataSchema(
	"links",
	"Links",
	z.object({
		name: zodLocalised(z.string()),
		url: zodLocalised(z.string()),
		icon: z.string().optional(),
		external: z.boolean().optional(),
		prefetch: z.boolean().optional(),
		quickaccess: z.boolean().optional(),
		priority: z.number().nonnegative().optional(),
	}),
	{
		slug: fields.text({
			label: "Slug",
			validation: { isRequired: true, pattern: { regex: /[a-z]+/ } },
		}),
		name: ksLocalised(fields.text, {
			label: "Name",
			validation: { isRequired: true },
		}),
		type: fields.select({
			label: "Link type",
			defaultValue: "website",
			options: [
				{
					label: "Website",
					value: "website",
				},
				{
					label: "Social media",
					value: "social-media",
				},
				{
					label: "Tool",
					value: "tool",
				},
			],
		}),
		url: ksLocalised(fields.url, {
			label: "URL",
			validation: { isRequired: true },
		}),
		icon: fields.text({
			label: "Icon class",
			description: "Icon class from http://icon-sets.iconify.design/",
			validation: { pattern: { regex: /[a-z-]+:[a-z-]+/ } },
		}),
		external: fields.checkbox({
			label: "External",
		}),
		prefetch: fields.checkbox({
			label: "Prefetch",
		}),
		quickaccess: fields.checkbox({
			label: "Quickaccess",
			description: "Show this links on home page quick access",
		}),
		priority: fields.number({
			label: "Priority",
			description: "Least number shows the highest priority",
			defaultValue: 0,
			step: 1,
			validation: { isRequired: false, min: 0, step: true },
		}),
	},
);

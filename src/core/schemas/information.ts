import { z } from "astro:schema";
import { fields } from "@keystatic/core";

import { SingletonDataSchema } from "./models";
import { zodLocalised, ksLocalised } from "./i18n";

export default new SingletonDataSchema(
	"information",
	"Information",
	({ image }) =>
		z.object({
			profilePicture: image(),
			firstName: zodLocalised(z.string()),
			lastName: zodLocalised(z.string()),
			nickName: zodLocalised(z.string()),
			title: zodLocalised(z.string()),
			company: zodLocalised(z.string()),
			summary: zodLocalised(z.string()),
		}),
	{
		profilePicture: fields.image({
			label: "Profile",
			directory: "src/assets/data",
			publicPath: "@assets/data/",
			validation: { isRequired: false },
		}),
		firstName: ksLocalised(fields.text, {
			label: "First name",
			validation: { isRequired: true },
		}),
		lastName: ksLocalised(fields.text, {
			label: "Last name",
			validation: { isRequired: true },
		}),
		nickName: ksLocalised(fields.text, {
			label: "Nickname",
			validation: { isRequired: true },
		}),
		title: ksLocalised(fields.text, {
			label: "Title",
			validation: { isRequired: true },
		}),
		company: ksLocalised(fields.text, {
			label: "Company",
			validation: { isRequired: true },
		}),
		summary: ksLocalised(fields.text, {
			label: "Summary",
			multiline: true,
			validation: { isRequired: true },
		}),
	},
);

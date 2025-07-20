import { z } from "astro:schema";
import { fields } from "@keystatic/core";
import { ksLocalised, zodLocalised } from "@utils/contents/utils";

import { SingletonDataSchema } from "./models";

export default new SingletonDataSchema(
	"information",
	"Information",
	z.object({
		firstName: zodLocalised(z.string()),
		lastName: zodLocalised(z.string()),
	}),
	{
		profilePicture: fields.image({
			label: "Profile",
			directory: "src/contents/images",
			publicPath: "../images",
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
		summary: ksLocalised(fields.text, {
			label: "Summary",
			multiline: true,
			validation: { isRequired: true },
		}),
	},
);

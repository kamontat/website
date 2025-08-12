import { z } from "astro:schema";
import { fields } from "@keystatic/core";

import { FormCollectionDataSchema } from "./models";
import { ksLocalised, zodLocalised } from "./i18n";

export default new FormCollectionDataSchema(
	"authors",
	"Authors",
	z.object({
		firstName: zodLocalised(z.string()),
		lastName: zodLocalised(z.string()),
		email: z.string(),
		gender: z.enum(["male", "female"]),
		facebook: z.string().optional(),
		x: z.string().optional(),
		medium: z.string().optional(),
		github: z.string().optional(),
	}),
	{
		username: fields.slug({
			name: {
				label: "Username",
				validation: { isRequired: true, length: { min: 3, max: 12 } },
			},
			slug: {
				label: "Slug",
			},
		}),
		firstName: ksLocalised(fields.text, {
			label: "First name",
			validation: { isRequired: true },
		}),
		lastName: ksLocalised(fields.text, {
			label: "Last name",
			validation: { isRequired: true },
		}),
		email: fields.text({
			label: "Email",
			validation: { isRequired: true },
		}),
		gender: fields.select({
			label: "Gender",
			defaultValue: "male",
			options: [
				{
					label: "Male",
					value: "male",
				},
				{
					label: "Female",
					value: "female",
				},
			],
		}),
		facebook: fields.text({
			label: "Facebook username",
			validation: { isRequired: false },
		}),
		x: fields.text({
			label: "X (Twitter) username",
			validation: { isRequired: false },
		}),
		medium: fields.text({
			label: "Medium username",
			validation: { isRequired: false },
		}),
		github: fields.text({
			label: "GitHub username",
			validation: { isRequired: false },
		}),
	},
	"username",
);

import { z } from "astro:schema";
import { fields } from "@keystatic/core";
import { ksLocalised, zodLocalised } from "@utils/contents/utils";

import { SingletonDataSchema } from "./models";

export default new SingletonDataSchema(
	"ui",
	"UI",
	z.object({
		"page.home.title": zodLocalised(z.string()),
		"page.home.description": zodLocalised(z.string()),
		"page.blog.title": zodLocalised(z.string()),
	}),
	{
		"page.home.title": ksLocalised(fields.text, {
			label: "Home page title",
			description:
				"The title of the home page, displayed in the header and as the page title.",
		}),
		"page.home.description": ksLocalised(fields.text, {
			label: "Home page description",
			description:
				"The description of the home page as well as default description on html meta data.",
		}),
		"page.blog.title": ksLocalised(fields.text, {
			label: "Blog page title",
			description:
				"The title of the home page, displayed in the header and as the page title.",
		}),
	},
);

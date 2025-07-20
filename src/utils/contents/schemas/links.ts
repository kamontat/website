import { z } from "astro:schema";
import { fields } from "@keystatic/core";

import { SingletonDataSchema } from "./models";

export default new SingletonDataSchema(
	"links",
	"Links",
	z.object({
		facebook: z.string().url().optional(),
		x: z.string().url().optional(),
	}),
	{
		facebook: fields.url({ label: "Facebook" }),
		x: fields.url({ label: "X (Twitter)" }),
	},
);

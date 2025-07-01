import { config, fields, collection, singleton } from "@keystatic/core";
import { localised, localesRegex } from "@utils/keystatic/locales";
// import { GITHUB_REPOSITORY } from "astro:env/client";

// const [owner, name] = GITHUB_REPOSITORY.split("/");
export default config({
	storage: {
		kind: "local",
	},
	locale: "en-US",
	singletons: {
		information: singleton({
			label: "Information",
			path: "src/contents/data/information",
			schema: {
				firstName: localised(fields.text, {
					label: "First name",
					validation: { isRequired: true },
				}),
				lastName: localised(fields.text, {
					label: "Last name",
					validation: { isRequired: true },
				}),
				nickName: localised(fields.text, {
					label: "Nickname",
					validation: { isRequired: true },
				}),
				summary: localised(fields.text, {
					label: "Summary",
					multiline: true,
					validation: { isRequired: true },
				}),
			},
		}),
		links: singleton({
			label: "Links",
			path: "src/contents/data/links",
			schema: {
				facebook: fields.url({ label: "Facebook" }),
				x: fields.url({ label: "X (Twitter)" }),
			},
		}),
	},
	collections: {
		posts: collection({
			label: "Posts",
			slugField: "slug",
			path: "src/contents/posts/**",
			format: { contentField: "content" },
			entryLayout: "content",
			schema: {
				slug: fields.text({
					label: "Slug",
					validation: { isRequired: true, pattern: { regex: localesRegex } },
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
							directory: "src/contents/images",
							publicPath: "../images/",
						},
					},
				}),
			},
		}),
	},
});

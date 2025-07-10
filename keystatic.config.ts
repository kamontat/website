import type { LocalConfig, GitHubConfig } from "@keystatic/core";
import { config, fields, collection, singleton } from "@keystatic/core";
import { localised, localesRegex } from "@utils/keystatic/locales";
import { CI, GITHUB_REPOSITORY } from "astro:env/client";

const [owner, name] = GITHUB_REPOSITORY.split("/");

const storage = CI
	? ({
		kind: "github",
		repo: { owner, name },
	} satisfies GitHubConfig["storage"])
	: ({
		kind: "local",
	} satisfies LocalConfig["storage"]);

export default config({
	storage,
	locale: "en-US",
	singletons: {
		information: singleton({
			label: "Information",
			path: "src/contents/data/information",
			schema: {
				profilePicture: fields.image({
					label: "Profile",
					directory: "src/contents/images",
					publicPath: "../images",
					validation: { isRequired: false }
				}),
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

import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
	storage: {
		kind: 'local',
	},
	locale: "en-US",
	singletons: {
		information: singleton({
			label: "Information",
			path: 'src/data/information',
			schema: {
				firstName: fields.text({ label: "First name" }),
				lastName: fields.text({ label: "Last name" })
			}
		})
	},
	collections: {
		posts: collection({
			label: 'Posts',
			slugField: 'title',
			path: 'src/blog/posts/*',
			format: { contentField: 'content' },
			entryLayout: 'content',
			schema: {
				title: fields.slug({ name: { label: 'Title' } }),
				pubDate: fields.date({ label: "Publish date" }),
				modDate: fields.date({ label: "Modified date" }),
				content: fields.markdoc({
					label: 'Content',
					extension: "mdoc",
					options: {
						image: {
							directory: 'src/blog/images',
							publicPath: '../images/',
						}
					}
				}),
			},
		}),
	},
});

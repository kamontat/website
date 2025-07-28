import { context } from "./context";

export const toggleSidebar = () => {
	context.update((ctx) => {
		return { ...ctx, sidebar: !ctx.sidebar };
	});
};

export const closeSidebar = () => {
	context.update((ctx) => ({ ...ctx, sidebar: false }));
};

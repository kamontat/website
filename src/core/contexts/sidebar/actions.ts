import context from "./context";
import logger from "./logger";

/**
 * must run on svelte island with 'client:load' directive
 */
export const toggleSidebar = () => {
	context.update((flag) => {
		logger.debug("toggling sidebar from %s to %s", flag, !flag);
		return !flag;
	});
};

export const closeSidebar = () => {
	logger.debug("closing sidebar");
	context.set(false);
};

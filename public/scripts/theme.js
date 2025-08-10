/* eslint-disable no-undef */

const addTheme = (theme) => {
	const doc = document.documentElement;
	doc.classList.entries().forEach(([, item]) => doc.classList.remove(item));
	doc.classList.add(theme);
};

(function () {
	const item = localStorage.getItem("theme");
	const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

	if (item) {
		addTheme(item);
	} else if (isDark) {
		addTheme("dark");
	}
})();

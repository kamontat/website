import type { DefaultThemeName, ThemeMapper, ThemeName } from "@core/types";

export const themeMap = {
	light: "Light",
	dark: "Dark",
	black: "Black",
} as const satisfies ThemeMapper;

export const themeList: ThemeName[] = ["light", "dark", "black"];

export const defaultTheme: DefaultThemeName = "dark";

export const themeMap = {
	light: "Light",
	dark: "Dark",
	black: "Black",
} as const;

export const themeList = ["light", "dark", "black"] as const;

export type ThemeName = keyof typeof themeMap;
export const defaultTheme: ThemeName = "dark";

import _debug from "debug";
import { name } from "@config/package";

export const APP = name;
export const SEP = ":" as const;
export const LEVELS = ["debug", "info", "warn", "error"];

export const base = _debug(APP);
export const debug = base.extend("debug", SEP);
export const info = base.extend("info", SEP);
export const warn = base.extend("warn", SEP);
export const error = base.extend("error", SEP);

import type { ThemeName } from "@core/types";
import { newContext } from "@core/models/context";

const context = newContext<ThemeName | undefined>("theme", undefined);
export default context;

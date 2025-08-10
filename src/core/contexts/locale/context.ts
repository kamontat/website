import type { LocaleName } from "@core/types";
import { newContext } from "@core/models/context";

const context = newContext<LocaleName | undefined>("locale", undefined);
export default context;

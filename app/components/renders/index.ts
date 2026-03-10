import { shadcnControlRenderers } from "./control";
import { complexRenderers } from "./complex";

export const shadcnRenderers = [...shadcnControlRenderers, ...complexRenderers];

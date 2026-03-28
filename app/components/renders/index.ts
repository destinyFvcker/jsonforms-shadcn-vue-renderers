import { shadcnControlRenderers } from "./control";
import { complexRenderers } from "./complex";
import { layoutRenderers } from "./layouts";
import { arrayRenderers } from "./array";

export const shadcnRenderers = [...shadcnControlRenderers, ...complexRenderers, ...layoutRenderers, ...arrayRenderers];

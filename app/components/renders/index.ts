import { shadcnControlRenderers } from "./control";
import { complexRenderers } from "./complex";
import { layoutRenderers } from "./layouts";

export const shadcnRenderers = [...shadcnControlRenderers, ...complexRenderers, ...layoutRenderers];

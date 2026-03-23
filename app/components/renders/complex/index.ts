import { entry as OneOfRendererEntry } from "./OneOfRenderer.entry";
import { entry as ObjectRendererEntry } from "./ObjectRenderer.entry";
import { entry as AnyOfRendererEntry } from "./AnyOfRenderer.entry";

export const complexRenderers = [OneOfRendererEntry, ObjectRendererEntry, AnyOfRendererEntry];

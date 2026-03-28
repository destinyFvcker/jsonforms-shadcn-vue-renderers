import { rankWith, schemaTypeIs, type JsonFormsRendererRegistryEntry } from "@jsonforms/core";
import controlRenderer from "./ArrayListRenderer.vue";

export const entry: JsonFormsRendererRegistryEntry = {
	renderer: controlRenderer,
	tester: rankWith(8, schemaTypeIs("array")),
};

import type { JsonFormsRendererRegistryEntry } from "@jsonforms/core";
import { rankWith, isObjectControl } from "@jsonforms/core";
import { default as controlRenderer } from "./ObjectRenderer.vue";

export const entry: JsonFormsRendererRegistryEntry = {
	renderer: controlRenderer,
	tester: rankWith(4, isObjectControl),
};

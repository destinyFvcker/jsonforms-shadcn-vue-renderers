import type { JsonFormsRendererRegistryEntry } from "@jsonforms/core";
import { rankWith, isOneOfControl } from "@jsonforms/core";
import { default as controlRenderer } from "./OneOfRenderer.vue";

export const entry: JsonFormsRendererRegistryEntry = {
	renderer: controlRenderer,
	tester: rankWith(5, isOneOfControl),
};

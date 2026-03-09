import type { JsonFormsRendererRegistryEntry } from "@jsonforms/core";
import { rankWith, isIntegerControl } from "@jsonforms/core";
import { default as controlRenderer } from "./IntegerControlRenderer.vue";

export const entry: JsonFormsRendererRegistryEntry = {
	renderer: controlRenderer,
	tester: rankWith(3, isIntegerControl),
};

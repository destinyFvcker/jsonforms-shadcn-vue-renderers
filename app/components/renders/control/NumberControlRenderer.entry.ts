import type { JsonFormsRendererRegistryEntry } from "@jsonforms/core";
import { rankWith, isNumberControl } from "@jsonforms/core";
import { default as controlRenderer } from "./NumberControlRenderer.vue";

export const entry: JsonFormsRendererRegistryEntry = {
	renderer: controlRenderer,
	tester: rankWith(5, isNumberControl),
};

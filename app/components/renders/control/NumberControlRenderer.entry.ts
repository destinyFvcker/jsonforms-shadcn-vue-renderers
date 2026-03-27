import type { JsonFormsRendererRegistryEntry } from "@jsonforms/core";
import { rankWith, isNumberControl } from "@jsonforms/core";
import controlRenderer from "./NumberControlRenderer.vue";

export const entry: JsonFormsRendererRegistryEntry = {
	renderer: controlRenderer,
	tester: rankWith(5, isNumberControl),
};

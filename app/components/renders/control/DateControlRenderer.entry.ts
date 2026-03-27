import { isDateControl, rankWith, type JsonFormsRendererRegistryEntry } from "@jsonforms/core";
import controlRenderer from "./DateControlRenderer.vue";

export const entry: JsonFormsRendererRegistryEntry = {
	renderer: controlRenderer,
	tester: rankWith(4, isDateControl),
};

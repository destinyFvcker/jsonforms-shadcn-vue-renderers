import { isDateTimeControl, rankWith, type JsonFormsRendererRegistryEntry } from "@jsonforms/core";
import controlRenderer from "./DateTimeControlRenderer.vue";

export const entry: JsonFormsRendererRegistryEntry = {
	renderer: controlRenderer,
	tester: rankWith(4, isDateTimeControl),
};

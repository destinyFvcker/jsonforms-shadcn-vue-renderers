import { isAllOfControl, rankWith, type JsonFormsRendererRegistryEntry } from "@jsonforms/core";
import controlRenderer from "./AllOfRenderer.vue";

export const entry: JsonFormsRendererRegistryEntry = {
	renderer: controlRenderer,
	tester: rankWith(5, isAllOfControl),
};

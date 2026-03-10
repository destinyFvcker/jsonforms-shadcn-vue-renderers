import { isLayout, rankWith, uiTypeIs, type JsonFormsRendererRegistryEntry } from "@jsonforms/core";
import { default as layoutRenderer } from "./LayoutRenderer.vue";

export const entry: JsonFormsRendererRegistryEntry = {
	renderer: layoutRenderer,
	tester: rankWith(4, isLayout),
};

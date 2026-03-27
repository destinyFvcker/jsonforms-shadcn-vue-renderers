import { type JsonFormsRendererRegistryEntry, rankWith, isBooleanControl } from "@jsonforms/core";
import controlRenderer from "./BooleanToggleControlRenderer.vue";

export const entry: JsonFormsRendererRegistryEntry = {
	renderer: controlRenderer,
	tester: rankWith(3, isBooleanControl),
};

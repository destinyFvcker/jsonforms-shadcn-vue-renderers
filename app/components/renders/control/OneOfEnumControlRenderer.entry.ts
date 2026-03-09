import { type JsonFormsRendererRegistryEntry, rankWith, isOneOfEnumControl } from "@jsonforms/core";
import { default as controlRenderer } from "./OneOfEnumControlRenderer.vue";

export const entry: JsonFormsRendererRegistryEntry = {
	renderer: controlRenderer,
	tester: rankWith(5, isOneOfEnumControl),
};

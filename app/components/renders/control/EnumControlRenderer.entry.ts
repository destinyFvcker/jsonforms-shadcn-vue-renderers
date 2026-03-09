import { type JsonFormsRendererRegistryEntry, rankWith, isEnumControl } from "@jsonforms/core";
import { default as controlRenderer } from "./EnumControlRenderer.vue";

export const entry: JsonFormsRendererRegistryEntry = {
	renderer: controlRenderer,
	tester: rankWith(6, isEnumControl),
};

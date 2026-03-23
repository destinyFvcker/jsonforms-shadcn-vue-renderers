import { rankWith, type JsonFormsRendererRegistryEntry } from "@jsonforms/core";
import controlRenderer from "./NullControlRenderer.vue";
import { isNullControl } from "../testers";
export const entry: JsonFormsRendererRegistryEntry = {
	renderer: controlRenderer,
	tester: rankWith(3, isNullControl),
};

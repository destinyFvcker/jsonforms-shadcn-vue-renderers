import {
	rankWith,
	and,
	type JsonFormsRendererRegistryEntry,
	isStringControl,
	isMultiLineControl,
} from "@jsonforms/core";
import controlRenderer from "./MultiStringControlRenderer.vue";

export const entry: JsonFormsRendererRegistryEntry = {
	renderer: controlRenderer,
	tester: rankWith(3, and(isStringControl, isMultiLineControl)),
};

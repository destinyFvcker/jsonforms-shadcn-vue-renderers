<script setup lang="ts">
import { rendererProps, useJsonFormsArrayControl, DispatchRenderer } from "@jsonforms/vue";
import ArrayListElement from "./ArrayListElement.vue";
import {
	arrayDefaultTranslations,
	composePaths,
	createDefaultValue,
	defaultJsonFormsI18nState,
	getArrayTranslations,
	Resolve,
	type ControlElement,
	type JsonFormsSubStates,
	type JsonSchema,
} from "@jsonforms/core";
import { useShadcnArrayControl } from "../utils";
import Button from "../../ui/button/Button.vue";
import Label from "../../ui/label/Label.vue";
import { Plus } from "@lucide/vue";

const props = defineProps({
	...rendererProps<ControlElement>(),
});
const { control, addItem, appliedOptions, childLabelForIndex, childUiSchema, moveDown, moveUp, removeItems } =
	useShadcnArrayControl(useJsonFormsArrayControl(props));

const noData = computed((): boolean => {
	return !control.value.data || control.value.data.length === 0;
});
const arraySchema = computed((): JsonSchema | undefined => {
	return Resolve.schema(props.schema, control.value.uischema.scope, control.value.rootSchema);
});
const maxItemsReached = computed((): boolean | undefined => {
	return (
		arraySchema.value !== undefined &&
		arraySchema.value.maxItems !== undefined &&
		control.value.data !== undefined &&
		control.value.data.length >= arraySchema.value.maxItems
	);
});
const minItemsReached = computed((): boolean | undefined => {
	return (
		arraySchema.value !== undefined &&
		arraySchema.value.minItems !== undefined &&
		control.value.data !== undefined &&
		control.value.data.length <= arraySchema.value.minItems
	);
});
const translations = computed((): any => {
	const jsonforms = inject<JsonFormsSubStates>("jsonforms");
	return getArrayTranslations(
		jsonforms?.i18n?.translate ?? defaultJsonFormsI18nState.translate,
		arrayDefaultTranslations,
		control.value.i18nKeyPrefix,
		control.value.label,
	);
});

const addButtonClick = () => {
	addItem(control.value.path, createDefaultValue(control.value.schema, control.value.rootSchema))();
};
</script>

<template>
	<!-- :class="styles.arrayList.root" -->
	<fieldset v-if="control.visible">
		<!-- :class="styles.arrayList.legend" -->
		<legend class="flex gap-2 items-center">
			<!-- :class="styles.arrayList.addButton" -->
			<Button
				variant="outline"
				:for="`add-array-item-${control.uischema.scope}`"
				class="rounded-sm py-0! h-fit w-fit m-0 px-1"
				:disabled="!control.enabled || (appliedOptions.restrict && maxItemsReached)"
				@click="addButtonClick"
			>
				<Plus class="text-green-600" />
				添加
				{{ control.label }}
			</Button>
			<!-- :class="styles.arrayList.label" -->
			<Label :for="`add-array-item-${control.uischema.scope}`" class="m-0"> </Label>
		</legend>
		<!-- :class="styles.arrayList.itemWrapper" -->
		<div v-for="(element, index) in control.data as any[]" :key="`${control.path}-${index}`">
			<array-list-element
				:move-up="() => moveUp?.(control.path, index)"
				:move-up-enabled="control.enabled && index > 0"
				:move-down="() => moveDown?.(control.path, index)"
				:move-down-enabled="control.enabled && index < control.data.length - 1"
				:delete-enabled="control.enabled && !minItemsReached"
				:delete="() => removeItems?.(control.path, [index])"
				:label="childLabelForIndex(index)"
			>
				<!-- :styles="styles" -->
				<dispatch-renderer
					:schema="control.schema"
					:uischema="childUiSchema"
					:path="composePaths(control.path, `${index}`)"
					:enabled="control.enabled"
					:renderers="control.renderers"
					:cells="control.cells"
				/>
			</array-list-element>
		</div>
		<!-- :class="styles.arrayList.noData" -->
		<div v-if="noData">
			{{ translations.noDataMessage }}
		</div>
	</fieldset>
</template>

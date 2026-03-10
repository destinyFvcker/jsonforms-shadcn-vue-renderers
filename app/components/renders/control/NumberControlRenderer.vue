<script setup lang="ts">
import { type ControlElement } from "@jsonforms/core";
import { rendererProps, useJsonFormsControl } from "@jsonforms/vue";
import { computed } from "vue";
import ControlWrapper from "./ControlWrapper.vue";
import { useShadcnControl } from "../utils";
import { Input } from "../../ui/input";

const props = defineProps({
	...rendererProps<ControlElement>(),
});
const { control, controlWrapper, isFocused, appliedOptions, styles, onChange } = useShadcnControl(
	useJsonFormsControl(props),
	(target) => target || undefined,
);

let step = computed(() => {
	return appliedOptions.value.step ?? 0.1;
});
</script>

<template>
	<ControlWrapper v-bind="controlWrapper" :is-focused="isFocused" :applied-options="appliedOptions" :styles="styles">
		<Input
			:id="control.id + '-input'"
			type="number"
			:step="step"
			:class="styles.control.input"
			:value="control.data"
			:disabled="!control.enabled"
			:autofocus="appliedOptions.focus"
			:placeholder="appliedOptions.placeholder"
			@update:model-value="onChange"
			@focus="isFocused = true"
			@blur="isFocused = false"
		/>
	</ControlWrapper>
</template>

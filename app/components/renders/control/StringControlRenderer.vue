<script setup lang="ts">
import { type ControlElement } from "@jsonforms/core";
import { rendererProps, useJsonFormsControl } from "@jsonforms/vue";
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
</script>

<template>
	<ControlWrapper v-bind="controlWrapper" :is-focused="isFocused" :applied-options="appliedOptions" :styles="styles">
		<Input
			:id="control.id + '-input'"
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

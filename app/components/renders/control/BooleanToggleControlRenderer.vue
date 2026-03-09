<script setup lang="ts">
import { type ControlElement } from "@jsonforms/core";
import { rendererProps, useJsonFormsControl } from "@jsonforms/vue";
import ControlWrapper from "./ControlWrapper.vue";
import { useShadcnControl } from "../utils";

const props = defineProps({
	...rendererProps<ControlElement>(),
});
const { control, controlWrapper, isFocused, appliedOptions, styles, onChange } = useShadcnControl(
	useJsonFormsControl(props),
);
</script>

<template>
	<ControlWrapper v-bind="controlWrapper" :is-focused="isFocused" :applied-options="appliedOptions" :styles="styles">
		<div class="flex items-center gap-2">
			<Switch
				:id="control.id + '-input'"
				:model-value="control.data"
				:disabled="!control.enabled"
				@update:model-value="onChange"
			/>
			<Label :for="control.id + '-input'" v-if="control.description">{{ control.description }}</Label>
		</div>
	</ControlWrapper>
</template>

<script setup lang="ts">
import { type ControlElement } from "@jsonforms/core";
import { rendererProps, useJsonFormsEnumControl } from "@jsonforms/vue";
import ControlWrapper from "./ControlWrapper.vue";
import { useShadcnControl } from "../utils";

const props = defineProps({
	...rendererProps<ControlElement>(),
});
const { control, controlWrapper, isFocused, appliedOptions, styles, onChange } = useShadcnControl(
	useJsonFormsEnumControl(props),
	(target) => target || undefined,
);
</script>

<template>
	<ControlWrapper v-bind="controlWrapper" :is-focused="isFocused" :applied-options="appliedOptions" :styles="styles">
		<Select
			@update:open="(open) => (isFocused = open)"
			:multiple="false"
			:model-value="control.data"
			@update:model-value="onChange"
		>
			<SelectTrigger :class="['w-fit', styles.control.select]">
				<SelectValue placeholder="请选择……" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectItem v-for="option in control.options" :value="option.value">{{ option.label }}</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	</ControlWrapper>
</template>

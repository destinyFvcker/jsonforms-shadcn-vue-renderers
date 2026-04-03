<script setup lang="ts">
import type { ControlElement } from "@jsonforms/core";
import { rendererProps, useJsonFormsOneOfEnumControl } from "@jsonforms/vue";
import ControlWrapper from "./ControlWrapper.vue";
import { useShadcnControl } from "../utils";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";

const props = defineProps({
	...rendererProps<ControlElement>(),
});
const { control, controlWrapper, isFocused, appliedOptions, styles, onChange } = useShadcnControl(
	useJsonFormsOneOfEnumControl(props),
	(target) => target || undefined,
);
</script>

<template>
	<ControlWrapper v-bind="controlWrapper" :is-focused="isFocused" :applied-options="appliedOptions" :styles="styles">
		<Select
			:model-value="control.data"
			:multiple="false"
			:disabled="!control.enabled"
			@update:open="(open: boolean) => (isFocused = open)"
			@update:model-value="onChange"
		>
			<SelectTrigger :class="['w-fit', styles.control.select]">
				<SelectValue placeholder="请选择……" />
			</SelectTrigger>
			<SelectContent align="end" side="top">
				<SelectGroup>
					<SelectItem v-for="option in control.options" :key="option.value" :value="option.value">{{
						option.label
					}}</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	</ControlWrapper>
</template>

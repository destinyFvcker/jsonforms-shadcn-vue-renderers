<script setup lang="ts">
import { isDescriptionHidden } from "@jsonforms/core";
import { computed } from "vue";
import { Label } from "../../ui/label";
import type { Options, Styles } from "@jsonforms/vue-vanilla";

const props = withDefaults(
	defineProps<{
		id: string;
		description?: string;
		errors?: string;
		label?: string;
		appliedOptions?: Options;
		visible?: boolean;
		required?: boolean;
		isFocused?: boolean;
		styles: Styles;
	}>(),
	{
		description: undefined,
		errors: undefined,
		label: undefined,
		appliedOptions: undefined,
		visible: true,
		required: false,
		isFocused: false,
	},
);

const showDescription = computed(
	() =>
		!isDescriptionHidden(
			props.visible,
			props.description,
			props.isFocused,
			Boolean(props.appliedOptions?.showUnfocusedDescription),
		),
);

const showAsterisk = computed(() => Boolean(props.required && !props.appliedOptions?.hideRequiredAsterisk));
</script>

<template>
	<div v-show="visible" :class="styles.control.root" :data-control-id="id">
		<!-- TODO 查找这里的style应该从哪里进行指定 -->
		<Label
			:for="id + '-input'"
			:class="[styles.control.label, required ? styles.control.required : '', 'pb-1 text-xs']"
		>
			{{ label }}
			<span v-if="showAsterisk" :class="styles.control.asterisk"> (必填) </span>
		</Label>

		<div :class="styles.control.wrapper">
			<slot />
		</div>

		<div
			:class="[
				'text-sm',
				errors ? styles.control.error : styles.control.description,
				errors ? 'text-red-500' : 'text-muted-foreground',
			]"
		>
			{{ errors ? errors : showDescription ? description : null }}
		</div>
	</div>
</template>

<script setup lang="ts">
import { isDescriptionHidden } from "@jsonforms/core";
import { type Options, type Styles } from "@jsonforms/vue-vanilla";
import { computed } from "vue";

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
		<Label :for="id + '-input'" :class="[styles.control.label, required ? styles.control.required : '']">
			{{ label }}
			<span v-if="showAsterisk" :class="styles.control.asterisk"> * </span>
		</Label>

		<div :class="styles.control.wrapper">
			<slot />
		</div>

		<div :class="errors ? styles.control.error : styles.control.description">
			{{ errors ? errors : showDescription ? description : null }}
		</div>
	</div>
</template>

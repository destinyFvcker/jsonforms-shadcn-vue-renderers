<script setup lang="ts">
import { ref, provide } from "vue";
import { JsonForms, type JsonFormsChangeEvent } from "@jsonforms/vue";
import { defaultStyles, mergeStyles, vanillaRenderers } from "@jsonforms/vue-vanilla";
import { shadcnRenderers } from "~/components/renders";

const renderers = Object.freeze([
	...vanillaRenderers,
	...shadcnRenderers,
	// here you can add custom renderers
]);

const schema = {
	properties: {
		name: {
			type: "string",
			minLength: 1,
			description: "The task's name",
		},
		description: {
			title: "Long Description",
			type: "string",
		},
		done: {
			type: "boolean",
		},
		dueDate: {
			type: "string",
			format: "date",
			description: "The task's due date",
		},
		rating: {
			type: "number",
			maximum: 5,
		},
		recurrence: {
			type: "string",
			enum: ["Never", "Daily", "Weekly", "Monthly"],
		},
		recurrenceInterval: {
			type: "integer",
			description: "Days until recurrence",
		},
	},
};

const uischema = {
	type: "HorizontalLayout",
	elements: [
		{
			type: "VerticalLayout",
			elements: [
				{
					type: "Control",
					scope: "#/properties/name",
					// options: {
					// 	format: "date",
					// },
				},
				{
					type: "Control",
					scope: "#/properties/description",
					options: {
						multi: true,
					},
				},
				{
					type: "Control",
					scope: "#/properties/done",
					options: {
						toggle: true,
					},
				},
			],
		},
		{
			type: "VerticalLayout",
			elements: [
				{
					type: "Control",
					scope: "#/properties/dueDate",
				},
				{
					type: "Control",
					scope: "#/properties/rating",
				},
				{
					type: "Control",
					scope: "#/properties/recurrence",
				},
				{
					type: "Control",
					scope: "#/properties/recurrenceInterval",
				},
			],
		},
	],
};

const data = ref({
	name: "Send email to Adrian",
	description: "Confirm if you have passed the subject\nHereby ...",
	done: true,
	recurrence: "Daily",
	rating: 3,
});

const onChange = (event: JsonFormsChangeEvent) => {
	data.value = event.data;
};

// mergeStyles combines all classes from both styles definitions into one
const myStyles = mergeStyles(defaultStyles, { control: { label: "mylabel" } });

// Provide styles to child components
provide("styles", myStyles);
</script>

<template>
	<div class="px-auto">
		<NuxtImg src="logo.png" alt="Vue logo" />
		<h1>JSON Forms Vue 3</h1>
	</div>
	<div class="myform">
		<json-forms :data="data" :renderers="renderers" :schema="schema" :uischema="uischema" @change="onChange" />
	</div>
	<pre>{{ data }}</pre>
</template>

<style>
.mylabel {
	color: darkslategrey;
}

.vertical-layout {
	margin-left: 10px;
	margin-right: 10px;
}

.myform {
	width: 640px;
	margin: 0 auto;
}

.text-area {
	min-height: 80px;
}

pre {
	background: lightcyan;
	padding: 10px;
	text-align: left;
	width: 100%;
}
</style>

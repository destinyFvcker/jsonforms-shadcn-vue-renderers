<script setup lang="ts">
import { ref, provide } from "vue";
import { JsonForms, type JsonFormsChangeEvent } from "@jsonforms/vue";
import { defaultStyles, mergeStyles, vanillaRenderers } from "@jsonforms/vue-vanilla";
import { shadcnRenderers } from "~/components/renders";
import type { JsonSchema7 } from "@jsonforms/core";

const renderers = Object.freeze([
	...vanillaRenderers,
	...shadcnRenderers,
	// here you can add custom renderers
]);

const schema = {
	$schema: "http://json-schema.org/draft-07/schema#",
	title: "Tuple E",
	description: "TupleEnum",
	oneOf: [
		{
			description: "Carries a plain text message to be written to the output stream.",
			type: "object",
			properties: {
				Write: {
					type: "string",
				},
			},
			additionalProperties: false,
			required: ["Write"],
		},
		{
			description: "Moves the cursor or entity to the given (x, y) coordinate pair.",
			type: "object",
			properties: {
				Move: {
					type: "array",
					items: [
						{
							type: "integer",
							format: "int32",
						},
						{
							type: "integer",
							format: "int32",
						},
					],
					maxItems: 2,
					minItems: 2,
				},
			},
			additionalProperties: false,
			required: ["Move"],
		},
		{
			description: "Sets the active color using red, green, and blue channel values (0–255 each).",
			type: "object",
			properties: {
				ChangeColor: {
					type: "array",
					items: [
						{
							type: "integer",
							format: "int32",
						},
						{
							type: "integer",
							format: "int32",
						},
						{
							type: "integer",
							format: "int32",
						},
					],
					maxItems: 3,
					minItems: 3,
				},
			},
			additionalProperties: false,
			required: ["ChangeColor"],
		},
	],
};

// const uischema = {
// 	type: "HorizontalLayout",
// 	elements: [
// 		{
// 			type: "Control",
// 			label: "Basic Information",
// 			// scope: "#",
// 		},
// 	],
// };

const data = ref({});

const onChange = (event: JsonFormsChangeEvent) => {
	data.value = event.data;
};

// mergeStyles combines all classes from both styles definitions into one
const myStyles = mergeStyles(defaultStyles, { control: { label: "mylabel" } });

// Provide styles to child components
provide("styles", myStyles);
</script>

<template>
	<div>
		<div class="myform">
			<json-forms
				:data="data"
				:renderers="renderers"
				:schema="schema as unknown as JsonSchema7"
				@change="onChange"
			/>
		</div>
	</div>
</template>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
	margin-left: 120px;
	margin-right: 120px;
}

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

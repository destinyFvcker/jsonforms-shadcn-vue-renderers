s
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
	title: "ET Enum!",
	description: "sss + sssa",
	oneOf: [
		{
			type: "object",
			properties: {
				Foo: {
					$ref: "#/definitions/FooStruct",
				},
			},
			additionalProperties: false,
			required: ["Foo"],
		},
		{
			type: "object",
			properties: {
				Bar: {
					$ref: "#/definitions/BarStruct",
				},
			},
			additionalProperties: false,
			required: ["Bar"],
		},
	],
	definitions: {
		BarStruct: {
			title: "Bar S",
			description: "BarStruct",
			type: "object",
			properties: {
				bar_bar: {
					description: "Descriptive label for this bar, typically a short slug or display name.",
					type: "string",
				},
				bar_foo: {
					description: "Numeric rank or ordering index assigned to this bar record.",
					type: "integer",
					format: "int32",
				},
				bar_qux: {
					description: "Optional metadata string, often used to carry a status or source marker.",
					type: "string",
				},
			},
			required: ["bar_foo", "bar_bar", "bar_qux"],
		},
		FooStruct: {
			title: "Foo S",
			description: "FooStruct",
			type: "object",
			properties: {
				foo_bar: {
					description: "Human-readable name or secondary identifier for this foo entry.",
					type: "string",
				},
				foo_foo: {
					description: "Unique numeric key that identifies this foo within its parent collection.",
					type: "integer",
					format: "int32",
				},
				foo_qux: {
					description: "Auxiliary tag providing extra context, such as a region or category code.",
					type: "string",
				},
			},
			required: ["foo_foo", "foo_bar", "foo_qux"],
		},
	},
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

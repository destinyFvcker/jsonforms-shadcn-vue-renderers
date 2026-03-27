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
	title: "Foo + Bar的enum!",
	description: "sss + sssa",
	oneOf: [
		{
			type: "object",
			properties: {
				c: {
					$ref: "#/definitions/FooStruct",
				},
				t: {
					type: "string",
					const: "Foo",
				},
			},
			required: ["t", "c"],
		},
		{
			type: "object",
			properties: {
				c: {
					$ref: "#/definitions/BarStruct",
				},
				t: {
					type: "string",
					const: "Bar",
				},
			},
			required: ["t", "c"],
		},
	],
	definitions: {
		BarStruct: {
			title: "BarBar的struct!",
			description: "sssa",
			type: "object",
			properties: {
				bar1: {
					type: "string",
				},
				bar2: {
					type: "string",
				},
				bar3: {
					type: "string",
				},
			},
			required: ["bar1", "bar2", "bar3"],
		},
		FooStruct: {
			title: "FooFoo的struct!",
			description: "sss",
			type: "object",
			properties: {
				foo1: {
					type: "integer",
					format: "int32",
				},
				foo2: {
					type: "integer",
					format: "int32",
				},
				foo3: {
					type: "integer",
					format: "int32",
				},
			},
			required: ["foo1", "foo2", "foo3"],
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

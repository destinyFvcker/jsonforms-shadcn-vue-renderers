<script setup lang="ts">
import { ref, provide } from "vue";
import { defaultStyles, mergeStyles } from "@jsonforms/vue-vanilla";
import type { JsonSchema7 } from "@jsonforms/core";
import SchemaFormPanel from "~/components/SchemaFormPanel.vue";

const schema = {
	$schema: "http://json-schema.org/draft-07/schema#",
	oneOf: [
		{
			type: "object",
			properties: {
				account_id: { type: "integer" },
				action: { const: "OPEN_LONG" },
				gsym: { type: "integer" },
				price: { type: "number", exclusiveMinimum: 0 },
				volume: { type: "number", exclusiveMinimum: 0 },
			},
			required: ["action", "account_id", "gsym", "volume", "price"],
			additionalProperties: false,
		},
		{
			type: "object",
			properties: {
				account_id: { type: "integer" },
				action: { const: "CLOSE_LONG" },
				gsym: { type: "integer" },
				price: { type: "number", exclusiveMinimum: 0 },
				volume: { type: "number", exclusiveMinimum: 0 },
			},
			required: ["action", "account_id", "gsym", "volume", "price"],
			additionalProperties: false,
		},
		{
			type: "object",
			properties: {
				account_id: { type: "integer" },
				action: { const: "CANCEL" },
				gsym: { type: "integer" },
				target_client_id: { type: "integer" },
			},
			required: ["action", "account_id", "gsym", "target_client_id"],
			additionalProperties: false,
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

const data = ref();

const onSubmit = () => {
	console.log("Form submitted with data:", data.value);
};

// mergeStyles combines all classes from both styles definitions into one
const myStyles = mergeStyles(defaultStyles, { control: { label: "mylabel" } });

// Provide styles to child components
provide("styles", myStyles);
</script>

<template>
	<div>
		<schema-form-panel
			:schema="schema as unknown as JsonSchema7"
			:data="data"
			@update:data="data = $event"
			@submit="onSubmit"
		/>

		<pre>{{ data }}</pre>
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

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
	definitions: {
		address: {
			type: "object",
			title: "Address",
			properties: {
				street_address: {
					type: "string",
				},
				city: {
					type: "string",
				},
				state: {
					type: "string",
				},
			},
			required: ["street_address", "city", "state"],
		},
		user: {
			type: "object",
			title: "User",
			properties: {
				name: {
					type: "string",
				},
				mail: {
					type: "string",
				},
			},
			required: ["name", "mail"],
		},
	},
	type: "object",
	properties: {
		addressOrUser: {
			oneOf: [
				{
					$ref: "#/definitions/address",
				},
				{
					$ref: "#/definitions/user",
				},
			],
		},
	},
};

const uischema = {
	type: "VerticalLayout",
	elements: [
		{
			type: "Control",
			label: "Basic Information",
			scope: "#/properties/addressOrUser",
		},
	],
};

const data = ref({
	addressOrUser: {},
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

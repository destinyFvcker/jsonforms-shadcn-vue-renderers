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
	$schema: "http://json-schema.org/draft-07/schema#",
	title: "MyStruct",
	type: "object",
	properties: {
		myBool: {
			type: "boolean",
		},
		myNullableEnum: {
			anyOf: [
				{
					type: "null",
				},
				{
					$ref: "#/definitions/MyEnum",
				},
			],
			default: null,
		},
		myNumber: {
			type: "integer",
			format: "int32",
		},
	},
	additionalProperties: false,
	required: ["myNumber", "myBool"],
	definitions: {
		MyEnum: {
			anyOf: [
				{
					type: "string",
				},
				{
					type: "object",
					properties: {
						floats: {
							type: "array",
							items: {
								type: "number",
								format: "float",
							},
						},
					},
					required: ["floats"],
				},
			],
		},
	},
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
	<div>
		<Card>
			<CardHeader>
				<CardTitle>test</CardTitle>
				<CardDescription>test schemas</CardDescription>
			</CardHeader>
			<CardContent>
				<div class="myform">
					<json-forms :data="data" :renderers="renderers" :schema="schema" @change="onChange" />
				</div>
			</CardContent>
			<CardFooter>
				<p>Card Footer</p>
			</CardFooter>
		</Card>
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

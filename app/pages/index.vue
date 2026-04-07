<script setup lang="ts">
const pages = [
	{ path: "/control", label: "Basic Control" },
	{ path: "/oneof-combination-adjacently-tagged", label: "Edit adjacently tagged enum in rust" },
	{
		path: "/complex-nested-obj1",
		label: "Edit complex nested object example 1",
	},
	{
		path: "/oneof-combination-externally-tagged-ref",
		label: "Edit externally tagged enum in rust without #[schemars(inline)] (not recommanded)",
	},
	{ path: "/oneof-combination-untagged", label: "Edit untagged enum in rust" },
	{ path: "/rust-option", label: "Edit rust option(a special kind of anyOf)" },
	{ path: "/tuple-like-enum", label: "Edit tuple-like enum in rust" },
	{ path: "/oneof-const", label: "oneof const schema type" },
];
</script>

<template>
	<Card class="min-h-screen">
		<CardHeader>
			<CardTitle>Exmples</CardTitle>
			<CardDescription>jsonfroms-shadcn-vue-renderers examples</CardDescription>
		</CardHeader>
		<CardContent>
			<div class="mx-auto max-w-xl space-y-4 p-10">
				<h1 class="text-2xl font-bold">Examples</h1>
				<nav class="flex flex-col gap-2">
					<NuxtLink
						v-for="page in pages"
						:key="page.path"
						:to="page.path"
						class="text-primary hover:bg-muted rounded-md border px-4 py-3 transition hover:underline"
					>
						{{ page.label }}
					</NuxtLink>
				</nav>
			</div>
		</CardContent>
	</Card>
</template>

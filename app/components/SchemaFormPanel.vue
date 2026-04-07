<script setup lang="ts">
import { generateDefaultUISchema } from "@jsonforms/core";
import { JsonForms } from "@jsonforms/vue";
import { RotateCw, Save } from "@lucide/vue";
import { normalizeClass } from "vue";
import type { JsonSchema7 } from "@jsonforms/core";
import type { JsonFormsChangeEvent } from "@jsonforms/vue";
import type { HTMLAttributes } from "vue";
import { vanillaRenderers } from "@jsonforms/vue-vanilla";
import { shadcnRenderers } from "./renders";

function cloneJson<T>(value: T): T {
	if (value == null) {
		return value;
	}

	return JSON.parse(JSON.stringify(value)) as T;
}

const jsonFormsRenderers = Object.freeze([
	...vanillaRenderers,
	...shadcnRenderers,
	// here you can add custom renderers
]);

interface Props {
	schema: JsonSchema7 | undefined | null;
	data?: unknown;
	submitLabel?: string;
	readonly?: boolean;
	hideSubmit?: boolean;
	loading?: boolean;
	/** Custom class(es) to add to the element */
	class?: HTMLAttributes["class"];
}

const {
	schema,
	data = {},
	submitLabel = "执行",
	readonly = false,
	hideSubmit = false,
	loading = false,
	class: ClassName,
} = defineProps<Props>();

const emit = defineEmits<{
	submit: [value: unknown];
	"update:data": [value: unknown];
}>();

const localData = ref(cloneJson(data));
const errors = ref<string[]>([]);

watch(
	() => data,
	(newValue) => {
		localData.value = cloneJson(newValue ?? {});
	},
	{ deep: true },
);

const uischema = computed(() => (schema ? generateDefaultUISchema(schema, "HorizontalLayout") : undefined));

/**
 * When the schema has a top-level `oneOf`, AJV validates all branches and
 * accumulates errors from every failing branch. Find the active branch by
 * scanning the errors: the branch whose `const`-discriminator field has NO
 * const-mismatch error is the one the user is currently filling in.
 */
function getActiveOneOfIndex(errors: JsonFormsChangeEvent["errors"]): number {
	if (!schema?.oneOf || !Array.isArray(schema.oneOf) || !errors?.length) return -1;

	for (let i = 0; i < schema.oneOf.length; i++) {
		const hasConstMismatch = errors.some((e) => {
			const sp = (e as unknown as { schemaPath?: string }).schemaPath ?? "";
			return sp.startsWith(`#/oneOf/${i}/`) && e.keyword === "const";
		});
		if (!hasConstMismatch) return i;
	}
	return -1;
}

function onChange(event: JsonFormsChangeEvent) {
	let rawErrors = event.errors ?? [];

	// If schema has oneOf, only show errors from the currently active branch.
	// The active branch is whichever one has no const-mismatch on its discriminator field.
	if (schema?.oneOf) {
		const activeIdx = getActiveOneOfIndex(rawErrors);
		if (activeIdx >= 0) {
			rawErrors = rawErrors.filter((error) => {
				const sp = (error as unknown as { schemaPath?: string }).schemaPath ?? "";
				return !sp.includes("/oneOf/") || sp.startsWith(`#/oneOf/${activeIdx}/`);
			});
		}
	}

	errors.value = rawErrors.map((error) => error.message).filter((message): message is string => Boolean(message));

	const newDataStr = JSON.stringify(event.data);
	if (newDataStr === JSON.stringify(localData.value)) return;

	localData.value = cloneJson(event.data);
	emit("update:data", cloneJson(event.data));
}

function onSubmit() {
	if (readonly || hideSubmit || errors.value.length > 0) {
		return;
	}

	emit("submit", cloneJson(localData.value));
}
</script>

<template>
	<div :class="[normalizeClass(ClassName) || undefined, 'space-y-2']">
		<JsonForms
			v-if="schema !== null && schema !== undefined"
			:schema="schema"
			:data="localData"
			:uischema="uischema"
			:renderers="jsonFormsRenderers"
			:readonly="readonly"
			@change="onChange"
		/>
		<UiEmpty v-else class="h-full border border-dashed">
			<UiEmptyHeader>
				<UiEmptyMedia variant="icon">
					<Icon name="lucide:circle-x" />
				</UiEmptyMedia>
				<UiEmptyTitle>未获取到 schema</UiEmptyTitle>
				<UiEmptyDescription>请先检查相关接口状态。</UiEmptyDescription>
			</UiEmptyHeader>
		</UiEmpty>

		<div v-if="errors.length > 0" class="rounded-md border border-red-200 bg-red-50 p-3 text-sm">
			<div class="font-medium text-red-700">表单校验未通过</div>
			<ul class="mt-2 list-disc pl-5 text-red-600">
				<li v-for="message in errors" :key="message">{{ message }}</li>
			</ul>
		</div>

		<div class="flex justify-end gap-2">
			<div v-if="!readonly && !hideSubmit" class="flex justify-end">
				<Button :disabled="loading" @click="onSubmit">
					<RotateCw class="size-4" />
					还原
				</Button>
			</div>

			<div v-if="!readonly && !hideSubmit" class="flex justify-end">
				<Button :disabled="loading || errors.length > 0" @click="onSubmit">
					<Save />
					{{ submitLabel }}
				</Button>
			</div>
		</div>
	</div>
</template>

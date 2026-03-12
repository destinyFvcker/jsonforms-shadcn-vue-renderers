<script setup lang="ts">
import {
	createCombinatorRenderInfos,
	createDefaultValue,
	type CombinatorSubSchemaRenderInfo,
	type ControlElement,
} from "@jsonforms/core";
import { DispatchRenderer, rendererProps, useJsonFormsOneOfControl } from "@jsonforms/vue";
import { useCombinatorTranslations, useShadcnControl } from "../utils";
import { isEmpty } from "lodash";
import { computed, nextTick, ref, type ComputedRef, useTemplateRef } from "vue";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "../../ui/alert-dialog";
import { Button } from "../../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";

const props = defineProps({
	...rendererProps<ControlElement>(),
});
const { control, controlWrapper, isFocused, appliedOptions, styles, onChange } = useCombinatorTranslations(
	useShadcnControl(useJsonFormsOneOfControl(props)),
);

const selectedIndex = ref(control.value.indexOfFittingSchema || 0);
const selectIndex = ref(selectedIndex.value);
const newSelectedIndex = ref(0);
const dialog = ref(false);

const indexOneOfRenderInfos: ComputedRef<
	(CombinatorSubSchemaRenderInfo & {
		index: number;
	})[]
> = computed(() => {
	const result = createCombinatorRenderInfos(
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		control.value.schema.oneOf!,
		control.value.rootSchema,
		"oneOf",
		control.value.uischema,
		control.value.path,
		control.value.uischemas,
	);

	return result.filter((info) => info.uischema).map((info, index) => ({ ...info, index: index }));
});

const confirmRef = useTemplateRef("confirm-button-ref");
function handleTabChange(): void {
	newSelectedIndex.value = selectIndex.value;
	// revert back to the orginal value until the dialog is done
	selectIndex.value = selectedIndex.value;

	if (isEmpty(control.value.data)) {
		openNewTab(newSelectedIndex.value);
	} else {
		dialog.value = true;
		nextTick(() => {
			confirmRef.value?.domRef?.focus();
		});
	}
}
function confirmAction(): void {
	openNewTab(newSelectedIndex.value);
	dialog.value = false;
}
function cancel(): void {
	dialog.value = false;
}
function openNewTab(newIndex: number): void {
	onChange(createDefaultValue(indexOneOfRenderInfos.value[newIndex]!.schema, control.value.rootSchema));
	selectIndex.value = newIndex;
	selectedIndex.value = newIndex;
}
</script>

<template>
	<CombinatorProperties
		:schema="control.schema"
		combinator-keyword="oneOf"
		:path="control.path"
		:root-schema="control.rootSchema"
	/>

	<div class="flex w-full max-w-sm flex-col gap-6">
		<Tabs v-model="selectIndex" @update:model-value="handleTabChange">
			<TabsList>
				<TabsTrigger
					v-for="(oneOfRenderInfo, oneOfIndex) in indexOneOfRenderInfos"
					:value="oneOfIndex"
					:key="`${control.path}-${indexOneOfRenderInfos.length}-${oneOfIndex}`"
					:disabled="!control.enabled"
				>
					{{ oneOfRenderInfo.label }}
				</TabsTrigger>
			</TabsList>
			<TabsContent
				v-for="(oneOfRenderInfo, oneOfIndex) in indexOneOfRenderInfos"
				:value="oneOfIndex"
				:key="`${control.path}-${indexOneOfRenderInfos.length}-${oneOfIndex}`"
			>
				<Card>
					<CardHeader>
						<CardTitle>{{ oneOfRenderInfo.label }}</CardTitle>
						<CardDescription v-if="oneOfRenderInfo.schema.description">
							{{ oneOfRenderInfo.schema.description }}
						</CardDescription>
					</CardHeader>
					<CardContent class="">
						<DispatchRenderer
							v-if="selectedIndex === oneOfIndex"
							:schema="oneOfRenderInfo.schema"
							:uischema="oneOfRenderInfo.uischema"
							:path="control.path"
							:renderers="control.renderers"
							:cells="control.cells"
							:enabled="control.enabled"
						/>
					</CardContent>
				</Card>
			</TabsContent>
		</Tabs>
	</div>

	<AlertDialog
		v-model:open="dialog"
		@update:open="
			(open: boolean) => {
				if (!open) cancel();
			}
		"
	>
		<AlertDialogContent>
			<AlertDialogHeader>
				<AlertDialogTitle>清空当前表单?</AlertDialogTitle>
				<AlertDialogDescription>
					如果您离开此tabs，您当前表单中填写的数据将被清除。您是否要继续?
				</AlertDialogDescription>
			</AlertDialogHeader>
			<AlertDialogFooter>
				<AlertDialogCancel as-child>
					<Button @click="cancel" variant="outline">取消</Button>
				</AlertDialogCancel>
				<AlertDialogAction as-child>
					<Button @click="confirmAction">确认</Button>
				</AlertDialogAction>
			</AlertDialogFooter>
		</AlertDialogContent>
	</AlertDialog>
</template>

<script setup lang="ts">
import type { CombinatorSubSchemaRenderInfo, ControlElement } from "@jsonforms/core";
import { DispatchRenderer, rendererProps, useJsonFormsAnyOfControl } from "@jsonforms/vue";
import { createCombinatorRenderInfos, useCombinatorTranslations, useShadcnControl } from "../utils";
import { computed, ref, type ComputedRef } from "vue";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";

const props = defineProps({
	...rendererProps<ControlElement>(),
});
const { control } = useCombinatorTranslations(useShadcnControl(useJsonFormsAnyOfControl(props)));

const selectIndex = ref(control.value.indexOfFittingSchema || 0);

const indexAnyOfRenderInfos: ComputedRef<
	(CombinatorSubSchemaRenderInfo & {
		index: number;
	})[]
> = computed(() => {
	const result = createCombinatorRenderInfos(
		control.value.schema.anyOf!,
		control.value.rootSchema,
		"anyOf",
		control.value.uischema,
		control.value.path,
		control.value.uischemas,
	);

	return result.filter((info) => info.uischema).map((info, index) => ({ ...info, index: index }));
});
</script>

<template>
	<CombinatorProperties
		:schema="control.schema"
		combinator-keyword="anyOf"
		:path="control.path"
		:root-schema="control.rootSchema"
	/>

	<div class="flex w-full max-w-sm flex-col gap-6">
		<Tabs v-model="selectIndex">
			<TabsList>
				<TabsTrigger
					v-for="(anyOfRenderInfo, anyOfIndex) in indexAnyOfRenderInfos"
					:key="`${control.path}-${indexAnyOfRenderInfos.length}-${anyOfIndex}`"
					:value="anyOfIndex"
					:disabled="!control.enabled"
				>
					{{ anyOfRenderInfo.schema.type !== "null" ? anyOfRenderInfo.label : "Null(不填)" }}
				</TabsTrigger>
			</TabsList>
			<TabsContent
				v-for="(anyOfRenderInfo, anyOfIndex) in indexAnyOfRenderInfos"
				:key="`${control.path}-${indexAnyOfRenderInfos.length}-${anyOfIndex}`"
				:value="anyOfIndex"
			>
				<Card>
					<CardHeader v-if="anyOfRenderInfo.schema.type !== 'null'">
						<CardTitle>{{ anyOfRenderInfo.label }}</CardTitle>
						<CardDescription v-if="anyOfRenderInfo.schema.description">
							{{ anyOfRenderInfo.schema.description }}
						</CardDescription>
					</CardHeader>
					<CardContent class="">
						<DispatchRenderer
							v-if="selectIndex === anyOfIndex"
							:schema="anyOfRenderInfo.schema"
							:uischema="anyOfRenderInfo.uischema"
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
</template>

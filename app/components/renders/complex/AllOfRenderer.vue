<script setup lang="ts">
import { findMatchingUISchema, type CombinatorSubSchemaRenderInfo, type ControlElement } from "@jsonforms/core";
import { DispatchRenderer, rendererProps, useJsonFormsAllOfControl } from "@jsonforms/vue";
import { createCombinatorRenderInfos, useCombinatorTranslations, useShadcnControl } from "../utils";
import { computed, ref, type ComputedRef } from "vue";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";

const props = defineProps({
	...rendererProps<ControlElement>(),
});
const { control } = useCombinatorTranslations(useShadcnControl(useJsonFormsAllOfControl(props)));

const selectIndex = ref(0);

const delegateUISchema = computed(() => {
	return findMatchingUISchema(control.value.uischemas)(
		control.value.schema,
		control.value.uischema.scope,
		control.value.path,
	);
});

const indexAllOfRenderInfos: ComputedRef<
	(CombinatorSubSchemaRenderInfo & {
		index: number;
	})[]
> = computed(() => {
	const result = createCombinatorRenderInfos(
		control.value.schema.allOf!,
		control.value.rootSchema,
		"allOf",
		control.value.uischema,
		control.value.path,
		control.value.uischemas,
	);

	return result.filter((info) => info.uischema).map((info, index) => ({ ...info, index: index }));
});
</script>

<template>
	<template v-if="delegateUISchema">
		<DispatchRenderer
			:schema="control.schema"
			:uischema="delegateUISchema"
			:path="control.path"
			:enabled="control.enabled"
			:renderers="control.renderers"
			:cells="control.cells"
		/>
	</template>
	<template v-else-if="indexAllOfRenderInfos">
		<CombinatorProperties
			:schema="control.schema"
			combinator-keyword="allOf"
			:path="control.path"
			:root-schema="control.rootSchema"
		/>

		<div class="flex w-full max-w-sm flex-col gap-6">
			<Tabs v-model="selectIndex">
				<TabsList>
					<TabsTrigger
						v-for="(allOfRenderInfo, allOfIndex) in indexAllOfRenderInfos"
						:key="`${control.path}-${indexAllOfRenderInfos.length}-${allOfIndex}`"
						:value="allOfIndex"
						:disabled="!control.enabled"
					>
						{{ allOfRenderInfo.label }}
					</TabsTrigger>
				</TabsList>
				<TabsContent
					v-for="(allOfRenderInfo, allOfIndex) in indexAllOfRenderInfos"
					:key="`${control.path}-${indexAllOfRenderInfos.length}-${allOfIndex}`"
					:value="allOfIndex"
				>
					<Card>
						<CardHeader>
							<CardTitle>{{ allOfRenderInfo.label }}</CardTitle>
							<CardDescription v-if="allOfRenderInfo.schema.description">
								{{ allOfRenderInfo.schema.description }}
							</CardDescription>
						</CardHeader>
						<CardContent class="">
							<DispatchRenderer
								v-if="selectIndex === allOfIndex"
								:schema="allOfRenderInfo.schema"
								:uischema="allOfRenderInfo.uischema"
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
</template>

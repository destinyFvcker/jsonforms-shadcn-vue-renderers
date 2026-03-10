<script setup lang="ts">
/**
 * CombinatorProperties - 组合子属性渲染器
 *
 * 用于渲染 JSON Schema 组合子（oneOf / allOf / anyOf）之外的「共享属性」。
 * 组合子 schema 通常形如：{ oneOf: [...], type: "object", properties: {...} }
 * 本组件负责提取并渲染 properties 等非组合子部分，使这些字段在切换分支时也能展示。
 */
import { Generate, type JsonSchema, type Layout, type UISchemaElement } from "@jsonforms/core";
import { DispatchRenderer } from "@jsonforms/vue";
import { omit } from "lodash";

const props = defineProps<{
	/** 当前组合子节点的完整 JSON Schema */
	schema: JsonSchema;
	/** 组合子类型，用于从 schema 中排除对应键 */
	combinatorKeyword: "oneOf" | "allOf" | "anyOf";
	/** 数据路径，用于 JSON Forms 的 resolve 与 change 事件 */
	path: string;
	/** 根 schema，用于 Generate.uiSchema 解析 $ref 等 */
	rootSchema: JsonSchema;
}>();

/** 排除组合子键后的 schema，仅保留 type、properties、required 等共享定义 */
const otherProps: JsonSchema = omit(props.schema, props.combinatorKeyword) as JsonSchema;

/** 根据 otherProps 自动生成 UI schema，默认使用 VerticalLayout 布局 */
const foundUISchema: UISchemaElement = Generate.uiSchema(otherProps, "VerticalLayout", undefined, props.rootSchema);

/** 类型守卫：判断是否为 Layout（含 elements 数组的布局节点） */
const isLayout = (uischema: UISchemaElement): uischema is Layout =>
	Object.prototype.hasOwnProperty.call(uischema, "elements");

/** 仅当生成的 UI schema 为 Layout 且包含子元素时才渲染，避免空布局 */
let isLayoutWithElements = false;
if (foundUISchema !== null && isLayout(foundUISchema)) {
	isLayoutWithElements = foundUISchema.elements.length > 0;
}
</script>

<template>
	<!-- 有共享属性时，通过 DispatchRenderer 分发到具体控件渲染器 -->
	<div v-if="isLayoutWithElements">
		<DispatchRenderer :schema="otherProps" :path="path" :uischema="foundUISchema" />
	</div>
</template>

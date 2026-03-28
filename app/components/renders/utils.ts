import {
	combinatorDefaultTranslations,
	composePaths,
	defaultJsonFormsI18nState,
	findUISchema,
	getCombinatorTranslations,
	getFirstPrimitiveProp,
	Resolve,
	type CombinatorKeyword,
	type CombinatorSubSchemaRenderInfo,
	type ControlElement,
	type JsonFormsSubStates,
	type JsonFormsUISchemaRegistryEntry,
	type JsonSchema,
} from "@jsonforms/core";
import { useVanillaControl } from "@jsonforms/vue-vanilla";
import { cloneDeep, merge } from "lodash";
import { computed, inject, type ComputedRef } from "vue";

export const useShadcnControl = <I extends { control: any; handleChange: any }>(
	input: I,
	adaptTarget: (target: any) => any = (v) => v,
) => {
	const vanillaControl = useVanillaControl(input, adaptTarget);

	const onChange = (value: any) => {
		input.handleChange(input.control.value.path, adaptTarget(value));
	};

	return {
		...vanillaControl,
		onChange,
	};
};

/**
 * Adds styles, appliedOptions and childUiSchema
 */
export const useShadcnArrayControl = <I extends { control: any }>(input: I) => {
	const appliedOptions = computed(() =>
		merge({}, cloneDeep(input.control.value.config), cloneDeep(input.control.value.uischema.options)),
	);

	const childUiSchema = computed(() =>
		findUISchema(
			input.control.value.uischemas,
			input.control.value.schema,
			input.control.value.uischema.scope,
			input.control.value.path,
			undefined,
			input.control.value.uischema,
			input.control.value.rootSchema,
		),
	);

	const childLabelForIndex = (index: number) => {
		const childLabelProp =
			input.control.value.uischema.options?.childLabelProp ?? getFirstPrimitiveProp(input.control.value.schema);
		if (!childLabelProp) {
			return `${index}`;
		}
		const labelValue = Resolve.data(input.control.value.data, composePaths(`${index}`, childLabelProp));
		if (labelValue === undefined || labelValue === null || Number.isNaN(labelValue)) {
			return "";
		}
		return `${labelValue}`;
	};
	return {
		...input,
		appliedOptions,
		childUiSchema,
		childLabelForIndex,
	};
};

export const isControlEditable = (control: { enabled: boolean; readonly: boolean }) =>
	control.enabled && !control.readonly;

export const useCombinatorTranslations = <
	T extends {
		i18nKeyPrefix: string;
		label: string;
	},
	I extends {
		control: ComputedRef<T>;
	},
>(
	input: I,
) => {
	const jsonforms = inject<JsonFormsSubStates>("jsonforms");
	const translations = getCombinatorTranslations(
		jsonforms?.i18n?.translate ?? defaultJsonFormsI18nState.translate,
		combinatorDefaultTranslations,
		input.control.value.i18nKeyPrefix,
		input.control.value.label,
	);

	const overwrittenControl = computed(() => {
		return {
			...input.control.value,
			translations,
		};
	});

	return {
		...input,
		control: overwrittenControl,
	};
};

export const createCombinatorRenderInfos = (
	combinatorSubSchemas: JsonSchema[],
	rootSchema: JsonSchema,
	keyword: CombinatorKeyword,
	control: ControlElement,
	path: string,
	uischemas: JsonFormsUISchemaRegistryEntry[],
): CombinatorSubSchemaRenderInfo[] => {
	return combinatorSubSchemas.map((subSchema, subSchemaIndex) => {
		const resolvedSubSchema = subSchema.$ref
			? Resolve.schema(rootSchema, subSchema.$ref, rootSchema) || undefined
			: undefined;

		const schema = resolvedSubSchema ?? subSchema;

		return {
			schema,
			uischema: findUISchema(uischemas, schema, control.scope, path, undefined, control, rootSchema),
			label: subSchema.title ?? resolvedSubSchema?.title ?? `${keyword}-${subSchemaIndex}`,
		};
	});
};

export interface NestedInfo {
	level: number;
	parentElement?: "array" | "object";
}

export const useNested = (element: false | "array" | "object"): NestedInfo => {
	const nestedInfo = inject<NestedInfo>("jsonforms.nestedInfo", { level: 0 });
	if (element) {
		provide("jsonforms.nestedInfo", {
			level: nestedInfo.level + 1,
			parentElement: element,
		});
	}
	return nestedInfo;
};

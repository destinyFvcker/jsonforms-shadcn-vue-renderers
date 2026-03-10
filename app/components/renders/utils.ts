import {
	combinatorDefaultTranslations,
	defaultJsonFormsI18nState,
	getCombinatorTranslations,
	type JsonFormsSubStates,
} from "@jsonforms/core";
import { useVanillaControl } from "@jsonforms/vue-vanilla";

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

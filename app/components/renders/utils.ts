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

<!-- HACK maybe have timezone problem -->
<script setup lang="ts">
import type { ControlElement } from "@jsonforms/core";
import { rendererProps, useJsonFormsControl } from "@jsonforms/vue";
import ControlWrapper from "./ControlWrapper.vue";
import { DateFormatter, getLocalTimeZone, parseDate, today } from "@internationalized/date";
import { ChevronDownIcon } from "@lucide/vue";
import { useShadcnControl } from "../utils";
import { computed } from "vue";
import { Button } from "../../ui/button";
import { Calendar } from "../../ui/calendar";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";

const props = defineProps({
	...rendererProps<ControlElement>(),
});
const { control, controlWrapper, isFocused, appliedOptions, styles, onChange } = useShadcnControl(
	useJsonFormsControl(props),
	(target) => target || undefined,
);

const DEFAULT_TIME_PART = "";
const defaultPlaceholder = today(getLocalTimeZone());
const df = new DateFormatter("zh-CN", {
	dateStyle: "long",
});

const normalizeTimePart = (input: string | undefined): string | undefined => {
	if (!input) return undefined;
	const match = input.match(/^(\d{2}):(\d{2})(?::(\d{2}))?$/);
	if (!match) return undefined;
	return `${match[1]}:${match[2]}:${match[3] ?? "00"}`;
};

const extractDatePart = (input: unknown): string | undefined => {
	if (typeof input !== "string") return undefined;
	const match = input.match(/^(\d{4}-\d{2}-\d{2})/);
	return match?.[1];
};

const extractTimePart = (input: unknown): string | undefined => {
	if (typeof input !== "string") return undefined;
	const match = input.match(/T(\d{2}:\d{2}(?::\d{2})?)$/);
	return normalizeTimePart(match?.[1]);
};

const todayDatePart = computed(() => today(getLocalTimeZone()).toString());
const datePart = computed(() => extractDatePart(control.value.data));
const timePart = computed(() => extractTimePart(control.value.data) ?? DEFAULT_TIME_PART);

const calendarValue = computed(() => {
	if (!datePart.value) return undefined;
	try {
		return parseDate(datePart.value);
	} catch {
		return undefined;
	}
});

const dateLabel = computed(() => {
	if (!calendarValue.value) return "选择一个日期";
	return df.format(calendarValue.value.toDate(getLocalTimeZone()));
});

const buildDateTime = (nextDatePart: string, nextTimePart: string) => {
	return `${nextDatePart}T${normalizeTimePart(nextTimePart) ?? DEFAULT_TIME_PART}`;
};

const handleDateUpdate = (value: { toString: () => string } | undefined, close: () => void) => {
	if (!value) return;
	const nextDatePart = extractDatePart(value.toString());
	if (!nextDatePart) return;
	onChange(buildDateTime(nextDatePart, timePart.value));
	close();
};

const timeInput = computed(() => {
	return timePart.value;
});

const handleTimeUpdate = (value: string | number) => {
	if (typeof value !== "string") return;
	onChange(buildDateTime(datePart.value ?? todayDatePart.value, value));
};
</script>

<template>
	<ControlWrapper v-bind="controlWrapper" :is-focused="isFocused" :applied-options="appliedOptions" :styles="styles">
		<div class="flex gap-4">
			<div class="flex flex-col gap-1">
				<Label for="date-picker" class="px-1"> Date </Label>
				<Popover v-slot="{ close }">
					<PopoverTrigger as-child>
						<Button id="date-picker" variant="outline" :disabled="!control.enabled" class="w-fit justify-between font-normal">
							{{ dateLabel }}
							<ChevronDownIcon />
						</Button>
					</PopoverTrigger>
					<PopoverContent class="w-auto overflow-hidden p-0" align="start">
						<Calendar
							:model-value="calendarValue"
							:default-placeholder="defaultPlaceholder"
							layout="month-and-year"
							initial-focus
							@update:model-value="
								(value: { toString: () => string } | undefined) => handleDateUpdate(value, close)
							"
						/>
					</PopoverContent>
				</Popover>
			</div>
			<div class="flex flex-col gap-1">
				<Label for="time-picker" class="px-1"> Time </Label>

				<Input
					:id="control.id + '-time-picker'"
					:model-value="timeInput"
					:disabled="!control.enabled"
					type="time"
					step="1"
					default-value="9:30:00"
					class="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
					@update:model-value="handleTimeUpdate"
					@focus="isFocused = true"
					@blur="isFocused = false"
				/>
			</div>
		</div>
	</ControlWrapper>
</template>

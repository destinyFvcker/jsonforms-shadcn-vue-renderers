<script setup lang="ts">
import { type ControlElement } from "@jsonforms/core";
import { CalendarIcon } from "lucide-vue-next";
import { rendererProps, useJsonFormsControl } from "@jsonforms/vue";
import { computed } from "vue";
import ControlWrapper from "./ControlWrapper.vue";
import { useShadcnControl } from "../utils";
import { cn } from "../../../lib/utils";
import { DateFormatter, getLocalTimeZone, parseDate, today } from "@internationalized/date";
import { Button } from "../../ui/button";
import { Calendar } from "../../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";

const props = defineProps({
	...rendererProps<ControlElement>(),
});
const { control, controlWrapper, isFocused, appliedOptions, styles, onChange } = useShadcnControl(
	useJsonFormsControl(props),
	(target) => target || undefined,
);

const defaultPlaceholder = today(getLocalTimeZone());
const date = computed(() => {
	return control.value.data ? parseDate(control.value.data as string) : undefined;
});
const df = new DateFormatter("zh-CN", {
	dateStyle: "long",
});
</script>

<template>
	<ControlWrapper v-bind="controlWrapper" :is-focused="isFocused" :applied-options="appliedOptions" :styles="styles">
		<Popover v-slot="{ close }">
			<PopoverTrigger as-child>
				<Button
					variant="outline"
					:class="cn('w-fit justify-start text-left font-normal', !control.data && 'text-muted-foreground')"
				>
					<CalendarIcon />
					{{ date ? df.format(date.toDate(getLocalTimeZone())) : "选择一个日期" }}
				</Button>
			</PopoverTrigger>
			<PopoverContent class="w-auto p-0" align="start">
				<Calendar
					:model-value="date"
					:default-placeholder="defaultPlaceholder"
					layout="month-and-year"
					initial-focus
					@update:model-value="
						(value: { toDate: (tz: string) => Date } | undefined) => {
							onChange(value?.toDate(getLocalTimeZone()).toISOString().slice(0, 10));
							close();
						}
					"
				/>
			</PopoverContent>
		</Popover>
	</ControlWrapper>
</template>

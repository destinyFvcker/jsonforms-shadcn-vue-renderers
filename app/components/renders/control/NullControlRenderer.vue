<script setup lang="ts">
import { type ControlElement } from "@jsonforms/core";
import { rendererProps, useJsonFormsControl } from "@jsonforms/vue";
import { CircleSlashIcon } from "@lucide/vue";
import { Empty } from "../../ui/empty";
import { useShadcnControl } from "../utils";

const props = defineProps({
	...rendererProps<ControlElement>(),
});

const { onChange } = useShadcnControl(useJsonFormsControl(props));
onChange(null);
</script>

<template>
	<Empty class="border border-dashed">
		<EmptyHeader>
			<EmptyMedia variant="icon">
				<CircleSlashIcon />
			</EmptyMedia>
			<EmptyTitle>NULL</EmptyTitle>
			<EmptyDescription> represent null in anyof schema </EmptyDescription>
		</EmptyHeader>
	</Empty>
</template>

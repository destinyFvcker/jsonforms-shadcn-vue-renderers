<template>
	<!-- :class="arrayList.item" -->
	<div>
		<!-- :class="toolbarClasses"  -->
		<div class="flex gap-0.5 items-center" @click="expandClicked">
			<!-- :class="styles.arrayList.itemLabel" -->
			<div class="font-mono">{{ label }}</div>
			<!-- :class="styles.arrayList.itemMoveUp" -->
			<Button
				class="rounded-sm p-0! h-fit w-fit m-0"
				:disabled="!moveUpEnabled"
				variant="outline"
				@click="moveUpClicked"
			>
				<chevron-up />
			</Button>
			<!-- :class="styles.arrayList.itemMoveDown" -->
			<Button
				class="rounded-sm p-0! h-fit w-fit m-0"
				:disabled="!moveDownEnabled"
				variant="outline"
				@click="moveDownClicked"
			>
				<chevron-down />
			</Button>
			<!-- :class="styles.arrayList.itemDelete" -->
			<Button
				class="rounded-sm p-0! h-fit w-fit m-0"
				:disabled="!deleteEnabled"
				variant="outline"
				@click="deleteClicked"
			>
				<trash2 />
			</Button>
		</div>
		<!-- :class="contentClasses" -->
		<div>
			<slot></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
// import type { Styles } from "@jsonforms/vue-vanilla";
import { ref } from "vue";
import Button from "../../ui/button/Button.vue";
import { ChevronDown, ChevronUp, Trash2 } from "@lucide/vue";

const props = withDefaults(
	defineProps<{
		initiallyExpanded?: boolean;
		label?: string;
		moveUpEnabled?: boolean;
		moveDownEnabled?: boolean;
		moveUp?: () => void;
		moveDown?: () => void;
		deleteEnabled?: boolean;
		delete?: () => void;
		// styles: Styles;
	}>(),
	{
		initiallyExpanded: false,
		label: "",
		moveUpEnabled: true,
		moveDownEnabled: true,
		moveUp: undefined,
		moveDown: undefined,
		deleteEnabled: true,
		delete: undefined,
	},
);

const expanded = ref(props.initiallyExpanded);

function expandClicked() {
	expanded.value = !expanded.value;
}

function moveUpClicked(event: Event) {
	event.stopPropagation();
	props.moveUp?.();
}

function moveDownClicked(event: Event) {
	event.stopPropagation();
	props.moveDown?.();
}

function deleteClicked(event: Event) {
	event.stopPropagation();
	props.delete?.();
}
</script>

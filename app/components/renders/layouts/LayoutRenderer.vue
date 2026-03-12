<script setup lang="ts">
import { type Layout } from "@jsonforms/core";
import { DispatchRenderer, rendererProps, useJsonFormsLayout } from "@jsonforms/vue";
import { useVanillaLayout } from "@jsonforms/vue-vanilla";
import { computed } from "vue";

const props = defineProps({
	...rendererProps<Layout>(),
});

const { layout, styles } = useVanillaLayout(useJsonFormsLayout(props));

const layoutClassObject = computed(() => {
	return layout.value.direction === "row" ? styles.horizontalLayout : styles.verticalLayout;
});
</script>

<template>
	<!-- <pre>{{ layoutClassObject }}</pre> -->
	<!-- <pre>{{ layout.visible }}</pre> -->
	<!-- <pre>{{ layout.direction }}</pre> -->
	<!-- <pre>{{ styles }}</pre> -->

	<div
		v-if="layout.visible"
		:class="[layoutClassObject.root, layout.direction === 'column' ? 'space-y-2' : 'grid grid-cols-2 gap-2']"
	>
		<div
			v-for="(element, index) in layout.uischema.elements"
			:key="`${layout.path}-${index}`"
			:class="layoutClassObject.item"
		>
			<dispatch-renderer
				:schema="layout.schema"
				:uischema="element"
				:path="layout.path"
				:enabled="layout.enabled"
				:renderers="layout.renderers"
				:cells="layout.cells"
			/>
		</div>
	</div>
</template>

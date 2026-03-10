<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import type { ButtonVariants } from ".";
import { Primitive } from "reka-ui";
import { cn } from "@/lib/utils";
import { buttonVariants } from ".";
import { useTemplateRef } from "vue";

interface Props extends PrimitiveProps {
	variant?: ButtonVariants["variant"];
	size?: ButtonVariants["size"];
	class?: HTMLAttributes["class"];
}

const domRef = useTemplateRef("shadcn-button-ref");

defineExpose({
	domRef,
});

const props = withDefaults(defineProps<Props>(), {
	as: "button",
});
</script>

<template>
	<button
		ref="shadcn-button-ref"
		data-slot="button"
		:data-variant="variant"
		:data-size="size"
		:as="as"
		:as-child="asChild"
		:class="cn(buttonVariants({ variant, size }), props.class)"
	>
		<slot />
	</button>
</template>

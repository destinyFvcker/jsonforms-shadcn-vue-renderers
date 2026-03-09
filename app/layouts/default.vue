<script setup lang="ts">
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Columns3Cog, Database, Hand, IdCard, User, TestTube, ScanFaceIcon } from "lucide-vue-next";
import { cn } from "@/lib/utils";

const route = useRoute();
const currentPath = computed(() => route.path);

function isActive(to: string) {
	return currentPath.value === to || currentPath.value.startsWith(`${to}/`);
}
</script>

<template>
	<div class="flex h-screen flex-col">
		<header class="border-b bg-background">
			<div class="flex h-10 items-center gap-3 px-4">
				<NavigationMenu>
					<NavigationMenuList>
						<!-- 策略参数与状态的相关页面 -->
						<NavigationMenuItem>
							<NavigationMenuLink as-child class="h-auto p-1.5">
								<!-- <NuxtLink :to="strategyItem.to">
									<span
										:class="
											cn(
												'inline-flex items-center gap-1 whitespace-nowrap',
												isActive(strategyItem.to) && 'border-b-4 border-indigo-500 font-bold',
											)
										"
									>
										<component :is="strategyItem.icon" class="size-4" />
										{{ strategyItem.label }}
									</span>
								</NuxtLink> -->
							</NavigationMenuLink>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
			</div>
		</header>

		<main class="flex-1 p-1 overflow-y-auto bg-gray-100" my-layout>
			<slot />
		</main>
	</div>

	<!-- <BackToTop /> -->
</template>

<script setup lang="ts">
import { store } from './store'
const { counterId } = withDefaults(defineProps<{
	counterId?: string
}>(), {
	counterId: 'default',
})
</script>
<template>
	<label
		class="cursor-pointer rounded-md p-2.5 m-1 text-xs font-medium uppercase leading-normal text-white bg-secondary-500 hover:bg-secondary-600">
		<input @change="store.switch(counterId)" type="checkbox" class="peer sr-only" />
		<div
			class="relative grid grid-cols-2 transition duration-150 ease-in-out items-center  after:absolute  after:h-6 after:w-1/2 after:rounded-md after:bg-white/30 after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-focus:outline-none ">
			<span class="text-center">English</span>
			<span class="text-center">Français</span>
		</div>
	</label>
</template>
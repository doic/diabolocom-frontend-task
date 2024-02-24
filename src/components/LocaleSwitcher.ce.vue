<script setup lang="ts">
import { store } from '../stores/index'
import { colorVariants } from '../lib'
import { onMounted } from 'vue';

const { counterid, color, lg } = withDefaults(defineProps<{
	counterid?: string,
	color?: 'primary' | 'secondary' | 'neutral',
	lg?: 'en' | 'fr'
}>(), {
	counterid: 'default',
	color: 'primary',
	lg: 'en'
})
onMounted(() => {
	if (lg === 'fr') {
		store.switch(counterid)
	}
})
</script>
<template>
	<label :class="colorVariants[color].label"
		   class="block w-full cursor-pointer rounded-md p-2.5 text-xs font-medium uppercase leading-normal text-white ">
		<input @change="store.switch(counterid)"
			   type="checkbox"
			   :checked="lg === 'fr'"
			   class="peer sr-only" />
		<div
			 class="relative grid grid-cols-2 transition duration-150 ease-in-out items-center  after:absolute  after:h-6 after:w-1/2 after:rounded-md after:bg-white/30 after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-focus:outline-none ">
			<span class="text-center">English</span>
			<span class="text-center">Français</span>
		</div>
	</label>
</template>
<style>
@import '/tailwind.css';
</style>
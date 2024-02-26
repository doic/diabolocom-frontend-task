<script setup lang="ts">
import { store } from '../stores/index'
import { colorVariants, translations, eventHandler } from '../lib'

const { counterid, color } = withDefaults(defineProps<{
	counterid?: string,
	color?: 'primary' | 'secondary' | 'neutral'
}>(), {
	counterid: 'default',
	color: 'primary'
})




</script>
<template>
	<div :class="colorVariants[color].bg500"
		 class="grid grid-cols-2 rounded-md z-10"
		 role="group">
		<button :disabled="store.isMin(counterid)"
				@touchstart="eventHandler({ event: 'touch', action: 'decrement', e: $event, counterid })"
				@mousedown="eventHandler({ event: 'click', action: 'decrement', e: $event, counterid })"
				:class="colorVariants[color].button"
				class="decrement rounded-l-md border-r p-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out disabled:text-opacity-70 ">
			- {{ translations[store.getLocale(counterid)].minus }}
		</button>
		<button :disabled="store.isMax(counterid)"
				@touchstart="eventHandler({ event: 'touch', action: 'increment', e: $event, counterid })"
				@mousedown="eventHandler({ event: 'click', action: 'increment', e: $event, counterid })"
				:class="colorVariants[color].button"
				class="increment rounded-r-md p-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out disabled:text-opacity-70">
			{{ translations[store.getLocale(counterid)].plus }} +
		</button>
	</div>
</template>

<style>
@import '/tailwind.css';
</style>
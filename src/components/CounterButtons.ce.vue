<script setup lang="ts">
import { store } from '../stores/index'
import { colorVariants, translations } from '../lib'

const { counterid, color } = withDefaults(defineProps<{
	counterid?: string,
	color?: 'primary' | 'secondary' | 'neutral'
}>(), {
	counterid: 'default',
	color: 'primary'
})

const globalTimer = 10e3 / store.getRangeDiff(counterid)


const actions = {
	decrement: () => store.decrement(counterid),
	increment: () => store.increment(counterid)
}
const releaseEvents = {
	click: 'mouseup',
	touch: 'touchend'
}
type ActionType = keyof typeof actions;
type EventType = keyof typeof releaseEvents;
const eventHandler = (event: EventType, action: ActionType, e: MouseEvent | TouchEvent) => {
	e.preventDefault()
	e.stopPropagation()

	actions[action]()

	const timeout = setTimeout(() => {
		const interval = setInterval(() => {
			actions[action]()
			if (store.isMin(counterid) || store.isMax(counterid)) stop(), cancel()
		}, globalTimer)
		const stop = () => clearInterval(interval)
		window.addEventListener(releaseEvents[event], stop, { once: true })
	}, 250)

	const cancel = () => { clearTimeout(timeout); }
	window.addEventListener(releaseEvents[event], cancel, { once: true })
}

</script>
<template>
	<div :class="colorVariants[color].bg500"
		 class="grid grid-cols-2 rounded-md"
		 role="group">
		<button :disabled="store.isMin(counterid)"
				@touchstart="eventHandler('touch', 'decrement', $event)"
				@mousedown="eventHandler('click', 'decrement', $event)"
				:class="colorVariants[color].button"
				class="decrement rounded-l-md border-r p-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out disabled:text-opacity-70 ">
			- {{ translations[store.getLocale(counterid)].minus }}
		</button>
		<button :disabled="store.isMax(counterid)"
				@touchstart="eventHandler('touch', 'increment', $event)"
				@mousedown="eventHandler('click', 'increment', $event)"
				:class="colorVariants[color].button"
				class="increment rounded-r-md p-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out disabled:text-opacity-70">
			{{ translations[store.getLocale(counterid)].plus }} +
		</button>
	</div>
</template>

<style>
@import '/tailwind.css';
</style>
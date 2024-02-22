<script setup lang="ts">
import { store } from '../stores/index'
import { colorVariants, translations } from '../lib'

const { counterId, color } = withDefaults(defineProps<{
	counterId?: string,
	color?: 'primary' | 'secondary' | 'neutral'
}>(), {
	counterId: 'default',
	color: 'primary'
})

const globalTimer = 10e3 / store.getRangeDiff(counterId)

/**
 * Repeats a function until the mouse is released or the counter value is out of range
 * @param {Function} fun - The function to repeat
 * @param {number} timer - The interval between each repetition
 */
const repeat = (fun: () => void, timer?: number) => {
	const interval = setInterval(() => {
		fun()
		if (store.isMin(counterId) || store.isMax(counterId)) stop()
	}, timer ?? globalTimer)
	const stop = () => clearInterval(interval)
	window.addEventListener('mouseup', stop, { once: true })

}
/**
 * Executes a function after a delay if the mouse has not been released
 * @param {Function} targetFunction - The function to delay
 * @param {Function} modifier - A function to modify the target function
 */
const delay = (targetFunction: () => void, modifier?: Function) => {
	const timeout = modifier ? setTimeout(modifier, 250, targetFunction) : setTimeout(targetFunction, 250)
	const cancel = () => { clearTimeout(timeout); targetFunction(); }
	window.addEventListener('mouseup', cancel, { once: true })
}

</script>
<template>
	<div :class="colorVariants[color].bg500"
		 class="grid grid-cols-2 rounded-md  m-1"
		 role="group">
		<button :disabled="store.isMin(counterId)"
				@mousedown="delay(() => store.decrement(counterId), repeat)"
				:class="colorVariants[color].button"
				class="decrement rounded-l border-r p-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out disabled:text-opacity-70 ">
			- {{ translations[store.getLocale(counterId)].minus }}
		</button>
		<button :disabled="store.isMax(counterId)"
				@mousedown="delay(() => store.increment(counterId), repeat)"
				:class="colorVariants[color].button"
				class="increment rounded-r p-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out disabled:text-opacity-70">
			{{ translations[store.getLocale(counterId)].plus }} +
		</button>
	</div>
</template>
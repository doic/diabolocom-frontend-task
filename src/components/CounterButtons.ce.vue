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

</script>
<template>
	<div :class="colorVariants[color].bg500" class="grid grid-cols-2 rounded-md  m-1" role="group">
		<button :disabled="store.isMin(counterId)" @click="store.decrement(counterId)" :class="colorVariants[color].button"
			class="rounded-l border-r p-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out disabled:text-opacity-70 ">
			- {{
				translations[store.getLocale(counterId)].minus }}
		</button>
		<button :disabled="store.isMax(counterId)" @click="store.increment(counterId)" :class="colorVariants[color].button"
			class="rounded-r p-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out disabled:text-opacity-70">
			{{
				translations[store.getLocale(counterId)].plus }} +
		</button>
	</div>
</template>
<script setup lang="ts">
const { counterId } = withDefaults(defineProps<{
	counterId?: string
}>(), {
	counterId: 'default',
})

import { store } from './store'
import { translations } from './translations'

</script>
<template>
	<div class="grid grid-cols-2 rounded-md bg-primary-500 m-1" role="group">
		<button :disabled="store.isMin(counterId)" @click="store.decrement(counterId)"
			class="rounded-l border-primary-700 border-r p-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out disabled:text-opacity-70 disabled:bg-primary-400 disabled:hover:bg-primary-400 hover:bg-primary-600 active:bg-primary-700">
			- {{
				translations[store.getLocale(counterId)].minus }}
		</button>
		<button :disabled="store.isMax(counterId)" @click="store.increment(counterId)"
			class="rounded-r p-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out disabled:text-opacity-70 disabled:bg-primary-400 disabled:hover:bg-primary-400 hover:bg-primary-600 active:bg-primary-700">
			{{
				translations[store.getLocale(counterId)].plus }} +
		</button>
	</div>
</template>
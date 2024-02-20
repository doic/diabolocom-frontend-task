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
	<button class="decrement" :disabled="store.isMin(counterId)" @click="store.decrement(counterId)">{{
		translations[store.getLocale(counterId)].minus }}</button>
	<button class="increment" :disabled="store.isMax(counterId)" @click="store.increment(counterId)">{{
		translations[store.getLocale(counterId)].plus }}</button>
</template>
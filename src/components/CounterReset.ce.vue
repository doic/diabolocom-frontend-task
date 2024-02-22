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
	<button :disabled="store.getCounter(counterId) === 0" @click="store.reset(counterId)" :class="colorVariants[color].button"
		class="rounded-md m-1 p-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out">
		{{ translations[store.getLocale(counterId)].reset }}
	</button>
</template>
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
</script>
<template>
	<button :disabled="store.getCounter(counterid) === 0"
			@click="store.reset(counterid)"
			:class="colorVariants[color].button"
			class=" w-full rounded-md p-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out">
		{{ translations[store.getLocale(counterid)].reset }}
	</button>
</template>

<style>
@import '/tailwind.css';
</style>
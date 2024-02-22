<script setup lang="ts">
import CounterButtons from './CounterButtons.ce.vue'
import CounterDisplay from './CounterDisplay.ce.vue'
import CounterReset from './CounterReset.ce.vue'
import LocaleSwitcher from './LocaleSwitcher.ce.vue'
import { colorVariants } from '../lib'

const { counterId, min, max, value } = withDefaults(defineProps<{
	counterId?: string
	color?: 'primary' | 'secondary' | 'neutral'
	min?: string
	max?: string
	value?: string
}>(), {
	counterId: 'default',
	color: 'primary'
})
</script>
<template>
	<div :class="colorVariants[color].bg200" class="relative flex flex-col w-full xs:w-1/2 max-w-[30rem] p-4 rounded-md">
		<CounterDisplay :counterId="counterId" :min="min" :max="max" :value="value" :color="color" />
		<CounterButtons :counterId="counterId" :min="min" :max="max" :value="value" :color="color" />
		<CounterReset :counterId="counterId" :color="color" />
		<LocaleSwitcher :counterId="counterId" :color="color" />
	</div>
</template>
<script setup lang="ts">
import CounterButtons from './CounterButtons.ce.vue'
import CounterDisplay from './CounterDisplay.ce.vue'
import CounterReset from './CounterReset.ce.vue'
import LocaleSwitcher from './LocaleSwitcher.ce.vue'
import { colorVariants } from '../lib'

const { counterid, min, max, value } = withDefaults(defineProps<{
	counterid?: string
	color?: 'primary' | 'secondary' | 'neutral'
	min?: string
	max?: string
	value?: string
	lg?: 'en' | 'fr'
}>(), {
	counterid: 'default',
	color: 'primary',
	lg: 'en',
})
</script>
<template>
	<div :class="colorVariants[color].bg200"
		 class="relative flex flex-col min-w-[20rem] w-full max-w-[30rem] p-8 gap-4 rounded-md">
		<CounterDisplay :counterid="counterid"
						:min="min"
						:max="max"
						:value="value"
						:color="color" />
		<CounterButtons :counterid="counterid"
						:min="min"
						:max="max"
						:value="value"
						:color="color" />
		<CounterReset :counterid="counterid"
					  :color="color" />
		<LocaleSwitcher :counterid="counterid"
						:color="color"
						:lg="lg" />
	</div>
</template>

<style>
@import '/tailwind.css';
</style>
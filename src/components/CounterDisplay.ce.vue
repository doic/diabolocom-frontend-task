<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { store } from '../stores/index'
import { colorVariants, translations } from '../lib'

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
if (min !== undefined || max !== undefined) {
	store.setRange([min?.length ? +min : undefined, max?.length ? +max : undefined], counterId)
}
const hasFullRange = min !== undefined && max !== undefined

if (value !== undefined) {
	store.counters.set(counterId, +value)
}
const scaledValue = computed(() => {
	if (hasFullRange) {
		const [min, max] = store.getRange(counterId) as [number, number]
		const value = store.getCounter(counterId)
		return Math.ceil((value - min) / (max - min) * circumference.value)
	}
	return store.getCounter(counterId)
})

const circumference = ref(0)
const strokeGap = computed(() => scaledValue.value < circumference.value ? circumference.value - scaledValue.value : 0)

/**
 * Update the circumference of the circle onMount, or when the window is resized
 */
const updateCircumference = () => {
	if (!hasFullRange) return
	const svgElement = document.querySelector('svg#chart_' + counterId);
	const width = svgElement?.getBoundingClientRect().width ?? 0
	const radius = width * 45 / 100
	circumference.value = 2 * Math.PI * radius
}
onMounted(() => {
	updateCircumference()
	window.addEventListener('resize', updateCircumference)
})
</script>
<template>
	<div class="m-1 text-xl font-medium  leading-normal">
		<svg :id="'chart_' + counterId" v-if="hasFullRange" view-box="0 0 100 100"
			class="w-full mx-auto max-w-48 aspect-square">
			<circle class="stroke-[1rem] fill-none" :class="colorVariants[color].stroke900" cx="50%" cy="50%" r="45%" />
			<circle stroke-linecap="round" :stroke-dasharray="scaledValue + ' ' + strokeGap"
				:class="colorVariants[color].stroke500"
				class="stroke-[.5rem] fill-none -rotate-90 origin-center transition-all duration-300" cx="50%" cy="50%"
				r="45%" />
			<text text-anchor="middle" class="" x="50%" y="50%">
				<tspan>{{ translations[store.getLocale(counterId)].value }}:</tspan>
				<tspan class="value" x="50%" dy="1.2em">{{ store.getCounter(counterId) }}</tspan>
			</text>
		</svg>
		<div class="w-full mx-auto max-w-48 aspect-square text-center pt-8" v-else>{{
			translations[store.getLocale(counterId)].value }}:
			<span class="value">{{ store.getCounter(counterId) }}</span>
		</div>
	</div>
</template>
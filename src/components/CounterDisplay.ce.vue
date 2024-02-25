<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { store } from '../stores/index'
import { colorVariants, translations } from '../lib'

const { counterid, min, max, value } = withDefaults(defineProps<{
	counterid?: string
	color?: 'primary' | 'secondary' | 'neutral'
	min?: string
	max?: string
	value?: string
}>(), {
	counterid: 'default',
	color: 'primary'
})
if (min !== undefined || max !== undefined) {
	store.setRange([min?.length ? +min : undefined, max?.length ? +max : undefined], counterid)
}
const hasFullRange = min !== undefined && max !== undefined

if (value !== undefined) {
	store.counters.set(counterid, +value)
}
const scaledValue = computed(() => {
	if (hasFullRange) {
		const [min, max] = store.getRange(counterid) as [number, number]
		const value = store.getCounter(counterid)
		return Math.ceil((value - min) / (max - min) * circumference.value)
	}
	return store.getCounter(counterid)
})
// We need this element to calculate the circumference of the circle
let svgElement: SVGElement | null;
const circumference = ref(0)
const strokeGap = computed(() => scaledValue.value < circumference.value ? circumference.value - scaledValue.value : 0)

/**
 * Update the circumference of the circle onMount, or when the window is resized
 */
const updateCircumference = () => {
	if (!hasFullRange) return

	const width = svgElement?.getBoundingClientRect().width ?? 0 // arbitray value, looks like svgElement is not found in shadow dom :-(
	const radius = width * 45 / 100
	circumference.value = 2 * Math.PI * radius
	console.log({ svgElement, circumference: circumference.value })
}
onMounted(() => {
	svgElement = document.querySelector('svg#chart_' + counterid);
	// In the case of shadow dom, svgElement is not found
	if (!svgElement) {
		const attributeSelector = counterid === 'default' ? ':not([counterid])' : '[counterid="' + counterid + '"]'
		const cc = document.querySelector('dbl-counter' + attributeSelector);
		console.log({ cc })
		// We target dbl-counter (if we use one web component) or dbl-display (if we use the 4 web components)
		const shadowRoot = cc ? cc.shadowRoot : document.querySelector('dbl-display' + attributeSelector)
		svgElement = shadowRoot?.querySelector('svg#chart_' + counterid) ?? null
	}
	updateCircumference()
	window.addEventListener('resize', updateCircumference)
})
</script>
<template>
	<div :class="hasFullRange ? 'chart' : 'no-chart'"
		 class="display text-xl font-medium  leading-normal">
		<svg :id="'chart_' + counterid"
			 v-if="hasFullRange"
			 view-box="0 0 100 100"
			 class="w-full mx-auto max-w-48 aspect-square">
			<circle class="stroke-[1rem] fill-none"
					:class="colorVariants[color].stroke900"
					cx="50%"
					cy="50%"
					r="45%" />
			<circle stroke-linecap="round"
					:stroke-dasharray="scaledValue + ' ' + strokeGap"
					:class="colorVariants[color].stroke500"
					class="stroke-[.5rem] fill-none -rotate-90 origin-center transition-all duration-300"
					cx="50%"
					cy="50%"
					r="45%" />
			<text text-anchor="middle"
				  class=""
				  x="50%"
				  y="50%">
				<tspan>{{ translations[store.getLocale(counterid)].value }}:</tspan>
				<tspan class="value"
					   x="50%"
					   dy="1.2em">{{ store.getCounter(counterid) }}</tspan>
			</text>
		</svg>
		<div class="w-full mx-auto max-w-48 aspect-square text-center pt-8"
			 v-else>{{
			 	translations[store.getLocale(counterid)].value }}:
			<span class="value">{{ store.getCounter(counterid) }}</span>
		</div>
	</div>
</template>
<style>
@import '/tailwind.css';
</style>
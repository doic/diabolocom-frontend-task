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
		return (value - min) / (max - min) * circumference.value * 2 / 3
	}
	return store.getCounter(counterid)
})
// We need this element to calculate the circumference of the circle
let svgElement: SVGElement | null;
const circumference = ref(0)
const circ33 = computed(() => circumference.value / 3)
const circ66 = computed(() => circumference.value * 2 / 3)
const strokeGap = computed(() => scaledValue.value < circumference.value ? circumference.value - scaledValue.value : 0)

/**
 * Update the circumference of the circle onMount, or when the window is resized
 */
const updateCircumference = () => {
	if (!hasFullRange) return

	const width = svgElement?.getBoundingClientRect().width ?? 0 // arbitray value, looks like svgElement is not found in shadow dom :-(
	const radius = width * 45 / 100
	circumference.value = 2 * Math.PI * radius
}

onMounted(() => {
	svgElement = document.querySelector('svg#chart_' + counterid);
	// In the case of shadow dom, svgElement is not found
	if (!svgElement) {
		const attributeSelector = counterid === 'default' ? ':not([counterid])' : '[counterid="' + counterid + '"]'
		const cc = document.querySelector('dbl-counter' + attributeSelector);

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
		 class="display w-64 h-40 relative text-xl font-medium  leading-normal">
		<svg :id="'chart_' + counterid"
			 v-if="hasFullRange"
			 view-box="0 0 100 100"
			 class="mx-auto w-48 aspect-square">
			<circle stroke-linecap="round"
					class="stroke-[1rem] fill-none -rotate-[210deg] origin-center"
					:stroke-dasharray="circ66 + ' ' + circ33"
					:class="colorVariants[color].stroke900"
					cx="50%"
					cy="50%"
					r="45%" />
			<circle stroke-linecap="round"
					:stroke-dasharray="scaledValue + ' ' + strokeGap"
					:class="colorVariants[color].stroke500 + ' duration-[' + store.getTimer(counterid) + ']'"
					class="stroke-[.5rem] fill-none -rotate-[210deg] origin-center transition-all ease-in-out"
					cx="50%"
					cy="50%"
					r="45%" />
		</svg>
		<div v-if="hasFullRange"
			 :class="colorVariants[color].text900"
			 class="absolute text-sm text-right right-56 top-32 pt-2">{{
			 	store.getRange(counterid)?.[0] }}<br />
		</div>
		<div v-if="hasFullRange"
			 :class="colorVariants[color].text900"
			 class="absolute text-sm left-56 top-32 pt-2">{{
			 	store.getRange(counterid)?.[1] }}<br />
		</div>
		<div :class="colorVariants[color].text900"
			 class="absolute top-6 mx-auto w-64 h-40 text-center pt-8">{{
			 	translations[store.getLocale(counterid)].value }}:<br />
			<span :class="colorVariants[color].text500"
				  class="value font-bold">{{ store.getCounter(counterid) }}</span>
		</div>
	</div>
</template>
<style>
@import '/tailwind.css';
</style>
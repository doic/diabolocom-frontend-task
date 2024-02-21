<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { store } from './store'
const { counterId, min, max, value } = withDefaults(defineProps<{
	counterId?: string
	min?: string
	max?: string
	value?: string
}>(), {
	counterId: 'default',
})
if (min !== undefined || max !== undefined) {
	store.setRange(counterId, [min?.length ? +min : undefined, max?.length ? +max : undefined])
}
const hasFullRange = min !== undefined && max !== undefined

if (value !== undefined) {
	store.counters.set(counterId, +value)
}
const scaledValue = computed(() => {
	if (hasFullRange) {
		const [min, max] = store.getRange(counterId) as [number, number]
		const value = store.getCounter(counterId)
		return Math.ceil((value - min) / (max - min) * 360)
	}
	return store.getCounter(counterId)
})
let circumference = 0
const strokeStart = ref(360)
const strokeEnd = computed(() => 360 - scaledValue.value)
const animate = ref('animate')
watch(strokeEnd, () => {
	// Trick to restart the animation
	// animate.value = ''
	// animate.value = 'animate'
	// Next animation will start from the current value
	strokeStart.value = strokeEnd.value
})
onMounted(() => {
	if (!hasFullRange) return
	const svgElement = document.querySelector('svg#chart_' + counterId) as SVGElement;
	const width = svgElement.getBoundingClientRect().width
	const radius = width * 45 / 100
	circumference = 2 * Math.PI * radius
	console.log({ circumference })
})
</script>
<template>
	<div class="m-1 text-xl font-medium uppercase leading-normal">
		<svg :id="'chart_' + counterId" v-if="hasFullRange" view-box="0 0 100 100"
			class="w-full mx-auto max-w-48 aspect-square">
			<circle class="stroke-slate-900 stroke-[1rem] fill-none" cx="50%" cy="50%" r="45%" />
			<circle v-if="scaledValue" stroke-linecap="round" :stroke-dasharray="strokeEnd ? 360 : ''"
				:stroke-dashoffset="strokeEnd" :class="animate"
				class="stroke-primary-500 stroke-[.5rem] fill-none -rotate-90 origin-center" cx="50%" cy="50%" r="45%" />
			<text text-anchor="middle" x="50%" y="52%">{{ store.getCounter(counterId) }}</text>
		</svg>
		<div class="w-full text-center" v-else>{{ store.getCounter(counterId) }}</div>
	</div>
</template>

<style>
.animate {
	animation: progress 2s ease-out;
}

@keyframes progress {
	from {
		stroke-dashoffset: v-bind(strokeStart);
	}

	to {
		stroke-dashoffset: v-bind(strokeEnd);
	}
}
</style>
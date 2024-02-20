<script setup lang="ts">
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
</script>
<template>
	<svg v-if="hasFullRange">
		<circle class="range" cx="57" cy="57" r="52" />
		<circle class="value" cx="57" cy="57" r="52" />
	</svg>
	{{ store.getCounter(counterId) }}
</template>

<style>
svg {
	width: 114px;
	height: 114px;
	margin: 1em;
}

.range {
	fill: none;
	stroke-width: 10px;
	stroke: #1A2C34;
}

.value {
	fill: none;
	stroke-width: 10px;
	stroke-linecap: round;
	transform: rotate(-90deg);
	transform-origin: 50% 50%;
	stroke-dasharray: 360;
	stroke-dashoffset: 350;
	stroke: aqua;
	animation: progress .5s ease-out;
}

@keyframes progress {
	from {
		stroke-dashoffset: 360;
	}

	to {
		stroke-dashoffset: 350;
	}
}
</style>
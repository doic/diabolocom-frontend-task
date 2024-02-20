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
	<button @click="store.reset(counterId)">{{ translations[store.getLocale(counterId)].reset }}</button>
</template>
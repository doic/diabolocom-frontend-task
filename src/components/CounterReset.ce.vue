<script setup lang="ts">
const { counterId } = withDefaults(defineProps<{
	counterId?: string
}>(), {
	counterId: 'default',
})

import { store } from '@/stores/index'
import { translations } from '@/translations'

</script>
<template>
	<button @click="store.reset(counterId)"
		class="rounded-md m-1 p-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out bg-secondary-500 hover:bg-secondary-600 active:bg-secondary-700">
		{{ translations[store.getLocale(counterId)].reset }}
	</button>
</template>
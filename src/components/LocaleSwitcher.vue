<script setup lang="ts">
import { store } from './store'
const { counterId } = withDefaults(defineProps<{
	counterId?: string
}>(), {
	counterId: 'default',
})
</script>
<template>
	<select @change="store.switch(counterId)">
		<option value="en">English</option>
		<option value="fr">Français</option>
	</select>
</template>
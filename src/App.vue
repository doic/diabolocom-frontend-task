<script setup lang="ts">
import CounterButtons from './components/CounterButtons.vue'
import CounterDisplay from './components/CounterDisplay.vue'
import CounterReset from './components/CounterReset.vue'
import LocaleSwitcher from './components/LocaleSwitcher.vue'

</script>
<template>
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>

  <CounterButtons />
  <CounterDisplay />
  <CounterReset />
  <LocaleSwitcher />
  <hr />

  <CounterButtons counterId="1" />
  <CounterDisplay counterId="1" min="0" max="10" value="5" />
  <CounterReset counterId="1" />
  <LocaleSwitcher counterId="1" />
</template>

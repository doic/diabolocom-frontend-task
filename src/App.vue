<script setup lang="ts">
import CounterButtons from './components/CounterButtons.ce.vue'
import CounterDisplay from './components/CounterDisplay.ce.vue'
import CounterReset from './components/CounterReset.ce.vue'
import LocaleSwitcher from './components/LocaleSwitcher.ce.vue'
import CounterComponent from './components/CounterComponent.ce.vue'
</script>
<template>
  <h1 class="xs:text-xl md:text-2xl text-center m-4 font-bold">Diabolocom Frontend Task</h1>
  <div class="flex flex-col xs:flex-row justify-evenly gap-4 m-4">
    <div class="relative flex flex-col w-full xs:w-1/2 max-w-[30rem] bg-primary-200 p-4 rounded-md">
      <CounterDisplay />
      <CounterButtons />
      <CounterReset />
      <LocaleSwitcher />
    </div>

    <CounterComponent counterId="1" min="-100" max="100" value="0" color="neutral" />

    <CounterComponent counterId="2" min="0" max="10" value="5" color="secondary" />

  </div>
</template>

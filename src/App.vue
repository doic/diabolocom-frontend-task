<script setup lang="ts">
import CounterButtons from './components/CounterButtons.ce.vue'
import CounterDisplay from './components/CounterDisplay.ce.vue'
import CounterReset from './components/CounterReset.ce.vue'
import LocaleSwitcher from './components/LocaleSwitcher.ce.vue'
import CounterComponent from './components/CounterComponent.ce.vue'
</script>
<template>
  <h1 class="xs:text-xl md:text-2xl text-center m-4 font-bold">Diabolocom Frontend Task</h1>
  <div class="grid h-full md:grid-cols-2 gap-4 place-items-center">
    <div class="relative flex flex-col min-w-[20rem] w-full max-w-[30rem] bg-primary-200 p-8 gap-4 rounded-md">
      <CounterDisplay />
      <CounterButtons />
      <CounterReset />
      <LocaleSwitcher />
    </div>

    <CounterComponent counterid="1"
                      min="-100"
                      max="100"
                      value="0"
                      color="neutral" />

    <CounterComponent counterid="2"
                      min="0"
                      max="10"
                      value="5"
                      color="secondary" />

  </div>
</template>

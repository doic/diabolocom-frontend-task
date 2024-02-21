<script setup lang="ts">
import CounterButtons from './components/CounterButtons.vue'
import CounterDisplay from './components/CounterDisplay.vue'
import CounterReset from './components/CounterReset.vue'
import LocaleSwitcher from './components/LocaleSwitcher.vue'
</script>
<template>
  <h1 class="xs:text-xl md:text-2xl text-center m-4 font-bold">Diabolocom Frontend Task</h1>
  <div class="flex flex-col xs:flex-row justify-evenly gap-4">
    <div class="relative flex flex-col w-full xs:w-1/2 max-w-[30rem]">
      <CounterButtons />
      <CounterDisplay />
      <CounterReset />
      <LocaleSwitcher />
    </div>

    <div class="relative flex flex-col w-full xs:w-1/2 max-w-[30rem]">
      <CounterButtons counterId="1" />
      <CounterDisplay counterId="1" min="0" max="10" value="5" />
      <CounterReset counterId="1" />
      <LocaleSwitcher counterId="1" />
    </div>
  </div>
</template>

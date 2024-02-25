<script setup lang="ts">
import CounterButtons from './components/CounterButtons.ce.vue'
import CounterDisplay from './components/CounterDisplay.ce.vue'
import CounterReset from './components/CounterReset.ce.vue'
import LocaleSwitcher from './components/LocaleSwitcher.ce.vue'
import CounterComponent from './components/CounterComponent.ce.vue'
</script>
<template>
  <h1 class="xs:text-xl md:text-2xl text-center m-4 font-bold">Diabolocom Frontend Task</h1>
  <h2 class="xs:text-lg md:text-xl text-center m-4 mb-8 font-bold">
    <img alt="VueJs Icon"
         class="w-8 h-8 inline-block mr-2"
         src="./assets/vue_icon.png" />VueJs Components Version
  </h2>
  <div class="grid md:grid-cols-2 h-full gap-4 place-items-center">
    <div>
      <div class="relative flex flex-col min-w-[20rem] w-full max-w-[30rem] bg-primary-200 p-8 gap-4 rounded-md">
        <CounterDisplay />
        <CounterButtons />
        <CounterReset />
        <LocaleSwitcher />
      </div>
    </div>
    <div>
      <CounterComponent counterid="1"
                        min="-100"
                        max="100"
                        value="30"
                        lg="fr"
                        color="secondary" />

    </div>
  </div>
</template>

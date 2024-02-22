import { defineCustomElement } from 'vue'
import ButtonsSFC from './components/CounterButtons.ce.vue'
import DisplaySFC from './components/CounterDisplay.ce.vue'
import ResetSFC from './components/CounterReset.ce.vue'
import LocaleSFC from './components/LocaleSwitcher.ce.vue'
import CounterSFC from './components/CounterComponent.ce.vue'

const Buttons = defineCustomElement(ButtonsSFC)
const Display = defineCustomElement(DisplaySFC)
const Reset = defineCustomElement(ResetSFC)
const Locale = defineCustomElement(LocaleSFC)
const Counter = defineCustomElement(CounterSFC)

export { Buttons, Display, Reset, Locale, Counter }

// register global typings
declare module 'vue' {
  export interface GlobalComponents {
    Buttons: typeof Buttons
    Display: typeof Display
    Reset: typeof Reset
    Locale: typeof Locale
    Counter: typeof Counter
  }
}

export function register(prefix = 'dbl') {
  customElements.define(prefix + '-buttons', Buttons)
  customElements.define(prefix + '-display', Display)
  customElements.define(prefix + '-reset', Reset)
  customElements.define(prefix + '-locale', Locale)
  customElements.define(prefix + '-counter', Counter)
}

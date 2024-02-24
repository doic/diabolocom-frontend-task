import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import CounterDisplay from '../CounterDisplay.ce.vue'
import CounterReset from '../CounterReset.ce.vue'
import CounterButtons from '../CounterButtons.ce.vue'
import LocaleSwitcher from '../LocaleSwitcher.ce.vue'

describe('LocaleSwitcher', () => {
  const displayWrapper = mount(CounterDisplay)
  const resetWrapper = mount(CounterReset)
  const buttonsWrapper = mount(CounterButtons)
  const localeWrapper = mount(LocaleSwitcher)
  const localeCheckbox = localeWrapper.find<HTMLInputElement>('input')

  const displayWrapperFr = mount(CounterDisplay, { props: { counterid: 'fr' } })
  const resetWrapperFr = mount(CounterReset, { props: { counterid: 'fr' } })
  const buttonsWrapperFr = mount(CounterButtons, { props: { counterid: 'fr' } })
  mount(LocaleSwitcher, { props: { counterid: 'fr', lg: 'fr' } })

  it('render properly (language = en) with no CounterDisplay props', () => {
    expect(displayWrapper.text()).toContain('Value')
    expect(resetWrapper.text()).toContain('Reset')
    expect(buttonsWrapper.text()).toContain('Increase')
  })
  it('render properly (language = fr) with CounterDisplay props', () => {
    expect(displayWrapperFr.text()).toContain('Valeur')
    expect(resetWrapperFr.text()).toContain('Réinitialiser')
    expect(buttonsWrapperFr.text()).toContain('Augmenter')
  })
  it('affects only one group of components', async () => {
    await localeCheckbox.trigger('change')
    expect(displayWrapper.text()).toContain('Valeur')
    expect(displayWrapperFr.text()).toContain('Valeur')
    await localeCheckbox.trigger('change')
    expect(displayWrapper.text()).toContain('Value')
    expect(displayWrapperFr.text()).toContain('Valeur')
  })
})

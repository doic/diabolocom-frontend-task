import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import CounterDisplay from '../CounterDisplay.ce.vue'
import CounterReset from '../CounterReset.ce.vue'

describe('CounterReset', () => {
  const displayWrapper = mount(CounterDisplay)
  const resetWrapper = mount(CounterReset)
  const resetButton = resetWrapper.find<HTMLButtonElement>('button')
  const value = displayWrapper.find('.value')

  const displayWrapper5 = mount(CounterDisplay, { props: { counterid: 'value5', value: '5' } })
  const resetWrapper5 = mount(CounterReset, { props: { counterid: 'value5' } })
  const resetButton5 = resetWrapper5.find<HTMLButtonElement>('button')
  const value5 = displayWrapper5.find('.value')

  const displayWrapper10 = mount(CounterDisplay, { props: { counterid: 'value10', value: '10' } })
  const value10 = displayWrapper10.find('.value')

  it('render properly (button disabled) with no CounterDisplay props', () => {
    expect(value.text()).toBe('0')
    expect(resetButton.element.disabled).toBe(true)
  })
  it('correctly reset to 0', async () => {
    await resetButton5.trigger('click')
    expect(value5.text()).toBe('0')
  })
  it('other counters not affected by this reset button', async () => {
    expect(value10.text()).toBe('10')
  })
})

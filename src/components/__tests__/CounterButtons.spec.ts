import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import CounterDisplay from '../CounterDisplay.ce.vue'
import CounterButtons from '../CounterButtons.ce.vue'

describe('CounterButtons', () => {
  const displayWrapper = mount(CounterDisplay)
  const buttonsWrapper = mount(CounterButtons)
  const incrementButton = buttonsWrapper.find<HTMLButtonElement>('button.increment')
  const decrementButton = buttonsWrapper.find<HTMLButtonElement>('button.decrement')

  const displayWrapperValue5 = mount(CounterDisplay, { props: { counterId: 'value5', value: '5' } })
  const buttonsWrapperValue5 = mount(CounterButtons, { props: { counterId: 'value5' } })
  const incrementButtonValue5 = buttonsWrapperValue5.find<HTMLButtonElement>('button.increment')
  const decrementButtonValue5 = buttonsWrapperValue5.find<HTMLButtonElement>('button.decrement')

  const displayWrapperRange = mount(CounterDisplay, {
    props: { counterId: 'range', value: '5', min: '4', max: '6' }
  })
  const buttonsWrapperRange = mount(CounterButtons, { props: { counterId: 'range' } })

  it('render properly with no CounterDisplay props', () => {
    expect(buttonsWrapper.find('button.increment').exists()).toBe(true)
    expect(buttonsWrapper.find('button.decrement').exists()).toBe(true)
  })
  it('correctly increment and decrement displayed value', async () => {
    await buttonsWrapperValue5.find('button.decrement').trigger('click')
    expect(displayWrapperValue5.text()).toBe('4')
    await buttonsWrapperValue5.find('button.increment').trigger('click')
    expect(displayWrapperValue5.text()).toBe('5')
  })
  it('correctly disabled when out of range', async () => {
    const incrementButtonRange = buttonsWrapperRange.find<HTMLButtonElement>('button.increment')
    const decrementButtonRange = buttonsWrapperRange.find<HTMLButtonElement>('button.decrement')
    await decrementButtonRange.trigger('click')
    expect(displayWrapperRange.text()).toBe('4')
    expect(decrementButtonRange.element.disabled).toBe(true)
    await incrementButtonRange.trigger('click') // 5
    await incrementButtonRange.trigger('click') // 6
    expect(displayWrapperRange.text()).toBe('6')
    expect(incrementButtonRange.element.disabled).toBe(true)
    await decrementButtonRange.trigger('click') // 5
  })

  it('correctly increment and decrement value with same counterId', async () => {
    await incrementButton.trigger('click')
    await incrementButton.trigger('click')
    expect(displayWrapper.text()).toBe('2')
    expect(displayWrapperValue5.text()).toBe('5')

    await decrementButton.trigger('click')
    expect(displayWrapper.text()).toBe('1')
    expect(displayWrapperValue5.text()).toBe('5')

    await incrementButtonValue5.trigger('click')

    expect(displayWrapper.text()).toBe('1')
    expect(displayWrapperValue5.text()).toBe('6')

    await decrementButtonValue5.trigger('click')
    expect(displayWrapper.text()).toBe('1')
    expect(displayWrapperValue5.text()).toBe('5')
  })
})

import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import CounterDisplay from '../CounterDisplay.ce.vue'
import CounterButtons from '../CounterButtons.ce.vue'

describe('CounterButtons', () => {
  const displayWrapper = mount(CounterDisplay)
  const buttonsWrapper = mount(CounterButtons)
  const incrementButton = buttonsWrapper.find<HTMLButtonElement>('button.increment')
  const decrementButton = buttonsWrapper.find<HTMLButtonElement>('button.decrement')
  const value = displayWrapper.find('.value')

  const displayWrapper5 = mount(CounterDisplay, { props: { counterId: 'value5', value: '5' } })
  const buttonsWrapper5 = mount(CounterButtons, { props: { counterId: 'value5' } })
  const incrementButton5 = buttonsWrapper5.find<HTMLButtonElement>('button.increment')
  const decrementButton5 = buttonsWrapper5.find<HTMLButtonElement>('button.decrement')
  const value5 = displayWrapper5.find('.value')

  const displayWrapperRange = mount(CounterDisplay, {
    props: { counterId: 'range', value: '5', min: '4', max: '6' }
  })
  const buttonsWrapperRange = mount(CounterButtons, { props: { counterId: 'range' } })
  const valueRange = displayWrapperRange.find('.value')

  it('render properly with no CounterDisplay props', () => {
    expect(buttonsWrapper.find('button.increment').exists()).toBe(true)
    expect(buttonsWrapper.find('button.decrement').exists()).toBe(true)
  })
  it('correctly increment and decrement displayed value', async () => {
    await buttonsWrapper5.find('button.decrement').trigger('click')
    expect(value5.text()).toBe('4')
    await buttonsWrapper5.find('button.increment').trigger('click')
    expect(value5.text()).toBe('5')
  })
  it('correctly disabled when out of range', async () => {
    const incrementButtonRange = buttonsWrapperRange.find<HTMLButtonElement>('button.increment')
    const decrementButtonRange = buttonsWrapperRange.find<HTMLButtonElement>('button.decrement')
    await decrementButtonRange.trigger('click')
    expect(valueRange.text()).toBe('4')
    expect(decrementButtonRange.element.disabled).toBe(true)
    await incrementButtonRange.trigger('click') // 5
    await incrementButtonRange.trigger('click') // 6
    expect(valueRange.text()).toBe('6')
    expect(incrementButtonRange.element.disabled).toBe(true)
    await decrementButtonRange.trigger('click') // 5
  })

  it('correctly increment and decrement value with same counterId', async () => {
    await incrementButton.trigger('click')
    await incrementButton.trigger('click')
    expect(value.text()).toBe('2')
    expect(value5.text()).toBe('5')

    await decrementButton.trigger('click')
    expect(value.text()).toBe('1')
    expect(value5.text()).toBe('5')

    await incrementButton5.trigger('click')

    expect(value.text()).toBe('1')
    expect(value5.text()).toBe('6')

    await decrementButton5.trigger('click')
    expect(value.text()).toBe('1')
    expect(value5.text()).toBe('5')
  })
})

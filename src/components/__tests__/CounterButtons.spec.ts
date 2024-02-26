import { describe, it, expect } from 'vitest'
import * as matchers from 'vitest-axe/matchers'
expect.extend(matchers)

import { mount } from '@vue/test-utils'
import CounterDisplay from '../CounterDisplay.ce.vue'
import CounterButtons from '../CounterButtons.ce.vue'

describe('CounterButtons', () => {
  const displayWrapper = mount(CounterDisplay)
  const buttonsWrapper = mount(CounterButtons)
  const incrementButton = buttonsWrapper.find<HTMLButtonElement>('button.increment')
  const decrementButton = buttonsWrapper.find<HTMLButtonElement>('button.decrement')
  const value = displayWrapper.find('.value')

  const displayWrapper5 = mount(CounterDisplay, { props: { counterid: 'value5', value: '5' } })
  const buttonsWrapper5 = mount(CounterButtons, { props: { counterid: 'value5' } })
  const incrementButton5 = buttonsWrapper5.find<HTMLButtonElement>('button.increment')
  const decrementButton5 = buttonsWrapper5.find<HTMLButtonElement>('button.decrement')
  const value5 = displayWrapper5.find('.value')

  const displayWrapperRange = mount(CounterDisplay, {
    props: { counterid: 'range', value: '5', min: '4', max: '6' }
  })
  const buttonsWrapperRange = mount(CounterButtons, { props: { counterid: 'range' } })
  const valueRange = displayWrapperRange.find('.value')

  it('render properly with no CounterDisplay props', () => {
    expect(buttonsWrapper.find('button.increment').exists()).toBe(true)
    expect(buttonsWrapper.find('button.decrement').exists()).toBe(true)
  })
  it('correctly increment and decrement displayed value', async () => {
    // click event doesn't work the same way here and in the browser, we need to decompose the mousedown and mouseup events
    await buttonsWrapper5.find('button.decrement').trigger('mousedown')
    await buttonsWrapper5.find('button.decrement').trigger('mouseup')
    expect(value5.text()).toBe('4')
    await buttonsWrapper5.find('button.increment').trigger('mousedown')
    await buttonsWrapper5.find('button.increment').trigger('mouseup')
    expect(value5.text()).toBe('5')
  })
  it('correctly disabled when out of range', async () => {
    const incrementButtonRange = buttonsWrapperRange.find<HTMLButtonElement>('button.increment')
    const decrementButtonRange = buttonsWrapperRange.find<HTMLButtonElement>('button.decrement')
    await decrementButtonRange.trigger('mousedown')
    await decrementButtonRange.trigger('mouseup')
    expect(valueRange.text()).toBe('4')
    expect(decrementButtonRange.element.disabled).toBe(true)
    await incrementButtonRange.trigger('mousedown')
    await incrementButtonRange.trigger('mouseup') // 5
    await incrementButtonRange.trigger('mousedown')
    await incrementButtonRange.trigger('mouseup') // 6
    expect(valueRange.text()).toBe('6')
    expect(incrementButtonRange.element.disabled).toBe(true)
    await decrementButtonRange.trigger('mousedown')
    await decrementButtonRange.trigger('mouseup') // 5
  })

  it('correctly increment and decrement value with same counterid', async () => {
    await incrementButton.trigger('mousedown')
    await incrementButton.trigger('mouseup')
    await incrementButton.trigger('mousedown')
    await incrementButton.trigger('mouseup')
    expect(value.text()).toBe('2')
    expect(value5.text()).toBe('5')

    await decrementButton.trigger('mousedown')
    await decrementButton.trigger('mouseup')
    expect(value.text()).toBe('1')
    expect(value5.text()).toBe('5')

    await incrementButton5.trigger('mousedown')
    await incrementButton5.trigger('mouseup')

    expect(value.text()).toBe('1')
    expect(value5.text()).toBe('6')

    await decrementButton5.trigger('mousedown')
    await decrementButton5.trigger('mouseup')
    expect(value.text()).toBe('1')
    expect(value5.text()).toBe('5')
  })
})

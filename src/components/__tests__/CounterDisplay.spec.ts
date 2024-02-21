import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import CounterDisplay from '../CounterDisplay.ce.vue'

describe('CounterDisplay', () => {
  it('renders properly without props', () => {
    const wrapper = mount(CounterDisplay)
    expect(wrapper.text()).toContain('0')
    expect(wrapper.find('svg').exists()).toBe(false)
  })
  it('renders properly with value', () => {
    const wrapper = mount(CounterDisplay, { props: { value: '5' } })
    expect(wrapper.text()).toContain('5')
    expect(wrapper.find('svg').exists()).toBe(false)
  })
  it('renders properly with range set', () => {
    const wrapper = mount(CounterDisplay, { props: { min: '0', max: '10' } })
    expect(wrapper.find('svg').exists()).toBe(true)
  })
  it('renders properly if duplicated in the page', () => {
    const wrapper1 = mount(CounterDisplay, { props: { min: '0', max: '10' } })
    const wrapper2 = mount(CounterDisplay, { props: { counterId: '1' } })
    expect(wrapper1.find('svg').exists()).toBe(true)
    expect(wrapper2.find('svg').exists()).toBe(false)
  })
})

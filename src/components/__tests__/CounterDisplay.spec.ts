import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import CounterDisplay from '../CounterDisplay.ce.vue'

describe('CounterDisplay', () => {
  const wrapper = mount(CounterDisplay)
  const wrapper5 = mount(CounterDisplay, { props: { counterId: 'value5', value: '5' } })
  const wrapperRange = mount(CounterDisplay, {
    props: { counterId: 'fullRange', min: '0', max: '10' }
  })
  const wrapperColor = mount(CounterDisplay, {
    props: { counterId: 'color', min: '0', max: '10', color: 'secondary' }
  })
  it('renders properly without props', () => {
    expect(wrapper.text()).toContain('0')
    expect(wrapper.find('svg').exists()).toBe(false)
  })
  it('renders properly with value', () => {
    expect(wrapper5.text()).toContain('5')
    expect(wrapper5.find('svg').exists()).toBe(false)
  })
  it('renders properly with range set', () => {
    expect(wrapperRange.find('svg').exists()).toBe(true)
  })
  it('renders with correct color', () => {
    expect(wrapperColor.find('.stroke-secondary-500').exists()).toBe(true)
  })
  it('renders properly if duplicated in the page', () => {
    expect(wrapperRange.find('svg').exists()).toBe(true)
    expect(wrapper5.find('svg').exists()).toBe(false)
  })
})

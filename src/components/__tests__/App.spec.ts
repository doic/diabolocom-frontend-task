import { describe, it, expect } from 'vitest'
import * as matchers from 'vitest-axe/matchers'
import { axe } from 'vitest-axe'
expect.extend(matchers)

import { mount } from '@vue/test-utils'
import App from '../../App.vue'

describe('App', () => {
  const appWrapper = mount(App)

  it('renders properly with good accessibility', async () => {
    expect(await axe(appWrapper.element)).toHaveNoViolations()
  })
})

import { test, expect } from '@playwright/test'

// See here how to get started:
// https://playwright.dev/docs/intro
test('Vue Components', async ({ page }) => {
  await page.goto('/')
  test.step('visits the app root url', async () => {
    await expect(page.locator('div#app > h1')).toHaveText('Diabolocom Frontend Task')
    await expect(page.locator('.display')).toHaveCount(2)
    await expect(page.locator('.display.chart')).toHaveCount(1)
    await expect(page.locator('.display').first()).toContainText('0')
    await expect(page.locator('.display').last()).toContainText('30')
  })
  await page.locator('button.increment').first().click()
  test.step('increment button works', async () => {
    await expect(page.locator('.display').first()).toContainText('1')
    await expect(page.locator('.display').last()).toContainText('30')
  })
  await page.locator('button.reset').last().click()
  test.step('reset button works', async () => {
    await expect(page.locator('.display').first()).toContainText('1')
    await expect(page.locator('.display').last()).toContainText('0')
  })
  await page.locator('button.increment').last().click({ delay: 2000 })
  const display = await page.locator('.display').last().textContent()
  const value = display?.split(':')[1]?.trim() ?? 0
  test.step('long click works', async () => {
    expect(+value).toBeGreaterThan(5)
  })
})

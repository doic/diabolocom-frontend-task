import { reactive } from 'vue'

type StoreSettings = {
  value?: number
  range?: [number, number]
  locale?: 'en' | 'fr'
}
type Range = [number | undefined, number | undefined] | undefined
class Store {
  counters = new Map<string, number>()
  ranges = new Map<string, [number | undefined, number | undefined] | undefined>()
  locales = new Map<string, 'en' | 'fr'>()
  constructor(settings?: StoreSettings) {
    this.counters.set('default', settings?.value ?? 0)
    this.ranges.set('default', settings?.range)
    this.locales.set('default', settings?.locale ?? 'en')
  }
  /**
   * Get the value of the counter
   * @param counterid
   * @returns number
   */
  getCounter(counterid: string = 'default') {
    return this.counters.get(counterid) ?? 0
  }
  /**
   * Get the range of the counter
   * @param counterid
   * @returns Range
   */
  getRange(counterid: string = 'default'): Range {
    return this.ranges.get(counterid)
  }
  /**
   * Get the difference between the min and max of the counter
   * @param counterid
   * @returns number
   */
  getRangeDiff(counterid: string = 'default') {
    return Math.abs((this.getRange(counterid)?.[1] ?? 0) - (this.getRange(counterid)?.[0] ?? 0))
  }
  /**
   * Get the timer value based on the range of the counter.
   * The timer is used for animations and is inversely proportional to the range.
   * @param counterid
   * @returns number - defaults to 10, minimum value of 1
   */
  getTimer(counterid: string = 'default') {
    const range = this.getRangeDiff(counterid)
    if (range === 0) return 10
    const timer = 5e3 / this.getRangeDiff(counterid)
    return timer < 1 ? 1 : timer
  }
  /**
   * Set the range of the counter
   * @param counterid
   * @param range [min, max]
   */
  setRange(range: [number | undefined, number | undefined], counterid: string = 'default') {
    this.ranges.set(counterid, range)
  }
  /**
   * Check if the counter is at its minimum value
   * @param counterid
   * @returns boolean
   */
  isMin(counterid: string = 'default') {
    const value = this.getCounter(counterid)
    const min = this.getRange(counterid)?.[0]
    // without a min value, isMin is always false
    if (min === undefined) return false
    // otherwise, we compare the value to the min
    return value <= min
  }
  /**
   * Check if the counter is at its maximum value
   * @param counterid
   * @returns boolean
   */
  isMax(counterid: string = 'default') {
    const value = this.getCounter(counterid)
    const max = this.getRange(counterid)?.[1]
    // without a max value, isMax is always false
    if (max === undefined) return false
    // otherwise, we compare the value to the max
    return value >= max
  }
  /**
   * Get the locale of the counter
   * @param counterid
   * @returns 'en' | 'fr'
   */
  getLocale(counterid: string = 'default') {
    return this.locales.get(counterid) ?? 'en'
  }
  /**
   * Increment the counter, unless it's already at the maximum value
   * @param counterid
   */
  increment(counterid: string = 'default') {
    if (!this.isMax(counterid)) this.counters.set(counterid, this.getCounter(counterid) + 1)
  }
  /**
   * Decrement the counter, unless it's already at the minimum value
   * @param counterid
   */
  decrement(counterid: string = 'default') {
    if (!this.isMin(counterid)) this.counters.set(counterid, this.getCounter(counterid) - 1)
  }
  /**
   * Reset the counter to 0
   * @param counterid
   */
  reset(counterid: string = 'default') {
    this.counters.set(counterid, 0)
  }
  /**
   * Switch the locale between 'en' and 'fr'
   * @param counterid
   */
  switch(counterid: string = 'default') {
    const locale = this.getLocale(counterid)
    this.locales.set(counterid, locale === 'en' ? 'fr' : 'en')
  }
}

export const store = reactive(new Store())

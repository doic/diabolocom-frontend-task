import { reactive } from 'vue'

type StoreSettings = {
  value?: number
  range?: [number, number]
  locale?: 'en' | 'fr'
}
class Store {
  counters = new Map<string, number>()
  ranges = new Map<string, [number | undefined, number | undefined] | undefined>()
  locales = new Map<string, 'en' | 'fr'>()
  constructor(settings?: StoreSettings) {
    this.counters.set('default', settings?.value ?? 0)
    this.ranges.set('default', settings?.range)
    this.locales.set('default', settings?.locale ?? 'en')
  }
  getCounter(counterid: string = 'default') {
    return this.counters.get(counterid) ?? 0
  }
  getRange(counterid: string = 'default') {
    return this.ranges.get(counterid)
  }
  getRangeDiff(counterid: string = 'default') {
    return Math.abs((this.getRange(counterid)?.[1] ?? 0) - (this.getRange(counterid)?.[0] ?? 0))
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

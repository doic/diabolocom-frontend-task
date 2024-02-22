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
  getCounter(counterId: string = 'default') {
    return this.counters.get(counterId) ?? 0
  }
  getRange(counterId: string = 'default') {
    return this.ranges.get(counterId)
  }
  getRangeDiff(counterId: string = 'default') {
    return Math.abs((this.getRange(counterId)?.[1] ?? 0) - (this.getRange(counterId)?.[0] ?? 0))
  }
  /**
   * Set the range of the counter
   * @param counterId
   * @param range [min, max]
   */
  setRange(range: [number | undefined, number | undefined], counterId: string = 'default') {
    this.ranges.set(counterId, range)
  }
  /**
   * Check if the counter is at its minimum value
   * @param counterId
   * @returns boolean
   */
  isMin(counterId: string = 'default') {
    const value = this.getCounter(counterId)
    const min = this.getRange(counterId)?.[0]
    // without a min value, isMin is always false
    if (min === undefined) return false
    // otherwise, we compare the value to the min
    return value <= min
  }
  /**
   * Check if the counter is at its maximum value
   * @param counterId
   * @returns boolean
   */
  isMax(counterId: string = 'default') {
    const value = this.getCounter(counterId)
    const max = this.getRange(counterId)?.[1]
    // without a max value, isMax is always false
    if (max === undefined) return false
    // otherwise, we compare the value to the max
    return value >= max
  }
  getLocale(counterId: string = 'default') {
    return this.locales.get(counterId) ?? 'en'
  }
  /**
   * Increment the counter, unless it's already at the maximum value
   * @param counterId
   */
  increment(counterId: string = 'default') {
    if (!this.isMax(counterId)) this.counters.set(counterId, this.getCounter(counterId) + 1)
  }
  /**
   * Decrement the counter, unless it's already at the minimum value
   * @param counterId
   */
  decrement(counterId: string = 'default') {
    if (!this.isMin(counterId)) this.counters.set(counterId, this.getCounter(counterId) - 1)
  }
  /**
   * Reset the counter to 0
   * @param counterId
   */
  reset(counterId: string = 'default') {
    this.counters.set(counterId, 0)
  }
  /**
   * Switch the locale between 'en' and 'fr'
   * @param counterId
   */
  switch(counterId: string = 'default') {
    const locale = this.getLocale(counterId)
    this.locales.set(counterId, locale === 'en' ? 'fr' : 'en')
  }
}

export const store = reactive(new Store())

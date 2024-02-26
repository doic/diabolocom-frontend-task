import { store } from '../stores/index'

const releaseEvents = {
  click: 'mouseup',
  touch: 'touchend'
}
type ActionType = 'decrement' | 'increment'
type EventType = keyof typeof releaseEvents
type EventParams = {
  event: EventType
  action: ActionType
  e: MouseEvent | TouchEvent
  counterid: string
}
export const eventHandler = (params: EventParams) => {
  params.e.preventDefault()
  params.e.stopPropagation()

  // Delay between each increment/decrement, depending on the range
  const timer = store.getTimer(params.counterid)

  const actions = {
    decrement: () => store.decrement(params.counterid),
    increment: () => store.increment(params.counterid)
  }
  actions[params.action]()

  const timeout = setTimeout(() => {
    const interval = setInterval(() => {
      actions[params.action]()
      if (store.isMin(params.counterid) || store.isMax(params.counterid)) {
        stop()
        cancel()
      }
    }, timer)
    const stop = () => clearInterval(interval)
    window.addEventListener(releaseEvents[params.event], stop, { once: true })
  }, 250)

  const cancel = () => {
    clearTimeout(timeout)
  }
  window.addEventListener(releaseEvents[params.event], cancel, { once: true })
}

import './LazyMan'
import './LinkedList'
import './promiseLimit'
import './Scheduler'
import './deepClone'
import './quickSort'
import './formatMoney'

export function setupCounter(element: HTMLButtonElement) {
  let counter = 0
  const setCounter = (count: number) => {
    counter = count
    element.innerHTML = `count is ${counter}`
  }
  element.addEventListener('click', () => setCounter(++counter))
  setCounter(0)
}

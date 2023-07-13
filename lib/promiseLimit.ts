function PromiseLimit(
  fn: (...args: any[]) => Promise<any>,
  limit: number
): (...args: any[]) => Promise<any> {
  const queue: (() => void)[] = []
  let activeCount = 0

  const next = () => {
    activeCount--
    if (queue.length > 0) {
      queue.shift()?.()
    }
  }

  const run = (fn: () => Promise<void>) => {
    activeCount++
    fn().then(next)
  }

  return function (...args: any[]): Promise<any> {
    return new Promise(resolve => {
      const task = () => fn(...args).then(resolve)
      if (activeCount < limit) {
        run(task)
      } else {
        queue.push(() => run(task))
      }
    })
  }
}

function delay(time: number): Promise<any> {
  return new Promise(resolve => setTimeout(resolve, time))
}

const pDelay = PromiseLimit(delay, 2)
pDelay(1000).then(() => console.log(1))
pDelay(2000).then(() => console.log(2))
pDelay(3000).then(() => console.log(3))
pDelay(4000).then(() => console.log(4))

// 1
// 2
// 3
// 4

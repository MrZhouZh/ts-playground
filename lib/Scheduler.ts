type SchedulerTask = (...args: any[]) => Promise<any>

interface SchedulerInterface {
  /**
   * 添加任务
   * @param task 
   */
  add(task: SchedulerTask): Promise<any>

  /**
   * 任务开始
   */
  // taskStart(): void

  /**
   * 执行任务队列
   */
  schedule(): void
}

class Scheduler implements SchedulerInterface {
  limit: number
  taskQueue: SchedulerTask[]
  running: number

  constructor(limit: number) {
    this.limit = limit
    this.taskQueue = []
    this.running = 0
  }

  add(task: SchedulerTask): Promise<any> {
    return new Promise((resolve, reject) => {
      this.taskQueue.push(() => task().then(resolve).catch(reject))
      this.schedule()
    })
  }

  schedule(): void {
    while (
      this.taskQueue.length > 0 &&
      this.running < this.limit
    ) {
      const task = this.taskQueue.shift()
      task?.().finally(() => {
        this.running--
        this.schedule()
      })
      this.running++
    }
  }
}

const instance = new Scheduler(2)
const addTask = (time: number, order: string) => {
  instance.add(() => 
    new Promise(resolve => {
      console.log(`start ${order}`)
      setTimeout(() => {
        console.log(`end ${order}`)
        resolve(undefined)
      }, time)
    })
  )
}

addTask(1000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(400, '4')

// start 1
// start 2
// end 2
// start 3
// end 3
// start 4
// end 1
// end 4

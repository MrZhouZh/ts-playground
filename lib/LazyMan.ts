type Task = () => void

interface LazyManInterface {
  /**
   * 吃东西
   * @param food 
   */
  eat(food: string): this

  /**
   * 睡觉
   * @param time 
   */
  sleep(time: number): this
  
  /**
   * 睡觉前
   * @param time 
   */
  sleepFirst(time: number): this
  
  /**
   * 执行
   */
  next(): void
}

class LazyManClass implements LazyManInterface {
  name: string
  tasks: Task[]

  constructor(name: string) {
    this.name = name
    this.tasks = []

    setTimeout(() => {
      this.next()
    }, 0);
  }

  eat(food: string): this {
    const task = () => {
      console.log(`Eat ${food}~`)
      this.next()
    }
    this.tasks.push(task)
    return this
  }

  sleep(time: number): this {
    const task = () => {
      setTimeout(() => {
        console.log(`Wake up after ${time}`)
        this.next()
      }, time * 1000);
    }
    this.tasks.push(task)
    return this
  }

  sleepFirst(time: number): this {
    const task = () => {
      setTimeout(() => {
        console.log(`Make up after ${time}`)
        this.next()
      }, time * 1000);
    }
    this.tasks.unshift(task)
    return this
  }

  next(): void {
    if (this.tasks.length > 0) {
      const task = this.tasks.shift() as Task
      task()
    }
  }
}

function LazyMan(name: string) {
  return new LazyManClass(name)
}

LazyMan('Smith')
  .eat('lanuch')
  .sleepFirst(5)
  .sleep(3)
  .eat('dinner')

// Make up after 5
// Eat lanuch~
// Wake up after 3
// Eat dinner~

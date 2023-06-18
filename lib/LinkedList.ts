interface List<T> {
  /**
   * 头节点插入
   * @param value 
   */
  insertToHead(value: T): void

  findByValue(value: T): any

  findByIndex(index: number): any

  /**
   * 制定 index 后插入节点
   * @param value 
   * @param index 
   */
  insertToIndex(value: T, index: number): void

  remove(value: T): boolean

  /**
   * 尾节点插入
   * @param value 
   */
  insertToTail(value: T): void
  
  toString(): string
}

class LinkedList<T> implements List<T> {
  size: number = 0
  private head: LinkedListNode<T> | null = null
  private last: LinkedListNode<T> | null = null

  findByIndex(index: number): LinkedListNode<T> | null {
    let p = this.head
    let pos = 0
    while (p && pos !== index) {
      p = p.next
      pos++
    }
    return p
  }
  
  findByValue(value: T): LinkedListNode<T> | null {
    let p = this.head
    while (p && p.item !== value) {
      p = p.next
    }
    return p
  }

  insertToHead(value: T): void {
    let p = this.head
    const newNode = new LinkedListNode(value)
    // 没有元素初始化头尾节点
    if (!p) {
      this.last = this.head = newNode
    } else {
      p.prev = newNode
      newNode.next = p
      this.head = newNode
    }

    this.size++
  }

  insertToIndex(value: T, index: number): void {
    let p = this.head
    let pos = 0
    const newNode = new LinkedListNode(value)

    while (p !== null && pos !== index) {
      p = p.next
      pos++
    }

    if (p === null) return
    newNode.next = p.next
    p.next = newNode
    newNode.prev = p
    this.size++
  }

  insertToTail(value: T): void {
    let p = this.last
    const newNode = new LinkedListNode(value)
    if (p === null) {
      this.head =  this.last = newNode
    } else {
      p.next = newNode
      newNode.prev = p
      this.last = newNode
    }

    this.size++
  }

  remove(value: T): boolean {
    let p = this.head
    while(p && p.item !== value) {
      p = p.next
    }
    if (!p) return false
    if (p.prev) {
      p.prev.next = p.next
    } else {
      this.head = p.next
    }
    if (p.next) {
      p.next.prev = p.prev
    } else {
      this.last = p.prev
    }
    this.size--
    return true
  }

  toString(): string {
    let ret = ''
    let p = this.head
    while (p) {
      ret = ret ? `${ret} <-> ${p.item}` : `${p.item}`
      p = p.next
    }
    return ret
  }
}

class LinkedListNode<T> {
  item: T
  next: LinkedListNode<T> | null
  prev: LinkedListNode<T> | null

  constructor(
    item: T,
    next: LinkedListNode<T> | null = null,
    prev: LinkedListNode<T> | null = null,
  ) {
    this.item = item
    this.next = next
    this.prev = prev
  }
}

const linkedList = new LinkedList()
linkedList.insertToHead('12')
linkedList.insertToHead('www')
linkedList.insertToHead('Head')
linkedList.insertToTail('Tail')
linkedList.insertToIndex('woo', 0)
console.log(linkedList.findByValue('woo'))
console.log(linkedList.findByIndex(0))
// Head <-> woo <-> www <-> 12 <-> Tail
console.log(linkedList.toString())
console.log(linkedList)



import LinkedListNode from "./linked-list-node";

/**
 * LinkedListQueue
 */
export default class LinkedListQueue {
  /**
   * Construct a new LinkedList
   */
  constructor() {
    /** @type LinkedListNode */
    this.first = null;
    this.size = 0;
  }

  /**
   * @generator
   * @yields the next element in this LinkedList
   */
  *getElements() {
    let node = this.first;
    while (node !== null) {
      yield node.value;
      node = node.next;
    }
  }

  /**
   * @param {*} value
   */
  enqueue(value) {
    const newNode = new LinkedListNode(value, this.first);
    this.first = newNode;
    ++this.size;
  }

  /**
   * @return {*}
   */
  dequeue() {
    if (this.size < 1) throw Error("The LinkedListQueue is empty");
    const result = this.first;
    this.first = this.first.next;
    --this.size;
    return result.value;
  }
}

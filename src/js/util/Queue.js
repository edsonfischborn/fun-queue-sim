export default class Queue extends Array {
  constructor(...elements) {
    super(...elements);
  }

  enqueue(element) {
    return this.push(element);
  }

  dequeue() {
    if (this.isEmpty()) return null;
    return this.shift();
  }

  peek() {
    if (this.isEmpty()) return null;
    return this[0];
  }

  isEmpty() {
    return this.length === 0;
  }
}

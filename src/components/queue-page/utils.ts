interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  clear: () => void;
  peek: () => T | null;
}

export class Queue<T> implements IQueue<T> {
  container: (T | null)[] = [];
  head = 0;
  tail = 0;
  readonly size: number = 0;
  length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = new Array(size).fill(null);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }
    this.container[this.tail++] = item;
    this.length++;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    let item = this.container[this.head++];
    this.length--;
    const prev = this.head - 1;
    this.container[prev] = null;
    return item;
  };

  clear = () => {
    this.head = 0;
    this.tail = 0;
    this.length = 0;
    this.container = new Array(this.size).fill(null);
  };

  peek = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    return this.container[this.head % this.length];
  };

  isEmpty = () => this.length === 0;

  get elements() {
    return this.container;
  }
}

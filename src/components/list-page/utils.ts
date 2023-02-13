export class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

interface ILinkedList<T> {
  append: (element: T) => void;
  prepend: (element: T) => void;
  addByIndex: (element: T, position: number) => void;
  deleteByIndex: (position: number) => void;
  getSize: () => number;
  toArray: () => void;
  initiateList: () => void;
  deleteHead: () => void;
  deleteTail: () => void;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private tail: Node<T> | null;
  private size: number;
  private arr: any;
  constructor(arr?: T) {
    this.head = null;
    this.tail = null;
    this.size = 0;
    this.arr = arr;
  }

  initiateList() {
    if (this.arr) {
      let arr = this.arr;
      for (let i = 0; i < arr.length; i++) {
        this.append(arr[i]);
      }
    }
  }

  addByIndex(element: T, index: number) {
    if (index < 0 || index > this.size) {
      console.log("Enter a valid index");
      return;
    } else {
      const node = new Node(element);
      let previousNode: any;
      if (+index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let curr = this.head;
        let currIndex = 0;
        while (currIndex < index && curr) {
          currIndex++;
          previousNode = curr;
          curr = curr.next;
        }
        node.next = curr;
        previousNode.next = node;
      }

      this.size++;

    }
  }

  deleteByIndex(index: number) {
    if (index < 0 || index > this.size) { 
      return 'Incorrect value of position';
  }
  let current = this.head; 
  if (index === 0 && current) {
      this.head = current.next;
  } else {
      let prev = null;
      let position = 0;
      while(position < index && current) {
          prev = current;
          current = current.next;
          position++;
      }
     if(prev && current) prev.next = current.next; 
  }

  this.size--;
  }

  prepend(element: T) {
    const node = new Node(element, this.head);
    this.head = node;
    if (!this.tail) {
      this.tail = node;
    }
    this.size++;
    return this;
  }

  deleteHead() {
    if (!this.head) return;
    let newHead = this.head.next;
    this.head = newHead;
    this.size--;
    return this;
  }

  append(value: T) {
    const node = new Node(value);
    if (!this.head || !this.tail) {
      this.head = node;
      this.tail = node;
      this.size++;
      return this;
    }
    this.tail.next = node;
    this.tail = node;
    this.size++;
    return this;
  }

  deleteTail() {
    if (!this.tail) return;
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    }

    let current = this.head;
    while (current?.next) {
      if (!current.next.next) {
        current.next = null;
      } else {
        current = current.next;
      }
    }
    this.tail = current;
    this.size--;

  }

  getSize() {
    return this.size;
  }

  toArray() {
    const nodes = [];
    let current = this.head;
    while (current) {
      nodes.push(current);
      current = current.next;
    }
    return nodes;
  }
}

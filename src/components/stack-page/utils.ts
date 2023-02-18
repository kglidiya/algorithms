export interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  clear: () => void;
  peek: () => T | null;
  getSize: () => number;
}

export class Stack<T> implements IStack<T> {
  container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    this.container.pop();
  };

  clear = (): void => {
    this.container = [];
  };

  peek = (): T | null => {
    if (this.container.length > 0) {
      return this.container[this.container.length - 1];
    } else return null;
  };

  getSize = () => this.container.length;
}

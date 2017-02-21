'use strict';

let _counter = 1;

const Counter = {
  increment() {
    return _counter++;
  },
  subtracter() {
    _counter--;
  },
  assign(counter) {
    _counter = counter;
  }
};

export default Counter;

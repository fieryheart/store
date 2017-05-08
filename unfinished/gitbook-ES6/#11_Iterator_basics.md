# 迭代器-基础篇

### 数组是一个内置迭代器的对象
```
    let arr = ['a', 'b', 'c'];

    let iterator = arr[Symbol.iterator]();

    iterator.next();        // {value: "a", done: false}
    iterator.next();        // {value: "b", done: false}
    iterator.next();        // {value: "c", done: false}
    iterator.next();        // {value: undefined, done: true}
```

### 字符串也是个内置迭代器的对象
```
    let str = 'abc';

    let iterator = str[Symbol.iterator]();

    iterator.next();        // {value: "a", done: false}
    iterator.next();        // {value: "b", done: false}
    iterator.next();        // {value: "c", done: false}
    iterator.next();        // {value: undefined, done: true}
```

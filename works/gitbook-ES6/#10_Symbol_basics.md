# Symbol数据类型-基础篇

### 一个新的数据类型
```
    let sym = Symbol('sym');

    typeof sym;             // "symbol"
```

### 每个`Symbol()`是独一无二的，即使传入相同的参数
```
    let sym1 = Symbol('foo');
    let sym2 = Symbol('foo');

    sym1 === sym2;           // false
```

### 如果使用`new Symbol()`会抛出一个异议
```
    new Symbol();           // Uncaught TypeError: Symbol is not a constructor(…)
```

### `Symbol.for`用来全局注册Symbols
```
    let typeOfSym = typeof Symbol.for('sym');

    typeOfSym;          // symbol
```

### `Symbol.for`即可以用来创建，也可以用来查找
```
    let sym1 = Symbol.for('foo');
    let sym2 = Symbol.for('foo');

    sym1 === sym2;          // true
```

### `Symbol.for`和`Symbol()`不同，前者会存储，后者不会
```
    let globalSymbol = Symbol.for('new symbol');
    let localSymbol = Symbol('new symbol');

    globalSymbol === localSymbol;           // false
```

### 使用`toString()`
```
    let sym = Symbol('new symbol');

    sym.toString();             // 'Symbol(new symbol)'
```

### `Symbol.keyFor()`得到给定的symbol的关键字
```
    let sym = Symbol.for('foo');
    let sym1 = Symbol('foo');
    let key = Symbol.keyFor(sym);
    let key1 = Symbol.keyFor(sym1);

    key === 'foo'               // true
    key1                             // undefined
```

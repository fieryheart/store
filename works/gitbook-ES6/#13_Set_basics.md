# Set数据结构-基础篇

###`Set`是一个新的全局构造函数，在`Set`中每个值是独一的
```
    let set = new Set();

    set.add(1);
    set.add('1');

    set.size            // 2
```
```
    // NaN是一样的
    let set = new Set();
    set.add(NaN);
    set.add(NaN);

    set.size            // 1
```
```
    // +0、0和-0是一样的
    let set = new Set();

    set.add(+0);
    set.add(0);
    set.add(-0);

    set.size            // 1
```

### `add()`给一个Set对象的末尾添加一个元素
```
    let fn = function(){}
    let set = new Set();

    set.add(1).set(fn);

    set.size            // 2
```
```
    // 不添加参数时会自动添加undefined
    let set = new Set();
    set.add();

    set.has()           // true
    set.size             // 1 
```

### `delete()`删除Set对象中的一个元素
```
    let set = new Set();
    set.add('one').add('two').add('three');
    set.delete('one')               // true
    // undefined是
    set.add();
    set.delete();                      // true
```

### `Set`的api总和
```
    let api = ['size', 'add', 'clear', 'delete', 'entries', 'forEach', 'has', 'keys', 'values'];

    // 创建时可以带入一个数组
    let set = new Set(api);
    Array.from(set);                // ["size", "add", "clear", "delete", "entries", "forEach", "has", "keys", "values"]

    // size 是这些值的个数
    set.size                    // 9

    // clear() 清除所有元素
    set.clear()
    set                          // Set {}

    // entries() 返回一个所有值的遍历器
    var actualEntries = set.entries();
    [...actualEntries]       // [["size", "add", "clear", "delete", "entries", "forEach", "has", "keys", "values"],["size", "add", "clear", "delete", "entries", "forEach", "has", "keys", "values"]]

    // forEact() 对每个值调用一个回调函数
    let values = [];
    set.forEach(value => { values.push(value) });
    values                      // [["size", "add", "clear", "delete", "entries", "forEach", "has", "keys", "values"]]

    // keys() 和 values() 返回的内容一样
```

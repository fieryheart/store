# Map数据结构-基础篇

### `Map`是一个`key/value`的数据结构
```
    let map = new Map();
```

### map.set()、map.get()、map.has
```
    let map = new Map();
    map.set('key', 'value');
    map.get('key');             // "value"
    map.has('key');             // true
```

### map的初始化
```
    let pair1 = [1, 'one'];
    let pair2 = [2, 'two'];
    let map = new Map([pair1, pair2]); 
    // let map = new Map([[1, 'one'], [2, 'two']]);

    map         // {1 => "one", 2 => "two"}
```

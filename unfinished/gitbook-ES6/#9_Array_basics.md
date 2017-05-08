# 数组的扩展-基础篇

### Array.from
将一个类似数组的对象或是数列转换成一个数组
```
    let arrayLike = {0: 'one', 1: 'two', length: 2}
    let arr = Array.from(arrayLike);

    arr             // ["one", "two"]
```
```
    // 第二参数接受一个函数，函数的参数为传入对象的值和键
    let arrayLike = {0: 'one', 1: 'two', length: 2};
    let arr = Array.from(arrayLike, (value, key) => `${key}=${value}`);
    
    arr             // ["0=one", "1=two"]
```

### Array.of
创建一个数组，数组的元素为给定的参数
```
    let arr = Array.of(10,1);

    arr         // [10, 1]
```

### [].fill
第一个参数为填充的内容， 第二个参数为从哪里开始填充，第三个参数为从哪里结束
```
    let fillStartAt = 1;
    let fillEndAt = 3;
    let arr = [1,2,3,4].fill(42, fillStartAt, fillEndAt);

    arr             // [1, 42, 42, 4]
```

### [].find
在数组找到满足要求的第一个值
```
    let tom = {name: 'Tom'};
    let marlin = {name: 'Marlin'};
    let found = [tom, marlin].find(({name: {length}}) => length > 4);

    found           // {name: 'Marlin'}
```

### [].findIndex
在数组中找到满足要求的第一个值的位置
```
    let tom = {name: 'Tom'};
    let marlin = {name: 'Marlin'}
    let jack = {name: 'Jack'}
    let found = [tom, marlin, jack].find(({name:{length}}, index, arr) => length > 3 && index > 1);

    found       // {name: 'Jack'}
```

### [].entries()
返回一个迭代器对象
```
    let arr = ['a', 'b', 'c'];
    let arrIterator = arr.entries();
    let arrLike = Array.from(arrIterator);


    arrLike         // [[0,"a"], [1, "b"], [2, "c"]]

```

### [].keys [].values
均返回一个迭代器，其分别返回的是键和值
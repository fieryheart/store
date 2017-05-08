#rest操作符-基础

###特点
形式为（"...变量名"）

###用法
1、作为函数参数
```
    let fn = (...rest) => {
        console.log(rest);
    }

    fn(1, 2);           // [1,2]
```
```
    let fn = (first, ...rest) => {
        console.log(rest);
    }

    fn(1, 2, 3);        // [2, 3]
```

2、作为数组item, 使用解构赋值特性
```
    let [...all] = [1, 2, 3, 4];

    all;             // [1, 2, 3, 4]
```
```
    // 逗号省略情况
    let [, ...all] = [1, 2, 3, 4];

    all;            // [2, 3, 4]
```
```
    // 传入数组
    let arr = [3, 4];
    let arr1 = [1, 2, ...arr];

    arr1;           // [1, 2, 3, 4]
```
```
    // 创建对象
    let theDate = [2017, 2, 21];
    let date = new Date(...theDate);

    date;            // Tue Mar 21 2017 00:00:00 GMT+0800 (中国标准时间)
```

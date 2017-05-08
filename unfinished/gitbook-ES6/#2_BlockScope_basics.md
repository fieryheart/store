#块级作用域-基础篇

###特点
块级作用域概念：以`{}`为一个作用域，与原来的以全局和函数为作用域不同

###let
作用域严格限制在块级作用域中
```
    {
        let x = 1;
    }
    console.log(x);         // Uncaught ReferenceError
```

用于`for...in`
```
    let obj = {x:1, y:2};
    for(let i in obj){}
    console.log(i);         // Uncaught ReferenceError
```


###const
增加只读性的`let`声明方式
```
    const x = 'const';
    x = 'let';              // Uncaught TypeError
```

对数组和对象中的数据不加以限制只读性
```
    const arr = [1, 2, 3];
    const obj = {x: 1, y: 2};
    arr[0] = 2;
    console.log(arr[0]);            // 2
    obj.x = 2;
    console.log(obj.x);             // 2
```
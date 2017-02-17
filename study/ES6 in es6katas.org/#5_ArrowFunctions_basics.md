#“箭头”函数-基础篇

###特点
使用（`=>`）
```
    var fun = () => {
        return "arrow functions"
    }

    fun();          // "arrow functions"
```

只有`return`时不用加`{}`
```
    var fun = () => "arrow functions";
```

返回一个对象要加`()`
```
    var fun = () => ({type: 'an object'});

    fun()           // undefined

    var fun = () => ({type: 'an object'});

    fun()           // Object {type: "an object"}
```

只有一个参数时不用加`()`
```
    var fun = x => x+1;

    fun(1)           // 2
```

多个参数时要加`()`
```
    var fun = (x, y) => x+y;

    fun(1, 2)        // 3
```


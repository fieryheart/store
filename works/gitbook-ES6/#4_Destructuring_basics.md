#解构赋值-基础篇

###特点
一一对应

###数据类型
1、数组
```
    let [x, y] = [1, 2];
    [x, y] = [y, x];
    [x, y]          // [2, 1]
    x               // 2
    y               // 1

    // 稀疏情况
    let [  , , z ] = [ 'x' , 'y' , 'z' ];
    z               // "z"

    // 嵌套情况
    let [[firstName, surName] , age ] = [['Some', 'One'] , 23 ];
    firstName            // "Some"
    surName             // "One"
```

2、字符串
```
    //解析每个字符、缺失的位置为undefined、unicode字符也可以
    let [a, b, c] = 'a\u{2614}'
    a           // "a"
    b           // "☔"
    c           // undefined
```

3、对象
```
    let {x} = {x: 1};
    x           // 1

    let {z} = {x: 1};
    z           // undefined
```

4、默认值
```
    let [a=1] = [];
    a               // 1

    let {x, y=2} = {x:1};
    y               // 2
```

5、函数参数的解构赋值和默认值
```
    let fn = ({id, name}) => {
        console.log(id);
        console.log(name);
    }
    let user = {name: 'fieryheart', id: '01'};
    fn(user);       //01 fieryheart
---------------------------------------------------------------------
    let fn = (id , name='abc') => {
        console.log(id);
        console.log(name);
    }
    fn('01');           // 01 abc
```

6、另一种赋值和默认值
```
    let {x: y} = {x: 1};
    y           // 1

---------------------------------------------------------------------

    let {x: y=2} = {};
    y           // 2
```
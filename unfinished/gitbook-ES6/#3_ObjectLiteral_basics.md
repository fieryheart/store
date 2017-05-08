#对象的扩展-基础篇

###特点
允许简写
```
    var obj = {x};
    var obj = {func(){}};
```
允许属性名运算

###具体情况
属性简写
```
    var x = 1;
    var obj = {x};
    obj             // Object {x: 1}

    var func = (x) => x+1;
    var obj = {func};
    obj.func(1)           // 2
```

方法简写
```
    var obj = {
        func(x){
            return x+1;
        }
    }

    obj.func(1);            // 2         
```

属性名运算
```
    //属性名替换
    var propertyName = 'x';
    var obj = {[propertyName]: 1};
    obj.x               // 1

    //方法名替换一
    var key = 'func';
    var obj = {[key]() {
        return 'func';
    }}
    obj.func();         // "func"

    //方法名替换二
    var getKey =  () => "func";
    var obj = {[getKey()]() {
        return "func";
    }}
    obj.func();         // "func"
```

###getter和setter
getter和setter名也可以进行运算
```
    var getKeyName = 'getKey';
    var setKeyName = 'setKey';
    var obj = {
        key: null,
        get [getKeyName]() {
            return this.key;
        },
        set [setKeyName](keyName) {
            this.key = keyName;
        }
    }

    obj.getKey;         // null
    obj.setKey = 'key';
    obj.getKey;         // "key"
```
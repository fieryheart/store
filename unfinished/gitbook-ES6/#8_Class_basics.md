# 类-基础篇

### 申明方式
```'
    // class声明的数据类型是 函数
    class A{}
    let a = new A();

    typeof A;           // "function"
    typeof a;           // "object"
```

### 块级作用域
```
    {
        class A{}
    }
    new A();       // Uncaught ReferenceError: A is not defined 
```

### 属性初始化以及方法创建
```
    // 属性通过contructor创建，方法创建不需要逗号隔开
    class A{
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
        printXY() {
            console.log('x = ' + this.x);
            console.log('y = ' + this.y);
        }
    }

    let a = new A(1, 2);
    a.printXY();            // x = 1
                                // y = 2
```

### 存取器
```
    let propertyName = 'balance';
    class MyAccount {
        get [propertyName]() { return this.amount; }
        set [propertyName](amount)  { this.amount = amount; }
    }

    let account = new MyAccount();
    account.balance = 17;

    account.balance;            // 17
```

### 静态函数
```
    class A{
        static print(){
            console.log("it's a static function.");
        }
    }
    
    A.print();          // it's a static function.
```

### 继承
```
    class A{}
    class B extends A{}

    new B() instanceof A;           // true

```
```
    // 继承过程中存在运算
    const returnParent = (beNull) => beNull ? null : class {};
    class B extends (returnParent(1)) {}

    Object.getPrototypeOf( B.prototype );           // null
```

### super
```
    // 简单点说super就是对父类的引用

    class A {
        iAmSuper() { 
                return this.youAreSuper; 
            }
        }
  
    class B extends A {
        constructor() {
                // 由于extends存在，执行此句后才能在constructor()内使用this
                super();
                this.youAreSuper = true;
            }
        }

    class C extends B {
        iAmSuper() {
                // super取到A的iAmSuper方法
                return super.iAmSuper();
        }
    }

    new C().iAmSuper();
```

<!-- class A{
    constructor(){
    console.log(this.x);
}
}
let a = new A();

class A extends class{} {
    constructor(){
    super();
    this.x = 1;
}
}
let a = new A();



class A{}
class B extends A{
    setX(){
        this.x = 1;
    }
    getX(){
        console.log(this.x);
    }
}
let b = new B();
b.setX();
b.getX();

class A{
    constructor(){
    this.x = 1;
}
}
class B extends A{
    constructor(){
    super();
    console.log(this.x);
}
}

let b = new B(); -->
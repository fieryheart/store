# let和const命令

## 使用let声明的变量仅在块级作用域内有效
```
{
  let x = 1;
}
console.log(x); // 报错
```
```
// for语句中循环语句为一个父作用域，循环体内部为一个单独的子作用域
for(let i = 0; i < 3; i++){
  let i = "hello";
  console.log(i);
}
// hello
// hello
// hello
```

## let声明不存在变量提升
```
{
  console.log(x);   // 报错
  let x = 1;
}
```

## let声明锁定当前作用域
```
var str = "Hello";
{
  str = "Hello World";  // 报错
  let str;
}
```

## let不允许重复声明
```
// 不允许在相同作用域内，重复声明
{
  let a = 10;
  var a = 3;
} // 报错
// 不能在函数内部重新申明函数参数
(function func(arg) {
  let arg;
})() // 报错
(function func(arg) {
  {
    let arg;
  }
})() // 不报错
```

## 块级作用域
### 内层数据用let声明的情况下,外层作用于无法读取内层作用域变量
```
{{{{
  {let insane = 'Hello World'}
  console.log(insane); // 报错
}}}};
```
### ES6规定，允许在会计作用域之中声明函数
> 块级作用域之中，函数声明语句的行为类似于let，在块级作用域之外不可引用  

但是在在浏览器中的表现则不同，浏览器对函数的声明有另一套规定
+ 允许在块级作用域内声明函数
+ 函数声明类似于var，即会提升到全局作用域或函数作用域的头部
+ 同时，函数声明还会提神到所在的块级作用域的头部
```
// 浏览器的 ES6 环境
function f() { console.log('I am outside!'); }
(function () {
  var f = undefined;
  if (false) {
    function f() { console.log('I am inside!'); }
  }

  f();
}());
// Uncaught TypeError: f is not a function
```

## const
+ const的声明方式即是let加上值不变形式
+ 使用const声明的数组是可以改变其成员值的

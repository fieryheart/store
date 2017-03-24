# less学习笔记

## 常量
+ 使用`@变量: 值`来定义一个常量
+ 说是变量其实是常量，只能定义一次

## 混合
定义一个属性集,即使用`.变量`
```
//define
.bordered {
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}

//use
#menu a {
  color: #111;
  .bordered;
}

//output
#menu a {
  color: #111;
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}
```

## 带参数的混合
就像函数一样，也有默认值
```
.border-radius (@radius: 2px) {
  border-radius: @radius;
  -moz-border-radius: @radius;
  -webkit-border-radius: @radius;
}
#header {
  .border-radius(4px);
}
```

## 模式匹配和导引表达式
就是switch 和 if
```
// switch
.mixin (dark, @color){}
.mixin (light, @color){}
```
第一个参数不是@常量，是已确定的值，相当于case
```
//if
.mixin (@color) when (@color < FFFFFF){}
```
when后面的运算相当于if中的判断


循环
```
.loop(@counter) when (@counter > 0) {
.loop((@counter - 1));    //递归
width: (10px * @counter);
}

div {
.loop(5); // 调用循环
}
```

## 嵌套规则和运算
这个就不说了分别用{}和()
需要知道的是`&`，用来写串联选择器而不是后代选择器
```
.bordered{
  &.float{}
  .top{}
}

//output
.bordered.float{

}
.bordered .top{

}
```

## Color函数和Math函数
```
参照资料
round(1.67); // 2
ceil(1.4); // 2
floor(2.6); // 2
percentage(0.5); // 50%
```

## 命名空间
将一些变量或者混合模块打包起来
就像对象一样，使用`>`取其属性

## 作用域
```
@var: red;
#page {
  @var: white;
  #header {
    @var: blue;
    color: @var; //blue
  }
  color: @var; //white
}
```

## 注释
```
/**/和//
```

## Importing
使用@import
`@impory "lib.css"`这种学法LESS会跳过它不去处理它

## 字符串插值
```
@base-url: "http://assets.fnord.com";
background-image: url("@{base-url}/images/bg.png");
```

## 避免编译
```
.class {
  filter: ~"ms:alwaysHasItsOwnSyntax.For.Stuff()";
}

//output
.class {
  filter: ms:alwaysHasItsOwnSyntax.For.Stuff();
}
```

## 使用JavaScript表达式
通过使用反引号方式
```
@height: `document.body.innerHeight`;
```

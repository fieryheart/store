# sass学习笔记

## 变量  
+ 使用`$`声明
+ 中划线和下划线在声明和使用时没有区别`$link-color === $link_color`
+ 反复申明一个变量，只有最后一处申明有效并覆盖前边的值
+ 变量的特殊使用时要加上 #($var')
## 嵌套  
+ 和less没区别
+ `&:hover`和less一样的用法
+ `>`选择父标签下第一层的子标签  
+ `+`选择紧跟后的同层标签
+ `~`选择紧跟后的相同标签
```
article {
  ~ article { border-top: 1px dashed #ccc }
  > section { background: #eee }
  dl > {
    dt { color: #333 }
    dd { color: #555 }
  }
  nav + & { margin-top: 0 }
}
```

+ 属性嵌套
```
nav {
  border: 1px solid #ccc {
    left: 0px;
    right: 0px;
  }
}
```

## mixin
+ 使用@mixin命令,定义一个代码块
```
@mixin left{
  float: left;
  margin-left: 10px;
}

// 使用@include，调用这个mixin
div {
  @include left;
}
```

## 导入外部文件
+ @import "文件名"

## 条件语句
+ `@if` 和 `@else`
```
@if lighten($color) > 30% {
  background: #000;
} @else {
  background: #fff;
}
```

## 循环语句
+ `@for` 和 @while
```
@for $i from 1 to 100{

}

@while $i > 0{

}
```

## map操作
+ `@each`
```
$headings: (h1: 2em, h2: 1.5em, h3: 1.2em);
@each $header, $size in $headings {
  #{$header} {
    font-size: $size;
  }
}
```

## 自定义函数
+ `@function` 和 `@return`
```
@function double($n) {
  @return $n*2;
}
```

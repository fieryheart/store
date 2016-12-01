# reduce方法(Array)(JavaScript)
> array.reduce(function (preventValue,currentValue),default)

> reduce()方法接受两个参数，一个是作用数组成员的回调函数，一个是默认值（default）

> 回调函数中其实有四个参数:function(preventValue,currentValue,currentIndex,array)
>> preventValue是上次回调函数return的值  
>> currentValue是当前成员的值  
>> currentIndex是当前成员在数组中的数字索引,在回调函数内部使用，不用外部引入  
>> array是包含该元素的数组对象，在回调函数内部使用，不用外部引入

```JavaScript
// Define the callback function.
function appendCurrent (previousValue, currentValue) {
    return previousValue + "::" + currentValue;
    }

// Create an array.
var elements = ["abc", "def", 123, 456];

// Call the reduce method, which calls the callback function
// for each array element.
var result = elements.reduce(appendCurrent);

document.write(result);

// Output:
//  abc::def::123::456
```


# 模块化
```JavaScript
var myGradesCalculate = (function () {

   // 在函数的作用域中下面的变量是私有的
  var myPlane = [93, 95, 88, 0, 55, 91];

  var close_average = function() {
    var total = myGrades.reduce(function(accumulator, item) {
      return accumulator + item;
      }, 0);

    return'Your average grade is ' + total / myGrades.length + '.';
  };

  var close_failing = function() {
    var failingGrades = myGrades.filter(function(item) {
        return item < 70;
      });

    return 'You failed ' + failingGrades.length + ' times.';
  };

  // 将公有指针指向私有方法

  return {
    average: close_average,
    failing: close_failing
  }
})();

myGradesCalculate.failing(); // 'You failed 2 times.' 
myGradesCalculate.average(); // 'Your average grade is 70.33333333333333.'
```

> 上述代码中用闭包函数实现模块化  
> myGrades为一个私有的变量  
> average和failing是对变量

# 为什么要打包模块?
> 在JS模块化代码时，所有的这些模块都是通过<script>标签引入到你的HTML文件中，也就是说用户在访问你的页面的时候，js文件是一个一个加载的，这就有可能导致页面载入时间过长。  
如何解决这个问题呢，这就运用到了模块打包，把所有的模块合并为一个或几个文件，从而减少HTTP请求数

### CommonJS、Browserify
> CommanJS同步载入模块

```Browserify
browerify main.js -o bundle.js
```
> Browserify将main.js里引入的所有模块一同打包到一个名为bundle.js的文件里  
> Browserify通过抽象语法树(AST)解析每一个require语句

### AMD
> AMD异步载入模块

### Webpack
> Webpack按需加载模块

## CommonJS和AMD共性
> 载入模块时，载入的操作是在编译时执行

### ES6模块
> 运用到tree shaking技术，只加载你需要调用的代码，从而达到去除exports的作用
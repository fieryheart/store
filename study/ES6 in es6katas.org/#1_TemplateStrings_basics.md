#模板字符串-基础篇

###特点
被反引号（`）包裹
```
var str = `template string`;
```

###与传统的字符串共同点
传统字符串没有区别
```
var str = `template string`;
str === 'template string';    // true
```

###与传统的字符串不同点
* 在内部进行使用外部变量并进行运算（需要使用```${}```）
#####外部变量
```
    var x = 'template string';
    var str = `${x}`;
    str === 'template string';      // true 
```
#####内部运算
```
    `${1 + 2}` === '3'      // true
```
#####外部变量，内部运算
```
    var x = 'template ';
    var y = 'string';
    var str = `${x + y}`
    str === 'template string';      // true
```
#####执行函数
```
    var addOne = (x) => x+1;
    `${addOne(1)}` === '2';         // true
```
* 允许换行
```
    var str = 'template
string';        // Uncaught SyntaxError
    var Tstr = `template
string`;        // undefined
    Tstr === 'template\nstring'         // true
```
* 标签模板（tagged template），和函数名配合使用
```
    var tagFunctionToString = strings => console.log(strings.toString());
    var tagFunction = strings => console.log(strings);
    tagFunctionToString`template string`;       // template string
    tagFunction`template string`;       // ["template string", raw: Array[1]]
```
使用时，在函数内部自动将模板转换成一个数组，数组形式如上。
同时```${}```无法起效果
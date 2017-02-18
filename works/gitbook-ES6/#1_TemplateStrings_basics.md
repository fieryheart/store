#模板字符串-基础篇

###特点
被反引号（`）包裹
```
var str = `template strings`;
```

###与传统的字符串共同点
传统字符串没有区别
```
var str = `template strings`;
str === 'template strings';    // true
```

###与传统的字符串不同点
#### 在内部进行使用外部变量并进行运算（需要使用```${}```）
外部变量
```
    var x = 'template strings';
    var str = `${x}`;
    str === 'template strings';      // true 
```
内部运算
```
    `${1 + 2}` === '3'      // true
```
外部变量，内部运算
```
    var x = 'template ';
    var y = 'strings';
    var str = `${x + y}`
    str === 'template strings';      // true
```
####执行函数
```
    var addOne = (x) => x+1;
    `${addOne(1)}` === '2';         // true
```
#### 允许换行
```
    var str = 'template
strings';        // Uncaught SyntaxError
    var Tstr = `template
strings`;        // undefined
    Tstr === 'template\nstrings'         // true
```
#### 标签模板（tagged template），和函数名配合使用
1、使用时，在函数内部自动将模板转换成一个数组，数组形式如下。
```
    var tagFunctionToString = strings => console.log(strings.toString());
    var tagFunction = strings => console.log(strings);
    tagFunctionToString`template strings`;       // template string
    tagFunction`template strings`;       // ["template string", raw: Array[1]]
```
2、函数的参数，第一个是模板字符串本身，后面的是模板字符串中的变量```${}```
```
    function tagFunction(templateStringsArray, ...allValues){
        return allValues;
    }
    var one = 'one',
          two = 'two',
          three = 'three';
    tagFunction`${one} + ${two} + ${three}`         // ["one", "two", "three"]
```
3、`raw`属性 与 `String.raw`
```
    var tagFunction = strings => console.log(strings);
    tagFunction`template strings`;       // ["template string", raw: Array[1]]
```
raw属性是一个存有字符串的数组，字符串不会对转义字符进行转义
```
    var firstChar = strings => strings.raw;
    firstChar`\n`;          // ["\n"]
```
`String.raw`是一个静态函数
```
    String.raw`\\n`;        // "\\n"
```
注意与firstChar取到的值的类型不同
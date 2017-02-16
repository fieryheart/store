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
* 在内部进行使用外部变量并进行运算（需要使用```${}```）
#####外部变量
```
    var x = 'template strings';
    var str = `${x}`;
    str === 'template strings';      // true 
```
#####内部运算
```
    `${1 + 2}` === '3'      // true
```
#####外部变量，内部运算
```
    var x = 'template ';
    var y = 'strings';
    var str = `${x + y}`
    str === 'template strings';      // true
```
#####执行函数
```
    var addOne = (x) => x+1;
    `${addOne(1)}` === '2';         // true
```
* 允许换行
```
    var str = 'template
strings';        // Uncaught SyntaxError
    var Tstr = `template
strings`;        // undefined
    Tstr === 'template\nstrings'         // true
```
* 标签模板（tagged template），和函数名配合使用
```
    var tagFunctionToString = strings => console.log(strings.toString());
    var tagFunction = strings => console.log(strings);
    tagFunctionToString`template strings`;       // template string
    tagFunction`template strings`;       // ["template string", raw: Array[1]]
```
使用时，在函数内部自动将模板转换成一个数组，数组形式如上。
```
    function tagFunction(templateStringsArray, ...allValues){
        return allValues;
    }
    var one = 'one',
          two = 'two',
          three = 'three';
    tagFunction`${one} + ${two} + ${three}`         // ["one", "two", "three"]
```
函数的参数，第一个是模板字符串本身，后面的是模板字符串中的变量```${}```

# JavaScript正则表达式-基础入门

+ 字符类，如 /\w/ 为匹配任何ASCII字符组成的字符
+ 重复, 如 /\w{1,3}/ 为匹配一到三个单词
+ 选择、分组和引用
+ 指定匹配位置
+ 修饰符
+ 直接量字符
+ 可用于模式匹配的String方法
+ RegExp对象
--------------------
## 基本要素
![](https://fieryheart.github.io/images/reg.png)
## 字符类
<table>
<tr>
        <td>[...]</td>
        <td>方括号内的任意字符</td>
</tr>
<tr>
        <td>[^...]</td>
        <td>不在方括号内的任意字符</td>
</tr>
<tr>
        <td>.</td>
        <td>除换行符和其他Unicode行终止符之外的任意字符</td>
</tr>
<tr>
        <td>\\w</td>
        <td>任何ASCII字符组成的单词，等价于[a-zA-Z0-9]</td>
</tr>
<tr>
        <td>\\W</td>
        <td>任何不适ASCII字符组成的单词，等价于[^a-zA-Z0-9]</td>
</tr>
<tr>
        <td>\\s</td>
        <td>任何Unicode空白符</td>
</tr>
<tr>
        <td>\\S</td>
        <td>任何非Unicode空白符的字符，注意\w和\S不同</td>
</tr>
<tr>
        <td>\\d</td>
        <td>任何ASCII数字，等价于[0-9]</td>
</tr>
<tr>
        <td>\\D</td>
        <td>除了ASCII数字之外的任何字符，等价于[^0-9]</td>
</tr>
<tr>
        <td>[\\b]</td>
        <td>退格直接量（特例）</td>
</tr>
</table>

```
    // 匹配字符串中的 'b'
    "abc".search( /[b]/ )                    // 1

    // 匹配字符串中的 方括号内规定的数字
    "abc123abc".search( /[2-5]/ )      // 4
```

## 重复
<table>
    <tr>
        <td>{n,m}</td>
        <td>匹配前一项至少n次，但不能超过m次</td>
    </tr>
    <tr>
        <td>{n, }</td>
        <td>匹配前一项n次或者更多次</td>
    </tr>
    <tr>
        <td>{n}</td>
        <td>匹配前一项n次</td>
    </tr>
    <tr>
        <td>?</td>
        <td>尽可能多地匹配前一项0或者1次</td>
    </tr>
    <tr>
        <td>+</td>
        <td>尽可能多地匹配前一项1次或多次</td>
    </tr>
    <tr>
        <td>*</td>
        <td>尽可能多地匹配前一项0或多次</td>
    </tr>
    <tr>
        <td>{n,m}？</td>
        <td>尽可能少地匹配前一项至少n次，但不能超过m次</td>
    </tr>
    <tr>
        <td>?？</td>
        <td>尽可能少地匹配前一项0或者1次</td>
    </tr>
    <tr>
        <td>+？</td>
        <td>尽可能少地匹配前一项1次或多次</td>
    </tr>
    <tr>
        <td>*？</td>
        <td>尽可能少地匹配前一项0或多次</td>
    </tr>
</table>

```
    // 匹配2~4个数字，{n,m}中的逗号两边不能有空格
    "a1ab12abc123".search( /\d{2,4}/ )               // 4

    // 精确匹配三个字母和一个可选的数字
    "at12a3abcd1abc123".search( /[a-zA-Z]{3}\d?/ )   // 6

    // 匹配前后带有一个或多个空格的字符串"JavaScript"
    "JavaScripttttt is notJavaScript( JavaScript )".search( /\s+JavaScript\s+/ );       // 32

    // 尽可能多
    "aaa".match( /a+/ );            // ['aaa']
    // 尽可能少
    "aaa".match( /a+?/ );           // ['a']
```

## 选择
字符 `'|'` 用于提供可选择的字符
注意两点：
    1. 匹配次序 从左到右
    2. 如果左边的选择匹配成功，就忽略右边的匹配项
```
    // 匹配三个数字或者是4个小写字母
    "1ab12ab123abcd".match( /\d{3}|[a-z]{4}/ )              // ["123"]

```

## 分组和引用
`(...)`有三个作用：
    1. 把单独的项组合成子表达式
    2. 在完成的模式中定义子模式
    3. 允许在同一正则表达式的后部引用前面的子表达式 , 使用\1代表第一个左括号的内容，\2代表第二个左括号的内容，依次类推
```
    // 1.匹配字符串"Java"，其后的"Script"可有可无
    "JavaSScript".match( /Java(Script)?/ )                    // ["Java", undefined]

    // 2.匹配左右为字母中间为数字的字符串，同时取出中间的字符串
    "123abc454cba321".match( /[a-z]+(\d+)[a-z]+/ )   // ["abc454cba", "454"]

    // 3.允许在同一正则表达式的后面引用前面的子表达式
    "\"Java\'S\'cript\"".match( /['"][^'"]*['"]/ );             // [""Java'"]    引号左右不匹配
    "\"Java\'S\'cript\"".match( /(['"])[^'"]*\1/ );            // ["'S'", "'"]    引号左右匹配
```
<table>
    <tr>
        <td>(...)</td>
        <td>将几个项组合为一个单元，这个单元可通过"*"、"+"、"?"和"|"等符号加以修饰</td>
    </tr>
    <tr>
        <td>(?:...)</td>
        <td>只组合，把项目组合到一个单元，但不记忆与该组相匹配的字符</td>
    </tr>
    <tr>
        <td>\n</td>
        <td>和第n个分组第一次匹配的字符相匹配，组是圆括号中的子表达式，组索引是从左到右的左括号数</td>
    </tr>
</table>

## 指定匹配位置
<table>
    <tr>
        <td>^</td>
        <td>匹配字符串的开头，在多行检索中，匹配一行的开头</td>
    </tr>
    <tr>
        <td>$</td>
        <td>匹配字符串的借位，在多行检索中，匹配一行的结尾</td>
    </tr>
    <tr>
        <td>\b</td>
        <td>匹配一个单词的边界（区分[\b]匹配的是退格符）</td>
    </tr>
    <tr>
        <td>\B</td>
        <td>匹配非单词边界的位置</td>
    </tr>
    <tr>
        <td>(?=p)</td>
        <td>零宽正向先行断言，要求接下来的字符都与p匹配，但不能包括匹配p的那些字符</td>
    </tr>
    <tr>
        <td>(?!p)</td>
        <td>零宽负向先行断言，要求接下来的字符不与p匹配</td>
    </tr>
</table>
\b、^ 和 $ 称为正则表达式的锚，定位搜索字符串的特定位置
```
    // 匹配单词的边界，即位于\w字符和\W之间的边界
    "htmlhtml html".search( /html/ )                // 0
    "htmlhtml html".search( /html\b/ )             // 4

    // 匹配一个单词
    " JavaScript".match( /^JavaScript$/ )         // null
    "JavaScript".match( /^JavaScript$/ )          // ["JavaScript"]
```
`(?=p)`和`(?!p)`指定接下来的字符是否与p匹配
```
    // 第二个不能匹配是因为Java后面不是空格符
    "JavaScript is good.".match( /[Jj]ava(Script)?(?=\s)/ )             // ["JavaScript", "Script"]
    "Javais good.".match( /[Jj]ava(Script)?(?=\s)/ )                      //  null
```

## 修饰符
<table>
    <tr>
        <td>i</td>
        <td>执行不区分大小写的匹配</td>
    </tr>
    <tr>
        <td>g</td>
        <td>执行一个全局匹配</td>
    </tr>
    <tr>
        <td>m</td>
        <td>多行匹配模式，^匹配一行的开头和字符串的开头，$匹配行的结束和字符串的结束</td>
    </tr>
</table>
修饰符用在“/”符号之后
```
    // i 即为igonre case
    "JAVASCRIPT".match( /javascript/ )              // null
    "JAVASCRIPT".match( /javascript/i )             // ["JAVASCRIPT"]

    // g 即为global
    "JavaScript Java".match( /Java/ )                  // ["Java"]
    "JavaScript Java".match( /Java/g )                // ["Java", "Java"]

    // m 即为multiline
    "JavaScript\nJava".match( /^Java$/ )                      // null
    "JavaScript\nJava".match( /^Java$/m )                   // ["Java"]
```

## 直接量符号
<table>
    <tr>
        <td>\\o</td>
        <td>NUL字符(\u0000)</td>
    </tr>
    <tr>
        <td>\\t</td>
        <td>制表符(\u0009)</td>
    </tr>
    <tr>
        <td>\\n</td>
        <td>换行符(\u00A)</td>
    </tr>
    <tr>
        <td>\\v</td>
        <td>垂直制表符(\u000B)</td>
    </tr>
    <tr>
        <td>\\f</td>
        <td>换页符(\u000C)</td>
    </tr>
    <tr>
        <td>\\r</td>
        <td>回车符(\u000D)</td>
    </tr>
    <tr>
        <td>\\xnn</td>
        <td>由16进制数nn指定的拉丁字符</td>
    </tr>
    <tr>
        <td>\\uxxxx</td>
        <td>由16进制数xxxx指定的Unicode字符</td>
    </tr>
    <tr>
        <td>\\cX</td>
        <td>控制字符</td>
    </tr>
</table>


## 可用于模式匹配的String方法                
```
        // search()，返回与之匹配子串的起始位置
        "JavaScript".search( /script/i );                   // 4

        // match() , 返回由匹配结果组成的数组
        "Java is not JavaScript".match( /java(script)?/gi )                 // ["Java", "JavaScript"]

        // replace(), 检索和替换
        "java is not JavaScript".replace( /java/i , "C++" ).replace( /javascript/i , "C")                   // "C++ is not C"

        // split() , 将字符串拆分为一个子串组成的数组
        " 1  ,    2,    3    ,4     ,     5 ".trim().split( /\s*,\s*/ )                 // ["1", "2", "3", "4", "5"]
```


## RegExp对象
RegExp()为一个构造函数
```
    // 第一个参数为 正则表达式的主体部分，第二个参数为 修饰符
    let reg = new RegExp( "java(script)?" , "gi" );
    "Java is not JavaScript".match( reg )                       // ["Java", "JavaScript"]
```


## 小结

此文章是参照了《JavaScript: The Definitive Guide》中的第十章，想仔细了解JavaScript的正则表达式可以去翻阅此书籍。

解析一个URL使用`/(\w+):\/\/([\w.]+)\/(\S*)/`
```
    "Welcome to https://segmentfault.com/t/javascript".match( /(\w+):\/\/([\w.]+)\/(\S*)/ )          
    // ["https://segmentfault.com/t/javascript", "https", "segmentfault.com", "t/javascript"]
```

# 高性能JS-学习笔记

## JS自身优化
+ "任何JavaScript任务不应当执行超过100毫秒"  
+ "JavaScript代码运行的持续时间应当远远小于浏览器的限制"

### 逻辑方面
+ 减少全局变量的申明，尽量使用局部变量
+ 循环性能  
> for-in循环最慢;不要用for-in去遍历数组;  
> 未完待续...  
+ 条件语句  
> 条件数量大时，使用switch;  
> if-else确保最可能出现的条件放在首位   
+ 字符串和正则表达式的优化 (未完待续)  

### 异步方面  
+ 使用定时器优化JS的运算过程  
+ 使用Web Workers
> Web Workers适用于那些处理纯数据，或者与浏览器UI无关的长时间运行脚本  

## JS对DOM的操作  
1. 使用vanilla.js操作DOM  
2. DOM树: 在程序内部表示页面结构  
3. 渲染树: 表示DOM节点如何显示（即浏览器上显示的结构）

### 访问和修改DOM  
+ 减少访问DOM的次数
+ 使用children访问元素节点  
+ 在需要处理大量组合查询时，使用querySelectorAll()更加效率  
> var errs = document.querySelectorAll('div.warning, div.notice');  
+ 在IE6中，innerHTML比原生DOM方法快3.6倍  

### “重排”和“重绘”  
+ “重排”: 元素的布局改变  
+ “重绘”: 在元素布局改变后进行重绘；当发生背景颜色改变时只会产生重绘  
+ 为了减少发生的次数，应该合并多次对DOM和样式的修改
> el.style.cssText = "border-left: 1px;border-right: 2px;padding: 5px;"  
+ 批量修改DOM时  
> 使用脱离文档流的方法，防止因批量修改DOM而造成的多次“重排”  
> 1. 先隐藏元素，然后添加节点,然后显示元素  
> 2. 使用文档片段  
> `var fragment = document.createDocumentFragment()`  
> `appendDataToElement(fragment, data)`  
> `document.getElmentById('mylist').appendChild(fragment)`
> 3. 拷贝到一个脱离文档的节点中(cloneNode)  
> `var old = document.getElementById('mylist')`  
> `var clone = old.cloneNode(true)`  
> `appendDataToElement(clone, data)`  
> `old.parentNode.replaceChild(clone, old)`  

## AJAX请求  
+ 在页面重要内容加载完之后，使用AJAX请求添枝加叶(次要文件)  
+ 小型图片信息请求使用data:URL返回数据  
+ 减少请求数，通过合并JavaScript和CSS文件，或使用MXHR

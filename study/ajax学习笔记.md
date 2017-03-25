# ajax学习笔记

## 简介
+ Ajax 全称  Asynchronous JavaScript and XML ,即异步JS与XML
+ 前后端分离是建立在ajax异步通信的基础上的  

## 两种ajax
+ 标准浏览器  
`var  xhr = new XMLHttpRequest();`  
+ IE浏览器(从IE5开始)   
```
var xhr = new XMLHttpRequest(); //IE7即更高浏览器支持
var xhr = new ActiveXObject("Microsoft.XMLHTTP"); //IE6及更低版本浏览器
```
+ `ActiveXObject` 带的参数叫做**ProgID**
+ ProgID有以下几种类型
```
Microsoft.XMLHTTP
Microsoft.XMLHTTP.1.0
Msxml2.ServerXMLHTTP
Msxml2.ServerXMLHTTP.3.0
Msxml2.ServerXMLHTTP.4.0
Msxml2.ServerXMLHTTP.5.0
Msxml2.ServerXMLHTTP.6.0
Msxml2.XMLHTTP
Msxml2.XMLHTTP.3.0
Msxml2.XMLHTTP.4.0
Msxml2.XMLHTTP.5.0
Msxml2.XMLHTTP.6.0
```
+ Microsoft.XMLHTTP版本过老，已被MSXML代替
+ MSXML的讲解：`https://blogs.msdn.microsoft.com/xmlteam/2006/10/23/using-the-right-version-of-msxml-in-internet-explorer/`

## ajax异步请求过程
```
 var xhr = new XMLHttpRequest()
 xhr.onreadystatechange = function(){
   // 运算逻辑
 }
 xhr.open(method, url, true)
 xhr.send()
```
1. **JS引擎**生成XMLHttpRequest对象
2. 执行`xhr.open()`
3. 执行`xhr.send()`, 创建新的**http请求线程**
4. 请求异步发送，**JS引擎**继续执行后续代码
5. 收到response,**浏览器事件触发线程**捕获`xhr.onreadystatechange`回调事件,将事件添加到**任务队列**的末尾
6. **JS引擎**空闲, **任务队列**中的任务按顺序进入主线程
7. 执行到`onreadystatechange`


## XMLHttpRequest属性
+ XMLHttpRequest实例对象没有自有属性
+ (以 a<<b 表示 a继承b)  
 `xhr` << `XMLHttpRequest.prototype` << `XMLHttpRequestEventTarget.prototype` << `EventTarget.prototype` << `Object.prototype`

### readyState(只读)
| readyState    | 常量           | 描述  |
| ------------- |:-------------:|: ----- |
| 0(未初始化)    | xhr.UNSENT    | 请求已建立, 但未初始化(此时未调用open方法) |
| 1(初始化)      | xhr.OPENED       |   请求已建立, 但未发送 (已调用open方法, 但未调用send方法) |
| 2(发送数据)    | xhr.HEADERS_RECEIVED |    请求已发送 (send方法已调用, 已收到响应头) |
| 3 (数据传送中) | xhr.LOADING | 请求处理中, 因响应内容不全, 这时通过responseBody和responseText获取可能会出现错误|
| 4 (完成) | xhr.DONE | 数据接收完毕, 此时可以通过通过responseBody和responseText获取完整的响应数据 |

### onreadystatechange
+ onreadystatechange事件回调在readystate状态改变时触发
+ 在一个ajax请求周期中,onreadystatechange方法被触发4次
+ onreadystatechange回调中默认传入**Event实例**

### status(只读)
表示http请求状态

### statusText(只读)
+ 一个UTF-16字符串
+ 表示服务器的响应状态信息  
如 301"Moved Permanently";302"Found"

### onloadstart
+ `readyState == 1`之后`readyState == 2`之前触发
+ 默认传入一个**ProgressEvent时间进度对象**
+ **ProgressEvent**有三个重要的**只读**属性
 + `lengthComputable`, 布尔值, 默认false, 表示长度是否可计算
 + `loaded`, 无符号长整型, 初始值0, 表示已下载资源大小(不包括http headers等)
 + `toal`, 无符号长整型, 初始值0, 表示资源总大小(不包括http headers等)     

### onprogress
+ `readyState == 3`触发
+ 默认传入ProgressEvent对象(e)
+ e.loaded/e.total计算加载资源进度
```
  xhr.onprogress = function(e){
    console.log('progress:', e.loaded/e.total);
  }
```

### onload
+ `readState == 4`之后触发

### onloadend
+ ajax请求完成后触发(`readyState == 4`之后触发 or `readyState == 2`之后触发)

### timeout
+ 指定ajax请求时间上限

### ontimeout
+ ajax请求超时后触发

### response(只读)
+ 响应内容

### responseText(只读)
+ 响应内容的文本形式

### responseXML(只读)
+ xml形式响应数据, 缺省为null, 无效报错

### responseType
+ 响应类型, 缺省为空字符串, 可取`['arraybuffer', 'blob', 'document', 'json', 'text']`

### responseURL
+ 返回请求URL, 若出现重定向, 返回重定向之后的url

### withCredentials
+ 布尔值, 默认false
+ true时, cookies、authorization headers或者TLS客户端证书正常发送和接收
+ 适用于IE10+、opera12+及其他浏览器

### abort
+ 取消ajax请求, 取消后, readyState状态设置为0

### getResponseHeader
+ 获取响应头中指定的name值

### getAllRequestHeaders
+ 用于获取所有安全的响应头
+ 字符串形式

### setRequestHeader
+ 获取响应头
+ 设置请求头
```
//指定请求的type为json格式
xhr.setRequestHeader("Content-type", "application/json");
//设置其他的请求头
xhr.setRequestHeader('x-requested-with', '123456');
```

### onerror
+ ajax请求错误后执行

### upload
+ 默认返回一个`XMLHttpRequestUpload对象`, 用于上传文件
 + onloadstart
 + onprogress
 + onabort
 + onerror
 + onload
 + ontimeout
 + onloadout

### overrideMimeType
+ 强制修改response的`Content-Type`
```
//将response的MIME类型设置为text/xml;charset=utf-8
xhr.overrideMimeType("text/xml; charset = utf-8");
xhr.send();
```

## XHR1
+ 仅支持文本数据传输，无法传输二进制数据
+ 传输数据时，没有进度信息提示，只能提示是否完成
+ 受浏览器`同源策略`限制，只能请求同域资源
+ 没有超时机制

## XHR2
对上述缺点给予改正，跨域问题提供`Access-Control-Allow-Origin`
+ 主流浏览器支持XHR2，IE10即以上支持
+ IE8,9使用`XDomainRequest`

## XDomainRequest
+ 只能发送`GET`和`POST`
+ 属性
 + timeout
 + responseText
+ 方法
 + open:只接收Method和url, 只能发送异步请求
 + send
 + abort
+ 事件回调
 + onprogress
 + ontimeout
 + onerror
 + onload
+ `XDomainRequest`不支持跨域传输cookie
+ 只能设置请求头的Content-Type字段
+ 不能访问响应头信息

## $.ajax
+ jquery对原生ajax的一次封装
+ 只有一个参数，参数为key-value设置对象

| 序号 | 参数 | 类型 | 描述 |
|:---:|:----:|:----:|:----:|
| 1 | accepts | PlainObject | 用于通知服务器该请求需要接收何种类型的返回结果. 如有必要, 推荐在 $.ajaxSetup() 方法中设置一次. |
| 2 | async | Boolean | 默认为true, 即异步. |
| 3 | beforeSend | Function | 请求发送前的回调, 默认传入参数jqXHR和settings. 函数内显式返回false将取消本次请求. |
| 4 | cache | Boolean | 请求是否开启缓存, 默认为true, 如不需要缓存请设置为false. 不过, dataType为"script"和"jsonp"时默认为false. |
| 5 | complete | Function | 	请求完成后的回调(请求success 和 error之后均调用), 默认传入参数jqXHR和textStatus(请求状态, 取值为 "success","notmodified","error","timeout","abort","parsererror"之一). 从jq1.5开始, complete可以设置为一个包含函数的数组. 如此每个函数将依次被调用.
| 6 | contents | PlainObject | 	一个以"{字符串/正则表达式}"配对的对象, 根据给定的内容类型, 解析请求的返回结果. |
| 7 | contentType | String | 编码类型, 相对应于http请求头域的"Content-Type"字段. 默认值为"application/x-www-form-urlencoded; charset=UTF-8". |
| 8 | context | Object | 设置ajax回调函数的上下文. 默认上下文为ajax请求传入的参数设置对象. 如设置为document.body, 那么所有ajax回调函数中将以body为上下文.
| 9 | converters | PlainObject | 一个数据类型到数据类型转换器的对象. 默认为 {"* text": window.String, "text html": true, "text json": jQuery.parseJSON, "text xml": jQuery.parseXML} . 如设置converters:{"json jsonp": function(msg){}}
| 10 | crossDomain | Boolean | 默认同域请求为false, 跨域请求为true. |
| 11 | data | Object,Array | 发送到服务器的数据, 默认data为键值对格式对象, 若data为数组则按照traditional参数的值, 自动转化为一个同名的多值查询字符串. 如{a:1,b:2}将转换为"&a=1&b=2".
| 12 | dataFilter | Function | 处理XMLHttpRequest原始响应数据的回调, 默认传入data和type参数, data是Ajax返回的原始数据, type是调用$.ajax时提供的dataType参数
| 13 | dataType | String | 预期服务器返回的数据类型, 可设置为"xml","html","script","json","jsonp","text"之一, 其中设置为"xml"或"text"类型时, 数据不会经过处理.|
| 14 | error | Function | 请求失败时的回调函数, 默认传入jqXHR(jq1.4以前为原生xhr对象),textStatus(请求状态,取值为null,"timeout","error","abort" 或 "parsererror"),errorString(错误内容), 当一个HTTP错误发生时, errorThrown 接收HTTP状态的文本部分,比如"Not Found"等. 从jq1.5开始, error可以设置为一个包含函数的数组. 如此每个函数将依次被调用.注意: 跨域脚本和JSONP请求时error不被调用.
| 15 | global | Boolean | 表示是否触发全局ajax事件, 默认为true. 设为false将不再触发ajaxStart,ajaxStop,ajaxSend,ajaxError等. 跨站脚本和jsonp请求, 该值自动设置为false.
| 16 | headers | PlainObject | 设置请求头, 格式为k-v键值对对象. 由于该设置会在beforeSend函数被调用之前生效, 因此可在beforeSend函数内覆盖该对象. |
| 17 | ifModified | Boolean | 只有上次请求响应改变时, 才允许请求成功. 它使用HTTP包的Last-Modified 头信息判断, 默认为false. 若设置为true, 且数据自从上次请求后没有更改过就会报错.
| 18 | isLocal | Boolean | 	运行当前环境设置为"本地",默认为false, 若设置为true, 将影响请求发送时的协议. |
| 19 | jsonp | string | 显式指定jsonp请求中的回调函数的名称. 如jsonp:cb, jq会将cb代替callback, 以 "cb=?"传给服务器. 从jq1.5开始, 若设置jsonp:false, 那么需要明确设置jsonpCallback:"callbackName".
| 20 | jsonpCallback | String,Function | 	为jsonp请求指定一个回调函数名, 以取代jq自动生成的随机函数名. 从jq1.5开始, 可以将该属性设置为一个函数, 函数的返回值就是jsonpCallback的结果.
| 21 | mimeType | String |	设置一个MIME类型, 以覆盖xhr的MIM类型(jq1.5新增) |
| 22 | password | String | 设置认证请求中的密码 |
| 23 | processData | Boolean | jq的ajax方法默认会将传入的data隐式转换为查询字符串(如"&a=1&b=2"), 以配合 默认内容类型 "application/x-www-form-urlencoded", 如果不希望转换请设置为false. angular中想要禁用默认转换, 需要重写transformRequest方法.
| 24 | scriptCharset | String | 仅在"script"请求中使用(如跨域jsonp, dataType为"script"类型). 显式指定时, 请求中将在script标签上设置charset属性, 可在发现本地和远程编码不一致时使用.
| 25 | statusCode | PlainObject | 	一组http状态码和回调函数对应的键值对对象. 该对象以 {404:function(){}} 这种形式表示. 可用于根据不同的http状态码, 执行不同的回调.(jq1.5新增)
| 26 | timeout | Number | 设置超时时间 |
| 27 | traditional | Boolean | 是否按照默认方式序列化data对象，默认值为false |
| 28 | type | String | 可以设置为8种http method之一, jq中不区分大小写 |
| 29 | url | String | 请求uri地址 |
| 30 | username | String | 设置认证请求中的用户名 |
| 31 | xhr | Function | 在回调内创建并返回xhr对象 |
| 32 | xhrFields | PlainObject | 键值对对象, 用于设置原生的xhr对象, 如可用来设置withCredentials:true(jq1.5.1新增) |

## 全平台兼容的XMLHttpRequest写法
```
function getXHR(){
  var xhr = null;
  if(window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    try {
      xhr = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      try {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (e) {
        alert("您的浏览器暂不支持Ajax!");
      }
    }
  }
  return xhr;
}
```

# COOL GOODS EXHIBITION APP

## 技术栈
+ 数据库： mysql yoho.sql
 + 开启和关闭mysql | `mysql -uroot -p`进入数据库
 + 需要学习的内容： mysql语句
+ 后端： nodeJS express框架
 + 需要学习的内容： express中的路由功能和模板
+ 前端： 模块化设计和文件打包
 + 需要学习的内容： seaJs、glup和sass

## 遇到的问题
+ 数据库部分无法实现
> 原因是没有开启mysql  
> 以及在controller->Dao->database.js->`mysql.createConnection()`传入的用户(root)和密码(123456789)需要和自己在mysql上面设置的用户一一对应

## app.js中我学到的东西
+ app.use()用来加载中间件，而中间件可以用来将发送过来的请求根据加入的函数操作来依次执行，最终得到我们想要的请求数据
+ app.engine()和app.set()用来设置你使用是什么样的模板后缀，以及你默认的模板文件
+ handleStatusError中也使用了app.use()用来返回错误的页面，但并没有发现检测错误的代码在哪里

## controller-home.js
+ cookie.js中的addCookie(/响应/, /cookie的key/, /cookie的value/)
+ database.query(/sql语句/, /与数据库相比较的参数,即比较传过来的数据/, /回调函数，第一个参数是查找到的数据/)
+ exports.renderHomePage中的res.render()中，第一个参数为添加的模板，第二个参数是一个options, 其中带着你要渲染到模板上面的一系列数据, 在模板上面使用`{{}}`来表示你添加的值，比如在options中有一个`layouts: index`即使用index.hbs模板

## secret.js
+ 阅读cryto源码

## sea_module -> home -> home.js
+ 为home页面的js文件

## public -> js -> util.js
+ 对ajax的一次封装
+ swal()的用法是什么

## views -> pages -> about.hbs
+ {{#each product}}是什么
+ {{/each}}是什么

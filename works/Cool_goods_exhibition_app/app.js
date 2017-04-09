// ++++++++++++++++++++++++++++++++++++++
// +          应用程序配置文件           +
// ++++++++++++++++++++++++++++++++++++++

'use strict'

const express = require('express'), // express框架
      exphbs = require('express-handlebars'), // express框架应用模板
      bodyParser = require('body-parser'), // 解析请求中主体的内容
      cookieParser = require('cookie-parser'), // 解析cookie
      router = require('./routers'), // 路由文件
      app = express(); // 实例化express

// app.use加载用于处理http请求的middleware(中间件),当一个请求来的时候，会依次被这些middleware处理
// 请求中主体内容json化
app.use(bodyParser.json());

// 请求中得到的对象是一个键值对，当extended为false的时候，键值对中的值就为为'String'或'Array'形式，为true的时候，则可以为任何数据类型
app.use(bodyParser.urlencoded({ extended: false }));

// cookie解析
app.use(cookieParser());

// 使用static中间件，制定public目录为静态资源目录， 其中资源不会经过任何处理
app.use('/static', express.static(__dirname + '/public'));

// 集合请求Url 配置路由文件的使用
router.setRequest(app);

app.engine('.hbs', exphbs({
    defaultLayout: 'index', //默认布局模板为index.hbs
    extname: '.hbs'
  })
);
app.set('view engine', '.hbs');
// 上述两段代码使得模板引擎能识别的后缀名设置为html

// 异常处理
let handleStatusError = (status) => {
  app.use((req, res, next) => {
    res.status(status)
    res.sendfile('view/pages/error/error.html')
  })
}
handleStatusError(404)
handleStatusError(500)

app.listen(5000, function(){
  console.log('服务器启动 =========> http://localhost:5000');
})

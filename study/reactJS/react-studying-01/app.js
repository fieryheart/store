//引入模块
//express模块是web应用开发框架
var express = require('express');
//path模块是选取文件路径
var path = require('path');
//ejs模块, 通过<% %><%=%>来嵌套代码
var ejs = require('ejs');

//实例一个express对象
var app = express();

//新增接口路由
app.get('/data/:module', function(req, res, next) {
	var Action = require('./serve/inputData');
	Action.execute(req, res);
});

//对所有(/) URL或路由返回index.html
app.get('/' , function(req, res) {
	res.render('index');
});

app.set('views', './client/view');
app.set('view engine', 'html');
app.engine('html' , ejs.renderFile);

app.use('/client/static', express.static(path.join(__dirname, 'client/static')));

var server = app.listen(8888, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Listening at htto://%s:%s' , host, port);
});
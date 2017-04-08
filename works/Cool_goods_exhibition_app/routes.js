// +++++++++++++++++++++++++++
// +     路由定义应用的响应   +
// +++++++++++++++++++++++++++

'use strict'
const express = require('express'),
      home = require('./controller/home'), // 服务层(控制器)
      about = require('./controller/about'), // 服务层(控制器)
      details = require('./controller/details'); // 服务层(控制器)

exports.setRequestUrl = (app) => {
  // 首次加载的页面
  app.get('/', (req, res) => {

    // 查看请求中cookie的isVisit属性(添加的)，即用户是否已经访问了页面
    if (req.cookies.isVisit) {

      console.log(req.cookies);
      res.send('<h1 style="margin:50px 100px;font-size:100px;color:#fc5144;font-weight:700;">Express欢迎再次访问</h1><a style="display: inline-block;background: #ff4000;border: 1px solid #fc7144;border-radius: 3px;color: white;margin: 10px 100px;padding: 10px 40px;" href="/home">Express</a>')

    } else {

      res.cookie('isVisit', 1, {maxAge: 60*1000});
      res.send('<h1 style="margin:50px 100px;font-size:100px;color:#fc5144;font-weight:700;">Express</h1><h4 style="margin:50px 100px;font-size:40px;">欢迎第一次来到nodeJs的世界</h4><a style="display: inline-block;background: #ff4000;border: 1px solid #fc7144;border-radius: 3px;color: white;margin: 10px 100px;padding: 10px 40px;" href="/home">Express</a>')

    }
  })

  // home页路由
  app.get('/', (req, res) => {

    home.renderHomePage(req, res);

  })
  // about页路由
  app.get('/home', (req, res) => {

    about.renderAboutPage(req, res);

  })
  // details页路由
  app.get('/details', (req, res) => {

    details.renderDetailsPage(req, res);

  })

  // +++++++++++++++++++++++++++++++++++++++++
  // +               数据类路由               +
  // +++++++++++++++++++++++++++++++++++++++++

  // home页面的数据请求
  app.post('/home/inforData', (req, res) => {

    home.postInforData(req, res)

  })
  // 从数据库拿数据
  app.post('/home/postDataBase', (req, res) => {

    home.postDataBase(req, res)

  })
  // home页login
  app.post('/home/login', (req, res) => {

    home.postLogin(req, res)

  })
  // about页面的数据请求
  app.post('/about/getData', (req, res) => {

    about.postData(req, res)

  })
  // about页面 获取列表
  app.get('/about/getListData', (req, res) => {

    about.getListData(req, res)

  })
}

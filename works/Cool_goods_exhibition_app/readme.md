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

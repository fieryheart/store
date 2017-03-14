# InspirationInIt APP项目总结

## 启动时间
    2017-03-04

## API接口
    api.dribbble.com/v1//buckets/:id/shots

## 环境配置
  Node: `npm install -g yarn react-native-cli`  
  Java: JDK1.8 及以上
  Android Studio: Android SDK and Android Device Emulator (Android Studio 2.0 及以上)

## 安卓模拟器路由预分配地址:
+ 10.0.2.1       路由器/网关地址
+ 10.0.2.2       宿主机loopbackup接口的别名(也就是宿主机的127.0.0.1)
+ 10.0.2.3       第1个DNS服务器：[net.dns1]
+ 10.0.2.4/10.0.2.5/10.0.2.6    可选的第2/3/4个DNS(如果有的话)
+ 10.0.2.15      模拟器设备自己的网络/以太网接口：[net.gprs.local-ip]
+ 127.0.0.1      模拟器设备自己的loopbackp接口


## 配置出现的问题
+ 模拟后端数据接口
+ 安卓模拟器对应宿主机的127.0.0.1的接口为10.0.2.2

## 模拟后端——index.js
  使用NodeJS开启127.0.0.1:8888作为后端接口

## 模拟数据库——http模块
  使用NodeJS的http模块监听127.0.0.1:8080作为后台资源调用接口

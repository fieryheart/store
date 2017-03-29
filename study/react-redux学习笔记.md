# react-redux学习笔记

## 虚拟DOM
+ diff ? 深度优先遍历

## react组件的生命周期
+ 三个循环：挂载到DOM、更新DOM、从DOM卸载

## 挂载到DOM  
+ 首次插入DOM -> getDefaultProps() -> getInitialState() —> componentWillMount() -> render() -> componentDidMount()
+ 挂载到DOM在组件的整个生命周期只有一次

## 更新DOM
+ 状态或属性有更新 -> componentWillReceiveProps() -> shouldComponentUpdate() -> componentWillUpdate() -> render() -> componentDidUpdate()

## 从DOM卸载
+ 在componentWillUpdate()中进行干涉

## 优化工具
+ 使用`react-addons-pref`工具来实现性能分析
```
import Perf from 'react-addons-perf'
Perf.start()
...react
Perg.stop()
```

## 优化方案
### shouldComponentUpdate优化方案
使用immutable的组件状态，即用Object.assign()直接创建一个新的对象

## Redux状态传播路径
+ Redux使用一个对象存储整个应用的状态
+ Redux将React组件分为容器型组件和展示型组件。

### 容器型组件
+ 容器型组件通过connect函数订阅全局状态`global state`
+ 容器型组件在redux的API函数connect下被默认提供一个shouldComponentUpdate函数,对props和state进行浅比较

### 展示型组件
+ 展示型组件通过容器型的父组件得到改变的数据
+ 使用
```
shouldComponentUpdate: function (nextProps, nextState) {
    return !isShallowEqual(this.props,nextProps) || !isShallowEqual(this.state,nextState);
}
```
避免多余的虚拟DOM比较

## redux
+ redux的核心理念是单向数据流
+ redux脱离UI层, 提供了整个应用状态的管理
+ redux使用简单函数处理action
+ redux使用createStore统一state、action、reducer
+ redux只关注react的容器型组件
+ combineReducers整合所有的reducer
+ mapStateToProps拆分整个状态

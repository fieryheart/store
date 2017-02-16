// h1、iterator(迭代器)-协议
// 一个简单的没有items在里面的可遍历数据结构实现正确的协议

// 1、`iteratorFunction`需要遵循迭代器协议

// 2、这个对象必须有个next方法

// 3、调用`next()`方法返回一个`{done: true}`对象

// 4、这个iterable必须是一个对象

// 5、必须有个`Symbol.iterator`的函数

// 6、它没有值

// 7、没有`.length`属性

// 8、可以转变成一个数组

// 9、数组的`.length`仍然为0
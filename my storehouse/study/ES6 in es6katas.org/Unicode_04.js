// 1、模板字符串与普通的字符串没有区别，但当作为一个函数的参数带入函数时会让其转变成一个包含有一个raw属性的数组对象
function fun_str_con(strings){console.log(strings);}
fun_str_con`\n`
// 2、raw属性是让其不解释转义字符,存储的字符串是其本身输入的形式

// 3、String.raw是一个静态的函数

// 4、合并原生字符串

// 5、同样作用于unicodes
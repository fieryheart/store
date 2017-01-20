//`` 和 ${}

//一个字符串模板是用``封装的
var str = `like a string`;
//true
str === 'like a string';


var x = 42;
var y = 23;

//在``中可以使用${}来封装变量
var evaluated = `x=${x}`;
//true
evaluated == 'x='+x;


//在${}中可以进行任何表达式计算
var evaluated = `${x + y}`;
evaluated == x+y;

//在${}中也可以调用一个函数
function getDomain(){
	return document.domain;
}
var evaluated = `${ getDomain() }`;
evaluated == document.domain;
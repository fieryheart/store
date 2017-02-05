//调用一个函数来给字符串模板加前缀
var t = `abc`;
//string
typeof t;

function tagFunction(strings){
	return typeof strings;
}
//object           ["abc"]
tagFunction`abc`
//返回的是一个存有字符串的数组
//因此想要返回一个字符串应该讲函数改为
function tagFunction(strings){
	return strings.toString();
}


var one = 1;
var two = 2;
var three = 3;
//将一个函数作为字符串模板的前缀时
function ValueOnly(strings, firstValue, secondValue)
//第一个参数只接收一个字符串模板（表达式不能传递，如${...}）
//第二参数代表带入模板中的第一替代表达式( ${...} )
firstValueOnly`uno ${one}, dos ${two}`
//firstValue就是${one}
firstValue == 1;
//第三个参数则是表达第二个
//于是就可以用ES6中的新增标准来表示替代表达式
function valuesOnly(stringsArray, ...allValues)
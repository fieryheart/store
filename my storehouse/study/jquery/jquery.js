( function(global, factory){
	//"global" is assigned to "window" or "this"
		//What's "this"?Which differences are there in "this" and "window"
	//"factory" is "function(window, noGlobal)"

	"use strict";

	if( typeof module === "object" && typeof module.exports === "object") {
		
		//What's "module" ? Why does it judge both "module" and "module.exports"
		//What's "global" and "global.document" ?  
		module.exports = global.document ?
			factory( global, true) : 
			function( w ) {
				if( !w.document) {
					throw new Error( "jQuery requires a window with a document" );
					//jQuery 需要一个有文档的window对象
				}
				return factory( w );
		//What's "w"?
			};
	} 
	else {
		factory( global );
	}
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal )) {

	"use strict";
	//
	var arr = [];

	var document = window.document;

	var getProto = Object.getPrototypeOf;

	var slice = arr.slice;	//[]  ->  返回一个按索引截取的新的数组

	var concat = arr.concat;	//[]  ->  连接数组，并返回新的

	var push = arr.push;	//[]  ->  向数组末尾添加一个或多个元素

	var indexOf = arr.indexOf;	//[]  ->  返回对字符串索引的位置

	var class2type = {};

	var toString = class2type.toString;	//{}  ->  将对象转换为字符串

	var hasOwn = class2type.hasOwnProperty;	//{}  ->  检测不是从原型链上自身属性

	var fnToString = hasOwn.toString;	//{}  ->  将对象的属性转换为字符串

	var ObjectFunctionString = fnToString.call( Object );	//函数

	var support = {};
	//Why does JQuery wirte 
}
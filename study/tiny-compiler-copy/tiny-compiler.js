//	对于下面这行代码
// 	(add 2 (substract 4 2))
//	其 Token 为
// 	[
// 		{
// 			type: 'paren', value: '('
// 		},
// 		{
// 			type: 'name', value: 'add'
// 		},
// 		{
// 			type: 'number', value: '2'
// 		},
// 		{
// 			type: 'paren', value: '('
// 		},
// 		{
// 			type: 'name', value: 'substract'
// 		},
// 		{
// 			type: 'number', value: '4'
// 		},
// 		{
// 			type: 'number', value: '2'
// 		},
// 		{
// 			type: 'paren', value: ')'
// 		},
// 		{
// 			type: 'paren', value: ')'
// 		}
// 	]

// 	Token中有9个对象，讲这个语句分为9段来解析
//	
//	它的抽象语法树（AST）
//	{
//		type: 'Program',
//		body: [{
//			type: 'CallExpresstion',
//			name: 'add',
//			param: [{
//				type: 'NumberLiteral'
//				name: '2',
//				param: [{
//					type: 'CallExpresstion',
//					name: 'substract',
//					param: [{
//						type: 'NumberLiteral'
//						name: '4'
//					},{
//						type:'NumberLiteral',
//						name: '2'
//					}]
//				}]
//			}]
//		}]
//	}
//
//	type: 	Program -> CallExpresstion || NumberLiteral
//	param:  一个有各个参数对象组成的数组
//	
//
//
//	编译器过程: 	解析(Parsing) -> 转换(Transformation) -> 遍历(Traversal) -> 访问者(Visitors) -> 代码生成(Code Generation)
//
//
//
//	词法分析器: 	function tokenizer(){}
//	语法分析器: 	function parser(){}
//	遍历器: 		function traverser(AST, visitor)
//	转换器: 		function transformer(AST){}
//	代码生成器: 	function codeGenerator(){}
// 	编译器: 		function compiler(){}
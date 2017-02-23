// "900719925474099212"

// number {
// 	length: ,
// 	number: ,
// 	sign: ,
// }


// 构造函数

function NumberObject( string , sign ) {

	if( sign === -1){

		this.number = string.slice(1).split('').reverse().join('');
		this.length = string.length - 1;
	}	
	else if ( sign === 1){

		this.number = string.split('').reverse().join('');
		this.length = string.length;
		console.log("NumberObject : ", this.number);

	}else{

		alert("The sign of the number is wrong!");

		// 程序停止
		// stop();
	}

	this.sign = sign;

	

}

// 将参数统一转换为字符串
function numberTransform(number) {

	console.log("numberTransform : ", typeof number);
	console.log("numberTransform : ", number);

	switch(typeof number){
		case 'number':
			return String(number);
		case 'object':
			return number.reverse().join('');
		case 'undefined':
			alert("you didn't input the number.");
			// 程序停止
			// stop();
		default:
			return number;
	}

}

// 分析元素
function numberAnalysis( number ) {

	let raw = numberTransform( number );
	console.log("numberAnalysis : ", typeof raw);
	console.log("numberAnalysis : ", raw);
	
	if( raw[0] != '-' && raw[0] < '0' || raw[0] >'9'){
		alert('The number you input is wrong.');

		// 程序停止
		// stop();
	}

	for(let i = 1; i < raw.length; i++){
		if(raw[i] < '0' || raw[0] > '9'){
			alert('The number you input is wrong.');

			// 程序停止
			// stop();
		}
	}

	if( raw[0] === '-' ){
		return new NumberObject( raw ,  -1);
	}else{
		return new NumberObject( raw , 1 );
	}

}


function addString( first, second ) {

	let carry = 0,
	     rst = [];
	let length = first.length > second.legnth ? first.length : second.length;

	for(let i = 0; i < length || carry === 1; i++){

		if( first[i] && second[i] ){

			rst[i]   = ( (first[i] - 0)  +  (second[i] - 0)  + carry ) % 10;
			carry  = ( (first[i] - 0)  +  (second[i] - 0)  + carry ) / 10;

		}else if( !first[i] && second[i] ){

			rst[i]   = ( (first[i] - 0) + carry ) % 10;
			carry  = ( (first[i] - 0) + carry ) / 10;

		}else if( first[i] && !second[i] ){

			rst[i]   = ( (second[i] - 0) + carry ) % 10;
			carry  = ( (second[i] - 0) + carry ) / 10;

		}else if( !first[i] && !second[i] && carry === 1){
			
			rst[i]   = carry;
			carry  = 0;
		}else{
			alert("The logic of your addition is wrong.");

			// 程序停止
			// stop();
		}

		// JS 的商一般都为小数，需要取整
		carry = Math.floor( carry );
	}
	
	return rst;
}

// 加法
function add( first , second ) {

	
	let rst = [];

	rst = addString( first , second , length );


	if(first.sign === -1){
		rst.push('-');
	}

	return numberAnalysis( rst );
	
}


// 减法
function subtract(  first , second ) {

	let borrow = 0,
	     rst = [], 
	     minuend,
	     subtrahend;
	let length = first.length > second.length ? first.length : second.length;

	// 被减数和减数相同
	if(first.number === second.number){
		return '0';
	}

	// 补零，被减数和减数的位数相同
	for(let i = 0; i < length; i++){
		if(i > first.length - 1){
			first.number += '0';
		}
		if(i > second.length - 1){
			second.number += '0';
		}
	}

	// 决定被减数和减数
	for(let i = 0; i < length; i++){
		if(first.number[i] < second.number[i]){
			minuend = second;
			subtrahend = first;
		}else{
			minuend = first;
			subtrahend = second;
		}
	}

	for(let i = 0 ; i < length ; i++){
		if( (minuend.number[i] - 0) - borrow > (subtrahend.number[i] - 0)){

			rst[i] = ( (minuend.number[i] - 0) - (subtrahend.number[i] - 0) - borrow) % 10;
			borrow = 0;
			

		}else if( (minuend.number[i] - 0) - borrow < (subtrahend[i] - 0)){

			rst[i] = ((minuend[i] - 0) - (subtrahend[i] - 0) - borrow + 10) % 10;
			borrow = 1;
			
		}else{

			rst[i] = 0;
			
		}
	}

	// 去零
	let end = length - 1;
	while( rst[end--] === 0 ){
		rst.length--;
	}
	
	// 结果取负号
	if( (first.sign === 1 && first.number !== minuend.number) || (first.sign === -1 && first.number === minuend.number) ){
		
		rst.push('-');
		
	}
	
	console.log("subtrahend-rst : ",rst);

	return numberAnalysis( rst  );

}



function multiply( first , second ) {
	
	// 返回的字符串结果和判断符号
	

}

function PieceNumber( number , length ){

	this.length = length;
	this.number = number;

}

function pieceOfMultiplication( first, second ) {
	
	let length = first.length > second.length ? first.length : second.length;
	
	// 补零，使得位数相同
	for(let i = 0; i < length; i++){
		if(i > first.length - 1){
			first.number += '0';
		}
		if(i > second.length - 1){
			second.number += '0';
		}
	}

	let center = Math.floor( length / 2 );

	// 分割数字
	let firstLeftString = first.number.slice(0, center);
	let firstRightString = first.number.slice( center );
	let secondLeftString = first.number.slice(0, center);
	let secondRightString = second.number.slice( center );
	
	// 重组数字
	let firstLeft = new PieceNumber( firstRightString , firstRightString.length );
	let firstRight = new PieceNumber( firstRightString , firstRightString.length );
	let secondLeft = new PieceNumber( secondLeftString , secondLeftString.length );
	let secondRight = new PieceNumber( secondRightString , secondRightString.length );

	// 递归长度大于2的数相乘
	if( center > 2 ) {
		
		// 分解
		let leftRst = pieceOfMultiplication( firstLeft , secondLeft );
		let centerRst = pieceOfMultiplication( firstLeft , secondRight ) + pieceOfMultiplication( firstRight , secondLeft );
		let rightRst = pieceOfMultiplication( firstRight , secondRight );
		

		// 重组
		let left = leftRst[0] + leftRst[1];
		let leftCarry = leftRst.slice(2);

		centerRst = addString(centerRst , leftCarry);
		let center = centerRst[0] + centerRst[1];
		let centerCarry = centerRst.slice(2);

		let right = addString(rightRst , centerCarry);
		return left + center + right;

	}
	// 两位数相乘
	else if( center <= 2 && center > 0) {
		// 一位或两位的字符串转数字
		let firstLeftNumber = Number(firstLeftString);
		let firstRightNumber = Number(firstRightString);
		let secondLeftNumber = Number(secondLeftString);
		let secondRightNumber = Number(secondRightString);

		// 相乘
		let leftRstNumber = firstLeftNumber * secondLeftNumber;
		let centerRstNumber = firstLeftNumber * secondRightNumber + secondLeftNumber * firstRightString;
		let rightRstNumber = firstRightNumber * secondRightNumber;

		// 重组
		let left = leftRstNumber % 100;
		let centerRst = Math.floor(leftRstNumber / 100) + centerRstNumber;
		let center = centerRst % 100;
		let right = Math.floor(centerRst / 100) + rightRstNumber;

		return String(left) + String(center) + String(right);

	}

	else {
		alert("The multiplication is wrong");

		// 程序停止
		// stop();
	}

}








// 规定： 传入的x 和 y 数据类型必须为字符型
function testFunction (x, y) {


	let elem1 = numberAnalysis( x );
	let elem2 = numberAnalysis( y );

	// return add( elem1, elem2);
	// return subtract( elem1 , elem2 );
}
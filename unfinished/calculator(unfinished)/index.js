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
		// console.log("NumberObject : ", this.number);

	}else{

		alert("The sign of the number is wrong!");

		// 程序停止
		// stop();
	}

	this.sign = sign;

	

}

// 将参数统一转换为字符串
function numberTransform(number) {

	// console.log("numberTransform : ", typeof number);
	// console.log("numberTransform : ", number);

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
	// console.log("numberAnalysis : ", typeof raw);
	// console.log("numberAnalysis : ", raw);
	
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


// 补零 (传入字符串， 传出字符串)
function addFrontZero( string , length ){
	for(let i = 0; i < length; i++){
		if(i > string.length - 1){
			string += '0';
		}
	}
	return string;
}

// 去零 (传入字符串，传出数组)
function deleteFrontZero( string ){
	
	let arr = string.split('');

	let end = arr.length - 1;

	while( arr[end--] === '0' ){
		arr.pop();
	}

	if(arr.length === 0){
		arr.push('0');
	}
	
	return arr.join('');
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


function addString( first, second ) {

	let carry = 0,
	     rst = [];
	let length = first.length > second.length ? first.length : second.length;

	let fst = addFrontZero(first, length);
	let scd = addFrontZero(second, length);

	for(let i = 0; i < length || carry === 1; i++){

		if( fst[i] && scd[i] ){

			rst[i]   = ( (fst[i] - 0)  +  (scd[i] - 0)  + carry ) % 10;
			carry  = ( (fst[i] - 0)  +  (scd[i] - 0)  + carry ) / 10;

		}else if( !fst[i] && scd[i] ){

			rst[i]   = ( (scd[i] - 0) + carry ) % 10;
			carry  = ( (scd[i] - 0) + carry ) / 10;

		}else if( fst[i] && !scd[i] ){

			rst[i]   = ( (fst[i] - 0) + carry ) % 10;
			carry  = ( (fst[i] - 0) + carry ) / 10;

		}else if( !fst[i] && !scd[i] && carry === 1){
			
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
	
	console.log("addString : ", rst.join(''));
	return rst;
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
	first.number = addFrontZero(first.number , length);
	second.number = addFrontZero(second.number , length)

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
	rst = deleteFrontZero( rst );
	
	// 结果取负号
	if( (first.sign === 1 && first.number !== minuend.number) || (first.sign === -1 && first.number === minuend.number) ){
		
		rst.push('-');
		
	}
	
	// console.log("subtrahend-rst : ",rst);

	return numberAnalysis( rst  );

}



function multiply( first , second ) {
	
	// 返回的字符串结果和判断符号
	let firstNumber = first.number;
	let secondNumber = second.number;
	
	// console.log("firstNumber : ", typeof firstNumber);

	let rst = pieceOfMultiplication( firstNumber , secondNumber );

	if(first.sign * second.sign === -1){
		rst.push('-');
	}

	return new numberAnalysis( rst );

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

	let half = Math.floor( length / 2 );
	
	// 分割数字
	let firstLeft = first.slice(0, half);
	let firstRight = first.slice( half );
	let secondLeft = second.slice(0, half);
	let secondRight = second.slice( half );
	

	// 递归长度大于2的数相乘
	if( half > 2 ) {
		
		// 分解
		let leftRst = pieceOfMultiplication( firstLeft , secondLeft );
		let centerRst = addString( pieceOfMultiplication( firstLeft , secondRight ) , pieceOfMultiplication( firstRight , secondLeft ) ).join('');
		let rightRst = pieceOfMultiplication( firstRight , secondRight );

		leftRst = deleteFrontZero(String(leftRst));
		centerRst = deleteFrontZero(String(centerRst));
		rightRst = deleteFrontZero(String(rightRst));
		console.log();
		console.log("leftRst : ", leftRst);
		console.log("centerRst : ", centerRst);
		console.log("rightRst : ", rightRst);
		// 重组
		
		let left = leftRst.slice(0, half);
		let leftCarry = leftRst.slice(half);
		console.log("left : ", left);
		console.log("leftCarry : ", leftCarry);

		centerRst = addString(centerRst , leftCarry).join('');
		console.log("centerRst : ", centerRst);
		let center = centerRst.slice(0, half);
		let centerCarry = centerRst.slice(half);
		
		console.log("center : ", center);
		console.log("centerCarry : ", centerCarry);

		let right = addString(rightRst , centerCarry).join('');

		console.log("right : ", right);

		console.log("LongString : ", left + center + right);

		return deleteFrontZero(left + center + right);

	}
	// 两位数相乘
	else if( half <= 2 && half >= 0) {
		// 一位或两位的字符串转数字
		let firstLeftNumber = Number(firstLeft.split('').reverse().join(''));
		let firstRightNumber = Number(firstRight.split('').reverse().join(''));
		let secondLeftNumber = Number(secondLeft.split('').reverse().join(''));
		let secondRightNumber = Number(secondRight.split('').reverse().join(''));
		
		console.log("firstLeftNumber : ", firstLeftNumber);
		console.log("firstRightNumber : ", firstRightNumber);
		console.log("secondLeftNumber : ", secondLeftNumber);
		console.log("secondRightNumber : ", secondRightNumber);
		// 相乘
		let leftRstNumber = firstLeftNumber * secondLeftNumber;
		let centerRstNumber = firstLeftNumber * secondRightNumber + secondLeftNumber * firstRightNumber;
		let rightRstNumber = firstRightNumber * secondRightNumber;
		
		// console.log("leftRstNumber : ", leftRstNumber);
		// console.log("centerRstNumber : ", centerRstNumber);
		// console.log("rightRstNumber : ", rightRstNumber);
		
		
		// 重组
		let left = leftRstNumber % 100;
		let centerRst = Math.floor(leftRstNumber / 100) + centerRstNumber;
		let center = centerRst % 100;
		let right = Math.floor(centerRst / 100) + rightRstNumber;

		// console.log("String : ", String(left) + String(center) + String(right));

		left = deleteFrontZero(String(left).split('').reverse().join(''));
		center = deleteFrontZero(String(center).split('').reverse().join(''));
		right = deleteFrontZero(String(right).split('').reverse().join(''));
		return deleteFrontZero( left + center + right );

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
	return multiply( elem1 , elem2 );

}
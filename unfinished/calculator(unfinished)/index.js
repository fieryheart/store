// "900719925474099212"

// number {
// 	length: ,
// 	number: ,
// 	sign: ,
// }


// 构造函数

function NumberObject( string , sign) {

	if( sign === -1){

		this.number = string.slice(1).split('').reverse().join('');

	}	
	else if ( sign === 1){

		this.number = string.split('').reverse().join('');

	}else{

		alert("The sign of the number is wrong!");

		// 程序停止
		// stop();
	}

	this.sign = sign;

	this.length = string.length;

}

// 将参数统一转换为字符串
function numberTransform(number) {

	console.log("numberTransform : ", typeof number);
	console.log("numberTransform : ", number);

	switch(typeof number){
		case 'number':
			return String(number);
		case 'object':
			return number.reserve().join('');
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


// 加法
function add( x , y ) {
	
	let carry = 0, add = 0;
	let length = x.length > y.legnth ? x.length : y.length;
	let rst = [];
	
	for(let i = 0; i < length || carry === 1; i++){

		if( x.number[i] && y.number[i] ){

			rst[i]   = ( (x.number[i] - 0)  +  (y.number[i] - 0)  + carry ) % 10;
			carry  = ( (x.number[i] - 0)  +  (y.number[i] - 0)  + carry ) / 10;

		}else if( !x.number[i] && y.number[i] ){

			rst[i]   = ( (x.number[i] - 0) + carry ) % 10;
			carry  = ( (x.number[i] - 0) + carry ) / 10;

		}else if( x.number[i] && !y.number[i] ){

			rst[i]   = ( (y.number[i] - 0) + carry ) % 10;
			carry  = ( (y.number[i] - 0) + carry ) / 10;

		}else if( !x.number[i] && !y.number[i] && carry === 1){
			
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


	return numberAnalysis( string );
	
}


// 减法
function subtract(  x , y ) {

	let borrow = 0,
	     rst = [], 
	     minuend,
	     subtrahend;
	let length = x.length > y.length ? x.length : y.length;

	// 补零，被减数和减数的位数相同
	for(let i = 0; i < length; i++){
		if(i > x.length - 1){
			x.number[i] = '0';
		}
		if(i > y.length - 1){
			y.number[i] = '0';
		}
	}

	// 决定被减数和减数
	for(let i = 0; i < length; i++){
		if(x.number[i] < y.number[i]){
			minuend = y;
			subtrahend = x;
		}else{
			minuend = x;
			subtrahend = y;
		}
	}

	for(let i = 0 ; i < length ; i++){
		if( (minuend.number[i] - 0) - borrow > (subtrahend.number[i] - 0)){

			rst[i] = ( (minuend[i] - 0) - (subtrahend[i] - 0) - borrow) % 10;
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

	if(minuend.sign === -1){

		rst = rst.reverse().push('-').reverse();

	}
	
	return numberAnalysis( rst  );

}

























// 规定： 传入的x 和 y 数据类型必须为字符型
function testFunction (x, y) {


	let elem1 = numberAnalysis( x );
	let elem2 = numberAnalysis( y );

	return add( elem1, elem2);

}
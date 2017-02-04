//9007199254740992

// num {
// 	length:,
// 	number:,
// 	minus:,
// }

//大整数的构造函数
function BigNum(str_num, minus) {
	//存储字符串长度
	this.length = str_num.length;
	//num对象存储字符串和符号
	this.number = str_num;
	this.minus = minus;
}

//字符串颠倒
function reverseNum(num){
	let str = [];
	if(typeof(num) != "string"){
		return 0;
	}
	for(let i = 0; i < num.length;i++){
		str[i] = num[num.length - i - 1];
	}
	return str;
}

//将大整数转变为字符串
function bigNumTrans(num) {
	let n;
	n = num.toString();

	if( n[0] == '-' ){
		
		n = new BigNum( reverseNum(n.slice(1 , n.length) ) , -1);
	}else{
		
		n = new BigNum( reverseNum( n ) , 1);
	}

	return n;
}



//通过判断输入的整数的正负号来决定是加或减
function judgeMinus(x, y) {
	if(x.minus == 1 && y.minus == 1){
		return bigNumAdd(x , y , 1);
	}else if(x.minus == -1 && y.minus == -1){
		return bigNumAdd(x , y , -1);
	}else if(x.minus == -1 || y.minus == -1){
		return bigNumSub(x , y);
	}
}


function init(x , y) {
	let num_x = bigNumTrans( x );
	let num_y = bigNumTrans( y );
	let rst = {};
	let str_rst = [];
	rst =  judgeMinus(num_x, num_y);
	//需要一个记忆功能；
	// return rst;
	str_rst = reverseNum( rst.number );
	if(rst.minus == 1){
		
		return str_rst.join("");
	}else if(rst.minus == -1){
		
		return '-' + str_rst.join("");
	}
}

// 整数相加
function bigNumAdd(x , y , minus) {
	let carry = 0;
	let bigLen = x.length > y.length ? x.length : y.length;
	let add_num =[] ;
	let rst = {};
	//相加
	
	for(let i = 0; i < bigLen || carry == 1; i++){
		if(x.number[i] && y.number[i]){
			add_num[i] = ((x.number[i] - 0) + (y.number[i] - 0) + carry) % 10;	
		}else if(x.number[i] && !y.number[i]){
			add_num[i] = x.number[i]-0 + carry;
		}else if(y.number[i] && !x.number[i]){
			add_num[i] = y.number[i]-0 + carry;
		}else{
			add_num[i] = carry;
		}

		if(x.number[i] && y.number[i] && (x.number[i] - 0) + (y.number[i] - 0) > 9){
			carry = 1;
		}else{
			carry = 0;
		}
	}
	rst = new BigNum(add_num.join(""), minus);
	
	return rst;
}

// 整数相减
function bigNumSub(x, y) {
	let borrow = 0;
	let bigNum;
	let smallNum;
	let minus = 1;
	let bigLen = x.length > y.length ? x.length : y.length;
	let sub_num =[] ;
	let rst = {};

	//补零
	for(let i = 0; i < bigLen;i++){
		if(i > x.length - 1){
			x.number[i] = '0';
		}
		if(i > y.length - 1){
			y.number[i] = '0';
		}
	}

	//判定大小
	for(let i = 0; i < bigLen; i++){
		if(x.number[i] < y.number[i]){
			bigNum = y;
			smallNum = x;
		}else{
			bigNum = x;
			smallNum = y;
		}
	}


	console.log(bigNum.number);
	console.log(smallNum.number);
	//相减
	for(let i = 0; i < bigLen; i++){
		if((bigNum.number[i] - 0) - borrow > (smallNum.number[i] - 0)){
			sub_num[i] = ((bigNum.number[i] - 0) - (smallNum.number[i] - 0) - borrow) % 10;
			borrow = 0;
			console.log(sub_num[i]);
		}else if((bigNum.number[i] - 0) - borrow < (smallNum.number[i] - 0)){
			sub_num[i] = ((bigNum.number[i] - 0) - (smallNum.number[i] - 0) - borrow + 10) % 10;
			borrow = 1;
			console.log(sub_num[i]); 
		}else{
			sub_num[i] = 0;
			console.log(sub_num[i]);
		}
	}
	
	//判断符号
	if(bigNum.minus == -1){
		minus = -1;
	}

	

	rst = new BigNum(sub_num.join("") , minus);
	return rst;
}

// 整数相乘
function numMultiply(x, y) {
	var mul_num = [];
	var fst_num = [];
	var fst_carry = 0;
	var scd_carry = 0;
	var minus = 1;
	var rst;


	for(let i = 0 ; i < x.length ; i++){
		fst_num = [];
		for(let j = 0 ; j < y.length ; j++){
			mul_num[i+j]
		}
		mul_num[i] = ( x.number[i] * y.number[i] + carry ) % 10;
		carry = Math.floor(( x.number[i] * y.number[i] + carry) / 10);
	}

	if(x.minus * y.minus == -1){
		minus = -1;
	}

	rst = new BigNum(mul_num.join("") , minus);
	return rst;
}

// 整数相除
function numDivision(x, y){

}
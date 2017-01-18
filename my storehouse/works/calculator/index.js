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
	}else if(x.minus == -1 && x.minus == -1){
		return bigNumAdd(x , y , -1);
	}else{
		return bigNumSub(x , y);
	}
}

//大整数相加
function init(x , y) {
	let num_x = bigNumTrans( x );
	let num_y = bigNumTrans( y );
	let rst = {};
	let str_rst = [];
	rst =  judgeMinus(num_x, num_y);
	
	//需要一个记忆功能；
	// return rst;
	str_rst = reverseNum( rst.str_num );
	
	if(rst.minus == 1){
		
		return str_rst;
	}else if(rst.minus == -1){
		
		return '-' + str_rst;
	}
}

function bigNumAdd(x , y , minus) {
	let carry = 0;
	let bigLen = x.length > y.length ? x.length : y.length;
	let smallLen = x.length < y.length ? x.length : y.length;
	let add_num =[] ;
	let rst = {};
	//相加
	for(let i = 0; i < bigLen || i == 1; i++){
		if(x.number[i] && y.number[i]){
			add_num[i] += ((x.number[i] - 0) + (y.number[i] - 0) + carry) % 10;
			
			
		}else{
			add_num[i] = carry;
		}
		
		if((x.number[i] - 0) + (y.number[i] - 0) > 9){
			carry = 1;
		}else{
			carry = 0;
		}
	}
	rst = new BigNum(add_num.join(""), minus);

	return rst;
}
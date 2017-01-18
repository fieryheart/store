//9007199254740992
function add(x, y) {
	//判断是否为大整数相加
	if(x > -9007199254740992 && y > -9007199254740992 && x+y >-9007199254740992 && x+y < 9007199254740992){
		return x+y;
	}else{
		let bigger;
		let smaller;
		let j = 0;//进位
		let rst = [];
		let str = '';
		//将传入数组转变为字符串
		x += '0';
		y += '0';
		//去掉尾部'0'
		x = x.slice(0 , x.length - 1);
		y = y.slice(0 , y.length - 1);
		//得到两个字符串的较大长度和较小长度
		bigger = x.length > y.length ? x.length : y.length;
		smaller  = x.legnth < y.length ? x.length : y.length;
		//判断是否进位
		if((x[0]-0) + (y[0]-0) > 9){
			rst[0] = '1';
		}
		else{
			rst[0] = '0';
		}
		//将每个位置上的数存入数组
		for(let i = bigger; i > 0; i--){
			rst[i] = (( x[i-1]-0 ) + ( y[i-1]-0 ) + j) % 10;
			console.log(rst[i]);
			j = Math.floor((( x[i-1]-0) + ( y[i-1]-0 ) + j) / 10);
		}
		//合并成一个字符串
		for(let i = 0; i < rst.length;i++){
			str += rst[i].toString();
		}
		//传出字符串
		if(rst[0]){
			return str;
		}else{
			return str.slice(1,str.length);
		}
	}
}

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

//将大整数转变为字符串
function bigNumTrans(num) {
	let n;
	n = num.toString();
	if( n[0] == '-' ){
		n = new BigNum( reserveNum(n) , -1);
	}else{
		n = new BigNum( reserveNum( str_num.slice(1, str_num.length) ) , 1);
	}
	return n;
}

//字符串颠倒
function reverseNum(num){
	let str = [];
	for(let i = 0; i < num.length;i++){
		str[i] = num[num.length - i - 1];
	}
	return str;
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
	rst =  judgeMinus(num_x, num_y);
	//需要一个记忆功能；
	// return rst;
	if(rst.minus == 1){
		return reserveNum( rst.str_num ).join("");
	}else if(rst.minus == -1){
		return '-' + reserveNum( rst.str_num ).join("");
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
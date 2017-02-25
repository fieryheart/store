

let state = {
	fisrt: '',
	second: '',
	count: 0,
	operator: '',
	datas: []
};
let btnList = ['add', 'subtract', 'multiply', 'divide'];

// 得到标签的节点
function catchId( id ) {

	return document.getElementById(id);

}



// 键盘输入值
function inputFromKeyboard( event ) {

	let e = event || window.event || arguments.callee.caller.arguments[0];
	let input = catchId('input');

	if(e && e.keyCode === 96) {
		input.value += '0';
	}
	if(e && e.keyCode === 97) {
		input.value += '1';
	}
	if(e && e.keyCode === 98) {
		input.value += '2';
	}
	if(e && e.keyCode === 99) {
		input.value += '3';
	}
	if(e && e.keyCode === 100) {
		input.value += '4';
	}
	if(e && e.keyCode === 101) {
		input.value += '5';
	}
	if(e && e.keyCode === 102) {
		input.value += '6';
	}
	if(e && e.keyCode === 103) {
		input.value += '7';
	}
	if(e && e.keyCode === 104) {
		input.value += '8';
	}
	if(e && e.keyCode === 105) {
		input.value += '9';
	}
	if(e && e.keyCode === 8) {
		let value = String( input.value );		
		input.value = value.slice(0 , value.length - 1);
	}
	if(e && e.keyCode === 13){

		writeOnBlackboard( input.value );
		storeNumber( input.value );

	}
}

// 将内容显示在黑色板块上
function writeOnBlackboard( first , second , operator, result){

	let blackboard = catchId( 'blackboard' );

	if(!second && !operator && !result){
		blackboard.innerHTML = first;
	}else{
		blackboard.innerHTML = first + ' ' + operator + ' ' + second + '<hr />' + result;
	}

}

// 将输入的数字存储到state中
function storeNumber( value ) {

	let index = state.count;
	if( !state.first && !state.second && !state.datas[index] ){
		state.first = value;
	}else if( state.first && !state.second && !state.datas[index] ){
		state.second = value;
	}else if( state.first && state.second){
		state.first = state.datas[index];
		state.second = value;
	}

}


// 给每个计算符号的按键绑定事件
function operatorEvents(operator){
	
	state.operator = operator;
	if(operator === '+'){
		changeBtnColor( 'add' );
	}else if(operator === '-'){
		changeBtnColor( 'subtract' );
	}else if(operator === '*'){
		changeBtnColor( 'multiply' );
	}else if(operator === '/'){
		changeBtnColor( 'divide' );
	}

	catchId('input').value = '';

}

// 点击改变按键的颜色
function changeBtnColor( btn ){

	for(let i = 0; i < btnList.length ; i++){
		if(btnList[i] === btn){
			catchId( btn ).style.backgroundColor = '#eee';
		}else{
			catchId( btnList[i] ).style.backgroundColor = '#fff';
		}
	}

}

// 点击确认键执行
function onStart(){

	let result;

	if(!state.first || !state.second || !state.operator){

		alert("Nothing is ready.Please input again.");
		onClear();

	}else{

		result = init(state.first , state.second, state.operator);
		state.datas.push(result);
		writeOnBlackboard(state.first , state.second , state.operator , state.datas[state.count])


		state.count++;
		state.first = result;
		
	}

	console.log('onStart');

}


function onClear(){
	state.first = '';
	state.second = '';
	state.count = 0;
	state.datas = [];
}

document.onkeydown = inputFromKeyboard;






console.log("success");
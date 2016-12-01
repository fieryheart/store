// var Container = function(x) {
// 	this._value = x;	
// }
// Container.of = x => new Container(x);


//很明显, Container 是一个构造函数，而Container.of返回一个实例对象，
//如何取到这个实例对象？就需要用一个变量来去其引用
// Container.of(1);
//Container {_value: 1}


// var obj_one = Container.of(1);
//undefined
// obj_one;
//Container {_value: 1}


//给容器添加map方法，map方法能作用到容器里的值
// Container.prototype.value_map = function(f){
//   return Container.of(f(this._value));
// }



// Container.of(3)
// 	.value_map(x => x + 1)	
// 	.value_map(x => "Reasult" + x);			
//Container.of(3)返回一个Container实例,假定为A，A的_value为1，
//那么A.map(x => x + 1)也将返回一个Container实例，设为B,B的_value为4。
//那么问题来了，A和B是不同的实例，那么A和B的销毁是在什么时候?




var Maybe = function(x) {
  this._value = x;
}

Maybe.of = function(x) {
  return new Maybe(x);
}

Maybe.prototype.map = function(f) {
  return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this._value));
}

Maybe.prototype.isNothing = function() {
  return (this._value === null || this._value === undefined);
}

import _ from 'lodash';
var add = _.curry( _.add );

Maybe.of( { name: "Stark" } )
    .map( _.prop( "age" ) )
    .map( add( 10 ) );
//=> Maybe(null)

Maybe.of( { name: "Stark", age: 21 } )
    .map( _.prop( "age" ) )
    .map( add( 10 ) );
//=> Maybe(31)
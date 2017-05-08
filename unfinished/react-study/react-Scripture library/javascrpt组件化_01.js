// 形式一
// 全局函数全局变量写法
$(function(){

  var input = $('#J_input');

  function getNum(){
    return input.val().length;
  }

  // 渲染元素
  function render(){
    var num = getNum();

    if($('J_input_count').length === 0) {
      input.after('<span id="J_input_count"></span>')
    }

    $('#J_input_count').html(num+'个字')
  }

  // 监听事件
  input.on('keyup', function(){
    render();
  })

  // 初始话，第一次渲染
})

// 问题：各种变量混乱，没有很好的隔离作用于，当页面变的复杂的时候，
// 会很难去维护。






// 形式二
// 作用于隔离
var textCount = {
  input: null,
  init: function(config){
    this.input = $(config.id);
    this.bind();
    // 这边范围对应的对象，可以实现链式调用
    return this;
  },
  bind: function(){
    var self = this;
    this.input.on('keyup',function(){
      self.render();
    })
  },
  getNum: function(){
    return this.input. val().length;
  },
  // 渲染元素
  render: function(){
    var num = this.getNum();

    if($('J_input_count').length == 0) {
      this.input.after('<span id="J_input_count"></span>')
    }

    $('#J_input_count').html(num+'个字')
  }
}

$(function() {
  // 在domready后调用
  textCount.init({id:'#J_input'}).render()
})

// 代码更清晰，并且有统一的入口调用方法
// 没有私有概念



// 形式三
// 函数闭包

var textCount = (function(){
  // 私有方法，外面访问不到
  var _bind = function(that){
    that.input.on('keyup', function(){
      that.render();
    });
  }

  var _getNum = function(that){
    return that.input.val().length;
  }

  var TextCountFun = function(config){}

  TextCountFun.prototype.init = function(config) {
    this.input = $(config.id);
    _bind(this);

    return this;
  };

  TextCountFun.prototype.render = function(){
    var num = _getNum(this);

    if($('#J_input_count').length == 0) {
      this.input.after('<span id="J_input_count"></span>')
    }

    $('#J_input_count').html(num+'个字');
  }
  // 返回构造函数
  return TextCountFun;
})();

$(function() {
  new TextCount().init({id:'#J_input'}).render();
})

// 基本满足要求，但是在做一套组件时，仅仅这些是不行的，风格相近的
// 组件是不能同时在写的，维护起来很麻烦



// 面向对象

var Class = (function() {
  // 将s中的属性和方法赋值给r
  var _mix = function(r, s) {
    for (var p in s) {
      if(s.hasOwnProperty(p)) {
        r[p] = s[p];
      }
    }
  }

  // 实现继承
  var _extend = function() {

    //开关 用来使生成原型时，不调用真正的构成流程init
    this.initPrototype = true
    var prototype = new this()
    this.initPrototype = false

    var items = Array.prototype.slice.call(arguments) || []
    var item

    // 支持混入多个属性，并且支持{}也支持Function
    while(item = items.shift()) {
      // 将item的原型对象的属性赋给这个类(Class)实例化出的对象
      _mix(prototype, item.prototype || item)
    }

    // 这边是返回的类，其实就是我们返回的子类
    function SubClass() {
      if(!SubClass.initPrototype && this.init)
        this.init.apply(this, arguments) // 调用init真正的构造函数
    }

    // 赋值原型链，完成继承
    // 子类继承这个类(Class)实例化出的对象
    SubClass.prototype = prototype

    // 改变constructor引用
    // 让SubClass的原型对象有一个constructor属性指向SubClass
    SubClass.prototype.constructor = SubClass

    // 为子类也添加extend方法
    SubClass.extend = _extend

    return SubClass
  }

  // 超级父类
  var Class = function(){}
  // 为超级父类添加extend方法
  Class.extend = _extend

  return Class
})

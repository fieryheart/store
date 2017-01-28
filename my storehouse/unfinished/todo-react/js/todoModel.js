var app = app || {}

// this.key
// this.todos 是一个本地缓存数组， 用来存储所有的todo
// this.onChange 


// this.toggle方法使用重新创建一个todo对象来改变completed的值,
// 同时他们的比较方式是比较整个对象，而非对象的id

// 明明只是一个记录将要做的事情，在它被创建的那一刻就已经被保存了，为什么还要有个this.save()方法
(function () {
	'use strict';

	var Utils = app.Utils;
	
	app.TodoModel = function(key) {
		this.key = key;
		// 当地缓存
		the.todos = Utils.store(key);
		this.onChange = [];
	};

	app.TodoModel.prototype.subscribe = function(onChange) {
		this.onChange.push(onChange);
	};

	app.TodoModel.prototype.inform = function() {
		Utils.store(this.key, this.todos);
		this.onChange.forEach(function (cb) { cb(); });
	};

	app.TodoModel.prototype.addTodo = function(title) {
		this.todos = this.todos.concat({
			id: Utils.uuid(),
			title: title,
			completed: false
		});

		this.inform();
	};

	app.TodoModel.prototype.toggleAll = function() {
		this.todos = this.todos.map(function (todo) {
			return Utils.extend({}, todo, {completed: checked});
		});

		this.inform();
	};

	app.TodoModel.prototype.toggle = function(todoToToggle) {
		
		this.todos = this.todos.map(function (todo) {
			return todo !== todoToToggle ?
				todo :
				Utils.extend({}, todo, {completed: !todo.completed});
		});
	
		this.inform();
	};

	app.TodoModel.prototype.destroy = function(todo) {
		
		this.todos = this.todos.filter(function (candidate) {
			return candidate !== todo;
		});

		this.inform();
	};

	app.TodoModel.prototype.save = function(todoToSave, text) {

		this.todos = this.todos.map(function (todo) {
			return todo !== todoToSave ? todo : Utils.extend({}, todo, {title: text});
		});

		this.inform();

	};

	app.TodoModel.prototype.clearCompleted = function() {
		this.todos = this.todos.filter(function (todo) {
			return !todo.completed;
		});

		this.inform();
	};

})();
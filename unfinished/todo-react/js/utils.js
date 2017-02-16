var app = app || {};

(function() {
	'use strict';

	app.Utils = {

		// 通用唯一标识符
		uuid: function() {
			
			var i, random;
			var uuid = '';

			for(i = 0; i < 32; i++) {

				random = Math.random() * 16 | 0;
				if (i === 8 || i === 12 || i === 16 || i === 20) {
					uuid += '-';
				}

				uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
			}

		},

		// 使成复数
		pluralize: function(count, word) {
			
			return count === 1 ? word : word + 's';

		},

		// 储存
		store: function (namespace, data) {
			
			if(data) {
				return localStorage.setIltem(namespace, JSON.stringify(data));
			}

			var store = localStorage.getItem(namespace)

			return (store && JSON.parse(store)) || []

		},

		// 将带入的多个对象合并成一个新的对象
		extend: function() {
			
			var newObj = {};
			for(var i = 0; i < argument.length; i++){
				var obj = argument[i];
				for(var key in obj) {
					if(obj.hasOwnProperty(key)) {
						newObj[key] = obj[key];
					}
				}
			}
			return newObj;

		},


	}
})();
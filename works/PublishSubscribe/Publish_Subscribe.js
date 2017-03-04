var pubsub = {};

(function(q) {
	let topics = {},
	     subUid = -1;

	// 发布和广播事件， 包含特定的topic名称和参数（比如传递数据）
	q.publish = function (topic, args) {

		if( !topics[topic] ) {
			return false;
		}

		var subscribers = topics[topic],
		      length = subscribers ? subscribers.length : 0;

		while (length--) {
			subscribers[length].func(topic, args);
		}

		return this;
	};

	// 通过特定的名称和回调函数来订阅事件，topic/event触发时执行事件
	q.subscribe = function (topic, func) {
		if(!topics[topic]) {
			topics[topic] = [];
		}

		var token = (++subUid).toString();
		topics[topic].push({
			token: token,
			func: func
		});

		return token; 
	}

	//基本订阅上的标记应用，通过特定topic取消订阅
	q.unsubscribe = function (token) {
		for (let m in topics) {
			if (topics[m]) {
				for (let i = 0 ; i < topics[m].length ; i++) {
					if (topics[m][i].token === token) {
						topics[m].splice(i, 1);
						return token;
					}
				}
			}
		}
		return this;
	};
})(pubsub);
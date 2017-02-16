var EventEmitter  = require('events').EventEmitter;

class getMessage extends EventEmitter {
	constructor() {
		this.messageData = null;
		
	}

	getData( callback ) {
		var self = this;
		fetch("./data/myData").then(function(res) {
			console.log(res);
			if(res.ok) {
				res.json().then(function(data) {
					self.messageData = data.name;
					callback(self.messageData);
				});

			}
			else {
				console.log( "Looks like the response wasn't perfect, got status", res.status );
			}
		},  function(e) {
			console.log("Fetch failed!", e);
		});

	}
}

module.exports = new getMessage();
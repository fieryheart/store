var getData = require('./data/myData');

exports.execute = function(req, res) {
	getData.getMessage(function(data) {
		res.send(data);
	});
}
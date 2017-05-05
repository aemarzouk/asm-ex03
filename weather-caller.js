var host = (process.env.VCAP_APP_HOST || 'localhost');
var port = (process.env.VCAP_APP_PORT || 8080);

var http = require('http');
var weather = require('./weather');
var param = {
	location: 'KSFO'
};

var server = http.createServer(function(request, response) {
	weather.current(param, function(error, temp_f) {
		if (error) {
			response.writeHead(500, {
				'Content-Type': 'text/plain'
			});
			response.write(error);
			response.end();
			return;
		}

		response.writeHead(200, {
			'Content-Type': 'text/plain'
		});
		response.write('The current weather reading is ' + JSON.stringify(temp_f) +
			' degrees Fahrenheit');
		response.end();
	});
});
server.listen(port, host);
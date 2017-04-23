var host = (process.env.VCAP_APP_HOST || 'localhost');
var port = (process.env.VCAP_APP_PORT || 8080);

var http = require('http');
var weather = require('./weather');

var server = http.createServer(function(request, response) {
	weather.current(function(temp_f) {
		response.writeHead(200, {
			'Content-Type': 'text/plain'
		});
		response.write('The current weather reading is ' + temp_f +
			' degrees Fahrenheit');
		response.end();
	});
});
server.listen(port, host);
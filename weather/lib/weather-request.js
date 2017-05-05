var http = require('http');
var parseString = require('xml2js').parseString;


exports.current = function(param, resultCallback) {
	var options = {
		host: 'w1.weather.gov',
		path: '/xml/current_obs/KSFO.xml',
		headers: {
			'user-agent': 'Mozilla/5.0'
		}
	};
	var weatherCallback = function(weatherResponse) {
		var buffer = '';
		weatherResponse.on('data', function(chunk) {
			buffer += chunk;
		});
		weatherResponse.on('end', function() {
			parseString(buffer, function(error, result) {
				if (error) {
					resultCallback(error.message);
					return;
				}
				resultCallback(null, result);
			});
		});
	};
	var weatherRequest = http.request(options, weatherCallback);
	weatherRequest.on('error', function(e) {
		resultCallback(e.message);
	});
	weatherRequest.end();
};
var http = require('http');

var options = {
	host: 'w1.weather.gov',
	path: '/xml/current_obs/KSFO.xml',
	headers: {
		'user-agent': 'Mozilla/5.0'
	}
};

exports.current = function ( resultCallback ) {
	var weatherCallback = function(weatherResponse) {
		var buffer = '';
		weatherResponse.on('data', function(chunk) {
			buffer += chunk;
		});
		weatherResponse.on('end', function() {
			var body = buffer;
			var matches = buffer.match(/\<temp_f\>.+\<\/temp_f\>/g);
			if (null != matches && matches.length > 0) {
				body =
					matches[0].replace(/\<temp_f\>/, "").replace(/\<\/temp_f\>/, "");
			}
			resultCallback(body);
		});
	};
	var weatherRequest = http.request(options, weatherCallback);
	weatherRequest.end();
};
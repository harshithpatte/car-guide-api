const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const handlers = require('./libs/handlers');
const helpers = require('./libs/helpers');

var httpServer = http.createServer((req, res) => {
var parsedUrl = url.parse(req.url, true);
var path = parsedUrl.pathname;
var trimmedPath = path.replace(/^\/+|\/+$/g,'');
var queryStrigObj = parsedUrl.query;
var method = req.method;

var selectedHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

var data = {
			'trimmedPath' : trimmedPath,
			'queryStrigObj' : queryStrigObj,
			'method' : method,
			'payload' : helpers.parseJsonToObject(buffer)
		};

    var buffer = '';
    	var decoder = new StringDecoder('utf-8');

    	req.on('data', function(data) {
    		buffer += decoder.write(data);
    	});

      req.on('end', function() {
      		buffer += decoder.end();
          var data = {
			'trimmedPath' : trimmedPath,
			'queryStrigObj' : queryStrigObj,
			'method' : method,
			'payload' : helpers.parseJsonToObject(buffer)
		};

          selectedHandler(data, function(statusCode, payload){
			statusCode = typeof(statusCode) !== 'number' ? 406: statusCode;
			payload = typeof(payload) !== 'object' ? {} : payload;

			var payloadString = JSON.stringify(payload);

			res.setHeader('Content-Type', 'application/json');
			res.writeHead(statusCode);
			res.end(payloadString);
			//print the path of the payload on the console
			console.log('response: ', statusCode, payloadString);
		});
  });
});

httpServer.listen(process.env.PORT || 3000);


var router = {
	"addvehicle" : handlers.addvehicle,
  "removevehicle" : handlers.removevehicle,
  "getvehicle" : handlers.getvehicle
	// 'users' : handlers.users
};

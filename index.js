const http = require('http');
const url = require('url');

var httpServer = http.createServer((req, res) => {
var parsedUrl = url.parse(req.url, true);
var path = parsedUrl.pathname;
var trimmedPath = path.replace(/^\/+|\/+$/g,'');
var queryStrigObj = parsedUrl.query;
res.setHeader('Content-Type', 'application/json');
res.writeHead(200);
if (queryStrigObj.username == "rahul") {
  var payload = {
    'vin' : "123456789abcd12iu",
    'odometer' : '100000',
    'fuel_level' : '85',
    'dte' : '700',
    'tpms' : {
      'lf' : '32',
      'rf' : '31',
      'lb' : '32',
      'rb' : '32'
    },
    'engine_state' : false,
    'lock_state' : true,
    'nickname' : "my fiesta"
  }
  var stringifyPayload = JSON.stringify(payload);
  res.end(stringifyPayload);
} else {
  res.end(null)
}
});

httpServer.listen(3000);

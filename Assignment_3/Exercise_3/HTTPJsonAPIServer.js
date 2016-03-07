//Clayton Hung 20432053
//Bix Deng 20413850

var http = require('http');
var url = require('url');
var port = process.argv[2];

var app = http.createServer(function(req,res) {
  var parseURL = url.parse(req.url, true);
  var date = new Date(parseURL.query.iso);

  if(parseURL.pathname == '/api/parsetime') {
    result = {
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds()
    };
  } else if (parseURL.pathname == '/api/unixtime') {
    result = { unixtime : date.getTime() };
  }

  if(result) {
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify(result));
  } else {
    res.end();
  }
});
app.listen(port);
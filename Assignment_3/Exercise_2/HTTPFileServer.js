//Clayton Hung 20432053
//Bix Deng 20413850

var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res) {
  var streamFile = fs.createReadStream(process.argv[3]);
  streamFile.pipe(res);
});
server.listen(process.argv[2])
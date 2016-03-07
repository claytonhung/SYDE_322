//Clayton Hung 20432053
//Bix Deng 20413850

var http = require('http');

//output
// first line - integer of # of characters received from server
// second line - complete String of charaters sent by the server

var url = process.argv[2];
var string = "";

http.get(url, function callback(res) {
  res.setEncoding('utf8');

  res.on('data', function(data) {
    string +=data;
  });

  res.on('end', function (data) {
    console.log(string.length);
    console.log(string);
  })

  res.on('error', function(err) {
    console.err;
  })
})
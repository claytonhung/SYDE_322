//Clayton Hung 20432053
//Bix Deng 20413850

var fs = require('fs');
var file = process.argv[2];

fs.readFile(file, function callback(err, data) {
  var line = data.toString().split('\n').length - 1;

  console.log(line);
});

//Clayton Hung 20432053
//Bix Deng 20413850

var fs = require('fs'); //synchronous filesystem methods
var file = process.argv[2];

var buf = fs.readFileSync(file).toString().split('\n').length - 1;

console.log(buf);
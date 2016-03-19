var mysql = require('mysql');
var dbName = 'hotelBooking';
var user = 'root';
var host = 'localhost';
var password = 'password';

var bookingTable = 'Booking';
var guestTable = 'Guest';
var hotelTable = 'Hotel';
var roomTable = 'Room';

var connection = mysql.createConnection({
  host: host,
  user: user,
  password: password,
  database: dbName
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('Cnnected to server as id ' + connection.threadId);
});

exports.updateGuest = function(guest_info) {
  connection.query(
  'INSERT INTO ' + guestTable + '(guestName, guestAddress)' +
   'VALUES ( ?, ?)' +
   'ON DUPLICATE KEY UPDATE guestName = ? , guestAddress = ?',
   [guest_info.name, guest_info.address, guest_info.name, guest_info.address], function(err, result) {
    if (err) throw err;

    console.log("Inserted: ", result.insertId);
    // connection.end();
  })
};

exports.getHotels = function(queryObj, callback) {
  if (queryObj.hotelName == '') queryObj.hotelName = null;
  if (queryObj.city == '') queryObj.city = null;
  if (queryObj.price == '') queryObj.price = null;
  if (queryObj.type == '') queryObj.type = null;
  if (queryObj.startDate == '') queryObj.startDate = null;
  if (queryObj.endDate == '') queryObj.endDate = null;

  connection.query(
    'SELECT hot.hotelName, hot.City, ro.price, ro.type, bo.startDate, bo.endDate ' +
    'FROM ' + hotelTable + ' AS hot ' +
    'INNER JOIN ' + roomTable + ' AS ro ON ro.hotelID = hot.hotelID ' +
    'INNER JOIN ' + bookingTable + ' AS bo ON bo.hotelID = hot.hotelID '  +
    'WHERE hot.hotelID = IFNULL(?, id) ' +
    'AND hot.hotelName = IFNULL(?, hot.hotelName) ' +
    'AND hot.city = IFNULL(?,hot.city)' +
    'AND ro.price = IFNULL(?, ro.price)' +
    'AND ro.type = IFNULL(?, ro.type) ' +
    'AND bo.startDate >= IFNULL(?, bo.startDate) ' +
    'AND bo.endDate < IFNULL(?, bo.endDate)' ,
    [1, queryObj.hotelName, queryObj.city, queryObj.price, queryObj.type, queryObj.startDate, queryObj.endDate], function(err, rows, fields) {
        if(err) throw err;

        var output = [];
        for (var i = 0; i < rows.length; i++) {
          output.push(rows[i]);
        }
        callback(output);
    })
}

exports.createBooking = function(obj, callback) {
  connection.query('INSERT INTO ' + bookingTable + '(hotelID, roomNo, guestID, startDate, endDate)' +
    'VALUES(?, ?, ?, ?, ?)', [obj.hotelId, obj.roomNo, obj.guestId, obj.startDate, obj.endDate], function (err, result) {
        if (err) throw err;

        console.log("Inserted: ", result.insertId);
        callback(result.insertId);
    })
}


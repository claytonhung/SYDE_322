var express = require('express');
var mysql = require('./mySQL');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname +  '/public'));

app.get("/", function (req, res) {
  res.redirect('/index.html');
});

app.post('/api/v1/guest', function(req, res) {
  var guest = {
    id: req.body.id,
    name: req.body.name,
    address: req.body.address
  }
  mysql.updateGuest(guest);
});

app.post('/api/v1/queryRooms', function(req, res) {
  var query = {
    hotelName: req.body.hotelName,
    city: req.body.city,
    price: req.body.price,
    type: req.body.type,
    startDate: req.body.start,
    endDate: req.body.end
  }

  mysql.getHotels(query, function(result) {
    res.end(JSON.stringify(result));
  })
})

app.post('/api/v1/booking', function(req, res) {
  var booking = {
    hotelId: req.body.hotelId,
    roomNo: req.body.roomNo,
    guestId: req.body.guestId,
    startDate: req.body.startDate,
    endDate: req.body.endDate
  }
  mysql.createBooking(booking, function(result) {
    res.end(JSON.stringify(result));
  });
})

app.listen(3000);

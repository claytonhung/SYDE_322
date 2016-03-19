function saveGuest() {
  var guestName = document.getElementById('name').value;
  var guestAddress = document.getElementById('address').value;

  var guestData = {
                    name: guestName,
                    address: guestAddress
                  };
  $.ajax({
    type: "POST",
    url: 'http://localhost:3000/api/v1/guest',
    data: guestData
  })
  .done(function(msg) {
    console.log(msg);
  });
}

function queryRooms() {
  var hotelName = document.getElementById('hotelName').value;
  var city = document.getElementById('city').value;
  var price = document.getElementById('price').value;
  var type = document.getElementById('type').value;
  var start = document.getElementById('start').value;
  var end = document.getElementById('end').value;

  var queryData = {hotelName: hotelName,
                    city: city,
                    price: price,
                    type: type,
                    start: start,
                    end: end
                  };
  $.ajax({
    type: "POST",
    url: 'http://localhost:3000/api/v1/queryRooms',
    data: queryData
  }).done(function(result) {
    console.log(result);
  })
}

function bookHotel() {
  var hotelId = document.getElementById('hotelId').value;
  var roomNo = document.getElementById('roomNo').value;
  var guestId = document.getElementById('guestId').value;
  var startDate = document.getElementById('startDate').value;
  var endDate = document.getElementById('endDate').value;

  var hotelData = { hotelId: hotelId,
                    roomNo: roomNo,
                    guestId: guestId,
                    startDate: startDate,
                    endDate: endDate
                  };
  $.ajax({
    type: "POST",
    url: 'http://localhost:3000/api/v1/booking',
    data: hotelData
  }).done(function(msg) {
    alert("You have successfully booked your hotel, booking ID: " + msg);
  })
}
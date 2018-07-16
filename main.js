var timeInterval = 1000;

function showCurrentTime(){
    var timestamp = getCurrentTimestamp();

    var timestampString = buildTimestampString(timestamp);
   
    appendTimestamp(timestampString, timestamp);   
};

function getCurrentTimestamp(){
  var months = new Array('January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
  var dateObj = new Date();
  
  var timestamp = {
    day : dateObj.getDate(),
    month : months[dateObj.getMonth()],
    year : dateObj.getFullYear(),
    hour : dateObj.getHours(),
    minutes : (dateObj.getMinutes()<=9?'0'+dateObj.getMinutes():dateObj.getMinutes())
  }

  return timestamp;
}

function buildTimestampString(timestamp){
     var string  = timestamp.month+
    ' '+timestamp.day+
    ', '+timestamp.year+
    '<br />'+timestamp.hour+
    ':'+timestamp.minutes+
    ' '+(timestamp.hour<=11?'am':'pm');

    return string;
}

function appendTimestamp(timestampString, timestamp){
   var timeDiv = document.getElementById('time');

    if(timeDiv !== null) {
        timeDiv.innerHTML = timestampString;
        timeDiv.setAttribute('datetime',timestamp.year+'-'+
            (timestamp.month+1<=9?'0'+(timestamp.month+1):timestamp.month+1)+'-'+timestamp.day+' '+timestamp.hour+':'+timestamp.minutes);

    };  
}

setInterval(showCurrentTime,timeInterval);



var watchId = null;
  function geoloc() {
  if (navigator.geolocation) {
    var optn = {
        enableHighAccuracy : true,
        timeout : Infinity,
        maximumAge : 0
    };
  watchId = navigator.geolocation.watchPosition(showPosition, showError, optn);
  } else {
      alert('Geolocation is not supported in your browser');
  }
  }

function showPosition(position) {
    var googlePos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var mapOptions = {
      zoom : 20,
      center : googlePos,
      mapTypeId : google.maps.MapTypeId.ROADMAP
    };
    var mapObj = document.getElementById('mapdiv');
    var googleMap = new google.maps.Map(mapObj, mapOptions);
    var markerOpt = {
      map : googleMap,
      position : googlePos,
      title : 'Hi , I am here',
      animation : google.maps.Animation.DROP
    };
    var googleMarker = new google.maps.Marker(markerOpt);
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({
      'latLng' : googlePos
      }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          var popOpts = {
            content : results[1].formatted_address,
            position : googlePos
          };
        var popup = new google.maps.InfoWindow(popOpts);
        google.maps.event.addListener(googleMarker, 'click', function() {
        popup.open(googleMap);
      });
        } else {
          alert('No results found');
        }
        } else {
          alert('Geocoder failed due to: ' + status);
        }
      });
      }

      function stopWatch() {
        if (watchId) {
          navigator.geolocation.clearWatch(watchId);
          watchId = null;

        }
      }

    function showError(error) {
    var err = document.getElementById('mapdiv');
    switch(error.code) {
    case error.PERMISSION_DENIED:
    err.innerHTML = "User denied the request for Geolocation."
    break;
    case error.POSITION_UNAVAILABLE:
    err.innerHTML = "Location information is unavailable."
    break;
    case error.TIMEOUT:
    err.innerHTML = "The request to get user location timed out."
    break;
    case error.UNKNOWN_ERROR:
    err.innerHTML = "An unknown error occurred."
    break;
    }
    }
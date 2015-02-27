
var dropdown = document.getElementById("dropdown");

function updateMap(query) { 
   ifrm = document.getElementById("map"); 
   ifrm.src = "https://www.google.com/maps/embed/v1/place?q=" + query + "&key=AIzaSyBLgMK_kG_Gr5qd81ryuRbu9uNCI9Om_Js";  
}

function getGDP(country) {
  var url = "http://api.worldbank.org/countries/" + country + "/indicators/NY.GDP.MKTP.CD?mrv=1&format=json";
  $.ajax({
    url: url,
    dataType: "jsonp",
    jsonp: false,
    jsonpCallback: onGetGDP
  });
}

function onGetGDP () {
  debugger;
}

dropdown.addEventListener("change", function(event)
  {
      updateMap(this.value);
  });

updateMap(dropdown.value);


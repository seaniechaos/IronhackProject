
var dropdown = document.getElementById("dropdown");

function updateMap(query) {
   var iframe = document.getElementById("map");
   iframe.src = "https://www.google.com/maps/embed/v1/place?q=" + query + "&key=AIzaSyBLgMK_kG_Gr5qd81ryuRbu9uNCI9Om_Js";
}

function getGDP(country) {
  var callback = ongetgdp; // needs to be lowercase
  var url = "http://api.worldbank.org/countries/" + country + "/indicators/NY.GDP.MKTP.CD?mrv=1&format=jsonP&prefix=" + callback.name;
  $.ajax({
    url: url,
    dataType: "jsonp"
  });
}

function ongetgdp (data) {
  debugger;
  // here you need to collect the data
  // var GDP = ??;
  // and THEN update the map
  // var country = ??;
  // updateMap(country);
}

dropdown.addEventListener("change", function(event) {
  var countryCode = this.value; // you will need to use again 2-digit codes in value
  getGDP(countryCode);
});

// updateMap(dropdown.value); // if you are using codes, this will not work


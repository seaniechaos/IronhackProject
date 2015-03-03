
function numberWithCommas(x) {
  var x = Math.round(x * 100)/100
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

function updateMap(query) { 
   ifrm = document.getElementById("map"); 
   ifrm.src = "https://www.google.com/maps/embed/v1/place?q=" + query + "&key=AIzaSyBLgMK_kG_Gr5qd81ryuRbu9uNCI9Om_Js";  
}

function resetValues(){
  $("#GDPs").text("");
  $("#GDPy").text("");
  $("#INFs").text("");
  $("#INFy").text("");
  $("#UNEMs").text("");
  $("#UNEMy").text("");
  $("#D2Gs").text("");
  $("#D2Gy").text("");
  $("#TPOPs").text("");
  $("#TPOPy").text("");
}


function printgdp(data){
  if(data.length < 2) return;

  var printgdp = data[1][0];
  $("#GDPs").text("$" + numberWithCommas(printgdp.value / 1000000000) + " billion");
  $("#GDPy").html(printgdp.date);
}

function printinf(data){
  if(data.length < 2) return;

  var printinf = data[1][0];
  $("#INFs").text(Math.round(printinf.value * 100) / 100 + "%");
  $("#INFy").html(printinf.date);
}

function printunemp(data){
  if(data.length < 2) return;

  var printunemp = data[1][0];
  $("#UNEMs").text(Math.round(printunemp.value * 100) / 100 + "%");
  $("#UNEMy").html(printunemp.date);
}

function printdebt2gdp(data){
  if(data.length < 2) return;

  var printdebt2gdp = data[1][0];
  $("#D2Gs").text(Math.round(printdebt2gdp.value * 100) / 100 + "%");
  $("#D2Gy").html(printdebt2gdp.date);
}

function printtotalpop(data){
  if(data.length < 2) return;

  var printtotalpop = data[1][0];
  $("#TPOPs").text(numberWithCommas(printtotalpop.value / 1000000) + " million");
  $("#TPOPy").html(printtotalpop.date);
}

function getData(country) {
  resetValues();
 $.ajax({
   url: "http://api.worldbank.org/countries/" + country + "/indicators/NY.GDP.MKTP.CD?mrv=1&format=jsonP&prefix=printgdp",
   dataType: "script"
 });
 $.ajax({
   url: "http://api.worldbank.org/countries/" + country + "/indicators/FP.CPI.TOTL.ZG?mrv=1&format=jsonP&prefix=printinf",
   dataType: "script"
 });
 $.ajax({
   url: "http://api.worldbank.org/countries/" + country + "/indicators/SL.UEM.TOTL.NE.ZS?mrv=1&format=jsonP&prefix=printunemp",
   dataType: "script"
 });
 $.ajax({
   url: "http://api.worldbank.org/countries/" + country + "/indicators/GC.DOD.TOTL.GD.ZS?mrv=1&format=jsonP&prefix=printdebt2gdp",
   dataType: "script"
 });
 $.ajax({
   url: "http://api.worldbank.org/countries/" + country + "/indicators/SP.POP.TOTL?mrv=1&format=jsonP&prefix=printtotalpop",
   dataType: "script"
 });
}



function countrySelect(dropdown){
  updateMap(dropdown.value);
  $("#country_placeholder").html(dropdown.value);
  getData($(dropdown).find("option:selected").attr("id"));
  
}

var dropdown = document.getElementById("dropdown");
countrySelect(dropdown);

$(dropdown).on("change", function(event){
  countrySelect(this);
  });

$(document).ready(function() {
  $(".js-example-basic-single").select2();
});
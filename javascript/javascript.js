var MortgageCalculator = function () {
  this.askPrice;
  this.downPayment;
  this.principal;
  this.interestRateAnnual;
  this.years;
  this.monthlyPayment;
  this.currentOpeningBalance;
  this.addListener();

};

MortgageCalculator.prototype.getInputData = function (event) {
  event.preventDefault();
  debugger;
  this.askPrice             = document.getElementById("ask_price").value;
  this.downPayment          = document.getElementById("dp_submitted").value;
  this.interestRateAnnual   = document.getElementById("interest_rate").value
  this.years                = document.getElementById("years").value;
  this.principal            = document.getElementById("principal").value;
  this.calculation();
};

MortgageCalculator.prototype.addListener = function () {
  debugger;
  document.getElementById("submit").addEventListener("click", this.getInputData.bind(this))
};

MortgageCalculator.prototype.calculation = function () {
  monthlyPayment = finance.calculatePayment(this.principal, this.years * 12, this.interestRateAnnual);
  this.render();
};

MortgageCalculator.prototype.render = function () {
  paymentElement = $("<p>").html(monthlyPayment);
  $("#payments").append(paymentElement);
}

var calculator = new MortgageCalculator();

// document.getElementById("submit").addEventListener("click", function (event) {
//   event.preventDefault();

//   var askPrice        = document.getElementById("ask_price").value;
//   var downPayment     = document.getElementById("dp_submitted").value;
//   var principal       = askPrice - downPayment;

//   var interestRateAnnual   = document.getElementById("interest_rate").value
//   var interestRateMonthly  = interestRateAnnual / 12;
//   var years                = document.getElementById("years").value;
//   var timeToMaturity       = years * 12;


//   var monthlyPayment = finance.calculatePayment(principal, timeToMaturity, interestRateAnnual);
  
  
//   var openingBalance  = principal;
//   var interestPortion = (openingBalance * interestRateMonthly/100);
//   var principalReduct = monthlyPayment - interestPortion;
//   var closingBalance  = openingBalance - principalReduct;

//   var paymentElement = $("<p>").html(monthlyPayment);
//   $("#payments").append(paymentElement);
//   debugger;


// });



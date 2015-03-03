var MortgageCalculator = function () {
  this.askPrice;
  this.downPayment;
  this.principal;
  this.interestRateAnnual;
  this.years;
  this.monthlyPayment;
  this.currentOpeningBalance;
  this.month = 1;
  this.numberMonths;
  this.addListener();

};

MortgageCalculator.prototype.getInputData = function (event) {
  event.preventDefault();

  $("#payments-table tbody tr").remove();
  this.month = 1;

  this.askPrice             = document.getElementById("ask_price").value;
  this.downPayment          = document.getElementById("dp_submitted").value;
  this.interestRateAnnual   = document.getElementById("interest_rate").value
  this.years                = document.getElementById("years").value;
  this.numberMonths         = this.years * 12;
  this.principal            = this.askPrice - this.downPayment;
  this.calculation();
};

MortgageCalculator.prototype.addListener = function () {
  document.getElementById("submit").addEventListener("click", this.getInputData.bind(this))
};

MortgageCalculator.prototype.calculation = function () {
  this.monthlyPayment = finance.calculatePayment(this.principal, this.numberMonths, this.interestRateAnnual);
  this.openingBalance = this.principal;
  this.interestComponent = this.openingBalance * (this.interestRateAnnual / 100 / 12);
  this.principalReduction = this.monthlyPayment - this.interestComponent;
  this.closingBalance = this.openingBalance - this.principalReduction;
  this.renderPayment();
  this.renderRow();
  this.iterateUntilFinished();
};

MortgageCalculator.prototype.renderPayment = function () {
  paymentElement = $("<p class='usd'>").html(this.numberWithCommas(this.monthlyPayment));
  $("#payments").html(paymentElement);
};

MortgageCalculator.prototype.renderRow = function () {
  var $row          = $("<tr>");
  var $monthData    = $("<td>").html(this.month);
  var $openingData  = $("<td class='usd'>").html(this.numberWithCommas(this.openingBalance)); 
  var $paymentData  = $("<td class='usd'>").html(this.numberWithCommas(this.monthlyPayment));
  var $interestPart = $("<td class='usd'>").html(this.numberWithCommas(this.interestComponent));
  var $principalRed = $("<td class='usd'>").html(this.numberWithCommas(this.principalReduction));
  var $closingBal   = $("<td class='usd'>").html(this.numberWithCommas(this.closingBalance));
  $row.append($monthData).append($openingData).append($paymentData).append($interestPart).append($principalRed).append($closingBal);
  $("#payments-table tbody").append($row);
};

MortgageCalculator.prototype.numberWithCommas = function(x) {
  var x = Math.round(x * 100)/100
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

MortgageCalculator.prototype.iterateUntilFinished = function () {
  this.month = this.month + 1;
  this.openingBalance = this.closingBalance;
  this.interestComponent = this.openingBalance * (this.interestRateAnnual / 100 / 12); 
  this.principalReduction = this.monthlyPayment - this.interestComponent;
  this.closingBalance = this.openingBalance - this.principalReduction;
  this.renderRow();

  if (this.month < this.numberMonths) {
    this.iterateUntilFinished();
  }
};

var principalCalculation = function () {
  var askPrice             = document.getElementById("ask_price").value;
  var downPayment          = document.getElementById("dp_submitted").value;
  document.getElementById("principal").value = askPrice - downPayment;
}

document.getElementById("ask_price").addEventListener("change", principalCalculation);
document.getElementById("dp_submitted").addEventListener("change", principalCalculation);


var calculator = new MortgageCalculator();
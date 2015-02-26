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
  this.monthlyPayment = Math.round((finance.calculatePayment(this.principal, this.numberMonths, this.interestRateAnnual) * 100)) / 100;
  this.openingBalance = Math.round((this.principal) * 100) / 100;
  this.interestComponent = Math.round(this.openingBalance * (this.interestRateAnnual / 100 / 12) * 100) / 100;
  this.principalReduction = Math.round((this.monthlyPayment - this.interestComponent) * 100) / 100;
  this.closingBalance = Math.round((this.openingBalance - this.principalReduction) * 100) / 100;
  this.renderPayment();
  this.renderRow();
  this.iterateUntilFinished();
};

MortgageCalculator.prototype.renderPayment = function () {
  paymentElement = $("<p>").html(this.monthlyPayment);
  $("#payments").append(paymentElement);
};

MortgageCalculator.prototype.renderRow = function () {
  var $row                = $("<tr>");
  var $monthData          = $("<td>").html(this.month);
  var $openingData        = $("<td>").html(Math.round(this.openingBalance * 100) / 100);
  var $paymentData        = $("<td>").html(Math.round(this.monthlyPayment * 100) / 100);
  var $interestPart       = $("<td>").html(Math.round(this.interestComponent * 100) / 100);
  var $principalRed       = $("<td>").html(Math.round(this.principalReduction * 100) / 100);
  var $closingBal         = $("<td>").html(Math.round(this.closingBalance * 100) / 100);
  $row.append($monthData).append($openingData).append($paymentData).append($interestPart).append($principalRed).append($closingBal);
  $("#payments-table").append($row);
};

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
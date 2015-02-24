var MortgageCalculator = function () {
  this.askPrice;
  this.downPayment;
  this.principal;
  this.interestRateAnnual;
  this.years;
  this.monthlyPayment;
  this.currentOpeningBalance;
  this.month = 1;
  this.addListener();

};

MortgageCalculator.prototype.getInputData = function (event) {
  event.preventDefault();
  this.askPrice             = document.getElementById("ask_price").value;
  this.downPayment          = document.getElementById("dp_submitted").value;
  this.interestRateAnnual   = document.getElementById("interest_rate").value
  this.years                = document.getElementById("years").value;
  this.principal            = document.getElementById("principal").value;
  this.calculation();
};

MortgageCalculator.prototype.addListener = function () {
  document.getElementById("submit").addEventListener("click", this.getInputData.bind(this))
};

MortgageCalculator.prototype.calculation = function () {
  this.monthlyPayment = finance.calculatePayment(this.principal, this.years * 12, this.interestRateAnnual);
  this.openingBalance = Math.round(this.principal * 100) / 100;
  this.interestComponent = Math.round(this.openingBalance * this.interestRateAnnual / 12 / 100 * 100) / 100;
  this.principalReduction = this.monthlyPayment - this.interestComponent;
  this.closingBalance = this.openingBalance - this.principalReduction;
  this.renderPayment();
  this.renderRow();
};

MortgageCalculator.prototype.renderPayment = function () {
  paymentElement = $("<p>").html(this.monthlyPayment);
  $("#payments").append(paymentElement);
};

MortgageCalculator.prototype.iterateUntilFinished = function () {
  // update openingBalance
  // update interestComponent
  // principalReduction = monthlyPayment - interestComponent
  // update closingBalance
  // update this.month
  // call renderRow
};

MortgageCalculator.prototype.renderRow = function () {
  var $row                = $("<tr>");
  var $monthData          = $("<td>").html(this.month);
  var $openingData        = $("<td>").html(this.openingBalance);
  var $paymentData        = $("<td>").html(this.monthlyPayment)
  var $interestPart       = $("<td>").html(this.interestComponent);
  var $principalRed       = $("<td>").html(this.principalReduction);
  var $closingBal         = $("<td>").html(this.closingBalance);
  $row.append($monthData).append($openingData).append($paymentData).append($interestPart).append($principalRed).append($closingBal);
  $("#payments-table").append($row);
};

var calculator = new MortgageCalculator();
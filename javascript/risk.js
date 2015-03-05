var RiskCalculator = function () {
  this.futurePlan;
  this.timeHorizon;
  this.freeAssets;
  this.nonLiquidAssets;
  this.annualIncome;
  this.annualSpending;
  this.annualSavings;
  this.dedicatedAssets;
  this.investibleAssets;
  this.totalAssets;
  this.totalPcl;
  this.netWorth;
  this.totalPclNetWorth;
  this.freeAssetsRatio;
  this.lossCompensation;
  this.retirementCoverage;
  this.capitalErosion;
  this.futureLiabilities;
  this.addListener();
};

RiskCalculator.prototype.addListener = function () {
  document.getElementById("submit").addEventListener("click", this.getInputData.bind(this));
  document.getElementById("back_to_questions").addEventListener("click", this.scrollToTop);
  document.getElementById("fin_statements").addEventListener("click", this.scrollToClient);
};

RiskCalculator.prototype.getInputData = function (event) {
  event.preventDefault();

  this.futurePlan           = document.getElementById("future_plan_price").value;
  this.timeHorizon          = document.getElementById("time_horizon").value;
  this.nonLiquidAssets      = document.getElementById("non_liquid_price").value
  this.freeAssets           = document.getElementById("cash_price").value;
  this.retirementCoverage   = document.getElementById("retirement_coverage").value;
  this.annualIncome         = document.getElementById("annual_income").value;
  this.annualSpending       = document.getElementById("annual_spending").value;

  if(this.futurePlan == "" || this.timeHorizon == "" || this.nonLiquidAssets == "" || this.freeAssets == "" || this.retirementCoverage == "" || this.annualIncome == "" || this.annualSpending == ""){
    if(this.futurePlan == "") $("#future_plan_price").parent().addClass("has-error");
    else $("#future_plan_price").parent().removeClass("has-error");

    if(this.timeHorizon == "") $("#time_horizon").parent().addClass("has-error");
    else $("#time_horizon").parent().removeClass("has-error");

    if(this.nonLiquidAssets == "") $("#non_liquid_price").parent().addClass("has-error");
    else $("#non_liquid_price").parent().removeClass("has-error");

    if(this.freeAssets == "") $("#cash_price").parent().addClass("has-error");
    else $("#cash_price").parent().removeClass("has-error");

    if(this.retirementCoverage == "") $("#retirement_coverage").parent().addClass("has-error");
    else $("#retirement_coverage").parent().removeClass("has-error");

    if(this.annualIncome == "") $("#annual_income").parent().addClass("has-error");
    else $("#annual_income").parent().removeClass("has-error");

    if(this.annualSpending == "") $("#annual_spending").parent().addClass("has-error");
    else $("#annual_spending").parent().removeClass("has-error");

  } else {
      $("#future_plan_price").parent().removeClass("has-error");
      $("#time_horizon").parent().removeClass("has-error");
      $("#non_liquid_price").parent().removeClass("has-error");
      $("#cash_price").parent().removeClass("has-error");
      $("#retirement_coverage").parent().removeClass("has-error");
      $("#annual_income").parent().removeClass("has-error");
      $("#annual_spending").parent().removeClass("has-error");
      this.calculation();
      this.scrollToClient();
  }

};

RiskCalculator.prototype.calculation = function () {
  this.annualSavings     = parseInt(this.annualIncome) - parseInt(this.annualSpending);
  this.dedicatedAssets   = parseInt(this.futurePlan);
  this.investibleAssets  = parseInt(this.dedicatedAssets) + parseInt(this.freeAssets);
  this.totalAssets       = parseInt(this.investibleAssets) + parseInt(this.nonLiquidAssets);
  this.netWorth          = parseInt(this.totalAssets) - parseInt(this.futurePlan);
  this.totalPcl          = parseInt(this.futurePlan);
  this.totalPclNetWorth  = parseInt(this.futurePlan) + parseInt(this.netWorth);
  this.freeAssetsRatio   = parseFloat(this.freeAssets) / parseFloat(this.totalAssets);
  this.lossCompensation  = parseFloat(this.annualSavings) / parseFloat(this.freeAssets);
  this.capitalErosion    = parseFloat(this.freeAssets) / parseFloat(this.annualSpending);
  this.futureLiabilities = parseFloat(this.totalPcl) / parseFloat(this.freeAssets);

  this.render();
};

RiskCalculator.prototype.numberWithCommas = function(x) {
  var x = Math.round(x * 100)/100
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

RiskCalculator.prototype.render = function() {
  // $("#data-container").show;
  $("#dedicated_assets").text(this.numberWithCommas(this.dedicatedAssets));
  $("#free_assets").text(this.numberWithCommas(this.freeAssets));
  $("#investible_assets").text(this.numberWithCommas(this.investibleAssets));
  $("#other_assets").text(this.numberWithCommas(this.nonLiquidAssets));
  $("#total_assets").text(this.numberWithCommas(this.totalAssets));
  $("#pcl").text(this.numberWithCommas(this.futurePlan));
  $("#total_pcl").text(this.numberWithCommas(this.totalPcl));
  $("#net_worth").text(this.numberWithCommas(this.netWorth));
  $("#total_pcl_and_net_worth").text(this.numberWithCommas(this.totalPclNetWorth));
  $("#is_annual_income").text(this.numberWithCommas(this.annualIncome));
  $("#is_annual_spending").text(this.numberWithCommas(this.annualSpending));
  $("#is_annual_savings").text(this.numberWithCommas(this.annualSavings));
  $("#free_assets_ratio").text(this.numberWithCommas(this.freeAssetsRatio * 100) + "%");
  $("#rs_time_horizon").text(this.numberWithCommas(this.timeHorizon) + " years");
  $("#loss_compensation").text(this.numberWithCommas(this.lossCompensation * 100) + "%");
  $("#rs_retirement_coverage").text(this.numberWithCommas(this.retirementCoverage) + "%");
  $("#capital_erosion").text(this.numberWithCommas(this.capitalErosion) + " years");
  $("#future_liabilities").text(this.numberWithCommas(this.futureLiabilities * 100) + "%");
}

RiskCalculator.prototype.scrollToTop = function(event) {
  event.preventDefault();
  $('html, body').animate({
      scrollTop: $("#top").offset().top
    }, 1500);
}

RiskCalculator.prototype.scrollToClient = function(event) {
  // event.preventDefault();
  $('html, body').animate({
      scrollTop: $("#client_balance_sheet").offset().top
    }, 1500);
}

var calculator = new RiskCalculator();

// add method that add the Listener to the button. Create RiskCalculator.protoype.addListener
// this listener should get all the data and set the variables
// call me
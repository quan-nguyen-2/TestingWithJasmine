window.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: document.getElementById("loan-amount").value,
    years: document.getElementById("loan-years").value,
    rate: document.getElementById("loan-rate").value,
  };
}

function setupIntialValues() {
  // Get the inputs from the DOM.
  let loanAmount = document.getElementById("loan-amount");
  let loanYears = document.getElementById("loan-years");
  let loanRate = document.getElementById("loan-rate");

  // Put some default values in the inputs
  loanAmount.value = 449000;
  loanYears.value = 30;
  loanRate.value = 3.75;

  // Call a function to calculate the current monthly payment
  const values = getCurrentUIValues();
  const monthly = calculateMonthlyPayment(values);
  updateMonthly(monthly.toString());
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  const values = getCurrentUIValues();
  const monthly = calculateMonthlyPayment(values);
  updateMonthly(monthly.toString());
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  let { amount, years, rate } = values;
  amount = parseFloat(amount);
  years = parseFloat(years);
  rate = parseFloat(rate);

  if (isNaN(amount)) {
    throw new Error("Invalid 'Loan Amount'");
  } else if (isNaN(years)) {
    throw new Error("Invalid 'Term in Years'");
  } else if (isNaN(rate)) {
    throw new Error("Invalid 'Yearly Rate'");
  }

  rate /= 100;

  const P = amount;
  const i = rate / 12;
  const n = years * 12;

  const monthly = (P * i) / (1 - Math.pow(1 + i, -n));
  
  return round2Decimals(monthly).toString();
}

function round2Decimals(monthly) {
  // https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary
  return Math.round((monthly + Number.EPSILON) * 100) / 100;
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  let monthlyPayment = document.getElementById("monthly-payment");
  monthlyPayment.innerText = monthly;
}

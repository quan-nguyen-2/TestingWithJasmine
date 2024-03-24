describe("Helpers test (with setup and tear-down)", function () {
  beforeEach(function () {
    // initialization logic
  });

  it("should return the correct sum of 'parameter type' in allPayments on sumPaymentTotal()", function () {
    // create a payment object
    paymentId += 1;
    let billAmt = "100";
    let tipAmt = "17";
    let tipPercent = calculateTipPercent(billAmt, tipAmt);
    const curPayment1 = {
      billAmt,
      tipAmt,
      tipPercent,
    };
    // add object to allPayments object
    allPayments["payment" + paymentId.toString()] = curPayment1;
    // run initial test
    expect(sumPaymentTotal("billAmt")).toEqual(100);
    expect(sumPaymentTotal("tipAmt")).toEqual(17);
    expect(sumPaymentTotal("tipPercent")).toEqual(17);
    // add another payment in to test multiple values are summing correctly
    // create another payment object
    const newPaymentId = paymentId + 1;
    billAmt = "200";
    tipAmt = "50";
    tipPercent = calculateTipPercent(billAmt, tipAmt);
    const curPayment2 = {
      billAmt,
      tipAmt,
      tipPercent,
    };
    // add object to allPayments object
    allPayments["payment" + newPaymentId.toString()] = curPayment2;
    // Now check to make sure summing is being done correcly
    expect(sumPaymentTotal("billAmt")).toEqual(300);
    expect(sumPaymentTotal("tipAmt")).toEqual(67);
    expect(sumPaymentTotal("tipPercent")).toEqual(42);
  });

  it("should calculate the correct tip percentage on calculateTipPercent()", function () {
    expect(calculateTipPercent("100", "15")).toEqual(15);
    expect(calculateTipPercent("200", "16")).toEqual(8);
    // Decimals not allowed by validation, but will result in rounded value
    expect(calculateTipPercent("200", "15.5")).toEqual(8);
  });

  it("should append a new td element (having the inner text of 'value') to the tr element fed to the function on appendTd()", function () {
    let tr1 = document.createElement("tr");
    appendTd(tr1, "Hello");

    expect(tr1.children.length).toEqual(1);
    expect(tr1.children[0].innerText).toEqual("Hello");

    let tr2 = document.createElement("tr");
    appendTd(tr2, 100);

    expect(tr2.children.length).toEqual(1);
    expect(tr2.children[0].innerText).toEqual("100");
  });

  it("should append a new td element (having the inner text of 'X' and a classList containg 'delete) to the tr element fed to the function on appendDeleteBtn()", function () {
    let tr1 = document.createElement("tr");
    appendDeleteBtn(tr1);

    expect(tr1.children.length).toEqual(1);
    expect(tr1.children[0].innerText).toEqual("X");
    expect(tr1.children[0].classList.contains("delete")).toEqual(true);
  });

  afterEach(function () {
    // teardown logic
    delete allPayments["payment" + paymentId];
    delete allPayments["payment" + (paymentId + 1).toString()];
    paymentId -= 1;
  });
});

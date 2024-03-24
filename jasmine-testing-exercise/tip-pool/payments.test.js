describe("Payments test (with setup and tear-down)", function () {
  beforeEach(function () {
    // initialization logic
    paymentId += 1;
    billAmtInput.value = 100;
    tipAmtInput.value = 15;
  });

  it("should add a new payment to allPayments on submitPaymentInfo()", function () {
    submitPaymentInfo();

    expect(Object.keys(allPayments).length).toEqual(1);
    expect(allPayments["payment" + paymentId].billAmt).toEqual("100");
    expect(allPayments["payment" + paymentId].tipAmt).toEqual("15");
    expect(allPayments["payment" + paymentId].tipPercent).toEqual(15);
  });

  it("should return an object with billAmt, tipAmt and tipPercent on createCurPayment()", function () {
    expect(createCurPayment()).toEqual({
      billAmt: "100",
      tipAmt: "15",
      tipPercent: 15,
    });
  });

  it("should add another payment to the payment table on appendPaymentTable()", () => {
    const billAmt = billAmtInput.value;
    const tipAmt = tipAmtInput.value;
    const tipPercent = calculateTipPercent(billAmt, tipAmt);
    const curPayment = {
      billAmt,
      tipAmt,
      tipPercent,
    };
    allPayments["payment" + paymentId.toString()] = curPayment;
    appendPaymentTable(curPayment);
    const row = document.getElementById("payment" + paymentId.toString());
    expect(row.children[0].innerText).toEqual("$100");
    expect(row.children[1].innerText).toEqual("$15");
    expect(row.children[2].innerText).toEqual("15%");
  });

  it("should update the values in summaryTds on updateSummary()", () => {
    paymentId += 1;
    const billAmt = billAmtInput.value;
    const tipAmt = tipAmtInput.value;
    const tipPercent = calculateTipPercent(billAmt, tipAmt);
    const curPayment = {
      billAmt,
      tipAmt,
      tipPercent,
    };
    allPayments["payment" + paymentId.toString()] = curPayment;
    updateSummary(curPayment);

    expect(summaryTds[0].innerHTML).toEqual("$100");
    expect(summaryTds[1].innerHTML).toEqual("$15");
    expect(summaryTds[2].innerHTML).toEqual("15%");
  });

  afterEach(function () {
    // teardown logic
    delete allPayments["payment" + paymentId];
    const row = document.getElementById("payment" + paymentId.toString());
    if (row) {
      row.remove();
    }

    summaryTds[0].innerHTML = "";
    summaryTds[1].innerHTML = "";
    summaryTds[2].innerHTML = "";

    paymentId -= 1;
    billAmtInput.value = "";
    tipAmtInput.value = "";
  });
});

describe("calculateMonthlyPayment checks", () => {
  it("should calculate the monthly rate correctly", function () {
    expect(
      calculateMonthlyPayment({ amount: 449000, years: 30, rate: 3.75 })
    ).toEqual("2079.39");
    expect(
      calculateMonthlyPayment({ amount: 750000, years: 15, rate: 4 })
    ).toEqual("5547.66");
  });

  it("should return a result with 2 decimal places", function () {
    expect(
      Number(calculateMonthlyPayment({ amount: 449000, years: 30, rate: 3.75 }))
    ).toBeCloseTo(2079.39, 3);
    expect(
      Number(calculateMonthlyPayment({ amount: 750000, years: 15, rate: 4 }))
    ).toEqual(5547.66);
  });

  it("should throw errors when non-number inputs are given", () => {
    expect(() =>
      calculateMonthlyPayment({ amount: 899999, years: "", rate: 4 })
    ).toThrowError();
    expect(() =>
      calculateMonthlyPayment({ amount: null, years: 20, rate: 4 })
    ).toThrowError();
    expect(() =>
      calculateMonthlyPayment({ amount: [], years: "abc", rate: null })
    ).toThrowError();
  });
});

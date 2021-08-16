import { formatCurrency } from "./currency";

describe("formatCurrency", () => {
  it("prints a leading zero for single digits", () => {
    expect(formatCurrency(1).startsWith("01")).toBeTruthy();
  });

  it("rounds to two decimal places", () => {
    expect(formatCurrency(231.456)).toBe("231.46");
  });
});

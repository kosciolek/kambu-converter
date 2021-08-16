import {
  firstToUppercase,
  forwardCalls,
  preciseRound,
  preventDefault,
} from "./js";

describe("preciseRound", () => {
  it("rounds ...5 up", () => {
    expect(preciseRound(1.005, 2)).toBe(1.01);
  });

  it("rounds to a correct amount of decimal places", () => {
    expect(preciseRound(1.534362, 4)).toBe(1.5344);
  });
});

describe("forwardCalls", () => {
  it("calls all funcs", () => {
    const mock1 = jest.fn();
    const mock2 = jest.fn();

    forwardCalls(mock1, mock2)(123);

    expect(mock1.mock.calls.length).toBe(1);
    expect(mock2.mock.calls.length).toBe(1);

    expect(mock1.mock.calls[0][0]).toBe(123);
    expect(mock2.mock.calls[0][0]).toBe(123);
  });
});

describe("preventDefault", () => {
  it("calls preventDefault", () => {
    const mock = jest.fn();

    const e = { preventDefault: mock };

    preventDefault(e);

    expect(mock.mock.calls.length).toBe(1);
  });
});

describe("firstToUppercase", () => {
  it("uppercases first char", () => {
    expect(firstToUppercase("string")).toBe("String");
  });

  it("does not uppercase later words", () => {
    expect(firstToUppercase("string value")).toBe("String value");
  });
});

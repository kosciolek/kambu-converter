import { act } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { createRef } from "react";
import { useMergeRefs } from "./useMergeRefs";

describe("useMergeRefs", () => {
  it("merges two ref objects", () => {
    const ref1 = createRef();
    const ref2 = createRef();

    const { result } = renderHook(() => useMergeRefs(ref1, ref2));

    const refVal = "some-ref";
    act(() => {
      result.current(refVal);
    });

    expect(ref1.current).toBe(refVal);
    expect(ref2.current).toBe(refVal);
  });

  it("merges two ref callbacks", () => {
    const ref1 = jest.fn();
    const ref2 = jest.fn();

    const { result } = renderHook(() => useMergeRefs(ref1, ref2));

    const refVal = "some-ref";
    act(() => {
      result.current(refVal);
    });

    expect(ref1.mock.calls.length).toBe(1);
    expect(ref2.mock.calls.length).toBe(1);
    expect(ref1.mock.calls[0][0]).toBe(refVal);
    expect(ref2.mock.calls[0][0]).toBe(refVal);
  });

  it("merges a ref object and a ref callback", () => {
    const ref1 = jest.fn();
    const ref2 = createRef();

    const { result } = renderHook(() => useMergeRefs(ref1, ref2));

    const refVal = "some-ref";
    act(() => {
      result.current(refVal);
    });

    expect(ref1.mock.calls.length).toBe(1);
    expect(ref1.mock.calls[0][0]).toBe(refVal);

    expect(ref2.current).toBe(refVal);
  });
});

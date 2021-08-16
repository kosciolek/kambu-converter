import { act } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { useWindowEvent } from "./useWindowEvent";

describe("useMergeRefs", () => {
  it("listens to window events", () => {
    const mock = jest.fn();
    renderHook(() => useWindowEvent("click", mock));

    act(() => {
      window.dispatchEvent(new Event("click"));
    });

    expect(mock.mock.calls.length).toBe(1);
  });
});

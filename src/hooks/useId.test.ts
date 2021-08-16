import { renderHook } from "@testing-library/react-hooks";
import { useId } from "./useId";

describe("useId", () => {
  it("returns a string id", () => {
    const { result } = renderHook(() => useId());
    expect(typeof result.current).toBe("string");
  });

  it("returns a stable id", () => {
    const { result, rerender } = renderHook(() => useId());

    rerender();
    rerender();
    rerender();
    rerender();

    expect(result.all.every((id) => id === result.all[0])).toBeTruthy();
  });

  it("is prefixable", () => {
    const { result } = renderHook(() => useId("prefix"));
    expect(result.current.startsWith("prefix-")).toBeTruthy();
  });
});

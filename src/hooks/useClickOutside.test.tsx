import { fireEvent, render, screen } from "@testing-library/react";
import { useRef } from "react";
import { useClickOutside } from "./useClickOutside";

describe("useClickOutside", () => {
  it("detects outside clicks", async () => {
    const mock = jest.fn();

    const Comp = () => {
      const ref = useRef<HTMLDivElement | null>(null);
      useClickOutside([ref], mock);
      return (
        <>
          <div>A</div>
          <div ref={ref}>B</div>
        </>
      );
    };

    render(<Comp />);

    fireEvent.click(await screen.findByText("A"));

    expect(mock.mock.calls.length).toBe(1);
  });

  it("does not fire on ignored element", async () => {
    const mock = jest.fn();

    const Comp = () => {
      const ref = useRef<HTMLDivElement | null>(null);
      useClickOutside([ref], mock);
      return (
        <>
          <div>A</div>
          <div ref={ref}>B</div>
        </>
      );
    };

    render(<Comp />);

    fireEvent.click(await screen.findByText("B"));

    expect(mock.mock.calls.length).toBe(0);
  });

  it("does not fire on ignored child", async () => {
    const mock = jest.fn();

    const Comp = () => {
      const ref = useRef<HTMLDivElement | null>(null);
      useClickOutside([ref], mock);
      return (
        <>
          <div>A</div>
          <div ref={ref}>
            <div>C</div>
          </div>
        </>
      );
    };

    render(<Comp />);

    fireEvent.click(await screen.findByText("C"));

    expect(mock.mock.calls.length).toBe(0);
  });
});

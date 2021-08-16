import { fireEvent, render, screen } from "@testing-library/react";
import { Config } from "../../configs/Config";
import { Input } from "./index";

describe("Input", () => {
  it("changes its value", async () => {
    render(<Input aria-label="input" />, {
      wrapper: Config,
    });

    fireEvent.change(await screen.findByLabelText("input"), {
      target: { value: "value123" },
    });

    expect(screen.getByDisplayValue("value123")).toBeInTheDocument();
  });

  it("calls onChange", async () => {
    const onChange = jest.fn();

    render(<Input aria-label="input" onChange={onChange} />, {
      wrapper: Config,
    });

    fireEvent.change(await screen.findByLabelText("input"), {
      target: { value: "value123" },
    });

    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][1]).toEqual("value123");
  });

  it("displays Label", async () => {
    render(<Input label="My label" />, {
      wrapper: Config,
    });

    await screen.findByText("My label");
  });

  it("displays Error", async () => {
    render(<Input error="My error" />, {
      wrapper: Config,
    });

    await screen.findByText("My error");
  });
});

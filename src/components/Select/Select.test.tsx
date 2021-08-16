import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { Config } from "../../configs/Config";
import { Select } from "./index";

/* Timers for animations */

beforeAll(() => {
  jest.useFakeTimers();
});

afterAll(() => {
  jest.runAllTimers();
  jest.useRealTimers();
});

describe("Select", () => {
  it("selects an option", async () => {
    render(
      <Select
        options={[{ value: "A" }, { value: "B" }, { value: "C" }]}
        placeholder="No value"
      />,
      { wrapper: Config }
    );

    fireEvent.click(await screen.findByText("No value"));
    fireEvent.click(await screen.findByText("A"));

    await waitForElementToBeRemoved(() => screen.queryByTestId("options"));

    const optionA = await screen.findByText("A");
    const optionB = screen.queryByText("B");

    expect(optionA).not.toBeNull();
    expect(optionB).toBeNull();
  });

  it("fires onChange", async () => {
    const onChange = jest.fn();

    render(
      <Select
        onChange={onChange}
        options={[{ value: "A" }, { value: "B" }, { value: "C" }]}
        placeholder="No value"
      />,
      { wrapper: Config }
    );

    fireEvent.click(await screen.findByText("No value"));
    fireEvent.click(await screen.findByText("A"));

    expect(onChange.mock.calls[0][0]).toBe("A");
  });

  it("shows all options", async () => {
    const onChange = jest.fn();

    render(
      <Select
        onChange={onChange}
        options={[{ value: "A" }, { value: "B" }, { value: "C" }]}
        placeholder="No value"
      />,
      { wrapper: Config }
    );

    fireEvent.click(await screen.findByText("No value"));

    await screen.findByText("A");
    await screen.findByText("B");
    await screen.findByText("C");
  });
});

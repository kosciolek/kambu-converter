import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from "./index";

describe("Button", () => {
  it("responds to onClick", async () => {
    const onClick = jest.fn();

    render(<Button onClick={onClick}>Btn</Button>);

    fireEvent.click(await screen.findByText("Btn"));
  });
});

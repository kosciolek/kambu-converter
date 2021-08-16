import {
  screen,
  render,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { Config } from "../../configs/Config";
import { Dialog } from "./index";

describe("Dialog", () => {
  it("opens and closes", async () => {
    render(
      <Dialog
        action={({ open }) => (
          <button type="button" onClick={open}>
            Open
          </button>
        )}
        content={({ close }) => (
          <button type="button" onClick={close}>
            Close
          </button>
        )}
      />,
      { wrapper: Config }
    );

    fireEvent.click(await screen.findByText("Open"));
    fireEvent.click(await screen.findByText("Close"));
    await waitForElementToBeRemoved(() => screen.queryByText("Close"));
  });
});

import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { createConfig } from "../../utils/testing";
import { Currency } from "./Currency";

/* Todo move msw mocks out */
const server = setupServer(
  rest.get("https://api.exchangerate.host/latest", (req, res, ctx) =>
    res(
      ctx.json({
        base: "EUR",
        date: "2021-08-14",
        rates: {
          EUR: 1,
          PLN: 4.5,
        },
        success: true,
      })
    )
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Currency", () => {
  it("displays manually exchanged currency", async () => {
    render(<Currency eur={2} />, {
      wrapper: createConfig({
        initialState: {
          exchange: {
            useLiveRate: false,
            rate: 4.2,
          },
        },
      }),
    });

    await screen.findByText("02.00");
    await screen.findByText("08.40");
  });

  it.skip("displays exchanged via live rate", async () => {
    render(<Currency eur={2} />, {
      wrapper: createConfig({
        initialState: {
          exchange: {
            useLiveRate: true,
            liveRateInterval: 1000,
          },
        },
      }),
    });

    await screen.findByText("02.00");
    await screen.findByText("09.00");
  });
});

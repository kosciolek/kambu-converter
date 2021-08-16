import { renderHook } from "@testing-library/react-hooks";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { createConfig } from "../../utils/testing";
import { useExchange, useLiveExchange } from "./hooks";

/* Todo move msw mocks out */
const server = setupServer(
  rest.get("*", (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        base: "EUR",
        date: "2021-08-14",
        rates: {
          EUR: 1,
          PLN: 4,
        },
        success: true,
      })
    )
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("useLiveExchange", () => {
  it("exchanges", async () => {
    const hook = renderHook(() => useLiveExchange(), {
      wrapper: createConfig(),
    });

    await hook.waitFor(() => hook.result.current.isSuccess);

    expect(
      hook.result.current.exchange({
        from: "EUR",
        to: "PLN",
        format: false,
        amount: 2,
      })
    ).toBe(8);
  });
});

describe("useExchange", () => {
  it("exchanges via live rate", async () => {
    const hook = renderHook(() => useExchange(), {
      wrapper: createConfig({
        initialState: {
          exchange: {
            rate: 3,
            useLiveRate: true,
          },
        },
      }),
    });

    await hook.waitFor(() => hook.result.current.isSuccess);

    expect(
      hook.result.current.exchange({
        from: "EUR",
        to: "PLN",
        format: false,
        amount: 2,
      })
    ).toBe(8);
  });

  it("exchanges via manual rate", async () => {
    const hook = renderHook(() => useExchange(), {
      wrapper: createConfig({
        initialState: {
          exchange: {
            rate: 3,
            useLiveRate: false,
          },
        },
      }),
    });

    await hook.waitFor(() => hook.result.current.isSuccess);

    expect(
      hook.result.current.exchange({
        from: "EUR",
        to: "PLN",
        format: false,
        amount: 2,
      })
    ).toBe(6);
  });
});

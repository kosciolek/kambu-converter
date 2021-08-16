import { renderHook } from "@testing-library/react-hooks";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { Config } from "../../configs/Config";
import { useLiveExchange } from "./hooks";

/* Todo move msw mocks out */
const server = setupServer(
  rest.get("https://api.exchangerate.host/latest", (req, res, ctx) =>
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
  it.skip("exchanges", async () => {
    const hook = renderHook(() => useLiveExchange(), {
      wrapper: Config,
    });

    await hook.waitFor(() => hook.result.current.isSuccess);
    /* Ky is a pure ESM module and somehow it doesn't work with the hooks testing lib, the above timeouts
    * This supposedly needs to be added to package.json, but it still doesn't work
    *   "jest": {
    "transformIgnorePatterns": [
      "/node_modules/(?!(ky))"
    ]
  }
    * */
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

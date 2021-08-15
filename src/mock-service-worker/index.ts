import { rest, setupWorker } from "msw";
import { CurrencyRatesAnswer } from "../api/exchange/methods";

export const handlers = [
  rest.get("https://api.exchangerate.host/latest", (req, res, ctx) => {
    const body: CurrencyRatesAnswer = {
      base: "EUR",
      date: "2021-08-14",
      rates: {
        EUR: 1,
        PLN: 4.565033,
      },
      success: true,
    };
    return res(ctx.status(200), ctx.json(body));
  }),
];

export const worker = setupWorker(...handlers);

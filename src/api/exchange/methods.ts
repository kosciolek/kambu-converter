import { Currency } from "../../utils/currency";
import { currencyApi } from "./api";

export type CurrencyRatesAnswer = {
  base: Currency;
  date: string;
  rates: Partial<Record<Currency, number>>;
  success: boolean;
};

export const getCurrencyRates = ({
  currencies,
}: { currencies?: Currency[] } = {}) => {
  const searchParams: Record<string, any> = {};

  if (currencies) searchParams.symbols = currencies.join(",");

  /* Cannot use short form because of
  * https://github.com/sindresorhus/ky/issues/372 */
  return currencyApi
    .get("latest", {
      searchParams,
    })
    .then((resp) => resp.json());
};

import { useMemo } from "react";
import { QueryOptions, useQuery } from "react-query";
import { Currency, formatCurrency } from "../../utils/currency";
import { CurrencyRatesAnswer, getCurrencyRates } from "./methods";

/**
 * Fetches rates data for currencies
 * @param _currencies Currencies to fetch rates for. Defaults to all
 * @param options useQuery options
 */
export const useCurrencyRates = ({
  _currencies,
  ...options
}: { currencies?: Currency[] } & QueryOptions<CurrencyRatesAnswer> = {}) =>
  useQuery<CurrencyRatesAnswer>(["exchange"], async () => getCurrencyRates(), {
    refetchInterval: 10000,
    ...options,
  });

/**
 * Exchanges currencies via API.
 */
export const useLiveExchange = () => {
  const query = useCurrencyRates();
  const { data } = query;

  const exchange = useMemo(() => {
    if (!data) return null;

    return ({
      amount,
      from,
      to,
      format,
    }: {
      amount: number;
      from: Currency;
      to: Currency;
      format?: boolean;
    }) => {
      if (!data) return null;

      const fromRate = data.rates[from]!;
      const toRate = data.rates[to]!;

      const result = amount * (toRate / fromRate);

      return format ? formatCurrency(result) : result;
    };
  }, [data]);

  return { exchange, ...query };
};

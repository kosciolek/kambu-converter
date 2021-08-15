import { useCallback, useMemo } from "react";
import { QueryOptions, useQuery } from "react-query";
import { useAppSelector } from "../../store/hooks";
import { getRate, getUseLiveRate } from "../../store/slices/exchange/selectors";
import { Currency, formatCurrency } from "../../utils/currency";
import { CurrencyRatesAnswer, getCurrencyRates } from "./methods";

/**
 * Fetches rates data for currencies
 * @param _currencies Currencies to fetch rates for. Defaults to all
 * @param options useQuery options
 */
export const useCurrencyRates = ({
  currencies: _currencies,
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

/**
 * Exchanges currencies via API or the manual rate, depending on the store setting.
 */
export const useExchange = () => {
  const { exchange: liveExchange, ...restLiveQuery } = useLiveExchange();
  const manualRate = useAppSelector(getRate);
  const isLiveRate = useAppSelector(getUseLiveRate);

  const exchange = useCallback(
    ({
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
      if (isLiveRate) return liveExchange?.({ amount, from, to, format });

      // todo supports only base -> aux exchange

      const result = amount * manualRate;
      return format ? formatCurrency(result) : result;
    },
    [isLiveRate, liveExchange, manualRate]
  );

  return { exchange, ...restLiveQuery };
};

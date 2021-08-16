import { useCallback, useMemo } from "react";
import { useQuery, UseQueryOptions } from "react-query";
import { useAppSelector } from "../../store/hooks";
import {
  getLiveRateInterval,
  getRate,
  getUseLiveRate,
} from "../../store/slices/exchange/selectors";
import { Currency, formatCurrency } from "../../utils/currency";
import { CurrencyRatesAnswer, getCurrencyRates } from "./methods";

/**
 * Fetches rates data for currencies
 * @param _currencies Currencies to fetch rates for. Defaults to all
 * @param options useQuery options
 */
export const useCurrencyRates = ({
  currencies: _currencies,
  queryOptions,
}: {
  currencies?: Currency[];
  queryOptions?: UseQueryOptions<CurrencyRatesAnswer>;
} = {}) => {
  const interval = useAppSelector(getLiveRateInterval);
  return useQuery<CurrencyRatesAnswer>(
    ["exchange"],
    async () => getCurrencyRates(),
    {
      refetchInterval: interval,
      ...queryOptions,
    }
  );
};

/**
 * Exchanges currencies via API.
 */
export const useLiveExchange = (
  queryOptions?: UseQueryOptions<CurrencyRatesAnswer>
) => {
  const query = useCurrencyRates({ queryOptions });
  const { data } = query;

  const exchange = useMemo(
    () =>
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
        if (!data) return null;

        const fromRate = data.rates[from]!;
        const toRate = data.rates[to]!;

        const result = amount * (toRate / fromRate);

        return format ? formatCurrency(result) : result;
      },
    [data]
  );

  return { exchange, ...query };
};

/**
 * Exchanges currencies via API or the manual rate, depending on the store setting.
 */
export const useExchange = (
  queryOptions?: UseQueryOptions<CurrencyRatesAnswer>
) => {
  const { exchange: liveExchange, ...restLiveQuery } =
    useLiveExchange(queryOptions);
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

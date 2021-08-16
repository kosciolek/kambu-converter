import { useExchange } from "../../api/exchange/hooks";
import { numToDate } from "../../utils/js";
import { Currency } from "./Currency";
import { Statistic, StatisticSubtitle, StatisticTitle } from "./Statistic";

export const ExchangeRate = () => {
  const { dataUpdatedAt } = useExchange();

  return (
    <Statistic>
      <StatisticTitle>Exchange Rate</StatisticTitle>
      <StatisticSubtitle>{numToDate(dataUpdatedAt, "time")}</StatisticSubtitle>
      <Currency eur={1} />
    </Statistic>
  );
};

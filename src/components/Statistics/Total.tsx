import { useSelector } from "react-redux";
import { getTotal } from "../../store/slices/exchange/selectors";
import { Currency } from "./Currency";
import { Statistic, StatisticSubtitle, StatisticTitle } from "./Statistic";

export const Total = () => {
  const total = useSelector(getTotal);

  return (
    <Statistic>
      <StatisticTitle>Total</StatisticTitle>
      <StatisticSubtitle>OF CURRENT</StatisticSubtitle>
      <Currency eur={total} />
    </Statistic>
  );
};

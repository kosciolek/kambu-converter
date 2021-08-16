import { useSelector } from "react-redux";
import { getAverage } from "../../store/slices/exchange/selectors";
import { Currency } from "./Currency";
import { Statistic, StatisticSubtitle, StatisticTitle } from "./Statistic";

export const Average = () => {
  const average = useSelector(getAverage);

  return (
    <Statistic>
      <StatisticTitle>Average</StatisticTitle>
      <StatisticSubtitle>OF CURRENT</StatisticSubtitle>
      <Currency eur={average} />
    </Statistic>
  );
};

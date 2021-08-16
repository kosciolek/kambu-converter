import { useSelector } from "react-redux";
import { getHighest } from "../../store/slices/exchange/selectors";
import { Txt } from "../Txt";
import { Currency } from "./Currency";
import { Statistic, StatisticSubtitle, StatisticTitle } from "./Statistic";

export const Highest = () => {
  const highest = useSelector(getHighest);

  return (
    <Statistic>
      <StatisticTitle>Highest</StatisticTitle>
      <StatisticSubtitle>
        BY CURRENT{" "}
        {highest && (
          <>
            <br />
            <Txt color="primary50">Name:</Txt> {highest.name}
          </>
        )}
      </StatisticSubtitle>
      <Currency eur={highest?.eur} />
    </Statistic>
  );
};

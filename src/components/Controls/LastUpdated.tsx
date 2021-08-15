import styled from "@emotion/styled";
import { useCurrencyRates } from "../../api/exchange/hooks";
import { numToDate } from "../../utils/js";
import { Txt } from "../Txt";

export const LastUpdated = () => {
  const { dataUpdatedAt } = useCurrencyRates();

  return (
    <Root>
      <Txt color="primary600" size="sm">
        RATES LAST UPDATED
      </Txt>{" "}
      <Txt color="primary900" size="sm">
        {numToDate(dataUpdatedAt, "time")}
      </Txt>
    </Root>
  );
};

const Root = styled.div`
  padding: 8px 0;
`;

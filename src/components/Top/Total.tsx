import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { useExchange } from "../../api/exchange/hooks";
import { getTotal } from "../../store/slices/exchange/selectors";
import { formatCurrency } from "../../utils/currency";
import { Txt } from "../Txt";

export const Total = () => {
  const { exchange } = useExchange();
  const total = useSelector(getTotal);

  return (
    <Root>
      <Header>
        <Txt size="md" weight={600}>
          Total
        </Txt>
        <Txt size="xs" color="primary200">
          OF CURRENT
        </Txt>
      </Header>
      <Counters>
        <Counter>
          <Txt size="lg">EUR</Txt>
          <Txt size="xl">{formatCurrency(total)}</Txt>
        </Counter>
        <Txt size="xl">=</Txt>
        <Counter>
          <Txt size="lg">PLN</Txt>
          <Txt size="xl">
            {exchange
              ? exchange({
                  from: "EUR",
                  to: "PLN",
                  amount: total,
                  format: true,
                })
              : "--.--"}
          </Txt>
        </Counter>
      </Counters>
    </Root>
  );
};

export const Root = styled.div``;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Counters = styled.div`
  display: flex;
  align-items: center;
  grid-template-columns: 1fr auto 1fr;
  justify-content: center;
  margin-top: 16px;
  color: ${({ theme: t }) => t.color.primary100};

  & > * + * {
    margin-left: 24px;
  }
`;

export const Counter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

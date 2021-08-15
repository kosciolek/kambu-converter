import styled from "@emotion/styled";
import { useExchange } from "../../api/exchange/hooks";
import { Txt } from "../Txt";

export const ExchangeRate = () => {
  const { exchange, dataUpdatedAt } = useExchange();

  return (
    <Root>
      <Header>
        <Txt size="md" weight={600}>
          Exchange Rate
        </Txt>
        <Txt size="xs" color="primary200">
          {new Date(dataUpdatedAt).toLocaleTimeString()}
        </Txt>
      </Header>
      <Counters>
        <Counter>
          <Txt size="lg">EUR</Txt>
          <Txt size="xl">1.00</Txt>
        </Counter>
        <Txt size="xl">=</Txt>
        <Counter>
          <Txt size="lg">PLN</Txt>
          <Txt size="xl">
            {exchange
              ? exchange({
                  from: "EUR",
                  to: "PLN",
                  amount: 1,
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

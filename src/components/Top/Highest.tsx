import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { useExchange } from "../../api/exchange/hooks";
import { getHighest } from "../../store/slices/exchange/selectors";
import { Txt } from "../Txt";

export const Highest = () => {
  const highest = useSelector(getHighest);
  const { exchange, isLoading } = useExchange();

  return (
    <Root>
      <Header>
        <Txt size="md" weight={600}>
          Highest
        </Txt>
        <Txt size="xs" color="primary200">
          BY CURRENT
        </Txt>
        {highest && (
          <Txt size="xs" color="primary200">
            {highest.name}
          </Txt>
        )}
      </Header>
      <Counters>
        <Counter>
          <Txt size="lg">EUR</Txt>
          <Txt size="xl">{highest?.eur ?? "--.--"}</Txt>
        </Counter>
        <Counter>
          <Txt size="lg">PLN</Txt>
          <Txt size="xl">
            {highest && !isLoading
              ? exchange({
                  from: "EUR",
                  to: "PLN",
                  amount: highest.eur,
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
  grid-template-columns: 1fr 1fr;
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

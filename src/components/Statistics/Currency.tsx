import styled from "@emotion/styled";
import { useExchange } from "../../api/exchange/hooks";
import { formatCurrency } from "../../utils/currency";
import { Txt } from "../Txt";

export type CurrencyProps = {
  eur?: number;
};

export const Currency = ({ eur }: CurrencyProps) => {
  const { exchange } = useExchange();
  return (
    <Root>
      <div>
        <Txt size="lg">{eur ? formatCurrency(eur) : "--.--"}</Txt>
        <Txt size="sm" color="primary100">
          {" "}
          €
        </Txt>
      </div>
      <Bar />
      <div>
        <Txt size="lg">
          {eur
            ? exchange({
                amount: eur,
                from: "EUR",
                format: true,
                to: "PLN",
              })
            : "--.--"}
        </Txt>
        <Txt size="sm" color="primary100">
          {" "}
          zł
        </Txt>
      </div>
    </Root>
  );
};

export const Root = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;

  & > * + * {
    margin-top: 4px;
  }
`;

export const Bar = styled.div`
  width: calc(100% + 16px);
  flex-grow: 1;
  height: 1px;
  background-color: currentColor;
  opacity: 0.3;
`;

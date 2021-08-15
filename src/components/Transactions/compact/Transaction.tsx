import styled from "@emotion/styled";
import { useMemo } from "react";
import { useExchange } from "../../../api/exchange/hooks";
import { useAppSelector } from "../../../store/hooks";
import { getTransactionById } from "../../../store/slices/exchange/selectors";
import { formatCurrency } from "../../../utils/currency";
import { Button } from "../../Button";
import { Txt } from "../../Txt";
import { TransactionDialog } from "../../TransactionDialog";
import moreIcon from "./more.png";

export type TransactionProps = {
  id: string;
};

export const Transaction = ({ id }: TransactionProps) => {
  const tran = useAppSelector(getTransactionById(id));
  const { exchange } = useExchange();

  const date = useMemo(() => {
    if (!tran?.date) return null;

    const d = new Date(tran.date);
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
  }, [tran?.date]);

  if (!tran) return null;

  return (
    <Root>
      <TransactionDialog
        action={({ open }) => (
          <More onClick={open}>
            <img src={moreIcon} alt="show more" />
          </More>
        )}
        id={tran.id}
      />

      <Pair>
        <Txt color="primary600" size="xs">
          NAME
        </Txt>
        <Txt color="primary800">{tran.name}</Txt>
      </Pair>
      <Pair>
        <Txt color="primary600" size="xs">
          DATE
        </Txt>
        <Txt size="sm" color="primary800">
          {date}
        </Txt>
      </Pair>
      <Values>
        <Pair>
          <Txt color="primary600" size="xs">
            EUR
          </Txt>
          <Txt size="sm" color="primary800">
            {formatCurrency(tran.eur)}
          </Txt>
        </Pair>
        <Pair>
          <Txt color="primary600" size="xs">
            PLN (original)
          </Txt>
          <Txt size="sm" color="primary800">
            {formatCurrency(tran.originalPln)}
          </Txt>
        </Pair>
        <Pair>
          <Txt color="primary600" size="xs">
            PLN (current)
          </Txt>
          <Txt size="sm" color="primary800">
            {exchange
              ? exchange({
                  format: true,
                  from: "EUR",
                  to: "PLN",
                  amount: tran.eur,
                })
              : "--.--"}
          </Txt>
        </Pair>
      </Values>
    </Root>
  );
};

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  padding: 16px;
  box-shadow: 0px 2px 3px 1px ${({ theme: t }) => t.color.primary800}16; // todo

  & > * + * {
    margin-top: 8px;
  }
`;
export const Pair = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Values = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 500px;
  flex-wrap: wrap;
`;

export const More = styled(Button)`
  position: absolute;
  top: 16px;
  right: 16px;
`;

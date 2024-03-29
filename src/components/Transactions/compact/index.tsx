import styled from "@emotion/styled";
import { useAppSelector } from "../../../store/hooks";
import {
  getTransactions,
  getTransactionsEmpty,
} from "../../../store/slices/exchange/selectors";
import { contentWidth } from "../../../style/const";
import { Empty } from "../Empty";
import { Transaction } from "./Transaction";

export const TransactionsCompact = () => {
  const transactions = useAppSelector(getTransactions);
  const isEmpty = useAppSelector(getTransactionsEmpty);
  return (
    <Root>
      {transactions.map(({ id }) => (
        <Transaction key={id} id={id} />
      ))}
      {isEmpty && <Empty>No transactions</Empty>}
    </Root>
  );
};

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  max-width: ${contentWidth};
  width: 100%;
  margin: 0 auto;
  padding: 8px;

  & > * + * {
    margin-top: 8px;
  }
`;

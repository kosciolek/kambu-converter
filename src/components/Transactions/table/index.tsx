import styled from "@emotion/styled/macro";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Cell, Column, useSortBy, useTable } from "react-table";
import { useExchange } from "../../../api/exchange/hooks";
import {
  getTransactions,
  getTransactionsEmpty,
} from "../../../store/slices/exchange/selectors";
import { Transaction } from "../../../store/slices/exchange/types";
import { contentWidth } from "../../../style/const";
import { formatCurrency } from "../../../utils/currency";
import { Button } from "../../Button";
import { TransactionDialog } from "../../TransactionDialog";
import { Txt } from "../../Txt";
import moreIcon from "./more.png";
import { SortDirIcon } from "./SortDirIcon";

export const TransactionTable = () => {
  const { exchange } = useExchange();

  const columns = useMemo<Column<Transaction>[]>(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Date",
        accessor: (row) => {
          const date = new Date(row.date);
          return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
        },
      },
      {
        Header: "EUR",
        accessor: (row) => formatCurrency(row.eur),
        Cell: ({ row }: Cell<Transaction>) => (
          <span>
            <Txt size="sm">{formatCurrency(row.original.eur)}</Txt>
            <Txt color="primary400" size="xxs">
              &nbsp;€
            </Txt>
          </span>
        ),
      },
      {
        Header: "PLN (Original)",
        accessor: (row) => formatCurrency(row.originalPln),
        Cell: ({ row }: Cell<Transaction>) => (
          <span>
            <Txt size="sm">{formatCurrency(row.original.originalPln)}</Txt>
            <Txt color="primary400" size="xxs">
              &nbsp;zł
            </Txt>
          </span>
        ),
      },
      {
        Header: "PLN (Current)",
        accessor: (row) =>
          exchange({
            amount: row.eur,
            from: "EUR",
            to: "PLN",
            format: true,
          }) ?? "Loading...",
        Cell: ({ row }: Cell<Transaction>) => (
          <span>
            <Txt>
              {exchange({
                amount: row.original.eur,
                from: "EUR",
                to: "PLN",
                format: true,
              }) ?? "Loading..."}
            </Txt>
            <Txt color="primary400" size="xxs">
              &nbsp;zł
            </Txt>
          </span>
        ),
      },
      {
        Header: () => null,
        id: "actions",
        Cell: ({ row }: Cell<Transaction>) => (
          <TransactionDialog
            action={({ open }) => (
              <Button onClick={open}>
                <img src={moreIcon} alt="show more" />
              </Button>
            )}
            id={row.original.id}
          />
        ),
      },
    ],
    [exchange]
  );

  const transactions = useSelector(getTransactions);
  const noTransactions = useSelector(getTransactionsEmpty);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data: transactions,
      },
      useSortBy
    );

  return (
    <Root>
      <Table {...getTableProps()} style={{ userSelect: "none" }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => {
                const getColDir = () => {
                  if (!column.isSorted) return "none";
                  if (column.isSortedDesc) return "desc";
                  return "asc";
                };

                return (
                  /* todo Make useTable aware of the sort plugin
                   * presumably has something to do with
                   * https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react-table
                   * but I didn't manage it */
                  <Th
                    align="left"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}

                    <SortDirIcon dir={getColDir()} />
                  </Th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <Td align="left" {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </Td>
                ))}
              </Tr>
            );
          })}
        </tbody>
      </Table>
      {noTransactions && <Empty>No transactions</Empty>}
    </Root>
  );
};

export const Root = styled.div`
  padding: 24px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25); // todo
  flex-grow: 1;

  margin: 0 auto 24px auto;
  max-width: ${contentWidth};
  width: 100%;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Th = styled.th`
  font-size: 18px;
  text-align: left;
  color: ${({ theme: t }) => t.color.primary600};
  padding-bottom: 4px;
`;

export const Td = styled.td`
  font-size: 16px;
  color: ${({ theme: t }) => t.color.primary800};
  user-select: text;
`;

export const Tr = styled.tr`
  & + & {
    border-top: 1px solid ${({ theme: t }) => t.color.primary100};
  }

  & > ${Td} {
    padding: 4px 0;
  }
`;

export const Empty = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 0;
  color: ${({ theme: t }) => t.color.primary500};
`;

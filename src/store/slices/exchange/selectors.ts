import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../..";
import { Transaction } from "./types";

export const getTransactions = (state: RootState) =>
  state.exchange.transactions;

export const getTransactionById =
  (id: Transaction["id"]) => (state: RootState) =>
    state.exchange.transactions.find((tr) => tr.id === id);

export const getSelf = (state: RootState) => state.exchange;

export const getTransactionsEmpty = (state: RootState) =>
  state.exchange.transactions.length === 0;

export const getHighest = createSelector([getTransactions], (transactions) => {
  const copy = [...transactions];
  /* todo More efficient, without sorting */
  return copy.sort((t1, t2) => (t1.eur < t2.eur ? 1 : -1))[0] ?? null;
});

export const getTotal = createSelector([getTransactions], (transactions) =>
  transactions.reduce((acc, tran) => acc + tran.eur, 0)
);

export const getRate = (state: RootState) => state.exchange.rate;

export const getUseLiveRate = (state: RootState) => state.exchange.useLiveRate;

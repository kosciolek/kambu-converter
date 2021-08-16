import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Transaction } from "./types";

/* todo remove sample */
const generate = (): Transaction[] =>
  Array.from({ length: 35 }).map((_, i) => {
    const eur = Math.random() * 400;
    return {
      id: i.toString(),
      date: Date.now() - 3600000 * 36 + i * 3600000 * 1,
      eur,
      originalPln: eur * 4.12,
      name: (Math.random() * 23133223).toString(16),
    };
  });

export const exchangeSlice = createSlice({
  name: "exchange",
  initialState: {
    transactions: [...generate()] as Transaction[], // todo
    rate: 4,
    useLiveRate: true,
    liveRateInterval: 1000,
  },
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push(action.payload);
    },
    removeTransaction: (state, action: PayloadAction<Transaction["id"]>) => {
      state.transactions = state.transactions.filter(
        (tr) => tr.id !== action.payload
      );
    },
    removeAllTransactions: (state) => {
      state.transactions = [];
    },
    setRate: (state, action: PayloadAction<number>) => {
      state.rate = action.payload;
    },
    setUseLive: (state, action: PayloadAction<boolean>) => {
      state.useLiveRate = action.payload;
    },

    setLiveRateInterval: (state, action: PayloadAction<number>) => {
      state.liveRateInterval = action.payload;
    },
  },
});

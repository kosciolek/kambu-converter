import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { generateSampleTransactions } from "../../../utils/generateSampleTransactions";
import { Transaction } from "./types";

export const exchangeSlice = createSlice({
  name: "exchange",
  initialState: {
    transactions: [...generateSampleTransactions(35)] as Transaction[], // todo
    rate: 4,
    useLiveRate: true,
    liveRateInterval: 1000,
  },
  reducers: {
    addTransaction: (
      state,
      action: PayloadAction<Transaction | Transaction[]>
    ) => {
      if (Array.isArray(action.payload))
        state.transactions.push(...action.payload);
      else state.transactions.push(action.payload);
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

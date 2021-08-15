import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Transaction } from "./types";

/* TODO Remove sample transactions */
const sampleTran: Transaction[] = [
  { id: "23", date: Date.now(), eur: 20, originalPln: 80, name: "Corp S.A." },
  {
    id: "2233",
    date: Date.now(),
    eur: 30,
    originalPln: 120,
    name: "Something",
  },
  { id: "2343", date: Date.now(), eur: 40, originalPln: 160, name: "Highest" },
];

export const exchangeSlice = createSlice({
  name: "exchange",
  initialState: {
    transactions: [...sampleTran] as Transaction[], // todo
    rate: 4,
    useLiveRate: true,
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
  },
});

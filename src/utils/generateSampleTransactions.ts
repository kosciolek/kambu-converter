import { Transaction } from "../store/slices/exchange/types";

export const generateSampleTransactions = (number: number): Transaction[] =>
  Array.from({ length: number }).map((_, i) => {
    const eur = Math.random() * 400;
    return {
      id: i.toString(),
      date: Date.now() - 3600000 * 156 + i * 3600000 * 1,
      eur,
      originalPln: eur * 4.12,
      name: (Math.random() * 23133223).toString(16),
    };
  });

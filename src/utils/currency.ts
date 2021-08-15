import { preciseRound } from "./js";

export const CURRENCY = {
  EUR: "EUR",
  PLN: "PLN",
} as const;

export type Currency = typeof CURRENCY[keyof typeof CURRENCY];

const atLeastTwoLeadingZeros = (string: string) =>
  string[1] === "." ? `0${string}` : string;

export const formatCurrency = (value: number) => {
  let result;
  result = preciseRound(value, 2);
  result = result.toFixed(2);
  result = atLeastTwoLeadingZeros(result);
  return result;
};

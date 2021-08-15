import { ReactNode } from "react";

export type SelectValue = string | number;

export type OptionType = {
  value: SelectValue;
  render?: ReactNode;
};

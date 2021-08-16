import { UseFormRegisterReturn } from "react-hook-form";

export const adaptInput = ({ ref, ...rest }: UseFormRegisterReturn) => ({
  ...rest,
  innerRef: ref,
});

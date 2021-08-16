import { ReactNode } from "react";
import { Config, ConfigProps } from "../configs/Config";
import { DeepPartial } from "./ts";

export const createConfig =
  (
    settings?: Omit<ConfigProps, "children" | "initialState"> & {
      initialState: DeepPartial<ConfigProps["initialState"]>;
    }
  ) =>
  ({ children }: { children?: ReactNode }) =>
    (
      // @ts-ignore
      <Config {...settings}>{children}</Config>
    );

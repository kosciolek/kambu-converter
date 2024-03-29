import { UseSortByOptions } from "react-table";

declare module "react-table" {
  export interface TableOptions<D extends Record<string, unknown>>
    extends UseSortByOptions<D> {}
}
